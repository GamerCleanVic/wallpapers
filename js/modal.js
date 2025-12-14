// ===== Sistema de Modal de Imagens - Otimizado =====

class ImageModal {
    // Array de imagens com URLs remotas
    static IMAGES = [
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta1.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta7.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta8.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta9.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta11.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta12.png',
        'https://raw.githubusercontent.com/GamerCleanVic/archives/refs/heads/main/images/floresta13.png'
    ];

    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.modalBackground = document.querySelector('.modal-background');
        this.currentImagePath = '';
        this.currentImageName = '';
        this.escapeHandler = (e) => e.key === 'Escape' && this.closeModal();

        this.init();
    }

    init() {
        this.loadGallery();
        this.attachEventListeners();
    }

    loadGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const fragment = document.createDocumentFragment();

        ImageModal.IMAGES.forEach((url, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = url;
            img.alt = `Wallpaper ${index + 1}`;
            img.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = '<span class="overlay-text">Clique para ampliar</span>';

            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            galleryItem.addEventListener('click', () => this.openModal(url, `wallpaper_${index + 1}.png`));

            fragment.appendChild(galleryItem);
        });

        galleryGrid.appendChild(fragment);
    }

    attachEventListeners() {
        const handleClose = (e) => {
            e.stopPropagation();
            this.createParticles(e, 'close');
            this.closeModal();
        };

        const handleDownload = (e) => {
            e.stopPropagation();
            this.createParticles(e, 'download');
            this.downloadImage();
        };

        this.closeBtn.addEventListener('click', handleClose);
        this.modalBackground.addEventListener('click', () => this.closeModal());
        this.downloadBtn.addEventListener('click', handleDownload);
    }

    openModal(imagePath, imageName) {
        this.currentImagePath = imagePath;
        this.currentImageName = imageName;
        this.modalImage.src = imagePath;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.escapeHandler);
    }

    closeModal = () => {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', this.escapeHandler);
    }

    downloadImage() {
        const link = document.createElement('a');
        link.href = this.currentImagePath;
        link.download = this.currentImageName;
        link.click();
    }

    createParticles(event, type) {
        window.createParticleEffect?.(event.clientX, event.clientY, type);
    }
}

// Inicializar quando pronto
document.addEventListener('DOMContentLoaded', () => new ImageModal());
