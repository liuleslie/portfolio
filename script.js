// Animated details toggle for .header-bio
(function () {
    document.querySelectorAll('details.header-bio').forEach(function (el) {
        var summary = el.querySelector('summary');
        var anim = null;

        summary.addEventListener('click', function (e) {
            e.preventDefault();

            if (anim) { anim.cancel(); }

            if (!el.open) {
                el.setAttribute('open', '');
                var full = el.scrollHeight + 'px';
                anim = el.animate(
                    [{ height: summary.offsetHeight + 'px' }, { height: full }],
                    { duration: 380, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'none' }
                );
            } else {
                var from = el.scrollHeight + 'px';
                anim = el.animate(
                    [{ height: from }, { height: summary.offsetHeight + 'px' }],
                    { duration: 320, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'none' }
                );
                anim.onfinish = function () { el.removeAttribute('open'); };
            }
        });
    });
}());

// Dev controls — grid overlay (G) and layout inspector (L)
(function () {
    const COLS = 11;

    const overlay = document.createElement('div');
    overlay.id = 'grid-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < COLS; i++) {
        const col = document.createElement('div');
        col.className = 'grid-col';
        overlay.appendChild(col);
    }

    const controls = document.createElement('div');
    controls.id = 'dev-controls';
    controls.setAttribute('aria-label', 'Developer tools');

    const gridBtn = document.createElement('button');
    gridBtn.id = 'grid-toggle';
    gridBtn.textContent = 'Grid';
    gridBtn.setAttribute('aria-pressed', 'false');

    const layoutBtn = document.createElement('button');
    layoutBtn.id = 'layout-toggle';
    layoutBtn.textContent = 'Layout';
    layoutBtn.setAttribute('aria-pressed', 'false');

    function toggleGrid() {
        const on = document.body.classList.toggle('show-grid');
        gridBtn.setAttribute('aria-pressed', String(on));
    }

    function toggleLayout() {
        const on = document.body.classList.toggle('show-layout');
        layoutBtn.setAttribute('aria-pressed', String(on));
    }

    gridBtn.addEventListener('click', toggleGrid);
    layoutBtn.addEventListener('click', toggleLayout);

    document.addEventListener('keydown', function (e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === 'g' || e.key === 'G') toggleGrid();
        if (e.key === 'l' || e.key === 'L') toggleLayout();
    });

    controls.appendChild(gridBtn);
    controls.appendChild(layoutBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(controls);
}());
