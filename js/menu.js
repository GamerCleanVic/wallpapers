// ===== Menu Mobile Responsivo =====

class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());

        // Fechar menu ao clicar em um link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => new MobileMenu());
