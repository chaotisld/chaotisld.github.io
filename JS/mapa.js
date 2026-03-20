document.addEventListener("DOMContentLoaded", function() {

    // =====================================================
    // 1. INICIALIZACIÓN DEL MAPA GENERAL
    // =====================================================
    var map = null;
    var layers = {}; 

if (document.getElementById('map')) {
    // Inicializamos el mapa centrado en Puebla con renderizado Canvas activado
    map = L.map('map', {
        zoomControl: false,
        preferCanvas: true // <-- Esta línea es la solución al problema de rendimiento
    }).setView([19.0414, -98.2063], 12);
            L.control.zoom({ position: 'topright' }).addTo(map);

        // --- DEFINICIÓN DE CAPAS BASE ---
        window.baseLayers = {
            calles: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }),
            satelite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles &copy; Esri' }),
            topografico: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '&copy; OpenTopoMap' })
        };

        baseLayers.calles.addTo(map); // Capa por defecto

        // Función para cambiar la capa base
        window.cambiarMapaBase = function() {
            var seleccion = document.getElementById('base-layer-select').value;
            Object.values(baseLayers).forEach(layer => map.removeLayer(layer));
            baseLayers[seleccion].addTo(map);
        };

        // --- DEFINICIÓN DE CAPAS TEMÁTICAS (Simuladas) ---
        layers.limites = L.geoJSON({
            "type": "Polygon", "coordinates": [[ [-98.25, 19.00], [-98.15, 19.00], [-98.15, 19.10], [-98.25, 19.10], [-98.25, 19.00] ]]
        }, { style: { color: "#5f1b2d", weight: 3, fillOpacity: 0.05 } });

        layers.riesgo = L.geoJSON({
            "type": "FeatureCollection", "features": [
                { "type": "Feature", "properties": { "nivel": "Alto" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.20, 19.05], [-98.19, 19.05], [-98.19, 19.06], [-98.20, 19.06], [-98.20, 19.05] ]] } },
                { "type": "Feature", "properties": { "nivel": "Medio" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.22, 19.03], [-98.21, 19.03], [-98.21, 19.04], [-98.22, 19.04], [-98.22, 19.03] ]] } }
            ]
        }, { style: { color: "red", weight: 2, fillColor: "#ff0000", fillOpacity: 0.4 } }).bindPopup("⚠️ Zona de Riesgo Detectada");

        layers.suelo = L.geoJSON({
            "type": "FeatureCollection", "features": [
                { "type": "Feature", "properties": { "tipo": "Habitacional" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.21, 19.045], [-98.205, 19.045], [-98.205, 19.05], [-98.21, 19.05], [-98.21, 19.045] ]] } }
            ]
        }, { style: { color: "green", weight: 1, fillColor: "lightgreen", fillOpacity: 0.6 } }).bindPopup("🏡 Uso: Habitacional");

        setTimeout(function(){ map.invalidateSize()}, 400);

        // Crear la capa de los límites municipales
    var limitesPuebla = L.geoJSON(dataExtent, {
        style: {
            color: "#5f1b2d",     // Color guinda (institucional)
            weight: 3,
            fillColor: "#c79b66", // Color oro
            fillOpacity: 0.15
        }
    }).bindPopup("Límites Municipales de Puebla");


