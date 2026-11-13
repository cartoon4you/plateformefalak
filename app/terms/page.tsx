'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, FileText, AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { lang, isRTL, t } = useLanguage();

  const content = {
    ar: {
      badge: 'اتفاقية قانونية ملزمة للمستخدمين والزوار',
      title: 'شروط واتفاقية الاستخدام',
      desc: 'مرحباً بك في منصة فلك (Falak TV). بدخولك أو استخدامك لموقعنا وخدماتنا الرقمية، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام الكامل بهذه الشروط والأحكام.',
      sec1_title: '1. قبول الشروط والأهلية القانونية',
      sec1_text: 'باستخدامك لمنصة فلك، فإنك تقر وتضمن أنك تبلغ من العمر 13 عاماً على الأقل، وأنك تمتلك الأهلية القانونية الكاملة للدخول في هذه الاتفاقية. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى الامتناع عن استخدام المنصة.',
      sec2_title: '2. حقوق الملكية الفكرية وإشعار إخلاء المسؤولية وDMCA',
      sec2_text: 'تعمل منصة فلك كمحرك استكشاف وبحث وتنسيق معلوماتي للوسائط. جميع ملفات الوسائط والروابط المعروضة عبر الموقع مفهرسة تلقائياً من مصادر عامة متاحة عبر الإنترنت، ولا تقوم المنصة باستضافة أو تخزين أو رفع أي ملفات وسائط محمية على خوادمها الخاصة. للإبلاغ عن أي انتهاك، يرجى التواصل فوراً عبر صفحة اتصل بنا وسيتم حجب الرابط خلال 48 ساعة.',
      sec3_title: '3. الاستخدام المقبول والمحظورات',
      sec3_text: 'يوافق المستخدم على استخدام الموقع للأغراض الشخصية المشروعة فقط، ويحظر محاولة اختراق الخوادم أو الكشط التلقائي المفرط أو التلاعب الاحتيالي بنظام إعلانات Google AdSense.',
      sec4_title: '4. إعلانات الأطراف الثالثة والروابط الخارجية',
      sec4_text: 'تعرض المنصة إعلانات موثوقة من شبكة Google AdSense لدعم استمرار الخدمة مجاناً للمستخدمين. تخضع تفاعلاتك مع المعلنين لسياساتهم وشروطهم الخاصة.',
      sec5_title: '5. إخلاء المسؤولية وحدود الضمان',
      sec5_text: 'تُقدم المنصة وخدماتها على أساس "كما هي" دون أي ضمانات صريحة أو ضمنية من أي نوع، ولا نضمن عدم انقطاع الخدمة بسبب أعطال الشبكات العالمية.',
      sec6_title: '6. تعديل الشروط والاتفاقيات',
      sec6_text: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت، ويعتبر استمرارك في استخدام الموقع بعد التعديلات موافقة صريحة عليها.',
    },
    en: {
      badge: 'Legally Binding Agreement for Visitors and Users',
      title: 'Terms of Service & User Agreement',
      desc: 'Welcome to Falak TV. By accessing or using our website and services, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.',
      sec1_title: '1. Acceptance of Terms & Eligibility',
      sec1_text: 'By using Falak TV, you warrant that you are at least 13 years old and possess full legal capacity to enter into this agreement. If you do not agree with any provision, please discontinue using the platform.',
      sec2_title: '2. Intellectual Property, Disclaimer & DMCA Notice',
      sec2_text: 'Falak TV functions as an exploratory discovery engine and metadata indexer. All video links and media data displayed are aggregated automatically from publicly available internet sources. Falak TV does not host, upload, or store copyright video files on its servers. For takedown requests, contact us for prompt 48h removal.',
      sec3_title: '3. Acceptable Use & Prohibitions',
      sec3_text: 'You agree to use our services exclusively for lawful, personal purposes. Unauthorized scraping, attempts to interfere with server infrastructure, or fraudulent manipulation of Google AdSense ads are strictly prohibited.',
      sec4_title: '4. Third-Party Links & Google AdSense Advertising',
      sec4_text: 'We feature verified advertisements from Google AdSense to fund high-performance infrastructure and maintain free access. Interactions with third-party advertisers are subject to their respective terms and policies.',
      sec5_title: '5. Warranty Disclaimer & Limitation of Liability',
      sec5_text: 'Our services are provided on an "as is" and "as available" basis without warranties of any kind. Falak TV shall not be liable for incidental interruptions resulting from global routing or maintenance.',
      sec6_title: '6. Modifications to Terms',
      sec6_text: 'We reserve the right to revise these Terms at any time. Your continued use of the platform constitutes explicit acceptance of any modifications.',
    },
    fr: {
      badge: 'Accord Légal pour les Utilisateurs et Visiteurs',
      title: 'Conditions Générales d’Utilisation',
      desc: 'Bienvenue sur Falak TV. En accédant à nos services, vous acceptez pleinement et sans réserve les présentes conditions d’utilisation.',
      sec1_title: '1. Acceptation des Conditions',
      sec1_text: 'Vous confirmez avoir au moins 13 ans et disposer de la capacité juridique pour contracter. Si vous êtes en désaccord avec ces conditions, veuillez cesser toute utilisation de la plateforme.',
      sec2_title: '2. Propriété Intellectuelle & Notification DMCA',
      sec2_text: 'Falak TV agit comme un indexeur d’informations. Tous les liens multimédias sont collectés automatiquement à partir de sources publiques en ligne. Falak TV n’héberge aucun fichier vidéo protégé sur ses serveurs.',
      sec3_title: '3. Utilisation Acceptable',
      sec3_text: 'L’utilisation du site est réservée à un cadre personnel et licite. Toute tentative de piratage ou manipulation frauduleuse des annonces Google AdSense est formellement interdite.',
      sec4_title: '4. Publicités Tierces & Google AdSense',
      sec4_text: 'Notre plateforme diffuse des annonces Google AdSense afin de financer ses coûts d’hébergement et garantir un accès gratuit.',
      sec5_title: '5. Limitation de Responsabilité',
      sec5_text: 'Le service est fourni "en l’état". Falak TV ne peut être tenu responsable des pannes ou interruptions de réseau.',
      sec6_title: '6. Modifications des Conditions',
      sec6_text: 'Nous nous réservons le droit de modifier les présentes conditions à tout moment. La poursuite de la navigation vaut acceptation des mises à jour.',
    },
    es: {
      badge: 'Acuerdo Legal para Usuarios y Visitantes',
      title: 'Términos y Condiciones de Uso',
      desc: 'Bienvenido a Falak TV. Al ingresar o utilizar nuestra plataforma, confirmas haber leído, comprendido y aceptado estos términos de servicio.',
      sec1_title: '1. Aceptación de Términos',
      sec1_text: 'Declaras tener al menos 13 años y capacidad legal suficiente para vincularte a este acuerdo. Si no estás de acuerdo, debes abstenerte de usar el sitio.',
      sec2_title: '2. Propiedad Intelectual y Aviso DMCA',
      sec2_text: 'Falak TV opera como un motor de búsqueda e índice de metadatos públicos. No alojamos ni almacenamos archivos protegidos en nuestros servidores. Para avisos de infracción, comunícate con nosotros para retirar el enlace en 48 horas.',
      sec3_title: '3. Uso Aceptable y Restricciones',
      sec3_text: 'El sitio debe ser utilizado únicamente con fines personales y legales. Queda prohibido el raspado indebido o la interacción fraudulenta con la publicidad de Google AdSense.',
      sec4_title: '4. Publicidad y Enlaces Externos',
      sec4_text: 'Mostramos publicidad de Google AdSense para sostener la infraestructura gratuita. Los tratos con anunciantes se rigen por sus propias políticas.',
      sec5_title: '5. Exención de Responsabilidad',
      sec5_text: 'Los servicios se brindan "tal cual" y "según disponibilidad" sin garantías de ningún tipo respecto a interrupciones técnicas.',
      sec6_title: '6. Actualización de Términos',
      sec6_text: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado implica la aceptación de los cambios.',
    },
    tr: {
      badge: 'Kullanıcılar İçin Bağlayıcı Yasal Sözleşme',
      title: 'Kullanım Koşulları ve Sözleşme',
      desc: 'Falak TV’ye hoş geldiniz. Platformumuzu kullanarak bu kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.',
      sec1_title: '1. Koşulların Kabulü',
      sec1_text: 'Falak TV’yi kullanarak en az 13 yaşında olduğunuzu ve yasal ehliyete sahip olduğunuzu onaylarsınız. Koşulları kabul etmiyorsanız lütfen siteyi kullanmayın.',
      sec2_title: '2. Fikri Mülkiyet ve DMCA Bildirimi',
      sec2_text: 'Falak TV, herkese açık internet kaynaklarından otomatik olarak veri toplayan bir indeksleme aracıdır. Sunucularımızda telif hakkıyla korunan video dosyaları depolanmaz. İhlal bildirimleri için lütfen bizimle iletişime geçin.',
      sec3_title: '3. Kabul Edilebilir Kullanım',
      sec3_text: 'Platform yalnızca yasal ve kişisel amaçlarla kullanılabilir. Otomatik kazıma veya Google AdSense reklamlarına yönelik hileli eylemler kesinlikle yasaktır.',
      sec4_title: '4. Üçüncü Taraf Reklamları ve Google AdSense',
      sec4_text: 'Ücretsiz hizmet sunabilmek için Google AdSense reklamları yayınlanmaktadır. Reklam verenlerle olan etkileşimler kendi politikalarına tabidir.',
      sec5_title: '5. Sorumluluk Reddi',
      sec5_text: 'Hizmetler "olduğu gibi" sunulur; olası teknik kesintilerden veya harici sunucu hatalarından Falak TV sorumlu tutulamaz.',
      sec6_title: '6. Koşulların Değiştirilmesi',
      sec6_text: 'Bu koşulları dilediğimiz zaman güncelleme hakkını saklı tutarız. Sitenin kullanımına devam edilmesi güncellemelerin kabulü anlamına gelir.',
    },
  };

  const c = content[lang] || content.ar;

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header with working language switcher */}
      <Header />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-[#13151f] to-[#07080b] border-b border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {c.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {c.desc}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <AdBanner slot="2915749612" label="Google AdSense" className="mb-10" />

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-300">
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span>{c.sec1_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec1_text}</p>
          </div>

          <div className="bg-[#0e1017] border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>{c.sec2_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec2_text}</p>
            <div className="mt-3">
              <Link href="/contact" className="text-red-400 hover:text-red-300 underline font-semibold text-xs sm:text-sm">
                {t('nav_contact') || 'Contact Us / اتصل بنا'}
              </Link>
            </div>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>{c.sec3_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec3_text}</p>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              <span>{c.sec4_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec4_text}</p>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{c.sec5_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec5_text}</p>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-rose-400" />
              <span>{c.sec6_title}</span>
            </h2>
            <p className="leading-relaxed">{c.sec6_text}</p>
          </div>
        </div>

        <AdBanner slot="2915749613" label="Google AdSense" className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
