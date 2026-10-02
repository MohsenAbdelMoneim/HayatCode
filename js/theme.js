/* =========================================================
   HayatCode — حياة كود
   js/theme.js  (NEW FILE — additive only)
   Centralized Light/Dark theme system.
   - Reads/writes localStorage under a single key
   - Applies data-theme on <html>
   - Falls back to light mode by default
   - Updates any [data-theme-toggle] button's icon/text
   ========================================================= */
(function () {
  'use strict';

  // NOTE: do NOT change this key once shipped, or users lose their preference.
  var STORAGE_KEY = 'hc-theme';
  var THEMES = { LIGHT: 'light', DARK: 'dark' };

  function getStoredTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === THEMES.DARK || v === THEMES.LIGHT) return v;
    } catch (e) { /* storage may be blocked */ }
    return null;
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  function getEffectiveTheme() {
    // Default is LIGHT per spec, even if the OS prefers dark.
    return getStoredTheme() || THEMES.LIGHT;
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme === THEMES.DARK ? 'dark' : 'light';
    updateToggleButtons(theme);
    // Let other scripts (e.g. charts, scanners) react if they want.
    window.dispatchEvent(new CustomEvent('hc:themechange', { detail: { theme: theme } }));
  }

  function updateToggleButtons(theme) {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var isDark = theme === THEMES.DARK;
      // Icon: sun when dark (to switch to light), moon when light.
      btn.setAttribute('data-theme-state', theme);
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
      btn.setAttribute('title', isDark ? 'الوضع النهاري' : 'الوضع الليلي');

      // If the button uses data-icon placeholders, swap the icon name.
      var icon = btn.querySelector('[data-icon]');
      if (icon) icon.setAttribute('data-icon', isDark ? 'sun' : 'moon');

      // If the button has a text label span, swap it.
      var label = btn.querySelector('[data-theme-label]');
      if (label) label.textContent = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
    }
  }

  function toggleTheme() {
    var current = getEffectiveTheme();
    var next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    applyTheme(next);
  }

  function init() {
    // Apply immediately (this script must load before first paint ideally).
    applyTheme(getEffectiveTheme());

    // Delegate clicks so dynamically-injected toggle buttons also work
    // (the header is injected by navigation.js, so this matters).
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      e.preventDefault();
      toggleTheme();
    });

    // Re-sync buttons if the header is injected later.
    window.addEventListener('hc:headerready', function () {
      updateToggleButtons(getEffectiveTheme());
    });

    // Optionally follow OS changes only if the user hasn't chosen a theme.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function () {
        if (!getStoredTheme()) applyTheme(getEffectiveTheme());
      };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler);
    }
  }

  // Expose minimal API (read-only for other modules if needed).
  window.HCTheme = {
    get: getEffectiveTheme,
    set: function (t) {
      if (t !== THEMES.DARK && t !== THEMES.LIGHT) return;
      try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
      applyTheme(t);
    },
    toggle: toggleTheme
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();