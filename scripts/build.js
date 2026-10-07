#!/usr/bin/env node
/*
 * Generador de páginas estáticas — TEK-LIM MULTISERVI
 * No es un build runtime: Vercel sigue sirviendo HTML/CSS/JS estático plano.
 * Este script solo evita duplicar a mano el header/footer/SEO en 8 páginas.
 * Uso: node scripts/build.js   (desde la raíz del repo)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://tek-limmultiservi.com';
const GA_ID = 'G-WSH2T0GTV6';
const WA_NUMBER = '17868178904';
const PHONE_DISPLAY = '(786) 817-8904';
const PHONE_E164 = '+17868178904';
const EMAIL = 'teklimmultiservi@yahoo.com';
const INSTAGRAM = 'https://instagram.com/teklimmultiservi';
const OG_IMAGE = SITE_URL + '/assets/images/og-image.jpg';

function assertLen(label, s, max) {
  if (s.length > max) throw new Error(`${label} excede ${max} caracteres (${s.length}): ${s}`);
}

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TEK-LIM MULTISERVI',
  image: OG_IMAGE,
  telephone: PHONE_E164,
  email: EMAIL,
  url: SITE_URL + '/',
  areaServed: { '@type': 'Place', name: 'Miami, FL' },
  logo: SITE_URL + '/assets/icons/tkm-icon.svg',
  sameAs: [INSTAGRAM]
};

function serviceSchema(svc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svc.serviceType,
    provider: { '@type': 'LocalBusiness', name: 'TEK-LIM MULTISERVI', telephone: PHONE_E164 },
    areaServed: { '@type': 'Place', name: 'Miami, FL' },
    url: SITE_URL + svc.urlPath
  };
}

/* ---------------- <head> ---------------- */
function renderHead({ title, description, urlPath, extraSchema, preloadHero }) {
  assertLen('title ' + urlPath, title, 60);
  assertLen('description ' + urlPath, description, 155);
  const canonical = SITE_URL + urlPath;
  const schemas = [LOCAL_BUSINESS_SCHEMA].concat(extraSchema ? [extraSchema] : []);
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="/assets/icons/tkm-icon.svg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TEK-LIM MULTISERVI">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${OG_IMAGE}">
${preloadHero ? '<link rel="preload" as="image" href="/assets/images/hero-bg.webp" fetchpriority="high">\n' : ''}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/styles.css">
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
</script>
${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}`;
}

/* ---------------- header / footer ---------------- */
function renderHeader(active) {
  function navLink(href, key, label) {
    return `<a href="${href}"${active === key ? ' class="is-active"' : ''} data-i18n="nav.${key}">${label}</a>`;
  }
  return `<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="TEK-LIM MULTISERVI — Inicio">
      <img class="brand__icon" src="/assets/icons/tkm-icon.svg" alt="TKM" width="40" height="38">
      <img class="brand__word" src="/assets/icons/tkm-wordmark.svg" alt="TEK-LIM MULTISERVI" width="89" height="20">
    </a>
    <nav class="nav" id="nav" aria-label="Principal">
      ${navLink('/', 'inicio', 'Inicio')}
      ${navLink('/servicios/', 'servicios', 'Servicios')}
      ${navLink('/nosotros/', 'nosotros', 'Nosotros')}
      ${navLink('/contacto/', 'contacto', 'Contacto')}
      <div class="mobile-actions">
        <div class="lang" role="group" aria-label="Idioma">
          <button type="button" data-lang="es" class="is-active">ES</button>
          <button type="button" data-lang="en">EN</button>
        </div>
        <a class="btn btn--amarillo" href="/contacto/" data-i18n="cta.cotiza">Cotiza ahora</a>
      </div>
    </nav>
    <div class="header-actions">
      <div class="lang" role="group" aria-label="Idioma">
        <button type="button" data-lang="es" class="is-active">ES</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <a class="btn btn--amarillo" href="/contacto/" data-i18n="cta.cotiza">Cotiza ahora</a>
      <button class="burger" id="burger" aria-label="Menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="/assets/icons/tkm-wordmark-footer.svg" alt="TEK-LIM MULTISERVI" width="129" height="20">
      <p data-i18n="footer.tagline">Servicios de limpieza en el área de Miami, Florida.</p>
    </div>
    <div class="footer-col">
      <h4 data-i18n="footer.services">Servicios</h4>
      <a href="/limpieza-de-alfombras-miami/" data-i18n="svc.alfombras">Alfombras</a>
      <a href="/limpieza-comercial-miami/" data-i18n="svc.comercial">Comercial</a>
      <a href="/limpieza-residencial-miami/" data-i18n="svc.residencial">Residencial</a>
      <a href="/limpieza-industrial-miami/" data-i18n="svc.industrial">Industrial</a>
    </div>
    <div class="footer-col">
      <h4 data-i18n="footer.contact">Contacto</h4>
      <a href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="${INSTAGRAM}" target="_blank" rel="noopener">@teklimmultiservi</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <span id="year"></span> TEK-LIM MULTISERVI</span>
    <span data-i18n="footer.rights">Miami, Florida · Todos los derechos reservados</span>
  </div>
</footer>
<a class="wa-float" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.9.9.9-4.8-.2-.4C5.4 18.9 5 17 5 15 5 9.5 9.5 5 16 5s11 4.5 11 10-4.5 9.8-11 9.8zm5.6-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
</a>`;
}

/* ---------------- helpers de media ---------------- */
const IMG_DIM = {
  'hero-bg': [1920, 1072],
  'team-home': [562, 1000],
  'team-nosotros': [1600, 894],
  'service-comercial': [700, 933],
  'service-industrial': [700, 933],
  'service-residencial-kitchen': [900, 1600],
  'service-residencial-bathroom': [900, 1600]
};

function picture(name, alt, opts) {
  opts = opts || {};
  const dim = IMG_DIM[name];
  if (!dim) throw new Error('Sin dimensiones para ' + name);
  const cls = opts.cls ? ` class="${opts.cls}"` : '';
  const style = opts.style ? ` style="${opts.style}"` : '';
  const loading = opts.eager ? '' : ' loading="lazy"';
  const fp = opts.fetchpriority ? ` fetchpriority="${opts.fetchpriority}"` : '';
  return `<picture>
      <source srcset="/assets/images/${name}.webp" type="image/webp">
      <img src="/assets/images/${name}.jpg" alt="${alt}" width="${dim[0]}" height="${dim[1]}"${cls}${style}${loading}${fp}>
    </picture>`;
}

function lazyVideo(name, posterName, style) {
  return `<video data-src="/assets/videos/${name}.mp4" muted loop playsinline preload="none" poster="/assets/images/${posterName}.webp"${style ? ` style="${style}"` : ''}></video>`;
}

/* ---------------- datos de servicios ---------------- */
const SERVICES = [
  {
    key: 'alfombras', num: '01', urlPath: '/limpieza-de-alfombras-miami/',
    title: 'Limpieza de Alfombras en Miami | TEK-LIM',
    description: 'Limpieza de alfombras en Miami con extracción en caliente. Quitamos manchas, olores y alérgenos en oficinas y casas. Cotización en 24 horas.',
    serviceType: 'Limpieza de alfombras'
  },
  {
    key: 'comercial', num: '02', urlPath: '/limpieza-comercial-miami/',
    title: 'Limpieza Comercial en Miami | TEK-LIM',
    description: 'Limpieza comercial en Miami para oficinas, locales y áreas comunes. Programas diarios o semanales con personal uniformado. Cotiza en 24h.',
    serviceType: 'Limpieza comercial'
  },
  {
    key: 'residencial', num: '03', urlPath: '/limpieza-residencial-miami/',
    title: 'Limpieza Residencial en Miami | TEK-LIM',
    description: 'Limpieza residencial en Miami: casas y apartamentos, recurrente o profunda. Equipo propio y uniformado. Cotización en 24 horas.',
    serviceType: 'Limpieza residencial'
  },
  {
    key: 'industrial', num: '04', urlPath: '/limpieza-industrial-miami/',
    title: 'Limpieza Industrial en Miami | TEK-LIM',
    description: 'Limpieza industrial en Miami para bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad. Cotiza en 24h.',
    serviceType: 'Limpieza industrial'
  }
];
function svc(key) { return SERVICES.find(s => s.key === key); }

/* Texto estático ES para prerender (debe reflejar exactamente las claves
   equivalentes en js/main.js → I18N.es, así el swap a EN no produce saltos) */
const ES = {
  'svc.alfombras': 'Alfombras', 'svc.comercial': 'Comercial',
  'svc.residencial': 'Residencial', 'svc.industrial': 'Industrial',
  'serv.idx.alfombras': 'Extracción en caliente, manchas y olores. Oficinas con tráfico alto y salas residenciales.',
  'serv.idx.comercial': 'Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.',
  'serv.idx.residencial': 'Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.',
  'serv.idx.industrial': 'Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.',
  'h1.alfombras': 'Limpieza de Alfombras en Miami',
  'h1.comercial': 'Limpieza Comercial en Miami',
  'h1.residencial': 'Limpieza Residencial en Miami',
  'h1.industrial': 'Limpieza Industrial en Miami',
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
  'serv.industrial.cta': 'Cotizar limpieza industrial'
};
function t(key) {
  if (!(key in ES)) throw new Error('Falta texto ES para la clave: ' + key);
  return ES[key];
}

/* ---------------- bloque "otros servicios" ---------------- */
function otrosServiciosBlock(currentKey) {
  const others = SERVICES.filter(s => s.key !== currentKey);
  return `<section class="section" style="padding:48px 0 0">
  <div class="wrap">
    <span class="eyebrow eyebrow--plain" data-i18n="serv.other.label">Más servicios</span>
    <ul style="display:flex;gap:28px;flex-wrap:wrap;margin-top:18px;list-style:none;padding:0">
      ${others.map(o => `<li><a class="link-underline" href="${o.urlPath}" data-i18n="home.svc.${o.key}.t">${o.key}</a></li>`).join('\n      ')}
      <li><a class="link-underline" href="/servicios/" data-i18n="nav.servicios">Servicios</a></li>
    </ul>
  </div>
</section>`;
}

function bottomBar(serviceKey) {
  const href = serviceKey ? `/contacto/?servicio=${serviceKey}` : '/contacto/';
  return `<div class="svc-bottombar"><a class="btn btn--amarillo btn--block" href="${href}" data-i18n="cta.cotizar">Cotizar</a><a class="btn btn--negro btn--block" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp</a></div>`;
}

const CTA_BAND = `<section class="cta-band">
  <div class="cta-band__inner">
    <div class="cta-band__copy">
      <h2 data-i18n="cta.band.title">¿Cuánto costaría limpiar tu espacio?</h2>
      <p data-i18n="cta.band.p">Cuéntanos el tipo de espacio y los metros. Respondemos el mismo día, en el idioma que prefieras.</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--amarillo btn--lg" href="/contacto/" data-i18n="cta.solicita">Solicita tu cotización</a>
      <a class="btn btn--ghost btn--lg" href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
    </div>
  </div>
</section>`;

/* ---------------- documento HTML ---------------- */
const OLD_HASH_REDIRECT = `<script>
(function(){
  var map={servicios:'/servicios/',nosotros:'/nosotros/',contacto:'/contacto/'};
  var h=(location.hash||'').slice(1);
  if(map[h]){ location.replace(map[h]+location.search); }
})();
</script>`;

function renderDoc({ urlPath, title, description, active, bodyClass, extraSchema, preloadHero, redirectOldHashes, body }) {
  const head = renderHead({ title, description, urlPath, extraSchema, preloadHero });
  return `<!DOCTYPE html>
<html lang="es">
<head>
${redirectOldHashes ? OLD_HASH_REDIRECT + '\n' : ''}${head}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${renderHeader(active)}
<main id="app">
${body}
</main>
${renderFooter()}
<script src="/js/main.js"></script>
</body>
</html>
`;
}

/* ============================================================
   PÁGINA: INICIO
   ============================================================ */
function pageHome() {
  const body = `<!-- ============ HERO ============ -->
<section class="hero">
  ${picture('hero-bg', '', { cls: 'hero__bg', eager: true, fetchpriority: 'high' })}
  <div class="hero__overlay"></div>
  <div class="hero__inner">
    <div class="hero__copy">
      <span class="eyebrow eyebrow--amarillo fade-1" data-i18n="hero.zonas">Servicio en toda el área de Miami</span>
      <h1 class="hero__title">
        <span data-i18n="hero.title1">Limpieza profesional</span><br>
        <span data-i18n="hero.title2">para </span><span class="kw"><span class="kw__in" data-i18n="hero.title_kw">todo Miami</span></span>
      </h1>
      <p class="hero__p fade-2" data-i18n="hero.sub">Comercial, residencial, industrial y alfombras. Equipo propio, uniformado e identificado, con productos y herramienta incluidos.</p>
      <div class="hero__cta fade-3">
        <a class="btn btn--amarillo btn--lg" href="/contacto/" data-i18n="cta.solicita">Solicita tu cotización</a>
        <a class="btn btn--ghost btn--lg" href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
      </div>
    </div>
    <div class="hero__cards">
      <div class="svc-card">
        <div class="svc-card__head">
          <h3 data-i18n="hero.card1.title">Para tu casa</h3>
        </div>
        <div class="svc-card__grid">
          <a class="svc-mini" href="/limpieza-residencial-miami/">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t" data-i18n="svc.residencial">Residencial</span>
            <span class="svc-mini__d" data-i18n="hero.card1.a">Semanal, quincenal o limpieza profunda.</span>
          </a>
          <a class="svc-mini" href="/limpieza-de-alfombras-miami/">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t" data-i18n="svc.alfombras">Alfombras</span>
            <span class="svc-mini__d" data-i18n="hero.card1.b">Extracción en caliente, manchas y olores.</span>
          </a>
        </div>
      </div>
      <div class="svc-card">
        <div class="svc-card__head">
          <h3 data-i18n="hero.card2.title">Para tu negocio</h3>
        </div>
        <div class="svc-card__grid">
          <a class="svc-mini" href="/limpieza-comercial-miami/">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t" data-i18n="svc.comercial">Comercial</span>
            <span class="svc-mini__d" data-i18n="hero.card2.a">Oficinas, locales y áreas comunes.</span>
          </a>
          <a class="svc-mini" href="/limpieza-industrial-miami/">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t" data-i18n="svc.industrial">Industrial</span>
            <span class="svc-mini__d" data-i18n="hero.card2.b">Bodegas, plantas y obra terminada.</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ STATS ============ -->
<section class="stats">
  <div class="stats__inner">
    <div class="stats__group">
      <div class="stat"><span class="stat__n">24 h</span><span class="stat__l" data-i18n="stats.a">para tu cotización</span></div>
      <div class="stat"><span class="stat__n">100%</span><span class="stat__l" data-i18n="stats.b">cobertura en Miami</span></div>
      <div class="stat"><span class="stat__n">ES / EN</span><span class="stat__l" data-i18n="stats.c">atención en dos idiomas</span></div>
    </div>
    <div class="stats__contact">
      <a href="mailto:${EMAIL}">${EMAIL}</a> · <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp ${PHONE_DISPLAY}</a>
    </div>
  </div>
</section>

<!-- ============ GRILLA 4 SERVICIOS ============ -->
<section class="section" id="servicios">
  <div class="wrap">
    <div class="section__head reveal">
      <h2 class="section__title" data-i18n="home.services.title">Cuatro servicios,<br>un solo equipo</h2>
      <p class="section__note" data-i18n="home.services.note">Cada servicio tiene su propia página con alcance y precios de referencia.</p>
    </div>
    <div class="svc-grid">
      <a class="svc-tile reveal" href="/limpieza-de-alfombras-miami/">
        <span class="svc-tile__hex svc-tile__hex--amarillo hex-flat"></span>
        <h4 data-i18n="home.svc.alfombras.t">Limpieza de alfombras</h4>
        <p data-i18n="home.svc.alfombras.d">Extracción en caliente para oficinas y casas. Manchas, olores y tráfico alto.</p>
        <span class="link-underline" data-i18n="cta.cotizar">Cotizar</span>
      </a>
      <a class="svc-tile reveal" href="/limpieza-comercial-miami/">
        <span class="svc-tile__hex svc-tile__hex--negro hex-flat"></span>
        <h4 data-i18n="home.svc.comercial.t">Limpieza comercial</h4>
        <p data-i18n="home.svc.comercial.d">Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.</p>
        <span class="link-underline" data-i18n="cta.cotizar">Cotizar</span>
      </a>
      <a class="svc-tile reveal" href="/limpieza-residencial-miami/">
        <span class="svc-tile__hex svc-tile__hex--amarillo hex-flat"></span>
        <h4 data-i18n="home.svc.residencial.t">Limpieza residencial</h4>
        <p data-i18n="home.svc.residencial.d">Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.</p>
        <span class="link-underline" data-i18n="cta.cotizar">Cotizar</span>
      </a>
      <a class="svc-tile reveal" href="/limpieza-industrial-miami/">
        <span class="svc-tile__hex svc-tile__hex--negro hex-flat"></span>
        <h4 data-i18n="home.svc.industrial.t">Limpieza industrial</h4>
        <p data-i18n="home.svc.industrial.d">Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.</p>
        <span class="link-underline" data-i18n="cta.cotizar">Cotizar</span>
      </a>
    </div>
  </div>
</section>

<!-- ============ DETALLE + VIDEO ============ -->
<section class="detail">
  <div class="detail__media-group">
  <div class="detail__media">
    ${lazyVideo('detail-1', 'detail-1-poster')}
  </div>
  <div class="detail__media">
    ${lazyVideo('detail-2', 'detail-2-poster')}
  </div>
  </div>
  <div class="detail__body">
    <h2 data-i18n="home.detail.title">Nos contratan por el trabajo. Nos quedan por el detalle.</h2>
    <div class="feature-grid">
      <div class="feature reveal">
        <span class="feature__t" data-i18n="home.detail.f1.t">Personal propio</span>
        <span class="feature__d" data-i18n="home.detail.f1.d">Uniformado, identificado y capacitado. Sin subcontratos.</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t" data-i18n="home.detail.f2.t">Cotización en 24 horas</span>
        <span class="feature__d" data-i18n="home.detail.f2.d">Visitamos el sitio, medimos y enviamos precio cerrado.</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t" data-i18n="home.detail.f3.t">Español e inglés</span>
        <span class="feature__d" data-i18n="home.detail.f3.d">Atendemos en los dos idiomas, sin intermediarios.</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t" data-i18n="home.detail.f4.t">Productos y equipo incluidos</span>
        <span class="feature__d" data-i18n="home.detail.f4.d">Llegamos con todo. Tú no compras nada.</span>
      </div>
    </div>
    <a class="link-underline" href="/nosotros/" data-i18n="cta.equipo">Conoce al equipo</a>
  </div>
</section>

<!-- ============ EQUIPO ============ -->
<section class="section section--hueso">
  <div class="wrap">
    <div class="split split--media-r">
      <div class="split__copy reveal">
        <span class="eyebrow eyebrow--plain" data-i18n="home.team.eyebrow">Nuestro equipo</span>
        <h2 data-i18n="home.team.title">Las mismas personas, cada visita</h2>
        <p data-i18n="home.team.p">No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.</p>
        <a class="link-underline" href="/nosotros/" data-i18n="cta.equipo">Conoce al equipo</a>
      </div>
      <div class="split__media reveal">
        ${picture('team-home', 'Equipo de TEK-LIM MULTISERVI', { style: 'object-position:50% 30%' })}
      </div>
    </div>
  </div>
</section>

${CTA_BAND}`;
  return renderDoc({
    urlPath: '/',
    title: 'TEK-LIM MULTISERVI | Limpieza en Miami',
    description: 'Limpieza comercial, residencial, industrial y de alfombras en toda el área de Miami. Equipo propio, uniformado, cotización en 24 horas.',
    active: 'inicio',
    preloadHero: true,
    redirectOldHashes: true,
    body
  });
}

/* ============================================================
   PÁGINA: SERVICIOS (índice)
   ============================================================ */
function pageServicios() {
  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain" data-i18n="nav.servicios">Servicios</span>
        <h1 data-i18n="h1.servicios">Servicios de limpieza<br>en Miami</h1>
      </div>
      <p class="page-hero__lead" data-i18n="serv.hero.lead">Mismo equipo, misma manera de trabajar. Cambia el espacio, el equipo y la frecuencia. Todos los servicios incluyen productos, herramienta y personal uniformado.</p>
    </div>
  </div>
</section>

<section class="section" style="padding:56px 0">
  <div class="wrap">
    <div style="display:flex;align-items:baseline;gap:16px;margin-bottom:8px">
      <span class="eyebrow eyebrow--plain" data-i18n="serv.list.label">Servicios</span>
      <span style="flex:1;height:1px;background:var(--linea);display:block"></span>
      <span style="font:600 11px/1 var(--mono);color:var(--gris)">04</span>
    </div>
    <ul class="serv-index">
      ${SERVICES.map(s => `<li><a href="${s.urlPath}"><span class="serv-index__n">${s.num}</span><span class="serv-index__t" data-i18n="svc.${s.key}">${t('svc.' + s.key)}</span><span class="serv-index__d" data-i18n="serv.idx.${s.key}">${t('serv.idx.' + s.key)}</span><span class="serv-index__more" data-i18n="cta.vermas">Ver más →</span></a></li>`).join('\n      ')}
    </ul>
  </div>
</section>

${CTA_BAND}
${bottomBar()}`;
  return renderDoc({
    urlPath: '/servicios/',
    title: 'Servicios de Limpieza en Miami | TEK-LIM',
    description: 'Limpieza comercial, residencial, industrial y de alfombras en Miami. Conoce el alcance y precios de referencia de cada servicio.',
    active: 'servicios',
    bodyClass: 'on-servicios',
    body
  });
}

