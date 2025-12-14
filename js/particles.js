// ===== Sistema de Partículas =====

class ParticleEffect {
    constructor() {
        this.container = document.getElementById('particleContainer');
        this.particles = [];
    }

    createParticle(x, y, type = 'click') {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Configurações por tipo de evento
        const config = {
            click: {
                colors: ['#e94560', '#ff6b9d', '#ff8fab', '#ffb3c1'],
                count: 12,
                speed: { min: 2, max: 6 },
                size: { min: 4, max: 10 },
                duration: 800
            },
            close: {
                colors: ['#ff4757', '#ee5a6f', '#ff6384', '#ffb3c1'],
                count: 16,
                speed: { min: 3, max: 8 },
                size: { min: 5, max: 12 },
                duration: 900
            },
            download: {
                colors: ['#00d4ff', '#0099ff', '#00ccff', '#33ddff'],
                count: 20,
                speed: { min: 2, max: 7 },
                size: { min: 4, max: 11 },
                duration: 1000
            }
        };

        const settings = config[type] || config.click;

        // Criar múltiplas partículas
        for (let i = 0; i < settings.count; i++) {
            const singleParticle = document.createElement('div');
            singleParticle.className = 'particle';

            const angle = (Math.PI * 2 * i) / settings.count;
            const speed = this.randomRange(settings.speed.min, settings.speed.max);
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = this.randomRange(settings.size.min, settings.size.max);
            const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
            const friction = 0.98;
            const gravity = 0.1;

            singleParticle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size}px ${color};
                pointer-events: none;
                opacity: 1;
                z-index: 501;
            `;

            this.container.appendChild(singleParticle);

            let posX = x;
            let posY = y;
            let velocityX = vx;
            let velocityY = vy;
            let opacity = 1;
            let elapsedTime = 0;
            const animationDuration = settings.duration;

            const animate = () => {
                elapsedTime += 16;

                // Aplicar velocidade
                posX += velocityX;
                posY += velocityY;

                // Aplicar fricção e gravidade
                velocityX *= friction;
                velocityY *= friction;
                velocityY += gravity;

                // Calcular opacidade (fade out)
                opacity = Math.max(0, 1 - (elapsedTime / animationDuration));

                singleParticle.style.cssText = `
                    position: absolute;
                    left: ${posX}px;
                    top: ${posY}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 ${size * opacity}px ${color};
                    pointer-events: none;
                    opacity: ${opacity};
                    z-index: 501;
                    filter: blur(${1 - opacity}px);
                `;

                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animate);
                } else {
                    singleParticle.remove();
                }
            };

            animate();
        }
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Efeito de partículas ao passar do mouse (hover)
    createHoverParticles(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const colors = ['rgba(233, 69, 96, 0.3)', 'rgba(255, 107, 157, 0.3)', 'rgba(255, 179, 193, 0.3)'];
        const size = this.randomRange(3, 6);
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            opacity: 1;
            z-index: 500;
        `;

        this.container.appendChild(particle);

        let posX = x;
        let posY = y;
        const vx = this.randomRange(-1, 1);
        const vy = this.randomRange(-1, 1);
        let opacity = 1;
        let elapsedTime = 0;
        const duration = 500;

        const animate = () => {
            elapsedTime += 16;

            posX += vx * 0.5;
            posY += vy * 0.5;
            opacity = Math.max(0, 1 - (elapsedTime / duration));

            particle.style.cssText = `
                position: absolute;
                left: ${posX}px;
                top: ${posY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${opacity};
                z-index: 500;
            `;

            if (elapsedTime < duration) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// Instância global de partículas
const particleEffect = new ParticleEffect();

// Função global para criar efeito de partículas
window.createParticleEffect = (x, y, type = 'click') => {
    particleEffect.createParticle(x, y, type);
};

// Adicionar efeito de hover a botões e elementos interativos
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.close-btn, .download-btn, .gallery-item, .nav-links a');

    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            // Criar partículas ocasionalmente ao passar do mouse
            if (Math.random() > 0.7) {
                particleEffect.createHoverParticles(e.clientX, e.clientY);
            }
        });
    });
});
