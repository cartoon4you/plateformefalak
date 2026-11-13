'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2, AlertCircle, Clock, ShieldAlert, MessageSquare, PhoneCall, HelpCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { lang, isRTL, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const localizedText = {
    ar: {
      badge: 'نحن هنا للإصغاء والمساعدة دائماً',
      title: 'اتصل بنا وقنوات التواصل الرسمية',
      desc: 'يسعدنا دائماً استقبال استفساراتكم، مقترحاتكم لتحسين المنصة، أو البلاغات المتعلقة بحقوق الملكية الفكرية وطلبات الإعلانات.',
      official_email: 'البريد الإلكتروني الرسمي',
      email_hint: 'يمكنك مراسلتنا مباشرة على بريد الدعم الفني وسيقوم المسؤول بالرد عليك:',
      support_label: 'الدعم الفني واستفسارات المستخدمين:',
      ads_label: 'طلبات النشر وإعلانات Google AdSense:',
      dmca_label: 'إشعارات حقوق الملكية الفكرية (DMCA):',
      hours_title: 'مواعيد العمل وسرعة الاستجابة',
      hours_desc: 'فريق خدمة العملاء والمراقبة التقنية يعمل على مدار الأسبوع (24/7). يتم فحص الرسائل والرد عليها في غضون 24 إلى 48 ساعة.',
      dmca_title: 'لأصحاب حقوق النشر والتوزيع',
      dmca_desc: 'يرجى تضمين رابط العمل الدقيق على المنصة مع وثيقة إثبات الملكية لنتولى الحجب الفوري للرابط.',
      form_title: 'نموذج المراسلة الفوري',
      form_desc: 'املأ الحقول التالية وسيتواصل معك الفريق المختص بأسرع وقت ممكن.',
      name_label: 'الاسم الكامل',
      email_label: 'البريد الإلكتروني',
      subject_label: 'موضوع الرسالة',
      message_label: 'تفاصيل الرسالة',
      subj_opt_general: 'استفسار عام أو اقتراح',
      subj_opt_support: 'مساعدة فنية أو مشكلة في تشغيل رابط',
      subj_opt_subtitles: 'اقتراح ترجمة أو تعديل تزامن',
      subj_opt_dmca: 'إشعار حقوق ملكية فكرية (DMCA)',
      subj_opt_ads: 'استفسارات الإعلانات والشراكات',
      btn_send: 'إرسال الرسالة الآن',
      btn_sending: 'جاري الإرسال...',
      err_name: 'يرجى إدخال اسمك الكريم بشكل صحيح.',
      err_email: 'يرجى إدخال بريد إلكتروني صالح للتواصل.',
      err_msg: 'يرجى كتابة رسالة توضيحية لا تقل عن 10 أحرف.',
      success_msg: 'تم إرسال رسالتك بنجاح! سيتم الرد عليك في أقرب وقت.',
    },
    en: {
      badge: 'We are always here to listen and help',
      title: 'Contact Us & Official Channels',
      desc: 'We are eager to receive your questions, suggestions to enhance the platform, or DMCA copyright notices and advertising inquiries.',
      official_email: 'Official Support Emails',
      email_hint: 'You can write directly to our departments, and our team will get back to you promptly:',
      support_label: 'Technical Support & User Inquiries:',
      ads_label: 'Publishing & Google AdSense Inquiries:',
      dmca_label: 'Copyright & DMCA Inquiries:',
      hours_title: 'Operating Hours & Response Times',
      hours_desc: 'Our customer support and infrastructure team monitors requests 24/7. Messages are processed within 24 to 48 hours.',
      dmca_title: 'Notice for Copyright Owners',
      dmca_desc: 'Please provide exact links on our platform along with proof of ownership for swift takedown processing within 48h.',
      form_title: 'Instant Message Form',
      form_desc: 'Fill out the form below and the appropriate department will reply to you as soon as possible.',
      name_label: 'Full Name',
      email_label: 'Email Address',
      subject_label: 'Subject',
      message_label: 'Message Details',
      subj_opt_general: 'General inquiry or suggestion',
      subj_opt_support: 'Technical issue or playback problem',
      subj_opt_subtitles: 'Subtitle sync feedback or suggestion',
      subj_opt_dmca: 'DMCA Copyright Notice',
      subj_opt_ads: 'AdSense & Business Partnership',
      btn_send: 'Send Message Now',
      btn_sending: 'Sending...',
      err_name: 'Please enter a valid name.',
      err_email: 'Please enter a valid email address.',
      err_msg: 'Please write a message of at least 10 characters.',
      success_msg: 'Your message was sent successfully! We will get back to you shortly.',
    },
    fr: {
      badge: 'Nous sommes à votre écoute',
      title: 'Contactez-nous & Canaux Officiels',
      desc: 'N’hésitez pas à nous envoyer vos remarques, demandes de partenariat ou notifications relatives aux droits d’auteur.',
      official_email: 'Adresses E-mail Officielles',
      email_hint: 'Vous pouvez écrire directement à nos équipes pour une réponse personnalisée :',
      support_label: 'Support Technique & Utilisateurs :',
      ads_label: 'Publicité & Google AdSense :',
      dmca_label: 'Droits d’Auteur & DMCA :',
      hours_title: 'Horaires & Délais de Réponse',
      hours_desc: 'Notre équipe est active 24h/24 et 7j/7. Nous traitons l’ensemble des demandes dans un délai de 24 à 48 heures.',
      dmca_title: 'Titualires de Droits & DMCA',
      dmca_desc: 'Veuillez joindre l’URL exacte ainsi qu’un justificatif légal pour un retrait rapide.',
      form_title: 'Formulaire de Contact Direct',
      form_desc: 'Complétez les champs ci-dessous pour contacter directement notre équipe.',
      name_label: 'Nom complet',
      email_label: 'Adresse e-mail',
      subject_label: 'Sujet du message',
      message_label: 'Votre message',
      subj_opt_general: 'Question générale ou suggestion',
      subj_opt_support: 'Problème technique de lecture',
      subj_opt_subtitles: 'Retour sur les sous-titres',
      subj_opt_dmca: 'Notification DMCA / Droits d’auteur',
      subj_opt_ads: 'Publicité & Partenariats',
      btn_send: 'Envoyer le Message',
      btn_sending: 'Envoi en cours...',
      err_name: 'Veuillez renseigner votre nom complet.',
      err_email: 'Veuillez renseigner une adresse e-mail valide.',
      err_msg: 'Votre message doit contenir au moins 10 caractères.',
      success_msg: 'Message envoyé avec succès ! Nous vous répondrons rapidement.',
    },
    es: {
      badge: 'Estamos listos para ayudarte',
      title: 'Contáctanos y Canales Oficiales',
      desc: 'Recibimos con gusto tus consultas, sugerencias de mejora, avisos de derechos de autor o consultas de publicidad.',
      official_email: 'Correos Electrónicos Oficiales',
      email_hint: 'Escríbenos directamente y nuestro equipo te responderá a la brevedad:',
      support_label: 'Soporte Técnico y Consultas:',
      ads_label: 'Publicidad y Google AdSense:',
      dmca_label: 'Derechos de Autor (DMCA):',
      hours_title: 'Horarios y Tiempo de Respuesta',
      hours_desc: 'Trabajamos 24/7. Todas las solicitudes son atendidas en un plazo máximo de 24 a 48 horas.',
      dmca_title: 'Aviso para Propietarios de Derechos',
      dmca_desc: 'Incluye los enlaces exactos y prueba de titularidad para la eliminación rápida del contenido indexado.',
      form_title: 'Formulario de Mensaje Rápido',
      form_desc: 'Completa los siguientes campos para que el equipo adecuado te contacte.',
      name_label: 'Nombre completo',
      email_label: 'Correo electrónico',
      subject_label: 'Asunto',
      message_label: 'Mensaje',
      subj_opt_general: 'Consulta general o sugerencia',
      subj_opt_support: 'Problema de reproducción o enlace',
      subj_opt_subtitles: 'Comentarios sobre subtítulos',
      subj_opt_dmca: 'Aviso de infracción DMCA',
      subj_opt_ads: 'Publicidad y Alianzas',
      btn_send: 'Enviar Mensaje Ahora',
      btn_sending: 'Enviando...',
      err_name: 'Por favor, introduce tu nombre.',
      err_email: 'Por favor, introduce un correo electrónico válido.',
      err_msg: 'El mensaje debe contener al menos 10 caracteres.',
      success_msg: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
    },
    tr: {
      badge: 'Size her zaman yardımcı olmaya hazırız',
      title: 'İletişim ve Resmi Kanallar',
      desc: 'Sorularınızı, platformu geliştirme önerilerinizi veya telif hakkı bildirimlerinizi almaktan memnuniyet duyarız.',
      official_email: 'Resmi Destek E-postaları',
      email_hint: 'İlgili departmana doğrudan e-posta gönderebilirsiniz:',
      support_label: 'Teknik Destek ve Kullanıcı Soruları:',
      ads_label: 'Yayıncılık ve Google AdSense:',
      dmca_label: 'Telif Hakkı ve DMCA Bildirimleri:',
      hours_title: 'Çalışma Saatleri ve Yanıt Süresi',
      hours_desc: 'Ekibimiz 7/24 çalışmaktadır. Talepler 24 ila 48 saat içerisinde incelenir ve yanıtlanır.',
      dmca_title: 'Telif Hakkı Sahipleri İçin',
      dmca_desc: 'Lütfen bağlantıyı ve sahiplik belgenizi ekleyin; içerik 48 saat içinde hızla kaldırılır.',
      form_title: 'Hızlı İletişim Formu',
      form_desc: 'Aşağıdaki formu doldurun, ilgili departmanımız size en kısa sürede dönüş yapsın.',
      name_label: 'Ad Soyad',
      email_label: 'E-posta Adresi',
      subject_label: 'Konu',
      message_label: 'Mesajınız',
      subj_opt_general: 'Genel soru veya öneri',
      subj_opt_support: 'Teknik sorun veya oynatma problemi',
      subj_opt_subtitles: 'Altyazı senkronizasyon bildirimi',
      subj_opt_dmca: 'Telif Hakkı / DMCA Bildirimi',
      subj_opt_ads: 'Reklam ve Ortaklık',
      btn_send: 'Mesajı Gönder',
      btn_sending: 'Gönderiliyor...',
      err_name: 'Lütfen geçerli bir ad girin.',
      err_email: 'Lütfen geçerli bir e-posta adresi girin.',
      err_msg: 'Mesajınız en az 10 karakter olmalıdır.',
      success_msg: 'Mesajınız başarıyla iletildi! En kısa sürede yanıtlanacaktır.',
    },
  };

  const c = localizedText[lang] || localizedText.ar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ type: 'error', message: c.err_name });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ type: 'error', message: c.err_email });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ type: 'error', message: c.err_msg });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: c.success_msg,
        });
        setFormData({ name: '', email: '', subject: 'general', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to submit',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error, please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200 font-sans flex flex-col selection:bg-red-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header with working language switcher */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-[#13151f] to-[#07080b] border-b border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/25 text-red-400 text-xs font-bold mb-4 shadow">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {c.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            {c.desc}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
        <AdBanner slot="2915749616" label="Google AdSense" className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Info (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-red-500" />
                <span>{c.official_email}</span>
              </h2>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                {c.email_hint}
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-400 font-medium">{c.support_label}</div>
                    <a href="mailto:support@falaktv.app" className="text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 transition">
                      support@falaktv.app
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-400 font-medium">{c.ads_label}</div>
                    <a href="mailto:ads@falaktv.app" className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition">
                      ads@falaktv.app
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-400 font-medium">{c.dmca_label}</div>
                    <a href="mailto:dmca@falaktv.app" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition">
                      dmca@falaktv.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0e1017] border border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{c.hours_title}</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {c.hours_desc}
              </p>
            </div>

            <div className="bg-[#0e1017] border border-amber-500/20 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>{c.dmca_title}</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {c.dmca_desc}
              </p>
            </div>
          </div>

          {/* Interactive Form (7 columns) */}
          <div className="lg:col-span-7 bg-[#0e1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">{c.form_title}</h2>
            <p className="text-xs text-gray-400 mb-6">{c.form_desc}</p>

            {status && (
              <div
                className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm flex items-start gap-3 border ${
                  status.type === 'success'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/60 border-red-500/40 text-red-300'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                )}
                <div className="leading-relaxed">{status.message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    {c.name_label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / محمد"
                    className="w-full bg-[#13151f] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    {c.email_label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#13151f] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {c.subject_label} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#13151f] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition"
                >
                  <option value="general">{c.subj_opt_general}</option>
                  <option value="support">{c.subj_opt_support}</option>
                  <option value="subtitles">{c.subj_opt_subtitles}</option>
                  <option value="dmca">{c.subj_opt_dmca}</option>
                  <option value="ads">{c.subj_opt_ads}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {c.message_label} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="..."
                  className="w-full bg-[#13151f] border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition resize-y min-h-[120px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{c.btn_sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{c.btn_send}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <AdBanner slot="2915749617" label="Google AdSense" className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
