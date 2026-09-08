/* ============================================================
   TEK-LIM MULTISERVI — main.js
   i18n ES/EN · menú móvil · tipografía cinética · formulario→WhatsApp
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '17868178904'; // WhatsApp / tel

  /* ---------------- Diccionario ---------------- */
  var I18N = {
    es: {
      'nav.inicio': 'Inicio', 'nav.servicios': 'Servicios', 'nav.nosotros': 'Nosotros',
      'nav.zonas': 'Zonas', 'nav.contacto': 'Contacto',
      'cta.cotiza': 'Cotiza ahora', 'cta.solicita': 'Solicita tu cotización',
      'cta.cotizar': 'Cotizar', 'cta.vermas': 'Ver más →', 'cta.equipo': 'Conoce al equipo',
      'cta.consultar': 'Consultar cobertura',

      'hero.zonas': 'Brickell · Coral Gables · Pinecrest · Coconut Grove',
      'hero.title1': 'Limpieza profesional', 'hero.title2': 'para ', 'hero.title_kw': 'todo Miami',
      'hero.sub': 'Comercial, residencial, industrial y alfombras. Equipo propio, uniformado e identificado, con productos y herramienta incluidos.',
      'hero.card1.title': 'Para tu casa', 'hero.card1.price': 'desde $120',
      'hero.card1.a': 'Semanal, quincenal o limpieza profunda.',
      'hero.card1.b': 'Extracción en caliente, manchas y olores.',
      'hero.card2.title': 'Para tu negocio', 'hero.card2.price': 'contrato mensual',
      'hero.card2.a': 'Oficinas, locales y áreas comunes.',
      'hero.card2.b': 'Bodegas, plantas y obra terminada.',

      'svc.alfombras': 'Alfombras', 'svc.comercial': 'Comercial',
      'svc.residencial': 'Residencial', 'svc.industrial': 'Industrial',

      'stats.a': 'para tu cotización', 'stats.b': 'zonas de Miami', 'stats.c': 'atención en dos idiomas',

      'home.services.title': 'Cuatro servicios,<br>un solo equipo',
      'home.services.note': 'Cada servicio tiene su propia página con alcance y precios de referencia.',
      'home.svc.alfombras.t': 'Limpieza de alfombras',
      'home.svc.alfombras.d': 'Extracción en caliente para oficinas y casas. Manchas, olores y tráfico alto.',
      'home.svc.comercial.t': 'Limpieza comercial',
      'home.svc.comercial.d': 'Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.',
      'home.svc.residencial.t': 'Limpieza residencial',
      'home.svc.residencial.d': 'Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.',
      'home.svc.industrial.t': 'Limpieza industrial',
      'home.svc.industrial.d': 'Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.',

      'home.detail.title': 'Nos contratan por el trabajo. Nos quedan por el detalle.',
      'home.detail.f1.t': 'Personal propio', 'home.detail.f1.d': 'Uniformado, identificado y capacitado. Sin subcontratos.',
      'home.detail.f2.t': 'Cotización en 24 horas', 'home.detail.f2.d': 'Visitamos el sitio, medimos y enviamos precio cerrado.',
      'home.detail.f3.t': 'Español e inglés', 'home.detail.f3.d': 'Atendemos en los dos idiomas, sin intermediarios.',
      'home.detail.f4.t': 'Productos y equipo incluidos', 'home.detail.f4.d': 'Llegamos con todo. Tú no compras nada.',

      'home.team.eyebrow': 'Nuestro equipo', 'home.team.title': 'Las mismas personas, cada visita',
      'home.team.p': 'No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.',

      'zones.label': 'Zonas de servicio',
      'cta.band.title': '¿Cuánto costaría limpiar tu espacio?',
      'cta.band.p': 'Cuéntanos el tipo de espacio y los metros. Respondemos el mismo día, en el idioma que prefieras.',

      'footer.tagline': 'Servicios de limpieza en el área de Miami, Florida.',
      'footer.services': 'Servicios', 'footer.zones': 'Zonas', 'footer.contact': 'Contacto',
      'footer.rights': 'Miami, Florida · Todos los derechos reservados',

      /* Servicios */
      'serv.hero.title': 'Cuatro formas de<br>dejarlo limpio',
      'serv.hero.lead': 'Mismo equipo, misma manera de trabajar. Cambia el espacio, el equipo y la frecuencia. Todos los servicios incluyen productos, herramienta y personal uniformado.',
      'serv.list.label': 'Servicios',
      'serv.idx.alfombras': 'Extracción en caliente, manchas y olores. Oficinas con tráfico alto y salas residenciales.',
      'serv.idx.comercial': 'Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.',
      'serv.idx.residencial': 'Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.',
      'serv.idx.industrial': 'Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.',
      'serv.alfombras.title': 'La suciedad que la aspiradora no saca',
      'serv.alfombras.p': 'Extracción en caliente para fibras sintéticas y naturales. Tratamos manchas, olores y alérgenos, y dejamos la alfombra lista para usar el mismo día.',
      'serv.alfombras.f1t': 'Oficinas', 'serv.alfombras.f1d': 'tráfico alto',
      'serv.alfombras.f2t': 'Residencial', 'serv.alfombras.f2d': 'salas y recámaras',
      'serv.alfombras.f3t': 'Mudanzas', 'serv.alfombras.f3d': 'entrega de depósito',
      'serv.alfombras.cta': 'Cotizar limpieza de alfombras',
      'serv.comercial.title': 'Tu oficina abre limpia todos los días',
      'serv.comercial.p': 'Programas diarios, semanales o por evento para oficinas, locales y áreas comunes. Baños, cocinas, vidrios, pisos y basura, con lista de verificación por visita.',
      'serv.comercial.f1t': 'Horario flexible', 'serv.comercial.f1d': 'antes o después de operar',
      'serv.comercial.f2t': 'Personal fijo', 'serv.comercial.f2d': 'las mismas caras',
      'serv.comercial.cta': 'Cotizar limpieza comercial',
      'serv.residencial.title': 'Entramos a tu casa con respeto',
      'serv.residencial.p': 'Casas y apartamentos, por única vez o de forma recurrente. Limpieza profunda, mudanzas y mantenimiento semanal con el mismo equipo cada visita.',
      'serv.residencial.f1t': 'Recurrente', 'serv.residencial.f1d': 'semanal o quincenal',
      'serv.residencial.f2t': 'Profunda', 'serv.residencial.f2d': 'interiores de muebles',
      'serv.residencial.cta': 'Cotizar limpieza residencial',
      'serv.industrial.title': 'Bodegas, plantas y obra terminada',
      'serv.industrial.p': 'Superficies grandes, maquinaria y residuos. Trabajamos con protocolos de seguridad y coordinamos con tu supervisor de planta.',
      'serv.industrial.f1t': 'Equipo pesado', 'serv.industrial.f1d': 'pulido y lavado a presión',
      'serv.industrial.f2t': 'Post-obra', 'serv.industrial.f2d': 'entrega lista para operar',
      'serv.industrial.cta': 'Cotizar limpieza industrial',

      /* Nosotros */
      'nos.hero.title': 'Un equipo que cuida<br>los detalles que nadie ve',
      'nos.hero.lead': 'Somos un equipo de limpieza con base en Miami. Trabajamos en Brickell, Coral Gables, Pinecrest y Coconut Grove, en oficinas, casas, bodegas y alfombras.',
      'nos.story.lead': 'No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.',
      'nos.story.p1': 'TEK-LIM MULTISERVI nació para resolver un problema simple: que la limpieza se sienta confiable. Por eso trabajamos con personal propio, no rotativo, capacitado y presentado con uniforme y gafete.',
      'nos.story.p2': 'Atendemos comercios, casas, bodegas y alfombras en el área de Miami. Cada trabajo empieza con una visita, una medición y una cotización cerrada por escrito en 24 horas, sin sorpresas.',
      'nos.story.p3': 'Llegamos con todo: productos, herramienta y equipo. Atendemos en español e inglés, sin intermediarios ni traducciones a medias.',
      'nos.val1.t': 'Personal propio y fijo', 'nos.val1.d': 'El mismo equipo en cada visita, uniformado e identificado.',
      'nos.val2.t': 'Cotización en 24 horas', 'nos.val2.d': 'Visita al sitio, medición y precio cerrado por escrito.',
      'nos.val3.t': 'Atención en dos idiomas', 'nos.val3.d': 'Español e inglés, sin intermediarios ni traducciones a medias.',
      'nos.team.p': 'Nos contratan por el trabajo y nos quedan por el detalle. Conócenos: somos personas reales trabajando, no un banco de imágenes.',

      /* Zonas */
      'zonas.hero.title': 'Cuatro zonas de Miami,<br>un mismo equipo',
      'zonas.hero.lead': 'Damos servicio en Brickell, Coral Gables, Pinecrest y Coconut Grove. ¿Estás cerca? Escríbenos y confirmamos cobertura el mismo día.',
      'zonas.brickell': 'Oficinas, torres residenciales y locales comerciales. Programas antes o después de horario.',
      'zonas.gables': 'Casas, oficinas y espacios comerciales. Limpieza recurrente y profunda.',
      'zonas.pinecrest': 'Residencial de mantenimiento, alfombras y limpieza por mudanza.',
      'zonas.grove': 'Casas y comercios locales. Atención en español e inglés.',
      'zonas.note': '¿No ves tu zona? Escríbenos de todos modos. Estamos ampliando cobertura en el área de Miami y confirmamos disponibilidad caso por caso.',

      /* Contacto / formulario */
      'cont.title': 'Pide tu cotización',
      'cont.lead': 'Respondemos el mismo día. Si prefieres hablar, llámanos o escríbenos por WhatsApp al (786) 817-8904.',
      'cont.phone': 'Teléfono / WhatsApp',
      'form.name': 'Nombre', 'form.phone': 'Teléfono', 'form.service': 'Servicio',
      'form.zone': 'Cuéntanos qué necesitas', 'form.zone.ph': 'Ej: Limpieza profunda, oficina en Brickell, ~150 m², dos veces por semana',
      'form.submit': 'Enviar solicitud',
      'form.note': 'Al enviar se abrirá WhatsApp con tu solicitud lista para mandar. No se guarda ningún dato en el sitio.',
      'form.wa.greeting': 'Hola TEK-LIM, quiero una cotización.',
      'form.wa.name': 'Nombre', 'form.wa.phone': 'Teléfono', 'form.wa.service': 'Servicio', 'form.wa.detail': 'Detalle',
      'form.err': 'Por favor completa tu nombre y teléfono.'
    },

    en: {
      'nav.inicio': 'Home', 'nav.servicios': 'Services', 'nav.nosotros': 'About',
      'nav.zonas': 'Areas', 'nav.contacto': 'Contact',
      'cta.cotiza': 'Get a quote', 'cta.solicita': 'Request a quote',
      'cta.cotizar': 'Get a quote', 'cta.vermas': 'See more →', 'cta.equipo': 'Meet the team',
      'cta.consultar': 'Check coverage',

      'hero.zonas': 'Brickell · Coral Gables · Pinecrest · Coconut Grove',
      'hero.title1': 'Professional cleaning', 'hero.title2': 'for ', 'hero.title_kw': 'all of Miami',
      'hero.sub': 'Commercial, residential, industrial and carpet cleaning. Our own crew, in uniform and by name, with supplies and equipment included.',
      'hero.card1.title': 'For your home', 'hero.card1.price': 'from $120',
      'hero.card1.a': 'Weekly, biweekly or deep cleaning.',
      'hero.card1.b': 'Hot-water extraction, stains and odors.',
      'hero.card2.title': 'For your business', 'hero.card2.price': 'monthly contract',
      'hero.card2.a': 'Offices, storefronts and common areas.',
      'hero.card2.b': 'Warehouses, plants and post-construction.',

      'svc.alfombras': 'Carpets', 'svc.comercial': 'Commercial',
      'svc.residencial': 'Residential', 'svc.industrial': 'Industrial',

      'stats.a': 'for your quote', 'stats.b': 'Miami areas', 'stats.c': 'service in two languages',

      'home.services.title': 'Four services,<br>one crew',
      'home.services.note': 'Each service has its own page with scope and reference pricing.',
      'home.svc.alfombras.t': 'Carpet cleaning',
      'home.svc.alfombras.d': 'Hot-water extraction for offices and homes. Stains, odors and high traffic.',
      'home.svc.comercial.t': 'Commercial cleaning',
      'home.svc.comercial.d': 'Offices, storefronts and common areas. Daily, weekly or per-event programs.',
      'home.svc.residencial.t': 'Residential cleaning',
      'home.svc.residencial.d': 'Homes and apartments. Recurring upkeep, move-outs and deep cleaning.',
      'home.svc.industrial.t': 'Industrial cleaning',
      'home.svc.industrial.d': 'Warehouses, plants and post-construction. Heavy equipment and safety protocols.',

      'home.detail.title': 'They hire us for the work. They stay for the detail.',
      'home.detail.f1.t': 'Our own staff', 'home.detail.f1.d': 'In uniform, badged and trained. No subcontractors.',
      'home.detail.f2.t': 'Quote in 24 hours', 'home.detail.f2.d': 'We visit the site, measure and send a firm price.',
      'home.detail.f3.t': 'Spanish and English', 'home.detail.f3.d': 'We serve you in both languages, no middlemen.',
      'home.detail.f4.t': 'Supplies and equipment included', 'home.detail.f4.d': 'We bring everything. You buy nothing.',

      'home.team.eyebrow': 'Our team', 'home.team.title': 'The same people, every visit',
      'home.team.p': 'We don’t subcontract. The crew that knows your space is the one that comes back — in uniform, badged, working the same way.',

      'zones.label': 'Service areas',
      'cta.band.title': 'What would it cost to clean your space?',
      'cta.band.p': 'Tell us the type of space and the size. We reply the same day, in the language you prefer.',

      'footer.tagline': 'Cleaning services in the Miami, Florida area.',
      'footer.services': 'Services', 'footer.zones': 'Areas', 'footer.contact': 'Contact',
      'footer.rights': 'Miami, Florida · All rights reserved',

      /* Services */
      'serv.hero.title': 'Four ways to<br>leave it clean',
      'serv.hero.lead': 'Same crew, same way of working. What changes is the space, the equipment and the frequency. Every service includes supplies, tools and uniformed staff.',
      'serv.list.label': 'Services',
      'serv.idx.alfombras': 'Hot-water extraction, stains and odors. High-traffic offices and residential rooms.',
      'serv.idx.comercial': 'Offices, storefronts and common areas. Daily, weekly or per-event programs.',
      'serv.idx.residencial': 'Homes and apartments. Recurring upkeep, move-outs and deep cleaning.',
      'serv.idx.industrial': 'Warehouses, plants and post-construction. Heavy equipment and safety protocols.',
      'serv.alfombras.title': 'The dirt the vacuum leaves behind',
      'serv.alfombras.p': 'Hot-water extraction for synthetic and natural fibers. We treat stains, odors and allergens, and leave the carpet ready to use the same day.',
      'serv.alfombras.f1t': 'Offices', 'serv.alfombras.f1d': 'high traffic',
      'serv.alfombras.f2t': 'Residential', 'serv.alfombras.f2d': 'living rooms and bedrooms',
      'serv.alfombras.f3t': 'Move-outs', 'serv.alfombras.f3d': 'deposit handover',
      'serv.alfombras.cta': 'Quote carpet cleaning',
      'serv.comercial.title': 'Your office opens clean every day',
      'serv.comercial.p': 'Daily, weekly or per-event programs for offices, storefronts and common areas. Restrooms, kitchens, glass, floors and trash, with a checklist every visit.',
      'serv.comercial.f1t': 'Flexible hours', 'serv.comercial.f1d': 'before or after operating',
      'serv.comercial.f2t': 'Fixed staff', 'serv.comercial.f2d': 'the same faces',
      'serv.comercial.cta': 'Quote commercial cleaning',
      'serv.residencial.title': 'We enter your home with respect',
      'serv.residencial.p': 'Homes and apartments, one-time or recurring. Deep cleaning, move-outs and weekly upkeep with the same crew every visit.',
      'serv.residencial.f1t': 'Recurring', 'serv.residencial.f1d': 'weekly or biweekly',
      'serv.residencial.f2t': 'Deep', 'serv.residencial.f2d': 'inside furniture',
      'serv.residencial.cta': 'Quote residential cleaning',
      'serv.industrial.title': 'Warehouses, plants and post-construction',
      'serv.industrial.p': 'Large surfaces, machinery and debris. We work with safety protocols and coordinate with your plant supervisor.',
      'serv.industrial.f1t': 'Heavy equipment', 'serv.industrial.f1d': 'polishing and pressure washing',
      'serv.industrial.f2t': 'Post-construction', 'serv.industrial.f2d': 'handed over ready to operate',
      'serv.industrial.cta': 'Quote industrial cleaning',

      /* About */
      'nos.hero.title': 'A crew that cares for<br>the details no one sees',
      'nos.hero.lead': 'We are a cleaning crew based in Miami. We work in Brickell, Coral Gables, Pinecrest and Coconut Grove — offices, homes, warehouses and carpets.',
      'nos.story.lead': 'We don’t subcontract. The crew that knows your space is the one that comes back — in uniform, badged, working the same way.',
      'nos.story.p1': 'TEK-LIM MULTISERVI started to solve a simple problem: making cleaning feel reliable. That’s why we work with our own staff — not rotating — trained and presented in uniform and badge.',
      'nos.story.p2': 'We serve businesses, homes, warehouses and carpets across the Miami area. Every job starts with a visit, a measurement and a firm written quote within 24 hours — no surprises.',
      'nos.story.p3': 'We arrive with everything: supplies, tools and equipment. We serve you in Spanish and English, no middlemen or half-done translations.',
      'nos.val1.t': 'Our own, fixed staff', 'nos.val1.d': 'The same crew every visit, in uniform and badged.',
      'nos.val2.t': 'Quote in 24 hours', 'nos.val2.d': 'Site visit, measurement and a firm written price.',
      'nos.val3.t': 'Service in two languages', 'nos.val3.d': 'Spanish and English, no middlemen or half-done translations.',
      'nos.team.p': 'They hire us for the work and stay for the detail. Get to know us: we’re real people working, not stock photos.',

      /* Areas */
      'zonas.hero.title': 'Four Miami areas,<br>one crew',
      'zonas.hero.lead': 'We serve Brickell, Coral Gables, Pinecrest and Coconut Grove. Nearby? Message us and we’ll confirm coverage the same day.',
      'zonas.brickell': 'Offices, residential towers and storefronts. Programs before or after hours.',
      'zonas.gables': 'Homes, offices and commercial spaces. Recurring and deep cleaning.',
      'zonas.pinecrest': 'Residential upkeep, carpets and move-out cleaning.',
      'zonas.grove': 'Homes and local businesses. Service in Spanish and English.',
      'zonas.note': 'Don’t see your area? Message us anyway. We’re expanding coverage across the Miami area and confirm availability case by case.',

      /* Contact / form */
      'cont.title': 'Request a quote',
      'cont.lead': 'We reply the same day. If you’d rather talk, call us or message us on WhatsApp at (786) 817-8904.',
      'cont.phone': 'Phone / WhatsApp',
      'form.name': 'Name', 'form.phone': 'Phone', 'form.service': 'Service',
      'form.zone': 'Tell us what you need', 'form.zone.ph': 'E.g. Deep cleaning, office in Brickell, ~150 m², twice a week',
      'form.submit': 'Send request',
      'form.note': 'Sending opens WhatsApp with your request ready to send. No data is stored on the site.',
      'form.wa.greeting': 'Hi TEK-LIM, I’d like a quote.',
      'form.wa.name': 'Name', 'form.wa.phone': 'Phone', 'form.wa.service': 'Service', 'form.wa.detail': 'Details',
      'form.err': 'Please fill in your name and phone.'
    }
  };

  var lang = 'es';
  function t(key) { return (I18N[lang] && I18N[lang][key]) || (I18N.es[key]) || key; }

  /* ---------------- Aplicar idioma ---------------- */
  function applyLang(next) {
    lang = (next === 'en') ? 'en' : 'es';
    try { localStorage.setItem('teklim-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) { el.setAttribute(attr, val); }
      else { el.innerHTML = val; }
    }
    // Estado de los botones de idioma
    var btns = document.querySelectorAll('[data-lang]');
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle('is-active', btns[j].getAttribute('data-lang') === lang);
    }
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

  /* ---------------- Selector de idioma ---------------- */
  function initLangButtons() {
    var btns = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        applyLang(this.getAttribute('data-lang'));
      });
    }
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

  /* ---------------- Videos: forzar mute + autoplay ---------------- */
  function initVideos() {
    document.querySelectorAll('video').forEach(function (v) {
      v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  /* ---------------- Formulario → WhatsApp ---------------- */
  function initForm() {
    var form = document.getElementById('quote-form');
    var chipsBox = document.getElementById('service-chips');
    if (!chipsBox) return;
    var chips = chipsBox.querySelectorAll('.chip');

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
      if (!nombre || !tel) { alert(t('form.err')); return; }

      var activeChip = chipsBox.querySelector('.chip.is-active');
      var svcKey = activeChip ? activeChip.getAttribute('data-key') : 'alfombras';
      var svcLabel = t('svc.' + svcKey);

      var lines = [
        t('form.wa.greeting'),
        '',
        t('form.wa.name') + ': ' + nombre,
        t('form.wa.phone') + ': ' + tel,
        t('form.wa.service') + ': ' + svcLabel
      ];
      if (detalle) lines.push(t('form.wa.detail') + ': ' + detalle);

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
    var saved = null;
    try { saved = localStorage.getItem('teklim-lang'); } catch (e) {}
    if (saved !== 'en' && saved !== 'es') {
      saved = ((navigator.language || '').slice(0, 2).toLowerCase() === 'en') ? 'en' : 'es';
    }
    applyLang(saved);
    initLangButtons();
    initMenu();
    initObservers();
    initVideos();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
