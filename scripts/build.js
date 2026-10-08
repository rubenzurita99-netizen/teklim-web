#!/usr/bin/env node
/*
 * Generador de páginas estáticas — TEK-LIM MULTISERVI (ES + EN)
 * No es un build runtime: Vercel sigue sirviendo HTML/CSS/JS estático plano.
 * Este script evita duplicar a mano el header/footer/SEO en 16 páginas
 * (8 en español + 8 en inglés, sin traducción en vivo por JS: cada
 * idioma es HTML estático propio).
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

/* ---------------- mapa de rutas por idioma ---------------- */
const SERVICE_KEYS = ['alfombras', 'comercial', 'residencial', 'industrial'];
const PAGE_PATHS = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  alfombras: { es: '/limpieza-de-alfombras-miami/', en: '/en/carpet-cleaning-miami/' },
  comercial: { es: '/limpieza-comercial-miami/', en: '/en/commercial-cleaning-miami/' },
  residencial: { es: '/limpieza-residencial-miami/', en: '/en/house-cleaning-miami/' },
  industrial: { es: '/limpieza-industrial-miami/', en: '/en/industrial-cleaning-miami/' },
  nosotros: { es: '/nosotros/', en: '/en/about/' },
  contacto: { es: '/contacto/', en: '/en/contact/' }
};
function pathFor(key, lang) { return PAGE_PATHS[key][lang]; }
function urlFor(key, lang) { return SITE_URL + pathFor(key, lang); }

/* ============================================================
   CONTENIDO — ES / EN (texto estático, sin JS de traducción)
   ============================================================ */
