// Funcionalidad para el sitio web CV
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll para navegación interna
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.experience-item, .skills-category, .education-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto hover mejorado para skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Función para imprimir CV (botón opcional)
    window.printCV = function () {
        window.print();
    };

    // Función mejorada para exportar a PDF usando el backend (Puppeteer)
    window.exportToPDF = async function () {
        const btn = document.querySelector('.export-btn');
        const originalText = btn.innerHTML;

        try {
            btn.innerHTML = '⏳ Generando PDF...';
            btn.disabled = true;

            console.log('🔄 Solicitando PDF al servidor...');

            // Solicitar el PDF al endpoint del servidor
            const response = await fetch('/export-pdf');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || response.statusText);
            }

            // Convertir la respuesta a Blob
            const blob = await response.blob();

            // Crear URL para descarga
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Edgar_Gonzalez_Zapata_CV.pdf';

            document.body.appendChild(a);
            a.click();

            // Limpieza
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            console.log('✅ PDF descargado exitosamente');

        } catch (error) {
            console.error('❌ Error exportando PDF:', error);
            alert(`Hubo un error al generar el PDF: ${error.message}`);
        } finally {
            // Restaurar botón
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    };

    console.log('✅ CV cargado exitosamente');
});
