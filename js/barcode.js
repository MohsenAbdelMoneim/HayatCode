/* HayatCode — barcode.js : عرض الباركود، محاكاة المسح، الإدخال اليدوي، حالتا النجاح والخطأ */
(function () {
  var c = HC.Storage.getCitizen();
  var svg = document.getElementById('bc-display');
  if (!svg) return;

  try {
    JsBarcode(svg, c.id, {
      format: 'CODE128', lineColor: '#0A2440', background: '#ffffff',
      width: 1.9, height: 64, displayValue: true, fontSize: 15, font: 'IBM Plex Mono', margin: 6
    });
  } catch (e) {}

  var simBtn   = document.getElementById('bc-sim');
  var prog     = document.getElementById('bc-prog');
  var progBar  = document.getElementById('bc-prog-bar');
  var progTxt  = document.getElementById('bc-prog-txt');
  var result   = document.getElementById('bc-result');
  var form     = document.getElementById('bc-form');
  var input    = document.getElementById('bc-input');
  var busy = false;

  function showResult(ok, html) {
    result.className = 'mt-5 rounded-2xl border-2 p-4 ' + (ok ? 'border-emerald-200 bg-emerald-50' : 'border-danger-100 bg-danger-50');
    result.innerHTML = html;
    result.classList.remove('hidden');
  }
  function redirect(code) {
    setTimeout(function () {
      location.href = 'emergency-profile.html?id=' + encodeURIComponent(code);
    }, 2200);
  }

  /* محاكاة مسح الباركود المعروض */
  simBtn.addEventListener('click', function () {
    if (busy) return;
    busy = true;
    simBtn.disabled = true;
    result.classList.add('hidden');
    prog.classList.remove('hidden');
    progTxt.textContent = 'جارٍ قراءة الباركود…';
    var w = 0;
    var iv = setInterval(function () {
      w += Math.random() * 7 + 2;
      if (w >= 100) {
        w = 100; clearInterval(iv);
        progTxt.textContent = 'جارٍ فك ترميز CODE128…';
        setTimeout(function () {
          prog.classList.add('hidden'); progBar.style.width = '0%';
          busy = false; simBtn.disabled = false;
          showResult(true,
            '<div class="flex items-start gap-3">' +
              HC.icon('check', 'w-5 h-5 text-emerald-600 mt-0.5 flex-none') +
              '<div class="text-sm leading-7"><b class="text-emerald-800">تم التعرف على المواطن: ' + HC.esc(c.name) + '</b><br>' +
              '<span class="font-mono text-xs text-slate-500" dir="ltr">' + c.id + '</span> — ' +
              '<span id="bc-count" class="font-semibold">سيتم فتح الملف خلال 2 ثانية…</span><br>' +
              '<button type="button" id="bc-open" class="btn btn-sm btn-primary mt-2">فتح الملف الآن</button></div></div>');
          document.getElementById('bc-open').addEventListener('click', function () {
            location.href = 'emergency-profile.html?id=' + encodeURIComponent(c.id);
          });
          redirect(c.id);
        }, 300);
        return;
      }
      progBar.style.width = w + '%';
    }, 60);
  });

  /* التحقق من إدخال يدوي */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    input.classList.remove('invalid');
    var code = HC.normalizeCode(input.value);
    if (!HC.validCode(code)) {
      input.classList.add('invalid');
      showResult(false,
        '<div class="flex items-start gap-3">' + HC.icon('alert', 'w-5 h-5 text-danger-600 mt-0.5 flex-none') +
        '<div class="text-sm leading-7 text-danger-700"><b>فشل التعريف — صيغة غير صحيحة.</b><br>الصيغة الصحيحة مثل: <span class="font-mono" dir="ltr">HC-2026-000123</span></div></div>');
      return;
    }
    if (code !== c.id) {
      input.classList.add('invalid');
      showResult(false,
        '<div class="flex items-start gap-3">' + HC.icon('alert', 'w-5 h-5 text-danger-600 mt-0.5 flex-none') +
        '<div class="text-sm leading-7 text-danger-700"><b>فشل التعريف — الكود غير مطابق لأي ملف محلي.</b><br>تأكد من قراءة الباركود بالكامل أو استخدم رمز QR.</div></div>');
      return;
    }
    showResult(true,
      '<div class="flex items-start gap-3">' + HC.icon('check', 'w-5 h-5 text-emerald-600 mt-0.5 flex-none') +
      '<div class="text-sm leading-7"><b class="text-emerald-800">تم التعرف على المواطن: ' + HC.esc(c.name) + '</b> — جارٍ فتح الملف…</div></div>');
    redirect(code);
  });
})();