const CONTENT = {
  es: {
    nav: { home: 'Inicio', services: 'Servicios', nosotros: 'Nosotros', contacto: 'Contacto' },
    cta: { cotiza: 'Cotiza ahora', solicita: 'Solicita tu cotización', cotizar: 'Cotizar', vermas: 'Ver más →', equipo: 'Conoce al equipo' },
    svc: { alfombras: 'Alfombras', comercial: 'Comercial', residencial: 'Residencial', industrial: 'Industrial' },
    footer: { tagline: 'Servicios de limpieza en el área de Miami, Florida.', services: 'Servicios', contact: 'Contacto', rights: 'Miami, Florida · Todos los derechos reservados' },
    ctaBand: { title: '¿Cuánto costaría limpiar tu espacio?', p: 'Cuéntanos el tipo de espacio y los metros. Respondemos el mismo día, en el idioma que prefieras.' },
    otherServicesLabel: 'Más servicios',
    hero: {
      zonas: 'Servicio en toda el área de Miami', title1: 'Limpieza profesional', title2: 'para ', titleKw: 'todo Miami',
      sub: 'Comercial, residencial, industrial y alfombras. Equipo propio, uniformado e identificado, con productos y herramienta incluidos.',
      card1Title: 'Para tu casa', card1A: 'Semanal, quincenal o limpieza profunda.', card1B: 'Extracción en caliente, manchas y olores.',
      card2Title: 'Para tu negocio', card2A: 'Oficinas, locales y áreas comunes.', card2B: 'Bodegas, plantas y obra terminada.'
    },
    stats: { a: 'para tu cotización', b: 'cobertura en Miami', c: 'atención en dos idiomas' },
    home: {
      title: 'TEK-LIM MULTISERVI | Limpieza en Miami',
      description: 'Limpieza comercial, residencial, industrial y de alfombras en toda el área de Miami. Equipo propio, uniformado, cotización en 24 horas.',
      servicesTitle: 'Cuatro servicios,<br>un solo equipo',
      servicesNote: 'Cada servicio tiene su propia página con alcance y precios de referencia.',
      svc: {
        alfombras: { t: 'Limpieza de alfombras', d: 'Extracción en caliente para oficinas y casas. Manchas, olores y tráfico alto.' },
        comercial: { t: 'Limpieza comercial', d: 'Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.' },
        residencial: { t: 'Limpieza residencial', d: 'Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.' },
        industrial: { t: 'Limpieza industrial', d: 'Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.' }
      },
      detailTitle: 'Nos contratan por el trabajo. Nos quedan por el detalle.',
      f1: { t: 'Personal propio', d: 'Uniformado, identificado y capacitado. Sin subcontratos.' },
      f2: { t: 'Cotización en 24 horas', d: 'Visitamos el sitio, medimos y enviamos precio cerrado.' },
      f3: { t: 'Español e inglés', d: 'Atendemos en los dos idiomas, sin intermediarios.' },
      f4: { t: 'Productos y equipo incluidos', d: 'Llegamos con todo. Tú no compras nada.' },
      teamEyebrow: 'Nuestro equipo', teamTitle: 'Las mismas personas, cada visita',
      teamP: 'No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.'
    },
    servicesHub: {
      title: 'Servicios de Limpieza en Miami | TEK-LIM',
      description: 'Limpieza comercial, residencial, industrial y de alfombras en Miami. Conoce el alcance y precios de referencia de cada servicio.',
      h1: 'Servicios de limpieza<br>en Miami',
      lead: 'Mismo equipo, misma manera de trabajar. Cambia el espacio, el equipo y la frecuencia. Todos los servicios incluyen productos, herramienta y personal uniformado.',
      listLabel: 'Servicios'
    },
    service: {
      alfombras: {
        title: 'Limpieza de Alfombras en Miami | TEK-LIM',
        description: 'Limpieza de alfombras en Miami con extracción en caliente. Quitamos manchas, olores y alérgenos en oficinas y casas. Cotización en 24 horas.',
        h1: 'Limpieza de Alfombras en Miami',
        idx: 'Extracción en caliente, manchas y olores. Oficinas con tráfico alto y salas residenciales.',
        headline: 'La suciedad que la aspiradora no saca',
        p: 'Extracción en caliente para fibras sintéticas y naturales. Tratamos manchas, olores y alérgenos, y dejamos la alfombra lista para usar el mismo día.',
        f1: { t: 'Oficinas', d: 'tráfico alto' }, f2: { t: 'Residencial', d: 'salas y recámaras' }, f3: { t: 'Mudanzas', d: 'entrega de depósito' },
        ctaText: 'Cotizar limpieza de alfombras', serviceType: 'Limpieza de alfombras'
      },
      comercial: {
        title: 'Limpieza Comercial en Miami | TEK-LIM',
        description: 'Limpieza comercial en Miami para oficinas, locales y áreas comunes. Programas diarios o semanales con personal uniformado. Cotiza en 24h.',
        h1: 'Limpieza Comercial en Miami',
        idx: 'Oficinas, locales y áreas comunes. Programas diarios, semanales o por evento.',
        headline: 'Tu oficina abre limpia todos los días',
        p: 'Programas diarios, semanales o por evento para oficinas, locales y áreas comunes. Baños, cocinas, vidrios, pisos y basura, con lista de verificación por visita.',
        f1: { t: 'Horario flexible', d: 'antes o después de operar' }, f2: { t: 'Personal fijo', d: 'las mismas caras' },
        ctaText: 'Cotizar limpieza comercial', serviceType: 'Limpieza comercial'
      },
      residencial: {
        title: 'Limpieza Residencial en Miami | TEK-LIM',
        description: 'Limpieza residencial en Miami: casas y apartamentos, recurrente o profunda. Equipo propio y uniformado. Cotización en 24 horas.',
        h1: 'Limpieza Residencial en Miami',
        idx: 'Casas y apartamentos. Mantenimiento recurrente, mudanzas y limpieza profunda.',
        headline: 'Entramos a tu casa con respeto',
        p: 'Casas y apartamentos, por única vez o de forma recurrente. Limpieza profunda, mudanzas y mantenimiento semanal con el mismo equipo cada visita.',
        f1: { t: 'Recurrente', d: 'semanal o quincenal' }, f2: { t: 'Profunda', d: 'interiores de muebles' },
        ctaText: 'Cotizar limpieza residencial', serviceType: 'Limpieza residencial'
      },
      industrial: {
        title: 'Limpieza Industrial en Miami | TEK-LIM',
        description: 'Limpieza industrial en Miami para bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad. Cotiza en 24h.',
        h1: 'Limpieza Industrial en Miami',
        idx: 'Bodegas, plantas y obra terminada. Equipo pesado y protocolos de seguridad.',
        headline: 'Bodegas, plantas y obra terminada',
        p: 'Superficies grandes, maquinaria y residuos. Trabajamos con protocolos de seguridad y coordinamos con tu supervisor de planta.',
        f1: { t: 'Equipo pesado', d: 'pulido y lavado a presión' }, f2: { t: 'Post-obra', d: 'entrega lista para operar' },
        ctaText: 'Cotizar limpieza industrial', serviceType: 'Limpieza industrial'
      }
    },
    nosotros: {
      title: 'Nosotros | Equipo de Limpieza en Miami',
      description: 'Conoce al equipo de TEK-LIM MULTISERVI: personal propio, uniformado y bilingüe que trabaja en toda el área de Miami.',
      h1: 'Un equipo de limpieza en Miami<br>que cuida los detalles que nadie ve',
      lead: 'Somos un equipo de limpieza con base en Miami. Trabajamos en toda el área de Miami, en oficinas, casas, bodegas y alfombras.',
      storyLead: 'No subcontratamos. El equipo que conoce tu espacio es el que regresa, con uniforme, gafete y la misma forma de trabajar.',
      p1: 'TEK-LIM MULTISERVI nació para resolver un problema simple: que la limpieza se sienta confiable. Por eso trabajamos con personal propio, no rotativo, capacitado y presentado con uniforme y gafete.',
      p2: 'Atendemos comercios, casas, bodegas y alfombras en el área de Miami. Cada trabajo empieza con una visita, una medición y una cotización cerrada por escrito en 24 horas, sin sorpresas.',
      p3: 'Llegamos con todo: productos, herramienta y equipo. Atendemos en español e inglés, sin intermediarios ni traducciones a medias.',
      val1: { t: 'Personal propio y fijo', d: 'El mismo equipo en cada visita, uniformado e identificado.' },
      val2: { t: 'Cotización en 24 horas', d: 'Visita al sitio, medición y precio cerrado por escrito.' },
      val3: { t: 'Atención en dos idiomas', d: 'Español e inglés, sin intermediarios ni traducciones a medias.' },
      teamP: 'Nos contratan por el trabajo y nos quedan por el detalle. Conócenos: somos personas reales trabajando, no un banco de imágenes.'
    },
    contacto: {
      title: 'Contacto | Cotiza tu Limpieza en Miami',
      description: 'Solicita tu cotización de limpieza en Miami. Respondemos el mismo día por WhatsApp, teléfono o formulario, en español e inglés.',
      h1: 'Cotiza tu limpieza en Miami',
      lead: `Respondemos el mismo día. Si prefieres hablar, llámanos o escríbenos por WhatsApp al ${PHONE_DISPLAY}.`,
      phoneLabel: 'Teléfono / WhatsApp',
      form: {
        name: 'Nombre', phone: 'Teléfono', service: 'Servicio', zone: 'Cuéntanos qué necesitas',
        zonePh: 'Ej: Limpieza profunda, oficina de 150 m², dos veces por semana', submit: 'Enviar solicitud',
        note: 'Al enviar se abrirá WhatsApp con tu solicitud lista para mandar. No se guarda ningún dato en el sitio.'
      }
    },
    alt: {
      teamHome: 'Equipo de TEK-LIM MULTISERVI', teamNosotros: 'Equipo de TEK-LIM frente a la camioneta rotulada',
      serviceComercial: 'Limpieza comercial de oficinas', serviceResidencialKitchen: 'Limpieza residencial - cocina',
      serviceResidencialBathroom: 'Limpieza residencial - baño', serviceIndustrial: 'Limpieza industrial'
    }
  },

  en: {
    nav: { home: 'Home', services: 'Services', nosotros: 'About', contacto: 'Contact' },
    cta: { cotiza: 'Get a quote', solicita: 'Request a quote', cotizar: 'Get a quote', vermas: 'See more →', equipo: 'Meet the team' },
    svc: { alfombras: 'Carpets', comercial: 'Commercial', residencial: 'Residential', industrial: 'Industrial' },
    footer: { tagline: 'Cleaning services in the Miami, Florida area.', services: 'Services', contact: 'Contact', rights: 'Miami, Florida · All rights reserved' },
    ctaBand: { title: 'What would it cost to clean your space?', p: 'Tell us the type of space and the size. We reply the same day, in the language you prefer.' },
    otherServicesLabel: 'More services',
    hero: {
      zonas: 'Serving the entire Miami area', title1: 'Professional cleaning', title2: 'for ', titleKw: 'all of Miami',
      sub: 'Commercial, residential, industrial and carpet cleaning. Our own crew, in uniform and by name, with supplies and equipment included.',
      card1Title: 'For your home', card1A: 'Weekly, biweekly or deep cleaning.', card1B: 'Hot-water extraction, stains and odors.',
      card2Title: 'For your business', card2A: 'Offices, storefronts and common areas.', card2B: 'Warehouses, plants and post-construction.'
    },
    stats: { a: 'for your quote', b: 'Miami-wide coverage', c: 'service in two languages' },
    home: {
      title: 'TEK-LIM MULTISERVI | Cleaning Services in Miami',
      description: 'Commercial, residential, industrial and carpet cleaning across the Miami area. Our own uniformed crew, quote within 24 hours.',
      servicesTitle: 'Four services,<br>one crew',
      servicesNote: 'Each service has its own page with scope and reference pricing.',
      svc: {
        alfombras: { t: 'Carpet cleaning', d: 'Hot-water extraction for offices and homes. Stains, odors and high traffic.' },
        comercial: { t: 'Commercial cleaning', d: 'Offices, storefronts and common areas. Daily, weekly or per-event programs.' },
        residencial: { t: 'Residential cleaning', d: 'Homes and apartments. Recurring upkeep, move-outs and deep cleaning.' },
        industrial: { t: 'Industrial cleaning', d: 'Warehouses, plants and post-construction. Heavy equipment and safety protocols.' }
      },
      detailTitle: 'They hire us for the work. They stay for the detail.',
      f1: { t: 'Our own staff', d: 'In uniform, badged and trained. No subcontractors.' },
      f2: { t: 'Quote in 24 hours', d: 'We visit the site, measure and send a firm price.' },
      f3: { t: 'Spanish and English', d: 'We serve you in both languages, no middlemen.' },
      f4: { t: 'Supplies and equipment included', d: 'We bring everything. You buy nothing.' },
      teamEyebrow: 'Our team', teamTitle: 'The same people, every visit',
      teamP: 'We don’t subcontract. The crew that knows your space is the one that comes back — in uniform, badged, working the same way.'
    },
    servicesHub: {
      title: 'Cleaning Services in Miami | TEK-LIM',
      description: 'Commercial, residential, industrial and carpet cleaning in Miami. See the scope and reference pricing for each service.',
      h1: 'Cleaning services<br>in Miami',
      lead: 'Same crew, same way of working. What changes is the space, the equipment and the frequency. Every service includes supplies, tools and uniformed staff.',
      listLabel: 'Services'
    },
    service: {
      alfombras: {
        title: 'Carpet Cleaning in Miami | TEK-LIM',
        description: 'Carpet cleaning in Miami with hot-water extraction. We remove stains, odors and allergens in offices and homes. Quote in 24h.',
        h1: 'Carpet Cleaning in Miami',
        idx: 'Hot-water extraction, stains and odors. High-traffic offices and residential rooms.',
        headline: 'The dirt the vacuum leaves behind',
        p: 'Hot-water extraction for synthetic and natural fibers. We treat stains, odors and allergens, and leave the carpet ready to use the same day.',
        f1: { t: 'Offices', d: 'high traffic' }, f2: { t: 'Residential', d: 'living rooms and bedrooms' }, f3: { t: 'Move-outs', d: 'deposit handover' },
        ctaText: 'Quote carpet cleaning', serviceType: 'Carpet cleaning'
      },
      comercial: {
        title: 'Commercial Cleaning in Miami | TEK-LIM',
        description: 'Commercial cleaning in Miami for offices, storefronts and common areas. Daily or weekly programs, uniformed staff. Quote in 24h.',
        h1: 'Commercial Cleaning in Miami',
        idx: 'Offices, storefronts and common areas. Daily, weekly or per-event programs.',
        headline: 'Your office opens clean every day',
        p: 'Daily, weekly or per-event programs for offices, storefronts and common areas. Restrooms, kitchens, glass, floors and trash, with a checklist every visit.',
        f1: { t: 'Flexible hours', d: 'before or after operating' }, f2: { t: 'Fixed staff', d: 'the same faces' },
        ctaText: 'Quote commercial cleaning', serviceType: 'Commercial cleaning'
      },
      residencial: {
        title: 'House Cleaning in Miami | TEK-LIM',
        description: 'House cleaning in Miami: homes and apartments, recurring or deep clean, with our own uniformed crew. Quote within 24 hours.',
        h1: 'House Cleaning in Miami',
        idx: 'Homes and apartments. Recurring upkeep, move-outs and deep cleaning.',
        headline: 'We enter your home with respect',
        p: 'Homes and apartments, one-time or recurring. Deep cleaning, move-outs and weekly upkeep with the same crew every visit.',
        f1: { t: 'Recurring', d: 'weekly or biweekly' }, f2: { t: 'Deep', d: 'inside furniture' },
        ctaText: 'Quote house cleaning', serviceType: 'House cleaning'
      },
      industrial: {
        title: 'Industrial Cleaning in Miami | TEK-LIM',
        description: 'Industrial cleaning in Miami for warehouses, plants and post-construction. Heavy equipment and safety protocols. Quote in 24h.',
        h1: 'Industrial Cleaning in Miami',
        idx: 'Warehouses, plants and post-construction. Heavy equipment and safety protocols.',
        headline: 'Warehouses, plants and post-construction',
        p: 'Large surfaces, machinery and debris. We work with safety protocols and coordinate with your plant supervisor.',
        f1: { t: 'Heavy equipment', d: 'polishing and pressure washing' }, f2: { t: 'Post-construction', d: 'handed over ready to operate' },
        ctaText: 'Quote industrial cleaning', serviceType: 'Industrial cleaning'
      }
    },
    nosotros: {
      title: 'About Us | Miami Cleaning Crew | TEK-LIM',
      description: 'Meet the TEK-LIM MULTISERVI crew: our own uniformed, bilingual staff working across the greater Miami area.',
      h1: 'A Miami cleaning crew<br>that cares about the details no one sees',
      lead: 'We are a cleaning crew based in Miami. We work across the greater Miami area — offices, homes, warehouses and carpets.',
      storyLead: 'We don’t subcontract. The crew that knows your space is the one that comes back — in uniform, badged, working the same way.',
      p1: 'TEK-LIM MULTISERVI started to solve a simple problem: making cleaning feel reliable. That’s why we work with our own staff — not rotating — trained and presented in uniform and badge.',
      p2: 'We serve businesses, homes, warehouses and carpets across the Miami area. Every job starts with a visit, a measurement and a firm written quote within 24 hours — no surprises.',
      p3: 'We arrive with everything: supplies, tools and equipment. We serve you in Spanish and English, no middlemen or half-done translations.',
      val1: { t: 'Our own, fixed staff', d: 'The same crew every visit, in uniform and badged.' },
      val2: { t: 'Quote in 24 hours', d: 'Site visit, measurement and a firm written price.' },
      val3: { t: 'Service in two languages', d: 'Spanish and English, no middlemen or half-done translations.' },
      teamP: 'They hire us for the work and stay for the detail. Get to know us: we’re real people working, not stock photos.'
    },
    contacto: {
      title: 'Contact | Get a Cleaning Quote in Miami',
      description: 'Request your Miami cleaning quote. We reply the same day by WhatsApp, phone or form, in English or Spanish.',
      h1: 'Get your Miami cleaning quote',
      lead: `We reply the same day. If you’d rather talk, call us or message us on WhatsApp at ${PHONE_DISPLAY}.`,
      phoneLabel: 'Phone / WhatsApp',
      form: {
        name: 'Name', phone: 'Phone', service: 'Service', zone: 'Tell us what you need',
        zonePh: 'E.g. Deep cleaning, 150 m² office, twice a week', submit: 'Send request',
        note: 'Sending opens WhatsApp with your request ready to send. No data is stored on the site.'
      }
    },
    alt: {
      teamHome: 'TEK-LIM MULTISERVI crew', teamNosotros: 'TEK-LIM crew in front of the branded van',
      serviceComercial: 'Commercial office cleaning', serviceResidencialKitchen: 'Residential cleaning - kitchen',
      serviceResidencialBathroom: 'Residential cleaning - bathroom', serviceIndustrial: 'Industrial cleaning'
    }
  }
};

