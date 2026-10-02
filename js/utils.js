/* HayatCode — utils.js : النطاق المشترك، الأيقونات، التنبيهات، مكوّن البطاقة، QR/Barcode */
window.HC = window.HC || {};

/* ---------- SVG icons ---------- */
HC.icons = {
  'home':        '<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5.5h4V20"/>',
  'user':        '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-3.6 4-5.4 7.5-5.4s6.7 1.8 7.5 5.4"/>',
  'id-card':     '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><circle cx="8" cy="10.5" r="2"/><path d="M5 15.8c.7-1.7 5.3-1.7 6 0"/><path d="M13.5 9h5M13.5 12.5h5M13.5 16h3"/>',
  'card':        '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 14.5h5M6 16.8h8"/>',
  'grid':        '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
  'settings':    '<path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h13"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="19" cy="17" r="2"/>',
  'alert':       '<path d="M12 3.5 2.8 19.5h18.4L12 3.5z"/><path d="M12 9.5v4.5"/><path d="M12 17.2v.01"/>',
  'check':       '<path d="m4.5 12.5 5 5L19.5 7"/>',
  'x':           '<path d="M6 6l12 12M18 6 6 18"/>',
  'menu':        '<path d="M4 7h16M4 12h16M4 17h16"/>',
  'search':      '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.8-3.8"/>',
  'edit':        '<path d="M4 20h4.5L20 8.5a2.6 2.6 0 0 0-3.7-3.7L4.8 16.3 4 20z"/><path d="m14.5 6.5 3.2 3.2"/>',
  'print':       '<path d="M7 8V3.5h10V8"/><rect x="3.5" y="8" width="17" height="9" rx="2"/><path d="M7 14h10v6.5H7z"/>',
  'download':    '<path d="M12 3.5V15"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 19.5h16"/>',
  'phone':       '<path d="M5.5 3.5h3l1.7 4.4-2.2 1.6a12.5 12.5 0 0 0 5.5 5.5l1.6-2.2 4.4 1.7v3a1.8 1.8 0 0 1-1.9 1.8A16.4 16.4 0 0 1 3.7 5.4a1.8 1.8 0 0 1 1.8-1.9z"/>',
  'bell':        '<path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.6 1.8 5.8 1.8 5.8H4.7s1.8-1.2 1.8-5.8z"/><path d="M10.3 19a1.9 1.9 0 0 0 3.4 0"/>',
  'globe':       '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5s1.2-6.2 3.6-8.5z"/>',
  'lock':        '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2"/>',
  'trash':       '<path d="M4.5 6.5h15"/><path d="M8 6.5V4.8A1.3 1.3 0 0 1 9.3 3.5h5.4A1.3 1.3 0 0 1 16 4.8v1.7"/><path d="M6.5 6.5l.7 12.7a1.6 1.6 0 0 0 1.6 1.5h6.4a1.6 1.6 0 0 0 1.6-1.5l.7-12.7"/><path d="M10 10.5v6M14 10.5v6"/>',
  'copy':        '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
  'refresh':     '<path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20 3.5V8h-4.5"/>',
  'calendar':    '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5"/>',
  'map-pin':     '<path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 0 1 13 0c0 4.6-6.5 10-6.5 10z"/><circle cx="12" cy="10.5" r="2.2"/>',
  'clock':       '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  'shield':      '<path d="M12 3.2 19 6v5.2c0 4.8-3.3 8.1-7 9.6-3.7-1.5-7-4.8-7-9.6V6l7-2.8z"/><path d="m9 11.5 2.2 2.2L15.5 9"/>',
  'qr':          '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><path d="M13.5 13.5h3v3h-3zM20.5 13.5v.01M13.5 20.5v.01M17.5 17.5h3v3h-3z"/>',
  'barcode':     '<path d="M3.5 5.5v13M6.8 5.5v13M10 5.5v13M13 5.5v13M16.2 5.5v13M20.5 5.5v13"/>',
  'fingerprint': '<path d="M8.4 6.2A7.5 7.5 0 0 1 19.5 12v2.5"/><path d="M4.8 9.5A7.5 7.5 0 0 1 6.5 7"/><path d="M4.5 13v1.5"/><path d="M12 8.5a3.5 3.5 0 0 1 3.5 3.5v4"/><path d="M8.5 12a3.5 3.5 0 0 1 .6-2"/><path d="M12 12.5V16"/><path d="M8.5 15.5v1.5"/><path d="M15.8 20a9 9 0 0 0 .7-3.5"/><path d="M12 19.5v1"/>',
  'pill':        '<rect x="3" y="8.8" width="18" height="6.4" rx="3.2" transform="rotate(-45 12 12)"/><path d="m9.3 9.3 5.4 5.4"/>',
  'droplet':     '<path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10z"/>',
  'heart-pulse': '<path d="M12 20.3 5 13.4a4.9 4.9 0 0 1 0-7 4.7 4.7 0 0 1 6.7 0l.3.3.3-.3a4.7 4.7 0 0 1 6.7 0 4.9 4.9 0 0 1 0 7L12 20.3z"/><path d="M4.5 11h4l1.5-2.5 2.5 5 1.5-3h5.5"/>',
  'file':        '<path d="M7 3h7.5L19 7.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14.5 3v4.5H19"/><path d="M9.5 12.5h5M9.5 16h5"/>',
  'chev-l':      '<path d="m14.5 6-6 6 6 6"/>',
  'chev-r':      '<path d="m9.5 6 6 6-6 6"/>',
  'chev-d':      '<path d="m6 9.5 6 6 6-6"/>',
  'camera':      '<path d="M4.5 8.5h3L9 6h6l1.5 2.5h3a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-8a1.5 1.5 0 0 1 1.5-1.5z"/><circle cx="12" cy="13.5" r="3.2"/>',
  'info':        '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8v.01"/>'
};

