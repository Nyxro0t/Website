// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});


// Animation for skill progress bars on scroll
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const position = progressBar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            progressBar.style.width = progressBar.parentElement.parentElement.querySelector('.stat-percentage').textContent;
        }
    });
}

// Show progress on initial load
window.addEventListener('load', showProgress);

// Show progress on scroll
window.addEventListener('scroll', showProgress);

// NEW ADDITIONS BELOW THIS LINE

// Typing effect for hero title
function typeEffect(element, speed) {
    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);

            // Blink the cursor
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, speed);
}

// Apply typing effect to hero title
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeEffect(heroTitle, 100);
    }
});

// Network particle animation for profile container
function createNetworkAnimation() {
    const networkOverlay = document.querySelector('.network-overlay');

    if (!networkOverlay) return;

    // Create dots and lines to represent a network
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'network-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 3}s`;

        networkOverlay.appendChild(dot);
    }

    // Add lines between dots
    const dots = document.querySelectorAll('.network-dot');
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            if (Math.random() > 0.7) { // Only create some connections
                const line = document.createElement('div');
                line.className = 'network-line';
                line.dataset.from = i;
                line.dataset.to = j;

                networkOverlay.appendChild(line);
            }
        }
    }

    // Add CSS for network animation
    const style = document.createElement('style');
    style.textContent = `
        .network-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .network-dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: var(--secondary-color, #00cc99);
            border-radius: 50%;
            animation: pulse 3s infinite alternate;
        }
        
        .network-line {
            position: absolute;
            height: 1px;
            background-color: rgba(0, 204, 153, 0.3);
            transform-origin: left center;
            animation: fade 4s infinite alternate;
        }
        
        @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.4; }
            100% { transform: scale(1.2); opacity: 0.8; }
        }
        
        @keyframes fade {
            0% { opacity: 0.1; }
            100% { opacity: 0.5; }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;

    document.head.appendChild(style);

    // Update lines positions to connect dots
    function updateLines() {
        const lines = document.querySelectorAll('.network-line');
        lines.forEach(line => {
            const fromDot = dots[line.dataset.from];
            const toDot = dots[line.dataset.to];

            if (!fromDot || !toDot) return;

            const fromRect = fromDot.getBoundingClientRect();
            const toRect = toDot.getBoundingClientRect();
            const parentRect = networkOverlay.getBoundingClientRect();

            // Calculate relative positions
            const fromX = fromRect.left - parentRect.left + fromRect.width / 2;
            const fromY = fromRect.top - parentRect.top + fromRect.height / 2;
            const toX = toRect.left - parentRect.left + toRect.width / 2;
            const toY = toRect.top - parentRect.top + toRect.height / 2;

            // Calculate length and angle
            const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
            const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

            // Set line styles
            line.style.width = `${length}px`;
            line.style.left = `${fromX}px`;
            line.style.top = `${fromY}px`;
            line.style.transform = `rotate(${angle}deg)`;
        });
    }

    // Initial update
    setTimeout(updateLines, 100);
}

// Apply network animation
window.addEventListener('load', createNetworkAnimation);

// Animate skill cards on scroll
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS for skill card animations
    const style = document.createElement('style');
    style.textContent = `
        .skill-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply skill card animations
window.addEventListener('load', animateSkillCards);

// Animate project cards with stagger effect
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of each card
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS for project card animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply project card animations
window.addEventListener('load', animateProjectCards);

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add CSS for timeline animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(50px);
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply timeline animations
window.addEventListener('load', animateTimeline);

// Parallax effect for header background
function parallaxEffect() {
    const cyberPattern = document.querySelector('.cyber-pattern');

    if (!cyberPattern) return;

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        cyberPattern.style.transform = `translateY(${scrollValue * 0.3}px)`;
    });
}

// Apply parallax effect
window.addEventListener('load', parallaxEffect);

// Interactive stats on hover
function interactiveStats() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('highlight');
            const progress = item.querySelector('.progress');

            // Create pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'stat-pulse';
            progress.appendChild(pulse);

            // Remove pulse after animation
            setTimeout(() => {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            }, 1000);
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('highlight');
        });
    });

    // Add CSS for interactive stats
    const style = document.createElement('style');
    style.textContent = `
        .stat-item {
            transition: transform 0.3s ease;
        }
        
        .stat-item.highlight {
            transform: translateX(10px);
        }
        
        .stat-pulse {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 10px;
            background-color: rgba(255, 255, 255, 0.6);
            animation: statPulse 1s ease-out;
        }
        
        @keyframes statPulse {
            0% { width: 10px; opacity: 0.8; }
            100% { width: 100%; opacity: 0; }
        }
    `;

    document.head.appendChild(style);
}

// Apply interactive stats
window.addEventListener('load', interactiveStats);