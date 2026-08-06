document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic for FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other items
            const currentActive = document.querySelector('.accordion-header.active');
            if (currentActive && currentActive !== header) {
                currentActive.classList.remove('active');
                currentActive.nextElementSibling.style.maxHeight = null;
            }

            // Toggle current item
            header.classList.toggle('active');
            const content = header.nextElementSibling;

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
    }

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Local Portfolio Dataset Fallback
    const localPortfolios = [
        {
            id: "1",
            category: "COMPANY PROFILE",
            title: "PT. SRIWIJAYA TEKNIK UTAMA",
            description: "PT. Sriwijaya Teknik Utama (STU) adalah perusahaan fabrikasi, perbaikan, dan engineering terkemuka yang berbasis di Samarinda, Kalimantan Timur. Didirikan untuk mendukung industri pertambangan dan alat berat, STU spesialis dalam layanan mesin, fabrikasi baja, rotating equipment, serta hydraulic hose.",
            tags: "WordPress, WooCommerce",
            image: "assets/portfolios/1772984600_STU.png",
            portfolio_link: "https://www.pt-stu.co.id/"
        },
        {
            id: "2",
            category: "TOKO ONLINE",
            title: "DOOREN'Z PERCETAKAN",
            description: "Doorenz Percetakan Samarinda adalah perusahaan yang bergerak di bidang jasa percetakan dengan pengalaman lebih dari satu dekade.",
            tags: "Wordpress, WooCoomerce",
            image: "assets/portfolios/1772984769_dooren.png",
            portfolio_link: "https://doorenzcreative.com/"
        },
        {
            id: "3",
            category: "LANDING PAGE",
            title: "DIGITAL RESUME",
            description: "I specialize in Web Development and Digital Marketing, creating innovative and responsive digital solutions to enhance brand awareness and conversions.",
            tags: "React, Tailwind",
            image: "assets/portfolios/1772984927_jef.png",
            portfolio_link: "https://jefri-orcin.vercel.app/"
        },
        {
            id: "69ad9b31e2937",
            category: "SISTEM INFORMASI",
            title: "ERP",
            description: "ERP (Enterprise Resource Planning) adalah sistem perangkat lunak terintegrasi yang digunakan perusahaan untuk mengelola dan mengotomatisasi proses bisnis inti—seperti keuangan, SDM, manufaktur, rantai pasok, dan penjualan—dalam satu basis data sentral. ERP meningkatkan efisiensi dan visibilitas data real-time untuk pengambilan keputusan yang lebih baik.",
            tags: "PHP, CSS, MySql",
            image: "assets/portfolios/1772985137_erp.png",
            portfolio_link: "https://demo.lovira.biz.id/"
        },
        {
            id: "69e61b57bc000",
            category: "CUSTOM",
            title: "JeffSender",
            description: "Whatsapp Automation",
            tags: "Whatsapp Bulk Sender",
            image: "assets/portfolios/1776687959_wasender.png",
            portfolio_link: "https://wa.doorenzcreative.com/"
        },
        {
            id: "6a2812c155481",
            category: "CUSTOM",
            title: "Digital Invitation",
            description: "Jasa Undangan Digital",
            tags: "Wordpress, Digital Invitation",
            image: "assets/portfolios/1781011137_undangan.png",
            portfolio_link: "https://lovira.biz.id/"
        }
    ];

    // Load Portfolios Dynamically (with offline fallback)
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {
        const renderPortfolios = (data) => {
            portfolioGrid.innerHTML = '';
            data.forEach(p => {
                const tagSpans = p.tags ? p.tags.split(',').map(t => `<span>${t.trim()}</span>`).join('') : '';

                const card = document.createElement('div');
                card.className = 'portfolio-card';

                const wrapLink = (content) => {
                    return p.portfolio_link
                        ? `<a href="${p.portfolio_link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">${content}</a>`
                        : content;
                };

                card.innerHTML = `
                    <div class="portfolio-image">
                        ${wrapLink(`<img src="${p.image}" alt="${p.title} - ${p.category} BorneoCodeLab" loading="lazy">`)}
                    </div>
                    <div class="portfolio-content">
                        <span class="tag">${p.category}</span>
                        ${wrapLink(`<h3>${p.title}</h3>`)}
                        <p>${p.description}</p>
                        <div class="tags">
                            ${tagSpans}
                        </div>
                    </div>
                `;
                portfolioGrid.appendChild(card);
            });
        };

        const loadPortfoliosData = async () => {
            const endpoints = ['admin/api', 'admin/api.php', 'admin/data/portfolios.json'];
            for (const url of endpoints) {
                try {
                    const res = await fetch(url);
                    if (!res.ok) continue;
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        renderPortfolios(data);
                        return;
                    }
                } catch (e) {
                    // try next endpoint on error
                }
            }
            // Fallback to local dataset if all endpoints fail
            renderPortfolios(localPortfolios);
        };

        loadPortfoliosData();
    }

    // AI / WhatsApp Chatbot Logic
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');

    if (chatbotToggleBtn) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
    }

    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    const sendToWhatsApp = (text) => {
        const phoneNumber = '6282354506569';
        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        window.open(waUrl, '_blank');
        chatbotInput.value = '';
        chatbotWindow.classList.remove('active');
    };

    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', () => {
            const text = chatbotInput.value.trim();
            if (text) sendToWhatsApp(text);
        });
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = chatbotInput.value.trim();
                if (text) sendToWhatsApp(text);
            }
        });
    }
});
