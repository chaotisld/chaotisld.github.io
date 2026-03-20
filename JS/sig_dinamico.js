
document.addEventListener("DOMContentLoaded", () => {

    
    
    // =========================================================
    // 1. BASE DE DATOS LOCAL (Arrays de objetos)
    // =========================================================

    const regionesData = [
        { id: 1, nombre: "Sierra Norte", coords: [20.2717, -97.9611] },
        { id: 2, nombre: "Sierra Nororiental", coords: [20.1736, -98.0569] },
        { id: 3, nombre: "Valle de Serdán", coords: [19.9319, -97.9614] },
        { id: 4, nombre: "Angelópolis", coords: [20.1106, -97.6253] },
        { id: 5, nombre: "Valle de Atlixco y Matamoros", coords: [19.8661, -97.5847] },
        { id: 6, nombre: "Mixteca", coords: [19.8173, -97.3595] },
        { id: 7, nombre: "Tehuacán y Sierra Negra", coords: [19.8369, -98.0319] }

    ];

    const microRegionesData = [
        { id: 1, nombre: "Xicotepec", coords: [] },
        { id: 2, nombre: "Huauchinango", coords: []},
        { id: 3, nombre: "Chignahuapan", coords: []},
        { id: 4, nombre: "Zacapoaxtla", coords: []},
        { id: 5, nombre: "Libres", coords: []},
        { id: 6, nombre: "San Martín Texmelucan", coords: []},
        { id: 7, nombre: "Huejotzingo", coords: []},
        { id: 8, nombre: "Puebla", coords: []},
        { id: 12, nombre: "Amozoc", coords: []},
        { id: 13, nombre: "Tepeaca", coords: []},
        { id: 14, nombre: "Ciudad Serdán", coords: []},
        { id: 15, nombre: "Tecamachalco", coords: []},
        { id: 18, nombre: "Cholula",coords: []},
        { id: 21, nombre: "Atlixco", coords: []},
        { id: 22, nombre: "Izúcar de Matamoros", coords: []},
        { id: 23, nombre: "Acatlán", coords: []},
        { id: 24, nombre: "Tehuacán", coords: []},
        { id: 25, nombre: "Tehuacán", coords: []},
        { id: 26, nombre: "Ajalpan", coords: []},
        { id: 27, nombre: "Cuautempan", coords: []},
        { id: 28, nombre: "Chiautla", coords: []},
        { id: 29, nombre: "Tepexi de Rodríguez", coords: []},
        { id: 30, nombre: "Acatzingo", coords: []},
        { id: 31, nombre: "Tlatlauquitepec", coords: []},
    ]

    const subregionalesData = [
        { titulo: "Subregión Norte", desc: "Instrumentos de ordenamiento para la Sierra Norte." },
        { titulo: "Subregión Mixteca", desc: "Estrategias de desarrollo territorial zona Mixteca." }
    ];

    const EstSubInt = [
        { nombre: "Programa Estatal de Ordenamiento Territorial y Desarrollo Urbano del Estado de Puebla",
          estatus: "Vigente", tipo: "Programa Estatal", año: 2024,
        sitio: "<a href='https://planeader.puebla.gob.mx/programasEstatales/programa-estatal-de-ordenamiento-territorial-y-desarrollo-urbano-del-estado-de-puebla20241209192003.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > planeader.puebla.gob.mx/programasEstatales.gob.mx </a>   "  
        },
        { nombre: "Programa Metropolitano De Puebla - Tlaxcala",
          estatus: "Vigente", tipo: "Programa Metropolitano Interestatal", año: 2023 ,
        sitio: "<a href='https://ojp.puebla.gob.mx/legislacion-del-estado/item/6123-programa-metropolitano-de-puebla-tlaxcala-sintesis-ejecutiva-2023' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > ojp.puebla.gob.mx/Programa Metropolitano De Puebla-Tlaxcala </a> "},
        { nombre: "Programa Subregional de Desarrollo Urbano de los Municipios de Cuautlancingo, Puebla, San Andrés Cholula y San Pedro Cholula",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: 2024, 
          sitio: "<a href='https://ojp.puebla.gob.mx/media/k2/attachments/Programa_Subregional_de_Desarrollo_Urbano_de_Cuautlancingo,_Puebla,_San_Andr%C3%A9s_Cholula_y_San_Pedro_Cholula_EV_19022024.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > ojp.puebla.gob.mx/Programa Subregional de Desarrollo Urbano de los Municipios de Cuautlancingo, Puebla, San Andrés Cholula y San Pedro Cholula	</a> "  },
        { nombre: "Programa Subregional de Desarrollo Urbano Sustentable del Subsistema Urbano Sustentable Oriental",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: 2008,
        sitio: "<a href='https://ojp.puebla.gob.mx/media/k2/attachments/Programa_Subregional_de_Desarrollo_Urbano_para_los_Municipios_de_Libres_Oriental_y_Tepeyahualco_15052018_(6).pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > ojp.puebla.gob.mx/Programa Subregional de Desarrollo Urbano Sustentable del Subsistema Urbano Sustentable Oriental	</a> " },
        { nombre: "Programa Subregional de Desarrollo Urbano Para los Municipios de Libres, Oriental y Tepeyahualco, Puebla",
          estatus: "Vigente", tipo: "Programa Subregional de Desarsrollo Urbano", año: 2018, 
        sitio: "<a href='https://ojp.puebla.gob.mx/normatividad-municipal/item/2129-programa-subregional-de-desarrollo-urbano-para-los-municipios-de-libres-oriental-y-tepeyahualco' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > ojp.puebla.gob.mx/Programa Subregional de Desarrollo Urbano Para los Municipios de Libres, Oriental y Tepeyahualco, Puebla </a>" },
        { nombre: "Programa Subregional de Ordenamiento Ecológico para los Municipios de Libres, Oriental y Tepeyahualco",
          estatus: "Vigente", tipo: "Programa de Ordenamiento Ecológico", año: 2018, 
        sitio: "<a href='https://ojp.puebla.gob.mx/normatividad-municipal/item/2643-programa-regional-de-ordenamiento-ecologico-para-los-municipios-de-libres-oriental-y-tepeyahualco' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > ojp.puebla.gob.mx/Programa Subregional de Ordenamiento Ecológico para los Municipios de Libres, Oriental y Tepeyahualco </a>	 " },
        { nombre: "Programa Subregional de Desarrollo Urbano Sustentable para los Municipios de Mazapiltepec De Juárez, Nopalucan, Rafael Lara Grajales, San José Chiapa y Soltepec",
          estatus: "Vigente", tipo: "Programa Subregional de Desarrollo Urbano", año: 2024,
        sitio: "<a href='https://ojp.puebla.gob.mx/media/k2/attachments/Programa_Municipal_de_Desarrollo_Urbano_Sustentable_del_Municipio_de_Nopalucan_T4_20042016.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> ojp.puebla.gob.mx/Programa Subregional de Desarrollo Urbano Sustentable para los Municipios de Mazapiltepec De Juárez, Nopalucan, Rafael Lara Grajales, San José Chiapa y Soltepec </a> " },
    ];

    const municipiosData = [
        { nombre: "San Andrés Cholula", estado: "Vigente", año: 2008, sitio: "<a href='https://sach.gob.mx/avisos/plan-municipal-de-desarrollo/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> SanAndresCholula.gob.mx </a>" },
        { nombre: "Atlixco", estado: "Vigente", año: 2013, sitio: "<a href='https://www.atlixco.gob.mx/Pages/Transparencia/PMD' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Atlixco.gob.mx </a> " },
        { nombre: "Calpan", estado: "Vigente", año: 2008, sitio: "Sin vínculo"},
        { nombre: "Huaquechula", estado: "Vigente", año: 2007, sitio: "<a href='https://huaquechula.gob.mx/documentos2427/Transparencia/PBR-SED/3er%20trimestre2025/PMD%20Huaquechula%202024-2027.pdf' style='text-decoration: none; color: var(--puebla-guinda);' target='_blank'> Huaquechula.gob.mx </a> " },
        { nombre: "Libres", estado: "Vigente", año: 2009, sitio: "<a href='https://libres.gob.mx/wp-content/uploads/2025/07/PMD-LIBRES-2024-2027-ACTUALIZADO.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Libres.gob.mx </a>"},
        { nombre: "Ocotepec", estado: "Vigente", año: 2009, sitio: "<a href='https://ocotepecpuebla.gob.mx/wp-content/CONAC/SIPOT/2024/Plan_de_desarrollo_Municipal_Ocotepec_2021_2024.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Ocotepec.gob.mx </a> " },
        { nombre: "San José Chiapa", estado: "Vigente", año: 2016, sitio: "<a href='https://sanjosechiapa.puebla.gob.mx/docus/contraloria/CONTRALORIA-D29-A2021-1685117287.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> SanJoseChiapa.gob.mx </a>" },
        { nombre: "Quecholac", estado: "Vigente", año: 2010, sitio: "<a href='https://municipioquecholac.gob.mx/2021-2024/pdf/transparencia3/PMD_2021-2024_Quecholac.pdf' style='text-decoration: none; color: var(--puebla-guinda);' target='_blank'> MunicipioQuecholac.gob.mx </a> " },
        { nombre: "Nopalucan", estado: "Vigente", año: 2016, sitio: "<a href='https://nopalucan.puebla.gob.mx/docus/contraloria/CONTRALORIA-D84-A2025-1752686199.pdf' style='text-decoration: none; color: var(--puebla-guinda); target='_blank' > Nopalucan.puebla.gob.mx  </a> " },
        { nombre: "Tehuacán", estado: "Vigente", año: 2014, sitio: "<a href='https://transparencia.tehuacan.gob.mx/media/files/Administracion%202021-2024/Tehuac%C3%A1n%20PMD%202021-2024%20Versi%C3%B3n%20Final%2020_01_2022.pdf' style='text-decoration: none; color: var(--puebla-guinda);' target='_blank'> Tehuacan.gob.mx </a> " },
        { nombre: "Zautla", estado: "Vigente", año: 2009, sitio: "<a href='https://drive.google.com/file/d/1BgK91pBDuSCBXaS3t_M3VlyUELUO9gxV/view' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > Zautla.gob.mx </a> " },
        { nombre: "Rafael Lara Grajales", estado: "Vigente", año: 2016, sitio: "<a href='https://rafaellaragrajales.puebla.gob.mx/docus/contraloria/CONTRALORIA-D84-A2025-1756832447.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > RafaelLaraGrajales.gob.mx </a>" },
        { nombre: "Amozoc", estado: "Vigente", año: 2013, sitio: "<a href='https://www.amozoc.gob.mx/documentos/PROGRAMA-AMOZOC-VERSION-ABREVIADA.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > Amozoc.gob.mx </a> "} ,
        { nombre: "Cuetzalan del Progreso", estado: "Vigente", año: 2010, sitio: "Sin vínculo" },
        { nombre: "Ixtacamaxitlán", estado: "Vigente", año: 2009, sitio: "<a href='https://ixtacamaxtitlanpuebla.gob.mx/v2.70/plan-de-desarrollo-municipal/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > Ixtacamaxtitlanpuebla.gob.mx </a>" },
        { nombre: "Juan C. Bonilla", estado: "Vigente", año: 2008, sitio: "<a href='https://www.jcb.gob.mx/trans/docs/normativa/dpd2.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > jcb.gob.mx </a> " },
        { nombre: "Oriental", estado: "Vigente", año: 2016, sitio: "<a href='https://www.oriental.gob.mx/gobierno/desarrollompal.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > Oriental.gob.mx </a> " },
        { nombre: "Cuautinchán", estado: "Vigente", año: 2017, sitio: "Sin vínculo" },
        { nombre: "Izúcar de Matamoros", estado: "Vigente", año: 2008, sitio: "<a href='https://www.izucar.gob.mx/wp-content/uploads/2022/04/PMDIz2124-Carta.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'  > Izucar.gob.mx </a>  " },
        { nombre: "Tepanco de López", estado: "Vigente", año: 2009, sitio: "<a href='https://transparencia.tepanco.gob.mx/wp-content/uploads/2025/11/Modificacion-y-adecuacion-del-Plan-Municipal-de-Desarrollo-Tepanco-de-Lopez.pdf' style='text-decoration: none; color: var(--puebla-guinda);' target='_blank' > TepancoDeLopez.gob.mx </a>" },
        { nombre: "Tepeyahualco", estado: "Vigente", año: 2009, sitio: "<a href='https://ayuntamientotepeyahualco.gob.mx/gobierno/plan-municipal-de-desarrollo/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Tepeyahualco.gob.mx </a> " },
        { nombre: "Teziutlán", estado: "Vigente", año: 2018, sitio: "<a href='https://teziutlan.gob.mx/Archivos/ContenidoNavegacion-58029.pdf' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank' > Teziutlan.gob.mx </a> " },
        { nombre: "Cuyoaco", estado: "Vigente", año: 2009, sitio: "Sin vínculo" },
        { nombre: "Zacapoaxtla", estado: "Vigente", año: 2008, sitio: "<a href='https://zacapoaxtla.gob.mx/transparenciaWeb/41/Plan_Municipal_de_Desarrollo/planmunicipaldedesarrollozacapoaxtla2024202720250722162345.pdf' style='text-decoration: none; color: var(--puebla-guinda); target='_blank'> Zacapoaxtla.gob.mx </a> "},
    ];

    const municipiosDataProc = [
        {  nombre: "Acatzingo", estatus: "En Proceso", sitio: "<a href='https://acatzingo.gob.mx/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Acatzingo.gob.mx </a> " },
        {  nombre: "Coronango", estatus: "En Proceso", sitio: "<a href='https://transparencia.coronango.gob.mx/planeacion/index.php' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Coronango.gob.mx </a> "  },
        {  nombre: "Cuautlancingo", estatus: "En Proceso", sitio: "<a href='https://cuautlancingo.gob.mx/pmd' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Cuautlancingo.gob.mx </a> "  },
        {  nombre: "Huejotzingo", estatus: "En Proceso", sitio: "<a href='https://huejotzingo.gob.mx/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Huejotzingo.gob.mx </a> " },
        {  nombre: "Ocoyucan", estatus: "En Proceso", sitio: "Sin vínculo  " },
        {  nombre: "Puebla", estatus: "En Proceso", sitio: "<a href='https://memorias.pueblacapital.gob.mx/vi-planes-municipales-de-desarrollo/programa-municipal-de-desarrollo-urbano-sustentable-de-puebla' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Pueblacapital.gob.mx </a> "  },
        {  nombre: "San Martín Texmelucan", estatus: "En Proceso",sitio: "<a href='https://sanmartintexmelucan.gob.mx/modulos/anteproyecto_dusmt/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> SanMartinTexmelucan.gob.mx </a> "  },
        {  nombre: "San Pedro Cholula", estatus: "En Proceso", sitio: "<a href='https://cholula.gob.mx/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> SanPedroCholula.gob.mx </a> "   },
        {  nombre: "Tepeaca", estatus: "En Proceso" ,  sitio: "<a href='https://tepeaca.gob.mx/site/colaboracion-ciudadana/' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Tepeaca.gob.mx </a> "  },
        {  nombre: "Vicente Guerrero", estatus: "En Proceso", sitio: "Sin vínculo"  },
        {  nombre: "Zacatlán", estatus: "En Proceso", sitio: "<a href='https://zacatlan.gob.mx/pmd.php' style='text-decoration: none; color: var(--puebla-guinda); ' target='_blank'> Zacatlan.gob.mx </a>" }
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

    const listaMicroregiones = document.getElementById('lista-microregiones-dinamica');
    microRegionesData.forEach(region => {
        listaMicroregiones.innerHTML += `
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
                    <td style="padding: 10px;">${mun.sitio}  </td>
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
                    <td style="padding: 10px;"> ${item.sitio} </td> 
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
                    <td style="padding: 10px; ">${item.sitio} </td>
                </tr>
            `;
        });
    }

    // Llamada corregida usando el arreglo municipiosDataProc
    renderTablaEnProceso(municipiosDataProc, 'tabla-enproceso');


    // =========================================================
    // 3. LÓGICA DE INTERFAZ (Acordeón y Mapa)
    // =========================================================

    // =========================================================
    // Lógica de Pestañas (Tabs) del Mapa
    // =========================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-content-pane');

    // Creamos las capas (FeatureGroups) para Leaflet globalmente
    window.capaMacro = L.featureGroup();
    window.capaMicro = L.featureGroup();
    window.capaMunicipios = L.featureGroup();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 1. Cambiar la clase activa del botón
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabSeleccionada = this.getAttribute('data-tab');

            // 2. Mostrar el panel HTML de datos correcto
            tabPanes.forEach(pane => pane.style.display = 'none');
            const targetPane = document.getElementById(`pane-${tabSeleccionada}`);
            if(targetPane) targetPane.style.display = 'block';

            // 3. Cambiar los puntos en el mapa
            if(window.miMapaPuebla) {
                // Limpiamos el mapa de todos los puntos primero
                window.miMapaPuebla.removeLayer(window.capaMacro);
                window.miMapaPuebla.removeLayer(window.capaMicro);
                window.miMapaPuebla.removeLayer(window.capaMunicipios);
                window.miMapaPuebla.closePopup(); 

// Agregamos solo la capa que corresponde
                if (tabSeleccionada === 'estado') {
                    if (window.geojsonLayer) {
                        window.miMapaPuebla.fitBounds(window.geojsonLayer.getBounds(), { animate: true, duration: 1.0 });
                    } else {
                        window.miMapaPuebla.flyTo(centroPuebla, zoomInicial, { duration: 1.0 });
                    }
                } else if (tabSeleccionada === 'macro') {
                    window.capaMacro.addTo(window.miMapaPuebla);
                } else if (tabSeleccionada === 'micro') {
                    window.capaMicro.addTo(window.miMapaPuebla);
                } else if (tabSeleccionada === 'municipios') {
                    window.capaMunicipios.addTo(window.miMapaPuebla);
                }
                
                // Forzamos a Leaflet a recalcular los tamaños para evitar el renderizado "roto" (tiles grises o desplazados)
                setTimeout(() => {
                    window.miMapaPuebla.invalidateSize();
                }, 100);
            }
        });
    });

    // Lógica del Acordeón
    // ... (tu código actual sigue aquí)

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

        const markerGroup = window.capaMacro;

        // Asignamos las capas generadas a las variables globales que ya controlan tus pestañas
        if (typeof crearCapaMacro === 'function') {
            window.capaMacro = crearCapaMacro();
        } else {
            window.capaMacro = L.featureGroup(); // Fallback por si el archivo no carga
        }

        if (typeof crearCapaMicro === 'function') {
            window.capaMicro = crearCapaMicro();
        } else {
            window.capaMicro = L.featureGroup();
        }

        if (typeof crearCapaMunicipios === 'function') {
            window.capaMunicipios = crearCapaMunicipios();
        } else {
            window.capaMunicipios = L.featureGroup();
        }

        // Capa base del Estado (la que ya tenías)
        if (typeof dataEstatal !== 'undefined') {
            window.geojsonLayer = L.geoJson(dataEstatal, {
                style: { weight: 3, opacity: 1, color: '#4e1022', fillOpacity: 0 }
            }).addTo(map);
            map.fitBounds(window.geojsonLayer.getBounds());
        }



        

// Capa GeoJSON utilizando la variable 'dataEstatal' de estado.js
        if (typeof dataEstatal !== 'undefined') {
            window.geojsonLayer = L.geoJson(dataEstatal, {
                style: { 
                    weight: 3,                         // Grosor del borde (remarcado)
                    opacity: 1,                        // Opacidad del borde (1 = totalmente visible)
                    color: 'var(--puebla-oscuro)',     // Color del borde
                    fillOpacity: 0                     // Interior completamente transparente
                }
                // Se eliminó la función onEachFeature para quitar cualquier interacción al pasar el cursor
            }).addTo(map);

            // Centrar y ajustar el zoom automáticamente a los límites del polígono de Puebla
            map.fitBounds(window.geojsonLayer.getBounds());
            
        } else {
            console.error("No se encontró dataEstatal. Asegúrate de haber importado estado.js en sig.html");
        }
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