function svcSchemaType(lang, key) { return CONTENT[lang].service[key].serviceType; }

/* ---------------- schema ---------------- */
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

function serviceSchema(lang, key) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svcSchemaType(lang, key),
    provider: { '@type': 'LocalBusiness', name: 'TEK-LIM MULTISERVI', telephone: PHONE_E164 },
    areaServed: { '@type': 'Place', name: 'Miami, FL' },
    url: urlFor(key, lang)
  };
}

/* ---------------- <head> ---------------- */
function renderHead({ lang, pageKey, title, description, extraSchema, preloadHero }) {
  assertLen(`title ${lang}:${pageKey}`, title, 60);
  assertLen(`description ${lang}:${pageKey}`, description, 155);
  const canonical = urlFor(pageKey, lang);
  const ogLocale = lang === 'en' ? 'en_US' : 'es_US';
  const schemas = [LOCAL_BUSINESS_SCHEMA].concat(extraSchema ? [extraSchema] : []);
  const hreflangs = [
    `<link rel="alternate" hreflang="es" href="${urlFor(pageKey, 'es')}">`,
    `<link rel="alternate" hreflang="en" href="${urlFor(pageKey, 'en')}">`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor(pageKey, 'es')}">`
  ].join('\n');
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${hreflangs}
<link rel="icon" type="image/svg+xml" href="/assets/icons/tkm-icon.svg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TEK-LIM MULTISERVI">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${ogLocale}">
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
function renderLangSwitch(lang, pageKey) {
  const esUrl = pathFor(pageKey, 'es');
  const enUrl = pathFor(pageKey, 'en');
  return `<div class="lang" role="group" aria-label="Language / Idioma">
          <a href="${esUrl}"${lang === 'es' ? ' class="is-active"' : ''}>ES</a>
          <a href="${enUrl}"${lang === 'en' ? ' class="is-active"' : ''}>EN</a>
        </div>`;
}

