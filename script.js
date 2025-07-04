// PLAN DE ESTUDIOS //
const planEstudios = [
    // 1° Año
    { id: 'IF001', nombre: 'Elementos de Informática', anio: 1, correlativas: [] },
    { id: 'MA045', nombre: 'Álgebra', anio: 1, correlativas: [] },
    { id: 'IF002', nombre: 'Expresión de Problemas y Algoritmos', anio: 1, correlativas: [] },
    { id: 'IF003', nombre: 'Algorítmica y Programación I', anio: 1, correlativas: ['IF002'] },
    { id: 'MA046', nombre: 'Análisis Matemático', anio: 1, correlativas: [] },
    { id: 'MA008', nombre: 'Elementos de Lógica y Matemática Discreta', anio: 1, correlativas: [] },

    // 2° Año
    { id: 'IF004', nombre: 'Sistemas y Organizaciones', anio: 2, correlativas: [] },
    { id: 'IF005', nombre: 'Arquitectura de Computadoras', anio: 2, correlativas: ['IF001'] },
    { id: 'IF006', nombre: 'Algorítmica y Programación II', anio: 2, correlativas: ['IF003', 'MA008'] },
    { id: 'IF007', nombre: 'Bases de Datos I', anio: 2, correlativas: ['IF006'] },
    { id: 'MA006', nombre: 'Estadística', anio: 2, correlativas: ['MA045', 'MA046'] },
    { id: 'IF008', nombre: 'Programación Orientada a Objetos', anio: 2, correlativas: ['IF006'] },

    // 3° Año
    { id: 'IF009', nombre: 'Laboratorio de Programación y Lenguajes', anio: 3, correlativas: ['IF008'] },
    { id: 'IF010', nombre: 'Análisis y Diseño de Sistemas', anio: 3, correlativas: ['IF004', 'IF007'] },
    { id: 'IF011', nombre: 'Sistemas Operativos', anio: 3, correlativas: ['IF005', 'IF006'] },
    { id: 'IF012', nombre: 'Desarrollo de Software', anio: 3, correlativas: ['IF008', 'IF010'] },
    { id: 'IF013', nombre: 'Fundamentos Teóricos de Informática', anio: 3, correlativas: ['IF006', 'MA008'] },
    { id: 'MA047', nombre: 'Complementos Matemáticos', anio: 3, correlativas: ['MA045', 'MA046'] },

    // 4° Año
    { id: 'IF015', nombre: 'Ingeniería de Software', anio: 4, correlativas: ['IF012', 'MA006'] },
    { id: 'IF018', nombre: 'Inteligencia Artificial', anio: 4, correlativas: ['IF013', 'MA047'] },
    { id: 'IF019', nombre: 'Redes y Transmisión de Datos', anio: 4, correlativas: ['IF011'] },
    { id: 'IF016', nombre: 'Aspectos Legales y Profesionales', anio: 4, correlativas: [], notas: 'Requiere 15 asignaturas aprobadas' },
    { id: 'IF020', nombre: 'Paradigmas y Lenguajes de Programación', anio: 4, correlativas: ['IF009', 'IF013'] },
    { id: 'IF022', nombre: 'Sistemas Distribuidos', anio: 4, correlativas: ['IF019'] },

    // 5° Año
    // Optativa I
    { id: 'IF014', nombre: 'Base de Datos II', anio: 5, correlativas: ['IF010'], tipo: 'Optativa I' },
    { id: 'IF024', nombre: 'Informática Industrial', anio: 5, correlativas: ['IF015', 'IF019'], tipo: 'Optativa I' },
    { id: 'IF027', nombre: 'Modelos y Simulación', anio: 5, correlativas: ['IF020'], tipo: 'Optativa I' },

    // Asignaturas principales de 5°
    { id: 'IF021', nombre: 'Arquitectura de Redes y Servicios', anio: 5, correlativas: ['IF019'] },
    { id: 'IF017', nombre: 'Taller de Nuevas Tecnologías', anio: 5, correlativas: ['IF015', 'IF019'] },

    // Optativa II
    { id: 'IF023', nombre: 'Diseño de Aplicaciones Web', anio: 5, correlativas: ['IF009', 'IF015', 'IF019'], tipo: 'Optativa II' },
    { id: 'IF034', nombre: 'Sistemas Paralelos-LI', anio: 5, correlativas: ['IF018'], tipo: 'Optativa II' },
    { id: 'IF053', nombre: 'Planificación y Gestión de Sistemas de Información', anio: 5, correlativas: ['IF015'], tipo: 'Optativa II' },
    { id: 'IF028', nombre: 'Monitorización y Visualización', anio: 5, correlativas: ['IF024'], tipo: 'Optativa II' },

    { id: 'IF025', nombre: 'Sistemas Embebidos y de Tiempo Real', anio: 5, correlativas: ['IF015', 'IF022'] },

    // Otros Requisitos para el Título de Grado
    { id: 'FA007', nombre: 'Acreditación de Idioma (Nivel B2)', anio: 'Grado', correlativas: [], notas: 'Debe aprobarse antes de comenzar 2° año' },
    { id: 'IF026', nombre: 'TESINA', anio: 'Grado', correlativas: ['IF021'], notas: 'Presentar proyecto: 4° año cursado; Defender: 4° año aprobado y 1° cuatrimestre 5° año cursado' },
    { id: 'FA102', nombre: 'Estrategias Comunicacionales (Curso)', anio: 'Grado', correlativas: [], notas: '10 asignaturas aprobadas; Debe aprobarse antes de cursar 5° año' },
    { id: 'FA103', nombre: 'Relaciones Humanas (Curso)', anio: 'Grado', correlativas: [], notas: '10 asignaturas aprobadas; Debe aprobarse antes de cursar 5° año' },
];


