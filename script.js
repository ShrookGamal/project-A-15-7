// التحكم في المنيو الخاصة بالموبايل
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // تحويل شكل الزرار لعلامة X
    menuBtn.classList.toggle('open');
});

// إغلاق المنيو عند الضغط على أي لينك
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// تغيير السهم العائم (أعلى/أسفل)
const scrollArrow = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollArrow.classList.remove('down');
        scrollArrow.style.opacity = "1";
        scrollArrow.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        scrollArrow.classList.add('down');
        scrollArrow.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    
    updateActiveSection();
});

// تحديد السكشن النشط (Active Section) في الناف بار
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

function updateActiveSection() {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
}

// أنميشن بسيط عند السكرول لظهور العناصر
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});
// أنميشن عداد الأرقام
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// تشغيل العداد فقط عند ظهور السكشن أمام المستخدم
const expSection = document.querySelector('.experience-section');
let counterStarted = false;

window.addEventListener('scroll', () => {
    const sectionPos = expSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !counterStarted) {
        startCounters();
        counterStarted = true;
    }
});
// أنميشن ظهور الخدمات بنعومة
const observerOptionsRefined = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptionsRefined);

document.querySelectorAll('.modern-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    serviceObserver.observe(card);
});
// كود فلترة المعرض
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // إزالة الكلاس النشط من الكل وإضافته للزر الحالي
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// تحسين تشغيل الفيديوهات (التشغيل التلقائي عند التحويم أو اللمس)
const allVideos = document.querySelectorAll('.video-item video');

allVideos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    video.addEventListener('mouseleave', () => {
        video.pause();
    });
    // للموبايل: تشغيل عند الضغط
    video.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
    });
});
// أنميشن سكشن تميزنا
const excellenceCards = document.querySelectorAll('.excellence-card');

const revealExcellence = () => {
    excellenceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
                card.style.boxShadow = "0 10px 30px rgba(0, 210, 255, 0.1)";
            }, index * 200);
        }
    });
};

// إعداد الحالة الأولية
excellenceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.9)";
    card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
});

window.addEventListener('scroll', revealExcellence);
// أنميشن سكشن التواصل
const contactCards = document.querySelectorAll('.glass-card-v3');

window.addEventListener('scroll', () => {
    contactCards.forEach(card => {
        const cardPos = card.getBoundingClientRect().top;
        if (cardPos < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

// إعداد مبدئي
contactCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 1s ease-out";
});