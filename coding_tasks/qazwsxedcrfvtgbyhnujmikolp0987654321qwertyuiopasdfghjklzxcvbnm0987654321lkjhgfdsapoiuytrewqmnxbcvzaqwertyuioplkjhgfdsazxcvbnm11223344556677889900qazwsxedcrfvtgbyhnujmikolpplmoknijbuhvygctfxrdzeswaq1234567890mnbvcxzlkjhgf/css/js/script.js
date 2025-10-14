// Inisialisasi AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', function() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Gallery filter
if (document.querySelector('.filter-btn')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    // Re-trigger AOS animation
                    item.setAttribute('data-aos', 'fade-up');
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Refresh AOS
            AOS.refresh();
        });
    });
}

// Lightbox
if (document.querySelector('.view-btn')) {
    const viewBtns = document.querySelectorAll('.view-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('.lightbox-info h3');
    const lightboxDesc = lightbox.querySelector('.lightbox-info p');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Gallery data
    const galleryData = {
        1: {
            src: 'assets/images/galeri/1580158815.jpg',
            title: 'Pemandangan Alam',
            desc: 'Fotografi'
        },
        2: {
            src: 'assets/images/galeri/1735402517.jpg',
            title: 'Pantai',
            desc: 'Fotografi'
        },
        3: {
            src: 'https://picsum.photos/seed/gallery3/1200/800.jpg',
            title: 'Proyek Web',
            desc: 'Proyek'
        },
        4: {
            src: 'assets/images/galeri/1614704514.jpg',
            title: 'Food',
            desc: 'Fotografi'
        },
        5: {
            src: 'https://picsum.photos/seed/gallery5/1200/800.jpg',
            title: 'Logo Design',
            desc: 'Desain'
        },
        6: {
            src: 'https://picsum.photos/seed/gallery6/1200/800.jpg',
            title: 'Mobile App',
            desc: 'Proyek'
        }
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            const data = galleryData[id];
            
            lightboxImg.src = data.src;
            lightboxTitle.textContent = data.title;
            lightboxDesc.textContent = data.desc;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Blog pagination
if (document.querySelector('.pagination-btn')) {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button (if it's a number)
            if (!isNaN(this.textContent)) {
                this.classList.add('active');
            }
            
            // In a real application, this would load new blog posts
            // For now, we'll just scroll to the top of the blog section
            document.querySelector('.blog-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with the 'animate-on-scroll' class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

 // Anti-Download & Anti-Screenshot Protection
document.addEventListener('DOMContentLoaded', function() {
    // ========== ANTI RIGHT-CLICK ==========
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showProtectionMessage('Hayo Mau Ngapain');
        return false;
    });

    // ========== ANTI DRAG & DROP ==========
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.classList.contains('image-container')) {
            e.preventDefault();
            showProtectionMessage('Image dragging disabled');
            return false;
        }
    });

    // ========== ANTI KEYBOARD SHORTCUTS ==========
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+S, Ctrl+Shift+S, Cmd+S
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showProtectionMessage('Saving disabled');
            return false;
        }
        
        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            showProtectionMessage('Developer tools disabled');
            return false;
        }
        
        // Disable Ctrl+Shift+I, Cmd+Option+I (Inspect)
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.metaKey && e.altKey && e.key === 'I')) {
            e.preventDefault();
            showProtectionMessage('Inspect element disabled');
            return false;
        }
        
        // Disable Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showProtectionMessage('Inspect element disabled');
            return false;
        }
        
        // Disable Print Screen
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            e.preventDefault();
            showProtectionMessage('Screenshot disabled');
            return false;
        }
        
        // Disable Alt+Print Screen
        if (e.altKey && (e.key === 'PrintScreen' || e.keyCode === 44)) {
            e.preventDefault();
            showProtectionMessage('Screenshot disabled');
            return false;
        }
    });

    // ========== ANTI SCREENSHOT DETECTION ==========
    // Deteksi jika ada attempt screenshot menggunakan Print Screen
    window.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            showProtectionMessage('Screenshot detected and blocked');
            // Clear clipboard
            navigator.clipboard.writeText('').catch(err => {});
        }
    });

    // ========== ANTI DEVELOPER TOOLS ==========
    // Deteksi pembukaan Developer Tools
    function detectDevTools() {
        const threshold = 160; // lebar devtools
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0A0F1E;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                ">
                    <div>
                        <h1 style="color: #6C63FF; margin-bottom: 20px;">⚠️ Access Restricted</h1>
                        <p>Developer tools are not allowed on this page.</p>
                        <p>Please close the developer tools to continue.</p>
                    </div>
                </div>
            `;
            throw new Error('Developer tools detected');
        }
    }

    // Check periodically for devtools
    setInterval(detectDevTools, 1000);

    // ========== ANTI IFRAME ==========
    // Prevent site from being embedded in iframe
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // ========== ANTI COPY-PASTE ==========
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        showProtectionMessage('Copying disabled');
        return false;
    });

    document.addEventListener('cut', function(e) {
        e.preventDefault();
        showProtectionMessage('Cutting disabled');
        return false;
    });

    document.addEventListener('paste', function(e) {
        e.preventDefault();
        showProtectionMessage('Pasting disabled');
        return false;
    });

    // ========== PROTECTION MESSAGE ==========
    function showProtectionMessage(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = `🛡️ ${message}`;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ========== ADVANCED PROTECTION ==========
    // Blink detection (some screenshot tools cause brief visibility changes)
    let lastVisibility = document.visibilityState;
    document.addEventListener('visibilitychange', function() {
        if (lastVisibility === 'visible' && document.visibilityState === 'hidden') {
            // Possible screenshot attempt
            showProtectionMessage('Suspicious activity detected');
        }
        lastVisibility = document.visibilityState;
    });

    // Mouse movement tracking for suspicious behavior
    let mouseMoveCount = 0;
    document.addEventListener('mousemove', function() {
        mouseMoveCount++;
        if (mouseMoveCount > 100) { // Reset counter periodically
            mouseMoveCount = 0;
        }
    });

    // ========== IMAGE SPECIFIC PROTECTION ==========
    // Add protection layer to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add transparent overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 10;
            pointer-events: none;
        `;
        
        if (img.parentNode) {
            img.parentNode.style.position = 'relative';
            img.parentNode.appendChild(overlay);
        }

        // Prevent image loading if right-clicked
        img.addEventListener('mousedown', function(e) {
            if (e.button === 2) { // Right click
                e.preventDefault();
                return false;
            }
        });
    });

    console.log('🛡️ Protection system activated');
});

