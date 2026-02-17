document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('cat');

    if(!categoria) return;

    const datos = {
        "progrMetro": {
            titulo: "Programa Metropolitano",
            descripcion: "Instrumentos de planeación para las zonas metropolitanas del estado",
            tipoVista: "grid", 
            grupos: [
                {
                    tituloGrupo: "ZONIFICACIÓN",
                    archivos: [
                        { nombre: "Zonificación Primaria", img: "IMG/zon_prim.png", linkDescarga: "PDF/31.Zonificación Primaria.pdf" },
                        { nombre: "Zonificación Primaria y Riesgos", img: "IMG/zo_prim_riesg.png", linkDescarga: "PDF/32.Zonificación Primaria y riesgos.pdf" },
                        { nombre: "Sectores Territoriales", img: "IMG/sectores_terri.png", linkDescarga: "PDF/28.Sectores Territoriales.pdf" }
                    ]
                },
                {
                    tituloGrupo: "PROYECTOS Y ESTRATEGIAS",
                    archivos: [
                        { nombre: "Proyectos Propuestos", img: "IMG/proy_propu.png", linkDescarga: "PDF/31.Proyectos propuestos.pdf" },
                        { nombre: "Proyectos Institucionales", img: "IMG/proy_insti.png", linkDescarga: "PDF/32.Proyectos institucionales.pdf" },
                        { nombre: "Estrategias", img: "IMG/estrategoas.png", linkDescarga: "PDF/33.Estrategias.pdf" }
                    ]
                },
                {
                    tituloGrupo: "ANEXO CARTOGRÁFICO",
                    archivos: [
                        { nombre: "Riesgos", img: "IMG/riesgos.jpg", linkDescarga: "PDF/25.Riesgos.pdf" },
                        { nombre: "Conjuntos Urbanos", img: "IMG/conjuntos.jpg", linkDescarga: "PDF/26.Conjuntos urbanos.pdf" },
                        { nombre: "SUR ENOT", img: "IMG/sur_enot.jpg", linkDescarga: "PDF/34.SUR ENOT.pdf" }
                    ]
                }
            ]
        },

        
        "progrEst": {
            titulo: "Sistema Estatal de Planeación",
            descripcion: "Programa Estatal de Ordenamiento Territorial y Desarrollo Urbano del Estado de Puebla",
            tipoVista: "dashboardMap", 
            htmlContenido: `
            <section class="seccion-mapa" style="padding: 0;">

                <div class="custom-tabs-wrapper">
                
    <div class="custom-tab active" data-index="0">Regiones del Estado de Puebla</div>
            <div class="custom-tab" data-index="1">Programas Subregionales</div>
            <div class="custom-tab" data-index="2">Municipios con Instrumentos</div>
            <div class="custom-tab" data-index="3">Tipo de Instrumentos</div>
            <div class="custom-tab" data-index="4">Consejos Municipales</div>
                </div>
                <div class="dashboard-split-container"> 
                    <div class="map-pane">
                        <div id="mapa-puebla" style="width: 100%; height: 100%; min-height: 600px;"></div>
                    </div>

                    <div class="data-pane">
                        <h3 class="data-title">DATOS</h3>
                        <h4 class="data-subtitle">REGIONES DEL ESTADO DE PUEBLA</h4>
                        <div class="data-header-row">
                            <span>CLAVE</span>
                            <span>NOMBRE DE LA REGIÓN</span>
                        </div>

                        <div class="region-list-container">
                            <ul class="region-list">
                                <li><span class="r-id">1</span> <span class="r-name">Xicotepec</span></li>
                                <li><span class="r-id">2</span> <span class="r-name">Huauchinango</span></li>
                                <li><span class="r-id">3</span> <span class="r-name">Zacatlán</span></li>
                                <li><span class="r-id">4</span> <span class="r-name">Huehuetla</span></li>
                                <li><span class="r-id">5</span> <span class="r-name">Zacapoaxtla</span></li>
                                <li><span class="r-id">6</span> <span class="r-name">Teziutlán</span></li>
                                <li><span class="r-id">7</span> <span class="r-name">Chignahuapan</span></li>
                                <li><span class="r-id">8</span> <span class="r-name">Libres</span></li>
                                <li><span class="r-id">9</span> <span class="r-name">Quimixtlán</span></li>
                                <li><span class="r-id">10</span> <span class="r-name">Acatzingo</span></li>
                                <li><span class="r-id">11</span> <span class="r-name">Ciudad Serdán</span></li>
                                <li><span class="r-id">12</span> <span class="r-name">Tecamachalco</span></li>
                                <li><span class="r-id">13</span> <span class="r-name">Tehuacán</span></li>
                                <li><span class="r-id">14</span> <span class="r-name">Sierra Negra</span></li>
                                <li><span class="r-id">15</span> <span class="r-name">Izúcar de Matamoros</span></li>
                                <li><span class="r-id">16</span> <span class="r-name">Chiautla</span></li>
                                <li><span class="r-id">17</span> <span class="r-name">Acatlán</span></li>
                                <li><span class="r-id">18</span> <span class="r-name">Tepexi de Rodríguez</span></li>
                                <li><span class="r-id">19</span> <span class="r-name">Atlixco</span></li>
                                <li><span class="r-id">20</span> <span class="r-name">San Martín Texmelucan</span></li>
                                <li><span class="r-id">21</span> <span class="r-name">San Miguel Canoa</span></li>
                                <li><span class="r-id">22</span> <span class="r-name">San Pablo Xochimehuacan</span></li>
                                <li><span class="r-id">23</span> <span class="r-name">La Libertad</span></li>
                                <li><span class="r-id">24</span> <span class="r-name">Heroica Puebla de Zaragoza</span></li>
                                <li><span class="r-id">25</span> <span class="r-name">San Baltazar Campeche</span></li>
                                <li><span class="r-id">26</span> <span class="r-name">San Francisco Totimehuacán</span></li>
                                <li><span class="r-id">27</span> <span class="r-name">Ignacio Zaragoza</span></li>
                                <li><span class="r-id">28</span> <span class="r-name">San Andrés Cholula</span></li>
                                <li><span class="r-id">29</span> <span class="r-name">San Pedro Cholula</span></li>
                                <li><span class="r-id">30</span> <span class="r-name">Cuautlancingo</span></li>
                                <li><span class="r-id">31</span> <span class="r-name">Amozoc</span></li>
                                <li><span class="r-id">32</span> <span class="r-name">Tepeaca</span></li>
                            </ul>
                        </div>
                        
                        <div class="data-footer">
                            <small>FUENTE DE INFORMACIÓN: Plan Estatal de Desarrollo</small>
                        </div>
                    </div>
                </div>
            </section>
            `
        },


        "munic": {
            titulo: "Zonas Metropolitanas",
            descripcion: "En el Estado de Puebla se localizan 3 de las 74 Zonas Metropolitanas del país...",
            tipoVista: "zonasMetro", 
            htmlContenido: `
  
            `
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
        } else {
            renderListMode(dataSeleccionada.archivos, container);
        }
    }
});



