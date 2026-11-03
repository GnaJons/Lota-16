(() => {
  document.querySelectorAll('details[data-ggj-exercise]').forEach(panel => {
    if (panel.dataset.ggjBound) return;
    panel.dataset.ggjBound = 'true';
    const frame = panel.querySelector('iframe[data-src]');
    if (!frame) return;
    const load = () => {
      if (panel.open && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
    };
    const fromLink = () => {
      if (location.hash === '#' + panel.id) { panel.open = true; load(); }
    };
    panel.addEventListener('toggle', load);
    document.querySelectorAll('a[href="#' + panel.id + '"]').forEach(link => {
      link.addEventListener('click', () => { panel.open = true; load(); });
    });
    window.addEventListener('hashchange', fromLink);
    window.addEventListener('message', event => {
      const sameOrigin = location.protocol === 'file:' ? event.origin === 'null' : event.origin === location.origin;
      if (!sameOrigin || event.source !== frame.contentWindow) return;
      if (event.data?.type !== 'ggj-exercise-height' || !Number.isFinite(event.data.height)) return;
      frame.style.height = Math.max(400, Math.min(6000, Math.ceil(event.data.height))) + 'px';
    });
    fromLink(); load();
  });
})();
