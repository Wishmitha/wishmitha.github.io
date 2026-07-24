document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Resume Modal Logic
    const modal = document.getElementById("resume-modal");
    const btn = document.getElementById("resume-btn");
    const span = document.getElementsByClassName("close-modal")[0];

    if (btn && modal) {
        btn.onclick = function() {
            modal.style.display = "block";
            // Disable body scroll
            document.body.style.overflow = "hidden";
        }

        span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }

    // Subtle hero glow that tracks the pointer (desktop only)
    const hero = document.getElementById('hero');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hero && !prefersReducedMotion && canHover) {
        let targetX = 0.55;
        let targetY = 0.4;
        let currentX = targetX;
        let currentY = targetY;
        let rafId = null;

        const updateGlow = () => {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;

            hero.style.setProperty('--glow-x', `${(currentX * 100).toFixed(2)}%`);
            hero.style.setProperty('--glow-y', `${(currentY * 100).toFixed(2)}%`);
            hero.style.setProperty('--glow-x2', `${((1 - currentX) * 100 * 0.85 + 8).toFixed(2)}%`);
            hero.style.setProperty('--glow-y2', `${((1 - currentY) * 100 * 0.7 + 15).toFixed(2)}%`);

            if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
                rafId = requestAnimationFrame(updateGlow);
            } else {
                rafId = null;
            }
        };

        const onPointerMove = (event) => {
            const rect = hero.getBoundingClientRect();
            if (rect.height === 0 || rect.width === 0) return;

            targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            targetY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

            if (!rafId) {
                rafId = requestAnimationFrame(updateGlow);
            }
        };

        hero.addEventListener('pointermove', onPointerMove, { passive: true });
    }
});
