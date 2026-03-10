// 1. وظيفة الأسئلة الشائعة في الصفحة الرئيسية
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
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

// =========================================================
// 2. معالجة نماذج التواصل (محدث للعمل مع Formspree بالخلفية)
// =========================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // نمنع تحديث الصفحة الافتراضي
        
        // جلب البيانات من الفورم
        const formData = new FormData(this);
        const nameInput = this.querySelector('input[name="الاسم"], input[type="text"]');
        const name = nameInput ? nameInput.value : 'ممرض/ة';

        // تغيير نص الزر أثناء الإرسال (اختياري لكنه احترافي)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        // إرسال البيانات لـ Formspree في الخلفية
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('شكراً لتواصلك معنا ' + name + '. تم استلام رسالتك وسنرد عليك قريباً!');
                this.reset(); // تفريغ الحقول بعد النجاح
            } else {
                alert('عذراً، حدثت مشكلة أثناء الإرسال. يرجى المحاولة لاحقاً.');
            }
        })
        .catch(error => {
            alert('خطأ في الاتصال! يرجى التأكد من اتصالك بالإنترنت.');
        })
        .finally(() => {
            // إرجاع الزر لشكله الطبيعي
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
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
const modal = document.getElementById("summaryModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

if (modal && closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openSummary(title, text) {
    if (modalTitle && modalBody && modal) {
        modalTitle.innerText = title;
        modalBody.innerText = text;
        modal.style.display = "block";
    }
}

// =========================================================
// 5. برمجة التنقل بين الصفحات (Pagination) في صفحة الأرشيف
// =========================================================
let currentPage = 1; 
const totalPages = 3; 

function goToPage(pageNumber) {
    currentPage = pageNumber; 
    
    const allCards = document.querySelectorAll('.result-card');
    if (allCards.length === 0) return; 
    
    allCards.forEach(card => card.style.display = 'none');

    const targetCards = document.querySelectorAll(`.result-card[data-page="${pageNumber}"]`);
    targetCards.forEach(card => card.style.display = 'flex');

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


// وظيفة فتح وإغلاق قائمة الشاشات السريعة
function toggleQuickMenu() {
    const menu = document.getElementById('quickMenu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// إغلاق القائمة عند الضغط في أي مكان خارجها
window.onclick = function(event) {
    const menu = document.getElementById('quickMenu');
    const btn = document.querySelector('.quick-access-btn');
    if (event.target !== menu && !menu.contains(event.target) && event.target !== btn && !btn.contains(event.target)) {
        menu.style.display = 'none';
    }
}