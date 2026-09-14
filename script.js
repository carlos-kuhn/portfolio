// Portfolio Scripts - Smooth scrolling and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const animateOnScroll = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    };

    // Animate cards when they come into view
    animateOnScroll(document.querySelectorAll('.skill-card'), 'card-visible');
    animateOnScroll(document.querySelectorAll('.project-card'), 'card-visible');
    animateOnScroll(document.querySelectorAll('.education-card'), 'card-visible');
    animateOnScroll(document.querySelectorAll('.course-item'), 'course-visible');
    animateOnScroll(document.querySelectorAll('.timeline-item'), 'timeline-visible');

    // Add active class to navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`header nav a[href="#${sectionId}"]`);

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('header nav a').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });

    // Simple card animation when added to DOM
    const fadeInAnimation = () => {
        const animatedElements = document.querySelectorAll('.card-visible, .timeline-visible, .course-visible');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(el);
        });
    };

    // Run animations after a short delay to ensure CSS is applied
    setTimeout(fadeInAnimation, 100);

    console.log('Portfolio loaded successfully!');
});
