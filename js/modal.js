// ===== Sistema de Modal de Imagens =====

class ImageModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.modalBackground = document.querySelector('.modal-background');
        this.currentImagePath = '';
        this.currentImageName = '';

        this.init();
    }

    init() {
        this.loadGallery();
        this.setupEventListeners();
    }

    loadGallery() {
        // Carregar imagens da pasta images
        const images = ['floresta12.png']; // Adicione mais imagens conforme necessário
        const galleryGrid = document.querySelector('.gallery-grid');

        images.forEach((imageName, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="images/${imageName}" alt="Wallpaper ${index + 1}">
                <div class="gallery-overlay">
                    <span class="overlay-text">Clique para ampliar</span>
                </div>
            `;

            galleryItem.addEventListener('click', () => {
                this.openModal(`images/${imageName}`, imageName);
            });

            galleryGrid.appendChild(galleryItem);
        });
    }

    setupEventListeners() {
        // Fechar modal ao clicar no X
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.createParticles(e, 'close');
            setTimeout(() => this.closeModal(), 100);
        });

        // Fechar modal ao clicar no fundo
        this.modalBackground.addEventListener('click', () => {
            this.closeModal();
        });

        // Download da imagem
        this.downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.createParticles(e, 'download');
            this.downloadImage();
        });

        // Fechar modal com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(imagePath, imageName) {
        this.currentImagePath = imagePath;
        this.currentImageName = imageName;
        this.modalImage.src = imagePath;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    downloadImage() {
        const link = document.createElement('a');
        link.href = this.currentImagePath;
        link.download = this.currentImageName || 'wallpaper.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    createParticles(event, type) {
        // Importar função de partículas do arquivo particles.js
        if (window.createParticleEffect) {
            window.createParticleEffect(event.clientX, event.clientY, type);
        }
    }
}

// Inicializar modal quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ImageModal();
});
