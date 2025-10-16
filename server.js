// server.js (The Final, Correct Version)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000; 
const host = '0.0.0.0'; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Backend Server is RUNNING CORRECTLY!</h1>');
});

app.post('/api/games', async (req, res) => {
  const BARBAR_API_KEY = "BGZGP1760538243999";
  try {
    const response = await axios.post(
      'https://api.barbartopup.com/service',
      { api_key: BARBAR_API_KEY }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error from Barbartopup:", error.message);
    res.status(500).json({ status: false, msg: "Error connecting to Barbartopup server" });
  }
});

app.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});