/* HayatCode — navigation.js : حقن الهيدر + قائمة الجوال + الفوتر + زرار الوضع الداكن */
HC.Navigation = (function () {
  var LINKS = [
    { id: 'home',      href: 'index.html',    label: 'الرئيسية',    icon: 'home' },
    { id: 'profile',   href: 'profile.html',  label: 'الملف الطبي', icon: 'id-card' },
    { id: 'card',      href: 'card.html',     label: 'البطاقة',     icon: 'card' },
    { id: 'dashboard', href: 'dashboard.html',label: 'لوحة المواطن', icon: 'grid' },
    { id: 'settings',  href: 'settings.html', label: 'الإعدادات',   icon: 'settings' }
  ];
  var EMERGENCY_IDS = ['emergency', 'emergency-profile', 'qr', 'barcode', 'fingerprint'];

  /* أيقونتا القمر والشمس لزرار التبديل */
  var MOON = '<svg class="i-moon w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>';
  var SUN  = '<svg class="i-sun w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>';

  function themeBtnHTML() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return '<button id="hc-theme" class="theme-btn" aria-pressed="' + dark + '" ' +
      'aria-label="' + (dark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن') + '" ' +
      'title="تبديل الوضع">' + MOON + SUN + '</button>';
  }

  function header(page) {
    var links = LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="hlink"' + (l.id === page ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('');
    var emActive = EMERGENCY_IDS.indexOf(page) > -1;
    return '' +
    '<a href="#main" class="skip-link">تخطي إلى المحتوى</a>' +
    '<header class="no-print sticky top-0 z-40 bg-navy-900 border-b border-white/10 text-white">' +
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2 sm:gap-3">' +
        '<a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="حياة كود — الرئيسية">' +
          HC.logoSVG('w-9 h-9') +
          '<span class="leading-none"><span class="block font-bold text-[15px]">حياة كود</span>' +
          '<span class="block text-[9px] tracking-[.25em] text-brand-300 font-mono mt-1">HAYATCODE</span></span>' +
        '</a>' +
        '<nav class="hidden lg:flex items-center gap-1 mx-auto" aria-label="التنقل الرئيسي">' + links + '</nav>' +
        '<div class="flex items-center gap-1.5 sm:gap-2 ms-auto lg:ms-0">' +
          themeBtnHTML() +
          '<a href="emergency.html" class="btn btn-danger btn-sm !px-3.5">' +
            HC.icon('heart-pulse', 'w-4 h-4') + '<span>طوارئ</span>' +
            (emActive ? '<span class="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true"></span>' : '') +
          '</a>' +
          '<button id="hc-burger" class="lg:hidden btn btn-sm !px-2.5 text-white hover:bg-white/10" ' +
            'aria-label="فتح القائمة" aria-expanded="false" aria-controls="hc-drawer">' + HC.icon('menu') + '</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div id="hc-overlay" class="no-print fixed inset-0 z-40 bg-navy-950/70 opacity-0 pointer-events-none transition-opacity duration-200"></div>' +
    '<aside id="hc-drawer" class="no-print fixed z-50 top-0 bottom-0 right-0 w-72 max-w-[85vw] bg-navy-900 text-white translate-x-full transition-transform duration-300 flex flex-col" role="dialog" aria-modal="true" aria-label="قائمة التنقل">' +
      '<div class="flex items-center justify-between p-4 border-b border-white/10">' +
        '<span class="flex items-center gap-2">' + HC.logoSVG('w-8 h-8') + '<b class="text-sm">حياة كود</b></span>' +
        '<button id="hc-close" class="btn btn-sm !px-2 text-white hover:bg-white/10" aria-label="إغلاق القائمة">' + HC.icon('x') + '</button>' +
      '</div>' +
      '<nav class="p-3 grid gap-1 overflow-y-auto" aria-label="قائمة الجوال">' +
        LINKS.map(function (l) {
          return '<a href="' + l.href + '" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ' +
            (l.id === page ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white') + '"' +
            (l.id === page ? ' aria-current="page"' : '') + '>' + HC.icon(l.icon, 'w-5 h-5') + l.label + '</a>';
        }).join('') +
        '<a href="emergency.html" class="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold bg-danger-600 text-white">' +
          HC.icon('heart-pulse', 'w-5 h-5') + 'دخول الطوارئ</a>' +
      '</nav>' +
      '<p class="mt-auto p-4 text-[11px] text-slate-500 font-mono" dir="ltr">HayatCode v0.9 — Prototype</p>' +
    '</aside>';
  }

  function footer() {
    var y = new Date().getFullYear();
    function link(h, t) { return '<li><a class="hover:text-brand-300 transition-colors" href="' + h + '">' + t + '</a></li>'; }
    function li(ic, cls, t) { return '<li class="flex gap-2">' + HC.icon(ic, 'w-4 h-4 mt-0.5 ' + cls) + '<span>' + t + '</span></li>'; }
    return '<footer class="no-print bg-navy-950 text-slate-400 border-t border-white/5">' +
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1.5fr]">' +
        '<div>' +
          '<span class="flex items-center gap-2.5">' + HC.logoSVG('w-9 h-9') + '<b class="text-white">حياة كود</b></span>' +
          '<p class="mt-4 text-sm leading-7 max-w-sm">نظام ذكي للتعريف الطبي في حالات الطوارئ — بطاقة واحدة تحمل معرّفك الطبي، وملفٌّ يظهر لفرق الإسعاف خلال ثوانٍ.</p>' +
        '</div>' +
        '<div><h3 class="text-white font-bold text-sm mb-4">روابط سريعة</h3><ul class="space-y-2.5 text-sm">' +
          link('index.html', 'الرئيسية') + link('register.html', 'إنشاء بطاقة') + link('profile.html', 'الملف الطبي') +
          link('card.html', 'البطاقة') + link('dashboard.html', 'لوحة المواطن') +
          link('emergency.html', 'دخول الطوارئ') + link('emergency-profile.html', 'تجربة عرض الطوارئ') +
        '</ul></div>' +
        '<div class="rounded-2xl border border-white/10 bg-white/[0.04] p-5">' +
          '<h3 class="text-white font-bold text-sm">حالة المشروع</h3>' +
          '<ul class="mt-3 text-sm space-y-2.5">' +
            li('check', 'text-brand-300', 'الواجهة الأمامية كاملة — 11 صفحة مترابطة') +
            li('check', 'text-brand-300', 'بيانات تجريبية محلية عبر localStorage') +
            li('clock', 'text-slate-500', 'قاعدة البيانات و API: قيد التطوير، وستُدمج لاحقًا دون تغيير هذه الواجهة') +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="border-t border-white/10"><div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs flex flex-wrap items-center justify-between gap-2">' +
        '<span>© ' + y + ' حياة كود — مشروع تخرج. صُمم ليُنقذ حياة.</span>' +
        '<span class="font-mono" dir="ltr">v0.9 · Front-End Prototype</span>' +
      '</div></div>' +
    '</footer>';
  }

  function mountThemeToggle() {
    var btn = document.getElementById('hc-theme');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var root = document.documentElement;
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem(window.HC_THEME_KEY || 'hayatcode_theme', isDark ? 'light' : 'dark'); } catch (e) {}
      btn.setAttribute('aria-pressed', String(!isDark));
      btn.setAttribute('aria-label', !isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن');
      HC.toast(!isDark ? 'تم التحويل إلى الوضع الداكن' : 'تم التحويل إلى الوضع الفاتح', 'info', 1600);
    });
  }

  function mount(page) {
    var h = document.getElementById('hc-header');
    var f = document.getElementById('hc-footer');
    if (h) h.innerHTML = header(page);
    if (f) f.innerHTML = footer();
    mountThemeToggle();

    var burger = document.getElementById('hc-burger');
    var drawer = document.getElementById('hc-drawer');
    var overlay = document.getElementById('hc-overlay');
    var closeBtn = document.getElementById('hc-close');

    function set(open) {
      if (!drawer) return;
      drawer.classList.toggle('translate-x-full', !open);
      if (overlay) {
        overlay.classList.toggle('opacity-0', !open);
        overlay.classList.toggle('pointer-events-none', !open);
      }
      if (burger) burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && closeBtn) closeBtn.focus();
    }
    if (burger) burger.addEventListener('click', function () { set(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { set(false); if (burger) burger.focus(); });
    if (overlay) overlay.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    if (drawer) HC.$$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  }

  return { mount: mount };
})();