HC.icon = function (name, cls) {
  cls = cls || 'w-5 h-5';
  return '<svg class="' + cls + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (HC.icons[name] || '') + '</svg>';
};

HC.logoSVG = function (cls) {
  cls = cls || 'w-9 h-9';
  return '<svg class="' + cls + ' flex-none" viewBox="0 0 40 40" aria-hidden="true">' +
    '<rect x="1" y="1" width="38" height="38" rx="11" fill="#0EA5E9"/>' +
    '<path d="M8 21.5h6.2l2.6-7.5 4.6 13 2.6-7.5H32" fill="none" stroke="#071A30" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
};

/* ---------- Helpers ---------- */
HC.$  = function (s, r) { return (r || document).querySelector(s); };
HC.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
HC.esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
  });
};
HC.debounce = function (fn, ms) {
  var t; return function () { clearTimeout(t); var a = arguments, self = this;
    t = setTimeout(function () { fn.apply(self, a); }, ms || 300); };
};

HC.CODE_RE = /^HC-\d{4}-\d{6}$/;
HC.normalizeCode = function (v) { return String(v || '').trim().toUpperCase().replace(/\s+/g, ''); };
HC.validCode = function (v) { return HC.CODE_RE.test(HC.normalizeCode(v)); };

HC.splitList = function (v) {
  return String(v || '').split(/[,،\n]/).map(function (s) { return s.trim(); }).filter(Boolean);
};
HC.fmtDate = function (iso) {
  if (!iso) return '—';
  try { return new Date(iso + 'T00:00:00').toLocaleDateString('ar-EG-u-nu-latn', { year:'numeric', month:'long', day:'numeric' }); }
  catch (e) { return iso; }
};
HC.calcAge = function (iso) {
  if (!iso) return null;
  var b = new Date(iso), n = new Date(), a = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--;
  return a >= 0 && a < 140 ? a : null;
};
HC.getParam = function (n) { return new URLSearchParams(location.search).get(n); };
HC.initials = function (name) {
  return String(name || '').trim().split(/\s+/).slice(0, 2).map(function (w) { return w ? w[0] : ''; }).join('');
};
HC.copyText = function (text) {
  function done() { HC.toast('تم نسخ المعرّف: ' + HC.esc(text), 'success', 2200); }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { HC.toast('تعذر النسخ — انسخ الكود يدويًا', 'error'); });
  } else {
    var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t);
    t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove();
  }
};

