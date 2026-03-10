<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>موسوعة المعدات | شبكة الممرضين السودانيين</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { 
            --med-blue: #2563eb; 
            --med-dark: #1e3a8a; 
            --bg: #f8fafc; 
            --surgical-red: #be123c; 
            --dev-orange: #f59e0b; 
            --main-color: #00a884; /* لون الشبكة الموحد */
        }
        
        body { background-color: var(--bg); font-family: 'Cairo', sans-serif; margin: 0; padding-bottom: 80px; }

        /* --- شريط حالة البرمجة --- */
        .dev-status-bar { 
            background: var(--dev-orange); color: #000; text-align: center; 
            padding: 12px; font-weight: bold; position: sticky; top: 0; z-index: 6000; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; gap: 15px; font-size: 0.9rem; 
        }
        .dev-status-bar i { animation: fa-spin 2s linear infinite; }

        .eq-header { background: linear-gradient(135deg, var(--med-dark), #334155); color: white; padding: 60px 20px 40px; text-align: center; border-radius: 0 0 40px 40px; }
        .back-nav { position: fixed; top: 60px; right: 15px; z-index: 5000; background: #fff; color: var(--med-blue); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: 0.3s; }
        .back-nav:hover { background: var(--med-blue); color: white; transform: scale(1.1); }

        /* --- الزر العائم الاحترافي (FAB) --- */
        .quick-access-btn {
            position: fixed; bottom: 30px; left: 30px;
            background: var(--main-color); color: white; width: 60px; height: 60px;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem; cursor: pointer; z-index: 7000;
            box-shadow: 0 10px 25px rgba(0,168,132,0.4); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .quick-access-btn:hover { transform: scale(1.1) rotate(90deg); background: var(--med-dark); }

        /* --- القائمة السريعة المنسقة --- */
        .quick-menu {
            display: none; position: fixed; bottom: 100px; left: 30px;
            background: white; border-radius: 20px; width: 260px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2); z-index: 6999;
            overflow: hidden; border: 1px solid #eee;
            animation: slideUp 0.4s ease forwards;
        }
        .quick-menu ul { list-style: none; padding: 10px; margin: 0; }
        .quick-menu li { border-bottom: 1px solid #f8fafc; }
        .quick-menu li:last-child { border-bottom: none; }
        .quick-menu li a {
            display: flex; align-items: center; gap: 12px; padding: 14px 18px;
            text-decoration: none; color: #334155; transition: 0.3s; font-weight: 600; font-size: 0.95rem;
        }
        .quick-menu li a i { color: var(--main-color); width: 20px; text-align: center; }
        .quick-menu li a:hover { background: #f0fdf4; color: var(--main-color); padding-right: 25px; }

        @keyframes slideUp { 
            from { opacity: 0; transform: translateY(30px) scale(0.9); } 
            to { opacity: 1; transform: translateY(0) scale(1); } 
        }

        /* --- تنسيقات محتوى الموسوعة --- */
        .update-notif { background: #fff; border: 1px dashed var(--dev-orange); border-radius: 15px; padding: 10px 20px; margin: 20px auto; max-width: 800px; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #666; }
        .search-box { max-width: 800px; margin: 0 auto 30px; padding: 0 20px; }
        .search-input { width: 100%; padding: 18px 25px; border-radius: 30px; border: 2px solid transparent; box-shadow: 0 10px 25px rgba(0,0,0,0.1); font-family: 'Cairo'; outline: none; transition: 0.3s; }
        .search-input:focus { border-color: var(--med-blue); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2); }
        
        .eq-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; padding: 20px; }
        .eq-card { background: white; border-radius: 25px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s; border: 1px solid #eef2f3; position: relative; }
        .eq-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        
        .modal { display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); }
        .modal-content { background: white; margin: 5vh auto; padding: 30px; border-radius: 30px; width: 90%; max-width: 650px; max-height: 85vh; overflow-y: auto; position: relative; }
    </style>
</head>
<body>

    <div class="dev-status-bar">
        <i class="fas fa-hammer"></i> 
        تنبيه: شاشة الموسوعة قيد التحديث والبرمجة المكثفة بواسطة Al-Rasheed Company - تم إنجاز 75%
    </div>

    <a href="index.html" class="back-nav"><i class="fas fa-chevron-right"></i></a>

    <header class="eq-header">
        <h1>موسوعة المعدات الجراحية والطبية <i class="fas fa-tools"></i></h1>
        <p>مرجع ذكي متطور لرفع كفاءة الكوادر التمريضية في غرف العمليات</p>
    </header>

    <div class="container" style="padding: 20px;">
        <div class="search-box">
            <input type="text" class="search-input" id="eqSearch" placeholder="ابحث باسم الأداة.. (مقص، مشرط)..." onkeyup="filterEquipment()">
        </div>
        <div class="eq-grid" id="eqGrid"></div>
    </div>

    <div class="quick-access-btn" onclick="toggleQuickMenu()">
        <i class="fas fa-th-large"></i>
    </div>

    <div id="quickMenu" class="quick-menu">
        <ul>
            <li><a href="index.html"><i class="fas fa-home"></i> الرئيسية</a></li>
            <li><a href="about.html"><i class="fas fa-info-circle"></i> من نحن</a></li>
            <li><a href="research.html"><i class="fas fa-book-medical"></i> مكتبة الأبحاث</a></li>
            <li><a href="jobs.html"><i class="fas fa-user-md"></i> فرص العمل</a></li>
            <li><a href="training.html"><i class="fas fa-users"></i> التدريب المستمر</a></li>
            <li><a href="consult.html"><i class="fas fa-comments"></i> ركن الاستشارات</a></li>
            <li><a href="join.html"><i class="fas fa-user-plus"></i> انضم إلينا</a></li>
            <li><a href="sos.html"><i class="fas fa-ambulance"></i> نداءات الاستغاثة</a></li>
            <li><a href="blood.html"><i class="fas fa-tint"></i> بنك الدم</a></li>
            <li><a href="drugs.html"><i class="fas fa-pills"></i> دليل الأدوية</a></li>
            <li><a href="hospitals.html"><i class="fas fa-hospital-alt"></i> المستشفيات</a></li>
            <li><a href="handover.html"><i class="fas fa-exchange-alt"></i> تسليم الوردية</a></li>
            <li><a href="calc.html"><i class="fas fa-calculator"></i> الحاسبة السريرية</a></li>
        </ul>
    </div>

    <div id="eqModal" class="modal">
        <div class="modal-content">
            <span onclick="closeModal()" style="float:left; cursor:pointer; font-size:35px; color:#94a3b8;">&times;</span>
            <div id="modalBody"></div>
        </div>
    </div>

    <script>
        // مصفوفة المعدات
        const medicalEquipment = [
            { id: 1, nameAr: "المشرط الجراحي", nameEn: "Surgical Scalpel", cat: "جراحة", image: "mesrt.png", usage: "الأداة الأساسية لعمل الشقوق الجراحية وفصل الأنسجة بدقة متناهية.", howTo: "يتم تركيب الشفرة (Blade) على اليد (Handle) المناسبة.", types: ["شفرة 10", "شفرة 11", "شفرة 15"] },
            { id: 2, nameAr: "مقص مايو", nameEn: "Mayo Scissors", cat: "جراحة", image: "smaua.png", usage: "يستخدم لقص الأنسجة الثقيلة والكثيفة والخيوط.", howTo: "يتميز بشفرات سميكة ومنها المستقيم والمنحني.", types: ["مستقيم", "منحني"] }
        ];

        function renderGrid(data) {
            const grid = document.getElementById('eqGrid');
            grid.innerHTML = data.map(item => `
                <div class="eq-card">
                    <div class="eq-info">
                        <h3>${item.nameAr}</h3>
                        <p>${item.usage}</p>
                        <button class="btn-details" onclick="openDetails(${item.id})">التفاصيل</button>
                    </div>
                </div>
            `).join('');
        }

        // --- وظائف الزر العائم والقائمة (تم ضبطها بناءً على الكود الخاص بك) ---
        function toggleQuickMenu() {
            const menu = document.getElementById('quickMenu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }

        // إغلاق القائمة والمودال عند الضغط في الخارج
        window.onclick = function(event) {
            const menu = document.getElementById('quickMenu');
            const modal = document.getElementById('eqModal');
            
            // إغلاق القائمة السريعة
            if (menu.style.display === 'block' && !event.target.closest('.quick-access-btn') && !event.target.closest('.quick-menu')) {
                menu.style.display = 'none';
            }
            
            // إغلاق نافذة المعدات
            if (event.target == modal) {
                closeModal();
            }
        }

        function closeModal() { document.getElementById('eqModal').style.display = 'none'; }
        renderGrid(medicalEquipment);
    </script>
</body>
</html>