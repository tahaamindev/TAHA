
        // ===== LOADING SCREEN =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 800);
        });

        // ===== SCROLL PROGRESS BAR =====
        const scrollProgress = document.getElementById('scrollProgress');
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });

        // ===== NAVBAR SCROLL BEHAVIOR =====
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // ===== ACTIVE NAV LINK =====
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-container .links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop - 150;
                if (scrollY >= top) current = section.getAttribute('id');
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) link.classList.add('active');
            });
        });

        // ===== MOBILE MENU =====
        function hamburg() {
            document.getElementById('dropdown').style.transform = 'translateY(0)';
        }
        function cancel() {
            document.getElementById('dropdown').style.transform = 'translateY(-600px)';
        }

        // ===== TYPEWRITER EFFECT =====
        const typedTextEl = document.getElementById('typedText');
        const words = ['Web Developer', 'UI Designer', 'Freelancer', 'Problem Solver', 'Tech Enthusiast'];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }
            setTimeout(typeEffect, speed);
        }
        setTimeout(typeEffect, 1000);

        // ===== MOUSE GLOW (HERO) =====
        const mouseGlow = document.getElementById('mouseGlow');
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseGlow.style.left = (e.clientX - rect.left) + 'px';
            mouseGlow.style.top = (e.clientY - rect.top) + 'px';
        });

        // ===== PARTICLE CANVAS =====
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(14, 239, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(14, 239, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // ===== SCROLL REVEAL ANIMATIONS =====
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));

        // ===== COUNTER ANIMATION =====
        const counters = document.querySelectorAll('.counter');
        let counterStarted = false;
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        const update = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.floor(current);
                                requestAnimationFrame(update);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        update();
                    });
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));

        // ===== SKILL BARS ANIMATION =====
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });
        skillBars.forEach(bar => skillObserver.observe(bar));

        // ===== PROJECT FILTER =====
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 400);
                    }
                });
            });
        });

        // ===== TOAST NOTIFICATION =====
        function showToast(message, icon = 'fa-solid fa-check-circle') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="${icon}"></i><span class="toast-text">${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 400);
            }, 3500);
        }

        // ===== CONTACT FORM =====
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'fa-solid fa-exclamation-circle');
                return;
            }

            showToast(`Thanks ${name}! Your message has been sent.`, 'fa-solid fa-check-circle');
            this.reset();
        });

        // ===== BACK TO TOP =====
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ===== TILT EFFECT ON SERVICE CARDS =====
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
