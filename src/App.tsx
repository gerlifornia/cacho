/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Play, Instagram, MessageCircle, Sparkles, X, ChevronLeft, ChevronRight, Globe, ArrowUpRight } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import YouTube from 'react-youtube';

const CLARIN_LOGO_SRC = 'data:image/png;base64,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';

// --- CONFIGURACIÓN DE IDIOMAS ---
type Language = 'es' | 'en' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'id';

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
];

const TRANSLATIONS: Record<Language, any> = {
  es: {
    nav: { trabajos: 'Trabajos', nosotros: 'Nosotros', contacto: 'Contacto' },
    hero: {
      eyebrow: 'LA PRIMERA PRODUCTORA CREATIVA 100% IA DE LATAM',
      title1: 'CREATIVIDAD',
      title2: 'HUMANA.',
      title3: 'POTENCIA',
      subtitle: 'Creamos piezas que sorprenden y hacen hablar.',
      badge: 'SIN ACTORES EGOCÉNTRICOS',
      services: ['COMERCIALES', 'CINE', 'INSTITUCIONALES', 'UGC']
    },
    nosotros: {
      title: 'EL MUNDO CAMBIÓ.',
      subtitle: 'LA FORMA DE HACER VIDEOS TAMBIÉN.',
      p1: 'La producción audiovisual tradicional es lenta, costosa y está limitada por el mundo físico. Locaciones, actores, clima, presupuestos gigantescos... todo eso quedó en el pasado.',
      p2Part1: 'En',
      p2Part2: 'no grabamos,',
      p2Part3: 'creamos',
      p2Part4: '. Utilizamos Inteligencia Artificial generativa de última generación para transformar ideas en realidades visuales sin ningún tipo de límite.',
      cards: [
        { title: 'Creatividad Infinita', text: '¿Un comercial en Marte? ¿Un videoclip cyberpunk? Si podés imaginarlo, podemos generarlo.' },
        { title: 'Tiempos Récord', text: 'Lo que antes tardaba meses de rodaje y postproducción, ahora lo resolvemos en una fracción del tiempo.' },
        { title: 'Optimización', text: 'Reducimos drásticamente los costos operativos sin sacrificar calidad cinematográfica.' }
      ],
      cta: 'No te quedes atrás. El futuro de tu marca se genera con IA.'
    },
    contact: {
      title: '¿Hacemos algo increíble?',
      subtitle: 'Escribinos y contanos tu idea. El futuro es hoy.'
    }
  },
  en: {
    nav: { trabajos: 'Work', nosotros: 'About Us', contacto: 'Contact' },
    hero: {
      title1: 'WE CREATE',
      title2: 'VIDEOS',
      title3: 'WITH',
      subtitle: 'Audiovisual production company specialized in Artificial Intelligence. Commercials, cinema, corporate videos, streaming, and UGC content without limits.'
    },
    nosotros: {
      title: 'THE WORLD CHANGED.',
      subtitle: 'SO DID VIDEO PRODUCTION.',
      p1: 'Traditional audiovisual production is slow, expensive, and limited by the physical world. Locations, actors, weather, huge budgets... all that is in the past.',
      p2Part1: 'At',
      p2Part2: 'we don\'t film,',
      p2Part3: 'we create',
      p2Part4: '. We use state-of-the-art generative Artificial Intelligence to transform ideas into visual realities with absolutely no limits.',
      cards: [
        { title: 'Infinite Creativity', text: 'A commercial on Mars? A cyberpunk music video? If you can imagine it, we can generate it.' },
        { title: 'Record Times', text: 'What used to take months of shooting and post-production, we now solve in a fraction of the time.' },
        { title: 'Optimization', text: 'We drastically reduce operating costs without sacrificing cinematic quality.' }
      ],
      cta: 'Don\'t get left behind. The future of your brand is generated with AI.'
    },
    contact: {
      title: 'Let\'s make something incredible?',
      subtitle: 'Write to us and tell us your idea. The future is today.'
    }
  },
  zh: {
    nav: { trabajos: '作品', nosotros: '关于我们', contacto: '联系方式' },
    hero: { title1: '我们用', title2: 'AI', title3: '制作视频', subtitle: '专注于人工智能的视听制作公司。无限制的广告、电影、企业视频、流媒体和UGC内容。' },
    nosotros: {
      title: '世界变了。', subtitle: '视频制作方式也变了。',
      p1: '传统的视听制作缓慢、昂贵，且受物理世界的限制。地点、演员、天气、巨大的预算……这一切都已成为过去。',
      p2Part1: '在', p2Part2: '我们不拍摄，', p2Part3: '我们创造', p2Part4: '。我们使用最先进的生成式人工智能，将创意转化为没有任何限制的视觉现实。',
      cards: [
        { title: '无限创意', text: '火星上的广告？赛博朋克音乐视频？如果你能想象，我们就能生成。' },
        { title: '创纪录的时间', text: '以前需要数月拍摄和后期制作的工作，现在我们只需很短的时间就能完成。' },
        { title: '优化', text: '我们在不牺牲电影质量的情况下大幅降低运营成本。' }
      ],
      cta: '不要落后。你品牌的未来由AI生成。'
    },
    contact: { title: '让我们做点不可思议的事？', subtitle: '写信给我们，告诉我们你的想法。未来就在今天。' }
  },
  hi: {
    nav: { trabajos: 'काम', nosotros: 'हमारे बारे में', contacto: 'संपर्क' },
    hero: { title1: 'हम', title2: 'AI', title3: 'वीडियो बनाते हैं', subtitle: 'आर्टिफिशियल इंटेलिजेंस में विशेषज्ञता रखने वाली ऑडियोविजुअल प्रोडक्शन कंपनी। विज्ञापन, सिनेमा, कॉर्पोरेट वीडियो, स्ट्रीमिंग और यूजीसी सामग्री बिना किसी सीमा के।' },
    nosotros: {
      title: 'दुनिया बदल गई है।', subtitle: 'वीडियो बनाने का तरीका भी।',
      p1: 'पारंपरिक ऑडियोविजुअल प्रोडक्शन धीमा, महंगा और भौतिक दुनिया द्वारा सीमित है। स्थान, अभिनेता, मौसम, विशाल बजट... वह सब अतीत की बात है।',
      p2Part1: 'पर', p2Part2: 'हम फिल्म नहीं करते,', p2Part3: 'हम बनाते हैं', p2Part4: '। हम विचारों को बिना किसी सीमा के दृश्य वास्तविकताओं में बदलने के लिए अत्याधुनिक जनरेटिव आर्टिफिशियल इंटेलिजेंस का उपयोग करते हैं।',
      cards: [
        { title: 'अनंत रचनात्मकता', text: 'मंगल ग्रह पर एक विज्ञापन? एक साइबरपंक संगीत वीडियो? यदि आप इसकी कल्पना कर सकते हैं, तो हम इसे उत्पन्न कर सकते हैं।' },
        { title: 'रिकॉर्ड समय', text: 'जिसमें महीनों की शूटिंग और पोस्ट-प्रोडक्शन लगता था, अब हम उसे बहुत कम समय में हल करते हैं।' },
        { title: 'अनुकूलन', text: 'हम सिनेमाई गुणवत्ता का त्याग किए बिना परिचालन लागत को काफी कम करते हैं।' }
      ],
      cta: 'पीछे न रहें। आपके ब्रांड का भविष्य AI के साथ उत्पन्न होता है।'
    },
    contact: { title: 'चलो कुछ अविश्वसनीय करते हैं?', subtitle: 'हमें लिखें और अपना विचार बताएं। भविष्य आज है।' }
  },
  fr: {
    nav: { trabajos: 'Travaux', nosotros: 'À Propos', contacto: 'Contact' },
    hero: { title1: 'NOUS CRÉONS', title2: 'DES VIDÉOS', title3: 'AVEC L\'IA', subtitle: 'Société de production audiovisuelle spécialisée dans l\'Intelligence Artificielle. Publicités, cinéma, vidéos institutionnelles, streaming et contenu UGC sans limites.' },
    nosotros: {
      title: 'LE MONDE A CHANGÉ.', subtitle: 'LA PRODUCTION VIDÉO AUSSI.',
      p1: 'La production audiovisuelle traditionnelle est lente, coûteuse et limitée par le monde physique. Lieux, acteurs, météo, budgets énormes... tout cela appartient au passé.',
      p2Part1: 'Chez', p2Part2: 'nous ne filmons pas,', p2Part3: 'nous créons', p2Part4: '. Nous utilisons l\'Intelligence Artificielle générative de pointe pour transformer des idées en réalités visuelles sans aucune limite.',
      cards: [
        { title: 'Créativité Infinie', text: 'Une publicité sur Mars ? Un clip cyberpunk ? Si vous pouvez l\'imaginer, nous pouvons le générer.' },
        { title: 'Temps Records', text: 'Ce qui prenait des mois de tournage et de post-production, nous le résolvons maintenant en une fraction du temps.' },
        { title: 'Optimisation', text: 'Nous réduisons considérablement les coûts d\'exploitation sans sacrifier la qualité cinématographique.' }
      ],
      cta: 'Ne restez pas à la traîne. L\'avenir de votre marque est généré par l\'IA.'
    },
    contact: { title: 'Faisons quelque chose d\'incroyable ?', subtitle: 'Écrivez-nous et racontez-nous votre idée. Le futur est aujourd\'hui.' }
  },
  ar: {
    nav: { trabajos: 'أعمالنا', nosotros: 'من نحن', contacto: 'اتصل بنا' },
    hero: { title1: 'نحن ننشئ', title2: 'فيديوهات', title3: 'بالذكاء الاصطناعي', subtitle: 'شركة إنتاج سمعي بصري متخصصة في الذكاء الاصطناعي. إعلانات، سينما، فيديوهات مؤسسية، بث مباشر، ومحتوى UGC بلا حدود.' },
    nosotros: {
      title: 'العالم تغير.', subtitle: 'وكذلك طريقة إنتاج الفيديو.',
      p1: 'الإنتاج السمعي البصري التقليدي بطيء ومكلف ومحدود بالعالم المادي. المواقع، الممثلون، الطقس، الميزانيات الضخمة... كل ذلك أصبح من الماضي.',
      p2Part1: 'في', p2Part2: 'نحن لا نصور،', p2Part3: 'نحن نبتكر', p2Part4: '. نستخدم الذكاء الاصطناعي التوليدي المتطور لتحويل الأفكار إلى واقع مرئي بلا أي حدود.',
      cards: [
        { title: 'إبداع لا نهائي', text: 'إعلان على المريخ؟ فيديو موسيقي سايبربانك؟ إذا كنت تستطيع تخيله، يمكننا إنشاؤه.' },
        { title: 'أوقات قياسية', text: 'ما كان يستغرق شهورًا من التصوير وما بعد الإنتاج، نحله الآن في جزء بسيط من الوقت.' },
        { title: 'تحسين', text: 'نقلل تكاليف التشغيل بشكل كبير دون التضحية بالجودة السينمائية.' }
      ],
      cta: 'لا تتخلف عن الركب. مستقبل علامتك التجارية يتم إنشاؤه بواسطة الذكاء الاصطناعي.'
    },
    contact: { title: 'لنصنع شيئًا مذهلاً؟', subtitle: 'اكتب لنا وأخبرنا بفكرتك. المستقبل هو اليوم.' }
  },
  bn: {
    nav: { trabajos: 'কাজ', nosotros: 'আমাদের সম্পর্কে', contacto: 'যোগাযোগ' },
    hero: { title1: 'আমরা', title2: 'ভিডিও', title3: 'তৈরি করি AI দিয়ে', subtitle: 'আর্টিফিশিয়াল ইন্টেলিজেন্সে বিশেষায়িত অডিওভিজুয়াল প্রোডাকশন কোম্পানি। বিজ্ঞাপন, সিনেমা, কর্পোরেট ভিডিও, স্ট্রিমিং এবং ইউজিসি কন্টেন্ট কোনো সীমা ছাড়াই।' },
    nosotros: {
      title: 'বিশ্ব বদলে গেছে।', subtitle: 'ভিডিও তৈরির পদ্ধতিও।',
      p1: 'ঐতিহ্যবাহী অডিওভিজুয়াল প্রোডাকশন ধীর, ব্যয়বহুল এবং ভৌত জগত দ্বারা সীমাবদ্ধ। লোকেশন, অভিনেতা, আবহাওয়া, বিশাল বাজেট... সেসব এখন অতীত।',
      p2Part1: 'এখানে', p2Part2: 'আমরা ফিল্ম করি না,', p2Part3: 'আমরা সৃষ্টি করি', p2Part4: '। আমরা কোনো সীমা ছাড়াই ধারণাগুলিকে ভিজ্যুয়াল বাস্তবে রূপান্তর করতে অত্যাধুনিক জেনারেটিভ আর্টিফিশিয়াল ইন্টেলিজেন্স ব্যবহার করি।',
      cards: [
        { title: 'অসীম সৃজনশীলতা', text: 'মঙ্গলে একটি বিজ্ঞাপন? একটি সাইবারপাঙ্ক মিউজিক ভিডিও? আপনি যদি এটি কল্পনা করতে পারেন, আমরা এটি তৈরি করতে পারি।' },
        { title: 'রেকর্ড সময়', text: 'শুটিং এবং পোস্ট-প্রোডাকশনে যা মাস লাগত, এখন আমরা তা খুব অল্প সময়ে সমাধান করি।' },
        { title: 'অপ্টিমাইজেশন', text: 'আমরা সিনেমাটিক গুণমান ত্যাগ না করেই পরিচালন ব্যয় ব্যাপকভাবে হ্রাস করি।' }
      ],
      cta: 'পিছিয়ে থাকবেন না। আপনার ব্র্যান্ডের ভবিষ্যৎ AI দিয়ে তৈরি।'
    },
    contact: { title: 'চলুন অবিশ্বাস্য কিছু করি?', subtitle: 'আমাদের লিখুন এবং আপনার ধারণা বলুন। ভবিষ্যৎ আজই।' }
  },
  pt: {
    nav: { trabajos: 'Trabalhos', nosotros: 'Sobre Nós', contacto: 'Contato' },
    hero: { title1: 'CRIAMOS', title2: 'VÍDEOS', title3: 'COM IA', subtitle: 'Produtora audiovisual especializada em Inteligência Artificial. Comerciais, cinema, vídeos institucionais, streaming e conteúdo UGC sem limites.' },
    nosotros: {
      title: 'O MUNDO MUDOU.', subtitle: 'A FORMA DE FAZER VÍDEOS TAMBÉM.',
      p1: 'A produção audiovisual tradicional é lenta, cara e limitada pelo mundo físico. Locações, atores, clima, orçamentos gigantescos... tudo isso ficou no passado.',
      p2Part1: 'Na', p2Part2: 'não gravamos,', p2Part3: 'criamos', p2Part4: '. Utilizamos Inteligência Artificial generativa de última geração para transformar ideias em realidades visuais sem nenhum tipo de limite.',
      cards: [
        { title: 'Criatividade Infinita', text: 'Um comercial em Marte? Um videoclipe cyberpunk? Se você pode imaginar, podemos gerar.' },
        { title: 'Tempos Recorde', text: 'O que antes demorava meses de filmagem e pós-produção, agora resolvemos em uma fração do tempo.' },
        { title: 'Otimização', text: 'Reduzimos drasticamente os custos operacionais sem sacrificar a qualidade cinematográfica.' }
      ],
      cta: 'Não fique para trás. O futuro da sua marca é gerado com IA.'
    },
    contact: { title: 'Vamos fazer algo incrível?', subtitle: 'Escreva para nós e conte sua ideia. O futuro é hoje.' }
  },
  ru: {
    nav: { trabajos: 'Работы', nosotros: 'О нас', contacto: 'Контакты' },
    hero: { title1: 'МЫ СОЗДАЕМ', title2: 'ВИДЕО', title3: 'С ИИ', subtitle: 'Аудиовизуальная продюсерская компания, специализирующаяся на искусственном интеллекте. Реклама, кино, корпоративные видео, стриминг и UGC контент без границ.' },
    nosotros: {
      title: 'МИР ИЗМЕНИЛСЯ.', subtitle: 'СПОСОБ СОЗДАНИЯ ВИДЕО ТОЖЕ.',
      p1: 'Традиционное аудиовизуальное производство медленное, дорогое и ограничено физическим миром. Локации, актеры, погода, огромные бюджеты... все это в прошлом.',
      p2Part1: 'В', p2Part2: 'мы не снимаем,', p2Part3: 'мы создаем', p2Part4: '. Мы используем передовой генеративный искусственный интеллект для превращения идей в визуальную реальность без каких-либо ограничений.',
      cards: [
        { title: 'Бесконечное творчество', text: 'Реклама на Марсе? Киберпанк музыкальное видео? Если вы можете это представить, мы можем это создать.' },
        { title: 'Рекордные сроки', text: 'То, что раньше занимало месяцы съемок и пост-продакшна, теперь мы решаем за долю времени.' },
        { title: 'Оптимизация', text: 'Мы значительно сокращаем операционные расходы, не жертвуя кинематографическим качеством.' }
      ],
      cta: 'Не отставайте. Будущее вашего бренда создается с помощью ИИ.'
    },
    contact: { title: 'Сделаем что-то невероятное?', subtitle: 'Напишите нам и расскажите о своей идее. Будущее уже сегодня.' }
  },
  id: {
    nav: { trabajos: 'Karya', nosotros: 'Tentang Kami', contacto: 'Kontak' },
    hero: { title1: 'KAMI MEMBUAT', title2: 'VIDEO', title3: 'DENGAN AI', subtitle: 'Perusahaan produksi audiovisual yang berspesialisasi dalam Kecerdasan Buatan. Iklan, bioskop, video institusional, streaming, dan konten UGC tanpa batas.' },
    nosotros: {
      title: 'DUNIA TELAH BERUBAH.', subtitle: 'CARA MEMBUAT VIDEO JUGA.',
      p1: 'Produksi audiovisual tradisional lambat, mahal, dan dibatasi oleh dunia fisik. Lokasi, aktor, cuaca, anggaran besar... semua itu ada di masa lalu.',
      p2Part1: 'Di', p2Part2: 'kami tidak merekam,', p2Part3: 'kami menciptakan', p2Part4: '. Kami menggunakan Kecerdasan Buatan generatif canggih untuk mengubah ide menjadi realitas visual tanpa batas apa pun.',
      cards: [
        { title: 'Kreativitas Tanpa Batas', text: 'Iklan di Mars? Video musik cyberpunk? Jika Anda bisa membayangkannya, kami bisa membuatnya.' },
        { title: 'Waktu Rekor', text: 'Apa yang dulunya memakan waktu berbulan-bulan syuting dan pasca-produksi, sekarang kami selesaikan dalam waktu singkat.' },
        { title: 'Optimasi', text: 'Kami secara drastis mengurangi biaya operasional tanpa mengorbankan kualitas sinematik.' }
      ],
      cta: 'Jangan tertinggal. Masa depan merek Anda dihasilkan dengan AI.'
    },
    contact: { title: 'Mari buat sesuatu yang luar biasa?', subtitle: 'Tulis kepada kami dan ceritakan ide Anda. Masa depan adalah hari ini.' }
  }
};