function renderHeader(lang, pageKey) {
  const C = CONTENT[lang];
  function navLink(key) {
    const active = pageKey === key || (key === 'services' && CONTENT.es.service[pageKey]);
    return `<a href="${pathFor(key, lang)}"${active ? ' class="is-active"' : ''}>${C.nav[key]}</a>`;
  }
  const homeHref = pathFor('home', lang);
  const contactoHref = pathFor('contacto', lang);
  return `<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${homeHref}" aria-label="TEK-LIM MULTISERVI">
      <img class="brand__icon" src="/assets/icons/tkm-icon.svg" alt="TKM" width="40" height="38">
      <img class="brand__word" src="/assets/icons/tkm-wordmark.svg" alt="TEK-LIM MULTISERVI" width="89" height="20">
    </a>
    <nav class="nav" id="nav" aria-label="Principal">
      ${navLink('home')}
      ${navLink('services')}
      ${navLink('nosotros')}
      ${navLink('contacto')}
      <div class="mobile-actions">
        ${renderLangSwitch(lang, pageKey)}
        <a class="btn btn--amarillo" href="${contactoHref}">${C.cta.cotiza}</a>
      </div>
    </nav>
    <div class="header-actions">
      ${renderLangSwitch(lang, pageKey)}
      <a class="btn btn--amarillo" href="${contactoHref}">${C.cta.cotiza}</a>
      <button class="burger" id="burger" aria-label="Menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
}

function renderFooter(lang) {
  const C = CONTENT[lang];
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="/assets/icons/tkm-wordmark-footer.svg" alt="TEK-LIM MULTISERVI" width="129" height="20">
      <p>${C.footer.tagline}</p>
    </div>
    <div class="footer-col">
      <h4>${C.footer.services}</h4>
      ${SERVICE_KEYS.map(k => `<a href="${pathFor(k, lang)}">${C.svc[k]}</a>`).join('\n      ')}
    </div>
    <div class="footer-col">
      <h4>${C.footer.contact}</h4>
      <a href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="${INSTAGRAM}" target="_blank" rel="noopener">@teklimmultiservi</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <span id="year"></span> TEK-LIM MULTISERVI</span>
    <span>${C.footer.rights}</span>
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

/* ---------------- bloque "otros servicios" ---------------- */
function otrosServiciosBlock(lang, currentKey) {
  const C = CONTENT[lang];
  const others = SERVICE_KEYS.filter(k => k !== currentKey);
  return `<section class="section" style="padding:48px 0 0">
  <div class="wrap">
    <span class="eyebrow eyebrow--plain">${C.otherServicesLabel}</span>
    <ul style="display:flex;gap:28px;flex-wrap:wrap;margin-top:18px;list-style:none;padding:0">
      ${others.map(k => `<li><a class="link-underline" href="${pathFor(k, lang)}">${C.home.svc[k].t}</a></li>`).join('\n      ')}
      <li><a class="link-underline" href="${pathFor('services', lang)}">${C.nav.services}</a></li>
    </ul>
  </div>
</section>`;
}

function bottomBar(lang, serviceKey) {
  const C = CONTENT[lang];
  const contactoPath = pathFor('contacto', lang);
  const href = serviceKey ? `${contactoPath}?servicio=${serviceKey}` : contactoPath;
  return `<div class="svc-bottombar"><a class="btn btn--amarillo btn--block" href="${href}">${C.cta.cotizar}</a><a class="btn btn--negro btn--block" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp</a></div>`;
}

function ctaBand(lang) {
  const C = CONTENT[lang];
  return `<section class="cta-band">
  <div class="cta-band__inner">
    <div class="cta-band__copy">
      <h2>${C.ctaBand.title}</h2>
      <p>${C.ctaBand.p}</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--amarillo btn--lg" href="${pathFor('contacto', lang)}">${C.cta.solicita}</a>
      <a class="btn btn--ghost btn--lg" href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
    </div>
  </div>
</section>`;
}

/* ---------------- documento HTML ---------------- */
const OLD_HASH_REDIRECT = `<script>
(function(){
  var map={servicios:'/servicios/',nosotros:'/nosotros/',contacto:'/contacto/'};
  var h=(location.hash||'').slice(1);
  if(map[h]){ location.replace(map[h]+location.search); }
})();
</script>`;

function renderDoc({ lang, pageKey, title, description, bodyClass, extraSchema, preloadHero, redirectOldHashes, body }) {
  const head = renderHead({ lang, pageKey, title, description, extraSchema, preloadHero });
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${redirectOldHashes ? OLD_HASH_REDIRECT + '\n' : ''}${head}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${renderHeader(lang, pageKey)}
<main id="app">
${body}
</main>
${renderFooter(lang)}
<script src="/js/main.js"></script>
</body>
</html>
`;
}

