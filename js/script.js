// Smooth Scrolling and Fading between Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Get the target section
        const targetSection = document.querySelector(this.getAttribute('href'));
        const currentSection = document.querySelector('section.active');

        if (currentSection) {
            currentSection.classList.remove('active'); // Remove active class to fade out

            // Delay for the fade-out effect
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align to the top of the section
                });

                // Add active class to fade in the target section
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 100); // Slight delay before fading in
            }, 500); // Time for fade-out
        }
    });
});

// Fade-in the first section on page load
window.addEventListener('load', () => {
    const heroSection = document.querySelector('#hero');
    heroSection.classList.add('active'); // Fade-in first section
});
// Initially set the hero section as active
document.getElementById('hero').classList.add('active');


// Select the frosted glass and hero section elements
const frostedGlass = document.querySelector('.frosted-glass');
const heroSection = document.getElementById('hero');

// Function to move the background on hover
function moveBackground(e) {
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
        const thanksMessage = document.getElementById('thanks-message');

        function type() {
            if (index < textToType.length) {
                typingElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 50); // Adjust typing speed
            } else {
                // Start fade out after typing is done
                setTimeout(() => {
                    typingElement.classList.add('fade-out'); // Add fade out class
                    // Wait for the fade-out transition to complete before showing the new message
                    setTimeout(() => {
                        typingElement.style.display = 'none'; // Hide typing element
                        thanksMessage.style.opacity = '1'; // Show thanks message
                    }, 6000); // Wait for fade out to complete
                }, 500); // Wait before starting to fade out
            }
        }

        window.addEventListener('load', () => {
            type();
        });