/* ---------- Toasts ---------- */
HC.toast = function (msg, type, ttl) {
  type = type || 'info'; ttl = ttl || 3200;
  var box = document.getElementById('hc-toasts');
  if (!box) {
    box = document.createElement('div'); box.id = 'hc-toasts';
    box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
    document.body.appendChild(box);
  }
  var t = document.createElement('div');
  t.className = 'toast ' + type;
  var ic = type === 'success' ? 'check' : type === 'error' ? 'alert' : 'info';
  t.innerHTML = HC.icon(ic, 'w-5 h-5') + '<span>' + msg + '</span>';
  box.appendChild(t);
  setTimeout(function () { t.classList.add('hide'); setTimeout(function () { t.remove(); }, 260); }, ttl);
};

/* ---------- محمّل المكتبات الذاتي ----------
   الصفحات مش محتاجة سطور CDN نهائيًا — لو المكتبة مش موجودة بيتم تحميلها
   تلقائيًا من أول CDN، ولو فشل بيتجرب التاني. */
HC._libLoader = function (urls, test, cb) {
  if (test()) return cb(true);
  var i = 0;
  (function next() {
    if (i >= urls.length) return cb(false);
    var s = document.createElement('script');
    s.src = urls[i++];
    s.onload = function () { cb(test()); };
    s.onerror = function () { s.remove(); next(); };
    document.head.appendChild(s);
  })();
};
HC.ensureQRLib = function (cb) {
  HC._libLoader([
    'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'
  ], function () { return typeof qrcode === 'function'; }, cb);
};
HC.ensureBarcodeLib = function (cb) {
  HC._libLoader([
    'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js'
  ], function () { return typeof JsBarcode === 'function'; }, cb);
};

