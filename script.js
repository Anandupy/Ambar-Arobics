/**
 * ANTRIKSH ANTIGRAVITY YOGA STUDIO
 * Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
        bars[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            resetHamburger();
        });
    });

    function resetHamburger() {
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- BACK TO TOP BUTTON ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // --- INTERSECTION OBSERVER FOR FADE-IN ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- POSTURE FILTERING ---
    const filterDropdown = document.getElementById('posture-filter');
    const postureCards = document.querySelectorAll('.posture-card');

    filterDropdown.addEventListener('change', (e) => {
        const category = e.target.value;
        
        postureCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });

    // --- MODAL SYSTEM ---
    const modal = document.getElementById('posture-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    postureCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const category = card.querySelector('.category-badge').innerText;
            const desc = card.querySelector('p').innerText;
            const benefits = card.querySelector('ul').innerHTML;
            const imgSrc = card.querySelector('img').src;
            const difficulty = card.querySelector('.difficulty').innerHTML;

            modalBody.innerHTML = `
                <div class="modal-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div class="modal-image">
                        <img src="${imgSrc}" alt="${title}" style="width: 100%; border-radius: 10px;">
                    </div>
                    <div class="modal-info">
                        <span class="category-badge ${category.toLowerCase().replace(' ', '-')}" style="position: static; display: inline-block; margin-bottom: 15px;">${category}</span>
                        <h2 style="margin-bottom: 10px;">${title}</h2>
                        <p style="font-style: italic; color: #666; margin-bottom: 20px;">${desc}</p>
                        <h4 style="margin-bottom: 10px;">Key Benefits:</h4>
                        <ul style="list-style: none; margin-bottom: 20px;">${benefits}</ul>
                        <div class="difficulty" style="border-top: 1px solid #eee; padding-top: 15px;">${difficulty}</div>
                        <div style="margin-top: 30px;">
                            <a href="https://wa.me/919876543210?text=I want to learn ${title}" class="btn btn-primary">Inquire About This Posture</a>
                        </div>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        if (name.length < 2) {
            showStatus('Please enter a valid name', 'error');
            return;
        }
        
        if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
            showStatus('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Simulate API call
        showStatus('Sending message...', '');
        
        setTimeout(() => {
            showStatus('Message sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });

    function showStatus(msg, type) {
        formStatus.innerText = msg;
        formStatus.className = 'form-status ' + type;
    }
});
