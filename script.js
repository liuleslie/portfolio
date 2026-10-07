// Sticky header: keep scroll-padding-top in sync with its live height so
// keyboard focus and anchor jumps aren't scrolled to a spot hidden behind it
(function () {
    const header = document.querySelector('header.sticky');
    if (!header) return;

    const root = document.documentElement;
    const isSticky = () => getComputedStyle(header).position === 'sticky';
    const update = () => root.style.setProperty('--header-h', isSticky() ? header.offsetHeight + 'px' : '0px');

    update();
    new ResizeObserver(update).observe(header);
    window.addEventListener('resize', update);
}());

// Small image galleries used in project case studies
(function () {
    document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
        const image = gallery.querySelector('.gallery-image');
        const caption = gallery.querySelector('.gallery-caption');
        const count = gallery.querySelector('.gallery-count');
        const slidesData = gallery.querySelector('.gallery-slides');
        const previous = gallery.querySelector('.gallery-prev');
        const next = gallery.querySelector('.gallery-next');
        if (!image || !caption || !count || !slidesData || !previous || !next) return;

        let slides;
        try { slides = JSON.parse(slidesData.textContent); }
        catch (error) { return; }
        if (!Array.isArray(slides) || slides.length < 2) return;

        let activeIndex = 0;
        function showSlide(index) {
            activeIndex = (index + slides.length) % slides.length;
            const slide = slides[activeIndex];
            image.src = slide.src;
            image.alt = slide.alt;
            caption.textContent = slide.caption;
            count.textContent = (activeIndex + 1) + ' of ' + slides.length;
        }

        previous.addEventListener('click', function () { showSlide(activeIndex - 1); });
        next.addEventListener('click', function () { showSlide(activeIndex + 1); });
        gallery.classList.add('gallery-ready');
        showSlide(0);
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
        // Require Alt/Option so this can't collide with screen-reader quick-nav
        // letters (g/l are reserved for graphic/list nav in NVDA & JAWS) or with
        // ordinary typing. Match on e.code, not e.key: on Mac, Option+G reports
        // e.key as "©" (the character it produces), not "g".
        if (!e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
        const target = e.target;
        if (target && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName))) return;
        if (e.code === 'KeyG') { e.preventDefault(); toggleGrid(); }
        else if (e.code === 'KeyL') { e.preventDefault(); toggleLayout(); }
    });

    controls.appendChild(gridBtn);
    controls.appendChild(layoutBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(controls);
}());
