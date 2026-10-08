/* ============================================================
   TEK-LIM MULTISERVI — main.js
   menú móvil · tipografía cinética · video lazy-load
   formulario→WhatsApp · eventos GA4
   (sin traducción en vivo: cada idioma es una página estática aparte;
   este archivo solo arma el mensaje de WhatsApp en el idioma de la
   página actual, vía document.documentElement.lang)
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '17868178904'; // WhatsApp / tel

  var WA_STRINGS = {
    es: {
      greeting: 'Hola TEK-LIM, quiero una cotización.',
      name: 'Nombre', phone: 'Teléfono', service: 'Servicio', detail: 'Detalle',
      err: 'Por favor completa tu nombre y teléfono.',
      svc: { alfombras: 'Alfombras', comercial: 'Comercial', residencial: 'Residencial', industrial: 'Industrial' }
    },
    en: {
      greeting: 'Hi TEK-LIM, I’d like a quote.',
      name: 'Name', phone: 'Phone', service: 'Service', detail: 'Details',
      err: 'Please fill in your name and phone.',
      svc: { alfombras: 'Carpets', comercial: 'Commercial', residencial: 'Residential', industrial: 'Industrial' }
    }
  };

  function currentLang() {
    return (document.documentElement.lang || 'es').slice(0, 2) === 'en' ? 'en' : 'es';
  }

  /* ---------------- Menú móvil ---------------- */
  function initMenu() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Cerrar al navegar
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Reveal + cinética al scroll ---------------- */
  function initObservers() {
    if (!('IntersectionObserver' in window)) {
      var all = document.querySelectorAll('.reveal');
      for (var k = 0; k < all.length; k++) all[k].classList.add('is-in');
      var kAll = document.querySelectorAll('[data-kinetic]');
      for (var m = 0; m < kAll.length; m++) kAll[m].classList.add('kin-in');
      return;
    }
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });

    var kinObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('kin-in'); kinObs.unobserve(e.target); }
      });
    }, { threshold: 0.55 });
    document.querySelectorAll('[data-kinetic]').forEach(function (el) { kinObs.observe(el); });
  }

  /* ---------------- Videos: solo cargar y reproducir al entrar en pantalla ---------------- */
  function initLazyVideos() {
    var videos = document.querySelectorAll('video[data-src]');
    if (!videos.length) return;

    function loadAndPlay(v) {
      if (v.dataset.loaded) return;
      v.dataset.loaded = '1';
      v.src = v.dataset.src;
      v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
      v.load();
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(loadAndPlay);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          loadAndPlay(v);
          if (v.dataset.loaded) v.play && v.play().catch(function () {});
        } else if (v.dataset.loaded) {
          v.pause();
        }
      });
    }, { threshold: 0.15, rootMargin: '200px 0px' });

    videos.forEach(function (v) { obs.observe(v); });
  }

  /* ---------------- Google Analytics 4: eventos ---------------- */
  function gaEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  function initGaClickTracking() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('wa.me') !== -1) {
        gaEvent('click_whatsapp', { link_url: href });
      } else if (href.indexOf('tel:') === 0) {
        gaEvent('click_tel', { link_url: href });
      } else if (href.indexOf('mailto:') === 0) {
        gaEvent('click_email', { link_url: href });
      }
    });
  }

  /* ---------------- Formulario → WhatsApp ---------------- */
  function initForm() {
    var form = document.getElementById('quote-form');
    var chipsBox = document.getElementById('service-chips');
    if (!chipsBox) return;
    var chips = chipsBox.querySelectorAll('.chip');
    var S = WA_STRINGS[currentLang()];

    function selectChip(chip) {
      chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-checked', 'false'); });
      chip.classList.add('is-active'); chip.setAttribute('aria-checked', 'true');
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { selectChip(c); });
    });

    // Preseleccionar servicio desde ?servicio=
    var params = new URLSearchParams(window.location.search);
    var pre = (params.get('servicio') || '').toLowerCase();
    if (pre) {
      chips.forEach(function (c) {
        if (c.getAttribute('data-key') === pre) selectChip(c);
      });
    }

    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || '').trim();
      var tel = (form.telefono.value || '').trim();
      var detalle = (form.detalle.value || '').trim();
      if (!nombre || !tel) { alert(S.err); return; }

      var activeChip = chipsBox.querySelector('.chip.is-active');
      var svcKey = activeChip ? activeChip.getAttribute('data-key') : 'alfombras';
      var svcLabel = S.svc[svcKey] || svcKey;

      var lines = [
        S.greeting,
        '',
        S.name + ': ' + nombre,
        S.phone + ': ' + tel,
        S.service + ': ' + svcLabel
      ];
      if (detalle) lines.push(S.detail + ': ' + detalle);

      gaEvent('generate_lead', { service: svcKey });

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------------- Año en footer ---------------- */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------------- Init ---------------- */
  function init() {
    initMenu();
    initObservers();
    initLazyVideos();
    initGaClickTracking();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
