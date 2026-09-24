
/* =========================================================
   VIRAT FEEDS - HOME PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= HERO IMAGE SLIDER ================= */

const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 1) {

    let currentSlide = 0;

    setInterval(() => {

        heroSlides[currentSlide].classList.remove("active");

        currentSlide =
            (currentSlide + 1) % heroSlides.length;

        heroSlides[currentSlide].classList.add("active");

    }, 5000);

}

    /* ================= HEADER ================= */

    const header = document.getElementById("siteHeader");

    const updateHeader = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                mainNav.classList.contains("open") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* ================= REVEAL ANIMATION ================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".main-nav a"
    );

    const setActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (
                href &&
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    setActiveNavigation();

    window.addEventListener(
        "scroll",
        setActiveNavigation,
        { passive: true }
    );


    /* ================= SMOOTH ANCHOR SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 600) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        };

        updateBackToTop();

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= CURRENT YEAR ================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* ================= PRODUCT CARD HOVER ================= */

    const productCards =
        document.querySelectorAll(".product-card");

    productCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.willChange = "transform";
        });

        card.addEventListener("mouseleave", () => {
            card.style.willChange = "auto";
        });

    });


    /* ================= ESCAPE KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mainNav && menuToggle) {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });

});

