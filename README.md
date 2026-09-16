# SawtChat Backend

## التشغيل
1. ثبت Node.js 20+.
2. نفذ:
```bash
npm install
```
3. انسخ `.env.example` إلى `.env`.
4. ضع API Key وAPI Secret من LiveKit داخل `.env`.
5. شغل:
```bash
npm start
```

لا تضع API Secret داخل تطبيق Flutter ولا ترفعه إلى GitHub.

قبل الإنتاج يجب إضافة مصادقة حقيقية، تحديد صلاحيات المستخدم، Rate limiting، والتحقق من ملكية الغرف.
