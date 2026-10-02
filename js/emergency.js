/* HayatCode — emergency.js : صفحة دخول الطوارئ + صفحة الملف الطبي للطوارئ */
(function () {
  var page = document.body.getAttribute('data-page');
  if (page === 'emergency') initHub();
  if (page === 'emergency-profile') initProfile();

  /* ساعة حية — تفصيلة وظيفية لفرق الاستجابة */
  function tickClock(el) {
    if (!el) return;
    var f = function () { el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false }); };
    f(); setInterval(f, 1000);
  }

  /* ---------- صفحة دخول الطوارئ ---------- */
  function initHub() {
    tickClock(document.getElementById('hub-clock'));
    var form = document.getElementById('manual-form');
    if (!form) return;
    var input = document.getElementById('manual-code');
    var err = document.getElementById('manual-err');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.classList.remove('show');
      input.classList.remove('invalid');
      var code = HC.normalizeCode(input.value);

      if (!HC.validCode(code)) {
        err.textContent = 'صيغة الكود غير صحيحة — الصيغة الصحيحة مثل: HC-2026-000123';
        err.classList.add('show'); input.classList.add('invalid');
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
        return;
      }
      var c = HC.Storage.getCitizen();
      if (code === c.id) {
        HC.toast('تم التعرف على المواطن — جارٍ فتح الملف الطبي…', 'success', 1500);
        setTimeout(function () { location.href = 'emergency-profile.html?id=' + encodeURIComponent(code); }, 700);
      } else {
        err.textContent = 'لا يوجد ملف مطابق لهذا الكود في البيانات المحلية لهذا النموذج.';
        err.classList.add('show'); input.classList.add('invalid');
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
      }
    });
  }

  /* ---------- صفحة الملف الطبي للطوارئ ---------- */
  function fillChips(el, list, cls, emptyTxt) {
    if (!el) return;
    el.innerHTML = (list && list.length)
      ? list.map(function (v) { return '<span class="chip ' + cls + ' chip-lg">' + HC.esc(v) + '</span>'; }).join('')
      : '<span class="chip chip-ok chip-lg">' + HC.icon('check', 'w-4 h-4') + emptyTxt + '</span>';
  }

  function initProfile() {
    var c = HC.Storage.getCitizen();
    var requested = HC.getParam('id');
    var code = requested ? HC.normalizeCode(requested) : c.id;
    tickClock(document.getElementById('ep-clock'));

    var content = document.getElementById('ep-content');
    var notFound = document.getElementById('ep-notfound');

    if (HC.validCode(code) && code !== c.id) {
      if (content) content.classList.add('hidden');
      if (notFound) {
        notFound.classList.remove('hidden');
        var s = document.getElementById('ep-nf-code');
        if (s) s.textContent = code;
      }
      return;
    }

    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    var ec = c.emergencyContact || {};

    set('ep-name', c.name);
    set('ep-id', c.id);
    var age = HC.calcAge(c.birthDate);
    set('ep-age', age != null ? 'العمر: ' + age + ' سنة' : '');
    set('ep-phone', c.phone || '');
    set('ep-blood', c.bloodType || '—');
    var ini = document.getElementById('ep-initials');
    if (ini) ini.textContent = HC.initials(c.name);

    fillChips(document.getElementById('ep-allergies'), c.allergies, 'chip-danger', 'لا توجد حساسية مسجلة');
    fillChips(document.getElementById('ep-diseases'), c.diseases, 'chip-navy', 'لا توجد أمراض مزمنة');
    fillChips(document.getElementById('ep-meds'), c.medications, 'chip-brand', 'لا توجد أدوية حالية');
    set('ep-notes', c.notes || 'لا توجد ملاحظات طبية.');
    set('ep-ec-name', ec.name || '—');
    set('ep-ec-rel', ec.relation || '');
    set('ep-ec-phone', ec.phone || '—');

    var call = document.getElementById('ep-ec-call');
    if (call && ec.phone) call.href = 'tel:' + ec.phone;

    set('ep-birth', HC.fmtDate(c.birthDate));
    set('ep-address', c.address || '—');
    set('ep-surgeries', (c.surgeries && c.surgeries.length) ? c.surgeries.join('، ') : 'لا توجد');
    var open = document.getElementById('ep-opened');
    if (open) open.textContent = new Date().toLocaleString('ar-EG-u-nu-latn', { dateStyle: 'long', timeStyle: 'short' });

    var pr = document.getElementById('ep-print');
    if (pr) pr.addEventListener('click', function () { window.print(); });
  }
})();