function renderListMode(archivos, container) {
    container.style.display = "grid"; 
    container.className = "downloads-container"; 

    let html = "";
    archivos.forEach(archivo => {
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
                <span class="doc-meta">${archivo.meta}</span>
            </div>
            <div class="doc-actions">
                <a href="${archivo.linkDescarga}" download class="btn-action primary">Descargar PDF</a>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function renderGridMode(grupos, container) {
    container.style.display = "block"; 
    let html = "";
    grupos.forEach(grupo => {
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
    });
    container.innerHTML = html;
}

function renderDashboardMapMode(htmlContent, container) {
    container.style.display = "block";
    container.style.maxWidth = "100%"; 
    container.innerHTML = htmlContent;

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
                                document.getElementById('info-box').innerHTML = `<strong>${feature.properties.NOM_MUN || feature.properties.nombre}</strong>`;
                            },
                            mouseout: (e) => {
                                window.geojsonLayer.resetStyle(e.target);
                                document.getElementById('info-box').innerHTML = 'Pase el cursor sobre un municipio';
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
                    // Lógica de Regreso (Toggle)
                    if (regionSeleccionadaId === id) {
                        // Si ya está seleccionado, regresamos al estado inicial
                        map.flyTo(centroPuebla, zoomInicial, { duration: 1.5 });
                        map.closePopup();
                        item.style.backgroundColor = "transparent";
                        regionSeleccionadaId = null;
                        document.getElementById('info-box').innerHTML = 'Vista general restablecida';
                    } else {
                        // Zoom a la región seleccionada
                        map.flyTo(coordenadasRegiones[id], 12, { duration: 1.5 });
                        marker.openPopup();
                        
                        // Limpiar estilos previos y aplicar el nuevo
                        regionItems.forEach(i => i.style.backgroundColor = "transparent");
                        item.style.backgroundColor = "rgba(199, 155, 102, 0.3)";
                        regionSeleccionadaId = id;
                        document.getElementById('info-box').innerHTML = `📍 Región: <strong>${nombre}</strong>`;
                    }
                });
            }
        });

    }, 100); 
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