import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Share2, Tag, ChevronLeft, BookOpen, User, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

import BlogPostClient from '@/components/BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'المقال غير موجود | فلك Falak TV',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://falaktv.app';
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | مدونة فلك TV`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: '2026-03-01T00:00:00.000Z',
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: '2026-03-01T00:00:00.000Z',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Falak TV',
      logo: {
        '@type': 'ImageObject',
        url: 'https://falaktv.app/pwa-192x192.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://falaktv.app/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} otherPosts={otherPosts} />
    </>
  );
}
