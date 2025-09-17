# CV Edgar González Zapata 👨‍💻

**Full Stack Developer | Mobile & Web Specialist | Azure Cloud**

CV profesional interactivo desarrollado con Node.js y Express. Diseño moderno inspirado en GitHub con funcionalidad completa de exportación a PDF.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://cv.edgargonzalezapata.dev)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

## 🚀 Características

- ✨ **Diseño moderno**: Inspirado en la interfaz de GitHub con sistema de paneles
- 📱 **Completamente responsivo**: Optimizado para desktop, tablet y móvil
- 🖨️ **Exportación PDF avanzada**: Genera PDF de 3 páginas replicando el diseño web
- ⚡ **Servidor Express**: Backend robusto para desarrollo y producción
- 🎨 **Tema GitHub**: Colores, tipografía y elementos visuales consistentes
- 📄 **Formato carta**: Layout optimizado para impresión profesional
- 🌐 **SEO optimizado**: Meta tags completos y Open Graph

## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express.js**
- **Puppeteer** para generación de PDF
- **jsPDF + html2canvas** para exportación cliente

### Frontend
- **HTML5** semántico
- **CSS3** con Flexbox y Grid
- **JavaScript ES6+** con APIs modernas
- **Responsive Design** con media queries

### Desarrollo
- **Nodemon** para hot reload
- **Git** para control de versiones
- **npm scripts** para automatización

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/edgargonzalezapata/CV-EGONZALEZ.git
cd CV-EGONZALEZ

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# O iniciar en modo producción
npm start
```

## 🔧 Scripts disponibles

```bash
npm start       # Inicia el servidor en producción
npm run dev     # Inicia con nodemon (hot reload)
npm run build   # Ejecuta el build
npm test        # Ejecuta tests
```

## 🌐 Uso

1. Ejecuta `npm run dev` para desarrollo local
2. Abre `http://localhost:[puerto-automático]` en tu navegador
3. El CV se carga automáticamente con diseño responsivo
4. Haz clic en "📄 Exportar PDF" para generar la versión imprimible

## 📁 Estructura del proyecto

```
CV-EGONZALEZ/
├── public/              # Archivos estáticos
│   ├── index.html      # CV principal con estructura semántica
│   ├── styles.css      # Estilos CSS optimizados
│   └── script.js       # JavaScript para interactividad
├── views/              # Plantillas (futuro uso)
├── server.js           # Servidor Express con rutas
├── package.json        # Configuración npm y dependencias
├── .gitignore         # Archivos a ignorar en Git
└── README.md          # Documentación del proyecto
```

## 🎨 Características del diseño

### Layout responsivo
- **Desktop**: Layout de 2 columnas con sidebar y contenido principal
- **Tablet**: Adaptación fluida con elementos reorganizados
- **Móvil**: Layout de 1 columna con navegación optimizada

### Sistema de paneles
- **Paneles con bordes de color**: Verde, naranja, morado y rojo
- **Esquinas redondeadas**: Diseño moderno y profesional
- **Sombras sutiles**: Profundidad visual sin sobrecargar
- **Tipografía escalable**: Tamaños optimizados por dispositivo

### Exportación PDF
- **3 páginas optimizadas**: Distribución inteligente del contenido
- **Replica diseño web**: Mantiene paneles, colores y estructura
- **Formato carta**: 8.5" x 11" con márgenes profesionales
- **Alta calidad**: Elementos vectoriales y tipografía nítida

## 🖨️ Funcionalidad PDF

El CV incluye un sistema avanzado de exportación a PDF que:

1. **Replica el diseño web**: Mantiene paneles, colores y estructura
2. **Distribución inteligente**: 3 páginas con contenido optimizado
3. **Calidad profesional**: Tipografía nítida y elementos vectoriales
4. **Sin dependencias del servidor**: Funciona completamente en el cliente

### Páginas del PDF:
- **Página 1**: Header + README + inicio de experiencia
- **Página 2**: Tech Stack + Education + Languages
- **Página 3**: Additional Skills + Release Notes

## 🚀 Despliegue

### Desarrollo local
```bash
npm run dev
# Servidor disponible en puerto automático
```

### Producción
```bash
npm start
# Optimizado para entornos de producción
```

### Variables de entorno
```bash
PORT=3000          # Puerto del servidor (opcional)
NODE_ENV=production # Entorno de ejecución
```

## 📧 Contacto

**Edgar González Zapata**
- 📧 Email: edgargonzalezapata@gmail.com
- 💼 LinkedIn: [linkedin.com/in/edgargonzalezapata](https://linkedin.com/in/edgargonzalezapata)
- 🐙 GitHub: [github.com/edgargonzalezapata](https://github.com/edgargonzalezapata)
- 🌐 Website: [sibb.cl](https://sibb.cl)

## 📄 Licencia

MIT License - Siéntete libre de usar este código como base para tu propio CV.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⭐ Si te gusta este proyecto

¡Dale una estrella ⭐ al repositorio para apoyar el desarrollo!

---

*Desarrollado con ❤️ por Edgar González Zapata*