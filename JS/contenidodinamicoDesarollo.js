document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('cat');

    if(!categoria) return;

    const datos = {
"progrMetro": {
            titulo: "Programa Metropolitano",
            descripcion: "Instrumentos de planeación y gestión para el desarrollo ordenado de las zonas metropolitanas.",
            tipoVista: "grid", 
            grupos: [
                {
                    tituloGrupo: "ZONIFICACIÓN",
                    archivos: [
                        { nombre: "Zonificación Primaria", img: "IMG/zon_prim.png", linkDescarga: "PDF/31.Zonificación Primaria.pdf" },
                        { nombre: "Zonificación Primaria y Riesgos", img: "IMG/zo_prim_riesg.png", linkDescarga: "PDF/32.Zonificación Primaria y riesgos.pdf" },
                        { nombre: "Sectores Territoriales", img: "IMG/sectores_terri.png", linkDescarga: "PDF/28.Sectores Territoriales.pdf" }
                    ]
                },
                {
                    tituloGrupo: "PROYECTOS Y ESTRATEGIAS",
                    archivos: [
                        { nombre: "Proyectos Propuestos", img: "IMG/proy_propu.png", linkDescarga: "PDF/31.Proyectos propuestos.pdf" },
                        { nombre: "Proyectos Institucionales", img: "IMG/proy_insti.png", linkDescarga: "PDF/32.Proyectos institucionales.pdf" },
                        { nombre: "Estrategias", img: "IMG/estrategias.png", linkDescarga: "PDF/33.Estrategias.pdf" }
                    ]
                },
                {
                    tituloGrupo: "ANEXO CARTOGRÁFICO DEL PEOTDUEP",
                    estilo: "enlaces", // <--- Esta bandera le dirá a nuestra función que use la vista de tabla
                    archivos: [
                        { nombre: "Mapa base", linkDescarga: "#" },
                        { nombre: "Acuíferos", linkDescarga: "#" },
                        { nombre: "Cambios de uso de suelo", linkDescarga: "#" },
                        { nombre: "Concentración demográfica municipal", linkDescarga: "#" },
                        { nombre: "Conjuntos urbanos y sistema de ciudades", linkDescarga: "#" },
                        { nombre: "Conjuntos urbanos", linkDescarga: "#" },
                        { nombre: "Ecorregiones terrestres", linkDescarga: "#" },
                        { nombre: "Edafología", linkDescarga: "#" },
                        { nombre: "Equipamiento de administración pública y gobierno", linkDescarga: "#" },
                        { nombre: "Equipamiento de comercio y abasto", linkDescarga: "#" },
                        { nombre: "Equipamiento de educación y cultura", linkDescarga: "#" },
                        { nombre: "Equipamiento de recreación y deporte", linkDescarga: "#" },
                        { nombre: "Equipamiento de salud y asistencia social", linkDescarga: "#" },
                        { nombre: "Fisiografía", linkDescarga: "#" },
                        { nombre: "Hidrología", linkDescarga: "#" },
                        { nombre: "Infraestructura y servicios", linkDescarga: "#" },
                        { nombre: "Límites periurbanos y rurales", linkDescarga: "#" },
                        { nombre: "Movilidad", linkDescarga: "#" },
                        { nombre: "Regionalización funcional", linkDescarga: "#" }
                    ]
                }
            ]
        },

    
        "progrEst": {
            titulo: "Programa Estatal de Planeación",
            descripcion: "El contenido interactivo de este programa ha sido trasladado al Sistema de Información Geográfica (SIG).",
            tipoVista: "vacio", 
            htmlContenido: `
                <div style="text-align: center; padding: 60px 20px;">
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="var(--puebla-guinda)" stroke-width="1.5" fill="none" style="margin-bottom:20px;">
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                        <line x1="9" y1="3" x2="9" y2="18"></line>
                        <line x1="15" y1="6" x2="15" y2="21"></line>
                    </svg>
                    <h3 style="color: var(--gris-dark); margin-bottom: 20px;">Explora el mapa interactivo en nuestra nueva sección</h3>
                    <a href="sig.html" style="background-color: var(--puebla-guinda); color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.3s; display: inline-block;">
                        Ir al Sistema SIG
                    </a>
                </div>
            `
        },


        "munic": {
            titulo: "Zonas Metropolitanas y Municipios",
            descripcion: "En el Estado de Puebla se localizan 3 de las 74 Zonas Metropolitanas del país...",
            tipoVista: "municipiosAcordeon", // <--- Cambiamos esta línea
            htmlContenido: ``
        }
    };

    // Renderizar contenido
    const dataSeleccionada = datos[categoria];

    if (dataSeleccionada) {
      
        const headerTitle = document.querySelector('.downloads-section .section-header h2');
        const headerDesc = document.querySelector('.downloads-section .section-header p');
        
        if(headerTitle) headerTitle.textContent = dataSeleccionada.titulo;
        if(headerDesc) headerDesc.textContent = dataSeleccionada.descripcion;

        const container = document.querySelector('.downloads-container');
        container.innerHTML = ""; 

    
if (dataSeleccionada.tipoVista === "grid") {
            renderGridMode(dataSeleccionada.grupos, container);
        } else if (dataSeleccionada.tipoVista === "dashboardMap") {
            renderDashboardMapMode(dataSeleccionada.htmlContenido, container);
        } else if (dataSeleccionada.tipoVista === "zonasMetro") {
            renderZonasMetroMode(dataSeleccionada.htmlContenido, container);
        } else if (dataSeleccionada.tipoVista === "municipiosAcordeon") {
            // <--- NUEVA VISTA AGREGADA AQUÍ
            renderMunicipiosAcordeonMode(container); 
        } else {
            renderListMode(dataSeleccionada.archivos, container);
        }
    }
});



