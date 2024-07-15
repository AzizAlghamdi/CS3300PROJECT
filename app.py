import os
from flask import Flask, request, jsonify, render_template
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
from encryption import encrypt_message, decrypt_message
import openai

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

openai.api_key = os.getenv("OPENAI_API_KEY")

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    role = Column(String(50), nullable=False)  # 'patient' or 'doctor'

class Appointment(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    appointment_date = Column(String(50), nullable=False)
    appointment_time = Column(String(50), nullable=False)
    doctor = Column(String(100), nullable=False)
    payment_method = Column(String(50), nullable=False)
    card_details = Column(String(200), nullable=False)

class LabResult(Base):
    __tablename__ = 'lab_results'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    test_name = Column(String(100), nullable=False)
    result = Column(String(100), nullable=False)
    reference_range = Column(String(100), nullable=False)
    interpretation = Column(String(200), nullable=True)

class Prescription(Base):
    __tablename__ = 'prescriptions'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    medication = Column(String(100), nullable=False)
    dosage = Column(String(100), nullable=False)
    frequency = Column(String(100), nullable=False)
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=False)

def initialize_database(engine):
    # Create tables manually using raw SQL commands
    with engine.connect() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL,
                role VARCHAR(50) NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                appointment_date VARCHAR(50) NOT NULL,
                appointment_time VARCHAR(50) NOT NULL,
                doctor VARCHAR(100) NOT NULL,
                payment_method VARCHAR(50) NOT NULL,
                card_details VARCHAR(200) NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS lab_results (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                test_name VARCHAR(100) NOT NULL,
                result VARCHAR(100) NOT NULL,
                reference_range VARCHAR(100) NOT NULL,
                interpretation VARCHAR(200),
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS prescriptions (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                medication VARCHAR(100) NOT NULL,
                dosage VARCHAR(100) NOT NULL,
                frequency VARCHAR(100) NOT NULL,
                start_date VARCHAR(50) NOT NULL,
                end_date VARCHAR(50) NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/patient_register', methods=['GET', 'POST'])
def patient_register():
    if request.method == 'POST':
        data = request.json
        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password,
            role='patient'
        )
        session.add(new_user)
        session.commit()
        return jsonify({'success': True})
    return render_template('patient_register.html')

@app.route('/doctor_register', methods=['GET', 'POST'])
def doctor_register():
    if request.method == 'POST':
        data = request.json
        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password,
            role='doctor'
        )
        session.add(new_user)
        session.commit()
        return jsonify({'success': True})
    return render_template('doctor_register.html')

@app.route('/patient_login', methods=['POST'])
def patient_login():
    data = request.json
    user = session.query(User).filter_by(email=data['email'], role='patient').first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/doctor_login', methods=['POST'])
def doctor_login():
    data = request.json
    user = session.query(User).filter_by(email=data['email'], role='doctor').first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/schedule', methods=['GET', 'POST'])
def schedule():
    if request.method == 'POST':
        data = request.json
        key = generate_key()
        new_appointment = Appointment(
            user_id=1,  # Replace with actual user ID
            appointment_date=data['appointment_date'],
            appointment_time=data['appointment_time'],
            doctor=data['doctor'],
            payment_method=data['payment_method'],
            card_details=encrypt_message(data['card_details'], key)
        )
        session.add(new_appointment)
        session.commit()
        return jsonify({'success': True})
    return render_template('schedule.html')

@app.route('/api/lab_results', methods=['GET'])
def lab_results():
    results = session.query(LabResult).filter_by(user_id=1).all()  # Replace with actual user ID
    results_data = [
        {
            'test_name': result.test_name,
            'result': result.result,
            'reference_range': result.reference_range,
            'interpretation': result.interpretation
        }
        for result in results
    ]
    return jsonify({'results': results_data})

@app.route('/api/interpret_results', methods=['POST'])
def interpret_results():
    data = request.json['results']
    interpretations = []
    for result in data:
        interpretation_message = interpret_lab_result(result['test_name'], result['result'])
        interpretations.append({
            'test_name': result['test_name'],
            'message': interpretation_message
        })
    return jsonify({'interpretations': interpretations})

def interpret_lab_result(test_name, result):
    prompt = f"Interpret the following lab result: {test_name}: {result}"
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=50
    )
    return response.choices[0].text.strip()

@app.route('/api/prescriptions', methods=['GET'])
def prescriptions():
    prescriptions = session.query(Prescription).filter_by(user_id=1).all()  # Replace with actual user ID
    prescriptions_data = [
        {
            'medication': prescription.medication,
            'dosage': prescription.dosage,
            'frequency': prescription.frequency,
            'start_date': prescription.start_date,
            'end_date': prescription.end_date
        }
        for prescription in prescriptions
    ]
    return jsonify({'prescriptions': prescriptions_data})

if __name__ == '__main__':
    with app.app_context():
        initialize_database(engine)
    app.run(debug=True)
