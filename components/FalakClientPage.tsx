// components/FalakClientPage.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import GenreChips from '@/components/GenreChips';
import DetailPanel from '@/components/DetailPanel';
import Player from '@/components/Player';
import MediaCard from '@/components/MediaCard';
import UnauthorizedDomainModal from '@/components/UnauthorizedDomainModal';
import Hero from '@/components/Hero';
import AdBanner from '@/components/AdBanner';
import { BLOG_POSTS } from '@/lib/blogData';
import { useLanguage } from '@/context/LanguageContext';
import { fetchTMDB } from '@/lib/tmdb';
import { auth, googleProvider, db } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { 
  Play, 
  Bookmark, 
  Search as SearchIcon, 
  Film, 
  Trash2, 
  ArrowLeft, 
  X, 
  Tv, 
  ChevronDown, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Sparkles,
  Calendar,
  Clock
} from 'lucide-react';
import { MediaItem, LangCode, ContinueWatchingItem } from '@/types';
import { T, LANGUAGES } from '@/lib/i18n';
import {
  buildPermalink,
  parsePermalink,
  updateMediaMetadata,
  resetMediaMetadata,
} from '@/lib/permalink';

const LOCAL_FAVORITES_KEY = 'falak_favorites_guest';
const LOCAL_CONTINUE_WATCHING_KEY = 'falak_continue_watching';

export interface FalakClientPageProps {
  initialSearchParams?: {
    type?: string;
    id?: string;
    title?: string;
    s?: string;
    e?: string;
    tab?: string;
  };
}

