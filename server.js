// server.js (เวอร์ชันสุดท้ายที่สมบูรณ์)

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================================
//   1. Health Check Route (ประตูหน้าสำหรับ Render)
// ==========================================================
app.get('/', (req, res) => {
  // เส้นทางนี้สำคัญมากสำหรับให้ Render รู้ว่าเซิร์ฟเวอร์ทำงานอยู่
  res.status(200).send('Backend Server is running and healthy!');
});

// ==========================================================
//   2. API Route (ประตูหลังสำหรับดึงข้อมูลเกม)
// ==========================================================
app.post('/api/games', async (req, res) => {
  const BARBAR_API_KEY = "BGZGP1760538243999"; // API Key ของคุณ
  
  try {
    const response = await axios.post(
      'https://api.barbartopup.com/service',
      { api_key: BARBAR_API_KEY }
    );
    
    // ส่งข้อมูลที่ได้จาก Barbartopup กลับไปให้หน้าบ้าน
    res.status(200).json(response.data);

  } catch (error) {
    // ถ้ามีปัญหาในการเชื่อมต่อกับ Barbartopup
    console.error("Error fetching from Barbartopup:", error.message);
    res.status(500).json({ status: false, msg: "มีปัญหาในการเชื่อมต่อกับเซิร์ฟเวอร์ Barbartopup" });
  }
});

// ==========================================================
//   3. เริ่มทำงาน
// ==========================================================
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ port: ${PORT}`);
});