/* ---------- مكوّن البطاقة الطبية (تخطيط جديد: الاسم بياخد العرض الكامل ويلف طبيعي) ---------- */
HC.cardHTML = function (c, opts) {
  opts = opts || {};
  var flip = opts.flip !== false;
  var ec = c.emergencyContact || {};
  var front =
  '<div class="med-face bg-navy-900 text-white flex flex-col">' +
    '<div class="h-[7px] bg-danger-500 flex-none"></div>' +
    '<svg class="absolute -bottom-6 -start-8 w-64 text-white opacity-[0.06] pointer-events-none" viewBox="0 0 300 100" fill="none" aria-hidden="true">' +
      '<path d="M0 60h80l14-30 20 60 14-30h60l12-24 18 48 12-24h70" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '<div class="relative flex-none flex items-center justify-between px-4 pt-3">' +
      '<span class="flex items-center gap-2">' + HC.logoSVG('w-8 h-8') +
        '<span class="leading-none"><span class="block text-[13px] font-bold">حياة كود</span>' +
        '<span class="block text-[8.5px] tracking-[.22em] text-brand-300 font-mono mt-0.5" dir="ltr">HAYATCODE</span></span></span>' +
      '<span class="text-[9px] font-semibold border border-white/20 bg-white/10 rounded-full px-2.5 py-1 whitespace-nowrap">بطاقة طبية للطوارئ</span>' +
    '</div>' +
    '<div class="relative flex-1 flex items-center gap-3 px-4 min-h-0">' +
      '<span class="flex-none bg-white rounded-xl p-1.5 shadow-card"><span class="qr-slot block" data-qr="' + c.id + '" data-size="78"></span></span>' +
      '<div class="flex-1 min-w-0" style="min-width:0">' +
        '<p class="text-[9px] text-slate-400 font-semibold">الاسم</p>' +
        '<p class="font-bold text-[15px] leading-[1.45] break-words" style="overflow-wrap:anywhere">' + HC.esc(c.name) + '</p>' +
        '<p class="mt-1 font-mono text-[11.5px] tracking-[.06em] text-brand-300 whitespace-nowrap" dir="ltr">' + c.id + '</p>' +
        '<p class="mt-0.5 text-[9.5px] text-slate-400 whitespace-nowrap">تاريخ الميلاد: ' + HC.fmtDate(c.birthDate) + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="relative flex-none flex items-center justify-between px-4 pb-3.5">' +
      '<span class="flex items-center gap-2.5">' +
        '<span class="w-12 h-12 rounded-xl bg-danger-500 grid place-items-center shadow-card"><span class="font-bold text-lg leading-none whitespace-nowrap" dir="ltr">' + (c.bloodType || '—') + '</span></span>' +
        '<span class="text-[9px] leading-tight text-slate-300">فصيلة الدم<br><span class="text-slate-500">Blood Type</span></span>' +
      '</span>' +
      '<span class="text-[9.5px] text-slate-400 text-end leading-snug">في حالة الطوارئ<br><span class="text-brand-300 font-semibold">امسح رمز QR</span></span>' +
    '</div>' +
  '</div>';
  var back =
  '<div class="med-face flip-back bg-white text-navy-900 flex flex-col">' +
    '<div class="h-9 bg-navy-950 flex-none flex items-center px-4">' +
      '<p class="text-[9px] tracking-[.18em] text-slate-400 font-mono whitespace-nowrap" dir="ltr">HAYATCODE MEDICAL ID — ' + c.id + '</p></div>' +
    '<div class="flex-1 flex flex-col px-4 py-3 min-h-0">' +
      '<div class="text-center">' +
        '<svg class="mx-auto" data-barcode="' + c.id + '" data-h="42"></svg>' +
        '<p class="text-[9px] text-slate-500 mt-1">امسح الباركود عند تعذر رمز QR</p>' +
      '</div>' +
      '<div class="mt-auto border-t border-slate-200 pt-2.5 flex items-end justify-between gap-3">' +
        '<div class="min-w-0" style="min-width:0">' +
          '<p class="text-[9px] text-slate-500 font-semibold">جهة الاتصال للطوارئ</p>' +
          '<p class="text-[12px] font-bold break-words" style="overflow-wrap:anywhere">' + HC.esc(ec.name || '—') +
            (ec.relation ? ' <span class="chip chip-navy !text-[9px] !px-2 !py-0.5">' + HC.esc(ec.relation) + '</span>' : '') + '</p>' +
          '<p class="font-mono text-[11px] text-navy-700 whitespace-nowrap" dir="ltr">' + HC.esc(ec.phone || '') + '</p>' +
        '</div>' +
        '<span class="flex items-center gap-1.5 text-slate-400 flex-none">' + HC.icon('fingerprint', 'w-4 h-4') +
          '<span class="text-[9px] whitespace-nowrap">دعم البصمة قريبًا</span></span>' +
      '</div>' +
    '</div>' +
  '</div>';
  return '<div class="med-card ' + (flip ? 'flip-wrap' : '') + ' shadow-pop mx-auto select-none">' +
    '<div class="' + (flip ? 'flip-inner' : 'w-full h-full') + '">' + front + (flip ? back : '') + '</div></div>';
};

