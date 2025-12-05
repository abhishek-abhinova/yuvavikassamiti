// Gallery functionality

let currentImageIndex = 0;
let filteredImages = [];

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupFilterButtons();
    setupLightbox();
});

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    filteredImages = Array.from(galleryItems);
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            filterGallery(filter);
        });
    });
}

function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    filteredImages = [];
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('hide');
            item.classList.add('show');
            filteredImages.push(item);
        } else {
            item.classList.remove('show');
            item.classList.add('hide');
        }
    });
    
    // Add stagger animation
    filteredImages.forEach((item, index) => {
        setTimeout(() => {
            item.style.animationDelay = `${index * 0.1}s`;
        }, 50);
    });
}

function setupLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav lightbox-prev">&#8249;</button>
                <button class="lightbox-nav lightbox-next">&#8250;</button>
                <img id="lightbox-image" src="" alt="">
                <div class="lightbox-info">
                    <h4 id="lightbox-title"></h4>
                    <p id="lightbox-description"></p>
                    <div id="lightbox-category" class="lightbox-category"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Setup lightbox event listeners
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

function openLightbox(index) {
    const visibleItems = document.querySelectorAll('.gallery-item.show, .gallery-item:not(.hide)');
    currentImageIndex = Array.from(visibleItems).indexOf(filteredImages[index]) || index;
    
    updateLightboxContent();
    
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    updateLightboxContent();
}

function showNextImage() {
    currentImageIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxContent();
}

function updateLightboxContent() {
    if (filteredImages.length === 0) return;
    
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const overlay = currentItem.querySelector('.gallery-overlay');
    const title = overlay.querySelector('h4').textContent;
    const description = overlay.querySelector('p').textContent;
    const category = overlay.querySelector('.gallery-category').textContent;
    
    // Update lightbox elements
    document.getElementById('lightbox-image').src = img.src;
    document.getElementById('lightbox-image').alt = img.alt;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
    document.getElementById('lightbox-category').textContent = category;
    
    // Update navigation button visibility
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (filteredImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Search functionality
function setupGallerySearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search gallery...';
    searchInput.className = 'gallery-search';
    
    const filterSection = document.querySelector('.gallery-filters .container');
    filterSection.appendChild(searchInput);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const category = item.querySelector('.gallery-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Masonry layout (optional enhancement)
function initMasonryLayout() {
    const grid = document.querySelector('.gallery-grid');
    
    if (window.innerWidth > 768) {
        grid.classList.add('masonry');
    } else {
        grid.classList.remove('masonry');
    }
}

// Resize handler
window.addEventListener('resize', () => {
    initMasonryLayout();
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                showPreviousImage();
            } else {
                showNextImage();
            }
        }
    }
}

// Gallery statistics
function getGalleryStats() {
    const categories = {};
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        categories[category] = (categories[category] || 0) + 1;
    });
    
    return {
        total: galleryItems.length,
        categories: categories
    };
}

// Export functionality
function downloadImage(imageUrl, filename) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || 'gallery-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add download button to lightbox
function addDownloadButton() {
    const lightboxInfo = document.querySelector('.lightbox-info');
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
    downloadBtn.className = 'btn btn-outline download-btn';
    downloadBtn.style.marginTop = '15px';
    
    downloadBtn.addEventListener('click', () => {
        const currentImage = document.getElementById('lightbox-image');
        const title = document.getElementById('lightbox-title').textContent;
        downloadImage(currentImage.src, `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`);
    });
    
    lightboxInfo.appendChild(downloadBtn);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    setupLazyLoading();
    initMasonryLayout();
    addDownloadButton();
    
    // Optional: Add search functionality
    // setupGallerySearch();
});

// Performance optimization: Debounce filter function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to filter function
const debouncedFilter = debounce(filterGallery, 300);