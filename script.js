// Make the navigation links scroll smoothly to their sections
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// A little easter egg for the hackers who check the console
console.log("%c// SYSTEM ONLINE. READY TO SHIP.", "color: #00ffcc; font-family: monospace; font-size: 14px;");