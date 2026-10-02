/* HayatCode — registration.js : معالج التسجيل متعدد الخطوات (تحقق، مسودة، مراجعة، إنشاء) */
(function () {
  var form = document.getElementById('reg-form');
  if (!form) return;

  var el = function (id) { return document.getElementById(id); };
  var editMode = HC.getParam('edit') === '1';
  var steps = HC.$$('[data-step]', form);
  var cur = 0;

  /* العنوان والأزرار في وضع التعديل */
  if (editMode) {
    var t = el('reg-title'); if (t) t.textContent = 'تعديل البيانات الطبية';
    var s = el('reg-sub'); if (s) s.textContent = 'حدّث الحقول ثم احفظ — ستُحدَّث البطاقة والملف الطبي تلقائيًا.';
    var cb = el('btn-confirm'); if (cb) cb.innerHTML = HC.icon('check', 'w-4 h-4') + ' حفظ التعديلات';
  }

  /* شريط الخطوات */
  var STEPS = ['البيانات الشخصية', 'المعلومات الطبية', 'جهة الاتصال', 'المراجعة'];
  var bar = el('steps-bar');
  bar.innerHTML = STEPS.map(function (label, i) {
    return '<li class="flex items-center gap-2' + (i < 3 ? ' flex-1' : '') + '" data-bar-item="' + i + '">' +
      '<span class="stp w-8 h-8 rounded-full grid place-items-center text-[13px] font-bold border-2 transition-colors"></span>' +
      '<span class="stp-label hidden md:block text-xs font-semibold">' + label + '</span>' +
      (i < 3 ? '<span class="stp-line flex-1 min-w-[16px] h-[3px] rounded-full bg-slate-200"></span>' : '') +
      '</li>';
  }).join('');

  function paintBar() {
    HC.$$('[data-bar-item]', bar).forEach(function (li, i) {
      var c = li.querySelector('.stp'), line = li.querySelector('.stp-line'), lab = li.querySelector('.stp-label');
      c.className = 'stp w-8 h-8 rounded-full grid place-items-center text-[13px] font-bold border-2 transition-colors ' +
        (i < cur ? 'bg-brand-600 border-brand-600 text-white'
        : i === cur ? 'border-brand-500 text-brand-600 bg-brand-50'
        : 'border-slate-300 text-slate-400 bg-white');
      c.innerHTML = i < cur ? HC.icon('check', 'w-4 h-4') : String(i + 1);
      if (line) line.className = 'stp-line flex-1 min-w-[16px] h-[3px] rounded-full ' + (i < cur ? 'bg-brand-500' : 'bg-slate-200');
      if (lab) lab.className = 'stp-label hidden md:block text-xs font-semibold ' + (i <= cur ? 'text-navy-900' : 'text-slate-400');
    });
  }

  /* قواعد التحقق */
  var PHONE_RE = /^01[0125]\d{8}$/;
  var RULES = {
    fullName:  { test: function (v) { return v.trim().length >= 5; }, msg: 'أدخل الاسم بالكامل (5 أحرف على الأقل).' },
    nid:       { test: function (v) { return /^\d{14}$/.test(v.trim()); }, msg: 'الرقم القومي يجب أن يكون 14 رقمًا.' },
    birthDate: { test: function (v) {
                   if (!v) return false;
                   var d = new Date(v), n = new Date();
                   return d < n && (n.getFullYear() - d.getFullYear()) < 130;
                 }, msg: 'أدخل تاريخ ميلاد صحيح.' },
    phone:     { test: function (v) { return PHONE_RE.test(v.trim()); }, msg: 'رقم هاتف مصري صحيح: 11 رقمًا يبدأ بـ 01.' },
    address:   { test: function (v) { return v.trim().length >= 5; }, msg: 'أدخل العنوان بشكل واضح.' },
    bloodType: { test: function (v) { return !!v; }, msg: 'اختر فصيلة الدم.' },
    ecName:    { test: function (v) { return v.trim().length >= 3; }, msg: 'أدخل اسم جهة الاتصال.' },
    ecRelation:{ test: function (v) { return !!v; }, msg: 'اختر صلة القرابة.' },
    ecPhone:   { test: function (v) { return PHONE_RE.test(v.trim()); }, msg: 'رقم هاتف صحيح: 11 رقمًا يبدأ بـ 01.' }
  };
  var STEP_FIELDS = [
    ['fullName', 'nid', 'birthDate', 'phone', 'address'],
    ['bloodType'],
    ['ecName', 'ecRelation', 'ecPhone'],
    []
  ];

  function validateField(k) {
    var e = el(k); if (!e) return true;
    var rule = RULES[k];
    var ok = rule ? rule.test(e.value) : true;
    e.classList.toggle('invalid', !ok);
    e.setAttribute('aria-invalid', String(!ok));
    var err = el('err-' + k);
    if (err) { err.textContent = ok ? '' : rule.msg; err.classList.toggle('show', !ok); }
    return ok;
  }
  function validateStep(i) {
    var ok = true;
    STEP_FIELDS[i].forEach(function (k) { if (!validateField(k)) ok = false; });
    if (i === 3) {
      var a = el('agree'), ae = el('err-agree');
      if (a && !a.checked) { ok = false; if (ae) ae.classList.add('show'); }
      else if (ae) ae.classList.remove('show');
    }
    return ok;
  }
  function clearFieldError(e) {
    e.classList.remove('invalid');
    var err = el('err-' + e.id);
    if (err) err.classList.remove('show');
  }

  /* جمع / تطبيق البيانات */
  var FIELD_IDS = ['fullName','nid','birthDate','phone','address','bloodType',
                   'allergies','diseases','medications','surgeries','notes',
                   'ecName','ecRelation','ecPhone'];
  function collectInputs() {
    var o = {};
    FIELD_IDS.forEach(function (k) { var e = el(k); if (e) o[k] = e.value; });
    return o;
  }
  function citizenToInputs(c) {
    var ec = c.emergencyContact || {};
    return {
      fullName: c.name || '', nid: c.nid || '', birthDate: c.birthDate || '', phone: c.phone || '',
      address: c.address || '', bloodType: c.bloodType || '',
      allergies: (c.allergies || []).join('، '), diseases: (c.diseases || []).join('، '),
      medications: (c.medications || []).join('، '), surgeries: (c.surgeries || []).join('، '),
      notes: c.notes || '', ecName: ec.name || '', ecRelation: ec.relation || '', ecPhone: ec.phone || ''
    };
  }
  function applyData(d) {
    if (!d) return;
    FIELD_IDS.forEach(function (k) {
      var e = el(k); if (!e || d[k] == null) return;
      e.value = d[k];
    });
  }
  function buildCitizen(inp) {
    return {
      name: inp.fullName.trim(), nid: inp.nid.trim(), birthDate: inp.birthDate,
      phone: inp.phone.trim(), address: inp.address.trim(), bloodType: inp.bloodType,
      allergies: HC.splitList(inp.allergies), diseases: HC.splitList(inp.diseases),
      medications: HC.splitList(inp.medications), surgeries: HC.splitList(inp.surgeries),
      notes: inp.notes.trim(),
      emergencyContact: { name: inp.ecName.trim(), relation: inp.ecRelation, phone: inp.ecPhone.trim() }
    };
  }

  /* التعبئة المسبقة: وضع التعديل، أو استعادة المسودة المحفوظة */
  applyData(editMode ? citizenToInputs(HC.Storage.getCitizen()) : HC.Storage.getDraft());

  /* حفظ المسودة تلقائيًا (وضع الإنشاء فقط) */
  var saveDraft = HC.debounce(function () {
    if (!editMode) HC.Storage.saveDraft(collectInputs());
  }, 400);
  form.addEventListener('input', function (e) {
    if (e.target.classList && e.target.classList.contains('input')) clearFieldError(e.target);
    saveDraft();
  });

  /* حد أقصى لتاريخ الميلاد = اليوم */
  var bd = el('birthDate');
  if (bd) bd.max = new Date().toISOString().slice(0, 10);

  /* شاشة المراجعة */
  function renderReview() {
    var b = buildCitizen(collectInputs());
    function lst(v) { return (v && v.length) ? v.map(HC.esc).join('، ') : ''; }
    function row(l, v) {
      return '<div class="flex justify-between gap-6 py-2 border-b border-slate-100 last:border-0">' +
        '<dt class="text-slate-500 shrink-0">' + l + '</dt>' +
        '<dd class="font-semibold text-navy-900 text-end">' + (v || '—') + '</dd></div>';
    }
    function group(title, step, rows) {
      return '<div class="rounded-2xl border border-slate-200 p-4 sm:p-5 mb-4">' +
        '<div class="flex items-center justify-between mb-1.5"><h3 class="font-bold text-navy-900">' + title + '</h3>' +
        '<button type="button" data-goto="' + step + '" class="btn btn-sm btn-outline">' + HC.icon('edit', 'w-3.5 h-3.5') + 'تعديل</button></div>' +
        '<dl class="text-sm">' + rows + '</dl></div>';
    }
    el('review').innerHTML =
      group('البيانات الشخصية', 0,
        row('الاسم', HC.esc(b.name)) +
        row('الرقم القومي', '<span dir="ltr" class="font-mono">' + HC.esc(b.nid) + '</span>') +
        row('تاريخ الميلاد', HC.fmtDate(b.birthDate)) +
        row('الهاتف', '<span dir="ltr">' + HC.esc(b.phone) + '</span>') +
        row('العنوان', HC.esc(b.address))) +
      group('المعلومات الطبية', 1,
        row('فصيلة الدم', '<b class="text-danger-600">' + HC.esc(b.bloodType) + '</b>') +
        row('الحساسية', lst(b.allergies)) +
        row('الأمراض المزمنة', lst(b.diseases)) +
        row('الأدوية الحالية', lst(b.medications)) +
        row('العمليات السابقة', lst(b.surgeries)) +
        row('ملاحظات طبية', HC.esc(b.notes))) +
      group('جهة اتصال الطوارئ', 2,
        row('الاسم', HC.esc(b.emergencyContact.name)) +
        row('صلة القرابة', HC.esc(b.emergencyContact.relation)) +
        row('الهاتف', '<span dir="ltr">' + HC.esc(b.emergencyContact.phone) + '</span>'));
  }

  /* التنقل بين الخطوات */
  function goto(i) {
    cur = Math.max(0, Math.min(3, i));
    steps.forEach(function (s, idx) { s.hidden = idx !== cur; });
    el('btn-prev').hidden = cur === 0;
    el('btn-next').hidden = cur === 3;
    el('btn-confirm').hidden = cur !== 3;
    if (cur === 3) renderReview();
    paintBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var h = steps[cur].querySelector('h2');
    if (h) h.focus();
  }

  el('btn-next').addEventListener('click', function () {
    if (validateStep(cur)) goto(cur + 1);
    else HC.toast('راجع الحقول المظللة بالأحمر', 'error');
  });
  el('btn-prev').addEventListener('click', function () { goto(cur - 1); });
  form.addEventListener('click', function (e) {
    var b = e.target.closest('[data-goto]');
    if (b) goto(+b.dataset.goto);
  });

  /* التأكيد النهائي */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (cur < 3) { if (validateStep(cur)) goto(cur + 1); return; }
    var firstBad = -1;
    [0, 1, 2].forEach(function (i) { if (!validateStep(i) && firstBad === -1) firstBad = i; });
    if (firstBad > -1) { goto(firstBad); HC.toast('هناك حقول ناقصة في الخطوات السابقة', 'error'); return; }
    if (!validateStep(3)) { HC.toast('يجب الإقرار بصحة البيانات قبل التأكيد', 'error'); return; }

    var data = buildCitizen(collectInputs());
    var btn = el('btn-confirm');
    btn.disabled = true;
    btn.innerHTML = HC.icon('refresh', 'w-4 h-4') + ' جارٍ التحضير…';

    if (editMode) {
      var existing = HC.Storage.getCitizen();
      data.id = existing.id; data.status = existing.status || 'active'; data.createdAt = existing.createdAt;
      HC.Storage.saveCitizen(Object.assign({}, existing, data));
      HC.toast('تم حفظ التعديلات بنجاح', 'success');
    } else {
      data.id = HC.Storage.genId();
      data.status = 'active';
      data.createdAt = new Date().toISOString();
      HC.Storage.saveCitizen(data);
      HC.Storage.clearDraft();
      HC.toast('تم إنشاء البطاقة الطبية بنجاح', 'success');
    }
    setTimeout(function () { location.href = 'card.html'; }, 900);
  });

  goto(0);
})();