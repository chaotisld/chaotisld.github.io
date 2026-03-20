document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. BASE DE DATOS LOCAL (Arrays de objetos)
    // =========================================================

    const regionesData = [
        { id: 1, nombre: "Xicotepec", coords: [20.2717, -97.9611] },
        { id: 2, nombre: "Huauchinango", coords: [20.1736, -98.0569] },
        { id: 3, nombre: "Zacatlán", coords: [19.9319, -97.9614] },
        { id: 4, nombre: "Huehuetla", coords: [20.1106, -97.6253] },
        { id: 5, nombre: "Zacapoaxtla", coords: [19.8661, -97.5847] },
        { id: 6, nombre: "Teziutlán", coords: [19.8173, -97.3595] },
        { id: 7, nombre: "Chignahuapan", coords: [19.8369, -98.0319] },
        { id: 8, nombre: "Libres", coords: [19.4658, -97.6894] },
        { id: 9, nombre: "Quimixtlán", coords: [19.2458, -97.1406] },
        { id: 10, nombre: "Acatzingo", coords: [18.9817, -97.7128] },
        { id: 11, nombre: "Ciudad Serdán", coords: [19.0622, -97.4447] },
        { id: 12, nombre: "Tecamachalco", coords: [18.8897, -97.6683] },
        { id: 13, nombre: "Tehuacán", coords: [18.4631, -97.3930] },
        { id: 14, nombre: "Sierra Negra", coords: [18.3300, -97.0800] },
        { id: 15, nombre: "Izúcar de Matamoros", coords: [18.6014, -98.4636] },
        { id: 16, nombre: "Chiautla", coords: [18.3031, -98.6031] },
        { id: 17, nombre: "Acatlán", coords: [18.2017, -98.0483] },
        { id: 18, nombre: "Tepexi de Rodríguez", coords: [18.4744, -97.9258] },
        { id: 19, nombre: "Atlixco", coords: [18.9022, -98.4406] },
        { id: 20, nombre: "San Martín Texmelucan", coords: [19.2844, -98.4344] },
        { id: 21, nombre: "San Miguel Canoa", coords: [19.1488, -98.1015] },
        { id: 22, nombre: "San Pablo Xochimehuacan", coords: [19.0934, -98.2007] },
        { id: 23, nombre: "La Libertad", coords: [18.8566, -98.4154] },
        { id: 24, nombre: "Heroica Puebla de Zaragoza", coords: [19.0414, -98.2063] },
        { id: 25, nombre: "San Baltazar Campeche", coords: [19.0224, -98.2959] },
        { id: 26, nombre: "San Francisco Totimehuacán", coords: [18.9748, -98.1957] },
        { id: 27, nombre: "Ignacio Zaragoza", coords: [19.0289, -98.1794] },
        { id: 28, nombre: "San Andrés Cholula", coords: [19.0600, -98.2949] },
        { id: 29, nombre: "San Pedro Cholula", coords: [19.0576, -98.3053] },
        { id: 30, nombre: "Cuautlancingo", coords: [19.0972, -98.2720] },
        { id: 31, nombre: "Amozoc", coords: [19.0450, -98.0417] },
        { id: 32, nombre: "Tepeaca", coords: [18.9139, -97.8967] }
    ];

    const subregionalesData = [
        { titulo: "Subregión Norte", desc: "Instrumentos de ordenamiento para la Sierra Norte." },
        { titulo: "Subregión Mixteca", desc: "Estrategias de desarrollo territorial zona Mixteca." }
    ];

    const EstSubInt = [
        { nombre: "Programa Estatal de Ordenamiento Territorial y Desarrollo Urbano del Estado de Puebla",
          estatus: "Vigente", tipo: "Programa Estatal", año: 2024 },
        { nombre: "Programa Metropolitano De Puebla - Tlaxcala",
          estatus: "Vigente", tipo: "Programa Metropolitano Interestatal", año: 2023 },
        { nombre: "Programa Subregional de Desarrollo Urbano de los Municipios de Cuautlancingo, Puebla, San Andrés Cholula y San Pedro Cholula",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: 2024 },
        { nombre: "Programa Subregional de Desarrollo Urbano Sustentable del Subsistema Urbano Sustentable Oriental",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: 2008 },
        { nombre: "Programa Subregional de Desarrollo Urbano Para los Municipios de Libres, Oriental y Tepeyahualco, Puebla",
          estatus: "Vigente", tipo: "Programa Subregional de Desarsrollo Urbano", año: 2018 },
        { nombre: "Programa Subregional de Ordenamiento Ecológico para los Municipios de Libres, Oriental y Tepeyahualco",
          estatus: "Vigente", tipo: "Programa de Ordenamiento Ecológico", año: 2018 },
        { nombre: "Programa Subregional de Desarrollo Urbano Sustentable para los Municipios de Mazapiltepec De Juárez, Nopalucan, Rafael Lara Grajales, San José Chiapa y Soltepec",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: "2024" },
    ];

    const municipiosData = [
        { nombre: "Puebla", estado: "En proceso", año: 2016 },
        { nombre: "San Andrés Cholula", estado: "Vigente", año: 2008 },
        { nombre: "Atlixco", estado: "Vigente", año: 2013 },
        { nombre: "Calpan", estado: "Vigente", año: 2008 },
        { nombre: "Coronango", estado: "En proceso", año: 2018 },
        { nombre: "Huaquechula", estado: "Vigente", año: 2007 },
        { nombre: "Huejotzingo", estado: "En proceso", año: 2013 },
        { nombre: "Libres", estado: "Vigente", año: 2009 },
        { nombre: "Ocotepec", estado: "Vigente", año: 2009 },
        { nombre: "Acatzingo", estado: "En proceso", año: 1998 },
        { nombre: "San José Chiapa", estado: "Vigente", año: 2016 },
        { nombre: "Quecholac", estado: "Vigente", año: 2010 },
        { nombre: "Zacatlán", estado: "Vigente", año: 1996 },
        { nombre: "Nopalucan", estado: "Vigente", año: 2016 },
        { nombre: "Tehuacán", estado: "Vigente", año: 2014 },
        { nombre: "Zautla", estado: "Vigente", año: 2009 },
        { nombre: "Rafael Lara Grajales", estado: "Vigente", año: 2016 },
        { nombre: "Amozoc", estado: "Vigente", año: 2013 },
        { nombre: "Cuetzalan del Progreso", estado: "Vigente", año: 2010 },
        { nombre: "Ixtacamaxitlán", estado: "Vigente", año: 2009 },
        { nombre: "Juan C. Bonilla", estado: "Vigente", año: 2008 },
        { nombre: "Oriental", estado: "Vigente", año: 2016 },
        { nombre: "Cuautinchán", estado: "Vigente", año: 2017 },
        { nombre: "Izúcar de Matamoros", estado: "Vigente", año: 2008 },
        { nombre: "Tepanco de López", estado: "Vigente", año: 2009 },
        { nombre: "Tepeyahualco", estado: "Vigente", año: 2009 },
        { nombre: "Teziutlán", estado: "Vigente", año: 2018 },
        { nombre: "Cuyoaco", estado: "Vigente", año: 2009 },
        { nombre: "Cuautlancingo", estado: "En proceso", año: 2014 },
        { nombre: "Ocoyucan", estado: "En proceso", año: 2015 },
        { nombre: "San Martín Texmelucan", estado: "En proceso", año: 2013 },
        { nombre: "Zacapoaxtla", estado: "Vigente", año: 2008},
        { nombre: "San Pedro Cholula", estado: "En proceso", año: "-"},
        { nombre: "Tepeaca", estado: "En proceso", año: "-"},
        { nombre: "Vicente Guerrero", estado: "En proceso", año: "-" }
    ];

    const municipiosDataProc = [
        {  nombre: "Acatzingo", estatus: "En Proceso" },
        {  nombre: "Coronango", estatus: "En Proceso" },
        {  nombre: "Cuautlancingo", estatus: "En Proceso" },
        {  nombre: "Huejotzingo", estatus: "En Proceso" },
        {  nombre: "Ocoyucan", estatus: "En Proceso" },
        {  nombre: "Puebla", estatus: "En Proceso" },
        {  nombre: "San Martín Texmelucan", estatus: "En Proceso" },
        {  nombre: "San Pedro Cholula", estatus: "En Proceso" },
        {  nombre: "Tepeaca", estatus: "En Proceso" },
        {  nombre: "Vicente Guerrero", estatus: "En Proceso" },
        {  nombre: "Zacatlán", estatus: "En Proceso" },
    ];

    const instrumentosData = [
        { cantidad: 12, etiqueta: "Planes Municipales", color: "#c79b66" },
        { cantidad: 3, etiqueta: "Planes Metropolitanos", color: "var(--puebla-guinda)" },
        { cantidad: 5, etiqueta: "Ordenamientos Ecológicos", color: "#444" }
    ];


    // =========================================================
    // 2. RENDERIZADO DINÁMICO (Inyectar datos al HTML)
    // =========================================================

    // A. Renderizar Regiones
    const listaRegiones = document.getElementById('lista-regiones-dinamica');
    regionesData.forEach(region => {
        listaRegiones.innerHTML += `
            <li data-id="${region.id}">
                <span class="r-id">${region.id}</span> 
                <span class="r-name">${region.nombre}</span>
            </li>
        `;
    });

    // B. Renderizar Programas Subregionales
    const gridSubregionales = document.getElementById('grid-subregionales');
    subregionalesData.forEach(prog => {
        gridSubregionales.innerHTML += `
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #eee;">
                <h4 style="color: #333;">${prog.titulo}</h4>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">${prog.desc}</p>
                <button class="btn-action primary" style="width: 100%;">Ver Detalles</button>
            </div>
        `;
    });


    // C. Renderizar Tabla de Municipios (CON BÚSQUEDA Y FILTRO)
    const tablaMunicipios = document.getElementById('tabla-municipios');
    const inputBuscador = document.getElementById('buscador-municipios');
    const selectFiltro = document.getElementById('filtro-municipios');

    function renderizarTabla(datos) {
        tablaMunicipios.innerHTML = ''; 
        
        if (datos.length === 0) {
            tablaMunicipios.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px; color: #666;">
                        No se encontraron municipios o años con esa búsqueda.
                    </td>
                </tr>
            `;
            return;
        }

        datos.forEach(mun => {
            let claseColor = mun.estado === "En proceso" ? "yellow" : "good";

            tablaMunicipios.innerHTML += `
                <tr style="border-bottom: 1px solid #ddd; transition: background 0.2s;">
                    <td style="padding: 10px;">${mun.nombre}</td>
                    <td style="padding: 10px;">
                        <span class="status-badge ${claseColor}">${mun.estado}</span>
                    </td>
                    <td style="padding: 10px;">${mun.año}</td>
                    <td style="padding: 10px;"> 
                        <a href="#" style="text-decoration: none; color: var(--puebla-guinda); font-weight: bold;">Ver</a> 
                    </td>
                </tr>
            `;
        });
    }

    function actualizarMunicipios() {
        const busqueda = inputBuscador.value.toLowerCase();
        const orden = selectFiltro.value;

        let datosFiltrados = municipiosData.filter(mun => 
            mun.nombre.toLowerCase().includes(busqueda) || 
            mun.año.toString().includes(busqueda)
        );

        datosFiltrados.sort((a, b) => {
            if (orden === 'a-z') return a.nombre.localeCompare(b.nombre); 
            else if (orden === 'z-a') return b.nombre.localeCompare(a.nombre); 
            else if (orden === 'año-desc') return b.año - a.año; 
            else if (orden === 'año-asc') return a.año - b.año; 
            else if (orden === 'estado-vigente') return b.estado.localeCompare(a.estado); 
            else if (orden === 'estado-proceso') return a.estado.localeCompare(b.estado); 
        });

        renderizarTabla(datosFiltrados);
    }
    
    if(inputBuscador && selectFiltro) {
        inputBuscador.addEventListener('input', actualizarMunicipios);
        selectFiltro.addEventListener('change', actualizarMunicipios);
        actualizarMunicipios();
    }

    // D. Renderizar Instrumentos
    const contInstrumentos = document.getElementById('contenedor-instrumentos');
    instrumentosData.forEach(inst => {
        contInstrumentos.innerHTML += `
            <div style="width: 200px; padding: 20px; background: white; border-top: 5px solid ${inst.color}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h1 style="font-size: 3rem; color: #555; margin: 0;">${inst.cantidad}</h1>
                <p>${inst.etiqueta}</p>
            </div>
        `;
    });

    // =========================================================
    // E. Renderizado de las Tablas Adicionales
    // =========================================================

    function renderTablaEstSubInt(datos, tbodyId) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = ''; 
        
        datos.forEach(item => {
            // Nota: Se cambió a item.estatus para coincidir con tu array EstSubInt
            let claseColor = (item.estatus === "En proceso" || item.estatus === "En Proceso") ? "yellow" : "good";
            tbody.innerHTML += `
                <tr style="border-bottom: 1px solid #ddd; transition: background 0.2s;">
                    <td style="padding: 10px;">${item.nombre}</td>
                    <td style="padding: 10px;">
                        <span class="status-badge ${claseColor}">${item.estatus}</span>
                    </td>
                    <td style="padding: 10px;">${item.tipo}</td>
                    <td style="padding: 10px;">${item.año}</td>
                    <td style="padding: 10px;"> 
                        <a href="#" style="text-decoration: none; color: var(--puebla-guinda); font-weight: bold;">Ver</a> 
                    </td>
                </tr>
            `;
        });
    }
    
    // Llamada corregida usando el arreglo EstSubInt
    renderTablaEstSubInt(EstSubInt, 'tabla-est-inter-regio');

    
    function renderTablaEnProceso(datos, tbodyId) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = ''; 
        
        datos.forEach(item => {
            // Nota: Se cambió a item.estatus para coincidir con tu array municipiosDataProc
            let claseColor = (item.estatus === "En proceso" || item.estatus === "En Proceso") ? "yellow" : "good";
            tbody.innerHTML += `
                <tr style="border-bottom: 1px solid #ddd; transition: background 0.2s;">
                    <td style="padding: 10px;">${item.nombre}</td>
                    <td style="padding: 10px;">
                        <span class="status-badge ${claseColor}">${item.estatus}</span>
                    </td>
                </tr>
            `;
        });
    }

    // Llamada corregida usando el arreglo municipiosDataProc
    renderTablaEnProceso(municipiosDataProc, 'tabla-enproceso');


    // =========================================================
    // 3. LÓGICA DE INTERFAZ (Acordeón y Mapa)
    // =========================================================

    // Lógica del Acordeón
    const headers = document.querySelectorAll('.acc-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                if (this.id === 'btn-acc-mapa' && window.miMapaPuebla) {
                    setTimeout(() => { window.miMapaPuebla.invalidateSize(); }, 300);
                }
            }
        });
    });

    // Abrir el primer acordeón por defecto
    setTimeout(() => {
        const primerHeader = document.getElementById('btn-acc-mapa');
        if (primerHeader) {
            primerHeader.classList.add('active');
            const primerContent = primerHeader.nextElementSibling;
            primerContent.style.maxHeight = primerContent.scrollHeight + "px";
        }
    }, 50);

    // Lógica del Mapa (Leaflet)
    const centroPuebla = [19.0414, -98.2063];
    const zoomInicial = 8;
    let regionSeleccionadaId = null;

    setTimeout(() => {
        if (!document.getElementById('mapa-puebla')) return;

        var map = L.map('mapa-puebla').setView(centroPuebla, zoomInicial);
        window.miMapaPuebla = map;      

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; CARTO',
            maxZoom: 19
        }).addTo(map);

        const markerGroup = L.featureGroup().addTo(map);

        // Capa GeoJSON
        fetch("https://raw.githubusercontent.com/phantom-zone/mexico-geojson/main/2022/21_puebla/Puebla.json")
            .then(res => res.json())
            .then(data => {
                window.geojsonLayer = L.geoJson(data, {
                    style: { fillColor: 'var(--puebla-guinda)', weight: 1, opacity: 1, color: 'white', fillOpacity: 0.3 },
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            mouseover: (e) => { e.target.setStyle({ fillOpacity: 0.6, weight: 2 }); },
                            mouseout: (e) => { window.geojsonLayer.resetStyle(e.target); }
                        });
                    }
                }).addTo(map);
            });

        // Generar marcadores e interactividad basados en regionesData
        const regionItems = document.querySelectorAll('.region-list li');
        
        regionItems.forEach(item => {
            const id = parseInt(item.getAttribute('data-id'));
            const regionInfo = regionesData.find(r => r.id === id);

            if (regionInfo && regionInfo.coords) {
                const marker = L.circleMarker(regionInfo.coords, {
                    radius: 6, fillColor: "#c79b66", color: "#5f1b2d", weight: 2, opacity: 1, fillOpacity: 0.8
                }).addTo(markerGroup);
                
                marker.bindPopup(`<b>Región ${id}: ${regionInfo.nombre}</b>`);

                item.style.cursor = "pointer";
                item.style.transition = "background 0.3s";

                item.addEventListener('click', () => {
                    if (regionSeleccionadaId === id) {
                        map.flyTo(centroPuebla, zoomInicial, { duration: 1.5 });
                        map.closePopup();
                        item.style.backgroundColor = "transparent";
                        regionSeleccionadaId = null;
                    } else {
                        map.flyTo(regionInfo.coords, 12, { duration: 1.5 });
                        marker.openPopup();
                        regionItems.forEach(i => i.style.backgroundColor = "transparent");
                        item.style.backgroundColor = "rgba(199, 155, 102, 0.3)";
                        regionSeleccionadaId = id;
                    }
                });
            }
        });
    }, 200);

});