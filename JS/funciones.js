     
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

    



    // ####################### CLIMA #######################

    document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '78c4209464af877b03496e1507c5d93c'; 
    
    const volcanoDatabase = [
        // --- MÉXICO ---
        { name: "Popocatépetl", lat: 19.0228, lon: -98.6231, status: "Activo" },
        { name: "Volcán de Colima", lat: 19.5124, lon: -103.617, status: "Activo" },
        { name: "Pico de Orizaba", lat: 19.0297, lon: -97.2611, status: "Dormido" },
        { name: "Paricutín", lat: 19.4930, lon: -102.2510, status: "Extinto" },
        { name: "El Chichonal", lat: 17.3600, lon: -93.2200, status: "Activo" },
        { name: "Nevado de Toluca", lat: 19.1083, lon: -99.7611, status: "Dormido" },
        { name: "Tacaná", lat: 15.1300, lon: -92.1000, status: "Activo" },
        { name: "Ceboruco", lat: 21.1250, lon: -104.5080, status: "Activo" },
        
        // --- MUNDO --
        { name: "Monte Fuji (Japón)", lat: 35.3606, lon: 138.7274, status: "Activo" },
        { name: "Monte Etna (Italia)", lat: 37.7510, lon: 14.9934, status: "Activo" },
        { name: "Kilauea (Hawaii)", lat: 19.4135, lon: -155.287, status: "Muy Activo" },
        { name: "Villarrica (Chile)", lat: -39.4200, lon: -71.9300, status: "Activo" }
    ];

    // Selectores UI
    const ui = {
        air: { badge: document.querySelector('.air-quality .status-badge'), loc: document.querySelector('.air-quality p') },
        volcano: { title: document.querySelector('.volcano h4'), badge: document.querySelector('.volcano .status-badge'), loc: document.querySelector('.volcano p') },
        weather: { badge: document.querySelector('.weather .status-badge'), loc: document.querySelector('.weather p') }
    };

    // Variable para guardar el botón y no crearlo doble
    let locationBtn = null;

    function initDashboard() {
        // 1. Establecer estado inicial (Esperando al usuario)
        ui.weather.loc.textContent = "Ubicación pendiente...";
        ui.weather.badge.textContent = "--";
        
        ui.volcano.loc.textContent = "---";
        ui.volcano.badge.textContent = "Esperando ubicación";
        ui.volcano.badge.className = "status-badge regular";

        ui.air.loc.textContent = "---";
        ui.air.badge.textContent = "--";

        // 2. Crear el botón de activación
        createActivationButton();
    }

    function createActivationButton() {
        // Buscamos un lugar donde poner el botón. Lo pondremos antes de la sección del clima.
        const weatherContainer = document.querySelector('.weather'); 
        
        if (weatherContainer && !locationBtn) {
            locationBtn = document.createElement('button');
            locationBtn.textContent = "📍 Activar mi Ubicación Local";
            
            // Estilos básicos por JS para que se vea decente sin tocar tu CSS
            locationBtn.style.display = "block";
            locationBtn.style.margin = "0 auto 20px auto";
            locationBtn.style.padding = "10px 20px";
            locationBtn.style.background = "#2c3e50"; // Un color oscuro neutro
            locationBtn.style.color = "white";
            locationBtn.style.border = "none";
            locationBtn.style.borderRadius = "5px";
            locationBtn.style.cursor = "pointer";
            locationBtn.style.fontSize = "1rem";

            // Insertamos el botón antes del contenedor del clima (o al inicio del dashboard)
            // Si el contenedor tiene padre, lo insertamos antes.
            if(weatherContainer.parentElement) {
                weatherContainer.parentElement.insertBefore(locationBtn, weatherContainer);
            }

            // Evento Click
            locationBtn.addEventListener('click', requestUserLocation);
        }
    }

    function requestUserLocation() {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización.");
            return;
        }

        // Cambiamos texto del botón para dar feedback
        locationBtn.textContent = "⏳ Obteniendo coordenadas...";
        locationBtn.disabled = true;
        locationBtn.style.opacity = "0.7";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                
                // ÉXITO: Ocultamos el botón o lo cambiamos a "Actualizar"
                locationBtn.textContent = "🔄 Actualizar Ubicación";
                locationBtn.disabled = false;
                locationBtn.style.opacity = "1";
                
                // Ejecutar funciones con la ubicación real
                fetchWeatherData(latitude, longitude);
                fetchAirQuality(latitude, longitude);
                findNearestVolcano(latitude, longitude);
            },
            (error) => {
                console.error(error);
                // ERROR: Restauramos el botón
                locationBtn.textContent = "❌ Error. Reintentar";
                locationBtn.disabled = false;
                locationBtn.style.opacity = "1";
                
                ui.weather.loc.textContent = "Permiso denegado";
                alert("Necesitamos tu ubicación para mostrarte los datos locales.");
            }
        );
    }

    async function fetchWeatherData(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
        
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error API`);
            const data = await res.json();

            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const cityName = data.name; 
            const country = data.sys.country;

            ui.weather.badge.textContent = `${temp}°C | ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
            ui.weather.loc.textContent = `${cityName}, ${country}`;
            ui.weather.badge.classList.remove('bad'); 
            ui.weather.badge.classList.add('natural');

        } catch (error) {
            console.error(error);
            ui.weather.badge.textContent = "Error API";
            ui.weather.badge.classList.add('bad');
        }
    }

    async function fetchAirQuality(lat, lon) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            
            const aqi = data.list[0].main.aqi;
            const labels = { 1: "Buena", 2: "Regular", 3: "Moderada", 4: "Mala", 5: "Peligrosa" };
            const classes = { 1: "good", 2: "regular", 3: "yellow", 4: "bad", 5: "critical" };

            ui.air.badge.textContent = `${labels[aqi]} (AQI ${aqi})`;
            ui.air.badge.className = `status-badge ${classes[aqi]}`;
            ui.air.loc.textContent = "Zona Local"; 

        } catch (error) {
            console.error(error);
        }
    }

    function findNearestVolcano(userLat, userLon) {
        let nearestVolcano = null;
        let minDistance = Infinity;

        volcanoDatabase.forEach(volcano => {
            const distance = getDistanceFromLatLonInKm(userLat, userLon, volcano.lat, volcano.lon);
            if (distance < minDistance) {
                minDistance = distance;
                nearestVolcano = volcano;
            }
        });

        if (nearestVolcano) {
            const distStr = Math.round(minDistance);
            ui.volcano.loc.textContent = `${nearestVolcano.name}`;
            
            let alertText = "";
            let alertClass = "";

            if (minDistance < 20) {
                alertText = `¡MUY CERCA! (${distStr} km) - ${nearestVolcano.status}`;
                alertClass = "critical";
            } else if (minDistance < 100) {
                alertText = `Cercano (${distStr} km) - ${nearestVolcano.status}`;
                alertClass = "yellow";
            } else {
                alertText = `Lejano (${distStr} km) - ${nearestVolcano.status}`;
                alertClass = "regular"; 
            }

            ui.volcano.badge.textContent = alertText;
            ui.volcano.badge.className = `status-badge ${alertClass}`;
        }
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return R * c;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    // Arrancar
    initDashboard();
});



    