// Función para el botón del visualizador
    window.toggleLimitesPuebla = function() {
        var btnLimites = document.getElementById('btn-limites-puebla');
        
        if (map.hasLayer(limitesPuebla)) {
            map.removeLayer(limitesPuebla); // Apaga la capa si ya está activa
            if(btnLimites) btnLimites.classList.remove('capa-activa'); // Regresa a color guinda
        } else {
            limitesPuebla.addTo(map);       // Enciende la capa
            map.fitBounds(limitesPuebla.getBounds()); 
            if(btnLimites) btnLimites.classList.add('capa-activa'); // Cambia a color oro
        }
    };

    
        
    }
    // =====================================================
    // VISUALIZADOR DE COORDENADAS EN VIVO
    // =====================================================
    var coordControl = L.control({position: 'bottomleft'}); // Aparecerá abajo a la izquierda

    coordControl.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info coordinates-box');
        div.innerHTML = "📍 Lat: 0.00000 | Lon: 0.00000";
        return div;
    };

    if (map) {
        // Añadimos el recuadro al mapa
        coordControl.addTo(map);

        // Escuchamos el evento de movimiento del ratón
        map.on('mousemove', function(e) {
            // Obtenemos latitud y longitud, limitando a 5 decimales
            var lat = e.latlng.lat.toFixed(5);
            var lng = e.latlng.lng.toFixed(5);
            
            // Actualizamos el texto en el recuadro
            document.querySelector('.coordinates-box').innerHTML = `📍 Lat: ${lat} | Lon: ${lng}`;
        });
    }


    // =====================================================
    // LEYENDA DINÁMICA
    // =====================================================
    var mapLegend = L.control({position: 'bottomright'});
    var activeLayers = []; 

    mapLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.id = 'map-legend-content';
        div.innerHTML = '<h4>Fuente</h4><div id="legend-items">Activa una capa...</div>';
        return div;
    };
    
    // Agregamos la leyenda al inicializar el mapa
    if (map) { mapLegend.addTo(map); }

    window.actualizarLeyenda = function() {
        var content = "";
        if (activeLayers.includes('riesgo')) {
            content += '<div><i style="background: #ff0000"></i> Riesgo Alto</div>';
            content += '<div><i style="background: #ffa500"></i> Riesgo Medio</div><br>';
        }
        if (activeLayers.includes('suelo')) {
            content += '<div><i style="background: lightgreen"></i> Habitacional</div><br>';
        }
        
        var legendItems = document.getElementById('legend-items');
        if (legendItems) {
            legendItems.innerHTML = content === "" ? "Activa una capa..." : content;
        }
    };


    // A. Control de Capas Temáticas
    window.toggleCapa = function(tipo) {
        if (!map) return;
        var checkbox = document.getElementById('check-' + tipo);
        var slider = document.getElementById('opacity-' + tipo);

        if (checkbox.checked) {
            layers[tipo].addTo(map);
            map.fitBounds(layers[tipo].getBounds()); 
            if(slider) slider.style.display = 'block'; // Muestra el deslizador
            if(!activeLayers.includes(tipo)) activeLayers.push(tipo);
        } else {
            map.removeLayer(layers[tipo]);
            if(slider) slider.style.display = 'none'; // Oculta el deslizador
            activeLayers = activeLayers.filter(item => item !== tipo);
        }
        actualizarLeyenda(); // Refresca el cuadro de simbología
    };

    // Nueva función para cambiar la opacidad en vivo
    window.cambiarOpacidad = function(tipo, valor) {
        if(layers[tipo]) {
            // Se ajusta el relleno y el borde (el borde siempre un poco más visible)
            layers[tipo].setStyle({ 
                fillOpacity: parseFloat(valor), 
                opacity: parseFloat(valor) + 0.2 
            });
        }
    };

    // B. Buscador Real (Geocodificación con Nominatim API)
window.buscarEnMapa = function() {
    if (!map) return;
    
    var tipoBusqueda = document.getElementById('map-search-type').value;
    var query = document.getElementById('map-search-input').value.trim();
    
    if (!query) {
        alert("Por favor ingresa un valor a buscar.");
        return;
    }
    
    var btn = document.querySelector('.map-search-box button');
    btn.innerHTML = "⏳ Buscando...";

    // --- LÓGICA PARA COORDENADAS ---
    if (tipoBusqueda === 'coordenadas') {
        // Separamos por coma o espacio
        var partes = query.replace(/,/g, ' ').split(/\s+/);
        
        if (partes.length >= 2) {
            var lat = parseFloat(partes[0]);
            var lon = parseFloat(partes[1]);

            if (!isNaN(lat) && !isNaN(lon)) {
                map.flyTo([lat, lon], 16);
                L.marker([lat, lon]).addTo(map).bindPopup(`<b>📍 Coordenadas:</b><br>${lat}, ${lon}`).openPopup();
                btn.innerHTML = "🔍 Buscar";
                return; // Terminamos aquí, no llamamos a la API
            }
        }
        
        alert("Formato inválido. Usa: Latitud, Longitud (ej. 19.0414, -98.2063)");
        btn.innerHTML = "🔍 Buscar";
        return;
    }

    // --- LÓGICA PARA NOMBRE/DIRECCIÓN (Nominatim) ---
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Puebla, Mexico')}&limit=1`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            btn.innerHTML = "🔍 Buscar";
            if (data && data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                map.flyTo([lat, lon], 16);
                L.marker([lat, lon]).addTo(map).bindPopup(`<b>${data[0].display_name}</b>`).openPopup();
            } else {
                alert("No se encontraron resultados para: " + query);
            }
        })
        .catch(err => {
            btn.innerHTML = "🔍 Buscar";
            alert("Error de conexión al buscar.");
        });
};

