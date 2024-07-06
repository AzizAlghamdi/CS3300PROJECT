from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from flask_restful import Api, Resource
from flasgger import Swagger
from cryptography.fernet import Fernet
import joblib
import logging
import os
import openai
from dotenv import load_dotenv
from models import db, User, LabResult

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///healthcare.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
api = Api(app)
auth = HTTPBasicAuth()
swagger = Swagger(app)
logging.basicConfig(filename='api.log', level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger = logging.getLogger(__name__)
model = joblib.load('model/lab_results_model.pkl')
print(f"OPENAI_API_KEY: {os.getenv('OPENAI_API_KEY')}")
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OpenAI API key not found in environment variables.")
def load_key():
    return open("secret.key", "rb").read()
def encrypt_message(message):
    key = load_key()
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode())
    return encrypted_message
  
def decrypt_message(encrypted_message):
    key = load_key()
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message).decode()
    return decrypted_message

@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return username
    return None
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("user_input")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response.choices[0].message['content'].strip()
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

class Interpret(Resource):
    @auth.login_required
    def post(self):
        try:
            data = request.json
            encrypted_lab_result = encrypt_message(str(data['lab_result']))
            decrypted_lab_result = decrypt_message(encrypted_lab_result)
            prediction = model.predict([eval(decrypted_lab_result)])
            logger.info('Interpretation request successful')
            return jsonify({'interpretation': prediction[0]})
        except Exception as e:
            logger.error(f'Error interpreting lab result: {e}')
            return jsonify({'error': str(e)}), 500

class Webhook(Resource):
    def post(self):
        req = request.get_json(silent=True, force=True)
        intent = req['queryResult']['intent']['displayName']
        if intent == "Interpret Lab Results":
            lab_result = req['queryResult']['parameters']['lab_result']
            encrypted_lab_result = encrypt_message(str(lab_result))
            decrypted_lab_result = decrypt_message(encrypted_lab_result)
            prediction = model.predict([eval(decrypted_lab_result)])
            fulfillmentText = f'The interpretation of your lab result is: {prediction[0]}'
            return jsonify({'fulfillmentText': fulfillmentText})
        elif intent == "Navigate":
            page = req['queryResult']['parameters']['page']
            fulfillmentText = f'Navigating to {page} page.'
            return jsonify({'fulfillmentText': fulfillmentText, 'page': page})
        else:
            return jsonify({'fulfillmentText': 'Sorry, I did not understand that request.'})
api.add_resource(Interpret, '/interpret')
api.add_resource(Webhook, '/webhook')

if __name__ == '__main__':
    if not os.path.exists('secret.key'):
        from encryption import generate_key
        generate_key()
    with app.app_context():
        db.create_all()  
    app.run(host='0.0.0.0', port=5001, debug=True)