function renderListMode(archivos, container) {
    container.style.display = "grid"; 
    container.className = "downloads-container"; 

    let html = "";
    archivos.forEach((archivo, index) => {
        // Creamos un ID único para cada previsualización
        const previewId = `preview-dyn-${index}`;
        
        html += `
        <div class="download-card">
            <div class="doc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            </div>
            <div class="doc-info">
                <h3>${archivo.nombre}</h3>
                <span class="doc-meta">${archivo.meta || 'PDF'}</span>
            </div>
            <div class="doc-actions">
                <a href="${archivo.linkDescarga}" target="_blank" class="btn-action primary">Ver en otra pestaña</a>
                
                <div class="secondary-group">
                    <button type="button" class="btn-action secondary" onclick="togglePDFPreview('${previewId}', '${archivo.linkDescarga}')">
                        Previsualizar
                    </button>
                </div>
            </div>
            
            <div class="pdf-preview-wrapper" id="${previewId}">
                <iframe src="" title="Previsualización de ${archivo.nombre}"></iframe>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// Función global para abrir/cerrar el visor del PDF
window.togglePDFPreview = function(containerId, pdfUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const iframe = container.querySelector('iframe');
    
    if (container.style.display === "none" || container.style.display === "") {
        iframe.src = pdfUrl; // Carga el documento sólo cuando se solicita
        container.style.display = "block"; 
    } else {
        iframe.src = ""; // Vacía el iframe para no consumir memoria innecesaria
        container.style.display = "none";
    }
};

function renderGridMode(grupos, container) {
    container.style.display = "block"; 
    let html = "";

    grupos.forEach(grupo => {
        // Verificamos si este grupo usa el nuevo estilo de enlaces en texto
        if (grupo.estilo === "enlaces") {
            html += `<h3 class="anexo-title">${grupo.tituloGrupo}</h3>`;
            html += `<div class="text-links-grid">`;
            grupo.archivos.forEach(archivo => {
                html += `
                <div class="text-link-item">
                    <a href="${archivo.linkDescarga}" download>${archivo.nombre}</a>
                </div>`;
            });
            html += `</div>`;
        } 
        // Si no, renderizamos las tarjetas normales con imagen
        else {
            html += `
                <div class="group-header-container">
                    <h3 class="grid-group-title">${grupo.tituloGrupo}</h3>
                </div>
                <div class="cards-grid">`;
            grupo.archivos.forEach(archivo => {
                const imagenSrc = archivo.img || "IMG/placeholder_map.jpg"; 
                html += `
                <div class="vertical-card">
                    <div class="card-image-box">
                        <img src="${imagenSrc}" alt="Mapa ${archivo.nombre}" loading="lazy">
                    </div>
                    <h3>${archivo.nombre}</h3>
                    <a href="${archivo.linkDescarga}" class="btn-grid-download" download>Descargar</a>
                </div>`;
            });
            html += `</div>`;
        }
    });
    
    container.innerHTML = html;
}
function renderDashboardMapMode(htmlContent, container) {
    container.style.display = "block";
    container.style.maxWidth = "100%"; 

    // --- ESTILOS DEL ACORDEÓN ---
    const accordionStyles = `
    <style>
        .acc-wrapper {
            width: 100%;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #ddd;
        }
        .acc-item {
            border-bottom: 1px solid #ddd;
        }
        .acc-item:last-child {
            border-bottom: none;
        }
        .acc-header {
            width: 100%;
            background-color: #f9f9f9;
            color: var(--puebla-guinda, #5f1b2d);
            padding: 15px 20px;
            font-size: 1.1rem;
            font-weight: bold;
            text-align: left;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.3s ease;
        }
        .acc-header:hover {
            background-color: #eee;
        }
        .acc-header.active {
            background-color: #e0e0e0;
            border-bottom: 1px solid #ddd;
        }
        .acc-icon {
            transition: transform 0.3s ease;
            font-size: 0.9rem;
        }
        .acc-header.active .acc-icon {
            transform: rotate(180deg);
        }
        .acc-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
            background-color: white;
        }
        .acc-content-inner {
            padding: 20px;
        }
        
        /* Asegurar que el mapa tome la altura correcta */
        .dashboard-split-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .map-pane {
            flex: 1;
            min-width: 300px;
        }
        .data-pane {
            width: 350px;
            max-height: 600px;
            overflow-y: auto;
        }
        @media (max-width: 768px) {
            .data-pane { width: 100%; }
        }
    </style>
    `;

    

    // --- LÓGICA DEL ACORDEÓN ---
    const headers = container.querySelectorAll('.acc-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            // OPCIONAL: Si quieres que al abrir uno se cierren los demás automáticamente, descomenta esto:
            /*
            headers.forEach(h => {
                if(h !== this) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            */

            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                // Si está abierto, lo cerramos
                content.style.maxHeight = null;
            } else {
                // Si está cerrado, lo abrimos calculando la altura de su contenido
                content.style.maxHeight = content.scrollHeight + "px";
                
                // Si abrimos el acordeón del mapa, forzamos a Leaflet a recalcular su tamaño
                if (this.id === 'btn-acc-mapa' && window.miMapaPuebla) {
                    setTimeout(() => {
                        window.miMapaPuebla.invalidateSize();
                    }, 300); // Esperamos a que termine la animación css
                }
            }
        });
    });

    // Abrimos el primer acordeón (el del mapa) por defecto al cargar
    setTimeout(() => {
        const primerHeader = document.getElementById('btn-acc-mapa');
        if (primerHeader) {
            primerHeader.classList.add('active');
            const primerContent = primerHeader.nextElementSibling;
            primerContent.style.maxHeight = primerContent.scrollHeight + "px";
        }
    }, 50);

    // --- LÓGICA DEL MAPA ORIGINAL ---
    const centroPuebla = [19.0414, -98.2063];
    const zoomInicial = 8;
    let regionSeleccionadaId = null; 

    const coordenadasRegiones = {
        "1": [20.2717, -97.9611], "2": [20.1736, -98.0569], "3": [19.9319, -97.9614],
        "4": [20.1106, -97.6253], "5": [19.8661, -97.5847], "6": [19.8173, -97.3595],
        "7": [19.8369, -98.0319], "8": [19.4658, -97.6894], "9": [19.2458, -97.1406],
        "10": [18.9817, -97.7128], "11": [19.0622, -97.4447], "12": [18.8897, -97.6683],
        "13": [18.4631, -97.3930], "14": [18.3300, -97.0800], "15": [18.6014, -98.4636],
        "16": [18.3031, -98.6031], "17": [18.2017, -98.0483], "18": [18.4744, -97.9258],
        "19": [18.9022, -98.4406], "20": [19.2844, -98.4344], "21": [19.1488, -98.1015],
        "22": [19.0934, -98.2007], "23": [18.8566, -98.4154], "24": [19.0414, -98.2063], 
        "25": [19.0224, -98.2959], "26": [18.9748, -98.1957], "27": [19.0289, -98.1794],
        "28": [19.0600, -98.2949], "29": [19.0576, -98.3053], "30": [19.0972, -98.2720],
        "31": [19.0450, -98.0417], "32": [18.9139, -97.8967]
    };

    setTimeout(() => {
        if (!document.getElementById('mapa-puebla')) return;

        if (window.miMapaPuebla) {
            window.miMapaPuebla.remove();
        }

        var map = L.map('mapa-puebla').setView(centroPuebla, zoomInicial);
        window.miMapaPuebla = map;      

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; CARTO',
            maxZoom: 19
        }).addTo(map);

        const markerGroup = L.featureGroup().addTo(map);

        fetch("https://raw.githubusercontent.com/phantom-zone/mexico-geojson/main/2022/21_puebla/Puebla.json")
            .then(res => res.json())
            .then(data => {
                window.geojsonLayer = L.geoJson(data, {
                    style: { fillColor: 'var(--puebla-guinda)', weight: 1, opacity: 1, color: 'white', fillOpacity: 0.3 },
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            mouseover: (e) => {
                                e.target.setStyle({ fillOpacity: 0.6, weight: 2 });
                            },
                            mouseout: (e) => {
                                window.geojsonLayer.resetStyle(e.target);
                            }
                        });
                    }
                }).addTo(map);
            });

        const regionItems = document.querySelectorAll('.region-list li');
        
        regionItems.forEach(item => {
            const id = item.querySelector('.r-id').textContent;
            const nombre = item.querySelector('.r-name').textContent;

            if (coordenadasRegiones[id]) {
                const marker = L.circleMarker(coordenadasRegiones[id], {
                    radius: 6, fillColor: "#c79b66", color: "#5f1b2d", weight: 2, opacity: 1, fillOpacity: 0.8
                }).addTo(markerGroup);
                
                marker.bindPopup(`<b>Región ${id}: ${nombre}</b>`);

                item.style.cursor = "pointer";
                item.style.transition = "background 0.3s";

                item.addEventListener('click', () => {
                    if (regionSeleccionadaId === id) {
                        map.flyTo(centroPuebla, zoomInicial, { duration: 1.5 });
                        map.closePopup();
                        item.style.backgroundColor = "transparent";
                        regionSeleccionadaId = null;
                    } else {
                        map.flyTo(coordenadasRegiones[id], 12, { duration: 1.5 });
                        marker.openPopup();
                        regionItems.forEach(i => i.style.backgroundColor = "transparent");
                        item.style.backgroundColor = "rgba(199, 155, 102, 0.3)";
                        regionSeleccionadaId = id;
                    }
                });
            }
        });

    }, 200); // Un pequeño retraso para asegurar que el acordeón se abrió
}


//NUEVO MAPA


function renderZonasMetroMode(htmlContent, container) {
    container.style.display = "block";
    container.style.maxWidth = "100%"; 

    // 1. INYECTAR ESTILOS CSS PERSONALIZADOS PARA ESTA VISTA
    // Esto asegura el diseño de mapa grande y barra lateral compacta
    const customStyles = `
    <style>
        /* Contenedor principal en Grid */
        .zm-content-grid {
            display: grid;
            grid-template-columns: 1fr 320px; /* El mapa ocupa todo el resto, el panel 320px */
            grid-template-rows: 750px; /* Altura aumentada para el mapa */
            gap: 15px;
            margin-top: 20px;
        }

        /* Mapa */
        .map-container {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px var(--black-tenue);
            position: relative;
            z-index: 1;
        }

        /* Panel Lateral */
        .data-accordion {
            background: var(--white);
            border: 1px solid var(--white-tenue);
            border-radius: 8px;
            padding: 10px;
            overflow-y: auto; 
            height: 100%;
            box-shadow: 0 2px 4px var(--black-tenue);
        }

        /* Estilos compactos para los elementos del acordeón */
        .accordion-title-main {
            font-size: 1.1rem;
            color: #5f1b2d;
            border-bottom: 2px solid #c79b66;
            padding-bottom: 8px;
            margin-bottom: 10px;
            margin-top: 0;
        }
        
        .acc-item-simple {
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }

        .acc-header-simple {
            width: 100%;
            height: 60px;
            padding: 8px 10px; 
            background: #f9f9f9;
            border: none;
            text-align: left;
            cursor: pointer;
            font-size: 1.2rem; 
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s;
            border-radius: 4px;
        }
        
        .acc-header-simple:hover {
            background: #eee;
        }

        .acc-content-simple {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            background: white;
        }

        .acc-content-simple p {
            padding: 8px 10px;
            margin: 0;
            font-size: 1rem; 
            color: #555;
            line-height: 1.4;
        }

        /* Ajuste para móviles: Columna única */
        @media (max-width: 900px) {
            .zm-content-grid {
                grid-template-columns: 1fr;
                grid-template-rows: 500px auto; 
            }
            .data-accordion {
                padding-top: 120px;
                max-height: 700px; 
            }
        }
    </style>
    `;

    // 2. CONSTRUIR EL HTML
    container.innerHTML = `
        ${customStyles}
        <section class="zm-section">
            <div class="zm-header">
                <img src="IMG/logo_zm.png" alt="ZM Logo" onerror="this.style.display='none'" 
                style="max-height: 60px;"> 
                <div class="zm-text">
                    </div>
            </div>

            <div class="tabs-container">
                <button class="tab-btn active" data-zone="puebla">Puebla-Tlaxcala</button>
                <button class="tab-btn" data-zone="tehuacan">Tehuacán</button>
                <button class="tab-btn" data-zone="teziutlan">Teziutlán</button>
                <button class="tab-btn" data-zone="general">Infografías</button>
                <button class="tab-btn" data-zone="prog">Programa Metropolitano</button>
            </div>

            <div class="zm-content-grid">
                <div class="map-container" id="mapa-puebla"></div>

                <div class="data-accordion" id="accordion-container">
                    </div>
            </div>
        </section>
    `;

    
    const accContainer = document.getElementById('accordion-container');
    const tabs = document.querySelectorAll('.tab-btn');
    let map = null;

   
    const coordenadas = {
        puebla:   [19.0414, -98.2063],
        tehuacan: [18.4631, -97.3930],
        teziutlan:[19.8173, -97.3595]
    };

    const infoZonas = {
        "puebla": { 
            titulo: " Puebla-Tlaxcala",
            coords: coordenadas.puebla,
            zoom: 10,
            datosAcordeon: [
                { titulo: "Población Total", contenido: "3,199,530 habitantes." },
                { titulo: "Población Indígena", contenido: "Abarca municipios de Puebla y Tlaxcala." },
                { titulo: "Total de Vivienda", contenido: "Principal motor industrial y comercial." },
                { titulo: "Grado de rezago", contenido: "2,392 km² aproximadamente." },
                { titulo: "Marginación", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Economía", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Instrumentos de Planeación", contenido: "Alta densidad urbana en el centro." }
                
            ]
        },
        "tehuacan": { 
            titulo: "Tehuacán",
            coords: coordenadas.tehuacan,
            zoom: 12,
            datosAcordeon: [
                { titulo: "Población Total", contenido: "3,199,530 habitantes." },
                { titulo: "Población Indígena", contenido: "Abarca municipios de Puebla y Tlaxcala." },
                { titulo: "Total de Vivienda", contenido: "Principal motor industrial y comercial." },
                { titulo: "Grado de rezago", contenido: "2,392 km² aproximadamente." },
                { titulo: "Marginación", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Economía", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Instrumentos de Planeación", contenido: "Alta densidad urbana en el centro." }
                
            ]
        },
        "teziutlan": { 
            titulo: "Teziutlán",
            coords: coordenadas.teziutlan,
            zoom: 12,
            datosAcordeon: [
                { titulo: "Población Total", contenido: "3,199,530 habitantes." },
                { titulo: "Población Indígena", contenido: "Abarca municipios de Puebla y Tlaxcala." },
                { titulo: "Total de Vivienda", contenido: "Principal motor industrial y comercial." },
                { titulo: "Grado de rezago", contenido: "2,392 km² aproximadamente." },
                { titulo: "Marginación", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Economía", contenido: "Alta densidad urbana en el centro." },
                { titulo: "Instrumentos de Planeación", contenido: "Alta densidad urbana en el centro." }
                
            ]
        },
        "general": {
            titulo: "Visión Estatal",
            coords: [19.0, -97.8],
            zoom: 8,
            datosAcordeon: [
                { titulo: "Resumen", contenido: "Visualización de las 3 zonas metropolitanas estratégicas." }
            ]
        },
        "prog": {
            titulo: "Documentos",
            esDescarga: true,
            archivos: [
                { nombre: "Zonificación Primaria", link: "PDF/31.Zonificación Primaria.pdf" },
                { nombre: "Zonificación Primaria y Riesgos", link: "PDF/32.Zonificación Primaria y riesgos.pdf" },
                { nombre: "Sectores Territoriales", link: "PDF/28.Sectores Territoriales.pdf" },
                { nombre: "Proyectos Propuestos", link: "PDF/31.Proyectos propuestos.pdf" },
                { nombre: "Riesgos", link: "PDF/25.Riesgos.pdf" },
                { nombre: "SUR ENOT", link: "PDF/34.SUR ENOT.pdf" }
            ]
        }
    };

    function initOrUpdateMap(zonaKey) {
        const data = infoZonas[zonaKey];
        if (!data) return;

        if (!map) {
            map = L.map('mapa-puebla').setView(data.coords, data.zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; CARTO',
                maxZoom: 19
            }).addTo(map);

            fetch("https://raw.githubusercontent.com/phantom-zone/mexico-geojson/main/2022/21_puebla/Puebla.json")
                .then(res => res.json())
                .then(geoData => {
                    L.geoJson(geoData, {
                        style: { fillColor: '#5f1b2d', weight: 1, opacity: 1, color: 'white', fillOpacity: 0.3 },
                        onEachFeature: (feature, layer) => {
                            layer.bindPopup(`<b>${feature.properties.NOM_MUN || feature.properties.nombre}</b>`);
                            layer.on('mouseover', function() { this.openPopup(); });
                            layer.on('mouseout', function() { this.closePopup(); });
                        }
                    }).addTo(map);
                });
        } else {
             map.flyTo(data.coords, data.zoom, { duration: 1.5 });
        }
    }

    function actualizarVista(zonaKey) {
        const data = infoZonas[zonaKey];
        if(!data) return;

        const mapContainer = document.getElementById('mapa-puebla');
        
        if (data.esDescarga) {

            mapContainer.innerHTML = "";
            mapContainer.style.background = "#f9f9f9";
            mapContainer.style.overflowY = "auto";
            
            let htmlDescargas = `
                <div style="padding: 20px;">
                    <h3 style="color: #5f1b2d; margin-bottom: 20px;">Documentos Disponibles</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">`;
            
            data.archivos.forEach(file => {
                htmlDescargas += `
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                        <p style="font-weight: bold; font-size: 0.85rem; margin-bottom: 10px; height: 40px; overflow: hidden;">${file.nombre}</p>
                        <a href="${file.link}" download style="background: #5f1b2d; color: white; text-decoration: none; padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; display: inline-block;">
                            Descargar
                        </a>
                    </div>`;
            });
            
            htmlDescargas += `</div></div>`;
            mapContainer.innerHTML = htmlDescargas;
            
            // Limpiar panel derecho o poner instrucciones
            accContainer.innerHTML = `<h4 class="accordion-title-main">Descargas</h4><p style="font-size: 0.8rem; padding: 5px;">Seleccione archivos del panel principal.</p>`;

        } else {
            // MODO MAPA NORMAL
            // Restaurar contenedor del mapa si fue borrado por descargas
            if(mapContainer.innerHTML.includes("Documentos Disponibles") || mapContainer.innerHTML === "") {
                 mapContainer.innerHTML = ""; 
                 mapContainer.style.background = "transparent";
                 map = null; // Forzar reinicio del mapa Leaflet
            }

            setTimeout(() => {
                initOrUpdateMap(zonaKey);
            }, 100);

            // Renderizado de Acordeón en barra lateral
            let accHTML = `<h4 class="accordion-title-main">${data.titulo}</h4>`;
            
            if(data.datosAcordeon) {
                data.datosAcordeon.forEach(item => {
                    accHTML += `
                    <div class="acc-item-simple">
                        <button class="acc-header-simple">
                            <span>${item.titulo}</span>
                            <span class="icon" style="font-size: 0.7rem;">▼</span>
                        </button>
                        <div class="acc-content-simple">
                            <p>${item.contenido}</p>
                        </div>
                    </div>`;
                });
            }
            accContainer.innerHTML = accHTML;
            activarAcordeones();
        }
    }

    function activarAcordeones() {
        const accHeaders = accContainer.querySelectorAll('.acc-header-simple');
        accHeaders.forEach(header => {
            header.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // Eventos Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            actualizarVista(tab.getAttribute('data-zone'));
        });
    });

    // Iniciar
    setTimeout(() => {
        actualizarVista('puebla');
    }, 100);
}

