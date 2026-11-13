'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, CheckCircle2, ChevronLeft, Globe, Cookie, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { lang, isRTL, t } = useLanguage();

  const content = {
    ar: {
      badge: 'وثيقة قانونية معتمدة ومحدثة لعام 2026',
      title: 'سياسة الخصوصية وملفات تعريف الارتباط',
      desc: 'نحن في منصة فلك (Falak TV) نضع حماية خصوصيتك وأمان بياناتك الرقمية في مقدمة أولوياتنا. توضح هذه الوثيقة بوضوح وشفافية كيفية جمع واستخدام وحماية معلوماتك عند زيارة واستخدام موقعنا.',
      sec1_title: '1. المعلومات التي نقوم بجمعها (Log Files)',
      sec1_text: 'مثل معظم المواقع الإلكترونية، تطبق منصة فلك نظاماً قياسياً لسجلات الخادم (Log Files). تتضمن المعلومات عنوان IP، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طوابع التاريخ والوقت، وصفحات الإحالة لتحليل الأداء وإدارة الموقع دون ربطها بهويتك الشخصية.',
      sec2_title: '2. ملفات تعريف الارتباط (Cookies) وشبكة إعلانات Google AdSense',
      sec2_text: 'نستخدم ملفات الكوكيز لتخزين تفضيلات الزوار (مثل اللغة المفضلة وسجل المشاهدة). كما تعد Google مورداً خارجياً يستخدم ملفات تعريف الارتباط مثل DART لعرض الإعلانات للمستخدمين استناداً إلى زيارتهم لهذا الموقع ومواقع أخرى على الإنترنت.',
      sec2_box_title: 'إشعار جوجل أدسنس وملف تعريف الارتباط DART (Google DoubleClick DART Cookie):',
      sec2_box_text: 'يمكن للمستخدمين إلغاء الاشتراك في استخدام ملف تعريف الارتباط DART والإعلانات المخصصة عبر زيارة سياسة خصوصية شبكة إعلانات Google ومحتواها على الرابط الرسمي:',
      sec3_title: '3. كيفية تعطيل ملفات تعريف الارتباط وخيارات المستخدم',
      sec3_text: 'يمكنك اختيار تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك (Chrome, Safari, Firefox, Edge). كما يمكنك زيارة موقع www.aboutads.info/choices لإلغاء الاشتراك في ملفات تعريف ارتباط شبكات الإعلانات التابعة لجهات خارجية.',
      sec4_title: '4. حماية خصوصية الأطفال (COPPA Compliance)',
      sec4_text: 'من أولوياتنا توفير حماية إضافية للأطفال. لا نقوم بجمع أي معلومات تعريف شخصية عن عمد من أطفال دون سن 13 عاماً، ونلتزم بالإزالة الفورية لأي بيانات يتم إشعارنا بها.',
      sec5_title: '5. الروابط الخارجية ومواقع الطرف الثالث',
      sec5_text: 'قد يحتوي موقعنا على روابط لمواقع خارجية. يرجى العلم بأننا لسنا مسؤولين عن ممارسات الخصوصية لتلك المواقع ونحثكم على مراجعة سياساتها الخاصة.',
      contact_box_title: 'هل لديك أي استفسار حول سياسة الخصوصية؟',
      contact_box_desc: 'فريقنا متاح للإجابة على جميع تساؤلاتك ومساعدتك في إدارة بياناتك.',
      contact_box_btn: 'تواصل مع فريق الدعم',
    },
    en: {
      badge: 'Official & Updated Legal Document for 2026',
      title: 'Privacy Policy & Cookie Disclosures',
      desc: 'At Falak TV, safeguarding your personal privacy and digital security is our utmost priority. This document outlines clearly and transparently how data is collected, utilized, and protected across our platform.',
      sec1_title: '1. Information We Collect (Log Files)',
      sec1_text: 'Like most web platforms, Falak TV utilizes standard log files. Information logged includes IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, and referring/exit pages for analytics and security, without linking to personally identifiable names.',
      sec2_title: '2. Cookies & Google AdSense Advertising Network',
      sec2_text: 'We use cookies to store visitor preferences (such as selected language and continue-watching state). Furthermore, Google is a third-party vendor that uses cookies, including the DoubleClick DART cookie, to serve advertisements to users based on their visits to this and other websites.',
      sec2_box_title: 'Google AdSense & DoubleClick DART Cookie Disclosure:',
      sec2_box_text: 'Users may opt out of personalized advertising and the use of the DART cookie at any time by visiting the official Google Ads & Privacy Settings page:',
      sec3_title: '3. Disabling Cookies & User Choices',
      sec3_text: 'You can disable cookies through your browser settings (Chrome, Safari, Firefox, Edge). Additionally, you can visit www.aboutads.info/choices to opt out of third-party advertising cookies.',
      sec4_title: '4. Children’s Online Privacy Protection (COPPA)',
      sec4_text: 'Protecting children’s privacy online is paramount. Falak TV does not knowingly collect any personally identifiable information from children under the age of 13.',
      sec5_title: '5. External Links & Third Parties',
      sec5_text: 'Our platform may contain links to external sites. We are not responsible for the privacy practices or content of third-party websites.',
      contact_box_title: 'Have questions regarding our Privacy Policy?',
      contact_box_desc: 'Our legal and support team is here to assist with any questions or data management requests.',
      contact_box_btn: 'Contact Support Team',
    },
    fr: {
      badge: 'Document Légal Officiel Mis à Jour pour 2026',
      title: 'Politique de Confidentialité et Cookies',
      desc: 'Chez Falak TV, la protection de votre vie privée est une priorité absolue. Cette politique explique comment vos données sont collectées, utilisées et protégées sur notre plateforme.',
      sec1_title: '1. Données Collectées (Fichiers Journaux)',
      sec1_text: 'Falak TV utilise des fichiers journaux standard (adresse IP, type de navigateur, FAI, horodatage) à des fins de maintenance et d’analyse statistique sans identification nominative.',
      sec2_title: '2. Cookies et Réseau Publicitaire Google AdSense',
      sec2_text: 'Nous utilisons des cookies pour mémoriser vos préférences (langue, reprise de lecture). Google, en tant que fournisseur tiers, utilise des cookies (dont DART) pour diffuser des annonces pertinentes basées sur votre navigation.',
      sec2_box_title: 'Avis Google AdSense et Cookie DoubleClick DART :',
      sec2_box_text: 'Les utilisateurs peuvent désactiver les annonces personnalisées et le cookie DART en consultant les paramètres officiels des annonces Google :',
      sec3_title: '3. Gestion et Désactivation des Cookies',
      sec3_text: 'Vous pouvez désactiver les cookies via les paramètres de votre navigateur web ou sur www.aboutads.info/choices.',
      sec4_title: '4. Protection des Mineurs (COPPA)',
      sec4_text: 'Falak TV ne collecte sciemment aucune donnée personnelle auprès d’enfants de moins de 13 ans.',
      sec5_title: '5. Liens Externes',
      sec5_text: 'Notre site peut renvoyer vers des sites tiers dont nous ne maîtrisons pas les politiques de confidentialité.',
      contact_box_title: 'Une question sur notre politique de confidentialité ?',
      contact_box_desc: 'Notre équipe est à votre disposition pour vous répondre.',
      contact_box_btn: 'Contacter le Support',
    },
    es: {
      badge: 'Documento Legal Oficial Actualizado para 2026',
      title: 'Política de Privacidad y Cookies',
      desc: 'En Falak TV, la privacidad de nuestros usuarios es primordial. Este documento detalla la recopilación, uso y resguardo de la información al navegar en nuestro sitio.',
      sec1_title: '1. Archivos de Registro (Log Files)',
      sec1_text: 'Recopilamos registros estándar de servidor (dirección IP, navegador, ISP, fecha/hora) para supervisión técnica y analítica sin asociarlos a identidades personales.',
      sec2_title: '2. Cookies y Red Publicitaria Google AdSense',
      sec2_text: 'Las cookies almacenan preferencias como el idioma. Google, como proveedor externo, utiliza cookies como DART para mostrar anuncios personalizados basados en visitas a este y otros sitios.',
      sec2_box_title: 'Aviso sobre Google AdSense y Cookie DART:',
      sec2_box_text: 'Puedes inhabilitar la cookie DART y los anuncios personalizados visitando la configuración oficial de Google Ads:',
      sec3_title: '3. Opciones de Usuario y Desactivación de Cookies',
      sec3_text: 'Puedes deshabilitar cookies en la configuración de tu navegador o a través de www.aboutads.info/choices.',
      sec4_title: '4. Protección de Menores (COPPA)',
      sec4_text: 'Falak TV no recopila a sabiendas información de menores de 13 años y atiende cualquier notificación de inmediato.',
      sec5_title: '5. Enlaces a Terceros',
      sec5_text: 'No somos responsables de las políticas o prácticas de privacidad de sitios externos enlazados.',
      contact_box_title: '¿Tienes dudas sobre nuestra política de privacidad?',
      contact_box_desc: 'Nuestro equipo de soporte está disponible para responderte.',
      contact_box_btn: 'Contactar Soporte',
    },
    tr: {
      badge: '2026 Yılı Resmi ve Güncel Yasal Belgesi',
      title: 'Gizlilik Politikası ve Çerez Bildirimi',
      desc: 'Falak TV olarak gizliliğinizi ve dijital güvenliğinizi korumak en temel önceliğimizdir. Bu metin, verilerin nasıl toplandığını ve korunduğunu açıklar.',
      sec1_title: '1. Toplanan Bilgiler (Günlük Dosyaları)',
      sec1_text: 'Falak TV standart sunucu günlükleri (IP adresi, tarayıcı türü, İSS, tarih/saat) tutar; bu veriler kişisel kimliklerle ilişkilendirilmez.',
      sec2_title: '2. Çerezler ve Google AdSense Reklam Ağı',
      sec2_text: 'Çerezleri dil ve izleme tercihlerinizi saklamak için kullanırız. Google, DART çerezleri gibi teknolojilerle kullanıcılara ilgi alanlarına göre reklam sunar.',
      sec2_box_title: 'Google AdSense ve DoubleClick DART Çerez Bildirimi:',
      sec2_box_text: 'Kullanıcılar Google Reklam Ayarları sayfasını ziyaret ederek kişiselleştirilmiş reklamları diledikleri zaman devre dışı bırakabilirler:',
      sec3_title: '3. Çerezleri Devre Dışı Bırakma Seçenekleri',
      sec3_text: 'Çerezleri tarayıcı ayarlarınızdan kapatabilir veya www.aboutads.info/choices adresinden üçüncü taraf çerezlerini yönetebilirsiniz.',
      sec4_title: '4. Çocukların Gizliliğinin Korunması (COPPA)',
      sec4_text: 'Falak TV, 13 yaşından küçük çocuklardan bilerek hiçbir kişisel bilgi toplamaz.',
      sec5_title: '5. Harici Bağlantılar',
      sec5_text: 'Platformumuzda yer alan üçüncü taraf web sitelerinin gizlilik uygulamalarından sorumlu değiliz.',
      contact_box_title: 'Gizlilik politikamızla ilgili bir sorunuz mu var?',
      contact_box_desc: 'Ekibimiz sorularınızı yanıtlamak ve size yardımcı olmak için buradadır.',
      contact_box_btn: 'Destek Ekibiyle İletişim',
    },
  };

  const c = content[lang] || content.ar;

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header with working language switcher */}
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-[#13151f] to-[#07080b] border-b border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-4">
            <Lock className="w-3.5 h-3.5" />
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <AdBanner slot="2915749610" label="Google AdSense" className="mb-10" />

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-gray-300">
          {/* Section 1 */}
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-red-500" />
              <span>{c.sec1_title}</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.sec1_text}</p>
          </div>

          {/* Section 2: Cookies & Google AdSense */}
          <div className="bg-[#0e1017] border border-red-500/20 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-amber-400" />
              <span>{c.sec2_title}</span>
            </h2>
            <p className="mb-3 leading-relaxed">{c.sec2_text}</p>

            <div className="my-4 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{c.sec2_box_title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {c.sec2_box_text}
              </p>
              <div className="pt-1">
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 underline underline-offset-4"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>https://policies.google.com/technologies/ads</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 3: Opt-Out & User Rights */}
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>{c.sec3_title}</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.sec3_text}</p>
          </div>

          {/* Section 4: Privacy of Minors */}
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>{c.sec4_title}</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.sec4_text}</p>
          </div>

          {/* Section 5: External Links */}
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>{c.sec5_title}</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.sec5_text}</p>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-r from-red-950/40 via-[#13151f] to-[#0e1017] border border-red-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{c.contact_box_title}</h2>
              <p className="text-sm text-gray-400">{c.contact_box_desc}</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-600/30 transition shrink-0"
            >
              {c.contact_box_btn}
            </Link>
          </div>
        </div>

        <AdBanner slot="2915749611" label="Google AdSense" className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
