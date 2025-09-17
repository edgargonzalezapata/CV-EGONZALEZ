// Funcionalidad para el sitio web CV
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para navegación interna
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Función para imprimir CV (botón opcional)
    window.printCV = function() {
        window.print();
    };

    // Función para exportar a PDF replicando el diseño web
    window.exportToPDF = async function() {
        const btn = document.querySelector('.export-btn');
        const originalText = btn.innerHTML;

        try {
            btn.innerHTML = '⏳ Generando PDF con diseño web...';
            btn.disabled = true;
            btn.style.display = 'none';

            console.log('🔄 Iniciando generación de PDF con diseño web...');

            // Crear PDF en formato carta
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            // Dimensiones de la página carta
            const pageWidth = 8.5;
            const pageHeight = 11;
            const margin = 0.3;
            const contentWidth = pageWidth - (margin * 2);
            const contentHeight = pageHeight - (margin * 2);

            // Dimensiones del layout 2-columnas (como en web)
            const sidebarWidth = 2.5;
            const mainWidth = contentWidth - sidebarWidth - 0.2;
            const headerHeight = 1.8;

            // Función auxiliar para crear paneles como en la web
            function createPanel(x, y, width, height, borderColor, bgColor = [255, 255, 255]) {
                // Fondo del panel
                pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
                pdf.roundedRect(x, y, width, height, 0.05, 0.05, 'F');

                // Borde del panel
                pdf.setDrawColor(209, 217, 224);
                pdf.setLineWidth(0.01);
                pdf.roundedRect(x, y, width, height, 0.05, 0.05, 'S');

                // Borde izquierdo de color
                if (borderColor) {
                    pdf.setFillColor(borderColor[0], borderColor[1], borderColor[2]);
                    pdf.roundedRect(x, y, 0.03, height, 0.02, 0.02, 'F');
                }
            }

            function createSectionTitle(text, x, y, maxWidth) {
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(36, 41, 47);
                pdf.text('## ', x, y);
                pdf.setTextColor(35, 134, 54);
                pdf.text('## ', x, y);
                pdf.setTextColor(36, 41, 47);
                pdf.text(text, x + 0.2, y);

                // Línea naranja bajo el título
                pdf.setLineWidth(0.02);
                pdf.setDrawColor(253, 126, 20);
                pdf.line(x, y + 0.05, x + maxWidth, y + 0.05);
            }

            // PÁGINA 1
            console.log('📄 Generando página 1 - Layout con paneles...');

            // HEADER - Replicando el diseño web
            pdf.setFillColor(31, 41, 55);
            pdf.rect(0, 0, pageWidth, headerHeight, 'F');

            // Línea de gradiente superior
            pdf.setFillColor(35, 134, 54); pdf.rect(0, 0, pageWidth/3, 0.03, 'F');
            pdf.setFillColor(124, 58, 237); pdf.rect(pageWidth/3, 0, pageWidth/3, 0.03, 'F');
            pdf.setFillColor(220, 38, 38); pdf.rect(2*pageWidth/3, 0, pageWidth/3, 0.03, 'F');

            // Nombre y título en header
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'bold');
            pdf.text('EDGAR GONZÁLEZ ZAPATA', margin, 0.5);

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(139, 148, 158);
            pdf.text('Full Stack Developer | Mobile & Web Specialist | Azure Cloud', margin, 0.75);

            // Información de contacto compacta
            pdf.setFontSize(8);
            pdf.setTextColor(240, 246, 252);
            const contactItems = [
                '> edgargonzalezapata@gmail.com',
                '> +56 9 48422623',
                '> linkedin.com/in/edgargonzalezapata',
                '> sibb.cl',
                '> github.com/edgargonzalezapata',
                '> Región del Biobío, Chile'
            ];

            let contactX = margin;
            let contactY = 1.0;
            contactItems.forEach((item, i) => {
                if (i === 3) { contactX = margin; contactY += 0.12; }
                pdf.text(item, contactX, contactY);
                contactX += i < 3 ? 2.7 : 2.4;
            });

            // Stats bar
            pdf.setTextColor(35, 134, 54);
            pdf.setFontSize(7);
            pdf.text('● 8+ años experiencia   ● Fundador sibb.cl   ● Disponible remoto', margin, 1.6);

            // LAYOUT DE 2 COLUMNAS (como en web)
            let currentY = headerHeight + 0.1;

            // SIDEBAR - Panel README
            createPanel(margin, currentY, sidebarWidth, 1.5, [35, 134, 54], [246, 248, 250]);
            createSectionTitle('README.md', margin + 0.1, currentY + 0.25, sidebarWidth - 0.2);

            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            const profileText = `Ingeniero en Informática con más de 8 años de experiencia desarrollando software a medida y Fundador de sibb.cl.

Especializado en desarrollo móvil con Flutter/Kotlin y backends robustos con .NET Core. En transición hacia tecnologías React/Next.js para ampliar stack Full Stack.`;

            pdf.text(profileText, margin + 0.15, currentY + 0.5, {
                maxWidth: sidebarWidth - 0.3,
                align: 'justify',
                lineHeightFactor: 1.4
            });

            // CONTENIDO PRINCIPAL - Panel Commits History
            const mainX = margin + sidebarWidth + 0.2;
            createPanel(mainX, currentY, mainWidth, 3.5, [253, 126, 20], [246, 248, 250]);
            createSectionTitle('Commits History', mainX + 0.1, currentY + 0.25, mainWidth - 0.2);

            // Experiencia SIBB.CL
            currentY += 0.7;
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('Fundador & CTO / Desarrollador Full Stack Senior', mainX + 0.1, currentY);

            pdf.setFontSize(9);
            pdf.setTextColor(9, 105, 218);
            pdf.text('SIBB.CL – Soluciones Informáticas Bio Bio SPA', mainX + 0.1, currentY + 0.15);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            pdf.text('2020 - Present', mainX + 0.1, currentY + 0.3);

            currentY += 0.5;
            pdf.setFontSize(8);
            const sibbDesc = `Como Fundador y CTO de Soluciones Informáticas Bio Bio, he liderado el desarrollo de soluciones tecnológicas integrales para diversos sectores industriales.`;
            pdf.text(sibbDesc, mainX + 0.1, currentY, {
                maxWidth: mainWidth - 0.2,
                align: 'justify',
                lineHeightFactor: 1.3
            });

            // Proyecto destacado FERIAS BIO BÍO
            currentY += 0.5;
            pdf.setFillColor(255, 248, 220);
            pdf.roundedRect(mainX + 0.1, currentY, mainWidth - 0.2, 0.3, 0.02, 0.02, 'F');
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('🚀 SISTEMA DE PRODUCCIÓN – FERIAS BIO BÍO', mainX + 0.15, currentY + 0.15);

            // PÁGINA 2 - SKILLS Y EDUCACIÓN CON PANELES
            pdf.addPage();
            console.log('📄 Generando página 2 - Skills y Educación...');
            currentY = margin;

            // SIDEBAR - Panel Tech Stack (como en web)
            createPanel(margin, currentY, sidebarWidth, 8.5, [35, 134, 54], [246, 248, 250]);
            createSectionTitle('Tech Stack', margin + 0.1, currentY + 0.25, sidebarWidth - 0.2);

            let skillY = currentY + 0.55;

            // Skills categories con paneles internos
            const skillCategories = [
                {
                    title: 'Frontend Development',
                    skills: ['Flutter', 'Kotlin', 'Android Java', 'MAUI .NET', 'ASP.NET', 'React.js', 'Next.js', 'TypeScript']
                },
                {
                    title: 'Backend Development',
                    skills: ['.NET Core', 'ASP.NET', 'C#', 'Java', 'APIs RESTful', 'GraphQL', 'Web Services']
                },
                {
                    title: 'Databases',
                    skills: ['SQL Server', 'Azure SQL', 'MySQL', 'Firebase', 'PostgreSQL', 'MongoDB']
                },
                {
                    title: 'Cloud & DevOps',
                    skills: ['Firebase', 'Azure Platform', 'Azure DevOps', 'GitHub Actions', 'CI/CD', 'Git']
                },
                {
                    title: 'Architecture & Integration',
                    skills: ['Microservices', 'Clean Architecture', 'API Integration', 'ERP Integration']
                }
            ];

            skillCategories.forEach(category => {
                // Panel interno para cada categoría
                createPanel(margin + 0.1, skillY, sidebarWidth - 0.2, 1.2, null, [255, 255, 255]);

                pdf.setFontSize(8);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(36, 41, 47);
                pdf.text('├─ ' + category.title, margin + 0.15, skillY + 0.2);

                let tagX = margin + 0.2;
                let tagY = skillY + 0.4;
                let lineHeight = 0;

                category.skills.forEach(skill => {
                    const tagWidth = skill.length * 0.045 + 0.12;

                    if (tagX + tagWidth > margin + sidebarWidth - 0.2) {
                        tagX = margin + 0.2;
                        lineHeight += 0.18;
                    }

                    // Skill tag
                    pdf.setFillColor(35, 134, 54);
                    pdf.roundedRect(tagX, tagY + lineHeight - 0.05, tagWidth, 0.12, 0.02, 0.02, 'F');
                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(6);
                    pdf.text(skill, tagX + 0.03, tagY + lineHeight + 0.02);

                    tagX += tagWidth + 0.05;
                });

                skillY += 1.35;
            });

            // CONTENIDO PRINCIPAL - Panel Education y Languages
            const mainX2 = margin + sidebarWidth + 0.2;

            // Panel Education
            createPanel(mainX2, currentY, mainWidth, 2.5, [124, 58, 237], [255, 255, 255]);
            createSectionTitle('Education', mainX2 + 0.1, currentY + 0.25, mainWidth - 0.2);

            let eduY = currentY + 0.6;
            const education = [
                {
                    degree: 'Ingeniero en Informática',
                    institution: 'Instituto Profesional San Sebastián',
                    year: '2022 - 2023'
                },
                {
                    degree: 'Analista Programador',
                    institution: 'Instituto Profesional Virginio Gómez',
                    year: '2012 - 2013'
                },
                {
                    degree: 'Certificación Android Developer',
                    institution: 'Next University',
                    year: 'Certificado'
                }
            ];

            education.forEach(edu => {
                // Panel interno para cada educación
                createPanel(mainX2 + 0.1, eduY, mainWidth - 0.2, 0.6, [124, 58, 237], [255, 255, 255]);

                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(36, 41, 47);
                pdf.text(edu.degree, mainX2 + 0.15, eduY + 0.2);

                pdf.setFontSize(8);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(9, 105, 218);
                pdf.text(edu.institution, mainX2 + 0.15, eduY + 0.35);

                pdf.setTextColor(101, 109, 118);
                pdf.text(edu.year, mainX2 + 0.15, eduY + 0.5);

                eduY += 0.75;
            });

            // Panel Languages
            eduY += 0.3;
            createPanel(mainX2, eduY, mainWidth, 1.2, [35, 134, 54], [255, 255, 255]);
            createSectionTitle('Languages', mainX2 + 0.1, eduY + 0.25, mainWidth - 0.2);

            // Español
            createPanel(mainX2 + 0.1, eduY + 0.5, mainWidth - 0.2, 0.25, null, [255, 255, 255]);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('Español', mainX2 + 0.15, eduY + 0.65);

            pdf.setFillColor(35, 134, 54);
            pdf.roundedRect(mainX2 + mainWidth - 0.7, eduY + 0.55, 0.5, 0.15, 0.05, 0.05, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(7);
            pdf.text('Native', mainX2 + mainWidth - 0.6, eduY + 0.64);

            // English
            createPanel(mainX2 + 0.1, eduY + 0.8, mainWidth - 0.2, 0.25, null, [255, 255, 255]);
            pdf.setTextColor(36, 41, 47);
            pdf.setFont('helvetica', 'bold');
            pdf.text('English', mainX2 + 0.15, eduY + 0.95);

            pdf.setFillColor(35, 134, 54);
            pdf.roundedRect(mainX2 + mainWidth - 0.5, eduY + 0.85, 0.3, 0.15, 0.05, 0.05, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.text('A1', mainX2 + mainWidth - 0.42, eduY + 0.94);

            // PÁGINA 3 - ADDITIONAL SKILLS
            pdf.addPage();
            console.log('📄 Generando página 3 - Additional Skills...');
            currentY = margin;

            // Panel Additional Skills (ancho completo como en web)
            createPanel(margin, currentY, contentWidth, 3.5, [220, 38, 38], [246, 248, 250]);
            createSectionTitle('Additional Skills', margin + 0.1, currentY + 0.25, contentWidth - 0.2);

            // System Integration
            let infoY = currentY + 0.6;
            createPanel(margin + 0.1, infoY, contentWidth - 0.2, 0.8, null, [255, 255, 255]);

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('📌 System Integration', margin + 0.15, infoY + 0.2);

            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            const systemIntegrationText = `Servicios Gubernamentales: SII, SAG (Chile) • ERPs y sistemas contables • APIs de terceros y webhooks`;
            pdf.text(systemIntegrationText, margin + 0.15, infoY + 0.4, {
                maxWidth: contentWidth - 0.4,
                lineHeightFactor: 1.3
            });

            // Core Strengths
            infoY += 1.0;
            createPanel(margin + 0.1, infoY, contentWidth - 0.2, 0.8, null, [255, 255, 255]);

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('📌 Core Strengths', margin + 0.15, infoY + 0.2);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            const coreStrengthsText = `Pensamiento analítico y resolución de problemas complejos • Adaptabilidad y aprendizaje continuo • Organización y gestión eficiente del tiempo`;
            pdf.text(coreStrengthsText, margin + 0.15, infoY + 0.4, {
                maxWidth: contentWidth - 0.4,
                lineHeightFactor: 1.3
            });

            // Current Stack Migration
            infoY += 1.0;
            createPanel(margin + 0.1, infoY, contentWidth - 0.2, 0.8, null, [255, 255, 255]);

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('📌 Current Stack Migration', margin + 0.15, infoY + 0.2);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            pdf.text('Current: Flutter/.NET Core/SQL Server/Firebase', margin + 0.15, infoY + 0.4);
            pdf.text('Target 2025: React/Next.js + Python/Flask + Azure + Microservices', margin + 0.15, infoY + 0.55);

            // Panel Release Notes
            currentY += 4.0;
            createPanel(margin, currentY, contentWidth, 2.5, [253, 126, 20], [246, 248, 250]);
            createSectionTitle('Release Notes', margin + 0.1, currentY + 0.25, contentWidth - 0.2);

            // Availability Status
            infoY = currentY + 0.6;
            createPanel(margin + 0.1, infoY, (contentWidth - 0.3) / 2, 0.6, null, [255, 255, 255]);

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('📌 Availability Status', margin + 0.15, infoY + 0.2);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            pdf.text('🟢 Available for remote projects immediately', margin + 0.15, infoY + 0.4);

            // Personal Activities
            const personalX = margin + (contentWidth + 0.1) / 2;
            createPanel(personalX, infoY, (contentWidth - 0.3) / 2, 0.6, null, [255, 255, 255]);

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(36, 41, 47);
            pdf.text('📌 Personal Activities', personalX + 0.05, infoY + 0.2);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(101, 109, 118);
            pdf.text('Músico: guitarra, bajo y teclado', personalX + 0.05, infoY + 0.35);
            pdf.text('Esposo y padre dedicado', personalX + 0.05, infoY + 0.5);

            // Descargar PDF
            pdf.save('Edgar_Gonzalez_Zapata_CV.pdf');
            console.log('✅ PDF con diseño web replicado generado exitosamente');

        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            alert('Error al generar el PDF. Usando función de impresión como alternativa.');
            window.print();
        } finally {
            setTimeout(() => {
                btn.style.display = 'flex';
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        }
    };

    // Indicador de carga completa
    console.log('✅ CV cargado exitosamente');
    console.log('🚀 Sitio web responsivo activado');
});