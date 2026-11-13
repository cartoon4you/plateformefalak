import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'يرجى إدخال اسم صحيح لا يقل عن حرفين.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'يرجى إدخال بريد إلكتروني صالح للتواصل.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'يرجى كتابة رسالة واضحة لا تقل عن 10 أحرف.' },
        { status: 400 }
      );
    }

    // Log received inquiry for administration (in real environment can be stored in Firestore or dispatched via SMTP)
    console.log('[Contact Inquiry Received]:', {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject || 'عام',
      messageLength: message.trim().length,
    });

    return NextResponse.json({
      success: true,
      message: 'تم استلام رسالتك بنجاح! سيقوم فريق الدعم بالتواصل معك خلال 24 إلى 48 ساعة.',
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ غير متوقع أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
