// 1. وظيفة الأسئلة الشائعة في الصفحة الرئيسية
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        if(!answer) return; // حماية من الأخطاء
        button.classList.toggle('active');
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.padding = "0 20px";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            answer.style.padding = "15px 20px";
        }
    });
});

// 2. معالجة نموذج التواصل 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const nameInput = this.querySelector('input[type="text"]');
        const name = nameInput ? nameInput.value : '';
        alert('شكراً لتواصلك معنا ممرض/ة ' + name + '. تم استلام رسالتك وسنرد عليك قريباً!');
        this.reset(); 
    });
}

// 3. تأثير ظهور العناصر عند التمرير (الأنيميشن)
const fadeElements = document.querySelectorAll('.fade-element');
if (fadeElements.length > 0) {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// =========================================================
// 4. برمجة النافذة المنبثقة (المودال) في صفحة الأرشيف
// =========================================================
const summaryModal = document.getElementById("summaryModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

if (summaryModal && closeBtn) {
    // إغلاق المودال عند الضغط على (X)
    closeBtn.onclick = function() {
        summaryModal.style.display = "none";
    }
}

function openSummary(title, text) {
    if (modalTitle && modalBody && summaryModal) {
        modalTitle.innerText = title;
        modalBody.innerText = text;
        summaryModal.style.display = "block";
    }
}

// =========================================================
// 5. برمجة التنقل بين الصفحات (Pagination) في صفحة الأرشيف
// =========================================================
let currentPage = 1; 
const totalPages = 3; 

function goToPage(pageNumber) {
    currentPage = pageNumber; 
    
    // إخفاء كل الكروت أولاً
    const allCards = document.querySelectorAll('.result-card');
    if (allCards.length === 0) return; 
    
    allCards.forEach(card => card.style.display = 'none');

    // إظهار كروت الصفحة المطلوبة فقط
    const targetCards = document.querySelectorAll(`.result-card[data-page="${pageNumber}"]`);
    targetCards.forEach(card => card.style.display = 'flex');

    // تظبيط لون أزرار الأرقام
    const allBtns = document.querySelectorAll('.pagination .page-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    const currentBtn = document.getElementById(`btn-page-${pageNumber}`);
    if(currentBtn) {
        currentBtn.classList.add('active');
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// وظيفة إظهار التنبيهات المنبثقة
function createToast(message) {
    const container = document.getElementById('toast-container');
    if(!container) return; 

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    // إخفاء التنبيه بعد 4 ثواني
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ابدأ التنبيهات بعد ما الصفحة تفتح بـ 3 ثواني
setTimeout(() => {
    createToast("مرحباً بك! لا تنسَ مراجعة دورة الـ CPR الجديدة.");
}, 3000);

setTimeout(() => {
    createToast("تم تحديث مكتبة الأبحاث اليوم، تصفحها الآن!");
}, 8000);


// =========================================================
// 6. وظيفة القائمة السريعة وإغلاق النوافذ المنبثقة (بدون تضارب)
// =========================================================
function toggleQuickMenu(event) {
    if(event) {
        event.preventDefault();
        event.stopPropagation(); // منع التداخل مع ضغطات الشاشة
    }
    const menu = document.getElementById('quickMenu');
    const btn = document.getElementById('quickToggleBtn');
    
    if (menu) {
        menu.classList.toggle('active'); // استخدام الكلاس للتنسيق
        if(btn) btn.classList.toggle('active-btn');
    }
}

// نستخدم addEventListener لحل كل مشكلات التضارب بين الشاشات
document.addEventListener('click', function(event) {
    const menu = document.getElementById('quickMenu');
    const btn = document.getElementById('quickToggleBtn');
    const eqModal = document.getElementById('eqModal'); // مودال صفحة المعدات
    const archiveModal = document.getElementById('summaryModal'); // مودال الأرشيف

    // 1. إغلاق القائمة السريعة عند الضغط خارجها
    if (menu && menu.classList.contains('active')) {
        if (!menu.contains(event.target) && btn && !btn.contains(event.target)) {
            menu.classList.remove('active');
            btn.classList.remove('active-btn');
        }
    }

    // 2. إغلاق نافذة المعدات (إذا كنا في شاشتها)
    if (eqModal && event.target === eqModal) {
        eqModal.style.display = 'none';
    }

    // 3. إغلاق نافذة الأرشيف (إذا كنا في شاشتها)
    if (archiveModal && event.target === archiveModal) {
        archiveModal.style.display = 'none';
    }
});