// ESTADO INICIAL DEL USUARIO //
let estadoUsuario = {
    materiasAprobadas: [],
    materiasCursando: [],
    progresoParciales: {},
    horarioAcademico: '',
    tareasPendientes: [],
    recursosAdicionales: {},
};


function saveState() {
    localStorage.setItem('estadoUsuarioCarrera', JSON.stringify(estadoUsuario));
    console.log('Estado guardado:', estadoUsuario);
}


function loadState() {
    const savedState = localStorage.getItem('estadoUsuarioCarrera');
    if (savedState) {
        estadoUsuario = JSON.parse(savedState);

        for (const materiaId in estadoUsuario.progresoParciales) {
            if (estadoUsuario.progresoParciales[materiaId] && !estadoUsuario.progresoParciales[materiaId].parciales) {
                const oldData = estadoUsuario.progresoParciales[materiaId];
                const newParcialesArray = [];
                for (let i = 0; i < oldData.total; i++) {
                    newParcialesArray.push({
                        aprobado: i < oldData.aprobados,
                        fecha: ''
                    });
                }
                estadoUsuario.progresoParciales[materiaId] = {
                    total: oldData.total,
                    parciales: newParcialesArray
                };
            }
        }
        console.log('Estado cargado:', estadoUsuario);
    } else {
        console.log('No hay estado guardado. Inicializando estado por defecto.');
    }
}

/**
 * Muestra una sección de la aplicación y oculta las demás.
 * @param {string} sectionId - El ID de la sección a mostrar.
 */
function showSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.querySelector(`.nav-button[data-section="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }



    if (sectionId === 'dashboard') {
        renderizarDashboard();
    } else if (sectionId === 'mapa-carrera') {
        renderizarMapa();
    } else if (sectionId === 'materias-cursando') {
        renderizarMisMateriasActuales();
    } else if (sectionId === 'horario-academico') {
        renderizarHorario();
    } else if (sectionId === 'tareas-pendientes') {
        renderizarTareas();
    }
}

/**
 * Encuentra una materia por su ID.
 * @param {string} id - El ID de la materia.
 * @returns {object|undefined} La materia encontrada o undefined.
 */
function getMateriaById(id) {
    return planEstudios.find(m => m.id === id);
}



/**
 * Evalúa el estado de una materia.
 * @param {string} idMateria - El ID de la materia.
 * @returns {string} 'aprobada', 'cursando', 'desbloqueada', 'bloqueada'.
 */
function evaluarEstadoMateria(idMateria) {
    if (estadoUsuario.materiasAprobadas.includes(idMateria)) {
        return 'aprobada';
    }
    if (estadoUsuario.materiasCursando.includes(idMateria)) {
        return 'cursando';
    }

    const materia = getMateriaById(idMateria);
    if (!materia) return 'bloqueada'; // Materia no encontrada

    // Lógica especial para IF021 (Proyecto Final de Carrera)
    if (materia.id === 'IF021') {
        const materiasTroncalesAprobadas = planEstudios.filter(m =>
            m.anio !== 'Grado' && m.anio !== 5 && estadoUsuario.materiasAprobadas.includes(m.id)
        ).length;

        const minMateriasParaProyecto = 20;
        const correlativasCumplidas = materia.correlativas.every(corrId =>
            estadoUsuario.materiasAprobadas.includes(corrId)
        );

        if (correlativasCumplidas && materiasTroncalesAprobadas >= minMateriasParaProyecto) {
            return 'desbloqueada';
        } else {
            return 'bloqueada';
        }
    }

    if (materia.id === 'FA102' || materia.id === 'FA103') {
        const minAprobadasParaCurso = 10; // Definir el número mínimo de materias aprobadas
        if (estadoUsuario.materiasAprobadas.length >= minAprobadasParaCurso) {
            return 'desbloqueada';
        } else {
            return 'bloqueada';
        }
    }


    const todasCorrelativasAprobadas = materia.correlativas.every(corrId =>
        estadoUsuario.materiasAprobadas.includes(corrId)
    );

    if (todasCorrelativasAprobadas) {
        return 'desbloqueada';
    } else {
        return 'bloqueada';
    }
}

/**
 * Renderiza el dashboard con el progreso general, materias cursando y próximos parciales.
 */
function renderizarDashboard() {
    const totalMaterias = planEstudios.filter(m => m.anio !== 'Grado').length;
    const aprobadasCount = estadoUsuario.materiasAprobadas.length;
    const progressPercentage = totalMaterias > 0 ? ((aprobadasCount / totalMaterias) * 100).toFixed(1) : 0;

    const progressBar = document.getElementById('overall-progress-bar');
    const progressText = document.getElementById('overall-progress-text');
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}% de la carrera completada`;

    renderizarMateriasCursandoDashboard();
    renderizarProximosParcialesDashboard();
    // No hay mensaje motivacional, ya fue eliminado.
}

/**
 * Renderiza la lista de materias que el usuario está cursando en el dashboard.
 */
function renderizarMateriasCursandoDashboard() {
    const currentDashboardSubjectsList = document.getElementById('current-dashboard-subjects-list');
    currentDashboardSubjectsList.innerHTML = '';

    if (estadoUsuario.materiasCursando.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No estás cursando ninguna materia actualmente.';
        currentDashboardSubjectsList.appendChild(li);
    } else {
        estadoUsuario.materiasCursando.forEach(materiaId => {
            const materia = getMateriaById(materiaId);
            if (materia) {
                const li = document.createElement('li');
                li.textContent = `${materia.nombre} (${materia.anio}° Año)`;
                currentDashboardSubjectsList.appendChild(li);
            }
        });
    }
}

/**
 * Renderiza la lista de próximos parciales en el dashboard.
 */
function renderizarProximosParcialesDashboard() {
    const upcomingPartialsList = document.getElementById('upcoming-partials-list');
    upcomingPartialsList.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Para comparar solo fechas

    let allUpcomingPartials = [];

    // Recorrer todas las materias cursando para encontrar parciales
    estadoUsuario.materiasCursando.forEach(materiaId => {
        const materia = getMateriaById(materiaId);
        if (materia && estadoUsuario.progresoParciales[materiaId]?.parciales) {
            estadoUsuario.progresoParciales[materiaId].parciales.forEach((parcial, index) => {
                // Solo agregar parciales no aprobados y con fecha válida
                if (!parcial.aprobado && parcial.fecha) {
                    const partialDate = new Date(parcial.fecha + 'T00:00:00'); // Asegurarse de que la fecha sea en UTC medianoche
                    partialDate.setHours(0, 0, 0, 0);

                    // Incluir parciales de hoy o en el futuro
                    if (partialDate >= today) {
                        allUpcomingPartials.push({
                            materiaNombre: materia.nombre,
                            parcialNumero: index + 1,
                            fecha: partialDate,
                            originalDateString: parcial.fecha // Para mostrar
                        });
                    }
                }
            });
        }
    });

    // Ordenar los parciales por fecha más cercana
    allUpcomingPartials.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

    if (allUpcomingPartials.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No hay parciales próximos registrados.';
        upcomingPartialsList.appendChild(li);
    } else {
        allUpcomingPartials.forEach(p => {
            const li = document.createElement('li');
            let className = '';
            // Calcular la diferencia en días
            const diffTime = p.fecha.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                className = 'partial-today';
            } else if (diffDays > 0 && diffDays <= 7) {
                className = 'partial-soon';
            } else {
                className = 'partial-future';
            }

            li.classList.add(className);
            li.innerHTML = `
                <div class="partial-info">
                    <strong>${p.materiaNombre}</strong> - Parcial ${p.parcialNumero}
                </div>
                <div class="partial-date">
                    ${p.originalDateString}
                </div>
            `;
            upcomingPartialsList.appendChild(li);
        });
    }
}

