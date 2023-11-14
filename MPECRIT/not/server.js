const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');


const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.static('public'));

app.post('/generate', async (req, res) => {
    const { subject, level } = req.body;

    try {
        const response = await openai.Completion.create({
            engine: 'text-davinci-003',
            prompt: `Écrivez une production écrite sur le sujet "${subject}" pour les étudiants de niveau "${level}".`,
            max_tokens: 200,
            n: 1,
            api_key: OPENAI_API_KEY // Pass your API key directly in the request
        });

        const generatedText = response.choices[0].text.trim();
        res.json({ generatedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la génération du texte.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
