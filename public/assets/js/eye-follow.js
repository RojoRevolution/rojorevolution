document.addEventListener("DOMContentLoaded", () => {
    // The skull ("Mr. Bones") sits above the footer. Each eye is an inline SVG
    // whose dark pupil (.eye-translate) is clipped to a fixed socket ellipse.
    // Sliding the pupil OFF-CENTRE exposes a white crescent on the opposite
    // side, and that crescent is what reads as the gaze direction. So to "look"
    // toward the cursor we move the dark pupil AWAY from it, opening the gap on
    // the cursor's side. (Mouse up-and-right -> pupil slides down-and-left.)
    const eyes = Array.from(document.querySelectorAll(".eye-translate"));
    if (!eyes.length) return;

    // Decorative motion only, so honour a reduced-motion preference and bail.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Each pupil's stable frame of reference: its parent <svg>. We measure the
    // gaze from this (it never moves) rather than the pupil itself, otherwise
    // translating the pupil would shift the reading and cause it to drift.
    const sockets = eyes.map((el) => el.ownerSVGElement);

    // --- Geometry, in each SVG's own viewBox units (viewBox 0 0 70.5 108.87) ---
    // The clip socket is centred at (32.92, 54.43). The pupil is authored at
    // (40.58, 56.43): already nudged right so the skull starts out looking left.
    // We steer the pupil with a transform measured from the socket centre, so we
    // subtract that authored nudge (BAKED) to convert an offset into a transform.
    const SOCKET = { x: 32.92, y: 54.43 };
    const AUTHORED = { x: 40.58, y: 56.43 };
    const BAKED = { x: AUTHORED.x - SOCKET.x, y: AUTHORED.y - SOCKET.y }; // (7.66, 2.0)

    // How far the pupil may slide from centre. The socket is tall and narrow,
    // so a little extra vertical travel keeps the crescent readable.
    const AMP = { x: 11, y: 14 };
    // Distance (px) over which the gaze eases in; past it, full deflection.
    const FALLOFF = 220;
    // Per-frame approach toward the target (0..1); lower = lazier follow.
    const EASE = 0.18;
    // Snap-to-target threshold (viewBox units) used to end the animation loop.
    const SETTLE = 0.01;

    // Per-eye current + target pupil offset FROM the socket centre. Start both
    // at the authored offset so the eyes rest "looking left" until first moved.
    const state = eyes.map(() => ({ x: BAKED.x, y: BAKED.y }));
    const target = eyes.map(() => ({ x: BAKED.x, y: BAKED.y }));

    const pointer = { x: 0, y: 0, seen: false };
    let running = false;

    const recomputeTargets = () => {
        if (!pointer.seen) return;
        for (let i = 0; i < eyes.length; i++) {
            const rect = sockets[i].getBoundingClientRect();
            const dx = pointer.x - (rect.left + rect.width / 2);
            const dy = pointer.y - (rect.top + rect.height / 2);
            const dist = Math.hypot(dx, dy) || 1;
            const mag = Math.min(dist / FALLOFF, 1);
            // Negative: the pupil moves opposite the cursor so the exposed
            // crescent (the visible gaze) points toward it.
            target[i].x = (-dx / dist) * AMP.x * mag;
            target[i].y = (-dy / dist) * AMP.y * mag;
        }
    };

    const frame = () => {
        recomputeTargets();
        let moving = false;
        for (let i = 0; i < eyes.length; i++) {
            const s = state[i];
            const t = target[i];
            s.x += (t.x - s.x) * EASE;
            s.y += (t.y - s.y) * EASE;
            if (Math.max(Math.abs(t.x - s.x), Math.abs(t.y - s.y)) > SETTLE) {
                moving = true;
            } else {
                s.x = t.x;
                s.y = t.y;
            }
            // Undo the authored nudge so the transform is measured from centre.
            eyes[i].setAttribute("transform", `translate(${s.x - BAKED.x} ${s.y - BAKED.y})`);
        }
        running = moving;
        if (moving) requestAnimationFrame(frame);
    };

    const kick = () => {
        if (running) return;
        running = true;
        requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.seen = true;
        kick();
    }, { passive: true });

    // The skull lives at the very bottom of the page, so scrolling or resizing
    // moves the eyes relative to a stationary cursor: re-run the loop for those.
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
});
