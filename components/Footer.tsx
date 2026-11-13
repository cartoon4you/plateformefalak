'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Play, Zap, Shield, Heart, Globe, Search, Bookmark, BookOpen, Mail, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { LangCode } from '@/types';
import { T } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  lang?: LangCode;
  onTabChange?: (tab: 'home' | 'search' | 'favorites') => void;
  onSelectGenre?: (genreId: string) => void;
}

export default function Footer({ lang: propLang, onTabChange, onSelectGenre }: FooterProps = {}) {
  const pathname = usePathname();
  const globalLang = useLanguage();
  const activeLang = propLang || globalLang.lang;
  const t = T[activeLang] || T.ar;
  const isRTL = activeLang === 'ar';

  // Do not render footer on embed player page
  if (pathname?.startsWith('/embed')) {
    return null;
  }

  const handleNavClick = (tab: 'home' | 'search' | 'favorites', e: React.MouseEvent) => {
    if (onTabChange) {
      e.preventDefault();
      onTabChange(tab);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#06070a] border-t border-white/10 text-gray-400 font-sans mt-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-white select-none group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
                  فلك<span className="text-red-500">.</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Falak TV</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {t.footer_about_text || 'منصة سينمائية عربية متطورة توفر تجربة ترفيه فائقة الجودة بدقة 4K مع نظام ترجمة ذكية.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.footer_nodes_active || 'خوادم البث نشطة'}</span>
              </span>
              <a
                href="/ads.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition text-[11px]"
              >
                <span>ads.txt</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Play className="w-4 h-4 text-red-500" />
              <span>{t.footer_links || 'التنقل السريع'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors inline-block py-0.5">
                  {t.nav_home || 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link href="/?tab=search" className="hover:text-red-400 transition-colors inline-block py-0.5">
                  {t.btn_search || 'البحث والاستكشاف'}
                </Link>
              </li>
              <li>
                <Link href="/?tab=favorites" className="hover:text-red-400 transition-colors inline-block py-0.5">
                  {t.my_favorites || 'قائمة المفضلة'}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors inline-block py-0.5">
                  {t.nav_blog || 'المدونة والأدلة'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Admin Pages (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>{t.footer_info || 'الصفحات القانونية والإدارية'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>{t.nav_about || 'من نحن'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>{t.nav_contact || 'اتصل بنا والدعم الفني'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 py-0.5 text-amber-400/90 font-medium"
                >
                  <span>{t.nav_privacy || 'سياسة الخصوصية وأدسنس'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>{t.nav_terms || 'اتفاقية الاستخدام وإخلاء المسؤولية'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Cinema Guides & Articles (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>{t.nav_blog || 'أدلة سينمائية مميزة'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link
                  href="/blog/4k-hdr-home-cinema-guide"
                  className="hover:text-white transition line-clamp-1 py-0.5"
                >
                  • {activeLang === 'ar' ? 'دليل البث الفائق بدقة 4K و HDR' : '4K & HDR Home Cinema Guide'}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/smart-subtitles-sync-mastery"
                  className="hover:text-white transition line-clamp-1 py-0.5"
                >
                  • {activeLang === 'ar' ? 'حلول تزامن الترجمة العربية وتشفير UTF-8' : 'Smart Subtitles & Sync Mastery'}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/top-masterpieces-every-cinephile-must-watch"
                  className="hover:text-white transition line-clamp-1 py-0.5"
                >
                  • {activeLang === 'ar' ? '10 روائع سينمائية غيرت تاريخ السينما' : 'Top 10 Masterpieces Every Cinephile Must Watch'}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/family-friendly-entertainment-filtering"
                  className="hover:text-white transition line-clamp-1 py-0.5"
                >
                  • {activeLang === 'ar' ? 'دليل الترفيه العائلي والتصنيفات الرقابية' : 'Family-Friendly Entertainment Guide'}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-8 text-xs text-gray-500 leading-relaxed text-justify">
          <strong className="text-gray-400">{t.footer_disclaimer_title || 'إخلاء مسؤولية قانوني'}: </strong>
          {t.footer_disclaimer_text || 'جميع المواد الإعلامية والروابط المفهرسة على منصة فلك TV مجمعة ومجلوبة تلقائياً من مصادر عامة ومتاحة للعامة على شبكة الإنترنت. لا تقوم المنصة باستضافة أو رفع أي ملفات وسائط على خوادمها الخاصة.'}
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-right">
            <span>© {currentYear} Falak TV. {t.footer_copy || 'جميع الحقوق محفوظة.'}</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="text-gray-400">Google AdSense Compliant</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <span>{t.footer_made || 'صُنع بشغف لعشاق السينما والفن الراقي'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
