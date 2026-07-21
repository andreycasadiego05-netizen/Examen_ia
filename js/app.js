/**
 * BikeStore - Lógica del Catálogo y Carrito de Compras
 * Arquitectura ES6+, Manipulación del DOM, Event Delegation y LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. BASE DE DATOS DE PRODUCTOS (HISTÓRICO)
    // ==========================================
    const productos = [
        {
            id: 'PROD001',
            nombre: 'Bicicleta MTB Carbono R29',
            categoria: 'bicicletas',
            subcategoria: 'Bicicletas',
            precio: 24500,
            imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 'PROD002',
            nombre: 'Bicicleta Ruta Aluminio 11v',
            categoria: 'bicicletas',
            subcategoria: 'Bicicletas',
            precio: 18900,
            imagen: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 'PROD003',
            nombre: 'Bicicleta Urbana Hibrida',
            categoria: 'bicicletas',
            subcategoria: 'Bicicletas',
            precio: 9500,
            imagen: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 'PROD004',
            nombre: 'Casco Aerodinamico MIPS',
            categoria: 'accesorios',
            subcategoria: 'Accesorios',
            precio: 1800,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyIDDtLh_Wg8MJEX1qsDKDPa4YnMDB7EbYGVZ1n6U03g1K-HdgTN-WzQ&s=10'
        },
        {
            id: 'PROD005',
            nombre: 'Luces LED Delantera/Trasera Recargable',
            categoria: 'accesorios',
            subcategoria: 'Accesorios',
            precio: 650,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrW7XW36C3aiQKRdoALBsNs4ctgKmQWJj0o4_F_ZjzvXJCc7kh0LZBzA&s=10'
        },
        {
            id: 'PROD006',
            nombre: 'Llanta Maxxis Tubeless Ready 29x2.25',
            categoria: 'componentes',
            subcategoria: 'Componentes',
            precio: 1200,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOhGUsm6v0WBI_q-nMrOLAlsDv7nieFH1avJ_XVizoMQ&s'
        },
        {
            id: 'PROD007',
            nombre: 'Cadena Shimano XT 12v',
            categoria: 'componentes',
            subcategoria: 'Componentes',
            precio: 850,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_836228-MLU73980603524_012024-O.webp'
        },
        {
            id: 'PROD008',
            nombre: 'Ciclocomputador GPS Garmin Edge',
            categoria: 'tecnologia',
            subcategoria: 'Tecnología',
            precio: 5400,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3Qd72o8Qv9bp2O5U20Q-_O5f84lKqvvzb3oAU_ufAg&s=10'
        },
        {
            id: 'PROD009',
            nombre: 'Pedales Automaticos Shimano SPD MTB',
            categoria: 'componentes',
            subcategoria: 'Componentes',
            precio: 1450,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIty2jq1E3b9NxjKdiYDyIg3mp9H0FCI2izjTeypPUOfYPssXJ7QStt50&s=100'
        },
        {
            id: 'PROD010',
            nombre: 'Pedales Automaticos Look Keo Ruta',
            categoria: 'componentes',
            subcategoria: 'Componentes',
            precio: 1900,
            imagen: 'https://bicicletasstrongman.co/cdn/shop/files/KEOCLASSIC3_1.webp?v=1778533994'
        },
        {
            id: 'PROD011',
            nombre: 'Caramanola Termica Fly 550ml',
            categoria: 'accesorios',
            subcategoria: 'Accesorios',
            precio: 290,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedNzy4-FkVsb2nzKgsNx-wj0nQyHvwZGGIrsXOLTV5kCw31nRucZ33SQ&s=10'
        },
        {
            id: 'PROD012',
            nombre: 'Caramanola Elite Ciclismo 750ml',
            categoria: 'accesorios',
            subcategoria: 'Accesorios',
            precio: 180,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARZ8G8uBtu18bTHjCbcJaRIPaLnItGrBHM-da4t9qGQ&s'
        }
    ];

    // Estado local del Carrito
    let carrito = JSON.parse(localStorage.getItem('bikestore_carrito')) || [];

    // Selectores DOM Catálogo
    const contenedorCatalogo = document.querySelector('#catalogo-productos');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    
    // Selectores DOM Carrito
    const btnCarritoToggle = document.querySelector('#btn-carrito-toggle');
    const btnCarritoCerrar = document.querySelector('#btn-carrito-cerrar');
    const carritoSidebar = document.querySelector('#carrito-sidebar');
    const carritoOverlay = document.querySelector('#carrito-overlay');
    const listaCarrito = document.querySelector('#lista-carrito');
    const carritoContador = document.querySelector('#carrito-contador');
    const totalCarritoPrecio = document.querySelector('#total-carrito-precio');
    const btnVaciarCarrito = document.querySelector('#btn-vaciar-carrito');
    const btnFinalizarCompra = document.querySelector('#btn-finalizar-compra');

    // ==========================================
    // 2. RENDERIZADO Y GESTIÓN DEL CATÁLOGO
    // ==========================================

    /**
     * Renderiza las tarjetas de productos en el DOM según la lista recibida
     * @param {Array} lista - Arreglo de productos a renderizar
     */
    function renderizarProductos(lista) {
        if (!contenedorCatalogo) return;

        contenedorCatalogo.innerHTML = '';

        if (lista.length === 0) {
            contenedorCatalogo.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-texto-mutado);">
                    <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
                    <p>No se encontraron productos en esta categoría.</p>
                </div>
            `;
            return;
        }

        const fragmento = document.createDocumentFragment();

        lista.forEach(producto => {
            const article = document.createElement('article');
            article.className = 'producto-card';
            article.setAttribute('data-categoria', producto.categoria);

            article.innerHTML = `
                <div class="producto-imagen-wrapper">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" loading="lazy">
                </div>
                <div class="producto-info">
                    <span class="producto-categoria">${producto.subcategoria}</span>
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                    <button class="btn btn-comprar btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            `;

            fragmento.appendChild(article);
        });

        contenedorCatalogo.appendChild(fragmento);
    }

    /**
     * Permite insertar un nuevo producto al catálogo dinámicamente
     * @param {Object} nuevoProducto - Objeto con la información del producto
     */
    function agregarProductoPersonalizado(nuevoProducto) {
        if (!nuevoProducto || !nuevoProducto.id || !nuevoProducto.nombre) return;
        
        // Evita duplicados por ID
        const existe = productos.some(p => p.id === nuevoProducto.id);
        if (!existe) {
            productos.push(nuevoProducto);
            const filtroActivo = document.querySelector('.btn-filtro.activo')?.dataset.categoria || 'todos';
            filtrarProductos(filtroActivo);
        }
    }

    // ==========================================
    // 3. FILTRADO POR CATEGORÍAS
    // ==========================================

    /**
     * Filtra los productos de la lista maestra según la categoría activa
     * @param {string} categoria - Categoría seleccionada o 'todos'
     */
    function filtrarProductos(categoria) {
        if (categoria === 'todos') {
            renderizarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(p => p.categoria === categoria);
            renderizarProductos(productosFiltrados);
        }
    }

    // Event Listeners para botones de filtro
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            const btnSeleccionado = e.currentTarget;
            btnSeleccionado.classList.add('activo');

            const categoria = btnSeleccionado.dataset.categoria;
            filtrarProductos(categoria);
        });
    });

    // ==========================================
    // 4. LÓGICA DEL CARRITO DE COMPRAS
    // ==========================================

    /**
     * Abre el panel lateral del carrito
     */
    function abrirCarrito() {
        carritoSidebar?.classList.add('abierto');
        carritoOverlay?.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el panel lateral del carrito
     */
    function cerrarCarrito() {
        carritoSidebar?.classList.remove('abierto');
        carritoOverlay?.classList.remove('activo');
        document.body.style.overflow = '';
    }

    // Event Listeners para visibilidad del carrito
    btnCarritoToggle?.addEventListener('click', abrirCarrito);
    btnCarritoCerrar?.addEventListener('click', cerrarCarrito);
    carritoOverlay?.addEventListener('click', cerrarCarrito);

    /**
     * Agrega un producto al carrito o incrementa su cantidad
     * @param {string} idProducto - ID del producto
     */
    function agregarAlCarrito(idProducto) {
        const productoBase = productos.find(p => p.id === idProducto);
        if (!productoBase) return;

        const itemExistente = carrito.find(item => item.id === idProducto);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                id: productoBase.id,
                nombre: productoBase.nombre,
                precio: productoBase.precio,
                subcategoria: productoBase.subcategoria,
                imagen: productoBase.imagen,
                cantidad: 1
            });
        }

        actualizarCarritoUI();
        guardarCarritoStorage();
    }

    /**
     * Cambia la cantidad de unidades de un ítem en el carrito
     * @param {string} idProducto 
     * @param {number} cambio - Delta de cambio (+1 o -1)
     */
    function cambiarCantidadItem(idProducto, cambio) {
        const item = carrito.find(i => i.id === idProducto);
        if (!item) return;

        item.cantidad += cambio;

        if (item.cantidad <= 0) {
            eliminarDelCarrito(idProducto);
        } else {
            actualizarCarritoUI();
            guardarCarritoStorage();
        }
    }

    /**
     * Remueve un ítem específico del carrito
     * @param {string} idProducto 
     */
    function eliminarDelCarrito(idProducto) {
        carrito = carrito.filter(item => item.id !== idProducto);
        actualizarCarritoUI();
        guardarCarritoStorage();
    }

    /**
     * Vacía todos los ítems del carrito
     */
    function vaciarCarrito() {
        carrito = [];
        actualizarCarritoUI();
        guardarCarritoStorage();
    }

    /**
     * Sincroniza la interfaz gráfica del carrito con el estado de datos
     */
    function actualizarCarritoUI() {
        if (!listaCarrito) return;

        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            listaCarrito.innerHTML = `
                <div class="carrito-vacio-mensaje">
                    <i class="fa-solid fa-cart-shopping" style="font-size: 2.5rem; margin-bottom: 12px; display: block; color: var(--color-borde);"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            if (carritoContador) carritoContador.textContent = '0';
            if (totalCarritoPrecio) totalCarritoPrecio.textContent = '$0';
            return;
        }

        let totalPrecio = 0;
        let totalUnidades = 0;

        const fragmento = document.createDocumentFragment();

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            totalPrecio += subtotal;
            totalUnidades += item.cantidad;

            const divItem = document.createElement('div');
            divItem.className = 'carrito-item';
            divItem.innerHTML = `
                <div class="carrito-item-detalles">
                    <h4 class="item-nombre">${item.nombre}</h4>
                    <p class="item-meta">$${item.precio.toLocaleString()} x ${item.cantidad}</p>
                    <p class="item-precio">Subtotal: $${subtotal.toLocaleString()}</p>
                </div>
                <div class="carrito-item-controles" style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn-cantidad-decrementar" data-id="${item.id}" style="padding: 2px 8px; background: var(--color-borde); border-radius: 4px; font-weight: bold;">-</button>
                    <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.cantidad}</span>
                    <button class="btn-cantidad-incrementar" data-id="${item.id}" style="padding: 2px 8px; background: var(--color-borde); border-radius: 4px; font-weight: bold;">+</button>
                    <button class="btn-eliminar-item" data-id="${item.id}" aria-label="Eliminar producto" style="margin-left: 6px;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;

            fragmento.appendChild(divItem);
        });

        listaCarrito.appendChild(fragmento);

        if (carritoContador) carritoContador.textContent = totalUnidades;
        if (totalCarritoPrecio) totalCarritoPrecio.textContent = `$${totalPrecio.toLocaleString()}`;
    }

    /**
     * Persiste la estructura del carrito en LocalStorage
     */
    function guardarCarritoStorage() {
        localStorage.setItem('bikestore_carrito', JSON.stringify(carrito));
    }

    // ==========================================
    // 5. DELEGACIÓN DE EVENTOS
    // ==========================================

    // Escucha clics en los botones 'Agregar al Carrito' del Catálogo
    contenedorCatalogo?.addEventListener('click', (e) => {
        const btnAgregar = e.target.closest('.btn-agregar');
        if (btnAgregar) {
            const id = btnAgregar.dataset.id;
            agregarAlCarrito(id);

            const textoOriginal = btnAgregar.textContent;
            btnAgregar.textContent = '¡Agregado!';
            btnAgregar.style.backgroundColor = 'var(--color-exito)';
            
            setTimeout(() => {
                btnAgregar.textContent = textoOriginal;
                btnAgregar.style.backgroundColor = '';
            }, 1000);
        }
    });

    // Escucha clics para controles (+, -, eliminar) dentro del Carrito
    listaCarrito?.addEventListener('click', (e) => {
        const btnInc = e.target.closest('.btn-cantidad-incrementar');
        const btnDec = e.target.closest('.btn-cantidad-decrementar');
        const btnEliminar = e.target.closest('.btn-eliminar-item');

        if (btnInc) {
            cambiarCantidadItem(btnInc.dataset.id, 1);
        } else if (btnDec) {
            cambiarCantidadItem(btnDec.dataset.id, -1);
        } else if (btnEliminar) {
            eliminarDelCarrito(btnEliminar.dataset.id);
        }
    });

    // Vaciar Carrito
    btnVaciarCarrito?.addEventListener('click', () => {
        if (carrito.length === 0) return;
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            vaciarCarrito();
        }
    });

    // Finalizar Compra
    btnFinalizarCompra?.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }

        const total = totalCarritoPrecio?.textContent || '$0';
        alert(`¡Gracias por tu compra en BikeStore!\n\nProcesando pedido por un total de: ${total}\nRecibirás la confirmación de envío a la brevedad.`);
        
        vaciarCarrito();
        cerrarCarrito();
    });

    // Exposición global para inserciones dinámicas
    window.agregarProductoPersonalizado = agregarProductoPersonalizado;

    // ==========================================
    // 6. INICIALIZACIÓN
    // ==========================================
    renderizarProductos(productos);
    actualizarCarritoUI();
});


