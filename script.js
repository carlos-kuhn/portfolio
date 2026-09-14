document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling con compensación exacta para el header fijo
    const headerHeight = document.querySelector('header').offsetHeight;
    
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nuevo sistema de animación por scroll (Intersection Observer) con delays escalonados
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Preparamos los elementos añadiendo la clase base para animación
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .education-card, .timeline-item');
    elementsToAnimate.forEach(el => el.classList.add('reveal-element'));

    const fadeInObserver = new IntersectionObserver((entries) => {
        // Agrupamos las entradas que se están intersectando al mismo tiempo
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        intersectingEntries.forEach((entry, index) => {
            // Aplicamos un retraso escalonado (stagger effect) basado en el índice
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // 100ms de diferencia entre cada aparición
            
            fadeInObserver.unobserve(entry.target);
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => fadeInObserver.observe(el));

    // Active class updater optimizado
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + headerHeight + 50;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`header nav a[href="#${sectionId}"]`);

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('header nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        });
    });
});