/* ============================================================
   PÁGINAS DE SERVICIO
   ============================================================ */
function serviceMedia(key) {
  if (key === 'alfombras') {
    return `<div class="svc-row__media">${lazyVideo('service-alfombras', 'service-alfombras', 'object-position:50% 42%')}</div>`;
  }
  if (key === 'comercial') {
    return `<div class="svc-row__media">${picture('service-comercial', 'Limpieza comercial de oficinas')}</div>`;
  }
  if (key === 'residencial') {
    return `<div class="svc-row__media svc-row__media--split">
    ${picture('service-residencial-kitchen', 'Limpieza residencial - cocina')}
    ${picture('service-residencial-bathroom', 'Limpieza residencial - baño')}
  </div>`;
  }
  if (key === 'industrial') {
    return `<div class="svc-row__media">${picture('service-industrial', 'Limpieza industrial', { style: 'object-position:50% 45%' })}</div>`;
  }
}

function pageService(key) {
  const s = svc(key);
  const rowClass = (key === 'comercial' || key === 'industrial') ? 'svc-row svc-row--rev' : 'svc-row';
  const media = serviceMedia(key);
  const bodyBlock = `<div class="svc-row__body">
    <div class="svc-row__tag"><span class="svc-row__num">${s.num}</span><span class="svc-row__cat" data-i18n="svc.${key}">${t('svc.' + key)}</span></div>
    <h2 data-kinetic data-i18n="serv.${key}.title">${t('serv.' + key + '.title')}</h2>
    <p data-i18n="serv.${key}.p">${t('serv.' + key + '.p')}</p>
    <div class="svc-row__facts">
      <div class="fact"><span class="fact__t" data-i18n="serv.${key}.f1t">${t('serv.' + key + '.f1t')}</span><span class="fact__d" data-i18n="serv.${key}.f1d">${t('serv.' + key + '.f1d')}</span></div>
      <div class="fact"><span class="fact__t" data-i18n="serv.${key}.f2t">${t('serv.' + key + '.f2t')}</span><span class="fact__d" data-i18n="serv.${key}.f2d">${t('serv.' + key + '.f2d')}</span></div>
      ${key === 'alfombras' ? `<div class="fact"><span class="fact__t" data-i18n="serv.alfombras.f3t">${t('serv.alfombras.f3t')}</span><span class="fact__d" data-i18n="serv.alfombras.f3d">${t('serv.alfombras.f3d')}</span></div>` : ''}
    </div>
    <a class="link-underline" href="/contacto/?servicio=${key}" data-servicio="${key}" data-i18n="serv.${key}.cta">${t('serv.' + key + '.cta')}</a>
  </div>`;
  const rowInner = (key === 'comercial' || key === 'industrial') ? `${media}\n  ${bodyBlock}` : `${bodyBlock}\n  ${media}`;

  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain" data-i18n="nav.servicios">Servicios</span>
        <h1 data-i18n="h1.${key}">${t('h1.' + key)}</h1>
      </div>
      <p class="page-hero__lead" data-i18n="serv.idx.${key}">${t('serv.idx.' + key)}</p>
    </div>
  </div>
</section>

<section class="${rowClass}">
  ${rowInner}
</section>

${otrosServiciosBlock(key)}

${CTA_BAND}
${bottomBar(key)}`;

  return renderDoc({
    urlPath: s.urlPath,
    title: s.title,
    description: s.description,
    active: 'servicios',
    bodyClass: 'on-servicios',
    extraSchema: serviceSchema(s),
    body
  });
}

/* ============================================================
   PÁGINA: NOSOTROS
   ============================================================ */
function pageNosotros() {
  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain" data-i18n="nav.nosotros">Nosotros</span>
        <h1 data-i18n="h1.nosotros">Un equipo de limpieza en Miami<br>que cuida los detalles que nadie ve</h1>
      </div>
      <p class="page-hero__lead" data-i18n="nos.hero.lead">Somos un equipo de limpieza con base en Miami. Trabajamos en toda el área de Miami, en oficinas, casas, bodegas y alfombras.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="story">
      <p class="story__lead reveal" data-i18n="nos.story.lead">No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.</p>
      <div class="story__body reveal">
        <p data-i18n="nos.story.p1">TEK-LIM MULTISERVI nació para resolver un problema simple: que la limpieza se sienta confiable. Por eso trabajamos con personal propio, no rotativo, capacitado y presentado con uniforme y gafete.</p>
        <p data-i18n="nos.story.p2">Atendemos comercios, casas, bodegas y alfombras en el área de Miami. Cada trabajo empieza con una visita, una medición y una cotización cerrada por escrito en 24 horas, sin sorpresas.</p>
        <p data-i18n="nos.story.p3">Llegamos con todo: productos, herramienta y equipo. Atendemos en español e inglés, sin intermediarios ni traducciones a medias.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--hueso" style="padding:64px 0">
  <div class="wrap">
    <div class="values">
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t" data-i18n="nos.val1.t">Personal propio y fijo</span><span class="value__d" data-i18n="nos.val1.d">El mismo equipo en cada visita, uniformado e identificado.</span></div>
      </div>
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t" data-i18n="nos.val2.t">Cotización en 24 horas</span><span class="value__d" data-i18n="nos.val2.d">Visita al sitio, medición y precio cerrado por escrito.</span></div>
      </div>
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t" data-i18n="nos.val3.t">Atención en dos idiomas</span><span class="value__d" data-i18n="nos.val3.d">Español e inglés, sin intermediarios ni traducciones a medias.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="video-strip" aria-label="El equipo trabajando">
  <div>${lazyVideo('nosotros-strip-1', 'nosotros-strip-1-poster')}</div>
  <div>${lazyVideo('nosotros-strip-2', 'nosotros-strip-2-poster')}</div>
  <div>${lazyVideo('nosotros-strip-3', 'nosotros-strip-3-poster')}</div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split split--media-r">
      <div class="split__copy reveal">
        <span class="eyebrow eyebrow--plain" data-i18n="home.team.eyebrow">Nuestro equipo</span>
        <h2 data-i18n="home.team.title">Las mismas personas, cada visita</h2>
        <p data-i18n="nos.team.p">Nos contratan por el trabajo y nos quedan por el detalle. Conócenos: somos personas reales trabajando, no un banco de imágenes.</p>
        <a class="link-underline" href="/contacto/" data-i18n="cta.solicita">Solicita tu cotización</a>
      </div>
      <div class="split__media reveal">
        ${picture('team-nosotros', 'Equipo de TEK-LIM frente a la camioneta rotulada', { style: 'object-position:100% 52%' })}
      </div>
    </div>
  </div>
</section>

${CTA_BAND}`;
  return renderDoc({
    urlPath: '/nosotros/',
    title: 'Nosotros | Equipo de Limpieza en Miami',
    description: 'Conoce al equipo de TEK-LIM MULTISERVI: personal propio, uniformado y bilingüe que trabaja en toda el área de Miami.',
    active: 'nosotros',
    body
  });
}

