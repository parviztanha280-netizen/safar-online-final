# سفر آنلاین | Safar Online

پروژه سه اپ مستقل برای سرویس سفر آنلاین افغانستان:

- Passenger: `com.safaronline.app.passenger`
- Driver: `com.safaronline.app.driver`
- Admin: `com.safaronline.app.admin`

## وضعیت این نسخه
این نسخه هسته آنلاین سفر را با Firestore REST پیاده می‌کند:

`مسافر درخواست می‌دهد → راننده آنلاین درخواست را می‌بیند → قبول → شروع → پایان → مدیریت مشاهده می‌کند`

امکانات تکمیل‌شده در این بسته:
- برند و لوگوی یکپارچه «سفر آنلاین»
- ثبت درخواست سفر در Firestore
- پیگیری زنده وضعیت سفر از سمت مسافر
- لغو درخواست قبل از قبول
- ثبت مشخصات راننده و خودرو و پلاک
- آنلاین/آفلاین شدن راننده
- دریافت و قبول سفر
- شروع و پایان سفر
- نمایش سفر فعال
- محاسبه ساده درآمد سفرهای تکمیل‌شده
- پنل مدیریت و آمار سفرها
- تأیید/لغو تأیید رانندگان
- Workflow ساخت سه APK مستقل در GitHub Actions

## Firebase
Project ID: `safaronline`
Bucket: `safaronline.firebasestorage.app`

### نکته امنیتی مهم
این نسخه برای هسته MVP از Firestore REST و کلید API کلاینت استفاده می‌کند و `firebase/firestore.rules` فعلاً permissive است تا APKهای فعلی بدون Firebase Auth کار کنند. **برای انتشار عمومی نهایی باید Firebase Authentication و قوانین role-based فعال شوند.**

## ساخت APK
Workflow:
`.github/workflows/build-apks.yml`

با اجرای دستی Workflow سه artifact جداگانه ساخته می‌شود:
- `safar-online-passenger-apk`
- `safar-online-driver-apk`
- `safar-online-admin-apk`


## Release-candidate hardening
- Duplicate map markup/scripts removed.
- New drivers start unverified; they must be approved by Admin before going online.
- Driver ride acceptance checks the current ride state and uses a Firestore update-time precondition to reduce double-accept races.
- Production rules requiring authenticated users are included in `firebase/firestore.rules`.

### One unavoidable Firebase account action
Before public launch, enable Firebase Authentication (Anonymous or your chosen provider) and deploy `firebase/firestore.rules`. The source is prepared for this, but an assistant cannot change security settings inside your private Firebase account without your authorization/access.


## آخرین مرحله لازم در Firebase
این نسخه دیگر localStorage به‌عنوان دیتابیس سفر استفاده نمی‌کند و هر سه اپ برای Firestore توکن Firebase Authentication می‌گیرند. برای فعال شدن ورود ناشناس، در Firebase Console پروژه `safaronline` بخش Authentication را باز کنید، Sign-in method را باز کنید و **Anonymous** را Enable کنید. بعد APKهای این بسته را نصب کنید.

نکته امنیتی: قوانین این نسخه برای راه‌اندازی سریع MVP روی کاربران واردشده باز هستند؛ قبل از انتشار عمومی باید قوانین را محدود و احراز هویت مدیر را جداگانه سخت‌گیرانه کرد.
