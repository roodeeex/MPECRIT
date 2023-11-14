from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = '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'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_essay():
    subject = request.form['subject']
    level = request.form['level']

    # Generate essay content using the OpenAI API
    prompt = f"Écrivez {type} sur le sujet donne pour un etudiant {level} et voila ce que le sujet dis ( {subject}) , ne depassez pas 300 mots, respecte le shema de ce type de texte"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    essay_content = response.choices[0].message['content'].strip()

    return render_template('index.html', essay_content=essay_content)

if __name__ == '__main__':
    app.run(debug=True)