/* ============================================================
   PÁGINA: INICIO / HOME
   ============================================================ */
function pageHome(lang) {
  const C = CONTENT[lang];
  const alt = C.alt;
  const body = `<!-- ============ HERO ============ -->
<section class="hero">
  ${picture('hero-bg', '', { cls: 'hero__bg', eager: true, fetchpriority: 'high' })}
  <div class="hero__overlay"></div>
  <div class="hero__inner">
    <div class="hero__copy">
      <span class="eyebrow eyebrow--amarillo fade-1">${C.hero.zonas}</span>
      <h1 class="hero__title">
        <span>${C.hero.title1}</span><br>
        <span>${C.hero.title2}</span><span class="kw"><span class="kw__in">${C.hero.titleKw}</span></span>
      </h1>
      <p class="hero__p fade-2">${C.hero.sub}</p>
      <div class="hero__cta fade-3">
        <a class="btn btn--amarillo btn--lg" href="${pathFor('contacto', lang)}">${C.cta.solicita}</a>
        <a class="btn btn--ghost btn--lg" href="tel:${PHONE_E164}">${PHONE_DISPLAY}</a>
      </div>
    </div>
    <div class="hero__cards">
      <div class="svc-card">
        <div class="svc-card__head">
          <h3>${C.hero.card1Title}</h3>
        </div>
        <div class="svc-card__grid">
          <a class="svc-mini" href="${pathFor('residencial', lang)}">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t">${C.svc.residencial}</span>
            <span class="svc-mini__d">${C.hero.card1A}</span>
          </a>
          <a class="svc-mini" href="${pathFor('alfombras', lang)}">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t">${C.svc.alfombras}</span>
            <span class="svc-mini__d">${C.hero.card1B}</span>
          </a>
        </div>
      </div>
      <div class="svc-card">
        <div class="svc-card__head">
          <h3>${C.hero.card2Title}</h3>
        </div>
        <div class="svc-card__grid">
          <a class="svc-mini" href="${pathFor('comercial', lang)}">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t">${C.svc.comercial}</span>
            <span class="svc-mini__d">${C.hero.card2A}</span>
          </a>
          <a class="svc-mini" href="${pathFor('industrial', lang)}">
            <span class="svc-mini__ico"><span class="hex"></span></span>
            <span class="svc-mini__t">${C.svc.industrial}</span>
            <span class="svc-mini__d">${C.hero.card2B}</span>
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
      <div class="stat"><span class="stat__n">24 h</span><span class="stat__l">${C.stats.a}</span></div>
      <div class="stat"><span class="stat__n">100%</span><span class="stat__l">${C.stats.b}</span></div>
      <div class="stat"><span class="stat__n">ES / EN</span><span class="stat__l">${C.stats.c}</span></div>
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
      <h2 class="section__title">${C.home.servicesTitle}</h2>
      <p class="section__note">${C.home.servicesNote}</p>
    </div>
    <div class="svc-grid">
      <a class="svc-tile reveal" href="${pathFor('alfombras', lang)}">
        <span class="svc-tile__hex svc-tile__hex--amarillo hex-flat"></span>
        <h4>${C.home.svc.alfombras.t}</h4>
        <p>${C.home.svc.alfombras.d}</p>
        <span class="link-underline">${C.cta.cotizar}</span>
      </a>
      <a class="svc-tile reveal" href="${pathFor('comercial', lang)}">
        <span class="svc-tile__hex svc-tile__hex--negro hex-flat"></span>
        <h4>${C.home.svc.comercial.t}</h4>
        <p>${C.home.svc.comercial.d}</p>
        <span class="link-underline">${C.cta.cotizar}</span>
      </a>
      <a class="svc-tile reveal" href="${pathFor('residencial', lang)}">
        <span class="svc-tile__hex svc-tile__hex--amarillo hex-flat"></span>
        <h4>${C.home.svc.residencial.t}</h4>
        <p>${C.home.svc.residencial.d}</p>
        <span class="link-underline">${C.cta.cotizar}</span>
      </a>
      <a class="svc-tile reveal" href="${pathFor('industrial', lang)}">
        <span class="svc-tile__hex svc-tile__hex--negro hex-flat"></span>
        <h4>${C.home.svc.industrial.t}</h4>
        <p>${C.home.svc.industrial.d}</p>
        <span class="link-underline">${C.cta.cotizar}</span>
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
    <h2>${C.home.detailTitle}</h2>
    <div class="feature-grid">
      <div class="feature reveal">
        <span class="feature__t">${C.home.f1.t}</span>
        <span class="feature__d">${C.home.f1.d}</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t">${C.home.f2.t}</span>
        <span class="feature__d">${C.home.f2.d}</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t">${C.home.f3.t}</span>
        <span class="feature__d">${C.home.f3.d}</span>
      </div>
      <div class="feature reveal">
        <span class="feature__t">${C.home.f4.t}</span>
        <span class="feature__d">${C.home.f4.d}</span>
      </div>
    </div>
    <a class="link-underline" href="${pathFor('nosotros', lang)}">${C.cta.equipo}</a>
  </div>
</section>

<!-- ============ EQUIPO ============ -->
<section class="section section--hueso">
  <div class="wrap">
    <div class="split split--media-r">
      <div class="split__copy reveal">
        <span class="eyebrow eyebrow--plain">${C.home.teamEyebrow}</span>
        <h2>${C.home.teamTitle}</h2>
        <p>${C.home.teamP}</p>
        <a class="link-underline" href="${pathFor('nosotros', lang)}">${C.cta.equipo}</a>
      </div>
      <div class="split__media reveal">
        ${picture('team-home', alt.teamHome, { style: 'object-position:50% 30%' })}
      </div>
    </div>
  </div>
</section>

${ctaBand(lang)}`;
  return renderDoc({
    lang, pageKey: 'home',
    title: C.home.title, description: C.home.description,
    preloadHero: true, redirectOldHashes: lang === 'es',
    body
  });
}

