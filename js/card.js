/* HayatCode — card.js : عرض البطاقة، القلب، الطباعة، تحميل PNG */
(function () {
  var c = HC.Storage.getCitizen();
  var host = document.getElementById('card-holder');
  if (!host) return;

  host.innerHTML = HC.cardHTML(c, { flip: true });
  HC.mountCardWidgets(host);

  var inner = host.querySelector('.flip-inner');
  function flip() {
    inner.classList.toggle('flipped');
    host.setAttribute('aria-pressed', String(inner.classList.contains('flipped')));
  }
  host.setAttribute('role', 'button');
  host.setAttribute('tabindex', '0');
  host.setAttribute('aria-pressed', 'false');
  host.setAttribute('aria-label', 'قلب البطاقة الطبية');
  host.addEventListener('click', flip);
  host.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });

  /* الطباعة */
  document.getElementById('btn-print').addEventListener('click', function () { window.print(); });
  /* تحميل الوجه الأمامي كصورة PNG */
  document.getElementById('btn-download').addEventListener('click', function () {
    if (typeof html2canvas === 'undefined') {
      HC.toast('مكتبة التحميل غير محمّلة — استخدم زر الطباعة', 'error'); return;
    }
    HC.toast('جارٍ تجهيز الصورة…', 'info', 1500);
    var front = host.querySelector('.med-face');
    var holder = document.createElement('div');
    holder.style.cssText = 'position:fixed;top:0;left:-9999px;width:360px;aspect-ratio:1.586;position:relative;';
    holder.style.position = 'relative';
    var clone = front.cloneNode(true);
    holder.appendChild(clone);
    document.body.appendChild(holder);
    html2canvas(holder, { scale: 3, backgroundColor: null, logging: false })
      .then(function (canvas) {
        var a = document.createElement('a');
        a.download = 'hayatcode-' + c.id + '.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
        HC.toast('تم تحميل البطاقة بنجاح', 'success');
      })
      .catch(function () { HC.toast('تعذر التحميل — يمكنك استخدام الطباعة بدلًا من ذلك', 'error'); })
      .finally(function () { holder.remove(); });
  });
})();