/**
 * Renderiza el mapa de carrera con los nodos de materias.
 * @param {string} filterYear - Año para filtrar ('all' o un número/string 'Grado').
 */
function renderizarMapa(filterYear = document.getElementById('filter-year')?.value || 'all') {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';

    const materiasFiltradas = planEstudios.filter(materia => {
        if (filterYear === 'all') return true;
        return materia.anio.toString() === filterYear;
    }).sort((a, b) => {
        if (a.anio === 'Grado' && b.anio !== 'Grado') return 1;
        if (b.anio === 'Grado' && a.anio !== 'Grado') return -1;
        if (a.anio !== b.anio) return a.anio - b.anio;
        return a.nombre.localeCompare(b.nombre);
    });

    materiasFiltradas.forEach(materia => {
        const materiaNode = document.createElement('div');
        materiaNode.classList.add('materia-node');
        materiaNode.dataset.id = materia.id;

        const estado = evaluarEstadoMateria(materia.id);
        materiaNode.classList.add(`materia-${estado}`);

        let iconClass = '';
        if (estado === 'aprobada') {
            iconClass = 'fa-solid fa-check-circle';
        } else if (estado === 'cursando') {
            iconClass = 'fa-solid fa-hourglass-half';
        } else if (estado === 'desbloqueada') {
            iconClass = 'fa-solid fa-unlock';
        } else if (estado === 'bloqueada') {
            iconClass = 'fa-solid fa-lock';
        }

        materiaNode.innerHTML = `
            <span class="status-icon"><i class="${iconClass}"></i></span>
            <h4>${materia.nombre}</h4>
            <p>${materia.id} (${materia.anio}° Año)</p>
        `;

        materiaNode.addEventListener('click', () => openDetalleMateriaModal(materia.id));

        if (estado === 'bloqueada') {
            materiaNode.title = 'Materia bloqueada. Completa sus correlativas.';
        }

        mapContainer.appendChild(materiaNode);
    });
}

/**
 * Renderiza la lista de materias que el usuario está cursando.
 */
function renderizarMisMateriasActuales() {
    const currentSubjectsList = document.getElementById('current-subjects-list');
    currentSubjectsList.innerHTML = ''; // Limpiar la lista

    const addCursandoSelect = document.getElementById('add-cursando-select');
    addCursandoSelect.innerHTML = '<option value="">Selecciona una materia para cursar</option>';

    // Llenar el select con materias no aprobadas y no cursando
    const availableForCursando = planEstudios.filter(materia =>
        !estadoUsuario.materiasAprobadas.includes(materia.id) &&
        !estadoUsuario.materiasCursando.includes(materia.id)
    ).sort((a, b) => a.nombre.localeCompare(b.nombre));

    availableForCursando.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.id;
        option.textContent = `${materia.nombre} (${materia.anio}° Año)`;
        addCursandoSelect.appendChild(option);
    });

    if (estadoUsuario.materiasCursando.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No estás cursando ninguna materia actualmente.';
        currentSubjectsList.appendChild(li);
        return;
    }

    estadoUsuario.materiasCursando.forEach(materiaId => {
        const materia = getMateriaById(materiaId);
        if (!materia) return;

        const li = document.createElement('li');
        // Asegúrate de que parcialesData tenga la estructura correcta para el cálculo
        const parcialesData = estadoUsuario.progresoParciales[materiaId] || { total: 0, parciales: [] };
        const aprobadosCount = parcialesData.parciales.filter(p => p.aprobado).length;
        const totalParciales = parcialesData.parciales.length;

        const parcialesText = `Parciales: ${aprobadosCount}/${totalParciales}`;
        const parcialesPercentage = totalParciales > 0 ? ((aprobadosCount / totalParciales) * 100).toFixed(0) : 0;

        li.innerHTML = `
            <div class="subject-info">
                <h4>${materia.nombre}</h4>
                <p>${materia.id} (${materia.anio}° Año)</p>
                <div class="progress-bar-container small" style="width: 150px; margin-top: 5px;">
                    <div class="progress-bar-fill" style="width: ${parcialesPercentage}%; background-color: ${parcialesPercentage === 100 ? 'var(--primary-color)' : 'var(--secondary-color)'};"></div>
                    <span class="progress-text" style="color: ${parcialesPercentage === 100 ? 'white' : 'var(--text-color)'};">${parcialesText}</span>
                </div>
            </div>
            <div class="actions">
                <button class="button-primary mark-approved-btn" data-id="${materia.id}">Marcar como Aprobada</button>
                <button class="button-secondary edit-subject-btn" data-id="${materia.id}">Editar</button>
                <button class="button-danger remove-cursando-btn" data-id="${materia.id}">Quitar</button>
            </div>
        `;
        currentSubjectsList.appendChild(li);
    });

    // Añadir event listeners a los botones de "Marcar como Aprobada" y "Quitar"
    document.querySelectorAll('.mark-approved-btn').forEach(button => {
        button.onclick = (event) => {
            const id = event.target.dataset.id;
            markMateriaAsApproved(id);
        };
    });

    document.querySelectorAll('.edit-subject-btn').forEach(button => {
        button.onclick = (event) => {
            const id = event.target.dataset.id;
            openDetalleMateriaModal(id);
        };
    });

    document.querySelectorAll('.remove-cursando-btn').forEach(button => {
        button.onclick = (event) => {
            const id = event.target.dataset.id;
            removeMateriaFromCursando(id);
        };
    });
}

