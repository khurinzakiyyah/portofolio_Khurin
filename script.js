/* =========================================================
   KHURIN ZAKIYYAH — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile nav ---------- */
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-menu');
        menuIcon.classList.toggle('bx-x');
    });
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('active'));
    });

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    const setActiveLink = () => {
        let current = sections[0]?.id;
        const offset = window.scrollY + 140;
        sections.forEach(sec => {
            if (offset >= sec.offsetTop) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Role text rotator ---------- */
    const roles = [
        'Industrial Automation Systems',
        'Computer Vision Grading Systems',
        'PLC & HMI Control Logic',
        'IoT-Connected Devices',
        'SCADA Monitoring Systems'
    ];
    const roleEl = document.getElementById('role-text');
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;

    function typeRole() {
        const word = roles[roleIndex];
        if (deleting) {
            charIndex--;
            roleEl.textContent = word.substring(0, charIndex);
            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 400);
                return;
            }
            setTimeout(typeRole, 35);
        } else {
            charIndex++;
            const nextWord = roles[roleIndex];
            roleEl.textContent = nextWord.substring(0, charIndex);
            if (charIndex >= nextWord.length) {
                deleting = true;
                setTimeout(typeRole, 1800);
                return;
            }
            setTimeout(typeRole, 55);
        }
    }
    setTimeout(typeRole, 1200);

    /* ---------- Skill bars animate on view ---------- */
    document.querySelectorAll('#skill-bars').forEach(skillBars => {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-row').forEach(row => {
                        const val = row.dataset.value;
                        row.querySelector('.fill').style.width = val + '%';
                    });
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        barObserver.observe(skillBars);
    });

});