function renderMunicipiosAcordeonMode(container) {
    container.style.display = "block";
    container.style.maxWidth = "100%";

    // Datos de los municipios con la información de los sub-acordeones
    const zonasMetropolitanas = [
        {
            id: "puebla",
            titulo: "Zona Metropolitana Puebla-Tlaxcala",
            coords: [19.0414, -98.2063],
            zoom: 10,
            datosGenerales: [
                { titulo: "- Población", contenido: "3,199,530 habitantes aprox." },
                { titulo: "- Población Indígena", contenido: "Datos demográficos de la población indígena en la zona." },
                { titulo: "- Total de Vivienda", contenido: "Estadísticas de vivienda." },
                { titulo: "- Grado de rezago", contenido: "Nivel de rezago social medio/bajo." },
                { titulo: "- Marginación", contenido: "Índice de marginación." },
                { titulo: "- Economía", contenido: "Principal motor industrial y comercial." },
                { titulo: "- Instrumentos de Planeación", contenido: "Planes metropolitanos vigentes." }
            ]
        },
        {
            id: "tehuacan",
            titulo: "Zona Metropolitana de Tehuacán",
            coords: [18.4631, -97.3930],
            zoom: 12,
            datosGenerales: [
                { titulo: "- Población", contenido: "Población total de la región de Tehuacán." },
                { titulo: "- Población Indígena", contenido: "Comunidades originarias presentes." },
                { titulo: "- Total de Vivienda", contenido: "Estadísticas de vivienda regional." },
                { titulo: "- Grado de rezago", contenido: "Nivel de rezago." },
                { titulo: "- Marginación", contenido: "Índice de marginación." },
                { titulo: "- Economía", contenido: "Destaca por su industria avícola y textil." },
                { titulo: "- Instrumentos de Planeación", contenido: "Programas de desarrollo urbano." }
            ]
        },
        {
            id: "teziutlan",
            titulo: "Zona Metropolitana de Teziutlán",
            coords: [19.8173, -97.3595],
            zoom: 12,
            datosGenerales: [
                { titulo: "- Población", contenido: "Población total en la sierra nororiental." },
                { titulo: "- Población Indígena", contenido: "Datos de población indígena." },
                { titulo: "- Total de Vivienda", contenido: "Viviendas registradas." },
                { titulo: "- Grado de rezago", contenido: "Niveles de rezago social." },
                { titulo: "- Marginación", contenido: "Estadísticas de marginación." },
                { titulo: "- Economía", contenido: "Centro económico, comercial y agrícola." },
                { titulo: "- Instrumentos de Planeación", contenido: "Ordenamientos territoriales." }
            ]
        }
    ];

    // 1. Estilos CSS inyectados para el acordeón principal y los sub-acordeones
    const customStyles = `
    <style>
        .zm-acc-wrapper { width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #ddd; overflow: hidden; margin-top: 20px; }
        .zm-acc-item { border-bottom: 1px solid #ddd; }
        .zm-acc-item:last-child { border-bottom: none; }
        
        /* Acordeón Principal */
        .zm-acc-header { 
            width: 100%; background: #f9f9f9; padding: 18px 20px; font-size: 1.2rem; 
            font-weight: bold; color: var(--puebla-guinda, #5f1b2d); text-align: left; 
            border: none; cursor: pointer; display: flex; justify-content: space-between; 
            align-items: center; transition: background 0.3s;
        }
        .zm-acc-header:hover { background: #eee; }
        .zm-acc-header.active { background: #e0e0e0; border-bottom: 1px solid #ddd; }
        .zm-acc-icon { transition: transform 0.3s ease; }
        .zm-acc-header.active .zm-acc-icon { transform: rotate(180deg); }
        .zm-acc-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out; background: white; }
        
        /* Layout Interior (Mapa a la izq, Datos a la der) */
        .zm-inner-layout {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 350px; /* 1fr para mapa, 350px para datos */
            gap: 20px;
            align-items: start;
        }
        .zm-map-container { width: 100%; height: 450px; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0,0,0,0.2); border: 1px solid #ccc; z-index: 1; }
        
        /* Estilos Sub-acordeones */
        .datos-title { color: var(--puebla-guinda); font-size: 1.1rem; font-weight: 800; margin-bottom: 10px; letter-spacing: 0.5px; }
        .sub-acc-item { margin-bottom: 2px; }
        .sub-acc-header {
            background-color: #a5a5a5;
            color: #ffffff;
            border: none;
            width: 100%;
            text-align: left;
            padding: 12px 15px;
            font-size: 0.95rem;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .sub-acc-header:hover { background-color: #8c8c8c; }
        .sub-acc-icon { font-size: 1.2rem; font-weight: bold; }
        .sub-acc-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            background-color: #f1f1f1;
        }
        .sub-acc-content-inner { padding: 15px; font-size: 0.9rem; color: #333; line-height: 1.4; }

        /* Responsividad para móviles */
        @media (max-width: 850px) {
            .zm-inner-layout { grid-template-columns: 1fr; }
        }
    </style>
    `;

    // 2. Construcción del HTML
    let html = `${customStyles}<div class="zm-acc-wrapper">`;

    zonasMetropolitanas.forEach(zona => {
        
        // Generar los sub-acordeones dinámicamente
        let htmlSubAcordeones = '';
        zona.datosGenerales.forEach(dato => {
            htmlSubAcordeones += `
            <div class="sub-acc-item">
                <button class="sub-acc-header">
                    <span>${dato.titulo}</span>
                    <span class="sub-acc-icon">+</span>
                </button>
                <div class="sub-acc-content">
                    <div class="sub-acc-content-inner">${dato.contenido}</div>
                </div>
            </div>`;
        });

        html += `
        <div class="zm-acc-item">
            <button class="zm-acc-header" data-target="${zona.id}">
                <span>${zona.titulo}</span>
                <span class="zm-acc-icon">▼</span>
            </button>
            <div class="zm-acc-content" id="content-${zona.id}">
                <div class="zm-inner-layout">
                    <div id="mapa-${zona.id}" class="zm-map-container"></div>
                    
                    <div class="datos-generales-container">
                        <div class="datos-title">DATOS GENERALES</div>
                        ${htmlSubAcordeones}
                    </div>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;

    // 3. Lógica del acordeón principal y los mapas
    const mapasInstanciados = {}; 
    const headers = container.querySelectorAll('.zm-acc-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            headers.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                const innerLayout = content.querySelector('.zm-inner-layout');
                
                // Forzamos un max-height enorme temporalmente para evitar cortes
                content.style.maxHeight = "2500px";

                const zonaId = this.getAttribute('data-target');
                const idMapaDOM = `mapa-${zonaId}`;
                const datosZona = zonasMetropolitanas.find(z => z.id === zonaId);

                setTimeout(() => {
                    if (!mapasInstanciados[zonaId]) {
                        const nuevoMapa = L.map(idMapaDOM).setView(datosZona.coords, datosZona.zoom);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; CARTO'
                        }).addTo(nuevoMapa);

                        L.marker(datosZona.coords).addTo(nuevoMapa)
                            .bindPopup(`<b>${datosZona.titulo}</b>`)
                            .openPopup();

                        fetch("https://raw.githubusercontent.com/phantom-zone/mexico-geojson/main/2022/21_puebla/Puebla.json")
                            .then(res => res.json())
                            .then(geoData => {
                                L.geoJson(geoData, {
                                    style: { fillColor: '#5f1b2d', weight: 1, color: 'white', fillOpacity: 0.2 }
                                }).addTo(nuevoMapa);
                            }).catch(e => console.log("GeoJSON no disponible", e));

                        mapasInstanciados[zonaId] = nuevoMapa;
                    } else {
                        mapasInstanciados[zonaId].invalidateSize();
                        mapasInstanciados[zonaId].setView(datosZona.coords, datosZona.zoom);
                    }
                    
                    // Ajustamos el max height al tamaño real del contenido después de cargar el mapa
                    content.style.maxHeight = innerLayout.scrollHeight + "px";
                    
                }, 300);
            }
        });
    });

    // 4. Lógica de los Sub-acordeones
    const subHeaders = container.querySelectorAll('.sub-acc-header');
    
    subHeaders.forEach(sHeader => {
        sHeader.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic cierre el acordeón principal
            
            const subContent = this.nextElementSibling;
            const icon = this.querySelector('.sub-acc-icon');
            const mainContent = this.closest('.zm-acc-content');
            
            // Cerrar si está abierto
            if (subContent.style.maxHeight) {
                subContent.style.maxHeight = null;
                this.style.backgroundColor = "#a5a5a5"; // Regresar al gris
                icon.textContent = "+";
            } else {
                // Abrir
                subContent.style.maxHeight = subContent.scrollHeight + "px";
                this.style.backgroundColor = "#8c8c8c"; // Gris un poco más oscuro activo
                icon.textContent = "-";
            }

            // Recalcular la altura del contenedor principal para que no corte el sub-acordeón
            setTimeout(() => {
                if(mainContent.style.maxHeight) {
                    const innerLayout = mainContent.querySelector('.zm-inner-layout');
                    mainContent.style.maxHeight = innerLayout.scrollHeight + 50 + "px"; // +50px de margen de seguridad
                }
            }, 350); 
        });
    });
}