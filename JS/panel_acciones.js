document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('buscador');
    const searchBtn = document.querySelector('.search-button');
    const mainContent = document.querySelector('.main-content'); 

    // -----------------------------------------------------------------------
    // ZONA EDITABLE: AQUÍ DEBES PEGAR EL TEXTO REAL DE TUS PÁGINAS
    // -----------------------------------------------------------------------
    const manualData = [
        {
            url: 'index.html',
            title: 'Inicio',
            content: `

            <a href="index.html"></a>
            
 
                      `
        },
        {
            url: 'desarrollo.html',
            title: 'Desarrollo Urbano',
            content: `
            <a href="desarrollo.html"></a>

            
            
            `
        },
        {
            url: 'gestion.html',
            title: 'Gestión de Suelos',
            content: `Subregionales, Ordenamiento ecológico, trámites, licencias, uso de suelo, factibilidades, permisos de construcción.`
        },
        {
            url: 'biodiversidad.html',
            title: 'Biodiversidad',
            content: `Áreas Naturales Protegidas ANP, ADVC, conservación, medio ambiente, flora y fauna, corredores biológicos, reforestación.`
        },
        {
            url: 'sig.html',
            title: 'Sistema SIG',
            content: `Sistema de Información Geográfica, mapas interactivos, capas, descargas, catastro, shapefiles, coordenadas, satélite.`
        }
    ];
 
    let fullSiteContent = [];

    // Función para normalizar texto (quitar acentos y minúsculas)
    function normalizeText(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async function indexSite() {
        // Intentamos cargar dinámicamente, si falla, usamos manualData
        const pageUrls = manualData.map(p => p.url);
        let autoIndexSuccess = false;

        try {
            // Verificamos si podemos hacer fetch al primer archivo (prueba de servidor)
            const response = await fetch(pageUrls[0]);
            if (response.ok) {
                for (const page of manualData) {
                    const resp = await fetch(page.url);
                    if (resp.ok) {
                        const html = await resp.text();
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        // Extraemos solo el texto visible del body
                        const text = doc.body.innerText || ""; 
                        
                        fullSiteContent.push({
                            url: page.url,
                            title: page.title,
                            contentRaw: text, // Texto original para mostrar
                            contentNorm: normalizeText(text) // Texto limpio para buscar
                        });
                    }
                }
                autoIndexSuccess = true;
                if(fullSiteContent.length > 0) console.log("Modo Servidor: Archivos leídos automáticamente.");
            }
        } catch (e) {
            console.log("Modo Local/Offline: Usando datos manuales.");
        }

        // Fallback a datos manuales si no hay servidor
        if (!autoIndexSuccess || fullSiteContent.length === 0) {
            fullSiteContent = manualData.map(item => ({
                url: item.url,
                title: item.title,
                contentRaw: item.content,
                contentNorm: normalizeText(item.content)
            }));
        }
    }

    indexSite();

    // Función mejorada para obtener el fragmento de texto alrededor de la coincidencia
    function getSnippet(text, foundIndex) {
        if (foundIndex === -1) return text.substring(0, 150) + "...";
        
        // Tomamos 50 caracteres antes y 150 después de la palabra encontrada
        const start = Math.max(0, foundIndex - 50);
        const end = Math.min(text.length, foundIndex + 150);
        let snippet = text.substring(start, end);

        // Agregamos puntos suspensivos si cortamos texto
        if (start > 0) snippet = "..." + snippet;
        if (end < text.length) snippet = snippet + "...";
        
        return snippet;
    }

    function renderResults(results, originalQuery) {
        // Limpiamos contenido actual
        mainContent.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const container = document.createElement('section');
        container.style.padding = '40px 5%';
        container.style.maxWidth = '1200px';
        container.style.margin = '0 auto';
        container.style.minHeight = '60vh';

        let html = `
            <div style="margin-bottom: 30px; border-bottom: 2px solid var(--puebla-guinda, #9D2449); padding-bottom: 15px;">
                <h2 style="color: var(--puebla-oscuro, #333);">Resultados de búsqueda</h2>
                <p>Resultados para: "<strong>${originalQuery}</strong>"</p>
            </div>
        `;

        if (results.length === 0) {
            html += `
                <div style="text-align: center; padding: 60px 20px;">
                    <span style="font-size: 40px;">🔍</span>
                    <h3>No se encontraron resultados</h3>
                    <p style="color: #666;">Intenta con otras palabras clave.</p>
                    <button onclick="window.location.reload()" style="background: var(--puebla-guinda, #9D2449); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">Regresar</button>
                </div>
            `;
        } else {
            html += '<div style="display: grid; gap: 20px;">';
            results.forEach(item => {
                // Usamos el índice de la primera coincidencia para generar el snippet
                const snippet = getSnippet(item.page.contentRaw, item.firstMatchIndex);
                
                // Resaltamos visualmente las palabras buscadas en el snippet (opcional, simple)
                // Nota: Esto es solo visual y básico.
                
                html += `
                    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--puebla-guinda, #9D2449);">
                        <h3 style="margin-top: 0;">
                            <a href="${item.page.url}" style="text-decoration: none; color: var(--puebla-oscuro, #333);">${item.page.title}</a>
                        </h3>
                        <p style="color: #555; font-size: 0.9em; line-height: 1.6;">${snippet}</p>
                        <a href="${item.page.url}" style="color: var(--puebla-guinda, #9D2449); font-weight: bold; font-size: 0.9em; text-decoration: none;">Ir al documento &rarr;</a>
                    </div>
                `;
            });
            html += '</div>';
            html += `<div style="margin-top: 40px; text-align: center;"><button onclick="window.location.reload()" style="background: #eee; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; color: #333;">Limpiar búsqueda</button></div>`;
        }

        container.innerHTML = html;
        mainContent.appendChild(container);
    }

    function performSearch() {
        const queryRaw = searchInput.value.trim();
        // 1. Normalizamos y separamos por espacios para tener "palabras clave"
        const queryTerms = normalizeText(queryRaw).split(" ").filter(word => word.length > 1); // Ignoramos letras sueltas de 1 caracter
        
        if (queryTerms.length === 0) return;

        const results = fullSiteContent.map(page => {
            const pageText = page.contentNorm;
            let found = false;
            let firstMatchIndex = -1;

            // 2. Verificamos si ALGUNA de las palabras está en el texto
            for (let term of queryTerms) {
                const idx = pageText.indexOf(term);
                if (idx !== -1) {
                    found = true;
                    // Guardamos la posición de la primera palabra encontrada para centrar el snippet ahí
                    if (firstMatchIndex === -1 || idx < firstMatchIndex) {
                        firstMatchIndex = idx;
                    }
                }
            }

            if (found) {
                return { page, firstMatchIndex };
            }
            return null;
        }).filter(item => item !== null);

        renderResults(results, queryRaw);
    }

    searchBtn.addEventListener('click', (e) => { e.preventDefault(); performSearch(); });
    searchInput.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') { e.preventDefault(); performSearch(); }
    });
});


