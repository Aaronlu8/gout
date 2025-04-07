document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-pink-500');
                    link.classList.add('text-gray-700');
                    
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.remove('text-gray-700');
                        link.classList.add('text-pink-500');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Smooth scroll to sections with animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll-up button behavior
    const scrollUpButton = document.createElement('button');
    scrollUpButton.innerHTML = '<i data-lucide="chevron-up" class="w-5 h-5"></i>';
    scrollUpButton.className = 'fixed bottom-5 right-5 bg-pink-500 text-white p-3 rounded-full shadow-md hidden transition-opacity duration-300 hover:bg-pink-600';
    scrollUpButton.id = 'scrollUpBtn';
    document.body.appendChild(scrollUpButton);
    
    scrollUpButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    function toggleScrollUpButton() {
        if (window.scrollY > 500) {
            scrollUpButton.classList.remove('hidden');
            scrollUpButton.classList.add('flex', 'items-center', 'justify-center');
        } else {
            scrollUpButton.classList.add('hidden');
            scrollUpButton.classList.remove('flex', 'items-center', 'justify-center');
        }
    }
    
    window.addEventListener('scroll', toggleScrollUpButton);
    
    // Initialize and update icons after creating the scroll button
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Prevent zooming on mobile devices
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if (isPinching) e.preventDefault();
    }, { passive: false });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    }
    
    window.addEventListener('scroll', checkInView);
    checkInView(); // Check initially
});
