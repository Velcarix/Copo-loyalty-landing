/* Copo Loyalty — hero "noche": escalado del lienzo, anillo 3D de tarjetas Wallet,
   nieve de fondo y entrada coreografiada. */
(function () {
  'use strict';
  var hero = document.querySelector('.hero-night');
  var canvas = document.getElementById('lpCanvas');
  var ring = document.getElementById('lpRing');
  var stack = document.querySelector('.lp-stack');
  if (!hero || !canvas || !ring || !stack) return;

  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var CW = 1172, CH = 657, TAB_MAX = 1080, TAB_MIN = 701, DW_MIN = 920;

  /* ---------- NIEVE: todo el campo es un solo box-shadow por capa ---------- */
  function snow(el, count, blur, a0, a1) {
    if (!el) return;
    var dots = [];
    for (var i = 0; i < count; i++) {
      dots.push((Math.random() * 100).toFixed(2) + 'vw ' + (Math.random() * 100).toFixed(2) + 'vh ' +
        blur + 'px 0 rgba(255,255,255,' + (a0 + Math.random() * (a1 - a0)).toFixed(2) + ')');
    }
    el.style.boxShadow = dots.join(',');
  }
  snow(document.getElementById('lpSnowA'), 150, 0, 0.05, 0.3);
  snow(document.getElementById('lpSnowB'), 18, 1.2, 0.35, 0.7);

  /* ---------- TARJETAS WALLET: el mismo diseño del pass real ----------
     Encabezado (logo + nombre + visitas), panel de sellos, FALTAN / SIGUIENTE PREMIO /
     MIEMBRO y el QR blanco con número. Sin archivo de logo (logo: null) se usa un
     monograma; al tener el logo, basta con poner su ruta aquí. */
  var PASSES = [
    { name: 'Copo Loyalty', logo: 'assets/brand/logo-mark.png', mark: true, bg: '#FFFFFF', fg: '#0B1220', a: '#2E5CF6', ring: 'rgba(46,92,246,.45)', panel: 'transparent', n: 3, prize: 'Copo' },
    { name: 'SmachyCo', logo: null, bg: '#E81B1B', fg: '#111111', a: '#E81B1B', ring: 'rgba(232,27,27,.55)', panel: 'rgba(255,255,255,.84)', n: 0, prize: 'Hamburguesa Gratis' },
    { name: 'Veterinaria', logo: null, plain: true, bg: '#5E4A45', fg: '#FFFFFF', a: '#5E4A45', ring: 'rgba(255,255,255,.7)', panel: 'transparent', n: 0, prize: 'Consulta' },
    { name: 'Titto Bros', logo: 'assets/trusted/titto-bros.jpg', bg: '#FFF3E4', fg: '#1A1A1A', a: '#E4262B', ring: 'rgba(228,38,43,.5)', panel: 'rgba(228,38,43,.08)', n: 6, prize: 'Helado gratis' },
    { name: 'Chunky Dogs', logo: 'assets/trusted/chunky-dogs.jpg', bg: '#F7C948', fg: '#111111', a: '#111111', ring: 'rgba(17,17,17,.5)', panel: 'rgba(255,255,255,.55)', n: 7, prize: 'Hot dog gratis' }
  ];
  var MEMBERS = ['Ana Torres', 'Luis Ramírez', 'Mariana Gómez', 'Jorge Pérez', 'Sofía Díaz', 'Carlos Reyes'];
  PASSES.forEach(function (d) {
    d.ok = !!d.mark; // el logo de Copo siempre existe
    if (d.mark || !d.logo) return;
    var probe = new Image();
    probe.onload = function () { d.ok = true; rerender(d); };
    probe.src = d.logo;
  });

  /* QR decorativo: módulos al azar + los tres marcadores de esquina */
  function qrData(seed) {
    var s = seed, size = 25, rects = [];
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    function finder(x, y) {
      rects.push('<rect x="' + x + '" y="' + y + '" width="7" height="7"/>');
      rects.push('<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"/>');
      rects.push('<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>');
    }
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var inFinder = (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9);
        if (!inFinder && rnd() > 0.5) rects.push('<rect x="' + x + '" y="' + y + '" width="1" height="1"/>');
      }
    }
    finder(0, 0); finder(size - 7, 0); finder(0, size - 7);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" fill="#0B1220">' + rects.join('') + '</svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }
  var QRS = [qrData(7), qrData(4242), qrData(90210)];

  function logoHTML(d) {
    return d.ok ? '<img src="' + d.logo + '" alt="" decoding="async">'
                : '<span class="pc-mono">' + d.name.charAt(0) + '</span>';
  }
  function passHTML(d, i) {
    // la misma marca se repite en el anillo con clientes distintos: cambia el avance
    var n = i < PASSES.length ? d.n : (d.n + i * 3) % 11;
    var stamps = '';
    for (var s = 0; s < 10; s++) stamps += '<i' + (s < n ? ' class="on"' : '') + '><b>' + logoHTML(d) + '</b></i>';
    var left = 10 - n;
    var num = String(1000000000 + ((i * 7919 + 2203) * 104729) % 8999999999).slice(0, 10);
    return '' +
      '<div class="pc-head"><span class="pc-logo' + (d.mark ? ' is-mark' : '') + '">' + logoHTML(d) + '</span>' +
        '<span class="pc-name">' + d.name + '</span>' +
        '<span class="pc-count"><small>VISITAS</small><strong>' + n + '/10</strong></span></div>' +
      '<div class="pc-stamps' + (d.plain ? ' is-plain' : '') + '">' + stamps + '</div>' +
      '<div class="pc-meta"><div><small>FALTAN</small><strong>' + (left ? left + (left === 1 ? ' visita' : ' visitas') : 'Premio listo') + '</strong></div>' +
        '<div><small>SIGUIENTE PREMIO</small><strong>' + d.prize + '</strong></div>' +
        '<div><small>MIEMBRO</small><strong>' + MEMBERS[i % MEMBERS.length] + '</strong></div></div>' +
      '<div class="pc-qr"><span style="--qr:' + QRS[i % QRS.length].replace(/"/g, '&quot;') + '"></span><em>' + num + '</em></div>';
  }
  function paint(el) {
    var d = el._pass;
    el.style.setProperty('--pc-bg', d.bg);
    el.style.setProperty('--pc-fg', d.fg);
    el.style.setProperty('--pc-accent', d.a);
    el.style.setProperty('--pc-ring', d.ring);
    el.style.setProperty('--pc-panel', d.panel);
    el.innerHTML = passHTML(d, el._index);
  }
  function rerender(d) {
    cards.forEach(function (el) { if (el._pass === d) paint(el); });
  }

  /* Anillo: 37 tarjetas sobre un cilindro con la cámara EN su centro (R = perspectiva
     = 891), así cada tarjeta es tangente y mira de frente a la cámara; los lados
     verticales con borde superior inclinado son perspectiva, no rotación.
     Paso 360/37 ≈ 9.73°; todo lo que pase de ±42° se oculta (la mitad trasera). */
  var N = 37, R = 891, STEP = 360 / N, CULL = 42, SPEED = 1.9;
  var cards = [];
  var frag = document.createDocumentFragment();
  for (var i = 0; i < N; i++) {
    var el = document.createElement('div');
    el.className = 'lp-card';
    el._pass = PASSES[i % PASSES.length];
    el._index = i;
    paint(el);
    el._shown = null;
    frag.appendChild(el);
    cards.push(el);
  }
  ring.appendChild(frag);

  var phase = -2;
  function placeCards() {
    for (var i = 0; i < N; i++) {
      var el = cards[i];
      var a = ((i * STEP + phase) % 360 + 540) % 360 - 180; // ángulo con signo, -180..180
      if (Math.abs(a) > CULL) {
        if (el._shown !== false) { el.style.visibility = 'hidden'; el._shown = false; }
        continue;
      }
      if (el._shown !== true) { el.style.visibility = 'visible'; el._shown = true; }
      var r = a * Math.PI / 180, c = Math.cos(r);
      el.style.transform = 'translate3d(' + (R * Math.sin(r)).toFixed(2) + 'px,0,' + (R * (1 - c)).toFixed(2) + 'px) rotateY(' + (-a).toFixed(3) + 'deg)';
      el.style.filter = 'brightness(' + (0.84 + 0.5 * (1 / c - 1)).toFixed(3) + ')';
    }
  }

  /* ---------- ESCALA DEL LIENZO ---------- */
  function layout() {
    var winW = window.innerWidth;
    var vw = hero.clientWidth, vh = hero.clientHeight;
    var st = canvas.style;
    if (winW <= 700) {
      ['--k', '--fill', '--sshift', '--rs'].forEach(function (p) { st.removeProperty(p); });
      placeCards();
      return;
    }
    var tablet = winW <= TAB_MAX;
    var W = CW;
    if (tablet) {
      // la ventana de diseño se angosta para que el texto deje de encogerse con el viewport;
      // en 1080 W = 1172, así que k es continuo en el cambio de arquitectura
      W = DW_MIN + (winW - TAB_MIN) * (CW - DW_MIN) / (TAB_MAX - TAB_MIN);
      if (vh > vw * 1.15) W = Math.min(W, 900); // tablet vertical: más apretado, se lee más grande
    }
    var k = Math.min(vw / W, vh / 560);
    var ss = 0, rs = 1;
    var surplus = Math.max(0, vh / k - CH);
    if (tablet && surplus > 0) {
      // en tablet sobra alto: el anillo y el dashboard bajan y el anillo crece (cámara más cerca)
      var ramp = Math.min(1, (TAB_MAX - winW) / 120);
      ss = Math.min(surplus * 0.55, 420) * ramp;
      rs = 1 + Math.min(surplus / 1100, 0.75) * ramp;
    }
    // el texto va en px reales con los tamaños del POS: si termina más abajo que el borde
    // superior de la tarjeta del frente (y = 452 en el lienzo), el anillo baja lo necesario
    var textBottom = stack.offsetTop + stack.offsetHeight + 28;
    ss = Math.max(ss, textBottom / k - 452);
    // lo que queda de alto bajo el anillo desplazado es para el dashboard
    var fill = vh / k - CH - ss;
    st.setProperty('--k', k.toFixed(5));
    st.setProperty('--fill', fill.toFixed(1) + 'px');
    st.setProperty('--sshift', ss.toFixed(1) + 'px');
    st.setProperty('--rs', rs.toFixed(4));
    placeCards();
  }
  var resizeRaf = 0;
  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(layout);
  }
  window.addEventListener('resize', onResize);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  /* ---------- GIRO: continuo, se pausa fuera de pantalla ---------- */
  var last = 0, running = false, visible = true;
  function tick(t) {
    if (!running) return;
    var dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;
    if (!reduceMq.matches) phase -= SPEED * dt;
    placeCards();
    requestAnimationFrame(tick);
  }
  function sync() {
    var should = visible && !document.hidden && !reduceMq.matches;
    if (should && !running) { running = true; last = 0; requestAnimationFrame(tick); }
    else if (!should) { running = false; }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      sync();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { last = 0; sync(); });
  if (reduceMq.addEventListener) reduceMq.addEventListener('change', function () { placeCards(); sync(); });
  sync();

  /* ---------- ENTRADA: una sola vez, luego la página queda quieta ---------- */
  (function intro() {
    var rootEl = document.documentElement;
    function settle() {
      if (document.getAnimations) {
        document.getAnimations().forEach(function (a) {
          if (a.id && a.id.indexOf('intro:') === 0) a.cancel();
        });
      }
      rootEl.classList.remove('intro');
    }
    if (!rootEl.classList.contains('intro') || reduceMq.matches || !Element.prototype.animate) { settle(); return; }

    var D = window.innerWidth <= 700 ? 0.66 : 1; // en teléfono los recorridos son más cortos
    var EXPO = 'cubic-bezier(.16,1,.3,1)', SOFT = 'cubic-bezier(.22,.61,.36,1)';
    var n = 0, lastAnim = null, lastEnd = 0;
    function Y(px) { return '0 ' + (px * D) + 'px'; }
    function play(el, from, dur, delay, ease) {
      if (!el) return;
      var to = { opacity: 1 };
      if (from.translate) to.translate = '0 0';
      if (from.scale) to.scale = '1';
      if (from.clipPath) to.clipPath = 'inset(-30% 0 -30% 0)';
      var a = el.animate([from, to], { duration: dur, delay: delay, easing: ease, fill: 'both' });
      a.id = 'intro:' + (n++);
      if (delay + dur >= lastEnd) { lastEnd = delay + dur; lastAnim = a; }
    }
    var q = function (s) { return document.querySelector(s); };
    // primero se asienta el marco
    play(q('nav.site-nav.nav-pill'), { opacity: 0, translate: Y(-9) }, 620, 60, EXPO);
    play(q('.nav-pill .brand'), { opacity: 0, translate: Y(6) }, 520, 150, SOFT);
    document.querySelectorAll('.nav-pill .nav-links a').forEach(function (a, i) {
      play(a, { opacity: 0, translate: Y(6) }, 460, 215 + i * 45, SOFT);
    });
    document.querySelectorAll('.nav-pill .nav-actions > *').forEach(function (a, i) {
      play(a, { opacity: 0, translate: Y(6) }, 500, 300 + i * 50, SOFT);
    });
    // contexto, luego el mensaje: los renglones del titular suben desde su propia línea base
    play(q('.lp-badge'), { opacity: 0, translate: Y(11), scale: 0.985 }, 560, 270, EXPO);
    document.querySelectorAll('.lp-h1 .lp-line').forEach(function (line, i) {
      play(line, { opacity: 0, translate: Y(15), clipPath: 'inset(100% 0 -30% 0)' }, 900, 380 + i * 90, EXPO);
    });
    play(q('.lp-sub'), { opacity: 0, translate: Y(10) }, 620, 690, EXPO);
    play(q('.lp-cta'), { opacity: 0, translate: Y(13), scale: 0.985 }, 620, 830, EXPO);
    play(q('.lp-micro'), { opacity: 0, translate: Y(10) }, 620, 900, EXPO);
    // el remate: el anillo sube en profundidad y el dashboard aterriza al frente al final
    play(q('.lp-ring'), { opacity: 0, translate: Y(18), scale: 0.99 }, 950, 700, EXPO);
    play(q('.lp-browser'), { opacity: 0, translate: Y(26) }, 900, 900, EXPO);

    if (lastAnim) lastAnim.finished.then(settle, settle);
    else settle();
  })();
})();