// ############################# SECCION QR ################################


// 1. Inyectar automáticamente la librería QRCode si no existe
(function loadQRLibrary() {
    if (typeof QRCode === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
        script.async = true;
        document.head.appendChild(script);
        console.log("Librería QR cargada automáticamente.");
    }
})();

// 2. Inyectar el HTML del Modal QR automáticamente en cualquier página
function ensureQRModalExists() {
    if (!document.getElementById('qrModal')) {
        const modalHTML = `
        <div id="qrModal" class="qr-modal-overlay" onclick="if(event.target === this) toggleQRModal()">
            <div class="qr-card">
                <span class="qr-close" onclick="toggleQRModal()">&times;</span>
                <h3 style="color: var(--puebla-guinda); margin-bottom: 5px;">Compartir Página</h3>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 0;">Escanea para llevarte la información</p>
                <div id="qrcode-generated" style="display:flex; justify-content:center; margin: 20px auto;"></div>
                <div class="qr-actions">
                    <button class="btn-qr-action btn-qr-down" onclick="downloadQR()">📥 Descargar PNG</button>
                    <button class="btn-qr-action btn-qr-share" onclick="shareQR()">📱 Compartir</button>
                    <button class="btn-qr-action btn-qr-copy" onclick="copyQRLink()">🔗 Copiar Link</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

let qrObject = null; // Variable para guardar la instancia del QR

function toggleQRModal() {
    // Aseguramos que el modal exista en el DOM
    ensureQRModalExists();

    const modal = document.getElementById('qrModal');
    const isActive = modal.classList.contains('active');
    
    if (!isActive) {
        modal.classList.add('active');
        
        // Esperamos un poco para asegurar que la librería cargó y el div es visible
        setTimeout(() => {
            const qrDiv = document.getElementById("qrcode-generated");
            
            // Si la librería aún no carga, intentamos de nuevo en 100ms
            if (typeof QRCode === 'undefined') {
                alert("La librería de QR se está cargando, intenta de nuevo en un segundo.");
                return;
            }

            // Limpiamos el div por seguridad (para que no se dupliquen si cambias de página en SPA)
            qrDiv.innerHTML = ""; 

            // Generamos el QR
            new QRCode(qrDiv, {
                text: window.location.href, 
                width: 180,
                height: 180,
                colorDark : "#000000", 
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }, 100);

    } else {
        modal.classList.remove('active');
    }
}

function downloadQR() {
    const img = document.querySelector("#qrcode-generated img");
    if (img) {
        const link = document.createElement("a");
        link.href = img.src;
        // Usamos el título de la página para el nombre del archivo
        link.download = `QR_${document.title.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("El código QR aún no se ha generado completamente.");
    }
}

async function shareQR() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: document.title,
                text: 'Consulta la información territorial en este enlace:',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error al compartir', err);
        }
    } else {
        alert("Tu navegador no soporta compartir directamente. Usa el botón de Copiar Link.");
    }
}

function copyQRLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("¡Enlace copiado al portapapeles!"))
        .catch(err => console.error('Error al copiar', err));
}

    // ########################### SECCION IDIOMA ##############################

  // DICCIONARIO DE TRADUCCIONES
const translations = {
    'es': {
        // Navegación
        'nav-home': 'Inicio',
        'nav-urban': 'Desarrollo Urbano',
        'nav-soil': 'Gestión de suelos',
        'nav-bio': 'Biodiversidad',
        'nav-sig': 'SIG',
        'nav-sub-metro': 'Programa Metropolitano', // Ejemplo de submenú
        'nav-sub-est': 'Programa Estatal',
        'nav-sub-men': 'Municipios',
        // Buscador
        'buscador': 'Buscar...',

        // Títulos comunes (Asegúrate de ponerle estos ID a tus h2/h3 en el HTML)
        'news-title': 'Noticias y comunicados', 
        'map-title': 'Visualizador Cartográfico',
        'contact-title': 'Atención ciudadana'
    },
    'en': {
        // Navigation
        'nav-home': 'Home',
        'nav-urban': 'Urban Development',
        'nav-soil': 'Land Management',
        'nav-bio': 'Biodiversity',
        'nav-sig': 'GIS',
        'nav-sub-metro': 'Metropolitan Program',
        'nav-sub-est': 'State Program',
        'nav-sub-men': 'Municipalities',
        // Search
        'buscador': 'Search...',

        // Headings
        'news-title': 'News and Updates',
        'map-title': 'Cartographic Viewer',
        'contact-title': 'Citizen Support'
    }
};

let currentLang = 'es'; 

