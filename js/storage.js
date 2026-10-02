/* HayatCode — storage.js
   طبقة البيانات المحلية (Mock Data Layer).
   عند دمج قاعدة البيانات لاحقًا: يُستبدل محتوى هذه الدوال فقط باستدعاءات API —
   باقي التطبيق (كل الصفحات) لن يتغير لأنه يتعامل مع هذه الواجهة فقط. */
HC.Storage = (function () {
  var KEY = 'hayatcode_citizen_v1', DRAFT = 'hayatcode_draft_v1', SET = 'hayatcode_settings_v1';

  /* بيانات تجريبية افتراضية (تُحمَّل عند أول تشغيل فقط) */
  var DEMO = {
    id: 'HC-2026-000123',
    name: 'أحمد محمد عبدالله',
    nid: '29805150102345',
    birthDate: '1998-05-15',
    phone: '01000000000',
    address: '14 شارع مصطفى النحاس — مدينة نصر، القاهرة',
    bloodType: 'O+',
    allergies: ['البنسلين'],
    diseases: ['الربو'],
    medications: ['Ventolin — بخاخ عند الضيق التنفسي'],
    surgeries: ['لا توجد عمليات سابقة'],
    notes: 'حساسية شديدة من البنسلين — خطر صدمة تأقية (Anaphylaxis). استخدم بدائل الماكrolيد بعد مراجعة الحساسية. يحمل بخاخ Ventolin دائمًا.',
    emergencyContact: { name: 'محمد أحمد عبدالله', relation: 'الأخ', phone: '01000000000' },
    status: 'active',
    createdAt: '2026-01-10T10:00:00'
  };

  function read(k) { try { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function remove(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function saveCitizen(c) { c.updatedAt = new Date().toISOString(); write(KEY, c); return c; }

  function getCitizen() { return read(KEY) || saveCitizen(JSON.parse(JSON.stringify(DEMO))); }

  function updateCitizen(patch) {
    var c = getCitizen();
    Object.assign(c, patch);
    if (patch.emergencyContact) Object.assign(c.emergencyContact, patch.emergencyContact);
    return saveCitizen(c);
  }

  function clearCitizen() { remove(KEY); }

  function genId() {
    return 'HC-' + new Date().getFullYear() + '-' + String(Math.floor(100000 + Math.random() * 900000));
  }

  /* نسبة اكتمال الملف — تُستخدم في لوحة المواطن */
  function completion(c) {
    var ec = c.emergencyContact || {};
    var checks = [c.name, c.nid, c.birthDate, c.phone, c.address, c.bloodType,
      c.allergies && c.allergies.length, c.diseases && c.diseases.length,
      c.medications && c.medications.length, c.surgeries && c.surgeries.length,
      c.notes, ec.name, ec.phone];
    return Math.round(checks.filter(Boolean).length / checks.length * 100);
  }

  function getDraft() { return read(DRAFT); }
  function saveDraft(d) { write(DRAFT, d); }
  function clearDraft() { remove(DRAFT); }

  function getSettings() {
    return Object.assign({ privacyNotes:true, privacyPhone:true, offline:true,
      notifyReview:true, notifyStatus:true, lang:'ar' }, read(SET) || {});
  }
  function saveSettings(s) { write(SET, s); }

  return { getCitizen, saveCitizen, updateCitizen, clearCitizen, genId, completion,
           getDraft, saveDraft, clearDraft, getSettings, saveSettings, DEMO };
})();