/* ============================================================
   PÁGINA: SERVICIOS (índice) / SERVICES
   ============================================================ */
function pageServicesHub(lang) {
  const C = CONTENT[lang];
  const nums = { alfombras: '01', comercial: '02', residencial: '03', industrial: '04' };
  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain">${C.nav.services}</span>
        <h1>${C.servicesHub.h1}</h1>
      </div>
      <p class="page-hero__lead">${C.servicesHub.lead}</p>
    </div>
  </div>
</section>

<section class="section" style="padding:56px 0">
  <div class="wrap">
    <div style="display:flex;align-items:baseline;gap:16px;margin-bottom:8px">
      <span class="eyebrow eyebrow--plain">${C.servicesHub.listLabel}</span>
      <span style="flex:1;height:1px;background:var(--linea);display:block"></span>
      <span style="font:600 11px/1 var(--mono);color:var(--gris)">04</span>
    </div>
    <ul class="serv-index">
      ${SERVICE_KEYS.map(k => `<li><a href="${pathFor(k, lang)}"><span class="serv-index__n">${nums[k]}</span><span class="serv-index__t">${C.svc[k]}</span><span class="serv-index__d">${C.service[k].idx}</span><span class="serv-index__more">${C.cta.vermas}</span></a></li>`).join('\n      ')}
    </ul>
  </div>
</section>

${ctaBand(lang)}
${bottomBar(lang)}`;
  return renderDoc({
    lang, pageKey: 'services',
    title: C.servicesHub.title, description: C.servicesHub.description,
    bodyClass: 'on-servicios',
    body
  });
}

/* ============================================================
   PÁGINAS DE SERVICIO
   ============================================================ */
function serviceMedia(lang, key) {
  const alt = CONTENT[lang].alt;
  if (key === 'alfombras') {
    return `<div class="svc-row__media">${lazyVideo('service-alfombras', 'service-alfombras', 'object-position:50% 42%')}</div>`;
  }
  if (key === 'comercial') {
    return `<div class="svc-row__media">${picture('service-comercial', alt.serviceComercial)}</div>`;
  }
  if (key === 'residencial') {
    return `<div class="svc-row__media svc-row__media--split">
    ${picture('service-residencial-kitchen', alt.serviceResidencialKitchen)}
    ${picture('service-residencial-bathroom', alt.serviceResidencialBathroom)}
  </div>`;
  }
  if (key === 'industrial') {
    return `<div class="svc-row__media">${picture('service-industrial', alt.serviceIndustrial, { style: 'object-position:50% 45%' })}</div>`;
  }
}

function pageService(lang, key) {
  const C = CONTENT[lang];
  const S = C.service[key];
  const nums = { alfombras: '01', comercial: '02', residencial: '03', industrial: '04' };
  const rowClass = (key === 'comercial' || key === 'industrial') ? 'svc-row svc-row--rev' : 'svc-row';
  const media = serviceMedia(lang, key);
  const bodyBlock = `<div class="svc-row__body">
    <div class="svc-row__tag"><span class="svc-row__num">${nums[key]}</span><span class="svc-row__cat">${C.svc[key]}</span></div>
    <h2 data-kinetic>${S.headline}</h2>
    <p>${S.p}</p>
    <div class="svc-row__facts">
      <div class="fact"><span class="fact__t">${S.f1.t}</span><span class="fact__d">${S.f1.d}</span></div>
      <div class="fact"><span class="fact__t">${S.f2.t}</span><span class="fact__d">${S.f2.d}</span></div>
      ${key === 'alfombras' ? `<div class="fact"><span class="fact__t">${S.f3.t}</span><span class="fact__d">${S.f3.d}</span></div>` : ''}
    </div>
    <a class="link-underline" href="${pathFor('contacto', lang)}?servicio=${key}" data-servicio="${key}">${S.ctaText}</a>
  </div>`;
  const rowInner = (key === 'comercial' || key === 'industrial') ? `${media}\n  ${bodyBlock}` : `${bodyBlock}\n  ${media}`;

  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain">${C.nav.services}</span>
        <h1>${S.h1}</h1>
      </div>
      <p class="page-hero__lead">${S.idx}</p>
    </div>
  </div>
</section>

<section class="${rowClass}">
  ${rowInner}
</section>

${otrosServiciosBlock(lang, key)}

${ctaBand(lang)}
${bottomBar(lang, key)}`;

  return renderDoc({
    lang, pageKey: key,
    title: S.title, description: S.description,
    bodyClass: 'on-servicios',
    extraSchema: serviceSchema(lang, key),
    body
  });
}