// 1. Detectar idioma al cargar
document.addEventListener("DOMContentLoaded", () => {
    // Intentar recuperar el idioma guardado anteriormente (opcional, pero recomendado)
    const savedLang = localStorage.getItem('sitep-lang');
    
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('en')) {
            setLanguage('en');
        } else {
            setLanguage('es');
        }
    }
});

// 2. Función del botón (Toggle)
function toggleLanguage() {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
}

// 3. Función que aplica los cambios
function setLanguage(lang) {
    currentLang = lang;
    
    // Guardar preferencia en el navegador
    localStorage.setItem('sitep-lang', lang);

    // Cambiar texto del botón pequeño (ES/EN)
    const langTextBtn = document.getElementById('lang-text');
    if (langTextBtn) {
        langTextBtn.textContent = lang.toUpperCase();
    }

    // Obtener el diccionario del idioma seleccionado
    const texts = translations[lang];

    // Recorrer cada clave del diccionario (que corresponde a un ID en el HTML)
    for (const [id, translation] of Object.entries(texts)) {
        const element = document.getElementById(id);
        
        if (element) {
            // Si es un input (como el buscador), cambiamos el placeholder
            if (element.tagName === 'INPUT') {
                element.placeholder = translation;
            } else {
                // Si es texto normal
                element.textContent = translation;
            }
        }
    }
}

