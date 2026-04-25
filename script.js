// Himalayan MC - Advanced JavaScript Engine
class HimalayanMC {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.serverStatus = {
            online: true,
            players: 248,
            maxPlayers: 1000,
            ping: 12,
            version: '1.20.4'
        };
        this.slideshowInterval = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.loadAnimations();
        this.startLoader();
        this.initParticles();
        this.initSlideshow();
        this.initNavbar();
        this.initServerStatus();
        this.initStore();
        this.initAuth();
        this.initScrollAnimations();
        this.updateServerStats();
    }

    // 🔄 LOADING SCREEN
    startLoader() {
        const loader = document.querySelector('.loader');
        const progress = document.querySelector('.loading-progress');
        
        let progressValue = 0;
        const loadingInterval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue > 95) progressValue = 95;
            progress.style.width = progressValue + '%';
        }, 100);

        setTimeout(() => {
            clearInterval(loadingInterval);
            progressValue = 100;
            progress.style.width = '100%';
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }, 3000);
    }

    // ✨ PARTICLE SYSTEM
    initParticles() {
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.save();
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animateParticles.bind(this));
        }
        animateParticles.call(this);
    }

    // 📱 MOBILE NAVBAR
    initNavbar() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 🖼️ SLIDESHOW
    initSlideshow() {
        const slides = document.querySelectorAll('.hero-slideshow .slide');
        let currentSlide = 0;

        this.slideshowInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 🟢 SERVER STATUS UPDATER
    initServerStatus() {
        setInterval(() => {
            this.updateServerStats();
        }, 5000);
    }

    updateServerStats() {
        // Simulate live server data
        this.serverStatus.players = Math.floor(Math.random() * 200) + 200;
        this.serverStatus.ping = Math.floor(Math.random() * 20) + 10;
        
        const playersEl = document.querySelector('.players span');
        const pingEl = document.querySelector('.ping span');
        
        if (playersEl) {
            playersEl.textContent = `${this.serverStatus.players}/${this.serverStatus.maxPlayers} Players`;
        }
        if (pingEl) {
            pingEl.textContent = `${this.serverStatus.ping}ms`;
        }
    }

    // 🛒 STORE SYSTEM
    initStore() {
        const storeProducts = document.getElementById('storeProducts');
        const userStatusStore = document.getElementById('userStatusStore');
        
        if (this.isLoggedIn) {
            userStatusStore.style.display = 'none';
            storeProducts.style.display = 'grid';
        }
    }

    buyItem(rank) {
        if (!this.isLoggedIn) {
            this.openLoginModal();
            return;
        }

        // Create purchase animation
        this.createPurchaseEffect(rank);
        
        // Simulate purchase
        const purchaseData = {
            starter: { price: 299, sikka: 500 },
            vip: { price: 799, sikka: 2000 },
            'mvp++': { price: 1999, sikka: 5000 },
            sikka: { price: 499, sikka: 1000 }
        };

        const successModal = this.createSuccessModal(purchaseData[rank]);
        document.body.appendChild(successModal);
        
        setTimeout(() => {
            successModal.remove();
        }, 4000);
    }

    createPurchaseEffect(rank) {
        const button = event.target;
        button.style.transform = 'scale(0.95)';
        button.innerHTML = '✅ PURCHASED!';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = 'BUY NOW';
        }, 2000);
        
        // Fireworks effect
        this.createFireworks(button.getBoundingClientRect().left + 50, button.getBoundingClientRect().top);
    }

    createFireworks(x, y) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
                document.body.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1000);
            }, i * 50);
        }
    }

    // 🔐 ADVANCED AUTH SYSTEM
    initAuth() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }

    handleLogin() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate API call
        setTimeout(() => {
            if (username && password.length > 3) {
                this.loginSuccess(username);
            } else {
                this.showError('Invalid credentials!');
            }
        }, 1500);
    }

    handleRegister() {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        
        setTimeout(() => {
            if (username && email && password.length > 5) {
                this.registerSuccess(username);
            } else {
                this.showError('Please fill all fields correctly!');
            }
        }, 1500);
    }

    loginSuccess(username) {
        this.isLoggedIn = true;
        this.currentUser = username;
        
        document.getElementById('userStatus').textContent = username;
        document.getElementById('loginTrigger').classList.add('logged-in');
        
        this.closeLoginModal();
        this.initStore();
        
        // Success notification
        this.showNotification('✅ Welcome back, ' + username + '! 🎮', 'success');
        
        // Update store visibility
        document.getElementById('userStatusStore').style.display = 'none';
        document.getElementById('storeProducts').style.display = 'grid';
    }

    registerSuccess(username) {
        this.isLoggedIn = true;
        this.currentUser = username;
        
        document.getElementById('userStatus').textContent = username;
        document.getElementById('loginTrigger').classList.add('logged-in');
        
        this.closeLoginModal();
        this.switchAuthTab('login');
        
        this.showNotification('🎉 Account created successfully! You are now logged in.', 'success');
        this.initStore();
    }

    // MODAL FUNCTIONS
    openLoginModal() {
        document.getElementById('loginModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLoginModal() {
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(tab + 'Form').classList.add('active');
        event.target.classList.add('active');
    }

    // NOTIFICATIONS
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    // 🎨 ANIMATIONS
    loadAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    initScrollAnimations() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // PURCHASE MODAL
    createSuccessModal(data) {
        const modal = document.createElement('div');
        modal.className = 'purchase-modal';
        modal.innerHTML = `
            <div class="purchase-content">
                <i class="fas fa-check-circle success-icon"></i>
                <h3 class="mc-font">Purchase Successful!</h3>
                <p>You received <strong>${data.sikka} Sikka</strong> for ₹${data.price}</p>
                <p>Check your in-game balance!</p>
                <div class="purchase-details">
                    <span>Order #${Math.floor(Math.random() * 1000000)}</span>
                    <span>Delivered instantly</span>
                </div>
                <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        return modal;
    }
}

// 🛠️ DONATION FUNCTIONS
function copyPayment(method) {
    const details = {
        paypal: 'himalayanmc@gmail.com',
        khalti: '+977 9840XXXXX',
        bank: 'Nabil Bank 0123456789012'
    };
    
    navigator.clipboard.writeText(details[method]);
    showToast(`Copied ${method} details!`);
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// 🎮 GLOBAL EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    window.himalayanMC = new HimalayanMC();
    
    // Login trigger
    document.getElementById('loginTrigger').addEventListener('click', (e) => {
        e.preventDefault();
        window.himalayanMC.openLoginModal();
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('loginModal');
        if (e.target === modal) {
            window.himalayanMC.closeLoginModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.himalayanMC.closeLoginModal();
        }
    });
});

// 🌟 SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 🔄 AUTO-REFRESH SERVER STATUS
setInterval(() => {
    if (window.himalayanMC) {
        window.himalayanMC.updateServerStats();
    }
}, 10000);

// 🎵 SOUND EFFECTS (Optional)
// Audio files would go here for purchase sounds, login sounds, etc.