window.cambiarPlaceholderBusqueda = function() {
    var tipo = document.getElementById('map-search-type').value;
    var input = document.getElementById('map-search-input');
    
    if (tipo === 'coordenadas') {
        input.placeholder = "Ej. 19.0414, -98.2063";
    } else {
        input.placeholder = "Ej. Zócalo de Puebla...";
    }
};

    // C. Mi Ubicación (Geolocalización GPS)
    window.ubicarUsuario = function() {
        if (!map) return;
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización.");
            return;
        }
        
        var btn = document.getElementById('tool-locate');
        btn.innerHTML = "⏳ Buscando...";
        
        map.locate({setView: true, maxZoom: 16});
        
        map.once('locationfound', function(e) {
            btn.innerHTML = "📍 Mi Ubicación";
            L.marker(e.latlng).addTo(map).bindPopup("📍 Estás aquí").openPopup();
        });
        
        map.once('locationerror', function(e) {
            btn.innerHTML = "📍 Mi Ubicación";
            alert("No se pudo obtener tu ubicación. Verifica tus permisos.");
        });
    };

    // D. Medir Distancia (Modo continuo)
    var measureLayer = L.layerGroup();
    var midiendo = false;
    var puntosMedicion = [];
    var polylineMedicion = null;

    window.activarMedicion = function() {
        if (!map) return;
        midiendo = !midiendo;
        var btn = document.getElementById('tool-measure');

        if (midiendo) {
            btn.style.backgroundColor = "var(--puebla-guinda)";
            btn.style.color = "white";
            btn.innerHTML = "❌ Terminar Medición";
            document.getElementById('map').style.cursor = "crosshair";
            
            measureLayer.addTo(map);
            puntosMedicion = [];
            measureLayer.clearLayers();
            
            alert("Modo Medición: Haz clic en el mapa para trazar una ruta. Haz clic en el botón 'Terminar Medición' para finalizar.");
            map.on('click', agregarPuntoMedicion);
        } else {
            btn.style.backgroundColor = "";
            btn.style.color = "var(--gris-dark)";
            btn.innerHTML = "📐 Medir Distancia";
            document.getElementById('map').style.cursor = "";
            map.off('click', agregarPuntoMedicion);
        }
    };

    function agregarPuntoMedicion(e) {
        puntosMedicion.push(e.latlng);
        L.circleMarker(e.latlng, {color: 'red', radius: 4, fillColor: 'white', fillOpacity: 1}).addTo(measureLayer);

        if (puntosMedicion.length > 1) {
            if (polylineMedicion) measureLayer.removeLayer(polylineMedicion);
            polylineMedicion = L.polyline(puntosMedicion, {color: 'red', weight: 3, dashArray: '5, 5'}).addTo(measureLayer);
            
            var distanciaTotal = 0;
            for (var i = 0; i < puntosMedicion.length - 1; i++) {
                distanciaTotal += puntosMedicion[i].distanceTo(puntosMedicion[i+1]);
            }
            
            var txtDistancia = distanciaTotal > 1000 ? (distanciaTotal/1000).toFixed(2) + " km" : distanciaTotal.toFixed(2) + " m";
            
            L.popup()
                .setLatLng(e.latlng)
                .setContent("📏 Ruta actual: <b>" + txtDistancia + "</b>")
                .openOn(map);
        }
    }

    // E. Imprimir
    window.imprimirMapa = function() {
        window.print();
    };

    // =====================================================
    // 3. MAPA DE CONTACTO (Pequeño, solo ubicación)
    // =====================================================
    if (document.getElementById('map-contact')) {
        var officeCoords = [19.0602526846762, -98.28664611232331];
        var mapContact = L.map('map-contact').setView(officeCoords, 16);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapContact);
        L.marker(officeCoords).addTo(mapContact)
            .bindPopup("<b>SITEP - Oficinas</b><br>Atención Ciudadana").openPopup();
            
        setTimeout(function(){ mapContact.invalidateSize()}, 400);
    }
});

