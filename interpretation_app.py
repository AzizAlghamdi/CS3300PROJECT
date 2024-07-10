from flask import Flask, render_template
import requests
import PyPDF2
from openai import OpenAI
client = OpenAI()

global_url = r"https://images.drlogy.com/assets/uploads/lab/pdf/CBC-test-report-format-example-sample-template-Drlogy-lab-report.pdf"

app = Flask(__name__)

'''
donwload_pdf is used to download pdf file to local machine so that open() can open the file.
'''
def download_pdf(url, local_path):
    response = requests.get(url)
    with open(local_path, "wb") as file:
        file.write(response.content)

'''
lab_result_intepret extracts information from pdf to interpret lab result using OpenAI API.
'''
def lab_result_interpret(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PdfReader object instead of PdfFileReader
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Initialize an empty string to store the text
        text = ''
        # Extract text
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    # Prompt OpenAI to interpret the result        
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a doctor, your job is to interpret the following healthcare lab results and provide a detailed explanation of what each result indicates, including potential health implications, normal ranges, and any recommendations for further action or lifestyle changes. Everything will be in Vietnamese."},
            {"role": "user", "content": text},
        ]
    )
    temp_array = []
    temp_array = completion.choices[0].message.content.splitlines()
    return temp_array

@app.route('/', methods=['GET', 'POST'])
def home():
    pdf_url= global_url
    return render_template("viewer.html", pdf_url=pdf_url)

@app.route('/interpretation')
def interpret():
    pdf_url = global_url
    download_pdf(pdf_url, 'lab_result.txt')
    result = lab_result_interpret('lab_result.txt')
    return render_template("result.html", pdf_url=pdf_url, result=result)

if __name__ == '__main__':
    app.run()