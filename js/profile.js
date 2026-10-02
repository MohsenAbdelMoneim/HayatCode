/* HayatCode — profile.js : عرض الملف الطبي الكامل من طبقة البيانات */
(function () {
  var c = HC.Storage.getCitizen();
  var ec = c.emergencyContact || {};
  var el = function (id) { return document.getElementById(id); };
  var set = function (id, v) { var e = el(id); if (e) e.textContent = v; };

  set('p-name', c.name);
  set('p-nid', c.nid || '—');
  set('p-birth', HC.fmtDate(c.birthDate));
  var age = HC.calcAge(c.birthDate);
  set('p-age', age != null ? age + ' سنة' : '');
  set('p-phone', c.phone || '—');
  set('p-address', c.address || '—');
  set('p-blood', c.bloodType || '—');

  function chips(id, list, cls, emptyCls, emptyTxt, emptyIcon) {
    var e = el(id); if (!e) return;
    e.innerHTML = (list && list.length)
      ? list.map(function (v) { return '<span class="chip ' + cls + '">' + HC.esc(v) + '</span>'; }).join('')
      : '<span class="chip ' + emptyCls + '">' + HC.icon(emptyIcon, 'w-3.5 h-3.5') + emptyTxt + '</span>';
  }
  chips('p-allergies', c.allergies, 'chip-danger', 'chip-ok', 'لا توجد حساسية مسجلة', 'check');
  chips('p-diseases', c.diseases, 'chip-navy', 'chip-navy', 'لا توجد أمراض مزمنة', 'check');
  chips('p-meds', c.medications, 'chip-brand', 'chip-navy', 'لا توجد أدوية حالية', 'check');
  chips('p-surgeries', c.surgeries, 'chip-navy', 'chip-navy', 'لا توجد عمليات', 'check');
  set('p-notes', c.notes || 'لا توجد ملاحظات.');

  set('p-ec-name', ec.name || '—');
  set('p-ec-rel', ec.relation || '');
  set('p-ec-phone', ec.phone || '—');
  var call = el('p-ec-call');
  if (call && ec.phone) call.href = 'tel:' + ec.phone;

  /* نسبة الاكتمال والحالة */
  var pct = HC.Storage.completion(c);
  var bar = el('p-comp-bar'); if (bar) bar.style.width = pct + '%';
  set('p-comp-num', pct + '% مكتمل');
  set('p-status', c.status === 'active' ? 'البطاقة مفعّلة' : 'غير مفعّلة');
  set('p-created', 'آخر تحديث: ' + (c.updatedAt || c.createdAt ? HC.fmtDate((c.updatedAt || c.createdAt).slice(0, 10)) : '—'));

  /* معاينة البطاقة */
  var host = el('p-card');
  if (host) { host.innerHTML = HC.cardHTML(c, { flip: false }); HC.mountCardWidgets(host); }
})();