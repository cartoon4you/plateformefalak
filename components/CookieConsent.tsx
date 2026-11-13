'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('falak_cookie_consent');
      if (!consent) {
        // Small delay so it animates in smoothly after initial render
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Storage access may be restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('falak_cookie_consent', 'accepted');
    } catch (e) {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('falak_cookie_consent', 'essential_only');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="إشعار ملفات تعريف الارتباط"
      className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans"
      dir="rtl"
    >
      <div className="bg-[#0e1017]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/80 text-white">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
              <span>إشعار ملفات تعريف الارتباط والخصوصية</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              نستخدم ملفات تعريف الارتباط (Cookies) وتقنيات التتبع من شركائنا المعتمدين مثل Google AdSense لعرض إعلانات مخصصة وتحسين تجربة التصفح وحفظ تفضيلاتك. بالضغط على &quot;قبول&quot;، فإنك توافق على سياستنا.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-white/10">
          <Link
            href="/privacy-policy"
            className="text-xs text-gray-400 hover:text-white underline underline-offset-4 transition"
          >
            قراءة سياسة الخصوصية وأدسنس
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition cursor-pointer"
            >
              الضرورية فقط
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>موافق وقبول</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
