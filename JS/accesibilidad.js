//variables globales
let currentZoom = 16;
let ttsActive = false;

//funciones de utilidad

//abre y cierra el primer panel
function toggleAccesibility() {
    const panel = document.getElementById("accesibilityPanel");
    if (panel) panel.classList.toggle("active");
}

function changeFontSize(action) {
    const MAX_FONT = 30;
    const MIN_FONT = 12;

    if (action === 'increase' && currentZoom < MAX_FONT) {
        currentZoom += 2;
    } else if (action === 'decrease' && currentZoom > MIN_FONT) {
        currentZoom -= 2;
    } else if (action === 'reset') {
        currentZoom = 16;
    }

    // Esto cambia el tamaño base de TODO el documento
    document.documentElement.style.fontSize = currentZoom + 'px';
    
    // Opcional: actualizar la variable CSS si la usas en otros lados
    document.documentElement.style.setProperty('--base-font-size', currentZoom + 'px');
}

//Texto a voz
function handleElementSpeech(e) {
    if (!ttsActive) return;
    
    // Evitamos que el clic active enlaces o botones normales
    e.preventDefault();
    e.stopPropagation();

    const text = e.currentTarget.innerText;
    if (!text) return;

    // Configurar la voz
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    
    // Cancelar cualquier lectura en curso y hablar
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

//activa o desactiva el modo seleccion de lectura
function toggleTTSMode() {
    const btn = document.getElementById('btn-tts');
    ttsActive = !ttsActive;
    
    // Seleccionamos elementos que contienen texto legible
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a, label, button');

    if (ttsActive) {
        if (btn) btn.classList.add('selected');
        
        textElements.forEach(el => {
            el.classList.add('tts-highlight-mode');
            el.addEventListener('click', handleElementSpeech);
        });
        console.log("Modo lectura activado");
    } else {
        if (btn) btn.classList.remove('selected');
        window.speechSynthesis.cancel();
        
        textElements.forEach(el => {
            el.classList.remove('tts-highlight-mode');
            el.removeEventListener('click', handleElementSpeech);
        });
        console.log("Modo lectura desactivado");
    }
}

//Botones

function setupButtons() {
    // Crear la línea de guía de lectura si no existe
    let guide = document.getElementById('reading-guide-line');
    if (!guide) {
        guide = document.createElement('div');
        guide.id = 'reading-guide-line';
        document.body.appendChild(guide);
    }

    const btns = {
        tts: document.getElementById('btn-tts'),
        invert: document.getElementById('btn-invert'),
        gray: document.getElementById('btn-gray'),
        cursor: document.getElementById('btn-cursor'),
        links: document.getElementById('btn-links'),
        guide: document.getElementById('btn-guide')
    };

    // Cursor Grande
    if (btns.cursor) {
        btns.cursor.onclick = () => {
            const active = document.body.classList.toggle('large-cursor');
            btns.cursor.classList.toggle('selected', active);
        };
    }

    // Filtros de Color 
    if (btns.invert) {
        btns.invert.onclick = () => {
            const active = document.documentElement.classList.toggle('invert-filter');
            document.documentElement.classList.remove('grayscale-filter');
            btns.invert.classList.toggle('selected', active);
            if (btns.gray) btns.gray.classList.remove('selected');
        };
    }

    if (btns.gray) {
        btns.gray.onclick = () => {
            const active = document.documentElement.classList.toggle('grayscale-filter');
            document.documentElement.classList.remove('invert-filter');
            btns.gray.classList.toggle('selected', active);
            if (btns.invert) btns.invert.classList.remove('selected');
        };
    }

    //Subrayar Enlaces
    if (btns.links) {
        btns.links.onclick = () => {
            const active = document.body.classList.toggle('underline-links');
            btns.links.classList.toggle('selected', active);
        };
    }

    // Guía de Lectura
    if (btns.guide) {
        btns.guide.onclick = () => {
            const active = btns.guide.classList.toggle('selected');
            if (active) {
                guide.style.display = 'block';
                window.onmousemove = (e) => { 
                    guide.style.top = e.clientY + 'px'; 
                };
            } else {
                guide.style.display = 'none';
                window.onmousemove = null;
            }
        };
    }

    // Texto a Voz (Interactivo) 
    if (btns.tts) {
        btns.tts.onclick = toggleTTSMode;
    }
}

//Funcion de reinicio
function resetAccessibility() {

    // 1. Quitar clases visuales
    document.documentElement.classList.remove('invert-filter', 'grayscale-filter');
    document.body.classList.remove('large-cursor', 'underline-links');
    
currentZoom = 16;
    document.documentElement.style.fontSize = '16px';
    document.documentElement.style.setProperty('--base-font-size', '16px');    

    // 3. Resetear guía de lectura
    const guide = document.getElementById('reading-guide-line');
    if (guide) guide.style.display = 'none';
    window.onmousemove = null;

    // 4. Apagar modo TTS si está activo
    if (ttsActive) {
        toggleTTSMode();
    }

    // 5. Limpiar estado de todos los botones
    document.querySelectorAll('.acc-btn').forEach(b => b.classList.remove('selected'));
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", setupButtons);