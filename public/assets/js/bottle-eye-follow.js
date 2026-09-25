document.addEventListener("DOMContentLoaded", () => {
    // Cursor tracking for the molotov bottle above the footer. Same idea as
    // eye-follow.js (the skull), but the mechanic is inverted and has a second
    // moving part, so it lives in its own file:
    //
    //   - the PUPIL moves TOWARD the cursor, travelling the whole eye white
    //     (the skull's pupil moved away, using the exposed crescent as the cue);
    //   - the white triangular glint (.reflection) is stretched into a long
    //     wedge whose THICK end points AWAY from the cursor. Its own
    //     pupil-shaped clip trims it to a pie-slice that reaches the pupil rim,
    //     so the white glint always joins up with the white of the eye.
    //
    // Both eyes live in one SVG (#bottle-eyes), unlike the skull's two.
    //
    // Clipping comes free from the nesting, which is why .pupil sits on the
    // inner <g> rather than the group carrying the eyeball clip:
    //
    //   g.cls-10 / .cls-15   clip = eyeball, never transformed -> clip stays put
    //     g.pupil            <- transformed; clipped by the eyeball above it
    //       ellipse          the black pupil
    //       g.cls-9 / .cls-8 clip = pupil; TRAVELS WITH .pupil
    //         .reflection    <- transformed; can never escape the pupil
    //
    // A userSpaceOnUse clip resolves in its element's *current* user space, so
    // the pupil-shaped clip inherits the .pupil translate for free.
    const eyeNodes = document.querySelectorAll("#bottle-eyes .eye");
    if (!eyeNodes.length) return;

    // Decorative motion only, so honour a reduced-motion preference and bail.
    // (Bailing here also leaves the artist's original small glint untouched,
    // since the wedge is only stretched further down in the active path.)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // --- Tunables ---------------------------------------------------------
    // Fraction of the available slack the pupil may use. Below 1 so a sliver of
    // white always shows at full deflection instead of the pupil kissing the
    // (stroked) eye outline.
    const SAFE = 0.88;
    // How far past the pupil radius the wedge's base is pushed, as a multiple of
    // the pupil's larger radius. Well over 1 so the base always sits outside the
    // pupil clip (even along the long axis) and the slice reaches the rim.
    const REACH = 2.4;
    // Share of the pupil's radius the whole wedge slides away from the cursor.
    // Small: the aim comes from rotation now, this is just a nudge of the point.
    const GLINT = 0.30;
    // Distance (px) over which the gaze eases in; past it, full deflection.
    // Also stops the eyes twitching when the cursor is right on the artwork.
    const FALLOFF = 260;
    // Per-frame approach toward the target (0..1); lower = lazier follow.
    const EASE = 0.18;
    // Snap-to-target thresholds used to end the animation loop.
    const SETTLE = 0.01;   // viewBox units
    const SETTLE_DEG = 0.05;
    // ----------------------------------------------------------------------

    const num = (el, name) => parseFloat(el.getAttribute(name));

    // Vertex list of a <polygon>. The export repeats the first vertex to close
    // the shape, so drop the duplicate before treating these as a triangle.
    const readPoints = (polygon) => {
        const nums = (polygon.getAttribute("points") || "")
            .trim().split(/[\s,]+/).map(Number).filter((n) => !Number.isNaN(n));
        const pts = [];
        for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
        if (pts.length > 1) {
            const first = pts[0];
            const last = pts[pts.length - 1];
            if (Math.abs(first[0] - last[0]) < 1e-6 && Math.abs(first[1] - last[1]) < 1e-6) pts.pop();
        }
        return pts;
    };

    // The glint is a wedge: two vertices close together form the base, the third
    // is the point. So the apex is the vertex opposite the SHORTEST side, and the
    // two base vertices are the rest. `openAxis` is the way the wedge widens
    // (apex -> base midpoint); the art has both eyes opening to the right.
    const describeWedge = (pts) => {
        if (pts.length !== 3) return null;
        const span = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const [a, b, c] = pts;
        const ranked = [
            { apex: a, base: [b, c], opposite: span(b, c) },
            { apex: b, base: [a, c], opposite: span(a, c) },
            { apex: c, base: [a, b], opposite: span(a, b) },
        ].sort((m, n) => m.opposite - n.opposite);
        const { apex, base } = ranked[0];
        const mid = [(base[0][0] + base[1][0]) / 2, (base[0][1] + base[1][1]) / 2];
        return { apex, base, openAxis: Math.atan2(mid[1] - apex[1], mid[0] - apex[0]) };
    };

    // Stretch the wedge along its own two edges so the base lands `reach` units
    // from the apex, keeping the apex and the wedge's half-angle exactly as the
    // artist drew them. The far base then always pokes outside the pupil clip,
    // which trims the wedge to a slice that meets the eye white at the rim.
    const stretchWedge = (wedge, reach) => {
        const extend = (p) => {
            const dx = p[0] - wedge.apex[0];
            const dy = p[1] - wedge.apex[1];
            const len = Math.hypot(dx, dy) || 1;
            return [wedge.apex[0] + (dx / len) * reach, wedge.apex[1] + (dy / len) * reach];
        };
        return [wedge.apex, extend(wedge.base[0]), extend(wedge.base[1])];
    };

    const eyes = [];
    eyeNodes.forEach((eyeEl) => {
        const ball = eyeEl.querySelector(".eyeball");
        const pupilGroup = eyeEl.querySelector(".pupil");
        if (!ball || !pupilGroup) return;
        const pupilEllipse = pupilGroup.querySelector("ellipse");
        if (!pupilEllipse) return;
        const reflection = pupilGroup.querySelector(".reflection");

        // Geometry is read from the art itself (never hardcoded) so the effect
        // survives the SVG being re-exported with nudged shapes.
        const ballGeo = { cx: num(ball, "cx"), cy: num(ball, "cy"), rx: num(ball, "rx"), ry: num(ball, "ry") };
        const pupGeo = { cx: num(pupilEllipse, "cx"), cy: num(pupilEllipse, "cy"), rx: num(pupilEllipse, "rx"), ry: num(pupilEllipse, "ry") };

        let wedge = reflection ? describeWedge(readPoints(reflection)) : null;
        if (wedge) {
            // Lengthen the wedge once, up front, and write the longer triangle
            // back to the DOM. Per frame we then only rotate + nudge it.
            const stretched = stretchWedge(wedge, Math.max(pupGeo.rx, pupGeo.ry) * REACH);
            reflection.setAttribute("points", stretched.map((p) => p.join(" ")).join(" "));
        }

        eyes.push({
            ball,
            pupilGroup,
            reflection,
            ballGeo,
            pupGeo,
            wedge,
            // How far the pupil centre may stray from the eye centre, per axis.
            travel: { x: (ballGeo.rx - pupGeo.rx) * SAFE, y: (ballGeo.ry - pupGeo.ry) * SAFE },
            glintTravel: { x: pupGeo.rx * GLINT, y: pupGeo.ry * GLINT },
            // Live + wanted pupil offset FROM THE EYE CENTRE. Seeded with the
            // artist's authored offset (down-left) so the first cursor move
            // eases out of that pose rather than snapping away from it.
            pupil: { x: pupGeo.cx - ballGeo.cx, y: pupGeo.cy - ballGeo.cy },
            pupilWant: { x: pupGeo.cx - ballGeo.cx, y: pupGeo.cy - ballGeo.cy },
            glint: { x: 0, y: 0 },
            glintWant: { x: 0, y: 0 },
            spin: 0,
            spinWant: 0,
        });
    });
    if (!eyes.length) return;

    const pointer = { x: 0, y: 0, seen: false };
    let running = false;

    const recomputeTargets = () => {
        if (!pointer.seen) return;
        eyes.forEach((eye) => {
            // Measure from the eyeball ellipse: it is never transformed, so it
            // stays a stable frame of reference. Measuring from the pupil would
            // feed its own movement back in and make the gaze drift.
            const rect = eye.ball.getBoundingClientRect();
            const dx = pointer.x - (rect.left + rect.width / 2);
            const dy = pointer.y - (rect.top + rect.height / 2);
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;
            const mag = Math.min(dist / FALLOFF, 1);

            // Pupil: toward the cursor, anchored at the EYE centre so a cursor
            // straight above sends it to the top of the white.
            eye.pupilWant.x = ux * eye.travel.x * mag;
            eye.pupilWant.y = uy * eye.travel.y * mag;

            if (!eye.wedge) return;
            // Glint: nudge the whole wedge to the far side of the pupil...
            eye.glintWant.x = -ux * eye.glintTravel.x * mag;
            eye.glintWant.y = -uy * eye.glintTravel.y * mag;
            // ...and swing it so it WIDENS away from the cursor (thick base on
            // the far side, point toward the cursor). Cursor above -> wedge
            // opens downward, so the white slice sits along the bottom rim.
            const away = Math.atan2(-uy, -ux);
            eye.spinWant = ((away - eye.wedge.openAxis) * 180) / Math.PI;
        });
    };

    const frame = () => {
        recomputeTargets();
        let moving = false;

        eyes.forEach((eye) => {
            eye.pupil.x += (eye.pupilWant.x - eye.pupil.x) * EASE;
            eye.pupil.y += (eye.pupilWant.y - eye.pupil.y) * EASE;
            let residual = Math.max(
                Math.abs(eye.pupilWant.x - eye.pupil.x),
                Math.abs(eye.pupilWant.y - eye.pupil.y)
            );
            if (residual <= SETTLE) {
                eye.pupil.x = eye.pupilWant.x;
                eye.pupil.y = eye.pupilWant.y;
            }

            // Offset is held relative to the eye centre; the transform has to be
            // relative to the pupil's authored position, so subtract that out.
            const px = eye.ballGeo.cx + eye.pupil.x - eye.pupGeo.cx;
            const py = eye.ballGeo.cy + eye.pupil.y - eye.pupGeo.cy;
            eye.pupilGroup.setAttribute("transform", `translate(${px.toFixed(3)} ${py.toFixed(3)})`);

            let spinResidual = 0;
            if (eye.wedge) {
                eye.glint.x += (eye.glintWant.x - eye.glint.x) * EASE;
                eye.glint.y += (eye.glintWant.y - eye.glint.y) * EASE;

                // Take the short way round, or the wedge does a full spin every
                // time the cursor crosses the +/-180deg seam (directly left).
                let delta = eye.spinWant - eye.spin;
                delta -= Math.round(delta / 360) * 360;
                spinResidual = Math.abs(delta);
                eye.spin += delta * EASE;

                const glintResidual = Math.max(
                    Math.abs(eye.glintWant.x - eye.glint.x),
                    Math.abs(eye.glintWant.y - eye.glint.y)
                );
                if (glintResidual <= SETTLE) {
                    eye.glint.x = eye.glintWant.x;
                    eye.glint.y = eye.glintWant.y;
                }
                residual = Math.max(residual, glintResidual);

                // Rotate the stretched wedge about its apex to aim it, then nudge
                // the whole thing. The apex stays near the pupil centre, the far
                // base stays outside the clip, so the slice always touches the
                // rim -> the glint stays joined to the white of the eye.
                eye.reflection.setAttribute(
                    "transform",
                    `translate(${eye.glint.x.toFixed(3)} ${eye.glint.y.toFixed(3)}) ` +
                    `rotate(${eye.spin.toFixed(2)} ${eye.wedge.apex[0]} ${eye.wedge.apex[1]})`
                );
            }

            if (residual > SETTLE || spinResidual > SETTLE_DEG) moving = true;
        });

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

    // The bottle sits at the very bottom of a tall page, so scrolling or
    // resizing moves the eyes relative to a stationary cursor.
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
});
