// 1. Smooth Scroll Logic
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. RSVP Form Logic
const rsvpForm = document.getElementById('rsvpForm');
const statusMessage = document.getElementById('statusMessage');

// This path is specific to Netlify Functions
const BACKEND_URL = '/.netlify/functions/rsvp';

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value;

    try {
        statusMessage.innerText = "> CONNECTING_TO_DATABASE...";
        statusMessage.style.color = "#00ffcc";

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            statusMessage.innerText = "> RSVP_SUCCESSFUL. WELCOME_TO_THE_CLUB.";
            statusMessage.style.color = "#a3d200"; // Hacky Green
            rsvpForm.reset();
        } else {
            throw new Error('Server responded with error');
        }

    } catch (error) {
        console.error("Signup Error:", error);
        statusMessage.innerText = "> ERROR: SIGNUP_FAILED. CHECK_LOGS.";
        statusMessage.style.color = "#ff4444"; // Error Red
    }
});

console.log("%c// SYSTEM ONLINE. READY TO SHIP.", "color: #00ffcc; font-family: monospace; font-size: 14px;");