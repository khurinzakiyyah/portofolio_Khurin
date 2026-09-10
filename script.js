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
        'Systems, Data & Processes',
        'Data Integration & Validation',
        'Industrial Automation & Control',
        'Process Analysis & Improvement',
        'SCADA & GIS Monitoring',
        'Computer Vision Systems'
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

    /* ---------- Certificate modal (PDF.js canvas render — view only) ---------- */
    const certModal = document.getElementById('cert-modal');
    if (certModal && window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pagesEl = document.getElementById('cert-modal-pages');
        const statusEl = document.getElementById('cert-modal-status');
        const certTitle = document.getElementById('cert-modal-title');
        let renderToken = 0;   // bumped on every open/close to abandon stale renders

        const setStatus = (msg) => {
            if (!msg) { statusEl.classList.add('hidden'); return; }
            statusEl.textContent = msg;
            statusEl.classList.remove('hidden');
        };

        const renderPdf = async (url, token) => {
            setStatus('Loading…');
            pagesEl.innerHTML = '';
            let pdf;
            try {
                pdf = await pdfjsLib.getDocument(url).promise;
                if (token !== renderToken) { pdf.destroy(); return; }

                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const targetW = Math.max(pagesEl.clientWidth - 40, 280);

                for (let n = 1; n <= pdf.numPages; n++) {
                    if (token !== renderToken) { pdf.destroy(); return; }
                    const page = await pdf.getPage(n);
                    const base = page.getViewport({ scale: 1 });
                    const viewport = page.getViewport({ scale: (targetW / base.width) * dpr });

                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    canvas.style.width = (viewport.width / dpr) + 'px';
                    pagesEl.appendChild(canvas);

                    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                    setStatus(null);
                }
            } catch (err) {
                console.error('Certificate render failed:', err);
                if (token === renderToken) setStatus('Could not load certificate');
            }
        };

        const openCert = (url, label) => {
            certTitle.textContent = label || 'Certificate';
            certModal.classList.add('open');
            certModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            renderPdf(url, ++renderToken);
        };
        const closeCert = () => {
            renderToken++;   // cancel any in-flight render
            certModal.classList.remove('open');
            certModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(() => { pagesEl.innerHTML = ''; setStatus('Loading…'); }, 220);
        };

        document.querySelectorAll('.cert-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const card = link.closest('.exp-card, .ach-card, .org-card');
                const heading = card?.querySelector('h3');
                openCert(link.getAttribute('href'), heading?.textContent.trim());
            });
        });

        certModal.querySelectorAll('[data-cert-close]').forEach(el => {
            el.addEventListener('click', closeCert);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('open')) closeCert();
        });
    }

});