// ########################### SECCION CHATBOX ############################

    // 1. DICCIONARIO DE PALABRAS CLAVE (El "Cerebro" de búsqueda)
    // Asocia palabras que el usuario podría escribir con las claves del chatFlow
    const keywordMap = {
        "mapa": "mapas",
        "cartografia": "mapas",
        "visor": "mapas",
        "donde": "contacto",
        "ubicacion": "contacto",
        "direccion": "contacto",
        "horario": "contacto",
        "tramite": "tramites",
        "requisito": "req_subida",
        "subir": "req_subida",
        "costo": "costos",
        "precio": "costos",
        "pagar": "costos",
        "descarga": "descargas",
        "ley": "descargas",
        "reglamento": "descargas",
        "pdf": "descargas",
        "predio": "predio",
        "catastro": "predio",
        "hola": "inicio",
        "inicio": "inicio"
    };

    // 2. FLUJO DE CONVERSACIÓN (Árbol de decisiones)
    const chatFlow = {
        "inicio": {
            msg: "¡Hola! Soy el asistente virtual del SITEP. 👋 <br>Puedes elegir una opción o escribir tu duda (ej: 'horarios', 'mapas').",
            options: [
                { text: "🗺️ Mapas", next: "mapas" },
                { text: "📂 Trámites", next: "tramites" },
                { text: "📞 Contacto", next: "contacto" },
                { text: "📥 Descargas", next: "descargas" }
            ]
        },
        "mapas": {
            msg: "El Visualizador Cartográfico muestra zonas de riesgo, uso de suelo y límites.",
            options: [
                { text: "¿Cómo consulto mi predio?", next: "predio" },
                { text: "Ir al mapa ahora", action: "scrollToMap" },
                { text: "⬅️ Volver", next: "inicio" }
            ]
        },
        "predio": {
            msg: "Para consultar tu predio: Ve al mapa, activa 'Búsqueda Catastral' e ingresa tu clave.",
            options: [
                { text: "Ir al mapa", action: "scrollToMap" },
                { text: "⬅️ Volver", next: "mapas" }
            ]
        },
        "tramites": {
            msg: "Información sobre gestión de suelo y desarrollo urbano.",
            options: [
                { text: "Requisitos para subir info", next: "req_subida" },
                { text: "Costos", next: "costos" },
                { text: "⬅️ Volver", next: "inicio" }
            ]
        },
        "req_subida": {
            msg: "Requisitos: Archivos PDF/Excel, máx 10MB y validación oficial.",
            options: [ { text: "⬅️ Volver", next: "tramites" } ]
        },
        "costos": {
            msg: "El visualizador es gratuito. Los dictámenes certificados tienen costo según Ley de Ingresos.",
            options: [ { text: "⬅️ Volver", next: "tramites" } ]
        },
        "contacto": {
            msg: "Estamos en Calle Lateral Recta Cholula Km 5.5. <br>Lunes a Viernes 9:00 - 18:00 hrs.",
            options: [
                { text: "Ver en mapa", action: "scrollToContact" },
                { text: "⬅️ Volver", next: "inicio" }
            ]
        },
        "descargas": {
            msg: "Descarga la Ley de Ordenamiento y Reglamentos abajo.",
            options: [
                { text: "Ir a descargas", action: "scrollToDownloads" },
                { text: "⬅️ Volver", next: "inicio" }
            ]
        },
        // Mensaje por defecto cuando no entiende
        "no_entendi": {
            msg: "Disculpa, no entendí tu pregunta. 🤖 <br>Intenta escribir palabras clave como 'mapa', 'costo', 'horario' o usa los botones.",
            options: [
                { text: "Ir al Inicio", next: "inicio" }
            ]
        }
    };

    // --- FUNCIONES DEL SISTEMA ---

    function toggleChat() {
        const modal = document.getElementById('chatModal');
        modal.classList.toggle('active');
        const chatBody = document.getElementById('chatBody');
        if (modal.classList.contains('active') && chatBody.children.length === 0) {
            renderNode("inicio");
        }
    }

    // Renderiza la respuesta del bot y sus botones
    function renderNode(nodeId) {
        const node = chatFlow[nodeId] || chatFlow["inicio"];
        
        // Efecto de "Escribiendo..."
        const optionsDiv = document.getElementById('chatOptions');
        optionsDiv.innerHTML = '<span style="color:#888; font-size:12px;">Escribiendo...</span>';

        setTimeout(() => {
            addMessage(node.msg, 'bot-msg');
            renderOptions(node.options);
        }, 500);
    }

    function renderOptions(options) {
        const optionsContainer = document.getElementById('chatOptions');
        optionsContainer.innerHTML = ""; 

        if (!options) return;

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chip-btn';
            btn.innerHTML = opt.text;
            btn.onclick = () => {
                addMessage(opt.text, 'user-msg');
                if (opt.action) handleAction(opt.action);
                if (opt.next) renderNode(opt.next);
                else optionsContainer.innerHTML = ""; 
            };
            optionsContainer.appendChild(btn);
        });
    }

    // Procesa lo que el usuario escribe
    function handleUserText() {
        const input = document.getElementById('userInput');
        const text = input.value.trim().toLowerCase();
        
        if (text === "") return;

        // 1. Mostrar mensaje del usuario
        addMessage(input.value, 'user-msg');
        input.value = ""; // Limpiar input

        // 2. Buscar palabras clave (Lógica simple de coincidencia)
        let foundKey = null;
        
        // Recorremos el mapa de palabras clave
        for (const [key, targetNode] of Object.entries(keywordMap)) {
            // Normalizamos para evitar errores con acentos simples
            if (text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(key)) {
                foundKey = targetNode;
                break; // Si encuentra una coincidencia, se detiene
            }
        }

        // 3. Responder
        if (foundKey) {
            renderNode(foundKey);
        } else {
            renderNode("no_entendi");
        }
    }

    // Permite enviar con la tecla Enter
    function checkEnter(event) {
        if (event.key === "Enter") {
            handleUserText();
        }
    }

    function addMessage(htmlText, type) {
        const chatBody = document.getElementById('chatBody');
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerHTML = htmlText;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleAction(actionName) {
        const modal = document.getElementById('chatModal');
        if (actionName === 'scrollToMap') {
            modal.classList.remove('active');
            document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
        } else if (actionName === 'scrollToContact') {
            modal.classList.remove('active');
            document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
        } else if (actionName === 'scrollToDownloads') {
            modal.classList.remove('active');
            document.querySelector('.downloads-section').scrollIntoView({ behavior: 'smooth' });
        }
    }