/* ============================================================
   PÁGINA: NOSOTROS / ABOUT
   ============================================================ */
function pageNosotros(lang) {
  const C = CONTENT[lang];
  const N = C.nosotros;
  const alt = C.alt;
  const body = `<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__grid">
      <div style="display:flex;flex-direction:column;gap:22px">
        <span class="eyebrow eyebrow--plain">${C.nav.nosotros}</span>
        <h1>${N.h1}</h1>
      </div>
      <p class="page-hero__lead">${N.lead}</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="story">
      <p class="story__lead reveal">${N.storyLead}</p>
      <div class="story__body reveal">
        <p>${N.p1}</p>
        <p>${N.p2}</p>
        <p>${N.p3}</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--hueso" style="padding:64px 0">
  <div class="wrap">
    <div class="values">
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t">${N.val1.t}</span><span class="value__d">${N.val1.d}</span></div>
      </div>
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t">${N.val2.t}</span><span class="value__d">${N.val2.d}</span></div>
      </div>
      <div class="value reveal">
        <span class="value__hex hex"></span>
        <div><span class="value__t">${N.val3.t}</span><span class="value__d">${N.val3.d}</span></div>
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
        <span class="eyebrow eyebrow--plain">${C.home.teamEyebrow}</span>
        <h2>${C.home.teamTitle}</h2>
        <p>${N.teamP}</p>
        <a class="link-underline" href="${pathFor('contacto', lang)}">${C.cta.solicita}</a>
      </div>
      <div class="split__media reveal">
        ${picture('team-nosotros', alt.teamNosotros, { style: 'object-position:100% 52%' })}
      </div>
    </div>
  </div>
</section>

${ctaBand(lang)}`;
  return renderDoc({
    lang, pageKey: 'nosotros',
    title: N.title, description: N.description,
    body
  });
}