/* ---------- تفعيل QR + الباركود (QR يُرسم SVG حاد يتقاش ويطبع بدقة) ---------- */
HC.mountCardWidgets = function (root) {
  HC.ensureQRLib(function (ok) {
    HC.$$('[data-qr]', root).forEach(function (el) {
      if (el.dataset.qrDone) return; el.dataset.qrDone = '1';
      var data = el.dataset.qr;
      var s = parseInt(el.dataset.size || '74', 10);
      el.style.width = s + 'px'; el.style.height = s + 'px';
      el.innerHTML = '';
      if (ok) {
        try {
          var qr = qrcode(0, 'M'); qr.addData(data); qr.make();
          var n = qr.getModuleCount(), qz = 2, t = n + qz * 2, cells = '';
          for (var r = 0; r < n; r++)
            for (var c = 0; c < n; c++)
              if (qr.isDark(r, c)) cells += '<rect x="' + (c + qz) + '" y="' + (r + qz) + '" width="1" height="1"/>';
          el.innerHTML = '<svg role="img" aria-label="رمز QR" viewBox="0 0 ' + t + ' ' + t +
            '" width="100%" height="100%" shape-rendering="crispEdges">' +
            '<rect width="' + t + '" height="' + t + '" fill="#ffffff"/><g fill="#0B2447">' + cells + '</g></svg>';
          return;
        } catch (e) {}
      }
      if (typeof QRCode !== 'undefined') {
        new QRCode(el, { text: data, width: s, height: s, colorDark: '#0B2447', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
      } else {
        el.innerHTML = '<span class="w-full h-full grid place-items-center text-[9px] font-bold text-slate-300 border border-dashed border-slate-300 rounded-lg">QR</span>';
      }
    });
  });
  HC.ensureBarcodeLib(function (ok) {
    HC.$$('[data-barcode]', root).forEach(function (el) {
      if (el.dataset.bcDone) return; el.dataset.bcDone = '1';
      if (!ok && typeof JsBarcode !== 'function') return;
      try {
        JsBarcode(el, el.dataset.barcode, { format:'CODE128', lineColor:'#0B2447', background:'#ffffff',
          width: parseFloat(el.dataset.w || '1.7'), height: parseInt(el.dataset.h || '40', 10), displayValue:false, margin:2 });
      } catch (e) {}
    });
  });
};

/* ---------- QR عالي الدقة + تحميل صورة PNG بتصميم ---------- */
HC.qrCanvas = function (data, px) {
  if (typeof qrcode !== 'function') return null;
  var qr = qrcode(0, 'M'); qr.addData(data); qr.make();
  var n = qr.getModuleCount(), quiet = 4, total = n + quiet * 2;
  var scale = Math.max(4, Math.floor(px / total));
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = total * scale;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0B2447';
  for (var r = 0; r < n; r++) for (var c = 0; c < n; c++)
    if (qr.isDark(r, c)) ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
  return canvas;
};

HC.downloadQR = function (citizen) {
  HC.ensureQRLib(function (ok) {
    if (!ok) { HC.toast('مكتبة QR غير متاحة — افتح الصفحة مرة واحدة والإنترنت شغال', 'error'); return; }
    var qc = HC.qrCanvas(citizen.id, 560);
    var W = 800, H = 1060, out = document.createElement('canvas');
    out.width = W; out.height = H;
    var ctx = out.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#0B2447'; ctx.lineWidth = 8; ctx.strokeRect(12, 12, W - 24, H - 24);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0B2447';
    ctx.font = '700 46px "IBM Plex Sans Arabic","Segoe UI",sans-serif';
    ctx.fillText('حياة كود', W / 2, 92);
    ctx.fillStyle = '#0284C7';
    ctx.font = '600 20px "IBM Plex Mono",monospace';
    ctx.fillText('HAYATCODE MEDICAL ID', W / 2, 138);
    ctx.drawImage(qc, (W - qc.width) / 2, 175);
    var y = 175 + qc.width;
    ctx.fillStyle = '#0B2447';
    ctx.font = '700 40px "IBM Plex Sans Arabic","Segoe UI",sans-serif';
    ctx.fillText(citizen.name || '', W / 2, y + 70, W - 90);
    ctx.fillStyle = '#51667D';
    ctx.font = '600 28px "IBM Plex Mono",monospace';
    ctx.fillText(citizen.id, W / 2, y + 132);
    ctx.fillStyle = '#DC2626';
    ctx.font = '700 32px "IBM Plex Sans Arabic","Segoe UI",sans-serif';
    ctx.fillText('فصيلة الدم: ' + (citizen.bloodType || '—'), W / 2, y + 205);
    var a = document.createElement('a');
    a.download = 'hayatcode-qr-' + citizen.id + '.png';
    a.href = out.toDataURL('image/png');
    a.click();
    HC.toast('تم تحميل صورة رمز QR بجودة عالية', 'success');
  });
};