/**
 * Abre y rellena el modal de detalle de materia.
 * Se actualiza para manejar las fechas de parciales.
 * @param {string} idMateria - El ID de la materia a mostrar.
 */
function openDetalleMateriaModal(idMateria) {
    const materia = getMateriaById(idMateria);
    if (!materia) return;

    document.getElementById('modal-materia-nombre').textContent = materia.nombre;
    document.getElementById('modal-materia-id').textContent = materia.id;
    document.getElementById('modal-materia-anio').textContent = materia.anio;

    // Correlativas Anteriores
    const correlativasAnterioresList = document.getElementById('modal-correlativas-anteriores');
    correlativasAnterioresList.innerHTML = '';
    if (materia.correlativas && materia.correlativas.length > 0) {
        materia.correlativas.forEach(corrId => {
            const corrMateria = getMateriaById(corrId);
            if (corrMateria) {
                const li = document.createElement('li');
                li.textContent = `${corrMateria.nombre} (${corrMateria.id})`;
                li.classList.add(estadoUsuario.materiasAprobadas.includes(corrId) ? 'materia-aprobada' : 'materia-bloqueada');
                correlativasAnterioresList.appendChild(li);
            }
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Ninguna correlativa anterior.';
        correlativasAnterioresList.appendChild(li);
    }

    // Correlativas Posteriores (materias que tienen esta como correlativa)
    const correlativasPosterioresList = document.getElementById('modal-correlativas-posteriores');
    correlativasPosterioresList.innerHTML = '';
    const posteriores = planEstudios.filter(m => m.correlativas.includes(materia.id));
    if (posteriores.length > 0) {
        posteriores.forEach(postMateria => {
            const li = document.createElement('li');
            li.textContent = `${postMateria.nombre} (${postMateria.id})`;
            li.classList.add(`materia-${evaluarEstadoMateria(postMateria.id)}`);
            correlativasPosterioresList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Ninguna materia posterior depende directamente de esta.';
        correlativasPosterioresList.appendChild(li);
    }

    // Sección de Parciales (MODIFICADO para incluir fechas)
    // Inicializar la estructura si no existe
    if (!estadoUsuario.progresoParciales[idMateria]) {
        estadoUsuario.progresoParciales[idMateria] = { total: 0, parciales: [] };
    }
    let parcialesData = estadoUsuario.progresoParciales[idMateria];

    document.getElementById('total-partials').value = parcialesData.total;
    const partialsInputsContainer = document.getElementById('partials-inputs');
    partialsInputsContainer.innerHTML = '';

    function updateParcialesInputs() {
        partialsInputsContainer.innerHTML = '';
        const currentTotal = parseInt(document.getElementById('total-partials').value);

        // Ajustar el array de parciales si el total cambió
        while (parcialesData.parciales.length < currentTotal) {
            parcialesData.parciales.push({ aprobado: false, fecha: '' });
        }
        parcialesData.parciales = parcialesData.parciales.slice(0, currentTotal);
        parcialesData.total = currentTotal; // Asegurar que el total esté sincronizado

        parcialesData.parciales.forEach((parcial, index) => {
            const partialItemDiv = document.createElement('div');
            partialItemDiv.classList.add('partial-item');
            const checkboxId = `partial-${idMateria}-${index + 1}`;

            partialItemDiv.innerHTML = `
                <input type="checkbox" id="${checkboxId}" data-index="${index}" ${parcial.aprobado ? 'checked' : ''}>
                <label for="${checkboxId}">Parcial ${index + 1}:</label>
                <input type="date" class="partial-date-input" data-index="${index}" value="${parcial.fecha || ''}">
            `;
            partialsInputsContainer.appendChild(partialItemDiv);
        });
        updateParcialesProgressBar(idMateria);
    }

    document.getElementById('total-partials').onchange = updateParcialesInputs;

    partialsInputsContainer.onchange = (event) => {
        const target = event.target;
        const index = parseInt(target.dataset.index);

        if (target.type === 'checkbox') {
            parcialesData.parciales[index].aprobado = target.checked;
        } else if (target.type === 'date' && target.classList.contains('partial-date-input')) {
            parcialesData.parciales[index].fecha = target.value;
        }

        saveState();
        updateParcialesProgressBar(idMateria);
        renderizarMisMateriasActuales(); // Para actualizar la lista de cursando
        renderizarProximosParcialesDashboard(); // Para actualizar los parciales del dashboard
    };
    updateParcialesInputs(); // Llama inicialmente para renderizar

    document.getElementById('save-partials-btn').onclick = () => {
        saveState();
        renderizarMisMateriasActuales();
        renderizarProximosParcialesDashboard();
        showNotification('Progreso de parciales guardado.', 'success');
    };


    // Sección de Recursos Adicionales (sin cambios)
    const recursosList = document.getElementById('modal-recursos-list');
    recursosList.innerHTML = '';
    const recursosMateria = estadoUsuario.recursosAdicionales[idMateria] || [];
    if (recursosMateria.length > 0) {
        recursosMateria.forEach((recurso, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${recurso.url}" target="_blank">${recurso.titulo}</a>
                <div class="actions">
                    <button class="button-danger remove-resource-btn" data-index="${index}" data-materia-id="${idMateria}">Eliminar</button>
                </div>
            `;
            recursosList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No hay recursos adicionales para esta materia.';
        recursosList.appendChild(li);
    }

    document.querySelectorAll('.remove-resource-btn').forEach(button => {
        button.onclick = (event) => {
            const index = parseInt(event.target.dataset.index);
            const matId = event.target.dataset.materiaId;
            estadoUsuario.recursosAdicionales[matId].splice(index, 1);
            saveState();
            openDetalleMateriaModal(matId); // Re-renderizar el modal para actualizar la lista
        };
    });

    document.getElementById('add-resource-btn').onclick = () => {
        const title = document.getElementById('new-resource-title').value.trim();
        const url = document.getElementById('new-resource-url').value.trim();

        if (title && url) {
            if (!estadoUsuario.recursosAdicionales[idMateria]) {
                estadoUsuario.recursosAdicionales[idMateria] = [];
            }
            estadoUsuario.recursosAdicionales[idMateria].push({ titulo: title, url: url });
            saveState();
            document.getElementById('new-resource-title').value = '';
            document.getElementById('new-resource-url').value = '';
            openDetalleMateriaModal(idMateria); // Re-renderizar el modal
        } else {
            alert('Por favor, ingresa un título y una URL válidos para el recurso.');
        }
    };

    document.getElementById('detalle-materia-modal').style.display = 'block';
}

/**
 * Actualiza la barra de progreso de parciales para una materia específica.
 * @param {string} idMateria - El ID de la materia.
 */
function updateParcialesProgressBar(idMateria) {
    const parcialesData = estadoUsuario.progresoParciales[idMateria] || { total: 0, parciales: [] };
    const aprobadosCount = parcialesData.parciales.filter(p => p.aprobado).length;
    const totalParciales = parcialesData.parciales.length;

    const progressBar = document.getElementById('partials-progress-bar');
    const progressText = document.getElementById('partials-progress-text');

    const percentage = totalParciales > 0 ? ((aprobadosCount / totalParciales) * 100).toFixed(0) : 0;
    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = percentage === 100 ? 'var(--primary-color)' : 'var(--secondary-color)';
    progressText.textContent = `${aprobadosCount}/${totalParciales} Parciales Aprobados`;
    progressText.style.color = percentage === 100 ? 'white' : 'var(--text-color)';
}

/**
 * Renderiza la sección del horario académico.
 */
function renderizarHorario() {
    document.getElementById('horario-text').value = estadoUsuario.horarioAcademico;
    document.getElementById('horario-display').innerHTML = `<pre>${estadoUsuario.horarioAcademico || 'No hay horario guardado.'}</pre>`;
}

/**
 * Renderiza la sección de tareas pendientes.
 */
function renderizarTareas() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    const newTaskSubjectSelect = document.getElementById('new-task-subject-select');
    newTaskSubjectSelect.innerHTML = '<option value="">Asociar a materia (opcional)</option>';
    planEstudios.sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.id;
        option.textContent = materia.nombre;
        newTaskSubjectSelect.appendChild(option);
    });


    if (estadoUsuario.tareasPendientes.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No tienes tareas pendientes.';
        tasksList.appendChild(li);
        return;
    }

    estadoUsuario.tareasPendientes.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completada);
        const materiaNombre = task.idMateria ? ` (${getMateriaById(task.idMateria)?.nombre || task.idMateria})` : '';
        li.innerHTML = `
            <div class="task-info">
                <input type="checkbox" data-id="${task.id}" ${task.completada ? 'checked' : ''}>
                <span>${task.tarea}${materiaNombre}</span>
            </div>
            <div class="actions">
                <button class="button-danger remove-task-btn" data-id="${task.id}">Eliminar</button>
            </div>
        `;
        tasksList.appendChild(li);
    });

    document.querySelectorAll('#tasks-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.onchange = (event) => {
            const taskId = event.target.dataset.id;
            const task = estadoUsuario.tareasPendientes.find(t => t.id === taskId);
            if (task) {
                task.completada = event.target.checked;
                saveState();
                renderizarTareas(); // Re-render para aplicar estilo de completado
            }
        };
    });

    document.querySelectorAll('.remove-task-btn').forEach(button => {
        button.onclick = (event) => {
            const taskId = event.target.dataset.id;
            estadoUsuario.tareasPendientes = estadoUsuario.tareasPendientes.filter(t => t.id !== taskId);
            saveState();
            renderizarTareas();
        };
    });
}

// --- Funciones de Interacción ---

/**
 * Marca una materia como aprobada.
 * @param {string} idMateria - El ID de la materia a aprobar.
 */
function markMateriaAsApproved(idMateria) {
    if (!estadoUsuario.materiasAprobadas.includes(idMateria)) {
        estadoUsuario.materiasAprobadas.push(idMateria);
        // Eliminar de materias cursando si estaba allí
        estadoUsuario.materiasCursando = estadoUsuario.materiasCursando.filter(id => id !== idMateria);
        // Eliminar progreso de parciales si existía
        delete estadoUsuario.progresoParciales[idMateria];
        saveState();
        showNotification(`¡Felicitaciones! Has aprobado ${getMateriaById(idMateria).nombre}.`, 'success');
        updateAllSections();
    }
}

/**
 * Añade una materia a la lista de "cursando".
 */
function addMateriaToCursando() {
    const select = document.getElementById('add-cursando-select');
    const materiaId = select.value;
    if (materiaId && !estadoUsuario.materiasCursando.includes(materiaId) && !estadoUsuario.materiasAprobadas.includes(materiaId)) {
        estadoUsuario.materiasCursando.push(materiaId);
        saveState();
        renderizarMisMateriasActuales();
        renderizarMapa(); // Para actualizar el estado visual en el mapa
        renderizarMateriasCursandoDashboard(); // Actualizar dashboard de materias cursando
        select.value = ''; // Reset select
    } else if (estadoUsuario.materiasAprobadas.includes(materiaId)) {
        alert('Esta materia ya está aprobada.');
    } else if (estadoUsuario.materiasCursando.includes(materiaId)) {
        alert('Ya estás cursando esta materia.');
    }
}

/**
 * Quita una materia de la lista de "cursando".
 * @param {string} idMateria - El ID de la materia a quitar.
 */
function removeMateriaFromCursando(idMateria) {
    estadoUsuario.materiasCursando = estadoUsuario.materiasCursando.filter(id => id !== idMateria);
    // También removemos sus parciales si ya no se cursa
    delete estadoUsuario.progresoParciales[idMateria];
    saveState();
    renderizarMisMateriasActuales();
    renderizarMapa(); // Para actualizar el estado visual en el mapa
    renderizarMateriasCursandoDashboard(); // Actualizar dashboard de materias cursando
    renderizarProximosParcialesDashboard(); // Actualizar dashboard de parciales
}

/**
 * Guarda el horario académico.
 */
function saveHorario() {
    estadoUsuario.horarioAcademico = document.getElementById('horario-text').value;
    saveState();
    renderizarHorario();
    alert('Horario guardado.');
}

/**
 * Añade una nueva tarea.
 */
function addTask() {
    const taskText = document.getElementById('new-task-text').value.trim();
    const subjectId = document.getElementById('new-task-subject-select').value;
    if (taskText) {
        const newTask = {
            id: crypto.randomUUID(), // Generar un ID único
            tarea: taskText,
            idMateria: subjectId || null,
            completada: false
        };
        estadoUsuario.tareasPendientes.push(newTask);
        saveState();
        document.getElementById('new-task-text').value = '';
        document.getElementById('new-task-subject-select').value = '';
        renderizarTareas();
    } else {
        alert('La descripción de la tarea no puede estar vacía.');
    }
}

/**
 * Actualiza todas las secciones relevantes de la UI.
 */
function updateAllSections() {
    renderizarDashboard(); // Esto ahora llama a renderizarMateriasCursandoDashboard y renderizarProximosParcialesDashboard
    renderizarMapa();
    renderizarMisMateriasActuales();
    // renderizarHorario(); // No es necesario si no hay cambios directos en el estado del horario
    // renderizarTareas(); // No es necesario si no hay cambios directos en el estado de las tareas
}

/**
 * Muestra una notificación personalizada en la pantalla.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [type='success'] - El tipo de notificación ('success', 'danger', 'info').
 */
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');

    // Crear el elemento de la notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`; // Ej: 'notification success'
    notification.textContent = message;

    // Añadirla al contenedor
    container.appendChild(notification);

    // Eliminar la notificación después de que la animación 'fadeOut' termine
    // La animación dura 0.5s y empieza después de 4s (total 4.5s)
    setTimeout(() => {
        notification.remove();
    }, 4500);
}

/**
 * Resetea todo el progreso del usuario en la aplicación.
 * Borra el estado guardado y recarga la página.
 */
function resetearProgreso() {
    localStorage.removeItem('estadoUsuarioCarrera'); // Elimina el estado del localStorage
    // Reinicia el objeto de estado en memoria con la nueva estructura de parciales
    estadoUsuario = { materiasAprobadas: [], materiasCursando: [], progresoParciales: {}, horarioAcademico: '', tareasPendientes: [], recursosAdicionales: {} };
    updateAllSections(); // Actualiza la interfaz de usuario con el estado reseteado
}



//---------------------------------------------------------------------------------//

// INICIALIZACIÓN //

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    updateAllSections(); // Renderiza todas las secciones al cargar

    // Configurar navegación
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (event) => {
            showSection(event.target.dataset.section);
        });
    });

    // Filtro por año en el mapa
    document.getElementById('filter-year').addEventListener('change', (event) => {
        renderizarMapa(event.target.value);
    });

    // Cerrar modal de detalle de materia
    document.querySelector('#detalle-materia-modal .close-button').addEventListener('click', () => {
        document.getElementById('detalle-materia-modal').style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('detalle-materia-modal')) {
            document.getElementById('detalle-materia-modal').style.display = 'none';
        }
    });


    document.getElementById('add-cursando-btn').addEventListener('click', addMateriaToCursando);

    document.getElementById('save-horario-btn').addEventListener('click', saveHorario);

    document.getElementById('add-task-btn').addEventListener('click', addTask);

    document.getElementById('reset-progress-button').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres resetear todo tu progreso? Esta acción no se puede deshacer.')) {
            resetearProgreso();
            showNotification('Progreso reseteado correctamente.', 'success');
        }
    });

    document.getElementById('go-to-cursando-button').addEventListener('click', () => {
        showSection('materias-cursando');
    });

    showSection('dashboard'); // Asegurarse de que el dashboard sea la sección inicial
});


