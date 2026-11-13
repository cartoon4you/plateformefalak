"use client";

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '@/lib/blogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPostClientProps {
  post: BlogPost;
  otherPosts: BlogPost[];
}

export default function BlogPostClient({ post, otherPosts }: BlogPostClientProps) {
  const { isRTL, t } = useLanguage();
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRTL ? ArrowRight : ArrowRight;

  return (
    <div 
      className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Global Navigation Header with Language Switcher */}
      <Header />

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-10 flex-1 w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition">
            {t('nav_home')}
          </Link>
          <ChevronIcon className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <Link href="/blog" className="hover:text-white transition">
            {t('nav_blog')}
          </Link>
          <ChevronIcon className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="text-gray-300 truncate max-w-xs">{post.category}</span>
        </nav>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Author Details Box */}
        <div className="flex items-center justify-between p-4 bg-[#0e1017] border border-white/10 rounded-2xl mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-gray-400">{post.author.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t('blog_verified_article')}</span>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[460px] object-cover"
          />
        </div>

        {/* AdSense Top Ad Slot */}
        <AdBanner slot="2915749620" label={isRTL ? 'إعلان ممول' : 'Advertisement'} className="mb-10" />

        {/* Body Paragraphs */}
        <div className="prose prose-invert max-w-none space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
          {post.content.map((paragraph, idx) => {
            if (paragraph.includes('\n')) {
              const lines = paragraph.split('\n');
              return (
                <div key={idx} className="space-y-3 bg-[#0e1017] p-6 sm:p-7 rounded-3xl border border-white/5 my-6">
                  <h3 className="text-xl font-bold text-white mb-2">{lines[0]}</h3>
                  {lines.slice(1).map((line, lIdx) => (
                    <p key={lIdx} className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-red-400" />
            <span>{t('blog_tags')}</span>
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* AdSense Mid/Bottom Ad Slot */}
        <AdBanner slot="2915749621" label={isRTL ? 'إعلان ممول' : 'Advertisement'} className="my-12" />

        {/* Next Articles */}
        {otherPosts.length > 0 && (
          <div className="mt-12 bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6">
              {t('blog_other_posts')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition block group"
                >
                  <div className="text-[11px] text-red-400 font-bold mb-1">{other.category}</div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition line-clamp-2 mb-2">
                    {other.title}
                  </h4>
                  <div className="text-xs text-gray-400 flex items-center justify-between">
                    <span>{other.readTime}</span>
                    <span className="flex items-center gap-1 text-red-400 group-hover:translate-x-[-4px] transition-transform font-medium">
                      {t('blog_read_more')} <ArrowIcon className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
