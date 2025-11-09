// Image2Prompt shadcn UI 风格交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    
    const languageRoutes = {
        index: { 'zh-CN': 'index.html', en: 'index-en.html' },
        features: { 'zh-CN': 'features.html', en: 'features-en.html' },
        guide: { 'zh-CN': 'guide.html', en: 'guide-en.html' }
    };
    
    // 初始化所有功能
    initParticleBackground();
    initScrollAnimations();
    initDemoFunctionality();
    initModelSelector();
    initStatsCounter();
    initTestimonialSlider();
    initTabNavigation();
    initSmoothScrolling();
    initLanguageSelector();
    initFAQToggle();
    
    // 粒子背景效果
    function initParticleBackground() {
        const particleContainer = document.getElementById('particle-bg');
        if (!particleContainer) return;
        
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;
        
        // 创建 canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        particleContainer.appendChild(canvas);
        
        // 设置 canvas 尺寸
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // 粒子类
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // 边界检测
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                
                // 鼠标交互
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.x -= dx * 0.0005;
                    this.y -= dy * 0.0005;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // 初始化粒子
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle());
        }
        
        // 动画循环
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // 绘制连接线
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${0.05 * (1 - distance / 120)})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    // 滚动动画
    function initScrollAnimations() {
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
        
        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll('.card, .step-card, .faq-item, .stats-card, .testimonial-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // 演示功能
    function initDemoFunctionality() {
        const demoButton = document.getElementById('demo-button');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const generatedPrompt = document.getElementById('generated-prompt');
        const copyButton = document.getElementById('copy-button');
        const openAIButton = document.getElementById('open-ai-button');
        const demoImage = document.getElementById('demo-image');
        
        if (!demoButton) return;
        
        const samplePrompts = [
            "A stunning cyberpunk cityscape at night with neon lights reflecting on wet streets, flying cars in the distance, and towering skyscrapers with holographic advertisements. The scene is captured in a cinematic wide-angle view with dramatic lighting and atmospheric fog.",
            "A beautiful fantasy forest with ancient trees, magical glowing mushrooms, and ethereal light filtering through the canopy. A mystical creature with luminescent wings sits on a moss-covered branch, surrounded by floating particles of light.",
            "A modern minimalist workspace with a sleek laptop, geometric planters with succulents, and natural lighting from large windows. The color palette features soft grays, whites, and touches of green from the plants.",
            "An abstract digital artwork featuring flowing liquid metal textures in silver and gold, with geometric patterns and light refractions creating dynamic visual effects against a dark background."
        ];
        
        let isDemoRunning = false;
        
        demoButton.addEventListener('click', function() {
            if (isDemoRunning) return;
            isDemoRunning = true;
            
            // 重置状态
            progressBar.style.transform = 'scaleX(0)';
            progressText.textContent = '准备中...';
            generatedPrompt.textContent = '正在分析图片内容...';
            
            // 模拟图片上传
            demoImage.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"><span class="text-white font-semibold text-lg">示例图片</span></div>';
            
            // 动画进度
            anime({
                targets: progressBar,
                scaleX: [0, 1],
                duration: 3000,
                easing: 'easeInOutQuad',
                update: function(anim) {
                    const progress = Math.round(anim.progress);
                    if (progress < 30) {
                        progressText.textContent = '上传图片...';
                    } else if (progress < 60) {
                        progressText.textContent = 'AI 分析中...';
                    } else if (progress < 90) {
                        progressText.textContent = '生成提示词...';
                    } else {
                        progressText.textContent = '完成！';
                    }
                },
                complete: function() {
                    // 显示生成的提示词
                    const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
                    generatedPrompt.textContent = randomPrompt;
                    
                    // 重置按钮状态
                    setTimeout(() => {
                        isDemoRunning = false;
                        demoButton.textContent = '重新演示';
                    }, 1000);
                }
            });
        });
        
        // 复制按钮
        if (copyButton) {
            copyButton.addEventListener('click', function() {
                const text = generatedPrompt.textContent;
                if (text && text !== '点击"开始演示"来生成您的第一个 AI 提示词...') {
                    navigator.clipboard.writeText(text).then(() => {
                        copyButton.textContent = '已复制！';
                        copyButton.classList.add('bg-green-600');
                        setTimeout(() => {
                            copyButton.textContent = '复制提示词';
                            copyButton.classList.remove('bg-green-600');
                        }, 2000);
                    });
                }
            });
        }
        
        // 打开 AI 平台按钮
        if (openAIButton) {
            openAIButton.addEventListener('click', function() {
                const text = generatedPrompt.textContent;
                if (text && text !== '点击"开始演示"来生成您的第一个 AI 提示词...') {
                    const encodedPrompt = encodeURIComponent(text);
                    window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, '_blank');
                }
            });
        }
    }
    
    // 模型选择器
    function initModelSelector() {
        const modelCards = document.querySelectorAll('.model-card');
        
        modelCards.forEach(card => {
            card.addEventListener('click', function() {
                // 移除所有 active 类
                modelCards.forEach(c => c.classList.remove('active'));
                // 添加 active 类到当前卡片
                this.classList.add('active');
                
                // 更新显示文本
                const modelType = this.dataset.model;
                const statusElement = this.querySelector('.mt-4 span');
                if (statusElement) {
                    statusElement.textContent = '✓ 当前选中';
                    statusElement.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800';
                }
                
                // 更新其他卡片状态
                modelCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        const otherStatus = otherCard.querySelector('.mt-4 span');
                        if (otherStatus) {
                            otherStatus.textContent = '点击切换';
                            otherStatus.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600';
                        }
                    }
                });
            });
        });
    }
    
    // 统计数字动画
    function initStatsCounter() {
        const statsNumbers = document.querySelectorAll('.stats-number, [data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.count || target.textContent);
                    
                    anime({
                        targets: { value: 0 },
                        value: finalValue,
                        duration: 2000,
                        easing: 'easeOutExpo',
                        update: function(anim) {
                            const currentValue = Math.round(anim.animatables[0].target.value);
                            if (target.dataset.count) {
                                target.textContent = currentValue.toLocaleString();
                            }
                        }
                    });
                    
                    observer.unobserve(target);
                }
            });
        });
        
        statsNumbers.forEach(stat => observer.observe(stat));
    }
    
    // 评价轮播
    function initTestimonialSlider() {
        const slider = document.getElementById('testimonial-slider');
        if (!slider) return;
        
        new Splide(slider, {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            gap: '2rem',
            breakpoints: {
                768: {
                    perPage: 1,
                }
            }
        }).mount();
    }
    
    // 标签页导航
    function initTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // 移除所有 active 类
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 添加 active 类到当前标签
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }
    
    // FAQ 切换
    function initFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item button');
        
        faqItems.forEach(button => {
            button.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('span:last-child');
                
                // 切换内容显示
                if (content.style.display === 'none' || !content.style.display) {
                    content.style.display = 'block';
                    icon.textContent = '−';
                } else {
                    content.style.display = 'none';
                    icon.textContent = '+';
                }
            });
        });
    }
    
    // 平滑滚动
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 语言选择器
    function initLanguageSelector() {
        const languageSelects = document.querySelectorAll('.language-select');
        if (!languageSelects.length) return;

        const defaultLanguage = 'zh-CN';
        const currentLanguage = document.body.dataset.language || defaultLanguage;
        const currentPage = document.body.dataset.page || 'index';

        const storedLanguage = localStorage.getItem('preferredLanguage');
        if (storedLanguage && storedLanguage !== currentLanguage && currentLanguage === defaultLanguage) {
            const storedRoute = languageRoutes[currentPage]?.[storedLanguage];
            if (storedRoute) {
                window.location.href = `${storedRoute}${window.location.hash || ''}`;
                return;
            }
        }

        languageSelects.forEach(select => {
            select.value = currentLanguage;
            select.addEventListener('change', (event) => {
                const targetLanguage = event.target.value;
                if (targetLanguage === currentLanguage) return;
                const targetRoute = languageRoutes[currentPage]?.[targetLanguage];
                if (targetRoute) {
                    localStorage.setItem('preferredLanguage', targetLanguage);
                    window.location.href = `${targetRoute}${window.location.hash || ''}`;
                }
            });
        });
    }
    
    // 导航栏背景效果
    const nav = document.querySelector('nav');
    if (nav) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
                nav.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // 按钮悬停效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // 标题动画
    const heroTitle = document.querySelector('h1');
    if (heroTitle && heroTitle.textContent.includes('一键将图片转换为')) {
        // 分割文本为字符
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        // 创建容器
        const container = document.createElement('div');
        container.innerHTML = text;
        heroTitle.appendChild(container);
        
        // 获取所有文本节点
        const textNodes = container.querySelectorAll('*');
        textNodes.forEach((node, index) => {
            if (node.textContent.trim()) {
                node.style.opacity = '0';
                node.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    anime({
                        targets: node,
                        opacity: 1,
                        translateY: 0,
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }, index * 100);
            }
        });
    }
    
    // 安装按钮点击事件
    const installButtons = document.querySelectorAll('.btn-primary');
    const installKeywords = ['立即安装', '安装扩展', '安装拓展'];
    installButtons.forEach(button => {
        const text = button.textContent.trim();
        if (installKeywords.some(keyword => text.includes(keyword))) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const targetHash = '#installation';
                const currentLanguage = document.body.dataset.language || 'zh-CN';
                const guidePage = currentLanguage === 'en' ? 'guide-en.html' : 'guide.html';
                const targetUrl = `${guidePage}${targetHash}`;
                
                const isGuidePage = window.location.pathname.endsWith('guide.html') ||
                    window.location.pathname.endsWith('/guide.html') ||
                    window.location.pathname.endsWith('guide-en.html') ||
                    window.location.pathname.endsWith('/guide-en.html');
                
                if (isGuidePage) {
                    if (window.location.hash !== targetHash) {
                        window.location.hash = targetHash;
                    }
                    const installSection = document.querySelector(targetHash);
                    if (installSection) {
                        installSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.location.href = targetUrl;
                }
            });
        }
    });
    
    console.log('Image2Prompt shadcn UI 风格落地页已加载完成！🚀');
});
