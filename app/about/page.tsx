'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Sparkles, Tv, Shield, Users, Award, Play, CheckCircle2, HeartHandshake, Eye, Flame } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { lang, isRTL, t } = useLanguage();

  const content = {
    ar: {
      badge: 'السينما كما يجب أن تكون — نقاء وإبداع بلا حدود',
      hero_title_1: 'نحن نصنع وجهة الترفيه',
      hero_title_highlight: 'الأكثر تطوراً',
      hero_title_2: 'في الوطن العربي',
      hero_desc: 'انطلقت منصة فلك (Falak TV) برؤية واضحة: الارتقاء بتجربة الترفيه الرقمي وتقديم منصة سينمائية سريعة، ذكية، ومتوافقة مع أعلى معايير العرض العالمية، مصحوبة بدعم متكامل للترجمة العربية والتحليلات النقدية الموثوقة.',
      card1_title: 'جودة سينمائية فائقة 4K',
      card1_desc: 'ندعم أحدث بروتوكولات الفيديو عالية الدقة مع ترميزات HEVC و AV1 لتجربة سينمائية نقية وسلسة حتى مع الاتصالات المنزلية المتوسطة.',
      card2_title: 'ترجمة ذكية وتزامن فوري',
      card2_desc: 'تقنية ترجمة ذكية متطورة تتعرف على ملفات الفيديو وتجلب الترجمة المعتمدة المتطابقة زمنياً مع إمكانية ضبط التوقيت والخطوط والألوان.',
      card3_title: 'واجهة آمنة ونظيفة',
      card3_desc: 'تصميم خالٍ من النوافذ المنبثقة المزعجة والبرمجيات الخبيثة، مع احترام صارم لسياسات الخصوصية والامتثال التام لمتطلبات Google AdSense.',
      philosophy_title: 'فلسفتنا ورسالتنا التحريرية',
      philosophy_p1: 'في عصر تتزاحم فيه المنصات بالمحتوى العشوائي، قررنا في فلك TV أن نكون صوتاً للجودة. نحن لا نكتفي بعرض الروابط والبيانات الوصفية، بل يعمل فريقنا التحريري على فحص الأعمال، وصياغة ملخصات دقيقة، وتقديم مراجعات تحليلية تساعدك على اختيار الفيلم أو المسلسل المناسب.',
      philosophy_p2: 'نؤمن بأن الفن السينمائي هو أسمى أشكال التعبير الإنساني؛ ولذا نوفر قسماً مخصصاً للمقالات والأدلة التقنية والتحليلية يغطي جوانب الإخراج، هندسة الصوت، وضبط السينما المنزلية.',
      stat1: '+100k', stat1_label: 'عنوان مفهرس بدقة',
      stat2: '99.9%', stat2_label: 'استقرار خوادم التشغيل',
      stat3: '100%', stat3_label: 'دعم مجاني وترجمة ذكية',
      stat4: '24/7', stat4_label: 'تحديث دوري ومستمر',
      integrity_title: 'المعايير المهنية وحقوق الملكية الفكرية',
      integrity_p1: 'تلتزم منصة فلك باحترام حقوق الملكية الفكرية وتطبيق إرشادات الألفية الرقمية (DMCA). المنصة عبارة عن محرك بحث وفهرس استكشافي ينظم البيانات الوصفية المتاحة علناً عبر واجهات البرمجة العامة ومصادر الويب الخارجية دون استضافة ملفات محمية على خوادمنا.',
      cta_title: 'هل أنت مستعد للانطلاق في رحلة ترفيهية استثنائية؟',
      cta_desc: 'استكشف آلاف الأفلام والمسلسلات الحائزة على جوائز مع أحدث المقالات والدلائل السينمائية.',
      cta_btn: 'تصفح المنصة الآن',
      cta_contact: 'تواصل معنا',
    },
    en: {
      badge: 'Cinema as it should be — Pure, limitless creativity',
      hero_title_1: 'Building the most',
      hero_title_highlight: 'Advanced',
      hero_title_2: 'Entertainment Hub',
      hero_desc: 'Falak TV was founded with a singular vision: elevating digital entertainment with ultra-fast servers, smart automatic subtitles, and curated cinema guides conforming to top global broadcast standards.',
      card1_title: 'Ultra 4K/HDR Cinema Quality',
      card1_desc: 'Supporting cutting-edge adaptive streaming protocols with AV1 and HEVC compression for crystal-clear visuals even on standard home connections.',
      card2_title: 'Smart Subtitle Synchronization',
      card2_desc: 'Advanced matching engine that automatically aligns subtitles with precision frame timing and customizable typographic styling.',
      card3_title: 'Clean, Safe & AdSense Compliant',
      card3_desc: 'A pure user interface free from invasive popups, designed strictly around user privacy and Google AdSense transparency standards.',
      philosophy_title: 'Our Editorial Mission & Vision',
      philosophy_p1: 'In an era of cluttered media platforms, Falak TV stands for quality and curation. We do not just present video links; our editorial staff synthesizes rich metadata, synopsis breakdowns, and critical insights.',
      philosophy_p2: 'We believe cinema is an exceptional human art form. That is why we provide dedicated technology and film guides covering directing, acoustic engineering, and home theater setup.',
      stat1: '+100k', stat1_label: 'Indexed Titles',
      stat2: '99.9%', stat2_label: 'Server Uptime',
      stat3: '100%', stat3_label: 'Free & Subtitled',
      stat4: '24/7', stat4_label: 'Continuous Updates',
      integrity_title: 'Professional Standards & Intellectual Property',
      integrity_p1: 'Falak TV strictly respects intellectual property rights and adheres to the DMCA framework. Our platform operates as an indexer organizing publicly accessible metadata without hosting infringing files.',
      cta_title: 'Ready to embark on an exceptional cinematic journey?',
      cta_desc: 'Explore thousands of award-winning titles and discover our latest analytical film guides.',
      cta_btn: 'Browse Catalog Now',
      cta_contact: 'Contact Us',
    },
    fr: {
      badge: 'Le cinéma dans toute sa pureté — Créativité sans limites',
      hero_title_1: 'La destination cinéma la plus',
      hero_title_highlight: 'Innovante',
      hero_title_2: 'du web',
      hero_desc: 'Falak TV est né avec une ambition claire : sublimer le divertissement numérique avec des serveurs ultra-rapides, des sous-titres intelligents et des guides critiques fiables.',
      card1_title: 'Qualité Cinéma Ultra 4K/HDR',
      card1_desc: 'Prise en charge des codecs modernes HEVC et AV1 pour une image nette et fluide sur toutes les connexions.',
      card2_title: 'Sous-titrage Intelligent & Précis',
      card2_desc: 'Détection automatique et synchronisation temporelle fine avec options de personnalisation d’affichage.',
      card3_title: 'Interface Sécurisée & Conforme AdSense',
      card3_desc: 'Design moderne sans fenêtres intempestives, respectueux de votre vie privée et des standards Google AdSense.',
      philosophy_title: 'Notre Philosophie Éditoriale',
      philosophy_p1: 'Falak TV s’engage pour l’excellence du streaming et la richesse culturelle du 7ème art grâce à des fiches descriptives complètes et des analyses cinématographiques poussées.',
      philosophy_p2: 'Nous valorisons le cinéma comme forme d’art essentielle en proposant des dossiers complets sur la réalisation et le son multicanal.',
      stat1: '+100k', stat1_label: 'Titres Référencés',
      stat2: '99.9%', stat2_label: 'Disponibilité Serveurs',
      stat3: '100%', stat3_label: 'Accès Libre',
      stat4: '24/7', stat4_label: 'Mises à Jour Continues',
      integrity_title: 'Respect du Droit d’Auteur & DMCA',
      integrity_p1: 'Falak TV respecte scrupuleusement la propriété intellectuelle. Notre site fait office de moteur de recherche et n’héberge aucun fichier protégé sur ses serveurs.',
      cta_title: 'Prêt à vivre une expérience cinématographique unique ?',
      cta_desc: 'Explorez des milliers de films et séries primés dès aujourd’hui.',
      cta_btn: 'Explorer le Catalogue',
      cta_contact: 'Nous Contacter',
    },
    es: {
      badge: 'El cine como debe ser — Pureza y creatividad sin límites',
      hero_title_1: 'La plataforma de entretenimiento más',
      hero_title_highlight: 'Avanzada',
      hero_title_2: 'en la web',
      hero_desc: 'Falak TV nació con una visión clara: llevar el entretenimiento digital a su máxima expresión con servidores veloces, subtítulos inteligentes y reseñas analíticas de alta calidad.',
      card1_title: 'Calidad Cinematográfica 4K/HDR',
      card1_desc: 'Soporte para códecs avanzados AV1 y HEVC que garantizan máxima nitidez sin consumir datos excesivos.',
      card2_title: 'Subtítulos Inteligentes',
      card2_desc: 'Sincronización instantánea con codificación universal y ajuste de desfase milimétrico.',
      card3_title: 'Seguridad y Cumplimiento AdSense',
      card3_desc: 'Sin ventanas emergentes invasivas, respetando la privacidad del usuario y las normas de Google AdSense.',
      philosophy_title: 'Nuestra Misión y Filosofía',
      philosophy_p1: 'En Falak TV priorizamos el valor real sobre el contenido masivo, brindando sinopsis precisas y guías técnicas especializadas.',
      philosophy_p2: 'Creemos en el cine como una de las más bellas expresiones humanas, aportando guías de audio envolvente y fotografía.',
      stat1: '+100k', stat1_label: 'Títulos Indexados',
      stat2: '99.9%', stat2_label: 'Estabilidad de Servidores',
      stat3: '100%', stat3_label: 'Gratuito con Subtítulos',
      stat4: '24/7', stat4_label: 'Actualización Continua',
      integrity_title: 'Derechos de Autor y DMCA',
      integrity_p1: 'Falak TV respeta los derechos de propiedad intelectual y cumple con las normativas DMCA al actuar como índice de datos públicos.',
      cta_title: '¿Listo para disfrutar del mejor cine?',
      cta_desc: 'Descubre miles de películas y series galardonadas con guías analíticas.',
      cta_btn: 'Explorar Catálogo',
      cta_contact: 'Contáctanos',
    },
    tr: {
      badge: 'Sinema olması gerektiği gibi — Saf ve sınırsız yaratıcılık',
      hero_title_1: 'En gelişmiş ve yenilikçi',
      hero_title_highlight: 'Sinema Platformu',
      hero_title_2: '',
      hero_desc: 'Falak TV, hızlı sunucular, akıllı altyazı senkronizasyonu ve zengin sinema rehberleri ile dijital eğlence deneyimini zirveye taşımak için kuruldu.',
      card1_title: 'Ultra 4K/HDR Sinema Kalitesi',
      card1_desc: 'AV1 ve HEVC kodekleri ile standart bağlantılarda bile kristal netliğinde akıcı görüntü deneyimi.',
      card2_title: 'Akıllı Altyazı Eşitleme',
      card2_desc: 'Video dosyalarıyla birebir senkronize olan ve zamanlama ayarı sunan gelişmiş altyazı altyapısı.',
      card3_title: 'Güvenli ve AdSense Uyumlu',
      card3_desc: 'Kullanıcı dostu, can sıkıcı pencereler barındırmayan ve Google AdSense standartlarına tam uyumlu arayüz.',
      philosophy_title: 'Yayın ve İçerik Felsefemiz',
      philosophy_p1: 'Falak TV sadece bağlantı sunmakla kalmaz; zengin sinematik veriler, özetler ve derinlemesine film analizleri sağlar.',
      philosophy_p2: 'Sinemanın evrensel bir sanat olduğuna inanıyoruz ve ses mühendisliğinden ev sineması ayarlarına kadar detaylı rehberler sunuyoruz.',
      stat1: '+100k', stat1_label: 'İndekslenmiş İçerik',
      stat2: '99.9%', stat2_label: 'Sunucu Kararlılığı',
      stat3: '100%', stat3_label: 'Ücretsiz ve Altyazılı',
      stat4: '24/7', stat4_label: 'Sürekli Güncelleme',
      integrity_title: 'Telif Hakları ve DMCA Uyumu',
      integrity_p1: 'Falak TV telif haklarına saygı duyar ve DMCA kurallarını titizlikle uygular. Sunucularımızda video dosyası depolanmaz.',
      cta_title: 'Olağanüstü bir sinema yolculuğuna hazır mısınız?',
      cta_desc: 'Ödüllü binlerce filmi ve özel sinema rehberlerimizi şimdi keşfedin.',
      cta_btn: 'Kataloğa Göz At',
      cta_contact: 'İletişime Geç',
    },
  };

  const c = content[lang] || content.ar;

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header with working language switcher */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-[#13151f] via-[#0b0c12] to-[#07080b] border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold mb-5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {c.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              {c.hero_title_highlight}
            </span>{' '}
            {c.hero_title_2}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {c.hero_desc}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 py-12 flex-1">
        {/* AdSense Top Ad Slot */}
        <AdBanner slot="2915749614" label="Google AdSense" className="mb-12" />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-red-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 text-red-400 border border-red-500/20 flex items-center justify-center mb-5">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{c.card1_title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.card1_desc}</p>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{c.card2_title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.card2_desc}</p>
          </div>

          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{c.card3_title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.card3_desc}</p>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="space-y-12">
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
              <Award className="w-6 h-6 text-red-500" />
              <span>{c.philosophy_title}</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>{c.philosophy_p1}</p>
              <p>{c.philosophy_p2}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono">{c.stat1}</div>
                <div className="text-xs text-gray-400 mt-1">{c.stat1_label}</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{c.stat2}</div>
                <div className="text-xs text-gray-400 mt-1">{c.stat2_label}</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{c.stat3}</div>
                <div className="text-xs text-gray-400 mt-1">{c.stat3_label}</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">{c.stat4}</div>
                <div className="text-xs text-gray-400 mt-1">{c.stat4_label}</div>
              </div>
            </div>
          </div>

          {/* Standards & DMCA */}
          <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-purple-400" />
              <span>{c.integrity_title}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {c.integrity_p1}
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-red-950/60 via-[#13151f] to-[#0e1017] border border-red-500/30 rounded-3xl p-8 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{c.cta_title}</h3>
              <p className="text-sm text-gray-400">{c.cta_desc}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-600/30 transition flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>{c.cta_btn}</span>
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-2xl border border-white/10 transition"
              >
                {c.cta_contact}
              </Link>
            </div>
          </div>
        </div>

        <AdBanner slot="2915749615" label="Google AdSense" className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
