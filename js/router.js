(function(){
  var pages=[].slice.call(document.querySelectorAll('.page'));
  function isPage(name){return !!document.querySelector('.page[data-page="'+name+'"]');}
  function setActiveNav(name){
    document.querySelectorAll('.nav a[href^="#"]').forEach(function(a){
      a.classList.toggle('is-active', a.getAttribute('href').slice(1)===name);
    });
  }
  function show(name, opts){
    opts=opts||{};
    if(!isPage(name)) name='inicio';
    pages.forEach(function(p){ p.hidden = (p.getAttribute('data-page')!==name); });
    setActiveNav(name);
    document.body.classList.toggle('on-servicios', name==='servicios');
    window.scrollTo(0,0);
    var page=document.querySelector('.page[data-page="'+name+'"]');
    page.querySelectorAll('video').forEach(function(v){ v.muted=true; var pr=v.play(); if(pr&&pr.catch)pr.catch(function(){}); });
    setTimeout(function(){ page.querySelectorAll('[data-kinetic]').forEach(function(el){ el.classList.add('kin-in'); }); }, 350);
    if(opts.servicio){ var chip=page.querySelector('.chip[data-key="'+opts.servicio+'"]'); if(chip) chip.click(); }
    if(opts.anchor){ var t=page.querySelector('#'+opts.anchor); if(t) setTimeout(function(){ t.scrollIntoView({behavior:'smooth',block:'start'}); }, 80); }
    if(history.replaceState) history.replaceState(null,'','#'+name);
  }
  document.addEventListener('click', function(e){
    var a=e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if(!a) return;
    var name=a.getAttribute('href').slice(1);
    if(!isPage(name)) return;
    e.preventDefault();
    show(name, {anchor:a.getAttribute('data-anchor'), servicio:a.getAttribute('data-servicio')});
    var nav=document.getElementById('nav'), burger=document.getElementById('burger');
    if(nav) nav.classList.remove('is-open');
    if(burger){ burger.classList.remove('is-open'); burger.setAttribute('aria-expanded','false'); }
  });
  var initial=(location.hash||'#inicio').slice(1);
  show(isPage(initial)?initial:'inicio');
})();
