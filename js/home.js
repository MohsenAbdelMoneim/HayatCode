/* HayatCode — home.js : تفاعلات صفحة الهبوط (بطاقة العرض + منتقي وسائل التعريف) */
(function () {
  var c = HC.Storage.getCitizen();

  /* بطاقة العرض في الـ Hero */
  var host = document.getElementById('hero-card');
  if (host) { host.innerHTML = HC.cardHTML(c, { flip: false }); HC.mountCardWidgets(host); }
  var idChip = document.getElementById('hero-id');
  if (idChip) idChip.textContent = c.id;
  var pvBlood = document.getElementById('pv-blood');
  if (pvBlood) pvBlood.textContent = c.bloodType || '—';
  var pvAlg = document.getElementById('pv-allergy');
  if (pvAlg) pvAlg.innerHTML = (c.allergies && c.allergies.length)
    ? '<span class="chip chip-danger">' + HC.icon('alert', 'w-3.5 h-3.5') + HC.esc(c.allergies.join('، ')) + '</span>'
    : '<span class="chip chip-ok">' + HC.icon('check', 'w-3.5 h-3.5') + 'لا يوجد</span>';

  /* منتقي وسائل التعريف */
  var METHODS = [
    { icon:'qr', title:'رمز QR', tag:'طريقة التعريف الأساسية',
      desc:'رمز QR يحمل مُعرّف المواطن الفريد (HC-ID) فقط — لا يحتوي على أي بيانات شخصية داخله. عند مسحه بأي كاميرا هاتف يسترجع النظام الملف الطبي المرتبط بهذا المعرّف خلال ثوانٍ.',
      points:['لا يحتوي الرمز على بيانات طبية — المعرّف فقط، لأسباب تتعلق بالخصوصية','يعمل بأي كاميرا هاتف دون تطبيق خاص أو إنترنت','يُطبع على البطاقة بحجم واضح وقابل للمسح من مسافة مناسبة'],
      href:'qr-scanner.html', cta:'تجربة الماسح' },
    { icon:'barcode', title:'الباركود', tag:'طريقة بديلة موثوقة',
      desc:'باركود CODE128 يحمل المعرّف نفسه، ويُقرأ بأي قارئ باركود متوفر في المستشفيات والصيدليات ونقاط الإسعاف — الخيار الأمثل عند تعذر مسح QR أو تلف جزء من البطاقة.',
      points:['معرّف مطابق لرمز QR — مصدر حقيقة واحد','متوافق مع القارئات الموجودة فعليًا في المنشآت الصحية','يُطبع بأبعاد قياسية على الوجه الخلفي للبطاقة'],
      href:'barcode.html', cta:'تجربة الباركود' },
    { icon:'fingerprint', title:'البصمة', tag:'المستقبل — تكامل حيوي',
      desc:'التحقق الحيوي هو المرحلة التالية للنظام. في هذه النسخة تمثّل البصمة محاكاة كاملة للواجهة وتدفقات النجاح والفشل، وجاهزة للربط مع مستشعر حقيقي أو WebAuthn عند دمج العتاد.',
      points:['محاكاة كاملة لتدفقات النجاح والفشل وجاهزية الواجهة','لا تُخزَّن أي بصمات في هذه المرحلة إطلاقًا','قابلة للربط مع مستشعر خارجي أو WebAuthn لاحقًا'],
      href:'fingerprint.html', cta:'تجربة المحاكاة' },
    { icon:'file', title:'معلومات الطوارئ', tag:'جوهر النظام',
      desc:'المخرج النهائي لأي وسيلة تعريف: ملف طبي مرتّب حسب أولوية الطوارئ — فصيلة الدم أولًا، ثم الحساسية والأمراض المزمنة والأدوية وجهة الاتصال — ليقرأه المسعف في أقل من 10 ثوانٍ.',
      points:['فصيلة الدم وحساسية تظهر بأعلى أولوية بصرية','اتصال مباشر بجهة الطوارئ بضغطة واحدة','مصمم للقراءة السريعة تحت الضغط — خط كبير وتباين عالٍ'],
      href:'emergency-profile.html', cta:'فتح ملف الطوارئ التجريبي' }
  ];

  var list = document.getElementById('method-list');
  var detail = document.getElementById('method-detail');
  if (!list || !detail) return;

  function renderDetail(i) {
    var m = METHODS[i];
    detail.innerHTML =
      '<div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center">' + HC.icon(m.icon, 'w-7 h-7') + '</div>' +
      '<div class="mt-5 flex items-center gap-3 flex-wrap"><h3 class="text-xl font-bold text-navy-900">' + m.title + '</h3>' +
      '<span class="chip chip-brand">' + m.tag + '</span></div>' +
      '<p class="mt-3 text-sm leading-8 text-slate-600">' + m.desc + '</p>' +
      '<ul class="mt-5 grid gap-3">' +
        m.points.map(function (p) {
          return '<li class="flex gap-2.5 text-sm text-navy-800">' + HC.icon('check', 'w-4 h-4 text-brand-500 mt-1 flex-none') + '<span class="leading-7">' + p + '</span></li>';
        }).join('') +
      '</ul>' +
      '<a href="' + m.href + '" class="btn btn-primary mt-7">' + m.cta + HC.icon('chev-l', 'w-4 h-4') + '</a>';
    detail.classList.remove('anim'); void detail.offsetWidth; detail.classList.add('anim');
  }
  function renderList(active) {
    list.innerHTML = METHODS.map(function (m, i) {
      var on = i === active;
      return '<button type="button" role="tab" aria-selected="' + on + '" data-i="' + i + '" ' +
        'class="w-full text-start flex items-center gap-4 rounded-2xl border p-4 transition-colors ' +
        (on ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-brand-50/40') + '">' +
        '<span class="w-11 h-11 rounded-xl grid place-items-center flex-none ' + (on ? 'bg-brand-500 text-white' : 'bg-slate-100 text-navy-700') + '">' + HC.icon(m.icon, 'w-5.5 h-5.5 w-6 h-6') + '</span>' +
        '<span class="flex-1 min-w-0"><span class="block font-bold text-navy-900">' + m.title + '</span>' +
        '<span class="block text-xs text-slate-500 mt-0.5">' + m.tag + '</span></span>' +
        HC.icon('chev-l', 'w-4 h-4 text-slate-300 flex-none') + '</button>';
    }).join('');
  }
  list.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (!b) return;
    var i = +b.dataset.i;
    renderList(i); renderDetail(i);
  });
  renderList(0); renderDetail(0);
})();