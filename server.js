const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 0; // 0 = puerto automático disponible

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para el CV (misma que la principal)
app.get('/cv', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para exportar PDF
app.get('/export-pdf', async (req, res) => {
    try {
        console.log('🔄 Iniciando generación de PDF...');

        const browser = await puppeteer.launch({
            headless: true, // Modo legacy para mayor estabilidad en Windows
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--no-first-run'
            ]
        });

        const page = await browser.newPage();

        // Cargar la plantilla de impresión dedicada
        const host = req.get('host');
        const url = `http://${host}/print.html`;

        console.log(`📄 Cargando Plantilla de Impresión desde: ${url}`);

        // Configurar viewport
        await page.setViewport({ width: 1200, height: 800 });

        await page.goto(url, {
            waitUntil: 'domcontentloaded', // Esperar menos tiempo, solo al DOM
            timeout: 60000
        });

        // Esperar que el contenido se cargue completamente
        await page.waitForSelector('header', { timeout: 10000 });

        // Esperar un momento para que se apliquen los estilos
        await new Promise(r => setTimeout(r, 1000));

        console.log('🎨 Generando PDF en formato carta...');

        // Generar PDF en formato carta
        const pdf = await page.pdf({
            format: 'Letter', // 8.5 x 11 inches
            printBackground: true,
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: false
        });

        await browser.close();

        console.log('✅ PDF generado exitosamente');

        // Guardar PDF en disco primero para asegurar integridad
        const fs = require('fs');
        const pdfPath = path.join(__dirname, 'public', 'cv_generated.pdf');
        fs.writeFileSync(pdfPath, pdf);

        console.log(`✅ PDF guardado en disco: ${pdfPath}`);

        // Enviar archivo usando métodos optimizados de Express
        res.download(pdfPath, 'Edgar_Gonzalez_Zapata_CV.pdf', (err) => {
            if (err) {
                console.error('❌ Error enviando archivo:', err);
            } else {
                console.log('📤 PDF enviado exitosamente al cliente');
                // Opcional: eliminar archivo después de enviar
                // fs.unlinkSync(pdfPath);
            }
        });

    } catch (error) {
        console.error('❌ Error generando PDF:', error);
        res.status(500).json({
            error: 'Error generando PDF',
            details: error.message
        });
    }
});

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1><p>La página que buscas no existe.</p><a href="/">Volver al CV</a>');
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    const actualPort = server.address().port;
    console.log(`🚀 Servidor iniciado en http://localhost:${actualPort}`);
    console.log(`✅ VERSIÓN ACTUALIZADA: 2.0 (Fix Wait v2)`);
    console.log(`📄 CV disponible en: http://localhost:${actualPort}`);
    console.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⚡ Puerto asignado automáticamente: ${actualPort}`);
});