/* ============================================================
   PÁGINA: CONTACTO
   ============================================================ */
function pageContacto() {
  const body = `<section class="section section--negro" id="form" style="padding:76px 0">
  <div class="wrap">
    <div class="contact-grid">
      <div class="contact-info">
        <span class="eyebrow eyebrow--amarillo" data-i18n="nav.contacto">Contacto</span>
        <h1 style="font-weight:600;font-size:clamp(30px,4vw,42px);line-height:1.08;color:#fff" data-i18n="h1.contacto">Cotiza tu limpieza en Miami</h1>
        <p style="font-size:16.5px;line-height:1.65;color:rgba(255,255,255,.66);max-width:420px" data-i18n="cont.lead">Respondemos el mismo día. Si prefieres hablar, llámanos o escríbenos por WhatsApp al ${PHONE_DISPLAY}.</p>
        <div class="contact-info__list">
          <div class="contact-item"><span class="contact-item__l" data-i18n="cont.phone">Teléfono / WhatsApp</span><span class="contact-item__v"><a href="tel:${PHONE_E164}" style="color:#fff">${PHONE_DISPLAY}</a></span></div>
          <div class="contact-item"><span class="contact-item__l" data-i18n="footer.contact">Correo</span><span class="contact-item__v"><a href="mailto:${EMAIL}" style="color:#fff">${EMAIL}</a></span></div>
          <div class="contact-item"><span class="contact-item__l">Instagram</span><span class="contact-item__v"><a href="${INSTAGRAM}" target="_blank" rel="noopener" style="color:#fff">@teklimmultiservi</a></span></div>
        </div>
      </div>

      <div class="contact-card">
        <form class="form" id="quote-form" novalidate>
          <div class="form__row">
            <div class="field">
              <label for="f-nombre" data-i18n="form.name">Nombre</label>
              <input type="text" id="f-nombre" name="nombre" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="f-tel" data-i18n="form.phone">Teléfono</label>
              <input type="tel" id="f-tel" name="telefono" autocomplete="tel" required>
            </div>
          </div>
          <div class="field">
            <span class="field__label" data-i18n="form.service" style="font:600 12px/1 var(--sans);color:var(--gris)">Servicio</span>
            <div class="chips" id="service-chips" role="radiogroup" aria-label="Servicio">
              <button type="button" class="chip is-active" data-value="Alfombras" data-key="alfombras" data-i18n="svc.alfombras" role="radio" aria-checked="true">Alfombras</button>
              <button type="button" class="chip" data-value="Comercial" data-key="comercial" data-i18n="svc.comercial" role="radio" aria-checked="false">Comercial</button>
              <button type="button" class="chip" data-value="Residencial" data-key="residencial" data-i18n="svc.residencial" role="radio" aria-checked="false">Residencial</button>
              <button type="button" class="chip" data-value="Industrial" data-key="industrial" data-i18n="svc.industrial" role="radio" aria-checked="false">Industrial</button>
            </div>
          </div>
          <div class="field">
            <label for="f-detalle" data-i18n="form.zone">Cuéntanos qué necesitas</label>
            <textarea id="f-detalle" name="detalle" rows="4" placeholder="Ej: Limpieza profunda, oficina de 150 m², dos veces por semana" data-i18n-attr="placeholder" data-i18n="form.zone.ph"></textarea>
          </div>
          <button type="submit" class="btn btn--amarillo btn--lg btn--block" data-i18n="form.submit">Enviar solicitud</button>
          <p class="form__note" data-i18n="form.note">Al enviar se abrirá WhatsApp con tu solicitud lista para mandar. No se guarda ningún dato en el sitio.</p>
        </form>
      </div>
    </div>
  </div>
</section>`;
  return renderDoc({
    urlPath: '/contacto/',
    title: 'Contacto | Cotiza tu Limpieza en Miami',
    description: 'Solicita tu cotización de limpieza en Miami. Respondemos el mismo día por WhatsApp, teléfono o formulario, en español e inglés.',
    active: 'contacto',
    body
  });
}

/* ============================================================
   ESCRITURA DE ARCHIVOS
   ============================================================ */
function write(urlPath, html) {
  const outPath = urlPath === '/'
    ? path.join(ROOT, 'index.html')
    : path.join(ROOT, urlPath.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log('✓', urlPath, '->', path.relative(ROOT, outPath));
}

write('/', pageHome());
write('/servicios/', pageServicios());
SERVICES.forEach(s => write(s.urlPath, pageService(s.key)));
write('/nosotros/', pageNosotros());
write('/contacto/', pageContacto());

console.log('\nListo. 8 páginas generadas.');
