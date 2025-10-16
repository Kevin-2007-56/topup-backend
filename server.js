// server.js (นี่คือโค้ดที่ถูกต้องสำหรับหลังบ้าน)

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health Check Route (ประตูหน้า)
app.get('/', (req, res) => {
  res.send('Backend Server is running and healthy!');
});

// API Route (ประตูหลังสำหรับรับออเดอร์)
app.post('/api/games', async (req, res) => {
  const BARBAR_API_KEY = "BGZGP1760538243999"; // API Key ของคุณ
  try {
    const response = await axios.post(
      'https://api.barbartopup.com/service',
      { api_key: BARBAR_API_KEY }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: false, msg: "มีปัญหาในการเชื่อมต่อกับเซิร์ฟเวอร์ Barbartopup" });
  }
});

app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${PORT}`);
});