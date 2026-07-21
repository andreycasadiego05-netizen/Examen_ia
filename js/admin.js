/**
 * BikeStore BI Dashboard - Lógica e Interactividad Administrativa (Julio 2026)
 * Control de módulos, gráficos con Chart.js, animaciones KPI y filtrado de datos.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. FUENTE DE DATOS OFICIAL Y ESTADO
    // ==========================================

    const DATOS_KPI = {
        facturacionBruta: 871200,
        unidadesVendidas: 151,
        productoMasRentable: "Bicicleta Ruta Aluminio 11v",
        montoRentable: 94500
    };

    const INVENTARIO = 
    [
    { id: 'PROD001', nombre: 'Bicicleta MTB Carbono R29', stock: 6, proveedor: 'Specialized Global Trade', costo: 16330, precio: 24500, cobertura: 'CRÍTICO (16.9 días)', estado: 'critico' },
    { id: 'PROD002', nombre: 'Bicicleta Ruta Aluminio 11v', stock: 8, proveedor: 'Trek Colombia', costo: 12600, precio: 18900, cobertura: 'CRÍTICO (16.5 días)', estado: 'critico' },
    { id: 'PROD004', nombre: 'Casco Aerodinámico MIPS', stock: 35, proveedor: 'Fox Racing', costo: 1125, precio: 1800, cobertura: 'Saludable', estado: 'saludable' },
    { id: 'PROD005', nombre: 'Luces LED Delantera/Trasera', stock: 65, proveedor: 'Specialized Global', costo: 394, precio: 650, cobertura: 'Excelencia (65 días)', estado: 'excelencia' },
    { id: 'PROD006', nombre: 'Llanta Maxxis Tubeless Ready 29x2.25', stock: 48, proveedor: 'Shimano Distribución', costo: 774, precio: 1200, cobertura: 'Regular', estado: 'regular' },
    { id: 'PROD008', nombre: 'Ciclocomputador GPS Garmin Edge', stock: 15, proveedor: 'Garmin Retail', costo: 3600, precio: 5400, cobertura: 'Atención (19.3 días)', estado: 'atencion' },
    { id: 'PROD009', nombre: 'Pedales Automáticos MTB', stock: 28, proveedor: 'Shimano Distribución', costo: 890, precio: 1450, cobertura: 'Sin Rotación (0 Ventas)', estado: 'sin-rotacion' },
    { id: 'PROD010', nombre: 'Pedales Automáticos Ruta', stock: 20, proveedor: 'Trek Colombia', costo: 1180, precio: 1900, cobertura: 'Sin Rotación (0 Ventas)', estado: 'sin-rotacion' },
    { id: 'PROD011', nombre: 'Caramañola Térmica 750ml', stock: 80, proveedor: 'Specialized Global', costo: 185, precio: 290, cobertura: 'Sin Rotación (0 Ventas)', estado: 'sin-rotacion' },
    { id: 'PROD012', nombre: 'Caramañola Estándar 600ml', stock: 75, proveedor: 'Fox Racing', costo: 115, precio: 180, cobertura: 'Sin Rotación (0 Ventas)', estado: 'sin-rotacion' }
];

const TRANSACCIONES = [
    { id: 'TRX-1001', fecha: '2026-07-02', idProd: 'PROD005', producto: 'Luces LED Delantera/Trasera', unidades: 31, precioUnitario: 650, total: 20150 },
    { id: 'TRX-1002', fecha: '2026-07-05', idProd: 'PROD004', producto: 'Casco Aerodinámico MIPS', unidades: 25, precioUnitario: 1800, total: 45000 },
    { id: 'TRX-1003', fecha: '2026-07-09', idProd: 'PROD008', producto: 'Ciclocomputador GPS Garmin Edge', unidades: 24, precioUnitario: 5400, total: 129600 },
    { id: 'TRX-1004', fecha: '2026-07-12', idProd: 'PROD006', producto: 'Llanta Maxxis Tubeless Ready 29x2.25', unidades: 21, precioUnitario: 1200, total: 25200 },
    { id: 'TRX-1005', fecha: '2026-07-18', idProd: 'PROD002', producto: 'Bicicleta Ruta Aluminio 11v', unidades: 15, precioUnitario: 18900, total: 283500 },
    { id: 'TRX-1006', fecha: '2026-07-22', idProd: 'PROD001', producto: 'Bicicleta MTB Carbono R29', unidades: 11, precioUnitario: 24500, total: 269500 },
    { id: 'TRX-1007', fecha: '2026-07-25', idProd: 'PROD002', producto: 'Bicicleta Ruta Aluminio 11v (Lote Institucional)', unidades: 10, precioUnitario: 18900, total: 189000 },
    { id: 'TRX-1008', fecha: '2026-07-28', idProd: 'PROD001', producto: 'Bicicleta MTB Carbono R29 (Lote Distribuidor)', unidades: 10, precioUnitario: 24500, total: 245000 },
    { id: 'TRX-1009', fecha: '2026-07-30', idProd: 'PROD003', producto: 'Bicicleta Urbana Híbrida & Componentes', unidades: 4, precioUnitario: 9500, total: 38000 }
];

    let chartTopProductos = null;
    let chartProyeccionDemanda = null;

// ==========================================
// NAVEGACIÓN CORREGIDA (SIDEBAR TABS & LINK EXTERNO)
// ==========================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const modulosDashboard = document.querySelectorAll('.modulo-dashboard');
const dynamicSectionTitle = document.querySelector('#dynamic-section-title');

const titulosModulos = {
    'seccion-resumen': 'Dashboard Analítico de Negocio',
    'seccion-ventas': 'Historial y Registro de Transacciones',
    'seccion-inventario': 'Control de Inventario y Cobertura de Stock'
};

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // 1. Si es un enlace externo (como 'index.html') o tiene la clase '.link-externo', 
        // dejamos que el navegador realice la navegación nativa.
        if (link.classList.contains('link-externo') || (href && !href.startsWith('#'))) {
            return; // No ejecutamos e.preventDefault()
        }

        // 2. Para navegación por anclas internas (#seccion-...), cancelamos el comportamiento por defecto
        e.preventDefault();

        const targetId = link.getAttribute('data-seccion') || href?.replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        // Ocultar módulos y quitar clase activa de los enlaces
        modulosDashboard.forEach(modulo => modulo.classList.remove('activo'));
        sidebarLinks.forEach(l => l.classList.remove('activo'));

        // Activar el enlace presionado y la sección correspondiente
        link.classList.add('activo');
        targetSection.classList.add('activo');

        // Actualizar el título principal en el topbar
        if (dynamicSectionTitle && titulosModulos[targetId]) {
            dynamicSectionTitle.textContent = titulosModulos[targetId];
        }
    });
});
    // ==========================================
    // 3. ANIMACIONES COUNT-UP DE KPIS
    // ==========================================

    function animarCountUp(elemento, valorFinal, esMoneda = false, duracion = 1500) {
        if (!elemento) return;
        const pasos = 60;
        const incremento = valorFinal / pasos;
        let valorActual = 0;
        const intervaloTiempo = duracion / pasos;

        const timer = setInterval(() => {
            valorActual += incremento;
            if (valorActual >= valorFinal) {
                valorActual = valorFinal;
                clearInterval(timer);
            }

            if (esMoneda) {
                elemento.textContent = `$${Math.round(valorActual).toLocaleString()}`;
            } else {
                elemento.textContent = Math.round(valorActual).toLocaleString();
            }
        }, intervaloTiempo);
    }

    function inicializarKPIs() {
        const elVentas = document.querySelector('#kpi-ventas-totales');
        const elUnidades = document.querySelector('#kpi-unidades');
        const elRentable = document.querySelector('#kpi-rentable');
        const elRentableMonto = document.querySelector('#kpi-rentable-monto');

        animarCountUp(elVentas, DATOS_KPI.facturacionBruta, true);
        animarCountUp(elUnidades, DATOS_KPI.unidadesVendidas, false);

        if (elRentable) elRentable.textContent = DATOS_KPI.productoMasRentable;
        if (elRentableMonto) elRentableMonto.textContent = `$${DATOS_KPI.montoRentable.toLocaleString()} Generados`;
    }

    // ==========================================
    // 4. RENDERIZADO Y BÚSQUEDA DE TABLAS
    // ==========================================

    function renderizarTablaInventario() {
        const tbody = document.querySelector('#inventario-rows');
        const badgeContador = document.querySelector('#contador-alertas-criticas');
        if (!tbody) return;

        tbody.innerHTML = '';
        let alertasCriticasCount = 0;

        INVENTARIO.forEach(item => {
            if (item.estado === 'critico' || item.stock < 10) {
                alertasCriticasCount++;
            }

            const tr = document.createElement('tr');
            tr.className = 'fila-animada';
            
            let badgeClass = 'badge-saludable';
            if (item.estado === 'critico') badgeClass = 'badge-critico';
            else if (item.estado === 'atencion') badgeClass = 'badge-atencion';
            else if (item.estado === 'regular') badgeClass = 'badge-regular';
            else if (item.estado === 'sin-rotacion') badgeClass = 'badge-neutro';

            tr.innerHTML = `
                <td><strong>${item.id}</strong></td>
                <td>${item.nombre}</td>
                <td>${item.stock} u.</td>
                <td>${item.proveedor}</td>
                <td>$${item.costo.toLocaleString()}</td>
                <td>$${item.precio.toLocaleString()}</td>
                <td><span class="badge ${badgeClass}">${item.cobertura}</span></td>
            `;
            tbody.appendChild(tr);
        });

        if (badgeContador) {
            badgeContador.textContent = `${alertasCriticasCount} Alertas Críticas`;
        }
    }

    function renderizarTablaVentas(filtroText = '') {
        const tbody = document.querySelector('#ventas-rows');
        if (!tbody) return;

        tbody.innerHTML = '';
        const busqueda = filtroText.toLowerCase().trim();

        const filtradas = TRANSACCIONES.filter(t => 
            t.producto.toLowerCase().includes(busqueda) || 
            t.idProd.toLowerCase().includes(busqueda) ||
            t.id.toLowerCase().includes(busqueda)
        );

        if (filtradas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 25px; color: var(--color-texto-mutado);">
                        No se encontraron registros que coincidan con "${filtroText}"
                    </td>
                </tr>
            `;
            return;
        }

        filtradas.forEach(trx => {
            const tr = document.createElement('tr');
            tr.className = 'fila-animada';
            tr.innerHTML = `
                <td><strong>${trx.id}</strong></td>
                <td>${trx.fecha}</td>
                <td><span class="tag-id">${trx.idProd}</span> ${trx.producto}</td>
                <td>${trx.unidades}</td>
                <td>$${Math.round(trx.precioUnitario).toLocaleString()}</td>
                <td><strong>$${trx.total.toLocaleString()}</strong></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Listener para búsqueda en tiempo real
    const inputBuscarVenta = document.querySelector('#input-buscar-venta');
    inputBuscarVenta?.addEventListener('input', (e) => {
        renderizarTablaVentas(e.target.value);
    });

    // ==========================================
    // 5. EXPORTACIÓN DE REPORTES (TOAST)
    // ==========================================

    const btnExportar = document.querySelector('#btn-exportar-reporte');
    
    function mostrarToastNotification(mensaje) {
        let toast = document.querySelector('#toast-notificacion');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notificacion';
            toast.className = 'toast-notificacion';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${mensaje}</span>`;
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
        }, 3500);
    }

    btnExportar?.addEventListener('click', () => {
        mostrarToastNotification("Reporte consolidado de Julio 2026 descargado con éxito.");
    });

    // ==========================================
    // 6. CONFIGURACIÓN DE GRÁFICOS (CHART.JS)
    // ==========================================

    function inicializarGraficos() {
        const ctxTop = document.querySelector('#chart-top-productos')?.getContext('2d');
        const ctxProyeccion = document.querySelector('#chart-proyeccion-demanda')?.getContext('2d');

        // Estilos Oscuros Estándar
        Chart.defaults.color = '#a0aec0';
        Chart.defaults.font.family = 'Inter, system-ui, sans-serif';

        // Gráfico 1: Top 5 Productos por Volumen
        if (ctxTop) {
            chartTopProductos = new Chart(ctxTop, {
                type: 'bar',
                data: {
                    labels: [
                        'Luces LED Recargables',
                        'Casco Aerodinámico MIPS',
                        'GPS Garmin Edge',
                        'Llanta Maxxis 29x2.25',
                        'Bicicleta Ruta Aluminio'
                    ],
                    datasets: [{
                        label: 'Unidades Vendidas',
                        data: [31, 25, 24, 21, 15],
                        backgroundColor: [
                            '#ff5a00',
                            '#ff7b33',
                            '#ff9c66',
                            '#ffbd99',
                            '#ffdccb'
                        ],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => ` Unidades: ${context.raw} u.`
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { precision: 0 }
                        },
                        y: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Gráfico 2: Comportamiento Semanal de Demanda
        if (ctxProyeccion) {
            chartProyeccionDemanda = new Chart(ctxProyeccion, {
                type: 'line',
                data: {
                    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                    datasets: [
                        {
                            label: 'Fines de Semana (61.6%)',
                            data: [31200, 33500, 31800, 34960],
                            borderColor: '#ff5a00',
                            backgroundColor: 'rgba(255, 90, 0, 0.15)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Entre Semana (38.4%)',
                            data: [23800, 24900, 25100, 24856],
                            borderColor: '#3182ce',
                            backgroundColor: 'rgba(49, 130, 206, 0.05)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { usePointStyle: true, boxWidth: 8 }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => ` ${context.dataset.label}: $${context.raw.toLocaleString()}`
                            }
                        }
                    },
                    scales: {
                        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: {
                                callback: (value) => `$${value / 1000}k`
                            }
                        }
                    }
                }
            });
        }
    }

    // ==========================================
    // 7. INICIALIZACIÓN GENERAL
    // ==========================================
    inicializarKPIs();
    renderizarTablaInventario();
    renderizarTablaVentas();
    
    // Se inicializan los gráficos cuando Chart.js está disponible
    if (typeof Chart !== 'undefined') {
        inicializarGraficos();
    } else {
        console.warn('Chart.js no ha sido detectado en el entorno.');
    }
});


/**
 * BikeStore - Navegación entre Módulos y Exportación CSV
 * Arquitectura ES6+, DOM Manipulation, Blob API
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. BASE DE DATOS DEL HISTÓRICO DE VENTAS (JULIO 2026)
    // ==========================================
    const historicoVentasJulio = [
        { fecha: '2026-07-02', id_producto: 'PROD005', producto: 'Luces LED Delantera/Trasera Recargable', cantidad: 31, valor_unitario: 356, total: 11036 },
        { fecha: '2026-07-05', id_producto: 'PROD004', producto: 'Casco Aerodinamico MIPS', cantidad: 25, valor_unitario: 1075, total: 26875 },
        { fecha: '2026-07-09', id_producto: 'PROD008', producto: 'Ciclocomputador GPS Garmin Edge', cantidad: 24, valor_unitario: 2800, total: 67200 },
        { fecha: '2026-07-12', id_producto: 'PROD006', producto: 'Llanta Maxxis Tubeless Ready 29x2.25', cantidad: 21, valor_unitario: 576, total: 12096 },
        { fecha: '2026-07-18', id_producto: 'PROD002', producto: 'Bicicleta Ruta Aluminio 11v', cantidad: 15, valor_unitario: 9300, total: 139500 },
        { fecha: '2026-07-22', id_producto: 'PROD001', producto: 'Bicicleta MTB Carbono R29', cantidad: 11, valor_unitario: 12170, total: 133870 },
        { fecha: '2026-07-25', id_producto: 'PROD002', producto: 'Bicicleta Ruta Aluminio 11v (Lote Institucional)', cantidad: 10, valor_unitario: 9300, total: 93000 },
        { fecha: '2026-07-28', id_producto: 'PROD001', producto: 'Bicicleta MTB Carbono R29 (Lote Distribuidor)', cantidad: 10, valor_unitario: 12170, total: 121700 },
        { fecha: '2026-07-30', id_producto: 'PROD003', producto: 'Bicicleta Urbana Hibrida & Componentes', cantidad: 4, valor_unitario: 66480.75, total: 265923 }
    ];

    // Mapa de títulos dinámicos según el selector ID del módulo
    const titulosModulos = {
        'seccion-resumen': 'Dashboard Analítico de Negocio',
        'seccion-ventas': 'Historial y Registro de Transacciones',
        'seccion-inventario': 'Control de Inventario y Cobertura de Stock'
    };

    // Selectores DOM
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const modulosDashboard = document.querySelectorAll('.modulo-dashboard');
    const dynamicSectionTitle = document.querySelector('#dynamic-section-title');
    const btnExportarReporte = document.querySelector('#btn-exportar-reporte');

    // ==========================================
    // 2. NAVEGACIÓN ENTRE SECCIONES (SIDEBAR)
    // ==========================================
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Obtener la sección destino según el id/atributo o href (#seccion-...)
            const targetId = link.getAttribute('data-seccion') || link.getAttribute('href')?.replace('#', '');
            const targetSection = document.getElementById(targetId);

            if (!targetSection) return;

            // 1. Remover clase 'activo' de todos los módulos y enlaces
            modulosDashboard.forEach(modulo => modulo.classList.remove('activo'));
            sidebarLinks.forEach(l => l.classList.remove('activo'));

            // 2. Activar enlace e inyectar animación al módulo seleccionado
            link.classList.add('activo');
            targetSection.classList.add('activo');

            // 3. Actualizar título del Topbar
            if (dynamicSectionTitle && titulosModulos[targetId]) {
                dynamicSectionTitle.textContent = titulosModulos[targetId];
            }
        });
    });

    // ==========================================
    // 3. EXPORTACIÓN DE DATOS CSV (BLOB API)
    // ==========================================
    /**
     * Convierte el array de objetos en un Blob CSV y dispara la descarga en el cliente
     */
    function exportarHistoricoCSV() {
        if (!historicoVentasJulio || historicoVentasJulio.length === 0) {
            mostrarToast('No hay datos disponibles para exportar', 'error');
            return;
        }

        // Encabezados del CSV
        const headers = ['Fecha', 'ID Producto', 'Producto', 'Cantidad', 'Valor Unitario ($)', 'Total Transaccion ($)'];
        
        // Mapeo de filas escapando posibles comas internas en los nombres de productos
        const filasCSV = historicoVentasJulio.map(item => [
            `"${item.fecha}"`,
            `"${item.id_producto}"`,
            `"${item.producto.replace(/"/g, '""')}"`,
            item.cantidad,
            item.valor_unitario,
            item.total
        ].join(','));

        // Ensamblado final con codificación UTF-8 con BOM (\uFEFF para correcta lectura en MS Excel)
        const csvContent = '\uFEFF' + [headers.join(','), ...filasCSV].join('\n');

        // Generación del archivo mediante Blob API
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Creación del enlace temporal y disparo del evento click
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = url;
        enlaceDescarga.setAttribute('download', 'historico_ventas_julio_2026.csv');
        document.body.appendChild(enlaceDescarga);
        
        enlaceDescarga.click();

        // Limpieza de recursos en memoria
        document.body.removeChild(enlaceDescarga);
        URL.revokeObjectURL(url);

        // Notificación al usuario
        mostrarToast('Reporte historico_ventas_julio_2026.csv descargado con éxito');
    }

    btnExportarReporte?.addEventListener('click', exportarHistoricoCSV);

    // ==========================================
    // 4. NOTIFICACIÓN FLOTANTE (TOAST)
    // ==========================================
    function mostrarToast(mensaje, tipo = 'exito') {
        let toast = document.querySelector('#toast-admin');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-admin';
            toast.className = 'toast-admin-notificacion';
            document.body.appendChild(toast);
        }

        const icono = tipo === 'exito' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `<i class="fa-solid ${icono}"></i> <span>${mensaje}</span>`;
        toast.classList.add('mostrar');

        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 3500);
    }
});

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Obtenemos el valor del atributo href
        const href = link.getAttribute('href');

        // Si el enlace va a index.html o tiene la clase link-externo
        if (href === 'index.html' || link.classList.contains('link-externo')) {
            e.preventDefault(); // Detenemos cualquier comportamiento previo
            window.location.href = 'index.html'; // Redirige a la tienda
            return;
        }

        // Si es una sección interna (ej. #seccion-resumen)
        e.preventDefault();
        // ... aquí va tu lógica para cambiar de pestaña/sección ...
    });
});