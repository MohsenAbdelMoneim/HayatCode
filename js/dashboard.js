/* HayatCode — dashboard.js : لوحة المواطن (بطاقة، اكتمال، جهة طوارئ، وسائل التعريف) */
(function () {
  var c = HC.Storage.getCitizen();
  var ec = c.emergencyContact || {};
  var el = function (id) { return document.getElementById(id); };
  var set = function (id, v) { var e = el(id); if (e) e.textContent = v; };

  set('d-name', (c.name || '').trim().split(/\s+/)[0] || 'مواطن');
  set('d-date', new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday:'long', day:'numeric', month:'long', year:'numeric' }));
  set('d-blood', c.bloodType || '—');
  set('d-ec-name', ec.name || '—');
  set('d-ec-rel', ec.relation || '');
  set('d-ec-phone', ec.phone || '—');
  var call = el('d-ec-call'); if (call && ec.phone) call.href = 'tel:' + ec.phone;
  set('d-id', c.id);
  set('d-created', 'أُنشئت: ' + (c.createdAt ? HC.fmtDate(String(c.createdAt).slice(0, 10)) : '—'));

  /* نسبة الاكتمال + قائمة التحقق */
  var pct = HC.Storage.completion(c);
  set('d-comp-num', pct + '%');
  var bar = el('d-comp-bar'); if (bar) bar.style.width = pct + '%';
  var checks = [
    ['البيانات الشخصية', !!(c.name && c.nid && c.birthDate && c.phone && c.address)],
    ['فصيلة الدم', !!c.bloodType],
    ['الحساسية', !!(c.allergies && c.allergies.length)],
    ['الأمراض المزمنة', !!(c.diseases && c.diseases.length)],
    ['الأدوية الحالية', !!(c.medications && c.medications.length)],
    ['جهة اتصال الطوارئ', !!(ec.name && ec.phone)],
    ['ملاحظات طبية', !!c.notes],
    ['العمليات السابقة', !!(c.surgeries && c.surgeries.length)]
  ];
  var checksEl = el('d-checks');
  if (checksEl) {
    checksEl.innerHTML = checks.map(function (k) {
      return '<li class="flex items-center gap-2 text-sm">' +
        HC.icon(k[1] ? 'check' : 'x', 'w-4 h-4 flex-none ' + (k[1] ? 'text-emerald-600' : 'text-slate-300')) +
        '<span class="' + (k[1] ? 'text-navy-900 font-medium' : 'text-slate-400') + '">' + k[0] + '</span></li>';
    }).join('');
  }

  /* معاينة البطاقة */
  var host = el('d-card');
  if (host) { host.innerHTML = HC.cardHTML(c, { flip: false }); HC.mountCardWidgets(host); }

  /* نسخ المعرّف */
  var cp = el('d-copy');
  if (cp) cp.addEventListener('click', function () { HC.copyText(c.id); });
})();