// Additional protection for page refresh attempts
window.addEventListener('beforeunload', function(e) {
    // This might be too aggressive, use with caution
    // e.preventDefault();
    // e.returnValue = 'Are you sure you want to leave?';
});

// Protection against browser extensions
if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
    // Detected Chrome extensions - you might want to handle this differently
    console.warn('Browser extensions detected');
}

// Games page animations
if (document.querySelector('.game-card')) {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Prevent scrolling when game modal is open
const gameModal = document.getElementById('gameModal');
if (gameModal) {
    gameModal.addEventListener('wheel', function(e) {
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer && gameContainer.contains(e.target)) {
            // Allow scrolling inside game container
            return;
        }
        e.preventDefault();
    }, { passive: false });
}

// 404 Page Easter Egg
if (window.location.pathname.includes('404')) {
    // Add some special interactions for 404 page
    console.log('%c😢 Halaman ini merasa kesepian...', 'color: #6C63FF; font-size: 20px; font-weight: bold;');
    console.log('%cCoba hibur halaman ini dengan klik tombol "Hibur Aku"!', 'color: #ff6b6b; font-size: 14px;');
    
    // Konami code for easter egg
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            
            const message = document.getElementById('messageBubble');
            if (message) {
                message.textContent = "KODE KONAMI! Kamu adalah legenda! 🎮🏆";
                message.classList.add('show');
                
                // Create massive confetti
                for (let i = 0; i < 100; i++) {
                    setTimeout(() => createHeart(), i * 50);
                }
                
                setTimeout(() => {
                    message.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// Rainbow animation for Konami code
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 404 Page Handler - Simplified version
document.addEventListener('DOMContentLoaded', function() {
    // Get current path
    const currentPath = window.location.pathname;
    
    // List of valid paths (both with and without .html)
    const validPaths = [
        '/',
        '/index.html',
        '/about',
        '/about.html',
        '/gallery',
        '/gallery.html',
        '/blog',
        '/blog.html',
        '/games',
        '/games.html',
        '/coding_tasks/tugas_all',
        '/coding_tasks/tugas_all.html',
        '/coding_tasks/tugas1_biodata',
        '/coding_tasks/tugas1_biodata.html',
        '/coding_tasks/tugas2_list_biodata',
        '/coding_tasks/tugas2_list_biodata.html'
    ];


    // Check if current path is valid
    const isValidPath = validPaths.includes(currentPath) || 
                       currentPath.startsWith('/coding_tasks/') || 
                       currentPath.endsWith('.html');
    
    // If not valid, redirect to 404 page
    if (!isValidPath && !currentPath.includes('404')) {
        // Store the attempted URL for reference
        sessionStorage.setItem('attemptedUrl', window.location.href);
        
        // Redirect to 404 page
        window.location.href = '/404.html';
    }
    
    // If on 404 page, check if there's a referrer
    if (currentPath.includes('404')) {
        const attemptedUrl = sessionStorage.getItem('attemptedUrl');
        if (attemptedUrl) {
            console.log(`Attempted to access: ${attemptedUrl}`);
            // You can display this information on the 404 page if needed
        }
    }
});

// Handle navigation links to prevent 404s - Simplified version
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname === window.location.hostname) {
        const href = link.getAttribute('href');
        
        // Check if it's a relative link (with or without leading slash)
        if (href && !href.includes('http')) {
            // Convert to full path for validation
            let fullPath = href;
            if (!href.startsWith('/')) {
                fullPath = '/' + href;
            }
            
            // List of valid paths (both with and without .html)
            const validPaths = [
                '/index.html',
                '/about',
                '/about.html',
                '/gallery',
                '/gallery.html',
                '/blog',
                '/blog.html',
                '/games',
                '/games.html',
                '/coding_tasks/tugas_all',
                '/coding_tasks/tugas_all.html',
                '/coding_tasks/tugas1_biodata',
                '/coding_tasks/tugas1_biodata.html',
                '/coding_tasks/tugas2_list_biodata',
                '/coding_tasks/tugas2_list_biodata.html'
            ];
            
            // If path is not valid, prevent default and show 404
            if (!validPaths.includes(fullPath) && !fullPath.startsWith('/coding_tasks/')) {
                e.preventDefault();
                sessionStorage.setItem('attemptedUrl', fullPath);
                window.location.href = '/404.html';
            }
        }
    }
});

// Di dalam fungsi login()
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-message');
    
    // Reset error message
    errorMsg.style.display = 'none';
    
    // Basic validation
    if (!username || !password) {
        errorMsg.style.display = 'block';
        return;
    }
    
    // Show loading state
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate API call
    setTimeout(() => {
        // Reset button after simulated API call
        loginBtn.innerHTML = originalText;
        
        // Simulate successful login
        setTimeout(() => {
            showAlert('success', 'Login Berhasil!', 'Selamat datang Anda berhasil login!', 'Go to Dashboard', 'Close', 
                            () => { 
                window.location.href = 'dashboard.html'; 
            }, 
                            () => { closeAuthModal(); });
        }, 1500);
    }, 1500);
}