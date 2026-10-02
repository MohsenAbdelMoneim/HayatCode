/* HayatCode — settings.js : إدارة الأقسام، التبديلات، الخصوصية، ومسح البيانات */
(function () {
  if (!document.getElementById('settings-root')) return;

  var c = HC.Storage.getCitizen();
  var S = HC.Storage.getSettings();
  var el = function (id) { return document.getElementById(id); };
  var val = function (id) { var e = el(id); return e ? e.value.trim() : ''; };
  var PHONE_RE = /^01[0125]\d{8}$/;

  /* تعبئة مسبقة */
  el('s-name').value = c.name || '';
  el('s-birth').value = c.birthDate || '';
  el('s-phone').value = c.phone || '';
  el('s-address').value = c.address || '';
  el('s-blood').value = c.bloodType || '';
  el('s-allergies').value = (c.allergies || []).join('، ');
  el('s-diseases').value = (c.diseases || []).join('، ');
  el('s-medications').value = (c.medications || []).join('، ');
  el('s-surgeries').value = (c.surgeries || []).join('، ');
  el('s-notes').value = c.notes || '';
  var ec = c.emergencyContact || {};
  el('s-ec-name').value = ec.name || '';
  el('s-ec-relation').value = ec.relation || '';
  el('s-ec-phone').value = ec.phone || '';

  function clearErrors() {
    HC.$$('.err').forEach(function (e) { e.classList.remove('show'); });
    HC.$$('.input').forEach(function (i) { i.classList.remove('invalid'); });
  }
  function fail(id, msg) {
    var e = el(id); if (!e) return;
    e.textContent = msg; e.classList.add('show');
    var f = el(id.replace('err-', ''));
    if (f) f.classList.add('invalid');
  }

  /* حفظ المعلومات الشخصية */
  el('s1-save').addEventListener('click', function () {
    clearErrors();
    var ok = true;
    if (val('s-name').length < 5) { fail('err-s-name', 'الاسم يجب أن يكون 5 أحرف على الأقل.'); ok = false; }
    if (!PHONE_RE.test(val('s-phone'))) { fail('err-s-phone', 'رقم هاتف صحيح: 11 رقمًا يبدأ بـ 01.'); ok = false; }
    if (!ok) { HC.toast('راجع الحقول المظللة', 'error'); return; }
    c = HC.Storage.updateCitizen({ name: val('s-name'), birthDate: val('s-birth'), phone: val('s-phone'), address: val('s-address') });
    HC.toast('تم حفظ المعلومات الشخصية', 'success');
  });

  /* حفظ المعلومات الطبية */
  el('s2-save').addEventListener('click', function () {
    clearErrors();
    if (!val('s-blood')) { fail('err-s-blood', 'اختر فصيلة الدم.'); HC.toast('فصيلة الدم مطلوبة', 'error'); return; }
    c = HC.Storage.updateCitizen({
      bloodType: val('s-blood'),
      allergies: HC.splitList(val('s-allergies')),
      diseases: HC.splitList(val('s-diseases')),
      medications: HC.splitList(val('s-medications')),
      surgeries: HC.splitList(val('s-surgeries')),
      notes: val('s-notes')
    });
    HC.toast('تم حفظ المعلومات الطبية', 'success');
  });

  /* حفظ جهة الطوارئ */
  el('s3-save').addEventListener('click', function () {
    clearErrors();
    var ok = true;
    if (val('s-ec-name').length < 3) { fail('err-s-ec-name', 'أدخل اسم جهة الاتصال.'); ok = false; }
    if (!PHONE_RE.test(val('s-ec-phone'))) { fail('err-s-ec-phone', 'رقم هاتف صحيح: 11 رقمًا يبدأ بـ 01.'); ok = false; }
    if (!ok) { HC.toast('راجع الحقول المظللة', 'error'); return; }
    c = HC.Storage.updateCitizen({ emergencyContact: { name: val('s-ec-name'), relation: val('s-ec-relation'), phone: val('s-ec-phone') } });
    HC.toast('تم حفظ جهة اتصال الطوارئ', 'success');
  });

  /* التبديلات: الخصوصية والإشعارات */
  [['t-pn', 'privacyNotes'], ['t-pp', 'privacyPhone'], ['t-off', 'offline'],
   ['t-nr', 'notifyReview'], ['t-ns', 'notifyStatus']].forEach(function (p) {
    var e = el(p[0]); if (!e) return;
    e.checked = !!S[p[1]];
    e.addEventListener('change', function () { S[p[1]] = e.checked; HC.Storage.saveSettings(S); });
  });

  /* اللغة */
  var lang = el('s-lang');
  lang.value = S.lang || 'ar';
  lang.addEventListener('change', function () {
    S.lang = lang.value;
    HC.Storage.saveSettings(S);
    HC.toast(S.lang === 'ar'
      ? 'اللغة: العربية — الواجهة الحالية'
      : 'English UI will be enabled together with the data layer', 'info');
  });

  /* منطقة الخطر: مسح البيانات */
  var modal = el('s-modal');
  function closeModal() { modal.classList.add('hidden'); }
  el('s-clear').addEventListener('click', function () {
    modal.classList.remove('hidden');
    el('s-modal-cancel').focus();
  });
  el('s-modal-cancel').addEventListener('click', closeModal);
  el('s-modal-confirm').addEventListener('click', function () {
    HC.Storage.clearCitizen();
    closeModal();
    HC.toast('تم مسح البيانات المحلية — ستُحمَّل البيانات التجريبية افتراضيًا', 'success');
    setTimeout(function () { location.href = 'index.html'; }, 1000);
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
})();