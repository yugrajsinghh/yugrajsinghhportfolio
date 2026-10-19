// ---------- Dark and light theme ----------

const themeButton = document.querySelector(".theme-toggle");

function applyTheme(theme) {
    const darkModeIsActive = theme === "dark";

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    if (!themeButton) {
        return;
    }

    themeButton.classList.toggle(
        "is-off",
        darkModeIsActive
    );

    themeButton.setAttribute(
        "aria-pressed",
        String(darkModeIsActive)
    );

    themeButton.setAttribute(
        "aria-label",
        darkModeIsActive
            ? "Turn on the light and use light mode"
            : "Turn off the light and use dark mode"
    );

    themeButton.setAttribute(
        "title",
        darkModeIsActive
            ? "Turn on the light"
            : "Turn off the light"
    );
}

let savedTheme = "light";

try {
    savedTheme =
        localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
    savedTheme = "light";
}

applyTheme(savedTheme);

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem(
                "portfolio-theme",
                newTheme
            );
        } catch (error) {
            // The theme still works if storage is unavailable.
        }
    });
}


// ---------- Mobile navigation ----------

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navigationLinks =
    document.querySelectorAll(".navigation a");

function closeMenu() {
    if (!menuButton || !navigation) {
        return;
    }

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation"
    );

    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

function toggleMenu() {
    if (!menuButton || !navigation) {
        return;
    }

    const menuIsOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
        "aria-expanded",
        String(!menuIsOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        menuIsOpen
            ? "Open navigation"
            : "Close navigation"
    );

    navigation.classList.toggle(
        "is-open",
        !menuIsOpen
    );

    document.body.classList.toggle(
        "menu-open",
        !menuIsOpen
    );
}

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

navigationLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
        closeMenu();
    }
});


// ---------- Current footer year ----------

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// ---------- Scroll entrance animations ----------

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
) {
    document.body.classList.add("animations-ready");

    const revealElements = document.querySelectorAll(
        `
        .hero-content,
        .hero-visual,
        .section-label,
        .section-heading,
        .two-column-layout,
        .profile-feature,
        .interest-card,
        .placeholder-item,
        .travel-card,
        .contact-section h2,
        .contact-section > p,
        .contact-actions
        `
    );

    revealElements.forEach(function (element, index) {
        element.classList.add("reveal-item");

        const delay = (index % 3) * 90;

        element.style.setProperty(
            "--reveal-delay",
            `${delay}ms`
        );
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}