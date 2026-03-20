     
     // ####################### CARRUSEL #######################

    
    
    /* logica del carrusel */
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let autoPlayTimer;

    function showSlide(n) {
        // Reiniciar índice si se pasa del límite
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        // Quitar clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Añadir clase active al actual
        slides[slideIndex].classList.add('active');
        if(dots.length > 0) dots[slideIndex].classList.add('active');
    }

    function moveSlide(n) {
        slideIndex += n;
        showSlide(slideIndex);
        resetTimer(); // Reinicia el contador automático al hacer click manual
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlide(slideIndex);
        resetTimer();
    }

    // Cambio automático cada 5 segundos
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000); 
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Iniciar
    startAutoPlay();    
    
    
    

    // ###################### ANIMAR NUMEROS #######################
    
    
    
    // Función para animar números
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Math.floor para números enteros
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Al terminar, si el original tenía símbolo +, se lo ponemos
                if(obj.dataset.symbol) obj.innerHTML += obj.dataset.symbol; 
            }
        };
        window.requestAnimationFrame(step);
    }

    // Detectar cuando los números son visibles para iniciar la animación
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Leemos el número final del texto HTML actual
                const finalNumber = parseInt(el.innerText.replace(/\D/g,'')); 
                // Guardamos si tenía un "+" o "%"
                if(el.innerText.includes('+')) el.dataset.symbol = '+';
                if(el.innerText.includes('%')) el.dataset.symbol = '%';
                
                animateValue(el, 0, finalNumber, 2000); // 2000ms = 2 segundos
                observer.unobserve(el); // Solo animar una vez
            }
        });
    });

    document.querySelectorAll('.stat-number').forEach((el) => {
        observer.observe(el);
    });

    




    