// Helper para traducciones simples de descripciones comunes
const COMMON_DESCS: Record<string, Record<Language, string>> = {
  ai_100: {
    es: "Video 100% hecho con IA", en: "100% AI-made video", zh: "100% AI制作的视频", hi: "100% AI द्वारा निर्मित वीडियो",
    fr: "Vidéo 100% faite par IA", ar: "فيديو مصنوع 100% بالذكاء الاصطناعي", bn: "১০০% এআই দিয়ে তৈরি ভিডিও",
    pt: "Vídeo 100% feito com IA", ru: "Видео 100% создано ИИ", id: "Video 100% dibuat dengan AI"
  },
  generated_ai: {
    es: "Generado con IA", en: "Generated with AI", zh: "由AI生成", hi: "AI के साथ उत्पन्न",
    fr: "Généré par IA", ar: "تم إنشاؤه بواسطة الذكاء الاصطناعي", bn: "এআই দিয়ে তৈরি",
    pt: "Gerado com IA", ru: "Создано с помощью ИИ", id: "Dihasilkan dengan AI"
  },
  commercial_ai: {
    es: "Comercial 100% IA", en: "100% AI Commercial", zh: "100% AI广告", hi: "100% AI विज्ञापन",
    fr: "Publicité 100% IA", ar: "إعلان 100% ذكاء اصطناعي", bn: "১০০% এআই বিজ্ঞাপন",
    pt: "Comercial 100% IA", ru: "100% ИИ реклама", id: "Iklan 100% AI"
  },
  music_video: {
    es: "Videoclip Musical IA", en: "AI Music Video", zh: "AI音乐视频", hi: "AI संगीत वीडियो",
    fr: "Clip musical IA", ar: "فيديو موسيقي بالذكاء الاصطناعي", bn: "এআই মিউজিক ভিডিও",
    pt: "Videoclipe IA", ru: "ИИ музыкальное видео", id: "Video Musik AI"
  }
};

