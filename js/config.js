/* HayatCode — config.js
   1) تطبيق الثيم المحفوظ مبكرًا (في الـ head) لمنع وميض الصفحة
   2) إعدادات Tailwind المشتركة لكل الصفحات */
(function () {
  var KEY = 'hayatcode_theme';
  window.HC_THEME_KEY = KEY;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var prefersDark = false;
  try { prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy:   { 950:'#071A30', 900:'#0B2447', 800:'#0F3157', 700:'#164271', 600:'#1D518B' },
        brand:  { 50:'#F0F9FF', 100:'#E0F2FE', 200:'#BAE6FD', 300:'#7DD3FC', 400:'#38BDF8',
                  500:'#0EA5E9', 600:'#0284C7', 700:'#0369A1', 800:'#075985' },
        danger: { 50:'#FEF2F2', 100:'#FEE2E2', 400:'#F87171', 500:'#EF4444',
                  600:'#DC2626', 700:'#B91C1C' },
        paper:  'var(--paper)'
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"','Segoe UI','Tahoma','sans-serif'],
        mono: ['"IBM Plex Mono"','ui-monospace','monospace']
      },
      boxShadow: {
        card: '0 1px 2px rgba(7,26,48,.05), 0 14px 36px -18px rgba(7,26,48,.25)',
        pop:  '0 24px 60px -24px rgba(7,26,48,.45)'
      }
    }
  }
};