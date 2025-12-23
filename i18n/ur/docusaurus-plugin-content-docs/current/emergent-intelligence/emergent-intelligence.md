---
title: ابھرتی ہوئی ذہانت
---

# ابھرتی ہوئی ذہانت: سادہ اصولوں سے پیچیدہ سلوک

## جسمانی انٹیویشن ( "کیوں")

فزیکل ای آئی میں ابھرتی ہوئی ذہانت ان پیچیدہ سلوک کو حوالہ دیتی ہے جو سادہ اجزاء اور ماحولیاتی فیڈ بیک کے تعامل سے پیدا ہوتے ہیں، بجائے کے صرف پروگرام کیے گئے ہوں۔ روایتی ای آئی کے برعکس جو اعلیٰ سطح کے استدلال اور منصوبہ بندی پر انحصار کرتی ہے، ابھرتی ہوئی ذہانت جسمانی نظاموں میں حس، ایکٹوایشن، کنٹرول، اور ماحولیاتی تعامل کے تنگ جوڑ سے پیدا ہوتی ہے۔

یہ نقطہ نظر ہیومنوائڈ روبوٹکس میں خاص طور پر طاقتور ہے کیونکہ یہ روبوٹس کو موافق، مضبوط سلوک کا مظاہرہ کرنے کے قابل بناتا ہے جو حقیقی دنیا کی پیچیدگیوں کا جواب دے سکتے ہیں جن کی ا anticipate کرنا اور صرف پروگرام کرنا مشکل ہے۔ ذہانت واقعی روبوٹ کے اپنے ماحول کے ساتھ جسمانی تعامل سے ابھرتی ہے۔

## کمپوننٹ ( "کیا")

جسمانی نظاموں میں ابھرتی ہوئی ذہانت میں شامل ہے:

- **ری ایکٹو سلوک**: سادہ محرک-جواب کے نمونے جو پیچیدہ سلوک کے لیے عمارت کے بلاکس بناتے ہیں
- **ڈائنامیکل سسٹم**: ریاضی کے چوکٹ جو وضاحت کرتے ہیں کہ وقت کے ساتھ نظام کی حالت کیسے تبدیل ہوتی ہے
- **بیہیویورل پریمیٹیوز**: بنیادی موٹر نمونے جن کو ملانا اور ترتیب دینا ممکن ہے
- **ایڈاپٹو مکینزم**: نظام جو تجربے اور ماحولیاتی فیڈ بیک کی بنیاد پر سلوک کو تبدیل کرتے ہیں
- **خود منظم عمل**: مکینزم جو واضح کنٹرول کے بغیر ترتیب اور ساخت پیدا کرتے ہیں

یہ اجزاء ایک دوسرے کے ساتھ تعامل کرتے ہیں تاکہ پیچیدہ سلوک پیدا کیا جا سکے جو ان کے اجزاء کا مجموعہ سے زیادہ ہوں۔

## کنٹرول لاگک ( "کیسے")

```js
// مثال: سادہ بیہیویورل اربٹریشن سسٹم
class BehaviorArbiter {
  constructor() {
    this.behaviors = [];
  }

  addBehavior(behavior, priority) {
    this.behaviors.push({ behavior, priority });
  }

  execute(sensors) {
    // ترجیح کے لحاظ سے بیہیویرز کو ترتیب دیں
    this.behaviors.sort((a, b) => b.priority - a.priority);

    // سب سے زیادہ ترجیح والے فعال بیہیویور کو انجام دیں
    for (const { behavior } of this.behaviors) {
      if (behavior.isActive(sensors)) {
        return behavior.execute(sensors);
      }
    }

    // اگر کوئی بیہیویورز فعال نہ ہوں تو ڈیفالٹ لوٹائیں
    return this.defaultBehavior(sensors);
  }
}

// مثال: سادہ ریفلیکس بیسڈ چلنے کا نمونہ
function walkingPattern(sensors) {
  // بائی پیڈل چلنے کے لیے سادہ اسٹیٹ مشین
  const leftFootContact = sensors.leftFoot.force > THRESHOLD;
  const rightFootContact = sensors.rightFoot.force > THRESHOLD;
  const bodyOrientation = sensors.imu.orientation;

  if (leftFootContact && !rightFootContact) {
    // دائیں ٹانگ کا سوئنگ فیز
    return {
      leftHip: STANCE_POSITION,
      rightHip: SWING_POSITION,
      bodyLean: correctForBalance(bodyOrientation)
    };
  } else if (rightFootContact && !leftFootContact) {
    // بائیں ٹانگ کا سوئنگ فیز
    return {
      rightHip: STANCE_POSITION,
      leftHip: SWING_POSITION,
      bodyLean: correctForBalance(bodyOrientation)
    };
  } else {
    // ڈبل سپورٹ فیز یا ٹرانزیشن
    return maintainBalance(sensors);
  }
}

// مثال: تعامل سے ایڈاپٹو لرننگ
class AdaptiveController {
  constructor() {
    this.parameters = {
      stiffness: INITIAL_STIFFNESS,
      damping: INITIAL_DAMPING,
      gain: INITIAL_GAIN
    };
    this.performanceHistory = [];
  }

  adapt(sensors, performance) {
    this.performanceHistory.push(performance);

    // کارکردگی کے فیڈ بیک کی بنیاد پر پیرامیٹرز کو اپ ڈیٹ کریں
    if (performance.error > ERROR_THRESHOLD) {
      this.parameters.stiffness *= 0.9; // اگر بہت زیادہ حملہ آور ہو تو سٹفنس کم کریں
    } else if (performance.stability > STABILITY_THRESHOLD) {
      this.parameters.stiffness *= 1.1; // اگر بہت مطیع ہو تو سٹفنس بڑھائیں
    }

    return this.parameters;
  }
}
```

کنٹرول لاگک سادہ، ری ایکٹو اصول نافذ کرتا ہے جو تعامل کر سکتے ہیں اور پیچیدہ، موافق سلوک پیدا کرنے کے لیے مل سکتے ہیں جو روبوٹ کے اس کے ماحول کے ساتھ تعامل سے ابھرتے ہیں۔

## سیمولیشن کا نتیجہ ( "نتیجہ")

ابھرتی ہوئی ذہانت والے نظام یہ مظاہرہ کر سکتے ہیں:

- موافق سلوک جو ماحولیاتی تبدیلیوں کا جواب دیتے ہیں بغیر واضح طور پر دوبارہ پروگرام کیے
- مضبوط کارکردگی جو جاری رہتی ہے یہاں تک کہ جب انفرادی اجزاء ناکام ہو جائیں
- تخلیقی حل جو سادہ اصولوں کے تعامل سے پیدا ہوتے ہیں
- زندہ نما سلوک جو ذہیہ نظر آتے ہیں بغیر پیچیدہ منصوبہ بندی والے الگورتھم کے

یہ ظاہر کرتا ہے کہ ذہانت کیسے قدرتی طور پر روبوٹک نظاموں کے جسمانی وجود اور ماحولیاتی تعامل سے ابھر سکتی ہے، زیادہ پیچیدہ شعوری صلاحیتوں کے لیے ایک بنیاد فراہم کرتے ہوئے۔