// script.js (เวอร์ชันสุดท้ายที่เชื่อมต่อกับ Backend จริง)

document.addEventListener('DOMContentLoaded', () => {

    // ส่วนที่ 1: จัดการเมนู Dropdown (ยังเหมือนเดิม)
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
        window.addEventListener('click', (event) => {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // ==========================================================
    //   ส่วนที่ 2: ดึงข้อมูลจากเซิร์ฟเวอร์ Render ของคุณ
    // ==========================================================
    
    // ที่อยู่ของ "พ่อครัว" ที่ทำงานอยู่บน Render
    const backendUrl = 'https://my-topup-api.onrender.com/api/games';

    const allGamesGrid = document.querySelector('#all-games .game-grid');

    async function fetchGamesFromBackend() {
        console.log("กำลังร้องขอข้อมูลเกมจากเซิร์ฟเวอร์ Render...");
        try {
            // ส่งคำขอแบบ POST ไปหา "พ่อครัว" ของเรา
            const response = await fetch(backendUrl, {
                method: 'POST', // ใช้วิธี POST
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้');
            }

            const result = await response.json();
            
            // ตรวจสอบว่า API จาก Barbartopup ตอบกลับมาสำเร็จหรือไม่
            if (result.status && result.data) {
                console.log("ได้รับข้อมูลเกมเรียบร้อย!");
                const activeGames = result.data.filter(game => game.status === 'aktif');
                displayGames(activeGames);
            } else {
                // ถ้า Barbartopup ตอบกลับมาว่ามีปัญหา (เช่น IP ยังไม่ถูก Whitelist)
                console.error("API ตอบกลับมาว่ามีปัญหา:", result.msg);
                allGamesGrid.innerHTML = `<p>เกิดข้อผิดพลาดจาก API: ${result.msg}</p>`;
            }

        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            allGamesGrid.innerHTML = "<p>ไม่สามารถโหลดข้อมูลเกมได้ในขณะนี้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ Backend ทำงานอยู่</p>";
        }
    }

    function displayGames(games) {
        if (!allGamesGrid) return;
        allGamesGrid.innerHTML = '';

        const popularGrid = document.querySelector('#popular-games .game-grid');
        if (popularGrid) popularGrid.innerHTML = '';

        // *** ส่วนนี้สำคัญ เราต้องหาทางเชื่อมข้อมูล API กับรูปภาพของเรา ***
        const gameImageMapping = {
            "Mobile Legends": "images/mlbb.jpg", // สมมติว่ามีรูปนี้
            "Valorant": "images/game1.jpg",
            "Default": "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Game" // รูปสำรอง
        };

        games.forEach(game => {
            // หากรูปภาพจาก Mapping ตาม 'kategori'
            const imageUrl = gameImageMapping[game.kategori] || gameImageMapping['Default'];

            const gameCardHTML = `
                <a href="product.html?kategori=${encodeURIComponent(game.kategori)}" class="game-card-link">
                    <div class="game-card">
                        <img src="${imageUrl}" alt="${game.kategori}">
                        <h3>${game.kategori}</h3>
                    </div>
                </a>
            `;
            allGamesGrid.innerHTML += gameCardHTML;
        });

        // ทำให้เกมไม่ซ้ำกัน (แสดงแค่ 1 การ์ดต่อ 1 หมวดหมู่)
        const uniqueCategories = {};
        allGamesGrid.querySelectorAll('.game-card-link').forEach(link => {
            const category = link.querySelector('h3').textContent;
            if (uniqueCategories[category]) {
                link.remove();
            } else {
                uniqueCategories[category] = true;
            }
        });
    }

    // สั่งให้เริ่มทำงาน
    if (allGamesGrid) {
        fetchGamesFromBackend();
    }
});