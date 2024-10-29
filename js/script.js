document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling to section on dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sections.forEach(section => section.classList.remove('active'));
            sections[index].classList.add('active');
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Function to determine the active section on scroll
    const setActiveSection = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
    
        // Update dot active states and line visibility
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            const line = document.querySelector('.line'); // Assuming a single line between dots
        });
    };

    // Add scroll event listener
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) { // Scrolling down
            const activeSection = document.querySelector('section.active');
            const nextSection = activeSection.nextElementSibling;

            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
                nextSection.classList.add('active');
                activeSection.classList.remove('active');
            }
        } else { // Scrolling up
            const activeSection = document.querySelector('section.active');
            const prevSection = activeSection.previousElementSibling;

            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
                prevSection.classList.add('active');
                activeSection.classList.remove('active');
            }
        }

        // Prevent default scrolling behavior
        event.preventDefault();
    }, { passive: false });

    // Update active section on scroll
    window.addEventListener('scroll', setActiveSection);
});

// Fade-in the first section on page load
window.addEventListener('load', () => {
    const heroSection = document.querySelector('#hero');
    heroSection.classList.add('active'); // Fade-in first section
});

// Initially set the hero section as active
document.getElementById('hero').classList.add('active');

// Function to move the background on hover
function moveBackground(e) {
    const frostedGlass = document.querySelector('.frosted-glass');
    const heroSection = document.getElementById('hero');
    const { clientX, clientY } = e; // Get mouse position
    const { offsetWidth, offsetHeight } = frostedGlass; // Use the frosted glass dimensions

    // Calculate mouse position as a percentage of the frosted glass size
    const xPos = (clientX / offsetWidth) * 8; // X position (0-100)
    const yPos = (clientY / offsetHeight) * 8; // Y position (0-100)

    // Calculate offsets for a more dynamic feel
    const xOffset = (xPos - 15) * 2; // Change multiplier for speed effect (increase for more movement)
    const yOffset = (yPos - 15) * 2; // Change multiplier for speed effect (increase for more movement)

    // Set the background position of the hero section
    heroSection.style.backgroundPosition = `${50 + xOffset}% ${50 + yOffset}%`;
    
    // Zoom effect: Scale the background image to 250% (for desktops only)
    if (window.innerWidth > 768) {
        heroSection.style.backgroundSize = '250%'; // Zoom in by 20%
    }
}

// Event listeners for mouse enter and leave
function setupHoverEffects() {
    const frostedGlass = document.querySelector('.frosted-glass');
    const heroSection = document.getElementById('hero');

    // Only add hover effects if the screen width is larger than 768px
    if (window.innerWidth > 768) {
        frostedGlass.addEventListener('mouseenter', () => {
            // Listen for mouse move when entering the frosted glass
            frostedGlass.addEventListener('mousemove', moveBackground);
        });

        frostedGlass.addEventListener('mouseleave', () => {
            // Reset background position and size on mouse leave
            heroSection.style.backgroundPosition = 'center';
            heroSection.style.backgroundSize = 'cover'; // Reset to original size
            frostedGlass.removeEventListener('mousemove', moveBackground); // Remove event listener
        });
    }
}

// Call the setup function
setupHoverEffects();

// Add a resize event listener to re-setup on window resize
window.addEventListener('resize', setupHoverEffects);

// The text message typing
const textToType = `As a junior frontend developer, I focus on creating visually appealing and user-friendly websites. 
                    I work with HTML, CSS, and JavaScript to build responsive layouts and interactive elements. 
                    I'm always learning new frameworks and improving my skills, and I enjoy solving problems and bringing designs to life. 
                    I pay close attention to detail and am eager to keep growing. 
                    While I’m still gaining experience, I’m passionate about creating great user experiences and contributing to development teams.`;

let index = 0;
const typingElement = document.getElementById('typing-effect');
const sectionHeading = document.getElementById('section-heading'); // Reference to h2 element
const leadParagraph = document.getElementById('lead-paragraph'); // Reference to lead paragraph

// Function to type the text
function type() {
    if (index < textToType.length) {
        typingElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(type, 50); // Adjust typing speed
    } else {
        // Start fade out after typing is done
        setTimeout(() => {
            typingElement.classList.add('fade-out');

            // Wait for the fade-out transition to complete before updating heading and hiding paragraph
            setTimeout(() => {
                typingElement.style.display = 'none';

                // Change heading to "Skills" and hide lead paragraph
                sectionHeading.textContent = ''; 
                leadParagraph.style.display = 'none'; 

                // Start flashing words after typing completes
                setInterval(createFlashingWords, 700); // Trigger flashing words repeatedly
            }, 500); // Adjust fade-out delay
        }, 500); // Delay before starting fade-out
    }
}

// Function to create flashing words
function createFlashingWords() {
    const container = document.querySelector('#about'); // About section
    const keywords = [
        'Google', 'ChatGPT', 'Copilot', 'Bootstrap', 'Tailwind', 'Codepen', 'HTML', 'CSS', 
        'JavaScript', 'C#', 'Python', 'UI/UX', 'Figma', 'Git', 'Github', 'Sweclockers'
    ];

    keywords.forEach(word => {
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.classList.add('flashing-word');

        // Position words randomly across the viewport
        wordElement.style.position = 'absolute';
        wordElement.style.top = Math.random() * 80 + 'vh'; // Keep within visible area
        wordElement.style.left = Math.random() * 90 + 'vw'; 

        container.appendChild(wordElement);

        // Remove each word after a short time
        setTimeout(() => {
            wordElement.remove();
        }, 2000);
    });
}

// Intersection Observer to start typing when the section becomes visible
function startTyping(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            type(); // Start typing effect
            observer.unobserve(entry.target); // Stop observing after it starts
        }
    });
}

// Observe the "About Me" section
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver(startTyping, {
    threshold: 0.1 // Start when 10% of the section is visible
});
observer.observe(aboutSection);

// Function to make the dots clickable and scroll to the respective sections
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section'); // Adjusted to select all sections

    // Smooth scrolling to section on dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sections.forEach(section => section.classList.remove('active')); // Hide all sections
            sections[index].classList.add('active'); // Show the targeted section
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === current) {
                dot.classList.add('active');
            }
        });
    });
});

document.querySelectorAll('.progress').forEach(progress => {
    progress.addEventListener('mouseenter', () => {
        const bar = progress.querySelector('.progress-bar');
        const targetWidth = progress.getAttribute('data-percentage') + '%';
        bar.style.width = targetWidth;
    });

    progress.addEventListener('mouseleave', () => {
        const bar = progress.querySelector('.progress-bar');
        bar.style.width = '0'; // Reset width on mouse leave
    });
});
