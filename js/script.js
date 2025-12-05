// Premium Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Initialize AOS with premium settings
AOS.init({
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    mirror: false,
    offset: 50,
    delay: 100
});

// Premium Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Premium Navbar scroll effect with throttling
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.05)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Initialize Premium Swiper
const swiper = new Swiper('.projectSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 600,
    effect: 'slide',
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        480: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    on: {
        slideChange: function () {
            // Add premium slide transition effects
            this.slides.forEach((slide, index) => {
                if (index === this.activeIndex) {
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.transform = 'scale(0.95)';
                }
            });
        },
    },
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Smooth scrolling for anchor links
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg::before');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Form validation and submission
function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#27ae60';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! We will contact you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add notification animations to CSS
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
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    }
`;
document.head.appendChild(style);

// Initialize form handlers
document.addEventListener('DOMContentLoaded', () => {
    handleFormSubmit('contactForm');
    handleFormSubmit('donationForm');
});

// Lightbox functionality for gallery
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            createLightbox(img.src, img.alt);
        });
    });
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(lightboxStyle);

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', initLightbox);

// Project modal functionality
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Project data (in a real app, this would come from a database)
    const projects = {
        'jal-jeevan': {
            title: 'Jal Jeevan Mission (ISA)',
            image: 'https://via.placeholder.com/600x300/1a4b84/ffffff?text=Jal+Jeevan+Mission',
            description: 'Ensuring safe drinking water access to rural households through sustainable water management systems and community participation.',
            objectives: [
                'Provide functional household tap connections',
                'Ensure water quality monitoring',
                'Build community capacity for water management',
                'Promote water conservation practices'
            ],
            impact: 'Over 10,000 households provided with clean water access'
        },
        'bal-gurukul': {
            title: 'Bal Gurukul',
            image: 'https://via.placeholder.com/600x300/27ae60/ffffff?text=Bal+Gurukul',
            description: 'Quality education program for underprivileged children with focus on holistic development and life skills.',
            objectives: [
                'Provide quality primary education',
                'Develop life skills and values',
                'Ensure nutritional support',
                'Create child-friendly learning environment'
            ],
            impact: '500+ children receiving quality education annually'
        }
        // Add more projects as needed
    };
    
    const project = projects[projectId];
    if (project && modal && modalContent) {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${project.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                <p class="modal-description">${project.description}</p>
                <div class="modal-objectives">
                    <h4>Key Objectives:</h4>
                    <ul>
                        ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-impact">
                    <h4>Impact:</h4>
                    <p>${project.impact}</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.display = 'none';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Premium scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    let scrollTicking = false;
    
    // Show/hide scroll button with throttling
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.pageYOffset > 400) {
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.visibility = 'visible';
                    scrollBtn.style.transform = 'scale(1)';
                } else {
                    scrollBtn.style.opacity = '0';
                    scrollBtn.style.visibility = 'hidden';
                    scrollBtn.style.transform = 'scale(0.8)';
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    
    // Premium scroll to top with smooth animation
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.3)';
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);