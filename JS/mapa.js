document.addEventListener("DOMContentLoaded", function() {

    // =====================================================
    // 1. INICIALIZACIÓN DEL MAPA GENERAL (Visualizador)
    // =====================================================
    var map = null;
    var layers = {}; // Almacenará nuestras capas para activarlas/desactivarlas

    if (document.getElementById('map')) {
        map = L.map('map').setView([19.0414, -98.2063], 12); // Centro en Puebla

        // Mapa Base (Calles)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        // --- DEFINICIÓN DE CAPAS (DATOS SIMULADOS) ---
        // Aquí deberías cargar tus archivos GeoJSON reales.
        
        // A. Límites Municipales (Un polígono grande alrededor de Puebla)
        var datosLimites = {
            "type": "Polygon",
            "coordinates": [[
                [-98.25, 19.00], [-98.15, 19.00], [-98.15, 19.10], [-98.25, 19.10], [-98.25, 19.00]
            ]]
        };
        layers.limites = L.geoJSON(datosLimites, {
            style: { color: "#5f1b2d", weight: 3, fillOpacity: 0.05 } // Color Guinda
        });

        // B. Zonas de Riesgo (Polígonos rojos simulando barrancas o zonas de volcán)
        var datosRiesgo = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "properties": { "nivel": "Alto" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.20, 19.05], [-98.19, 19.05], [-98.19, 19.06], [-98.20, 19.06], [-98.20, 19.05] ]] } },
                { "type": "Feature", "properties": { "nivel": "Medio" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.22, 19.03], [-98.21, 19.03], [-98.21, 19.04], [-98.22, 19.04], [-98.22, 19.03] ]] } }
            ]
        };
        layers.riesgo = L.geoJSON(datosRiesgo, {
            style: { color: "red", weight: 2, fillColor: "#ff0000", fillOpacity: 0.4 }
        }).bindPopup("⚠️ Zona de Riesgo Detectada");

        // C. Uso de Suelo (Zonas amarillas/verdes)
        var datosSuelo = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "properties": { "tipo": "Habitacional" }, "geometry": { "type": "Polygon", "coordinates": [[ [-98.21, 19.045], [-98.205, 19.045], [-98.205, 19.05], [-98.21, 19.05], [-98.21, 19.045] ]] } }
            ]
        };
        layers.suelo = L.geoJSON(datosSuelo, {
            style: { color: "green", weight: 1, fillColor: "lightgreen", fillOpacity: 0.6 }
        }).bindPopup("🏡 Uso: Habitacional H3");

        // Ajustar tamaño
        setTimeout(function(){ map.invalidateSize()}, 400);
    }

    // =====================================================
    // 2. FUNCIONES DE LAS HERRAMIENTAS (Globales)
    // =====================================================

    // --- A. CONTROL DE CAPAS (Checkboxes) ---
    window.toggleCapa = function(tipo) {
        if (!map) return;
        var checkbox = document.getElementById('check-' + tipo);
        
        if (checkbox.checked) {
            layers[tipo].addTo(map);
            // Hacemos zoom a la capa para que el usuario vea dónde apareció
            map.fitBounds(layers[tipo].getBounds()); 
        } else {
            map.removeLayer(layers[tipo]);
        }
    };

    // --- B. MEDIR DISTANCIA ---
    var markersMedicion = [];
    var lineaMedicion = null;
    var midiendo = false;

    window.activarMedicion = function() {
        if (!map) return;
        midiendo = !midiendo; // Alternar estado
        var btn = document.getElementById('tool-measure');

        if (midiendo) {
            btn.style.backgroundColor = "#ffeb3b"; // Color activo
            btn.innerHTML = "❌ Cancelar Medición";
            alert("Modo Medición: Haz clic en el mapa en el punto A y luego en el punto B.");
            
            map.on('click', function(e) {
                if (markersMedicion.length >= 2) limpiarMedicion(); // Reiniciar si ya hay 2

                var marker = L.marker(e.latlng, {draggable: true}).addTo(map);
                markersMedicion.push(marker);

                if (markersMedicion.length === 2) {
                    var p1 = markersMedicion[0].getLatLng();
                    var p2 = markersMedicion[1].getLatLng();
                    
                    // Dibujar línea
                    lineaMedicion = L.polyline([p1, p2], {color: 'blue', weight: 4, dashArray: '10, 10'}).addTo(map);
                    
                    // Calcular distancia
                    var distancia = p1.distanceTo(p2); // Metros
                    var km = (distancia / 1000).toFixed(2);
                    
                    lineaMedicion.bindPopup("📏 Distancia: " + km + " km").openPopup();
                    midiendo = false; // Terminar automáticamente tras 2 puntos
                    btn.style.backgroundColor = ""; 
                    btn.innerHTML = "📐 Medir Distancia";
                    map.off('click'); // Dejar de escuchar clics
                }
            });
        } else {
            limpiarMedicion();
            btn.style.backgroundColor = "";
            btn.innerHTML = "📐 Medir Distancia";
            map.off('click');
        }
    };

    function limpiarMedicion() {
        markersMedicion.forEach(m => map.removeLayer(m));
        markersMedicion = [];
        if (lineaMedicion) map.removeLayer(lineaMedicion);
    }

    // --- C. IMPRIMIR ---
    window.imprimirMapa = function() {
        window.print(); // Usamos el CSS @media print para que solo salga el mapa
    };

    // --- D. BÚSQUEDA CATASTRAL ---
    window.busquedaCatastral = function() {
        if (!map) return;
        var clave = prompt("Ingresa la Clave Catastral o Coordenadas (Ej: simulacion):");
        
        if (clave) {
            // Simulación de búsqueda exitosa
            alert("🔍 Buscando predio con clave: " + clave + "...");
            
            // Simulamos que encontramos un predio cerca del centro y hacemos zoom
            var predioEncontrado = [19.043, -98.200]; 
            
            L.marker(predioEncontrado).addTo(map)
                .bindPopup("<b>Predio Encontrado</b><br>Clave: " + clave + "<br>Estatus: Regular").openPopup();
            
            map.setView(predioEncontrado, 18); // Zoom muy cercano
        }
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