// Shared behavior for every page: mobile menu, sidebar highlight, reveal on scroll,
// and small helpers for reading writing/posts.json.
(() => {
  const root = document.documentElement;

  // ---------- Mobile menu ----------
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open);
  };
  if (openBtn) openBtn.addEventListener('click', () => setMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));
  document.querySelectorAll('.menu nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---------- Sidebar highlight for in-page sections (links with class "track") ----------
  const links = [...document.querySelectorAll('.side a.track')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  if (links.length && sections.every(Boolean)) {
    let ticking = false;
    let pinned = -1; // a clicked link stays active until the reader scrolls on their own
    const setActive = (i) => links.forEach((a, k) => a.classList.toggle('active', k === i));
    links.forEach((a, i) => a.addEventListener('click', () => { pinned = i; setActive(i); }));
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((type) => addEventListener(type, () => { pinned = -1; }, { passive: true }));
    const update = () => {
      ticking = false;
      if (pinned >= 0) return;
      const atBottom = innerHeight + scrollY >= root.scrollHeight - 2;
      const line = Math.min(innerHeight * 0.35, 160);
      let current = 0;
      sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) current = i; });
      if (atBottom) current = sections.length - 1;
      setActive(current);
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();
  }

  // ---------- Fade content in as it scrolls into view ----------
  const io = new IntersectionObserver((entries) => {
    let n = 0;
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = (n++ * 80) + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  const reveal = (scope = document) => scope.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
  reveal();

  // ---------- Posts ----------
  const parseDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };
  // formatDate('2026-11-05') -> "Nov 5, 2026"; formatDate('2026-11-05', 'long') -> "November 5, 2026"
  const formatDate = (iso, month = 'short') =>
    new Intl.DateTimeFormat('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(parseDate(iso));

  // Newest first. Drafts are left out unless { drafts: true }.
  const loadPosts = async (url, { drafts = false } = {}) => {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
    const posts = await res.json();
    return posts
      .filter((p) => drafts || !p.draft)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  };

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Compact "title ... 2026-11-05" row, used on the home page and under each post
  const rowHtml = (p, href) =>
    `<li><a href="${escapeHtml(href)}"><span class="row-title">${escapeHtml(p.title)}</span>` +
    `<time class="meta" datetime="${escapeHtml(p.date)}">${escapeHtml(p.date)}</time></a></li>`;

  window.site = { reveal, loadPosts, formatDate, escapeHtml, rowHtml };
})();
