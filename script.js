document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling con compensación exacta para el header fijo
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // Selecciona todos los enlaces internos que comiencen con #
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Evitar errores con enlaces vacíos
            
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sistema de animación por scroll con delays escalonados
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Preparamos los elementos añadiendo la clase base (incluye todas las cartas estandarizadas)
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .education-card, .timeline-item, .contact-card');
    elementsToAnimate.forEach(el => el.classList.add('reveal-element'));

    const fadeInObserver = new IntersectionObserver((entries) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        intersectingEntries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); 
            
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