// ==========================================
// AUTENTICACIÓN Y CONTROL DE ACCESO A ADMIN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const adminLink = document.querySelector('.nav-admin-link');

    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModalLogin();
        });
    }

    /**
     * Genera e inserta el Modal de Autenticación si no existe en el DOM
     */
    function abrirModalLogin() {
        let modal = document.getElementById('modal-login-admin');

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-login-admin';
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card">
                    <button id="btn-login-close" class="modal-close-btn" aria-label="Cerrar ventana">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="modal-header">
                        <i class="fa-solid fa-user-shield modal-icon"></i>
                        <h3>Acceso Administrativo</h3>
                        <p>Ingresa tus credenciales corporativas para continuar</p>
                    </div>
                    <form id="form-login-admin" class="modal-form" novalidate>
                        <div class="form-group">
                            <label for="admin-email">Correo Electrónico</label>
                            <input type="email" id="admin-email" placeholder="admin@mail.com" required autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label for="admin-password">Contraseña</label>
                            <input type="password" id="admin-password" placeholder="••••••••" required>
                        </div>
                        <div class="form-status">
                            <span id="login-error-msg"></span>
                        </div>
                        <button type="submit" id="btn-login-submit" class="btn btn-primario btn-bloque">
                            Ingresar al Panel
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            // Escuchadores de eventos para interacción con el modal recién creado
            const closeBtn = modal.querySelector('#btn-login-close');
            const form = modal.querySelector('#form-login-admin');

            closeBtn.addEventListener('click', cerrarModalLogin);

            // Cerrar al hacer clic en el fondo oscuro (overlay)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) cerrarModalLogin();
            });

            // Procesar el envío del formulario
            form.addEventListener('submit', validarCredenciales);
        }

        // Mostrar modal y bloquear scroll del body
        modal.classList.add('activo');
        document.body.style.overflow = 'hidden';
        
        // Colocar el foco en el primer input
        setTimeout(() => {
            document.getElementById('admin-email')?.focus();
        }, 100);
    }

    /**
     * Oculta el modal de login y resetea su estado
     */
    function cerrarModalLogin() {
        const modal = document.getElementById('modal-login-admin');
        if (modal) {
            modal.classList.remove('activo');
            document.body.style.overflow = '';
            limpiarErroresLogin();
        }
    }

    /**
     * Limpia mensajes de error y clases de validación
     */
    function limpiarErroresLogin() {
        const emailInput = document.getElementById('admin-email');
        const passwordInput = document.getElementById('admin-password');
        const errorMsg = document.getElementById('login-error-msg');

        if (emailInput) emailInput.classList.remove('input-error');
        if (passwordInput) passwordInput.classList.remove('input-error');
        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.className = '';
        }
    }

    /**
     * Valida el correo y contraseña ingresados
     */
    function validarCredenciales(e) {
        e.preventDefault();
        limpiarErroresLogin();

        const emailInput = document.getElementById('admin-email');
        const passwordInput = document.getElementById('admin-password');
        const errorMsg = document.getElementById('login-error-msg');
        const btnSubmit = document.getElementById('btn-login-submit');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Credenciales requeridas por sistema
        const EMAIL_VALI = 'admin@mail.com';
        const PASS_VALI = '123456';

        if (email === EMAIL_VALI && password === PASS_VALI) {
            // Acceso correcto
            errorMsg.textContent = '¡Acceso correcto! Redirigiendo...';
            errorMsg.className = 'mensaje-exito';
            btnSubmit.disabled = true;

            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
        } else {
            // Acceso denegado
            emailInput.classList.add('input-error');
            passwordInput.classList.add('input-error');
            errorMsg.textContent = 'Correo o contraseña incorrectos';
            errorMsg.className = 'mensaje-error';

            // Animación de sacudida (shake)
            const modalCard = document.querySelector('.modal-card');
            if (modalCard) {
                modalCard.classList.add('shake');
                setTimeout(() => modalCard.classList.remove('shake'), 500);
            }
        }
    }
});