/* ============================================================
   PÁGINA: CONTACTO / CONTACT
   ============================================================ */
function pageContacto(lang) {
  const C = CONTENT[lang];
  const K = C.contacto;
  const body = `<section class="section section--negro" id="form" style="padding:76px 0">
  <div class="wrap">
    <div class="contact-grid">
      <div class="contact-info">
        <span class="eyebrow eyebrow--amarillo">${C.nav.contacto}</span>
        <h1 style="font-weight:600;font-size:clamp(30px,4vw,42px);line-height:1.08;color:#fff">${K.h1}</h1>
        <p style="font-size:16.5px;line-height:1.65;color:rgba(255,255,255,.66);max-width:420px">${K.lead}</p>
        <div class="contact-info__list">
          <div class="contact-item"><span class="contact-item__l">${K.phoneLabel}</span><span class="contact-item__v"><a href="tel:${PHONE_E164}" style="color:#fff">${PHONE_DISPLAY}</a></span></div>
          <div class="contact-item"><span class="contact-item__l">${C.footer.contact}</span><span class="contact-item__v"><a href="mailto:${EMAIL}" style="color:#fff">${EMAIL}</a></span></div>
          <div class="contact-item"><span class="contact-item__l">Instagram</span><span class="contact-item__v"><a href="${INSTAGRAM}" target="_blank" rel="noopener" style="color:#fff">@teklimmultiservi</a></span></div>
        </div>
      </div>

      <div class="contact-card">
        <form class="form" id="quote-form" novalidate>
          <div class="form__row">
            <div class="field">
              <label for="f-nombre">${K.form.name}</label>
              <input type="text" id="f-nombre" name="nombre" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="f-tel">${K.form.phone}</label>
              <input type="tel" id="f-tel" name="telefono" autocomplete="tel" required>
            </div>
          </div>
          <div class="field">
            <span class="field__label" style="font:600 12px/1 var(--sans);color:var(--gris)">${K.form.service}</span>
            <div class="chips" id="service-chips" role="radiogroup" aria-label="${K.form.service}">
              <button type="button" class="chip is-active" data-value="${C.svc.alfombras}" data-key="alfombras" role="radio" aria-checked="true">${C.svc.alfombras}</button>
              <button type="button" class="chip" data-value="${C.svc.comercial}" data-key="comercial" role="radio" aria-checked="false">${C.svc.comercial}</button>
              <button type="button" class="chip" data-value="${C.svc.residencial}" data-key="residencial" role="radio" aria-checked="false">${C.svc.residencial}</button>
              <button type="button" class="chip" data-value="${C.svc.industrial}" data-key="industrial" role="radio" aria-checked="false">${C.svc.industrial}</button>
            </div>
          </div>
          <div class="field">
            <label for="f-detalle">${K.form.zone}</label>
            <textarea id="f-detalle" name="detalle" rows="4" placeholder="${K.form.zonePh}"></textarea>
          </div>
          <button type="submit" class="btn btn--amarillo btn--lg btn--block">${K.form.submit}</button>
          <p class="form__note">${K.form.note}</p>
        </form>
      </div>
    </div>
  </div>
</section>`;
  return renderDoc({
    lang, pageKey: 'contacto',
    title: K.title, description: K.description,
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

['es', 'en'].forEach(lang => {
  write(pathFor('home', lang), pageHome(lang));
  write(pathFor('services', lang), pageServicesHub(lang));
  SERVICE_KEYS.forEach(k => write(pathFor(k, lang), pageService(lang, k)));
  write(pathFor('nosotros', lang), pageNosotros(lang));
  write(pathFor('contacto', lang), pageContacto(lang));
});

console.log('\nListo. 16 páginas generadas (8 ES + 8 EN).');
