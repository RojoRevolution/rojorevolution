document.addEventListener("DOMContentLoaded", () => {
    const letsTalkShopContainer = document.querySelector(".bubble-flip");
    const genreText = document.getElementById("genre");
    const bandText = document.getElementById("band");

    const genres = ["heavy metal", "death metal", "black metal", "sludge metal"]
    const bands = ["Judas Priest", "Bolt Thrower", "Dark Throne", "Neurosis"]

    const insertFooterText = () => {
        let randomNumber = Math.floor(Math.random() * 3) + 1;
        genreText.innerHTML = genres[randomNumber];
        bandText.innerHTML = bands[randomNumber];
    }

    insertFooterText();

    // Bail out on the pages that don't include the footer contact markup
    // (see views/content/footer/contact.ejs — only 4 of 13 pages include it).
    if (!letsTalkShopContainer) return;

    // Desktop-only effect. Same breakpoint/pattern used in mediaqueries.css
    // and already established in labels.js.
    const mobileLayout = window.matchMedia('(max-width: 990px)');
    if (mobileLayout.matches) return;

    // --- Tunable constants (adjust to taste once you see it move) --------
    const SENSITIVITY = 0.6;            // deg of velocity added per px scrolled
    const MAX_VELOCITY = 18;            // deg/frame cap on angular velocity
    const FRICTION = 0.94;              // per-frame velocity decay
    const IDLE_MS = 140;                // ms with no scroll before "stopped"
    const SETTLE_EASE = 0.08;           // fraction of remaining angle closed/frame while settling
    const SNAP_ANGLE_EPSILON = 0.05;    // deg
    const SNAP_VELOCITY_EPSILON = 0.02; // deg/frame
    const PERSPECTIVE_PX = 1000;        // 3D depth for the rotateY flip

    // --- Animation state ---------------------------------------------------
    let angle = 0;
    let velocity = 0;
    let lastScrollY = window.scrollY;
    let isSettling = false;
    let idleTimer = null;
    let rafId = null;

    const applyTransform = () => {
        letsTalkShopContainer.style.transform =
            `perspective(${PERSPECTIVE_PX}px) rotateY(${angle}deg)`;
    };

    const tick = () => {
        if (isSettling) {
            const target = Math.round(angle / 360) * 360;
            const diff = target - angle;

            velocity *= FRICTION;
            angle += diff * SETTLE_EASE + velocity;

            if (Math.abs(diff) < SNAP_ANGLE_EPSILON && Math.abs(velocity) < SNAP_VELOCITY_EPSILON) {
                angle = 0; // normalize back to the 0deg-equivalent resting state
                velocity = 0;
                applyTransform();
                rafId = null;
                return; // loop stops here; restarts on next scroll event
            }
        } else {
            angle += velocity;
            velocity *= FRICTION;
        }

        applyTransform();
        rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
        if (rafId === null) {
            rafId = requestAnimationFrame(tick);
        }
    };

    window.addEventListener('scroll', () => {
        if (mobileLayout.matches) return;

        const deltaY = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;

        velocity += deltaY * SENSITIVITY;
        velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));

        isSettling = false;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            isSettling = true;
        }, IDLE_MS);

        startLoop();
    });
});
