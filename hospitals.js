// قاعدة بيانات المستشفيات
const hospitalsData = [
    {
        name: "مستشفى عطبرة التعليمي",
        city: "عطبرة",
        phone: "0123456789",
        status: "يعمل كلياً",
        availableTests: ["صورة دم كاملة (CBC)", "وظائف كلى وكبد", "أشعة سينية (X-Ray)", "موجات صوتية"],
        unavailableTests: ["رنين مغناطيسي (MRI)", "مقطعية (CT Scan)"]
    },
    {
        name: "مستشفى الضمان مروي",
        city: "مروي",
        phone: "0123456789",
        status: "يعمل كلياً",
        availableTests: ["رنين مغناطيسي (MRI)", "أشعة مقطعية (CT)", "جميع فحوصات الدم", "قسطرة قلبية"],
        unavailableTests: [] 
    },
    {
        name: "مستشفى الشرطة عطبرة",
        city: "عطبرة",
        phone: "0123456789",
        status: "طوارئ فقط",
        availableTests: ["طوارئ وإصابات", "فصيلة دم وتطابق", "فحوصات روتينية"],
        unavailableTests: ["عمليات باردة", "مناظير"]
    },
    {
        name: "مستشفى العسكري مروي",
        city: "مروي",
        phone: "0123456789",
        status: "يعمل كلياً",
        availableTests: ["عمليات جراحية كبرى", "عناية مكثفة (ICU)", "أشعة ملونة"],
        unavailableTests: ["عناية حديثي الولادة (NICU)"]
    },
    {
        name: "مستشفى العسكري دنقلا",
        city: "دنقلا",
        phone: "0123456789",
        status: "يعمل كلياً",
        availableTests: ["بنك دم متكامل", "غسيل كلى", "فحوصات هرمونات", "عناية قلبية (CCU)"],
        unavailableTests: ["جراحة مخ وأعصاب"]
    },
    {
        name: "مستشفى أم درمان التعليمي",
        city: "أم درمان",
        phone: "0123456789",
        status: "يعمل كلياً",
        availableTests: ["مكافحة عدوى", "طوارئ باطنية", "جراحة عامة", "أشعة"],
        unavailableTests: ["بعض الفحوصات الدقيقة"]
    }
];

let activeCity = "الكل";

document.addEventListener('DOMContentLoaded', () => {
    
    if(document.getElementById('hospitalsGrid')) {
        generateCityFilters();
        renderHospitals();

        // ربط شريط البحث
        document.getElementById('searchInput').addEventListener('keyup', renderHospitals);
        
        // ربط نافذة التحويل (للممرضين)
        document.getElementById('closeTransferBtn').addEventListener('click', closeTransfer);
        document.getElementById('transferForm').addEventListener('submit', submitTransfer);
        
        // ربط نافذة الاستفسار (للمرضى)
        document.getElementById('closeInquiryBtn').addEventListener('click', closeInquiryModal);
        document.getElementById('inquiryForm').addEventListener('submit', submitInquiry);

        // ربط القائمة العائمة السريعة
        const quickBtn = document.getElementById('quickBtn');
        if(quickBtn) {
            quickBtn.addEventListener('click', toggleQuickMenu);
        }
    }
});

// 1. توليد أزرار المدن
function generateCityFilters() {
    const cities = ["الكل", ...new Set(hospitalsData.map(h => h.city))];
    const filterContainer = document.getElementById('cityFilters');
    filterContainer.innerHTML = '';
    
    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${city === activeCity ? 'active' : ''}`;
        btn.innerText = city;
        btn.onclick = () => {
            activeCity = city;
            generateCityFilters(); 
            renderHospitals();
        };
        filterContainer.appendChild(btn);
    });
}

// 2. رسم كروت المستشفيات
function renderHospitals() {
    const grid = document.getElementById('hospitalsGrid');
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    grid.innerHTML = '';

    const filteredData = hospitalsData.filter(hosp => {
        const matchCity = activeCity === "الكل" || hosp.city === activeCity;
        const matchSearch = hosp.name.toLowerCase().includes(searchVal) || 
                            hosp.city.toLowerCase().includes(searchVal) ||
                            hosp.availableTests.join(" ").toLowerCase().includes(searchVal);
        return matchCity && matchSearch;
    });

    filteredData.forEach(hosp => {
        let testsHtml = `<div class="test-title"><i class="fas fa-check-circle" style="color:#27ae60;"></i> الفحوصات المتوفرة:</div><div class="test-tags">`;
        hosp.availableTests.forEach(test => testsHtml += `<span class="tag-on">${test}</span>`);
        testsHtml += `</div>`;

        if(hosp.unavailableTests.length > 0) {
            testsHtml += `<div class="test-title" style="margin-top:10px;"><i class="fas fa-times-circle" style="color:#c0392b;"></i> غير متوفر حالياً:</div><div class="test-tags">`;
            hosp.unavailableTests.forEach(test => testsHtml += `<span class="tag-off">${test}</span>`);
            testsHtml += `</div>`;
        }

        const card = `
            <div class="hosp-card">
                <h3 class="hosp-name"><i class="far fa-hospital"></i> ${hosp.name}</h3>
                <div class="hosp-location"><i class="fas fa-map-marker-alt"></i> ${hosp.city} | حالة المستشفى: ${hosp.status}</div>
                <div class="tests-section">${testsHtml}</div>
                <div class="hosp-actions">
                    <button class="btn-transfer" onclick="openTransfer('${hosp.name}')"><i class="fas fa-ambulance"></i> تحويل مريض</button>
                    <a href="tel:${hosp.phone}" class="btn-call"><i class="fas fa-phone"></i></a>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', card);
    });
}

// 3. وظائف نافذة التحويل للممرضين
window.openTransfer = function(hospName) {
    document.getElementById('destHospital').value = hospName;
    document.getElementById('transferModal').style.display = 'block';
};

function closeTransfer() {
    document.getElementById('transferModal').style.display = 'none';
}

function submitTransfer(e) {
    e.preventDefault();
    let dest = document.getElementById('destHospital').value;
    alert(`تم تسجيل طلب التحويل بنجاح إلى (${dest})! سيتم إشعار القسم لتجهيز السرير.`);
    closeTransfer();
    e.target.reset();
}

// 4. وظائف الاستفسار للمرضى (الجديدة)
window.openInquiryModal = function() {
    document.getElementById('inquiryModal').style.display = 'block';
};

function closeInquiryModal() {
    document.getElementById('inquiryModal').style.display = 'none';
}

function submitInquiry(e) {
    e.preventDefault();
    alert('تم استلام طلبك بنجاح! سيقوم تيم شبكة الممرضين بالبحث عن طلبك والتواصل معك عبر الواتساب في أقرب وقت لإفادتك.');
    closeInquiryModal();
    e.target.reset(); // لتفريغ الحقول بعد الإرسال
}

// 5. القائمة العائمة
function toggleQuickMenu() {
    const menu = document.getElementById('quickMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}