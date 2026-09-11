document.addEventListener("DOMContentLoaded", () => {
    
    // --- Splash Screen & Audio Logic ---
    const splash = document.getElementById('splash');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    let isPlaying = false;

    enterBtn.addEventListener('click', () => {
        splash.classList.add('hide');
        mainContent.classList.remove('locked');
        
        // Show music toggle button
        setTimeout(() => {
            musicToggle.classList.remove('hidden');
        }, 1000);

        // Play music
        if(bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.classList.add('playing');
            }).catch(e => console.log("Audio play failed (maybe blocked by browser):", e));
        }
    });

    musicToggle.addEventListener('click', () => {
        if(isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('playing');
            isPlaying = false;
        } else {
            bgMusic.play();
            musicIcon.classList.add('playing');
            isPlaying = true;
        }
    });

    // --- Countdown Logic ---
    const countDownDate = new Date("Oct 24, 2026 17:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            document.querySelector(".countdown").innerHTML = "<p style='font-family: var(--font-heading); font-size: 2rem; color: var(--color-accent);'>¡Llegó el gran día!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);


    // --- Scroll Animations (Reveal) ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);


    // --- RSVP Form to WhatsApp ---
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const attendance = document.getElementById('attendance').value;
            const message = document.getElementById('message').value;

            // CHANGE THIS NUMBER TO YOUR WHATSAPP NUMBER
            const phoneNumber = "5491112345678"; 
            
            let text = `Hola! Soy *${name}*.\nQuiero confirmar que *${attendance}* a la boda.`;
            if (message) {
                text += `\nMensaje: ${message}`;
            }

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});
