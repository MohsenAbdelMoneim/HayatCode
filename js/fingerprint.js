/* HayatCode — fingerprint.js
   محاكاة واجهة البصمة فقط: جاهز / جارٍ التحقق / نجاح / فشل.
   ملاحظة معمارية: لا يوجد أي مصادقة حقيقية هنا — هذه الشاشة جاهزة لاستقبال
   مستشعر حقيقي أو WebAuthn لاحقًا عبر استبدال دالة verify(). */
(function () {
  var stage = document.getElementById('fp-stage');
  if (!stage) return;

  var c = HC.Storage.getCitizen();
  var status = document.getElementById('fp-status');
  var sub    = document.getElementById('fp-sub');
  var btn    = document.getElementById('fp-btn');
  var goBtn  = document.getElementById('fp-go');
  var barWrap= document.getElementById('fp-bar-wrap');
  var bar    = document.getElementById('fp-bar');
  var okEl   = document.getElementById('fp-ok');
  var errEl  = document.getElementById('fp-err');
  var busy = false, finished = false;

  var STATUS_BASE = 'text-xl sm:text-2xl font-bold transition-colors';

  function setState(cls) { stage.className = 'fp-stage relative w-56 h-56 mx-auto my-6 ' + cls; }

  /* نقطة الربط المستقبلية: تُستبدل بنداء المستشعر الحقيقي */
  function verify() { return Math.random() < 0.8; }

  btn.addEventListener('click', function () {
    if (busy || finished) return;
    busy = true;
    setState('scanning');
    okEl.classList.add('hidden');
    errEl.classList.add('hidden');
    status.className = STATUS_BASE + ' text-brand-700';
    status.textContent = 'جارٍ التحقق…';
    sub.textContent = 'حافظ على تثبيت الإصبع حتى انتهاء الفحص';
    btn.disabled = true;
    btn.textContent = 'جارٍ التحقق…';
    barWrap.classList.remove('hidden');
    bar.classList.add('run');

    setTimeout(function () {
      busy = false;
      bar.classList.remove('run');
      barWrap.classList.add('hidden');
      if (verify()) success(); else fail();
    }, 2600);
  });

  function success() {
    finished = true;
    setState('ok');
    okEl.classList.remove('hidden');
    status.className = STATUS_BASE + ' text-emerald-600';
    status.textContent = 'تم التعرف على المواطن';
    sub.textContent = c.name + ' — ' + c.id;
    btn.classList.add('hidden');
    goBtn.classList.remove('hidden');
    HC.toast('تم التعرف: ' + HC.esc(c.name), 'success', 2200);
    setTimeout(function () {
      location.href = 'emergency-profile.html?id=' + encodeURIComponent(c.id);
    }, 2400);
  }

  function fail() {
    setState('err');
    errEl.classList.remove('hidden');
    status.className = STATUS_BASE + ' text-danger-600';
    status.textContent = 'تعذر التعرف على البصمة';
    sub.textContent = 'تأكد من وضع الإصبع كاملًا على المستشعر ثم أعد المحاولة.';
    stage.classList.add('shake');
    setTimeout(function () { stage.classList.remove('shake'); }, 500);
    btn.disabled = false;
    btn.textContent = 'إعادة المحاولة';
  }

  goBtn.addEventListener('click', function () {
    location.href = 'emergency-profile.html?id=' + encodeURIComponent(c.id);
  });
})();