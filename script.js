/* ================================================================
   روستای چای‌باغ — فایل جاوااسکریپت اصلی
   سوادکوه شمالی · مازندران
   ================================================================ */

(function () {
    'use strict';

    /* ==================== DOM Elements ==================== */
    const siteHeader = document.getElementById('siteHeader');
    const mainNav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const backToTopBtn = document.getElementById('backToTop');
    const megaItems = document.querySelectorAll('.nav-item.has-mega');
    const mobileAccordionBtns = document.querySelectorAll('.mobile-accordion-btn');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    /* ==================== Sticky Header Scroll Effect ==================== */
    function handleHeaderScroll() {
        if (window.scrollY > 10) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    /* ==================== Back To Top ==================== */
    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==================== Combined Scroll Handler ==================== */
    var scrollTick = false;

    function onScroll() {
        if (!scrollTick) {
            window.requestAnimationFrame(function () {
                handleHeaderScroll();
                handleBackToTop();
                scrollTick = false;
            });
            scrollTick = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Run once on load */
    handleHeaderScroll();
    handleBackToTop();

    /* ==================== Mega Dropdown — Click Outside to Close ==================== */
    function closeAllMegas() {
        megaItems.forEach(function (item) {
            /* فقط کلاس را حذف می‌کنیم اگر با کلیک بسته شده باشد */
            /* در حالت عادی mega با hover کار می‌کند */
        });
    }

    document.addEventListener('click', function (e) {
        var isInsideMega = false;
        megaItems.forEach(function (item) {
            if (item.contains(e.target)) {
                isInsideMega = true;
            }
        });

        if (!isInsideMega) {
            /* با کلیک بیرون، هیچ عملی لازم نیست چون mega با hover باز/بسته می‌شود */
            /* این بخش برای آینده در صورت تغییر به click-based آماده است */
        }
    });

    /* ==================== Mega Dropdown — Keyboard Support ==================== */
    megaItems.forEach(function (item) {
        var link = item.querySelector('.nav-link');
        var mega = item.querySelector('.mega-dropdown');
        var megaLinks = mega ? mega.querySelectorAll('a') : [];

        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                /* در دسکتاپ hover فعال است، اما برای دسترسی‌پذیری فOCUS را مدیریت می‌کنیم */
                if (mega) {
                    var firstLink = mega.querySelector('a');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }
            }
        });

        /* بستن mega با Escape */
        megaLinks.forEach(function (mLink) {
            mLink.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    link.focus();
                }
            });
        });
    });

    /* ==================== Mobile Menu ==================== */
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        /* تمرکز روی اولین آیتم منو */
        var firstItem = mobileMenu.querySelector('.mobile-nav-link, .mobile-accordion-btn');
        if (firstItem) {
            setTimeout(function () {
                firstItem.focus();
            }, 300);
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        /* بستن تمام آکاردئون‌ها */
        var openAccordions = mobileMenu.querySelectorAll('.has-accordion.open');
        openAccordions.forEach(function (acc) {
            acc.classList.remove('open');
        });
    }

    mobileMenuBtn.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);

    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    /* بستن منوی موبایل با Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileMenuBtn.focus();
        }
    });

    /* ==================== Mobile Accordion ==================== */
    mobileAccordionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var parent = btn.closest('.has-accordion');
            var isOpen = parent.classList.contains('open');

            /* بستن سایر آکاردئون‌ها */
            var allAccordions = mobileMenu.querySelectorAll('.has-accordion.open');
            allAccordions.forEach(function (acc) {
                if (acc !== parent) {
                    acc.classList.remove('open');
                }
            });

            /* تاگل آکاردئون فعلی */
            if (isOpen) {
                parent.classList.remove('open');
            } else {
                parent.classList.add('open');
            }
        });
    });

    /* ==================== Smooth Scroll for Anchor Links ==================== */
    function handleSmoothScroll(e) {
        var href = this.getAttribute('href');
        if (!href) return;

        /* فقط لینک‌های داخلی با # */
        if (href.indexOf('#') === -1) return;

        /* اگر لینک به صفحه دیگر است (مثل introduction.html#history) اسکرول نکن */
        if (href.indexOf('.html') !== -1) return;

        var hashIndex = href.indexOf('#');
        var hash = href.substring(hashIndex);

        if (hash && hash !== '#') {
            var target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                var headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
                var elementPosition = target.getBoundingClientRect().top + window.scrollY;
                var offsetPosition = elementPosition - headerOffset - 16;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    /* اعمال روی تمام لینک‌ها */
    var allLinks = document.querySelectorAll('a[href*="#"]');
    allLinks.forEach(function (link) {
        link.addEventListener('click', handleSmoothScroll);
    });

    /* ==================== Scroll Animations (IntersectionObserver) ==================== */
    function initScrollAnimations() {
        /* اضافه کردن کلاس به عناصری که باید انیمیت شوند */
        var sections = document.querySelectorAll('.section');
        sections.forEach(function (section) {
            var animatableChildren = section.querySelectorAll(
                '.info-card, .content-card, .service-card, .product-card, ' +
                '.gallery-item, .news-card, .intro-image, .intro-content, ' +
                '.section-header, .section-footer, .cta-box'
            );
            animatableChildren.forEach(function (child) {
                child.classList.add('animate-on-scroll');
            });

            /* اضافه کردن stagger به grid ها */
            var grids = section.querySelectorAll('.glance-grid, .cards-grid, .gallery-grid');
            grids.forEach(function (grid) {
                grid.classList.add('stagger-children');
            });
        });

        /* به‌روزرسانی لیست عناصر */
        var allAnimated = document.querySelectorAll('.animate-on-scroll');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -40px 0px'
                }
            );

            allAnimated.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            /* فال‌بک برای مرورگرهای قدیمی */
            allAnimated.forEach(function (el) {
                el.classList.add('animated');
            });
        }
    }

    /* ==================== Active Menu Highlight ==================== */
    function setActiveMenu() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        /* حذف active از همه */
        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });
        mobileNavLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        /* تنظیم active بر اساس صفحه فعلی */
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href) return;
            var linkPage = href.split('#')[0];
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href) return;
            var linkPage = href.split('#')[0];
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /* ==================== Preloader Effect (Subtle) ==================== */
    function initPageLoad() {
        /* انیمیشن ظاهر شدن ملایم صفحه */
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';

        window.addEventListener('load', function () {
            document.body.style.opacity = '1';

            /* اجرای انیمیشن‌های اسکرول بعد از لود */
            setTimeout(function () {
                initScrollAnimations();
            }, 100);
        });

        /* فال‌بک اگر load اجرا نشد */
        setTimeout(function () {
            document.body.style.opacity = '1';
            initScrollAnimations();
        }, 1500);
    }

    /* ==================== Micro Interactions — Card Tilt Effect ==================== */
    function initCardTilt() {
        /* فقط در دسکتاپ */
        if (window.innerWidth < 1024) return;

        var cards = document.querySelectorAll('.content-card, .product-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;

                var rotateX = ((y - centerY) / centerY) * -2;
                var rotateY = ((x - centerX) / centerX) * 2;

                card.style.transform = 'translateY(-3px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    /* ==================== Image Lazy Load Fallback ==================== */
    function initLazyLoadFallback() {
        if ('loading' in HTMLImageElement.prototype) {
            /* مرورگر از lazy loading پشتیبانی می‌کند */
            return;
        }

        /* فال‌بک ساده با IntersectionObserver */
        var lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            var imgObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imgObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function (img) {
                imgObserver.observe(img);
            });
        } else {
            /* لود همه تصاویر */
            lazyImages.forEach(function (img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    /* ==================== Resize Handler ==================== */
    var resizeTimer;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            /* بستن منوی موبایل در صورت تغییر به دسکتاپ */
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }

            /* به‌روزرسانی افکت tilt */
            initCardTilt();
        }, 250);
    });

    /* ==================== Prevent Layout Shift on Font Load ==================== */
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
            document.body.classList.add('fonts-loaded');
        });
    }

    /* ==================== Accessibility — Focus Visible ==================== */
    function handleFocusVisible() {
        var interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]'
        );

        interactiveElements.forEach(function (el) {
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-nav');
                }
            });
        });

        document.addEventListener('mousedown', function () {
            document.body.classList.remove('keyboard-nav');
        });
    }

    /* ==================== Mega Dropdown — Position Correction ==================== */
    function correctMegaPosition() {
        if (window.innerWidth < 1024) return;

        megaItems.forEach(function (item) {
            var mega = item.querySelector('.mega-dropdown');
            if (!mega) return;

            var rect = item.getBoundingClientRect();
            var megaWidth = 780;

            if (window.innerWidth <= 1280) {
                megaWidth = 680;
            }

            /* بررسی فضای سمت راست و چپ */
            var spaceRight = window.innerWidth - rect.left;
            var spaceLeft = rect.right;

            /* اگر فضای کافی در وسط نیست، مگا را به سمت چپ یا راست شیفت دهیم */
            if (spaceRight < megaWidth / 2 + 20) {
                mega.style.right = '0';
                mega.style.left = 'auto';
                mega.style.transform = 'translateX(0) translateY(8px)';
                item.addEventListener('mouseenter', function () {
                    mega.style.transform = 'translateX(0) translateY(0)';
                });
            } else if (spaceLeft < megaWidth / 2 + 20) {
                mega.style.left = '0';
                mega.style.right = 'auto';
                mega.style.transform = 'translateX(0) translateY(8px)';
                item.addEventListener('mouseenter', function () {
                    mega.style.transform = 'translateX(0) translateY(0)';
                });
            }
        });
    }

    /* ==================== Utility — Debounce ==================== */
    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }

    /* ==================== Initialize Everything ==================== */
    function init() {
        setActiveMenu();
        initPageLoad();
        initLazyLoadFallback();
        handleFocusVisible();
        initCardTilt();

        /* اصلاح موقعیت مگا منو بعد از لود کامل */
        setTimeout(function () {
            correctMegaPosition();
        }, 500);

        /* اصلاح موقعیت مگا منو بعد از تغییر اندازه */
        window.addEventListener('resize', debounce(correctMegaPosition, 300));
    }

    /* ==================== DOM Ready ==================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
