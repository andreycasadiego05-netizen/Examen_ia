# 🚴 BikeStore - Dashboard & Management System

> Sistema web integral para tiendas de ciclismo que combina una interfaz de cara al cliente (E-Commerce) con un Dashboard Analítico (BI) avanzado para la gestión de ventas, inventario y métricas financieras.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

---

## 🌟 Características Principales

### 🛒 1. Módulo de Tienda (`index.html`)
- **Catálogo Interactivo:** Exhibición visual de bicicletas, repuestos y accesorios con diseño responsivo.
- **Navegación Intuitiva:** Flujo de usuario optimizado para exploración de productos y experiencia de compra.

### 🔐 2. Intercepción de Seguridad y Login Modal
- **Autenticación en Frontend:** Modal interactivo para el control de acceso administrativo.
- **Validación con Feedback Visual:** Validación en tiempo real con mensajes de error e indicativos en rojo en caso de credenciales incorrectas.

### 📊 3. Dashboard Analítico y Panel Administrativo (`admin.html`)
- **Métricas KPIs Financieras:** Tarjetas interactivas con animación *count-up* para Facturación Bruta, Unidades Vendidas y Producto más Rentable.
- **Visualización de Datos con Chart.js:**
  - *Top 5 Productos:* Gráfico de barras horizontales según el volumen de ventas.
  - *Comportamiento de Demanda:* Gráfico de líneas que compara ventas entre fines de semana (61.6%) y días hábiles (38.4%).
- **Historial de Ventas:** Tabla interactiva con filtro de búsqueda global en tiempo real por ID, fecha o producto.
- **Control de Almacén e Inventario:** Indicadores de estado de stock mediante insignias de colores (*Crítico*, *Atención*, *Saludable*, *Sin Rotación*).
- **Exportación a CSV:** Generación nativa y descarga de reportes mediante JavaScript y Blob API (`historico_ventas_julio_2026.csv`).

---

## 📁 Estructura del Proyecto

```text
bikestore/
│
├── index.html              # Vista principal de la tienda (Cliente)
├── admin.html              # Panel de control y Dashboard Analítico (BI)
│
├── css/
│   ├── style.css           # Estilos generales y tienda principal
│   └── admin.css           # Estilos específicos del Dashboard, tablas y animaciones
│
├── js/
│   ├── main.js            # Interacción de la tienda y modal de login
│   └── admin.js           # Navegación del panel, gráficos Chart.js, filtros y exportación CSV
│
└── README.md              # Documentación del proyecto
```

# 🔑 Credenciales de Prueba

Para acceder al panel administrativo utiliza las siguientes credenciales:

| Campo | Valor |
|-------|-------|
| Correo Electrónico | `admin@mail.com` |
| Contraseña | `123456` |

---

# 🚀 Instalación y Ejecución

Este proyecto está desarrollado completamente del lado del cliente (**Client-Side**) utilizando HTML, CSS y JavaScript. No requiere servidor ni base de datos.

## 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bikestore.git
```

## 2. Acceder al proyecto

```bash
cd bikestore
```

## 3. Ejecutar

Puedes abrir directamente:

```text
index.html
```

o utilizar **Live Server** desde Visual Studio Code.

---

# 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Diseño responsivo, Flexbox, Grid y animaciones |
| JavaScript ES6+ | Manipulación del DOM, Eventos, LocalStorage y Blob API |
| Chart.js | Visualización de gráficos |
| Font Awesome | Iconografía |

---

# 📊 Funcionalidades del Dashboard

- Dashboard con indicadores KPI.
- Gráficos dinámicos mediante Chart.js.
- Historial de ventas.
- Búsqueda en tiempo real.
- Gestión de inventario.
- Estados de stock.
- Reportes mensuales.
- Exportación a CSV.
- Login administrativo.
- Modal interactivo.
- Animaciones CSS.
- Diseño responsivo.

---

# 📄 Licencia

Este proyecto se distribuye bajo la **Licencia MIT**.

Consulta el archivo **LICENSE** para obtener más información.




