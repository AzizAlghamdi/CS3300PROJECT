from flask import Flask, render_template, request, redirect, url_for
import requests
import PyPDF2
import os
import openai
from googletrans import Translator

# Initialize Flask app
app = Flask(__name__)

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize the Google Translator
translator = Translator()

# Function to download PDF from URL to local path
def download_pdf(url, local_path):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for request errors
        with open(local_path, "wb") as file:
            file.write(response.content)
    except requests.exceptions.RequestException as e:
        print(f"Error downloading PDF: {e}")
        return None
    return local_path

# Function to interpret lab results from PDF using OpenAI
def lab_result_interpret(pdf_path, language):
    try:
        with open(pdf_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfFileReader(pdf_file)
            text = ""
            for page_num in range(pdf_reader.numPages):
                page = pdf_reader.getPage(page_num)
                text += page.extract_text()

        # OpenAI API call to interpret lab results
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"You are a doctor. Interpret the following lab results:\n\n{text}\n\nProvide detailed explanations, health implications, normal ranges, and recommendations.",
            max_tokens=1500
        )
        interpretation = response.choices[0].text.strip()

        # Translate interpretation to the desired language
        if language != "en":
            translated = translator.translate(interpretation, dest=language)
            return translated.text
        return interpretation
    except Exception as e:
        print(f"Error interpreting lab results: {e}")
        return "Error interpreting lab results."

# Home route
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        pdf_url = request.form.get('pdf_url')
        language = request.form.get('language')
        if pdf_url and language:
            local_path = download_pdf(pdf_url, 'lab_result.pdf')
            if local_path:
                return redirect(url_for('interpret', pdf_url=pdf_url, language=language))
    return render_template("viewer.html")

# Interpretation route
@app.route('/interpretation')
def interpret():
    pdf_url = request.args.get('pdf_url')
    language = request.args.get('language', 'en')
    if pdf_url:
        local_path = download_pdf(pdf_url, 'lab_result.pdf')
        if local_path:
            result = lab_result_interpret(local_path, language)
            return render_template("result.html", result=result, language=language)
    return "Error processing PDF."

# Main function
if __name__ == '__main__':
    app.run(debug=True)
