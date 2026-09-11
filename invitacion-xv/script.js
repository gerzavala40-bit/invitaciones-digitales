document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del temporizador (Countdown)
    // Fecha objetivo: 12 de Febrero de 2027 a las 21:00
    const targetDate = new Date("Feb 12, 2027 21:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Evento ya pasó
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);

    // 2. Mostrar/Ocultar detalles de pago
    const showPaymentBtn = document.getElementById('show-payment-btn');
    const paymentDetails = document.getElementById('payment-details');

    if(showPaymentBtn && paymentDetails) {
        showPaymentBtn.addEventListener('click', () => {
            if (paymentDetails.classList.contains('hidden')) {
                paymentDetails.classList.remove('hidden');
                showPaymentBtn.innerText = 'OCULTAR VALOR TARJETA';
            } else {
                paymentDetails.classList.add('hidden');
                showPaymentBtn.innerText = 'VER VALOR TARJETA';
            }
        });
    }

    // 3. Animaciones al hacer Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Se dispara cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
