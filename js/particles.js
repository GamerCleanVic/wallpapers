// ===== Sistema de Partículas - Otimizado =====

class ParticleEffect {
    static CONFIG = {
        click: {
            colors: ['#e94560', '#ff6b9d', '#ff8fab', '#ffb3c1'],
            count: 10,
            speed: { min: 2, max: 6 },
            size: { min: 4, max: 10 },
            duration: 700
        },
        close: {
            colors: ['#ff4757', '#ee5a6f', '#ff6384', '#ffb3c1'],
            count: 14,
            speed: { min: 3, max: 8 },
            size: { min: 5, max: 12 },
            duration: 800
        },
        download: {
            colors: ['#00d4ff', '#0099ff', '#00ccff', '#33ddff'],
            count: 16,
            speed: { min: 2, max: 7 },
            size: { min: 4, max: 11 },
            duration: 900
        }
    };

    static FRICTION = 0.98;
    static GRAVITY = 0.1;

    constructor() {
        this.container = document.getElementById('particleContainer');
    }

    createParticle(x, y, type = 'click') {
        const settings = ParticleEffect.CONFIG[type] || ParticleEffect.CONFIG.click;
        const angleStep = (Math.PI * 2) / settings.count;

        for (let i = 0; i < settings.count; i++) {
            const particle = document.createElement('div');
            const angle = angleStep * i;
            const speed = this.randomRange(settings.speed.min, settings.speed.max);
            const size = this.randomRange(settings.size.min, settings.size.max);
            const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];

            particle.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;opacity:1;z-index:501`;

            this.container.appendChild(particle);

            let posX = x, posY = y;
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed;
            let opacity = 1;
            let elapsed = 0;
            const duration = settings.duration;

            const animate = () => {
                elapsed += 16;
                posX += vx;
                posY += vy;
                vx *= ParticleEffect.FRICTION;
                vy *= ParticleEffect.FRICTION;
                vy += ParticleEffect.GRAVITY;
                opacity = Math.max(0, 1 - (elapsed / duration));

                particle.style.cssText = `position:absolute;left:${posX}px;top:${posY}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;opacity:${opacity};z-index:501`;

                if (elapsed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            animate();
        }
    }

    createHoverParticles(x, y) {
        if (Math.random() > 0.7) return;

        const particle = document.createElement('div');
        const size = this.randomRange(2, 5);
        const colors = ['rgba(233,69,96,0.3)', 'rgba(255,107,157,0.3)', 'rgba(255,179,193,0.3)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;opacity:1;z-index:500`;
        this.container.appendChild(particle);

        const vx = this.randomRange(-1, 1) * 0.5;
        const vy = this.randomRange(-1, 1) * 0.5;
        let posX = x, posY = y, opacity = 1, elapsed = 0;
        const duration = 400;

        const animate = () => {
            elapsed += 16;
            posX += vx;
            posY += vy;
            opacity = Math.max(0, 1 - (elapsed / duration));

            particle.style.cssText = `position:absolute;left:${posX}px;top:${posY}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;opacity:${opacity};z-index:500`;

            if (elapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }


    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// Instância global
const particleEffect = new ParticleEffect();

// Função global otimizada
window.createParticleEffect = (x, y, type = 'click') => {
    particleEffect.createParticle(x, y, type);
};

// Setup de eventos com delegação
document.addEventListener('DOMContentLoaded', () => {
    const handleMouseMove = (e) => {
        particleEffect.createHoverParticles(e.clientX, e.clientY);
    };

    // Usar event delegation ao invés de múltiplos listeners
    document.addEventListener('mousemove', handleMouseMove, { capture: false, passive: true });
});
