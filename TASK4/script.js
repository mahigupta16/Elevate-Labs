(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  }

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    navMenu.classList.toggle('open', isOpen);
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);

    // Close on link click (better UX on mobile)
    navMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) closeMenu();
    });

    // Close on escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when resizing up to desktop
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) closeMenu();
      }, 120);
    });
  }
})();
