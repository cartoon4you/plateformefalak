'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, Tag, Film, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogIndexPage() {
  const { lang, isRTL, t } = useLanguage();

  const headings = {
    ar: {
      badge: 'مقالات أصلية وتحليلات بصرية موثوقة',
      title: 'مدونة فلك السينمائية والأدلة التقنية',
      desc: 'محتوى تحريري أصيل كُتب بأيدي خبراء في تقنيات الوسائط والنقد الفني لمساعدتك على استخراج أقصى متعة من شاشتك وسيرفرات البث.',
      read_article: 'قراءة المقال',
    },
    en: {
      badge: 'Authentic Cinema Guides & Technical Analyses',
      title: 'Falak Cinema Blog & Technology Guides',
      desc: 'Original editorial content written by media engineering and film critics to help you maximize your home theater and streaming experience.',
      read_article: 'Read Article',
    },
    fr: {
      badge: 'Dossiers Cinéma & Analyses Techniques',
      title: 'Le Blog Cinéma & Guides Falak TV',
      desc: 'Analyses exclusives et guides d’ingénierie audiovisuelle pour tirer le meilleur parti de votre installation cinéma à domicile.',
      read_article: 'Lire l’article',
    },
    es: {
      badge: 'Guías de Cine y Análisis Técnico Especializado',
      title: 'Blog de Cine y Guías Técnicas de Falak TV',
      desc: 'Artículos exclusivos redactados por expertos en tecnología visual y crítica de cine para optimizar tu cine en casa.',
      read_article: 'Leer artículo',
    },
    tr: {
      badge: 'Özel Sinema Rehberleri ve Teknik İncelemeler',
      title: 'Falak TV Sinema Blogu ve Teknoloji Rehberleri',
      desc: 'Ev sineması ve yayın deneyiminizi en üst seviyeye çıkarmak için sinema eleştirmenleri ve medya uzmanları tarafından hazırlandı.',
      read_article: 'Makaleyi Oku',
    },
  };

  const h = headings[lang] || headings.ar;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header with working language switcher */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-[#13151f] to-[#07080b] border-b border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/25 text-red-400 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{h.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {h.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {h.desc}
          </p>
        </div>
      </section>

      {/* Main Blog Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
        <AdBanner slot="2915749618" label="Google AdSense" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-[#0e1017] border border-white/10 hover:border-red-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative h-56 sm:h-64 overflow-hidden block">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent"></div>
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-red-400 border border-red-500/30 text-xs font-bold">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className="text-xs font-bold text-white">{post.author.name}</div>
                      <div className="text-[10px] text-gray-400">{post.author.role}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-400 group-hover:text-red-300 transition"
                  >
                    <span>{h.read_article}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <AdBanner slot="2915749619" label="Google AdSense" className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