export default function FalakClientPage({ initialSearchParams }: FalakClientPageProps) {
  // Language & Localization State from global LanguageProvider
  const { lang, setLanguage, isRTL, dir } = useLanguage();
  const t = T[lang] || T.ar;
  const tmdbLang = LANGUAGES.find((l) => l.code === lang)?.tmdb || 'ar-SA';

  // Navigation & UI State (pure SSR-safe defaults to prevent hydration mismatch)
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites'>('home');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreLogic, setGenreLogic] = useState<'or' | 'and'>('or');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>([]);

  // Player & Detail Modal State
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  // Permalink & Loading Feedback State
  const [isInitialPermalinkLoading, setIsInitialPermalinkLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = lang === 'ar' ? [
    {
      q: 'ما هي منصة فلك TV وما الذي يميزها عن المنصات الأخرى؟',
      a: 'فلك TV هي منصة ترفيهية وسينمائية متطورة تجمع بين الفهرسة الشاملة لأحدث الأفلام والمسلسلات العالمية بجودة فائقة تصل إلى 4K، ونظام ذكي متكامل لجلب ومزامنة الترجمات تلقائياً، مع واجهة مستخدم سريعة وخالية من النوافذ المنبثقة المزعجة.',
    },
    {
      q: 'كيف تعمل ميزة الترجمة الذكية في مشغل الفيديو؟',
      a: 'يعتمد مشغل فلك على خوارزميات ذكية تتعرف على بصمة العمل الفني وتجلب ملفات الترجمة المعتمدة (SRT/VTT) بدقة متناهية مع دعم التشفير القياسي UTF-8 لتفادي مشكلات الحروف المقلوبة، مع إمكانية تقديم أو تأخير التوقيت (±0.5s).',
    },
    {
      q: 'ما هي سرعة اتصال الإنترنت الموصى بها لمشاهدة بدون تقطيع؟',
      a: 'لبث بدقة HD (1080p)، نوصي بسرعة 5-10 ميجابت/ثانية. أما لبث 4K مع تقنية HDR، فالسرعة الموصى بها 25 ميجابت/ثانية أو أعلى مع تفضيل الاتصال السلكي أو Wi-Fi 5GHz.',
    },
    {
      q: 'هل تطبيق فلك متاح للتثبيت على الهواتف والأجهزة الذكية؟',
      a: 'نعم! تدعم منصة فلك تقنية تطبيقات الويب التقدمية (PWA)، مما يتيح لك تثبيت المنصة كتطبيق أصلي خفيف وسريع على أجهزة Android و iPhone وشاشات التلفزيون الذكية وحواسيب Windows و Mac بضغطة زر واحدة.',
    },
    {
      q: 'ما هي سياسة الإعلانات واحترام خصوصية المستخدم في فلك؟',
      a: 'نحن نعتمد نظام إعلاني منظم ومتوافق بنسبة 100% مع شبكة Google AdSense، حيث نحرص على عدم تشويش تجربة المشاهد أو تغطية أزرار التحكم بمشغل الفيديو، مع توفير خيارات واضحة للموافقة على ملفات تعريف الارتباط وفقاً لسياسة الخصوصية.',
    },
  ] : [
    {
      q: lang === 'fr' ? 'Qu’est-ce que Falak TV et qu’est-ce qui le rend unique ?' : lang === 'es' ? '¿Qué es Falak TV y qué lo hace único?' : lang === 'tr' ? 'Falak TV nedir ve onu özel kılan nedir?' : 'What is Falak TV and what makes it unique?',
      a: lang === 'fr' ? 'Falak TV est une plateforme cinématographique moderne offrant du streaming 4K/HD, une synchronisation intelligente des sous-titres et une interface rapide conforme aux normes de qualité.' : lang === 'es' ? 'Falak TV es una plataforma cinematográfica moderna que ofrece streaming 4K/HD, sincronización inteligente de subtítulos y una interfaz rápida sin anuncios intrusivos.' : lang === 'tr' ? 'Falak TV, 4K/HD yayın, akıllı altyazı senkronizasyonu ve hızlı sunucular sunan modern bir sinema platformudur.' : 'Falak TV is a modern cinema and entertainment platform offering 4K/HD streaming, smart subtitle synchronization, fast servers, and an ad-safe experience.',
    },
    {
      q: lang === 'fr' ? 'Comment fonctionne la synchronisation intelligente des sous-titres ?' : lang === 'es' ? '¿Cómo funciona la sincronización inteligente de subtítulos?' : lang === 'tr' ? 'Akıllı altyazı senkronizasyonu nasıl çalışır?' : 'How does smart subtitle synchronization work?',
      a: lang === 'fr' ? 'Notre lecteur détecte automatiquement l’empreinte de la vidéo et charge les sous-titres avec encodage UTF-8 et décalage manuel précis.' : lang === 'es' ? 'Nuestro reproductor detecta la huella del video y carga los subtítulos con codificación UTF-8 y ajuste de retardo manual.' : lang === 'tr' ? 'Oynatıcımız video parmak izini algılar ve UTF-8 kodlaması ve manuel zamanlama ayarı ile uyumlu altyazıları yükler.' : 'Our player automatically matches video fingerprints and loads verified UTF-8 subtitles with precision manual offset controls (±0.5s).',
    },
    {
      q: lang === 'fr' ? 'Quelle vitesse Internet est recommandée ?' : lang === 'es' ? '¿Qué velocidad de internet se recomienda?' : lang === 'tr' ? 'Hangi internet hızı önerilir?' : 'What internet speed is recommended?',
      a: lang === 'fr' ? 'Pour la HD (1080p), 5 à 10 Mbps suffisent. Pour la 4K HDR, 25 Mbps ou plus sont recommandés sur réseau filaire ou Wi-Fi 5GHz.' : lang === 'es' ? 'Para HD (1080p), se recomienda 5-10 Mbps. Para 4K HDR, se recomienda 25 Mbps o superior en red cableada o Wi-Fi 5GHz.' : lang === 'tr' ? 'HD için 5-10 Mbps yeterlidir. 4K HDR için kablolu bağlantı veya 5GHz Wi-Fi ile 25 Mbps ve üzeri önerilir.' : 'For 1080p HD streaming, 5-10 Mbps is recommended; for 4K HDR, 25 Mbps or higher is ideal via Ethernet or 5GHz Wi-Fi.',
    },
    {
      q: lang === 'fr' ? 'Falak TV est-il installable comme application (PWA) ?' : lang === 'es' ? '¿Se puede instalar Falak TV como app (PWA)?' : lang === 'tr' ? 'Falak TV bir uygulama (PWA) olarak kurulabilir mi?' : 'Is Falak TV installable as a web app (PWA)?',
      a: lang === 'fr' ? 'Oui, vous pouvez installer Falak TV directement sur Android, iPhone, PC, Mac et Smart TV en un clic sans passer par un store.' : lang === 'es' ? 'Sí, puedes instalar Falak TV directamente en Android, iPhone, PC, Mac y Smart TV con un solo clic.' : lang === 'tr' ? 'Evet, Falak TV’yi Android, iPhone, Windows, Mac ve Akıllı TV’lere tek tıkla yükleyebilirsiniz.' : 'Yes! Falak supports Progressive Web App (PWA) technology, allowing you to install it natively on Android, iOS, Windows, Mac, and Smart TVs in one click.',
    },
    {
      q: lang === 'fr' ? 'Quelle est la politique de confidentialité et de publicité ?' : lang === 'es' ? '¿Cuál es la política de privacidad y anuncios?' : lang === 'tr' ? 'Gizlilik ve reklam politikası nedir?' : 'What is the privacy and advertising policy?',
      a: lang === 'fr' ? 'Nous respectons strictement les politiques Google AdSense avec des formats publicitaires non invasifs et un consentement clair aux cookies.' : lang === 'es' ? 'Cumplimos rigurosamente con las políticas de Google AdSense mediante formatos no invasivos y consentimiento transparente de cookies.' : lang === 'tr' ? 'Kullanıcı deneyimini engellemeyen temiz yerleşimlerle Google AdSense politikalarına tam olarak uyuyoruz.' : 'We adhere 100% to Google AdSense publishing guidelines, providing unobtrusive ad placements and transparent cookie consent options.',
    },
  ];

  const selectedMediaRef = useRef<any>(selectedMedia);
  useEffect(() => {
    selectedMediaRef.current = selectedMedia;
  }, [selectedMedia]);

  const showAppToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Auth & Favorites State (favorites restored from localStorage inside useEffect)
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<MediaItem[]>([]);

  // Smooth Tab Switching
  const handleTabChange = useCallback((tab: 'home' | 'search' | 'favorites') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (tab === 'search') {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, []);

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const snapshot = await getDocs(collection(db, 'users', currentUser.uid, 'favorites'));
          const cloudFavs: MediaItem[] = [];
          snapshot.forEach((docSnap) => {
            cloudFavs.push(docSnap.data() as MediaItem);
          });
          if (cloudFavs.length > 0) {
            setFavorites((prev) => {
              const merged = [...cloudFavs];
              prev.forEach((p) => {
                if (!merged.some((m) => m.id === p.id)) {
                  merged.push(p);
                }
              });
              localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(merged));
              return merged;
            });
          }
        } catch (e) {
          console.warn('Failed to fetch user favorites from cloud:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync favorites helper
  const syncFavoritesStorage = (updated: MediaItem[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Toggle Favorite
  const toggleFavorite = async (item: any) => {
    const isFav = favorites.some((f) => f.id === item.id);
    const mediaItem: MediaItem = {
      id: item.id,
      mediaType: item.mediaType || item.media_type || 'movie',
      title: item.title || item.name || '',
      poster_path: item.poster_path || '',
      vote_average: item.vote_average || 0,
      release_date: item.release_date || item.first_air_date || '',
    };

    let updatedList: MediaItem[];
    if (isFav) {
      updatedList = favorites.filter((f) => f.id !== item.id);
      if (user) {
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'favorites', `${mediaItem.mediaType}_${item.id}`));
        } catch {}
      }
    } else {
      updatedList = [mediaItem, ...favorites];
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid, 'favorites', `${mediaItem.mediaType}_${item.id}`), mediaItem);
        } catch {}
      }
    }
    syncFavoritesStorage(updatedList);
  };

  // Continue Watching Logic
  const updateContinueWatching = useCallback((item: any, season?: number, episode?: number) => {
    setContinueWatching((prev) => {
      const newItem: ContinueWatchingItem = {
        id: item.id,
        mediaType: (item.mediaType || item.media_type || 'movie') as any,
        title: item.title || item.name || '',
        poster_path: item.poster_path || '',
        season,
        episode,
        lastUpdated: Date.now(),
      };

      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = [newItem, ...filtered].slice(0, 12); // Keep last 12 items
      localStorage.setItem(LOCAL_CONTINUE_WATCHING_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromHistory = (id: number) => {
    setContinueWatching((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_CONTINUE_WATCHING_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Google Sign-in Handler
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error?.code === 'auth/unauthorized-domain') {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
        setUnauthorizedDomain(currentHost || 'ais-dev-...run.app');
      } else if (error?.code === 'auth/popup-blocked') {
        showAppToast(lang === 'ar' ? 'تم حظر النافذة المنبثقة، يرجى السماح بالنوافذ لتسجيل الدخول' : 'Popup blocked, please allow popups to sign in');
      } else if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        console.warn('Login warning:', error?.message || error);
        showAppToast(lang === 'ar' ? 'تعذر تسجيل الدخول، يرجى المحاولة لاحقاً' : 'Login failed, please try again');
      }
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle display language change with local persistence and direction update
  const handleLanguageChange = (newLang: LangCode) => {
    setLanguage(newLang);
    const tNew = T[newLang] || T.ar;
    showAppToast(tNew.toast_lang_changed || '🌐 Language changed');
  };

  // Multi-genre filter handlers
  const handleToggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const handleClearGenres = () => {
    setSelectedGenres([]);
  };

  // Fetch movies when selected genres, logic mode, or language changes or on initial mount
  useEffect(() => {
    let isCancelled = false;

    async function loadMovies() {
      setLoading(true);
      try {
        let endpoint = '/movie/popular';
        if (selectedGenres.length > 0) {
          const separator = genreLogic === 'and' ? ',' : '|';
          const genreParam = selectedGenres.join(separator);
          endpoint = `/discover/movie?with_genres=${genreParam}&sort_by=popularity.desc`;
        }
        const data = await fetchTMDB(endpoint, { lang: tmdbLang });
        if (!isCancelled) {
          setMedia(data.results || []);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        if (!isCancelled) {
          setMedia([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadMovies();
    return () => {
      isCancelled = true;
    };
  }, [selectedGenres, genreLogic, tmdbLang]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  // Live search debounce handler with localized TMDB results
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setSearchOpen(true);
      try {
        const data = await fetchTMDB(
          `/search/multi?query=${encodeURIComponent(searchQuery.trim())}`,
          { lang: tmdbLang }
        );
        const filtered = (data.results || []).filter(
          (item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );
        setSearchResults(filtered);
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setSearchLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, tmdbLang]);

  // 1. Initial mount: safely restore client-side state
  useEffect(() => {
    // 1b. Restore favorites from local storage
    try {
      const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
      if (stored) {
        const parsedFavs = JSON.parse(stored);
        if (Array.isArray(parsedFavs)) {
          queueMicrotask(() => {
            setFavorites(parsedFavs);
          });
        }
      }
    } catch (e) {
      console.warn('Could not read guest favorites:', e);
    }

    // 1c. Parse search query parameters
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const params = new URLSearchParams(search);
    const tabParam = initialSearchParams?.tab || params.get('tab');
    if (tabParam === 'search' || tabParam === 'favorites') {
      queueMicrotask(() => {
        setActiveTab(tabParam);
      });
    }

    // 1d. Restore continue watching from local storage
    try {
      const stored = localStorage.getItem(LOCAL_CONTINUE_WATCHING_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          queueMicrotask(() => {
            setContinueWatching(parsed);
          });
        }
      }
    } catch (e) {
      console.warn('Could not read continue watching history:', e);
    }

    // 1e. Parse permalink (from URL or initialSearchParams)
    const targetType = initialSearchParams?.type || params.get('type');
    const targetId = initialSearchParams?.id || params.get('id');
    const parsed = parsePermalink(search) || (targetType && targetId ? {
      isValid: true,
      type: targetType as 'movie' | 'tv',
      id: parseInt(targetId, 10),
      season: initialSearchParams?.s ? parseInt(initialSearchParams.s, 10) : 1,
      episode: initialSearchParams?.e ? parseInt(initialSearchParams.e, 10) : 1,
      hasEpisodeParams: Boolean(initialSearchParams?.s || initialSearchParams?.e),
    } : null);

    if (parsed && parsed.isValid && !isNaN(parsed.id)) {
      queueMicrotask(() => {
        setIsInitialPermalinkLoading(true);
      });
      fetchTMDB(`/${parsed.type}/${parsed.id}?append_to_response=credits,videos,external_ids`)
        .then((details) => {
          const fullItem = { ...details, mediaType: parsed.type };
          setSelectedMedia(fullItem);
          setCurrentSeason(parsed.season);
          setCurrentEpisode(parsed.episode);
          setShowPlayer(false);
          updateMediaMetadata(fullItem, parsed.season, parsed.episode);
        })
        .catch((err) => {
          console.warn('Permalink item not found:', err);
          showAppToast('العنصر المطلوب غير موجود');
          resetMediaMetadata();
          if (typeof window !== 'undefined') {
            const pathname = window.location.pathname || '/';
            const cleanUrl = tabParam && tabParam !== 'home' ? `${pathname}?tab=${tabParam}` : pathname;
            window.history.replaceState({ tab: tabParam || 'home' }, '', cleanUrl);
          }
        })
        .finally(() => {
          setIsInitialPermalinkLoading(false);
        });
    }
  }, [initialSearchParams]);

  // 2. Browser history navigation (Back / Forward) popstate listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = async () => {
      const search = window.location.search;
      const parsed = parsePermalink(search);
      const params = new URLSearchParams(search);
      const tabParam = params.get('tab');

      if (tabParam === 'search' || tabParam === 'favorites' || tabParam === 'home') {
        setActiveTab(tabParam);
      }

      if (parsed && parsed.isValid) {
        setCurrentSeason(parsed.season);
        setCurrentEpisode(parsed.episode);

        const current = selectedMediaRef.current;
        if (
          current &&
          current.id === parsed.id &&
          (current.mediaType === parsed.type || current.media_type === parsed.type)
        ) {
          setShowPlayer(false);
          updateMediaMetadata(current, parsed.season, parsed.episode);
        } else {
          try {
            const details = await fetchTMDB(
              `/${parsed.type}/${parsed.id}?append_to_response=credits,videos,external_ids`
            );
            const fullItem = { ...details, mediaType: parsed.type };
            setSelectedMedia(fullItem);
            setShowPlayer(false);
            updateMediaMetadata(fullItem, parsed.season, parsed.episode);
          } catch {
            setSelectedMedia(null);
            setShowPlayer(false);
            resetMediaMetadata();
          }
        }
      } else {
        setSelectedMedia(null);
        setShowPlayer(false);
        resetMediaMetadata();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Open detail panel for movie/show with permalink pushState
  const handleOpenDetail = async (
    id: number,
    type?: 'movie' | 'tv' | string,
    initialTitle?: string,
    initialSeason = 1,
    initialEpisode = 1
  ) => {
    const resolvedType = String(type).toLowerCase() === 'tv' ? 'tv' : 'movie';

    let startS = initialSeason;
    let startE = initialEpisode;
    if (initialSeason === 1 && initialEpisode === 1) {
      const saved = continueWatching.find((i) => i.id === id);
      if (saved) {
        startS = saved.season || 1;
        startE = saved.episode || 1;
      }
    }

    const preliminaryUrl = buildPermalink({
      type: resolvedType,
      id,
      title: initialTitle,
      season: resolvedType === 'tv' ? startS : undefined,
      episode: resolvedType === 'tv' ? startE : undefined,
    });
    window.history.pushState(
      { type: resolvedType, id, season: startS, episode: startE, tab: activeTab },
      '',
      preliminaryUrl
    );

    try {
      const details = await fetchTMDB(`/${resolvedType}/${id}?append_to_response=credits,videos,external_ids`);
      const fullItem = { ...details, mediaType: resolvedType };
      setSelectedMedia(fullItem);
      setCurrentSeason(startS);
      setCurrentEpisode(startE);
      setShowPlayer(false);

      const finalUrl = buildPermalink({
        type: resolvedType,
        id,
        title: fullItem.title || fullItem.name || initialTitle,
        season: resolvedType === 'tv' ? startS : undefined,
        episode: resolvedType === 'tv' ? startE : undefined,
      });
      window.history.replaceState(
        { type: resolvedType, id, season: startS, episode: startE, tab: activeTab },
        '',
        finalUrl
      );
      updateMediaMetadata(fullItem, startS, startE);
    } catch {
      const fallbackItem = { id, mediaType: resolvedType, title: initialTitle };
      setSelectedMedia(fallbackItem);
      setCurrentSeason(startS);
      setCurrentEpisode(startE);
      setShowPlayer(false);
      updateMediaMetadata(fallbackItem, startS, startE);
    }
  };

  // Directly start player for movie/show with permalink pushState
  const handleQuickPlay = async (item: any) => {
    const isTv = item.mediaType === 'tv' || item.media_type === 'tv';
    const resolvedType = isTv ? 'tv' : 'movie';
    const initialTitle = item.title || item.name;

    const permalink = buildPermalink({
      type: resolvedType,
      id: item.id,
      title: initialTitle,
      season: resolvedType === 'tv' ? 1 : undefined,
      episode: resolvedType === 'tv' ? 1 : undefined,
    });
    window.history.pushState(
      { type: resolvedType, id: item.id, season: 1, episode: 1, tab: activeTab },
      '',
      permalink
    );

    try {
      const details = await fetchTMDB(`/${resolvedType}/${item.id}?append_to_response=credits,videos,external_ids`);
      const fullItem = { ...details, mediaType: resolvedType };
      setSelectedMedia(fullItem);

      const saved = continueWatching.find((i) => i.id === item.id);
      const startS = saved?.season || 1;
      const startE = saved?.episode || 1;

      setCurrentSeason(startS);
      setCurrentEpisode(startE);
      setShowPlayer(true);
      updateMediaMetadata(fullItem, startS, startE);
      updateContinueWatching(fullItem, startS, startE);
    } catch {
      const fallbackItem = { ...item, mediaType: resolvedType };
      setSelectedMedia(fallbackItem);

      const saved = continueWatching.find((i) => i.id === item.id);
      const startS = saved?.season || 1;
      const startE = saved?.episode || 1;

      setCurrentSeason(startS);
      setCurrentEpisode(startE);
      setShowPlayer(true);
      updateMediaMetadata(fallbackItem, startS, startE);
      updateContinueWatching(fallbackItem, startS, startE);
    }
  };

  // Change TV season or episode using replaceState
  const handleSelectEpisode = (season: number, episode: number) => {
    setCurrentSeason(season);
    setCurrentEpisode(episode);
    if (selectedMedia) {
      const isTv = selectedMedia.mediaType === 'tv' || selectedMedia.media_type === 'tv';
      if (isTv) {
        const updatedPermalink = buildPermalink({
          type: 'tv',
          id: selectedMedia.id,
          title: selectedMedia.title || selectedMedia.name,
          season,
          episode,
        });
        window.history.replaceState(
          { ...window.history.state, season, episode },
          '',
          updatedPermalink
        );
        updateMediaMetadata(selectedMedia, season, episode);
        if (showPlayer) {
          updateContinueWatching(selectedMedia, season, episode);
        }
      }
    }
  };

  // Close detail modal and restore clean URL
  const handleCloseModal = () => {
    setSelectedMedia(null);
    setShowPlayer(false);
    resetMediaMetadata();

    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname || '/';
      const cleanUrl = activeTab && activeTab !== 'home'
        ? `${pathname}?tab=${activeTab}`
        : pathname;
      window.history.pushState({ tab: activeTab }, '', cleanUrl);
    }
  };

  // Close player (returns to detail view)
  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="bg-[#07080b] text-white min-h-screen flex flex-col antialiased">
      {/* Top Navbar */}
      <Header
        lang={lang}
        onLangChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchResults={searchResults}
        searchLoading={searchLoading}
        onSelectResult={(item) => {
          handleOpenDetail(item.id, item.media_type || 'movie', item.title || item.name);
          setSearchOpen(false);
          setSearchQuery('');
        }}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#13151f]/95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-2xl border border-red-500/40 backdrop-blur-md flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 pt-[72px] pb-[calc(76px+env(safe-area-inset-bottom,0px))] md:pb-0">
        {/* ===================== VIEW 1: HOME ===================== */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              lang={lang}
              onExplore={() => {
                const el = document.getElementById('movies-catalog');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* Top AdSense Banner */}
            <AdBanner slot="2915749601" label="إعلان ممول" className="my-4 max-w-7xl mx-auto px-4" />

            {/* Continue Watching Section */}
            {continueWatching.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      {t.continue_watching}
                      <span className="text-xs font-normal text-gray-400">({continueWatching.length})</span>
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setContinueWatching([]);
                      try {
                        localStorage.removeItem(LOCAL_CONTINUE_WATCHING_KEY);
                      } catch {}
                    }}
                    className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t.clear_history || 'مسح السجل'}
                  </button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
                  {continueWatching.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex-shrink-0 w-36 sm:w-44 bg-[#13151f] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all shadow-md"
                    >
                      <div
                        onClick={() => handleOpenDetail(item.id, item.mediaType, item.title, item.season, item.episode)}
                        className="cursor-pointer"
                      >
                        <div className="relative aspect-[2/3] w-full bg-black/40 overflow-hidden">
                          {item.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
                              <Film className="w-8 h-8" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                          {item.season && item.episode && (
                            <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-md border border-white/10">
                              S{item.season} E{item.episode}
                            </span>
                          )}
                        </div>

                        <div className="p-2.5">
                          <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center justify-between">
                            <span>{item.mediaType === 'tv' ? t.series_label || 'مسلسل' : t.movie_label || 'فيلم'}</span>
                            <span className="text-red-400 font-semibold">{t.btn_resume || 'استئناف'}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(item.id);
                        }}
                        title={t.remove || 'إزالة'}
                        className="absolute top-2 left-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Catalog Main Section */}
            <section id="movies-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Category Filters Bar */}
              <div className="mb-6">
                <GenreChips
                  lang={lang}
                  selectedGenres={selectedGenres}
                  onToggleGenre={handleToggleGenre}
                  onClearGenres={handleClearGenres}
                  genreLogic={genreLogic}
                  onChangeLogic={(newLogic) => setGenreLogic(newLogic)}
                />
              </div>

              {/* Media Grid Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {selectedGenres.length > 0 ? t.filtered_results : t.latest_movies}
                  </h2>
                </div>
                {media.length > 0 && (
                  <span className="text-xs text-gray-400 font-medium">
                    {media.length} {t.results_count_label}
                  </span>
                )}
              </div>

              {/* Grid content / Loading skeleton */}
              {loading || isInitialPermalinkLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#13151f] rounded-xl aspect-[2/3] border border-white/5" />
                  ))}
                </div>
              ) : media.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {media.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      isFavorite={favorites.some((f) => f.id === item.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetail={(mediaItem) =>
                        handleOpenDetail(
                          mediaItem.id,
                          mediaItem.mediaType || mediaItem.media_type || 'movie',
                          mediaItem.title || mediaItem.name
                        )
                      }
                      onQuickPlay={handleQuickPlay}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4 bg-[#13151f] rounded-2xl border border-white/5 my-6">
                  <Film className="w-14 h-14 text-gray-600 mx-auto mb-3" />
                  <h3 className="font-bold text-base text-gray-200 mb-1">{t.no_movies_found}</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5 leading-relaxed">
                    {t.no_movies_desc}
                  </p>
                  <button
                    type="button"
                    onClick={handleClearGenres}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg shadow-red-600/30 transition cursor-pointer"
                  >
                    {t.clear_filters}
                  </button>
                </div>
              )}
            </section>

            {/* Mid-Page AdSense Banner */}
            <AdBanner slot="2915749602" label="إعلان ممول" className="my-8 max-w-7xl mx-auto px-4" />

            {/* Platform Features & Editorial Architecture Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>عن منصة فلك TV والخدمات المقدمة</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  تجربة سينمائية متكاملة مصممة لعشاق الفن السابع
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  نحن نجمع بين أحدث تقنيات بث الوسائط الرقمية، وأنظمة الترجمة العربية الذكية، والمحتوى التحريري الثري لتوفير بيئة ترفيهية متقدمة ومريحة لجميع أفراد الأسرة.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-red-600/10 text-red-500 flex items-center justify-center mb-4 border border-red-500/20">
                    <Tv className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">هندسة البث الفائق 4K</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    استمتع بمشاهدة أحدث الأعمال بجودات متعددة تتكيف تلقائياً مع سرعة اتصالك، مع دعم الترميزات المتقدمة لتقليل استهلاك البيانات دون التأثير على وضوح الصورة.
                  </p>
                </div>

                <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">نظام الترجمة الذكية المتطابق</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    مزامنة فورية ودقيقة لملفات الترجمة العربية مع إمكانية ضبط التوقيت الزمني، وتغيير حجم الخط ولونه وخلفيته لتجربة قراءة مريحة لعينيك في أي وقت.
                  </p>
                </div>

                <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 shadow-xl">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">أمان كامل وتوافق أدسنس</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    منصة تحترم خصوصية المستخدم ولا تعرض إعلانات مضللة أو منبثقة، وتلتزم بسياسات النشر العالمية وشروط Google AdSense لضمان بيئة آمنة للجميع.
                  </p>
                </div>
              </div>

              {/* Informational Text Box for SEO & AdSense Content Depth */}
              <div className="bg-[#13151f] border border-white/5 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-500" />
                  <span>دليل تصفح المحتوى والمشاهدة العائلية</span>
                </h4>
                <p className="mb-3">
                  تعتمد منصة فلك على محرك فهرسة معلوماتي متطور يرتبط بقواعد بيانات السينما العالمية الرسمية، مما يوفر لك بطاقات تعريفية تفصيلية لكل فيلم ومسلسل تشمل نبذة القصة، طاقم التمثيل، المخرج، سنة الإنتاج، التقييم الدولي، والتصنيف العمري الرقابي المعتمد، مما يتيح لك ولعائلتك اتخاذ القرار المناسب قبل بدء المشاهدة.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <Link href="/about" className="text-red-400 hover:text-red-300 font-bold underline underline-offset-4">
                    تعرف أكثر على رؤية ورسالة فلك TV
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white underline underline-offset-4">
                    قراءة سياسة الخصوصية واستخدام الكوكيز
                  </Link>
                </div>
              </div>
            </section>

            {/* Cinema Guides & Articles Preview Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>أحدث المقالات والدلائل السينمائية</span>
                      <BookOpen className="w-4 h-4 text-purple-400" />
                    </h2>
                  </div>
                  <p className="text-xs text-gray-400">
                    شروحات تقنية وتحليلات نقدية حصرية كُتبت بعناية لعشاق الشاشة الفضية.
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition self-start sm:self-auto"
                >
                  <span>تصفح جميع الأدلة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.slice(0, 3).map((post) => (
                  <article
                    key={post.slug}
                    className="bg-[#0e1017] border border-white/10 hover:border-red-500/40 rounded-3xl overflow-hidden shadow-lg transition flex flex-col group"
                  >
                    <Link href={`/blog/${post.slug}`} className="relative h-44 overflow-hidden block">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-red-400 border border-red-500/30 text-[10px] font-bold">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition line-clamp-2 mb-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-gray-400 text-[11px] font-medium">{post.author.name}</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-red-400 font-bold hover:text-red-300 flex items-center gap-1 transition"
                        >
                          <span>قراءة</span>
                          <ArrowLeft className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Interactive FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-white/5">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>مركز المساعدة والمعلومات</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">الأسئلة الشائعة حول منصة فلك TV</h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  إليك إجابات شافية وموجزة عن أبرز التساؤلات التي يطرحها مستخدمو وزوار منصتنا.
                </p>
              </div>

              <div className="space-y-3">
                {faqItems.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#0e1017] border border-white/10 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 cursor-pointer select-none hover:bg-white/[0.02] transition"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                          <span>{item.q}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-red-500' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <p className="text-xs text-gray-400 mb-2">لم تجد إجابة لسؤالك؟ نحن مستعدون للمساعدة دائماً.</p>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-red-400 hover:text-red-300 underline underline-offset-4"
                >
                  تواصل مباشرة مع فريق الدعم الفني
                </Link>
              </div>
            </section>

            {/* Bottom AdSense Banner */}
            <AdBanner slot="2915749603" label="إعلان ممول" className="my-10 max-w-7xl mx-auto px-4" />
          </div>
        )}

        {/* ===================== VIEW 2: SEARCH ===================== */}
        {activeTab === 'search' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">{t.search_title}</h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">{t.search_subtitle}</p>

              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t.search_placeholder}
                  className="w-full bg-[#13151f] border border-white/10 focus:border-red-500 rounded-full py-3.5 pr-12 pl-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-xl transition"
                />
                <SearchIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {searchLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-[#13151f] rounded-xl aspect-[2/3] border border-white/5" />
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {searchResults.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.some((f) => f.id === item.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetail={(mediaItem) =>
                      handleOpenDetail(
                        mediaItem.id,
                        mediaItem.mediaType || mediaItem.media_type || 'movie',
                        mediaItem.title || mediaItem.name
                      )
                    }
                    onQuickPlay={handleQuickPlay}
                  />
                ))}
              </div>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="text-center py-16 px-4 bg-[#13151f] rounded-2xl border border-white/5">
                <SearchIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="font-bold text-base text-gray-200 mb-1">{t.search_no_results}</h3>
                <p className="text-xs text-gray-400">{t.search_try_different}</p>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <SearchIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-xs">{t.search_initial_prompt}</p>
              </div>
            )}
          </section>
        )}

        {/* ===================== VIEW 3: FAVORITES ===================== */}
        {activeTab === 'favorites' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                <h2 className="text-lg sm:text-xl font-bold text-white">{t.my_favorites}</h2>
                <span className="text-xs bg-red-600/20 text-red-400 font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              </div>

              {!user && (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                >
                  {t.login_to_sync}
                </button>
              )}
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {favorites.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetail={(mediaItem) =>
                      handleOpenDetail(
                        mediaItem.id,
                        mediaItem.mediaType || mediaItem.media_type || 'movie',
                        mediaItem.title || mediaItem.name
                      )
                    }
                    onQuickPlay={handleQuickPlay}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 bg-[#13151f] rounded-2xl border border-white/5 my-6">
                <Bookmark className="w-14 h-14 text-gray-600 mx-auto mb-3" />
                <h3 className="font-bold text-base text-gray-200 mb-1">{t.favorites_empty}</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5 leading-relaxed">
                  {t.fav_guest_note}
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('home')}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg shadow-red-600/30 transition cursor-pointer"
                >
                  {t.btn_browse}
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer with Working Links */}
      <Footer
        lang={lang}
        onTabChange={handleTabChange}
        onSelectGenre={(genreId) => {
          setSelectedGenres([genreId]);
          handleTabChange('home');
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              document.getElementById('movies-catalog')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
      />

      {/* Mobile Bottom Navigation Bar (Hidden when video player is active) */}
      <MobileNav
        lang={lang}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        hidden={showPlayer}
      />

      {/* Detail Modal Component */}
      {selectedMedia && !showPlayer && (
        <DetailPanel
          media={selectedMedia}
          lang={lang}
          isFavorite={favorites.some((f) => f.id === selectedMedia.id)}
          onToggleFavorite={toggleFavorite}
          onClose={handleCloseModal}
          onWatch={() => {
            setShowPlayer(true);
            updateContinueWatching(selectedMedia, currentSeason, currentEpisode);
          }}
          currentSeason={currentSeason}
          currentEpisode={currentEpisode}
          onSelectEpisode={handleSelectEpisode}
        />
      )}

      {/* Full Feature Video Player with Subtitles & Embeds */}
      {showPlayer && selectedMedia && (
        <Player
          media={selectedMedia}
          currentSeason={currentSeason}
          currentEpisode={currentEpisode}
          onClose={handleClosePlayer}
          onSelectEpisode={handleSelectEpisode}
          lang={lang}
        />
      )}

      {/* Unauthorized Domain Guide Modal */}
      {unauthorizedDomain && (
        <UnauthorizedDomainModal
          domain={unauthorizedDomain}
          lang={lang}
          onClose={() => setUnauthorizedDomain(null)}
        />
      )}
    </div>
  );
}
