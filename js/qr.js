/* HayatCode — qr.js : محاكاة ماسح QR (حالة: جاهز / مسح / نجاح / خطأ) + إدخال يدوي */
(function () {
  var stage = document.getElementById('scan-stage');
  if (!stage) return;

  var c = HC.Storage.getCitizen();
  var statusText = document.getElementById('scan-status');
  var statusDot  = document.getElementById('scan-dot');
  var scanline   = document.getElementById('scan-line');
  var okMark     = document.getElementById('scan-ok');
  var startBtn   = document.getElementById('btn-start');
  var cancelBtn  = document.getElementById('btn-cancel');
  var manualForm = document.getElementById('qr-manual-form');
  var manualInput= document.getElementById('qr-manual');
  var manualErr  = document.getElementById('qr-manual-err');
  var startHTML  = startBtn.innerHTML;
  var timer = null, done = false;

  function setStatus(txt, mode) {
    statusText.textContent = txt;
    statusDot.className = 'w-2.5 h-2.5 rounded-full flex-none ' + (
      mode === 'scan' ? 'bg-brand-300 animate-pulse' :
      mode === 'ok'   ? 'bg-emerald-400' :
      mode === 'err'  ? 'bg-danger-400' : 'bg-slate-500');
  }
  function reset() {
    clearTimeout(timer); timer = null;
    stage.classList.remove('ok', 'err');
    scanline.classList.add('hidden');
    okMark.classList.add('hidden');
    startBtn.disabled = false;
    startBtn.innerHTML = startHTML;
    cancelBtn.classList.add('hidden');
    setStatus('جاهز للمسح — اضغط "بدء المسح" ثم وجّه الكود نحو الإطار', 'idle');
  }
  function succeed(code) {
    done = true;
    stage.classList.remove('err'); stage.classList.add('ok');
    scanline.classList.add('hidden');
    okMark.classList.remove('hidden');
    setStatus('تم التعرف بنجاح — فتح الملف الطبي…', 'ok');
    HC.toast('تم المسح بنجاح: ' + code, 'success', 2000);
    setTimeout(function () {
      location.href = 'emergency-profile.html?id=' + encodeURIComponent(code);
    }, 1500);
  }

  startBtn.addEventListener('click', function () {
    if (done) return;
    startBtn.disabled = true;
    startBtn.textContent = 'جارٍ المسح…';
    cancelBtn.classList.remove('hidden');
    scanline.classList.remove('hidden');
    setStatus('جارٍ المسح… وجّه رمز QR داخل الإطار', 'scan');
    timer = setTimeout(function () { succeed(c.id); }, 2800);
  });
  cancelBtn.addEventListener('click', reset);

  manualForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (done) return;
    manualErr.classList.remove('show');
    manualInput.classList.remove('invalid');
    var code = HC.normalizeCode(manualInput.value);
    if (!HC.validCode(code)) {
      manualErr.textContent = 'صيغة غير صحيحة — المثال الصحيح: HC-2026-000123';
      manualErr.classList.add('show'); manualInput.classList.add('invalid');
      stage.classList.remove('ok'); stage.classList.add('err');
      setStatus('تعذر قراءة الكود — تحقق من الصيغة', 'err');
      return;
    }
    if (code !== c.id) {
      manualErr.textContent = 'الكود غير مسجل في البيانات المحلية لهذا النموذج.';
      manualErr.classList.add('show'); manualInput.classList.add('invalid');
      stage.classList.add('err');
      setStatus('كود غير معروف', 'err');
      return;
    }
    succeed(code);
  });

  reset();
})();