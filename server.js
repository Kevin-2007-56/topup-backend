// server.js (ฉบับอัปเกรด)

// 1. เรียกใช้เครื่องมือทั้งหมดที่เราต้องการ
const express = require('express');
const axios = require('axios'); // 'รถส่งของ' ของเรา
const cors = require('cors');   // 'ใบอนุญาตผ่านด่าน'

// 2. สร้างตัวแอปพลิเคชัน
const app = express();
const PORT = process.env.PORT || 3000;

// 3. ตั้งค่าความปลอดภัย
app.use(cors()); // อนุญาตให้หน้าบ้านคุยกับเราได้
app.use(express.json()); // ทำให้เซิร์ฟเวอร์อ่านข้อมูล JSON ได้

// ==========================================================
//   หัวใจหลัก: ที่เก็บกุญแจลับ และสูตรอาหาร
// ==========================================================

// 🔑 เก็บ API Key ของคุณไว้อย่างปลอดภัยที่นี่
const BARBAR_API_KEY = "BGZGP1760538243999"; // <--- ❗️❗️ ใส่ API KEY จริงๆ ของคุณตรงนี้ ❗️❗️

// สร้างเส้นทางใหม่สำหรับให้ "หน้าบ้าน" มาขอรายชื่อเกม
app.post('/api/games', async (req, res) => {
  console.log("ได้รับการร้องขอรายชื่อเกม...");

  try {
    // พ่อครัวกำลังเตรียมส่ง "ซองจดหมายปิดผนึก" (POST request)
    const response = await axios.post(
      'https://api.barbartopup.com/service', // ที่อยู่โกดัง
      {
        api_key: BARBAR_API_KEY // แนบบัตรสมาชิกลับไปด้วย
      }
    );

    // เมื่อได้เมนูจากโกดังแล้ว ให้ส่งกลับไปให้หน้าบ้าน
    console.log("ดึงข้อมูลสำเร็จ! กำลังส่งกลับไปให้หน้าบ้าน...");
    res.json(response.data);

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
    res.status(500).json({ status: false, msg: "มีปัญหาในการเชื่อมต่อกับเซิร์ฟเวอร์ Barbartopup" });
  }
});

// ==========================================================

// 4. สั่งให้ร้านเปิดและรอรับลูกค้า
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${PORT}`);
});