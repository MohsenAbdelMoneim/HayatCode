/* HayatCode — app.js : التهيئة المشتركة (تنقل، أيقونات، ظهور تدريجي، طباعة تلقائية) */
document.addEventListener('DOMContentLoaded', function () {

  /* 1) استبدال أيقونات <i data-icon="..."> في الـ HTML الثابت */
  HC.$$('[data-icon]').forEach(function (el) {
    el.outerHTML = HC.icon(el.dataset.icon, el.getAttribute('class') || 'w-5 h-5');
  });

  /* 2) التنقل */
  HC.Navigation.mount(document.body.getAttribute('data-page') || '');

  /* 3) أيقونة التبويب (favicon) */
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231A90B1'/%3E%3Cpath d='M6 17h5l2-6 4 12 2-6h7' stroke='%2306182B' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
  document.head.appendChild(fav);

  /* 4) الظهور التدريجي مع احترام تفضيل تقليل الحركة */
  var els = HC.$$('[data-reveal]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* 5) فتح صفحة البطاقة مع الطباعة التلقائية (card.html#print) */
  if (location.hash === '#print') setTimeout(function () { window.print(); }, 800);
});