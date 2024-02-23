const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const querystring = require('querystring');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint for translation
app.post('/translate', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw new Error('Please provide the text for conversion');
    }

    const params = querystring.stringify({
      q: text,
      source: 'en',
      target: 'fr',
    });

    const response = await fetch(`https://libretranslate.de/translate?${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const data = await response.json();

    res.json({ translation: data.translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
