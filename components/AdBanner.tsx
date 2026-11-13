'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'إعلان ممول',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only attempt push if window.adsbygoogle is available and hasn't been pushed yet
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && !pushedRef.current) {
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (e) {
      // Ignore adsbygoogle errors in development
    }
  }, []);

  return (
    <div
      className={`my-6 mx-auto w-full max-w-5xl px-2 flex flex-col items-center justify-center ${className}`}
      dir="rtl"
    >
      <div className="w-full flex items-center justify-between text-[11px] text-gray-500 font-medium px-2 py-1 select-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
          <span>{label}</span>
        </span>
        <span className="text-[10px] text-gray-600">Google AdSense</span>
      </div>

      <div className="w-full min-h-[90px] sm:min-h-[100px] bg-[#0c0e14]/80 border border-white/5 rounded-2xl p-2 flex items-center justify-center relative overflow-hidden group shadow-inner">
        {/* Real AdSense Slot */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-2915749615185077"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {/* Professional fallback UI when ads are waiting to load or in preview */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-3 opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-amber-400">
              مساحة إعلانية معتمدة
            </span>
          </div>
          <p className="text-[11px] text-gray-500 max-w-sm">
            متوافقة مع سياسات جودة النشر والظهور في شبكة Google AdSense
          </p>
        </div>
      </div>
    </div>
  );
}
