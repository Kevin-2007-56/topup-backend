// server.js (The Simplest Possible Engine)
const express = require('express');
const app = express();

// กำหนด Port โดยตรงจาก Render หรือใช้ 3000 ถ้าทดสอบบนเครื่อง
const PORT = process.env.PORT || 3000;

// สร้างประตูหน้าทางเดียวเท่านั้น
app.get('/', (req, res) => {
  res.status(200).send('<h1>The Test Engine is RUNNING!</h1>');
});

// เริ่มทำงาน
app.listen(PORT, () => {
  console.log(`Simple server is listening on port ${PORT}`);
});