// Lista de videos con soporte multilenguaje
const localizedTitle = (title: string): Record<Language, string> =>
  Object.fromEntries(LANGUAGES.map(({ code }) => [code, title])) as Record<Language, string>;

const VIDEOS = [
  {
    id: "oomjGUHKFlY", isShort: false,
    titles: localizedTitle("Creactive Hub x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "67FMhfAcCBk", isShort: false,
    titles: localizedTitle("Publicidad Mundial Argentina x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "f7KgP33ytiA", isShort: false,
    titles: localizedTitle("Avianca animada x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "otJEBDL1NXQ", isShort: false,
    titles: localizedTitle("AVIANCA  seguros de la tierra al cielo x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "IBh1BRPHbKo", isShort: false,
    titles: localizedTitle("Otro Dia Perdido x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "_16VPifqFgc", isShort: false,
    titles: localizedTitle("Mercedes Corta x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "2Y8FpsZsIoo", isShort: false,
    titles: localizedTitle("Torbe x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "U2EtsosufFI", isShort: false,
    titles: localizedTitle("Campenella x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "zgWuAf2bI7A", isShort: true,
    titles: localizedTitle("Borges x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "2tQwIZGvhPk", isShort: true,
    titles: localizedTitle("Nike x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "IMMDsV006bk", isShort: true,
    titles: localizedTitle("Al Pastor Taco: Best Central Midfielder"),
    descKey: "generated_ai"
  },
  {
    id: "sMqvtb7PvSQ", isShort: true,
    titles: localizedTitle("Miss v x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "uuA2uO6F1n4", isShort: true,
    titles: localizedTitle("Fernet x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "aeJ72DcaYC0", isShort: true,
    titles: localizedTitle("Liliana x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "_sQgV29AmKQ", isShort: true,
    titles: localizedTitle("Liliana x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "8jIrO55s1FM", isShort: true,
    titles: localizedTitle("Tau x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "tTIRyt2Fmas", isShort: true,
    titles: localizedTitle("Franui x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "-YkX1zSSMvQ", isShort: true,
    titles: localizedTitle("Manchester x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "I4ZDCC7B6Bg", isShort: true,
    titles: localizedTitle("Colgate x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "Hcvqa2eruh8", isShort: true,
    titles: localizedTitle("Mercado pago x cacho"),
    descKey: "generated_ai"
  }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'trabajos' | 'nosotros'>('trabajos');
  
  // Inicializar idioma desde la URL (?lang=en) o el navegador
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    if (langParam && LANGUAGES.some(l => l.code === langParam)) return langParam;
    
    const browserLang = navigator.language.split('-')[0] as Language;
    if (LANGUAGES.some(l => l.code === browserLang)) return browserLang;
    
    return 'es';
  });

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const playerRef = useRef<any>(null);

  // Actualizar el atributo lang del HTML para SEO
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Cambiar idioma y actualizar URL
  const handleLanguageChange = (langCode: Language) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    const newUrl = `${window.location.pathname}?lang=${langCode}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Hide WhatsApp on scroll bottom
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
      setShowWhatsApp(!bottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = useCallback((tab: 'trabajos' | 'nosotros') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : VIDEOS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev !== null && prev < VIDEOS.length - 1 ? prev + 1 : 0));
  }, []);

  // Touch handlers para swipe en móviles
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleNext, handlePrevious]);

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white relative">
      {/* Header Semántico */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Logo y Selector de Idioma */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
              onClick={() => handleTabChange('trabajos')}
            >
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#F27D26]" />
              <h1 className="font-bold text-lg sm:text-2xl tracking-tighter">cacho<span className="text-[#F27D26]">.ai</span></h1>
            </motion.div>
            
            {/* Language Selector (Absolute positioned below logo) */}
            <div className="absolute top-full left-0 mt-1" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-[10px] sm:text-xs text-white/50 hover:text-white transition-colors uppercase font-semibold tracking-wider"
              >
                <Globe className="w-3 h-3" />
                {currentLang.toUpperCase()}
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[160px] z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${currentLang === lang.code ? 'text-[#F27D26]' : 'text-white'}`}
                      >
                        <span>{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 sm:gap-6"
          >
            <button 
              onClick={() => handleTabChange('trabajos')}
              className={`text-[10px] sm:text-sm font-semibold uppercase tracking-widest transition-colors ${activeTab === 'trabajos' ? 'text-[#F27D26]' : 'text-white/70 hover:text-white'}`}
            >
              {t.nav.trabajos}
            </button>
            <button 
              onClick={() => handleTabChange('nosotros')}
              className={`text-[10px] sm:text-sm font-semibold uppercase tracking-widest transition-colors ${activeTab === 'nosotros' ? 'text-[#F27D26]' : 'text-white/70 hover:text-white'}`}
            >
              {t.nav.nosotros}
            </button>
            <a 
              href="#contacto"
              className="text-[10px] sm:text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {t.nav.contacto}
            </a>
          </motion.nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-24 w-full">
        {activeTab === 'trabajos' ? (
          <>
            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 text-left relative overflow-hidden">
              {/* Logo de Fondo (Placeholder - User should replace src) */}
              <div className="absolute top-[15%] -right-16 w-[250px] sm:top-[68%] sm:right-0 sm:-translate-y-1/2 sm:w-[500px] h-[250px] sm:h-[500px] opacity-15 sm:opacity-20 pointer-events-none z-0">
                 {/* Reemplazar este src con la URL del logo real */}
                 <img 
                    src="/logo-cacho.png" 
                    alt="Cacho.ai Logo Background" 
                    className="w-full h-full object-contain mix-blend-screen"
                 />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl relative z-10"
              >
                {currentLang === 'es' ? (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                      <span className="h-2 w-2 rounded-full bg-[#F27D26] shadow-[0_0_14px_rgba(242,125,38,0.9)]" />
                      {t.hero.eyebrow}
                    </div>

                    <h2 className="mt-5 max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.86] tracking-tighter uppercase">
                      {t.hero.title1}<br/>
                      <span className="text-[#F27D26]">{t.hero.title2}</span><br/>
                      {t.hero.title3} <span className="text-[#F27D26]">iA.</span>
                    </h2>

                    <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                      <div className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-[#F27D26] bg-[#F27D26]/10 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-[0.12em] text-[#F27D26] shadow-[0_0_30px_rgba(242,125,38,0.12)]">
                        <Sparkles className="h-4 w-4" />
                        {t.hero.badge}
                      </div>
                      <p className="max-w-md border-l-2 border-white/15 pl-4 text-base sm:text-lg font-medium leading-relaxed text-white/75">
                        {t.hero.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {t.hero.services.map((service: string) => (
                        <span
                          key={service}
                          className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.12em] text-white/55"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-6 uppercase">
                      {t.hero.title1}<br/>
                      <span className="text-[#F27D26]">{t.hero.title2}</span><br/>
                      {t.hero.title3} <span className="text-[#F27D26]">IA.</span>
                    </h2>
                    <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                      {t.hero.subtitle}
                    </p>
                  </>
                )}
              </motion.div>

              {currentLang === 'es' && (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  href="https://www.clarin.com/zonales/cacho-primer-influencer-argentino-masivo-creado-ia_0_P5rpeasv5j.html"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Leer en Clarín la historia de Cacho"
                  className="group relative z-20 mt-8 block w-full max-w-xl overflow-hidden rounded-3xl border border-[#F27D26]/50 bg-gradient-to-br from-[#F27D26]/20 via-zinc-950/95 to-black p-4 shadow-[0_20px_70px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-1 hover:border-[#F27D26] sm:p-5 xl:absolute xl:right-6 xl:top-20 xl:mt-0 xl:w-[360px] xl:max-w-none xl:rotate-2 xl:p-4"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F27D26]/20 blur-3xl transition-opacity group-hover:opacity-90" />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F27D26]">
                        En los medios
                      </span>
                      <div className="inline-flex shrink-0 rounded-lg bg-white px-2.5 py-1.5 shadow-lg">
                        <img
                          src={CLARIN_LOGO_SRC}
                          alt="Clarín"
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F27D26]/50 bg-[#F27D26]/15 text-[#F27D26] transition-transform group-hover:rotate-45 group-hover:bg-[#F27D26] group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="relative mt-4 text-base sm:text-lg font-black uppercase leading-[1.05] tracking-tight text-white">
                    Creamos el primer personaje masivo con <span className="text-[#F27D26]">iA</span> de LATAM.
                  </p>
                  <p className="relative mt-2 text-xs sm:text-sm font-bold text-white/65 transition-colors group-hover:text-white">
                    Conocé la historia en Clarín →
                  </p>
                </motion.a>
              )}
            </section>

            {/* Portfolio Feed - Grilla Responsiva (Izquierda a Derecha) */}
            <section className="px-4 sm:px-6 relative z-10">
              {[false, true].map((isShort) => (
                <div
                  key={isShort ? 'verticales' : 'horizontales'}
                  className={`grid gap-4 sm:gap-6 items-start ${
                    isShort
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 sm:mt-6'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {VIDEOS.map((video, index) => video.isShort === isShort && (
                  <motion.article 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index % 10) * 0.05 }}
                    className={`relative w-full overflow-hidden bg-zinc-900 group cursor-pointer shadow-lg rounded-3xl ${video.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* Usamos la miniatura de alta calidad de YouTube */}
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={`Miniatura del video: ${video.titles[currentLang] || video.titles['es']}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                      <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 leading-tight uppercase line-clamp-3">{video.titles[currentLang] || video.titles['en'] || video.titles['es']}</h3>
                      <p className="text-[11px] sm:text-xs text-white/70 line-clamp-2">{COMMON_DESCS[video.descKey][currentLang] || COMMON_DESCS[video.descKey]['en']}</p>
                    </div>
                  </motion.article>
                  ))}
                </div>
              ))}
            </section>
          </>
        ) : (
          /* Sección Nosotros */
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 max-w-4xl mx-auto relative"
          >
             {/* Logo de Fondo en Nosotros también */}
             <div className="absolute top-0 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] opacity-20 pointer-events-none z-0">
                 <img 
                    src="/logo-cacho.png" 
                    alt="Logo Background" 
                    className="w-full h-full object-contain mix-blend-screen"
                 />
              </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-8 uppercase relative z-10">
              {t.nosotros.title}<br/>
              <span className="text-[#F27D26]">{t.nosotros.subtitle}</span>
            </h2>
            
            <div className="space-y-8 text-white/80 text-lg sm:text-xl leading-relaxed relative z-10">
              <p>
                {t.nosotros.p1}
              </p>
              <p>
                {t.nosotros.p2Part1} <strong className="text-white">Cacho.ai</strong> {t.nosotros.p2Part2} <strong className="text-[#F27D26]">{t.nosotros.p2Part3}</strong>{t.nosotros.p2Part4}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                {t.nosotros.cards.map((card: any, idx: number) => (
                  <div key={idx} className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl">
                    <Sparkles className="w-8 h-8 text-[#F27D26] mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2 uppercase">{card.title}</h3>
                    <p className="text-sm text-white/60">{card.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4 uppercase">
                {t.nosotros.cta}
              </p>
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <section id="contacto" className="mt-24 sm:mt-32 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 uppercase">{t.contact.title}</h2>
            <p className="text-white/60 text-base sm:text-lg mb-8">{t.contact.subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/message/JBNNVGX4UNKBH1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1ebe5d] transition-colors w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a 
                href="https://instagram.com/soycachoo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-colors w-full sm:w-auto"
              >
                <Instagram className="w-5 h-5" />
                @soycachoo
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            href="https://wa.me/message/JBNNVGX4UNKBH1"
            target="_blank"
            rel="noreferrer"
            className={`fixed z-[100] bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#1ebe5d] transition-all flex items-center justify-center ${
              activeIndex !== null 
                ? 'bottom-24 right-4 w-10 h-10 p-0' // Más chico y más arriba cuando hay video
                : 'bottom-6 right-6 px-5 py-3 gap-2' // Tamaño normal
            }`}
          >
            <MessageCircle className={activeIndex !== null ? 'w-5 h-5' : 'w-6 h-6'} />
            {activeIndex === null && (
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            )}
          </motion.a>
        )}
      </AnimatePresence>

      {/* Footer Semántico */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Cacho.ai. Todos los derechos reservados.</p>
        <p className="max-w-4xl mx-auto mt-3 px-6 text-[10px] sm:text-xs leading-relaxed text-white/30">
          Algunas de las piezas exhibidas son SPEC ADS: conceptos audiovisuales independientes y no oficiales, creados por Cacho.ai exclusivamente como demostración creativa de portfolio. Algunas piezas no fueron encargadas, aprobadas, patrocinadas ni producidas en colaboración con las marcas representadas. Los nombres, logotipos, productos y demás elementos identificatorios pertenecen a sus respectivos titulares.
        </p>
      </footer>

      {/* Video Modal con Navegación */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-0"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Controles de Navegación (Desktop & Tablet) */}
            <button 
              onClick={handlePrevious}
              className="hidden sm:flex absolute left-4 sm:left-8 z-50 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Video anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button 
              onClick={handleNext}
              className="hidden sm:flex absolute right-4 sm:right-8 z-50 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Video siguiente"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Contenedor del Video */}
            <div className={`relative w-full mx-auto flex flex-col justify-center ${VIDEOS[activeIndex].isShort ? 'max-w-sm aspect-[9/16]' : 'max-w-5xl aspect-video sm:px-24'}`}>
              
              <div className={`relative w-full h-full shadow-2xl overflow-hidden ${VIDEOS[activeIndex].isShort ? 'rounded-2xl' : 'sm:rounded-2xl'}`}>
                {/* Overlay transparente para capturar swipes y clics */}
                <div 
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => {
                    if (playerRef.current) {
                      const state = playerRef.current.getPlayerState();
                      if (state === 1) playerRef.current.pauseVideo();
                      else playerRef.current.playVideo();
                    }
                  }}
                />
                <YouTube
                  key={VIDEOS[activeIndex].id}
                  videoId={VIDEOS[activeIndex].id}
                  title={VIDEOS[activeIndex].titles[currentLang] || VIDEOS[activeIndex].titles['es']}
                  className="w-full h-full pointer-events-none"
                  iframeClassName="w-full h-full"
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      rel: 0,
                      modestbranding: 1,
                      playsinline: 1,
                      iv_load_policy: 3,
                      cc_load_policy: 0,
                      showinfo: 0,
                      mute: 0, // Asegurar que no esté muteado por defecto
                    },
                  }}
                  onEnd={handleNext}
                  onReady={(e) => {
                    playerRef.current = e.target;
                    // Desactiva subtítulos y reproduce apenas se abre el modal.
                    try {
                      e.target.setOption('captions', 'track', {});
                      e.target.setOption('cc', 'track', {});
                    } catch {
                      // YouTube puede tardar en cargar el módulo de subtítulos.
                    }
                    e.target.setPlaybackQuality('hd1080');
                    e.target.playVideo();
                  }}
                  onPlay={(e) => {
                    try {
                      e.target.setOption('captions', 'track', {});
                      e.target.setOption('cc', 'track', {});
                    } catch {
                      // Mantiene la reproducción aunque el módulo no esté disponible.
                    }
                  }}
                  onStateChange={(e) => {
                    // Si el video está "unstarted" (-1) o "cued" (5), forzamos el play.
                    if (e.data === -1 || e.data === 5) {
                      e.target.playVideo();
                    }
                  }}
                />
              </div>

              {/* Controles de Navegación Móvil (Abajo del video) */}
              <div className="flex sm:hidden justify-between items-center mt-6 px-2 relative z-20">
                <button 
                  onClick={handlePrevious}
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <ChevronLeft className="w-6 h-6" /> Anterior
                </button>
                <span className="text-white/40 text-sm">
                  {activeIndex + 1} / {VIDEOS.length}
                </span>
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  Siguiente <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
