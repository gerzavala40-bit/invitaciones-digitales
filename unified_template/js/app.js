/**
 * app.js
 * Script centralizado para manejar todas las funcionalidades de las invitaciones.
 * Detecta qué módulos existen en el HTML y los inicializa.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SPLASH SCREEN & AUDIO
    const splashScreen = document.getElementById('splashScreen');
    const enterBtn = document.getElementById('enterBtn');
    const bgAudio = document.getElementById('bgAudio');
    const musicControl = document.getElementById('musicControl');

    if (splashScreen && enterBtn) {
        enterBtn.addEventListener('click', () => {
            splashScreen.classList.add('slide-up');
            document.body.classList.remove('locked');

            if (bgAudio) {
                bgAudio.play().then(() => {
                    if (musicControl) musicControl.classList.add('playing');
                }).catch(err => console.log('Audio autoplay blocked:', err));
            }
        });
    }

    if (musicControl && bgAudio) {
        musicControl.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play();
                musicControl.classList.add('playing');
            } else {
                bgAudio.pause();
                musicControl.classList.remove('playing');
            }
        });
    }

    // 2. COUNTDOWN
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // La fecha objetivo se extrae de un atributo data-date
        const targetDateStr = countdownElement.getAttribute('data-date');
        if (targetDateStr) {
            const countDownDate = new Date(targetDateStr).getTime();
            
            const timerInterval = setInterval(function() {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                
                if (distance < 0) {
                    clearInterval(timerInterval);
                    countdownElement.innerHTML = "<h3 class='section-title'>¡Llegó el día!</h3>";
                    return;
                }

                const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((distance % (1000 * 60)) / 1000);
                
                const elDays = document.getElementById("cd-days");
                const elHours = document.getElementById("cd-hours");
                const elMins = document.getElementById("cd-mins");
                const elSecs = document.getElementById("cd-secs");

                if (elDays) elDays.innerText = d.toString().padStart(2, '0');
                if (elHours) elHours.innerText = h.toString().padStart(2, '0');
                if (elMins) elMins.innerText = m.toString().padStart(2, '0');
                if (elSecs) elSecs.innerText = s.toString().padStart(2, '0');
                
            }, 1000);
        }
    }

    // 3. RSVP FORM (Google Sheets integration support)
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        const scriptURL = rsvpForm.getAttribute('data-script-url');
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        const successMessage = document.getElementById('successMessage');

        rsvpForm.addEventListener('submit', e => {
            e.preventDefault();
            
            if(btnText) btnText.style.display = 'none';
            if(btnLoader) btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;

            // Si hay script de google forms, mandarlo, sino simular
            if (scriptURL && scriptURL !== "SIMULATED") {
                fetch(scriptURL, { method: 'POST', body: new FormData(rsvpForm)})
                    .then(response => {
                        rsvpForm.classList.add('hidden');
                        if (successMessage) successMessage.classList.remove('hidden');
                    })
                    .catch(error => {
                        console.error('Error!', error.message);
                        alert('Hubo un error. Intenta nuevamente.');
                        if(btnText) btnText.style.display = 'block';
                        if(btnLoader) btnLoader.classList.add('hidden');
                        submitBtn.disabled = false;
                    });
            } else {
                // Simulación de envío de 1.5s
                setTimeout(() => {
                    rsvpForm.classList.add('hidden');
                    if (successMessage) successMessage.classList.remove('hidden');
                }, 1500);
            }
        });
    }

});
