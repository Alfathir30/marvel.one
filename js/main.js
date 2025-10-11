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
            src: 'https://picsum.photos/seed/gallery1/1200/800.jpg',
            title: 'Pemandangan Alam',
            desc: 'Fotografi'
        },
        2: {
            src: 'https://picsum.photos/seed/gallery2/1200/800.jpg',
            title: 'Desain UI',
            desc: 'Desain'
        },
        3: {
            src: 'https://picsum.photos/seed/gallery3/1200/800.jpg',
            title: 'Proyek Web',
            desc: 'Proyek'
        },
        4: {
            src: 'https://picsum.photos/seed/gallery4/1200/800.jpg',
            title: 'Street Photography',
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

// 404 Page Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get current path
    const currentPath = window.location.pathname;
    
    // List of valid paths
    const validPaths = [
        '/',
        '/index.html',
        '/about.html',
        '/gallery.html',
        '/blog.html',
        '/games.html',
        '/coding_tasks/tugas_all.html',
        '/coding_tasks/tugas1_biodata.html',
        '/coding_tasks/tugas2_list_biodata.html'
    ];
    
    // Check if current path is valid
    const isValidPath = validPaths.includes(currentPath) || 
                       currentPath.startsWith('/coding_tasks/') || 
                       currentPath.startsWith('/all/')
                       currentPath.endsWith('.html');
    
    // If not valid, redirect to 404 page
    if (!isValidPath && !currentPath.includes('404.html')) {
        // Store the attempted URL for reference
        sessionStorage.setItem('attemptedUrl', window.location.href);
        
        // Redirect to 404 page
        window.location.href = '404.html';
    }
    
    // If on 404 page, check if there's a referrer
    if (currentPath.includes('404.html')) {
        const attemptedUrl = sessionStorage.getItem('attemptedUrl');
        if (attemptedUrl) {
            console.log(`Attempted to access: ${attemptedUrl}`);
            // You can display this information on the 404 page if needed
        }
    }
});

// Handle navigation links to prevent 404s
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname === window.location.hostname) {
        const href = link.getAttribute('href');
        
        // Check if it's a relative link
        if (href && href.startsWith('/') && !href.includes('http')) {
            // Convert to full path for validation
            const fullPath = href === '/' ? '/index.html' : href;
            
            // List of valid paths
            const validPaths = [
                '/index.html',
                '/about.html',
                '/gallery.html',
                '/blog.html',
                '/games.html',
                '/coding_tasks/tugas_all.html',
                '/coding_tasks/tugas1_biodata.html',
                '/coding_tasks/tugas2_list_biodata.html'
            ];
            
            // If path is not valid, prevent default and show 404
            if (!validPaths.includes(fullPath) && !fullPath.startsWith('/coding_tasks/')) {
                e.preventDefault();
                sessionStorage.setItem('attemptedUrl', fullPath);
                window.location.href = '404.html';
            }
        }
    }
});