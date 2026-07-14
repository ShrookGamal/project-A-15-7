const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const scrollArrow = document.getElementById('scroll-top');
const counters = document.querySelectorAll('.counter');
const expSection = document.querySelector('.experience-section');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const allVideos = document.querySelectorAll('.video-item video');
const excellenceCards = document.querySelectorAll('.excellence-card');
const contactCards = document.querySelectorAll('.glass-card-v3');
const modernCards = document.querySelectorAll('.modern-card');

let counterStarted = false;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        scrollArrow.classList.remove('down');
        scrollArrow.style.opacity = "1";
        scrollArrow.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        scrollArrow.classList.add('down');
        scrollArrow.style.opacity = "1";
        scrollArrow.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    
    updateActiveSection();

    if (expSection) {
        const sectionPos = expSection.getBoundingClientRect().top;
        if (sectionPos < window.innerHeight / 1.3 && !counterStarted) {
            startCounters();
            counterStarted = true;
        }
    }

    excellenceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
            }, index * 200);
        }
    });

    contactCards.forEach(card => {
        const cardPos = card.getBoundingClientRect().top;
        if (cardPos < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

function updateActiveSection() {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
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

    document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const inc = target / 200;
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

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

modernCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    serviceObserver.observe(card);
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
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

allVideos.forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
    video.addEventListener('click', () => video.paused ? video.play() : video.pause());
});

window.addEventListener('load', () => {
    portfolioItems.forEach(item => {
        item.classList.add('show');
    });
    updateActiveSection();
});