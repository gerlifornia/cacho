/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, Flame, X, ChevronLeft, ChevronRight, Globe, ArrowUpRight } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import YouTube from 'react-youtube';

const CLARIN_LOGO_SRC = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Clar%C3%ADn_logo.svg';
const INFOBAE_LOGO_SRC = 'https://upload.wikimedia.org/wikipedia/commons/2/22/Infobae_logo.svg';

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

type SiteCopy = {
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    title3: string;
    aiLabel: string;
    subtitle: string;
    badge: string;
  };
  press: {
    eyebrow: string;
    headline: string;
    clarinAria: string;
    infobaeAria: string;
  };
  gallery: {
    widescreen: string;
    vertical: string;
    pieces: string;
    openVideo: string;
    thumbnail: string;
    silentPreview: string;
    close: string;
    previous: string;
    next: string;
  };
  footer: {
    rights: string;
    disclaimer: string;
  };
  seo: {
    title: string;
    description: string;
    locale: string;
  };
};

const SITE_COPY: Record<Language, SiteCopy> = {
  es: {
    hero: {
      eyebrow: 'LA PRIMERA PRODUCTORA CREATIVA 100% IA DE LATAM',
      title1: 'CREATIVIDAD', title2: 'HUMANA.', title3: 'POTENCIA', aiLabel: 'iA.',
      subtitle: 'La CREATIVIDAD es HUMANA, pero nuestra POTENCIA es IA. Desarrollamos conceptos, escribimos historias, diseñamos campañas y producimos contenido audiovisual para que las marcas sean imposibles de ignorar.',
      badge: 'SIN ACTORES EGOCÉNTRICOS',
    },
    press: {
      eyebrow: 'CACHO EN LOS MEDIOS',
      headline: 'Cacho es el primer personaje IA masivo de LATAM.',
      clarinAria: 'Leer la nota sobre Cacho en Clarín',
      infobaeAria: 'Leer la nota sobre Cacho en Infobae',
    },
    gallery: {
      widescreen: 'SELECCIÓN WIDESCREEN', vertical: 'HISTORIAS VERTICALES', pieces: 'PIEZAS',
      openVideo: 'Ver video con sonido', thumbnail: 'Miniatura del video', silentPreview: 'Vista previa silenciosa',
      close: 'Cerrar video', previous: 'Anterior', next: 'Siguiente',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      disclaimer: 'Algunas de las piezas exhibidas son SPEC ADS: conceptos audiovisuales independientes y no oficiales, creados por CACHO.Ai exclusivamente como demostración creativa de portfolio. Algunas piezas no fueron encargadas, aprobadas, patrocinadas ni producidas en colaboración con las marcas representadas. Los nombres, logotipos, productos y demás elementos identificatorios pertenecen a sus respectivos titulares.',
    },
    seo: {
      title: 'CACHO.Ai | Productora creativa de videos con IA en Latinoamérica',
      description: 'CACHO.Ai es una productora creativa latinoamericana especializada en comerciales, cine, videos institucionales y contenido UGC con inteligencia artificial.',
      locale: 'es_AR',
    },
  },
  en: {
    hero: {
      eyebrow: "LATIN AMERICA'S FIRST 100% AI CREATIVE PRODUCTION COMPANY",
      title1: 'HUMAN', title2: 'CREATIVITY.', title3: 'POWERED BY', aiLabel: 'AI.',
      subtitle: 'CREATIVITY is HUMAN, but our POWER is AI. We develop concepts, write stories, design campaigns, and produce audiovisual content that makes brands impossible to ignore.',
      badge: 'NO EGOCENTRIC ACTORS',
    },
    press: {
      eyebrow: 'CACHO IN THE MEDIA',
      headline: "Cacho is Latin America's first mass-audience AI character.",
      clarinAria: 'Read the Clarín story about Cacho',
      infobaeAria: 'Read the Infobae story about Cacho',
    },
    gallery: {
      widescreen: 'WIDESCREEN SELECTION', vertical: 'VERTICAL STORIES', pieces: 'WORKS',
      openVideo: 'Watch video with sound', thumbnail: 'Video thumbnail', silentPreview: 'Silent preview',
      close: 'Close video', previous: 'Previous', next: 'Next',
    },
    footer: {
      rights: 'All rights reserved.',
      disclaimer: 'Some works shown are SPEC ADS: independent, unofficial audiovisual concepts created by CACHO.Ai solely as creative portfolio demonstrations. Some works were not commissioned, approved, sponsored, or produced in collaboration with the brands shown. Names, logos, products, and other identifying elements belong to their respective owners.',
    },
    seo: {
      title: 'CACHO.Ai | AI Video Production Company in Latin America',
      description: 'CACHO.Ai is a Latin American creative production company making AI-powered commercials, films, corporate videos and UGC content.',
      locale: 'en_US',
    },
  },
  zh: {
    hero: {
      eyebrow: '拉丁美洲首家 100% AI 创意制作公司',
      title1: '人类', title2: '创意。', title3: 'AI 驱动。', aiLabel: '',
      subtitle: '创意源于人类，但我们的力量来自 AI。我们开发概念、撰写故事、设计营销活动并制作视听内容，让品牌令人无法忽视。',
      badge: '不用自恋的演员',
    },
    press: {
      eyebrow: '媒体报道', headline: 'Cacho 是拉丁美洲首个大众化 AI 角色。',
      clarinAria: '阅读 Clarín 关于 Cacho 的报道', infobaeAria: '阅读 Infobae 关于 Cacho 的报道',
    },
    gallery: {
      widescreen: '宽屏精选', vertical: '竖屏故事', pieces: '作品',
      openVideo: '观看有声视频', thumbnail: '视频缩略图', silentPreview: '静音预览',
      close: '关闭视频', previous: '上一个', next: '下一个',
    },
    footer: {
      rights: '版权所有。',
      disclaimer: '部分展示作品为 SPEC ADS：由 CACHO.Ai 独立创作的非官方视听概念，仅用于创意作品集展示。部分作品并非由所展示品牌委托、批准、赞助或合作制作。所有名称、标志、产品及其他识别元素均归其各自权利人所有。',
    },
    seo: {
      title: 'CACHO.Ai｜拉丁美洲 AI 视频创意制作公司',
      description: 'CACHO.Ai 是拉丁美洲的创意制作公司，专注于使用人工智能制作广告、电影、企业视频和 UGC 内容。',
      locale: 'zh_CN',
    },
  },
  hi: {
    hero: {
      eyebrow: 'लैटिन अमेरिका की पहली 100% AI क्रिएटिव प्रोडक्शन कंपनी',
      title1: 'मानवीय', title2: 'रचनात्मकता।', title3: 'AI की शक्ति।', aiLabel: '',
      subtitle: 'रचनात्मकता मानवीय है, लेकिन हमारी शक्ति AI है। हम अवधारणाएँ विकसित करते हैं, कहानियाँ लिखते हैं, अभियान डिज़ाइन करते हैं और ऐसा ऑडियोविज़ुअल कंटेंट बनाते हैं जिसे नज़रअंदाज़ करना असंभव हो।',
      badge: 'अहंकारी अभिनेताओं के बिना',
    },
    press: {
      eyebrow: 'मीडिया में CACHO', headline: 'Cacho लैटिन अमेरिका का पहला व्यापक रूप से लोकप्रिय AI किरदार है।',
      clarinAria: 'Clarín में Cacho की खबर पढ़ें', infobaeAria: 'Infobae में Cacho की खबर पढ़ें',
    },
    gallery: {
      widescreen: 'वाइडस्क्रीन चयन', vertical: 'वर्टिकल कहानियाँ', pieces: 'रचनाएँ',
      openVideo: 'आवाज़ के साथ वीडियो देखें', thumbnail: 'वीडियो थंबनेल', silentPreview: 'मूक पूर्वावलोकन',
      close: 'वीडियो बंद करें', previous: 'पिछला', next: 'अगला',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      disclaimer: 'प्रदर्शित कुछ रचनाएँ SPEC ADS हैं: CACHO.Ai द्वारा केवल रचनात्मक पोर्टफोलियो प्रदर्शन के लिए बनाए गए स्वतंत्र और अनौपचारिक दृश्य-श्रव्य विचार। कुछ रचनाएँ दिखाई गई ब्रांडों द्वारा न तो मंगाई गईं, न अनुमोदित, प्रायोजित या सहयोग से निर्मित की गईं। नाम, लोगो, उत्पाद और अन्य पहचान तत्व उनके संबंधित स्वामियों के हैं।',
    },
    seo: {
      title: 'CACHO.Ai | लैटिन अमेरिका की AI वीडियो प्रोडक्शन कंपनी',
      description: 'CACHO.Ai लैटिन अमेरिका की क्रिएटिव प्रोडक्शन कंपनी है, जो AI से विज्ञापन, फ़िल्म, कॉर्पोरेट वीडियो और UGC सामग्री बनाती है।',
      locale: 'hi_IN',
    },
  },
  fr: {
    hero: {
      eyebrow: "LA PREMIÈRE SOCIÉTÉ DE PRODUCTION CRÉATIVE 100 % IA D'AMÉRIQUE LATINE",
      title1: 'CRÉATIVITÉ', title2: 'HUMAINE.', title3: 'PUISSANCE', aiLabel: 'IA.',
      subtitle: "La CRÉATIVITÉ est HUMAINE, mais notre PUISSANCE est l’IA. Nous développons des concepts, écrivons des histoires, concevons des campagnes et produisons des contenus audiovisuels qui rendent les marques impossibles à ignorer.",
      badge: 'SANS ACTEURS ÉGOCENTRIQUES',
    },
    press: {
      eyebrow: 'CACHO DANS LES MÉDIAS', headline: "Cacho est le premier personnage IA grand public d'Amérique latine.",
      clarinAria: "Lire l'article de Clarín sur Cacho", infobaeAria: "Lire l'article d'Infobae sur Cacho",
    },
    gallery: {
      widescreen: 'SÉLECTION WIDESCREEN', vertical: 'HISTOIRES VERTICALES', pieces: 'ŒUVRES',
      openVideo: 'Voir la vidéo avec le son', thumbnail: 'Miniature de la vidéo', silentPreview: 'Aperçu silencieux',
      close: 'Fermer la vidéo', previous: 'Précédent', next: 'Suivant',
    },
    footer: {
      rights: 'Tous droits réservés.',
      disclaimer: "Certaines œuvres présentées sont des SPEC ADS : des concepts audiovisuels indépendants et non officiels créés par CACHO.Ai uniquement à titre de démonstration créative de portfolio. Certaines œuvres n'ont pas été commandées, approuvées, sponsorisées ni produites en collaboration avec les marques représentées. Les noms, logos, produits et autres éléments d'identification appartiennent à leurs propriétaires respectifs.",
    },
    seo: {
      title: "CACHO.Ai | Société de production vidéo IA d'Amérique latine",
      description: "CACHO.Ai est une société de production créative latino-américaine spécialisée dans les publicités, films, vidéos corporate et contenus UGC avec l'IA.",
      locale: 'fr_FR',
    },
  },
  ar: {
    hero: {
      eyebrow: 'أول شركة إنتاج إبداعي بالذكاء الاصطناعي 100٪ في أمريكا اللاتينية',
      title1: 'إبداع', title2: 'بشري.', title3: 'بقوة', aiLabel: 'الذكاء الاصطناعي.',
      subtitle: 'الإبداع إنساني، لكن قوتنا هي الذكاء الاصطناعي. نطوّر المفاهيم، ونكتب القصص، ونصمّم الحملات، وننتج محتوى سمعيًا بصريًا يجعل تجاهل العلامات التجارية أمرًا مستحيلًا.',
      badge: 'بدون ممثلين أنانيين',
    },
    press: {
      eyebrow: 'CACHO في الإعلام', headline: 'Cacho هو أول شخصية جماهيرية بالذكاء الاصطناعي في أمريكا اللاتينية.',
      clarinAria: 'اقرأ تقرير Clarín عن Cacho', infobaeAria: 'اقرأ تقرير Infobae عن Cacho',
    },
    gallery: {
      widescreen: 'مختارات الشاشة العريضة', vertical: 'قصص عمودية', pieces: 'أعمال',
      openVideo: 'شاهد الفيديو مع الصوت', thumbnail: 'صورة مصغرة للفيديو', silentPreview: 'معاينة صامتة',
      close: 'إغلاق الفيديو', previous: 'السابق', next: 'التالي',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      disclaimer: 'بعض الأعمال المعروضة هي SPEC ADS: مفاهيم سمعية بصرية مستقلة وغير رسمية أنشأتها CACHO.Ai حصريًا كعروض إبداعية لملف الأعمال. بعض الأعمال لم تطلبها أو تعتمدها أو ترعاها العلامات التجارية المعروضة، ولم تُنتج بالتعاون معها. تعود الأسماء والشعارات والمنتجات وسائر عناصر التعريف إلى أصحابها.',
    },
    seo: {
      title: 'CACHO.Ai | شركة إنتاج فيديو بالذكاء الاصطناعي في أمريكا اللاتينية',
      description: 'CACHO.Ai شركة إنتاج إبداعي في أمريكا اللاتينية متخصصة في الإعلانات والأفلام والفيديوهات المؤسسية ومحتوى UGC بالذكاء الاصطناعي.',
      locale: 'ar_SA',
    },
  },
  bn: {
    hero: {
      eyebrow: 'লাতিন আমেরিকার প্রথম ১০০% AI ক্রিয়েটিভ প্রোডাকশন কোম্পানি',
      title1: 'মানবিক', title2: 'সৃজনশীলতা।', title3: 'AI-এর শক্তি।', aiLabel: '',
      subtitle: 'সৃজনশীলতা মানুষের, কিন্তু আমাদের শক্তি AI। আমরা ধারণা তৈরি করি, গল্প লিখি, ক্যাম্পেইন ডিজাইন করি এবং এমন অডিওভিজ্যুয়াল কনটেন্ট তৈরি করি যা ব্র্যান্ডকে উপেক্ষা করা অসম্ভব করে তোলে।',
      badge: 'আত্মকেন্দ্রিক অভিনেতা ছাড়া',
    },
    press: {
      eyebrow: 'মিডিয়ায় CACHO', headline: 'Cacho লাতিন আমেরিকার প্রথম গণজনপ্রিয় AI চরিত্র।',
      clarinAria: 'Clarín-এ Cacho সম্পর্কে প্রতিবেদন পড়ুন', infobaeAria: 'Infobae-তে Cacho সম্পর্কে প্রতিবেদন পড়ুন',
    },
    gallery: {
      widescreen: 'ওয়াইডস্ক্রিন নির্বাচন', vertical: 'ভার্টিক্যাল গল্প', pieces: 'কাজ',
      openVideo: 'শব্দসহ ভিডিও দেখুন', thumbnail: 'ভিডিও থাম্বনেইল', silentPreview: 'নিঃশব্দ প্রিভিউ',
      close: 'ভিডিও বন্ধ করুন', previous: 'আগের', next: 'পরের',
    },
    footer: {
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      disclaimer: 'প্রদর্শিত কিছু কাজ SPEC ADS: CACHO.Ai-এর তৈরি স্বাধীন ও অনানুষ্ঠানিক অডিওভিজ্যুয়াল ধারণা, যা শুধুমাত্র সৃজনশীল পোর্টফোলিও প্রদর্শনের জন্য। কিছু কাজ প্রদর্শিত ব্র্যান্ডগুলোর অনুরোধে, অনুমোদনে, পৃষ্ঠপোষকতায় বা সহযোগিতায় তৈরি হয়নি। নাম, লোগো, পণ্য ও অন্যান্য পরিচয়সূচক উপাদান তাদের নিজ নিজ মালিকের।',
    },
    seo: {
      title: 'CACHO.Ai | লাতিন আমেরিকার AI ভিডিও প্রোডাকশন কোম্পানি',
      description: 'CACHO.Ai লাতিন আমেরিকার একটি ক্রিয়েটিভ প্রোডাকশন কোম্পানি, যা AI দিয়ে বিজ্ঞাপন, চলচ্চিত্র, কর্পোরেট ভিডিও ও UGC তৈরি করে।',
      locale: 'bn_BD',
    },
  },
  pt: {
    hero: {
      eyebrow: 'A PRIMEIRA PRODUTORA CRIATIVA 100% IA DA AMÉRICA LATINA',
      title1: 'CRIATIVIDADE', title2: 'HUMANA.', title3: 'POTÊNCIA', aiLabel: 'IA.',
      subtitle: 'A CRIATIVIDADE é HUMANA, mas nossa POTÊNCIA é a IA. Desenvolvemos conceitos, escrevemos histórias, criamos campanhas e produzimos conteúdo audiovisual para tornar as marcas impossíveis de ignorar.',
      badge: 'SEM ATORES EGOCÊNTRICOS',
    },
    press: {
      eyebrow: 'CACHO NA MÍDIA', headline: 'Cacho é o primeiro personagem de IA de alcance massivo da América Latina.',
      clarinAria: 'Leia a matéria sobre Cacho no Clarín', infobaeAria: 'Leia a matéria sobre Cacho no Infobae',
    },
    gallery: {
      widescreen: 'SELEÇÃO WIDESCREEN', vertical: 'HISTÓRIAS VERTICAIS', pieces: 'PEÇAS',
      openVideo: 'Ver vídeo com som', thumbnail: 'Miniatura do vídeo', silentPreview: 'Prévia silenciosa',
      close: 'Fechar vídeo', previous: 'Anterior', next: 'Próximo',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      disclaimer: 'Algumas das peças exibidas são SPEC ADS: conceitos audiovisuais independentes e não oficiais, criados pela CACHO.Ai exclusivamente como demonstrações criativas de portfólio. Algumas peças não foram encomendadas, aprovadas, patrocinadas nem produzidas em colaboração com as marcas representadas. Os nomes, logotipos, produtos e demais elementos de identificação pertencem aos seus respectivos titulares.',
    },
    seo: {
      title: 'CACHO.Ai | Produtora de vídeos com IA da América Latina',
      description: 'A CACHO.Ai é uma produtora criativa latino-americana especializada em comerciais, cinema, vídeos institucionais e conteúdo UGC com inteligência artificial.',
      locale: 'pt_BR',
    },
  },
  ru: {
    hero: {
      eyebrow: 'ПЕРВАЯ В ЛАТИНСКОЙ АМЕРИКЕ КРЕАТИВНАЯ СТУДИЯ НА 100% ИИ',
      title1: 'ЧЕЛОВЕЧЕСКАЯ', title2: 'КРЕАТИВНОСТЬ.', title3: 'СИЛА', aiLabel: 'ИИ.',
      subtitle: 'КРЕАТИВНОСТЬ — ЧЕЛОВЕЧЕСКАЯ, но наша СИЛА — ИИ. Мы разрабатываем концепции, пишем истории, создаём кампании и производим аудиовизуальный контент, благодаря которому бренды невозможно игнорировать.',
      badge: 'БЕЗ ЭГОЦЕНТРИЧНЫХ АКТЁРОВ',
    },
    press: {
      eyebrow: 'CACHO В СМИ', headline: 'Cacho — первый массовый ИИ-персонаж Латинской Америки.',
      clarinAria: 'Прочитать материал о Cacho в Clarín', infobaeAria: 'Прочитать материал о Cacho в Infobae',
    },
    gallery: {
      widescreen: 'ШИРОКОЭКРАННАЯ ПОДБОРКА', vertical: 'ВЕРТИКАЛЬНЫЕ ИСТОРИИ', pieces: 'РАБОТЫ',
      openVideo: 'Смотреть видео со звуком', thumbnail: 'Миниатюра видео', silentPreview: 'Предпросмотр без звука',
      close: 'Закрыть видео', previous: 'Назад', next: 'Далее',
    },
    footer: {
      rights: 'Все права защищены.',
      disclaimer: 'Некоторые представленные работы являются SPEC ADS — независимыми и неофициальными аудиовизуальными концепциями, созданными CACHO.Ai исключительно для демонстрации творческого портфолио. Некоторые работы не были заказаны, одобрены, спонсированы или произведены совместно с представленными брендами. Названия, логотипы, продукты и другие идентифицирующие элементы принадлежат их правообладателям.',
    },
    seo: {
      title: 'CACHO.Ai | Студия видеопроизводства с ИИ в Латинской Америке',
      description: 'CACHO.Ai — латиноамериканская креативная студия, создающая рекламу, кино, корпоративные видео и UGC-контент с помощью ИИ.',
      locale: 'ru_RU',
    },
  },
  id: {
    hero: {
      eyebrow: 'RUMAH PRODUKSI KREATIF 100% AI PERTAMA DI AMERIKA LATIN',
      title1: 'KREATIVITAS', title2: 'MANUSIA.', title3: 'TENAGA', aiLabel: 'AI.',
      subtitle: 'KREATIVITAS itu MANUSIAWI, tetapi KEKUATAN kami adalah AI. Kami mengembangkan konsep, menulis cerita, merancang kampanye, dan memproduksi konten audiovisual yang membuat merek mustahil diabaikan.',
      badge: 'TANPA AKTOR EGOSENTRIS',
    },
    press: {
      eyebrow: 'CACHO DI MEDIA', headline: 'Cacho adalah karakter AI massal pertama di Amerika Latin.',
      clarinAria: 'Baca liputan Cacho di Clarín', infobaeAria: 'Baca liputan Cacho di Infobae',
    },
    gallery: {
      widescreen: 'PILIHAN WIDESCREEN', vertical: 'CERITA VERTIKAL', pieces: 'KARYA',
      openVideo: 'Tonton video dengan suara', thumbnail: 'Gambar mini video', silentPreview: 'Pratinjau tanpa suara',
      close: 'Tutup video', previous: 'Sebelumnya', next: 'Berikutnya',
    },
    footer: {
      rights: 'Hak cipta dilindungi.',
      disclaimer: 'Beberapa karya yang ditampilkan merupakan SPEC ADS: konsep audiovisual independen dan tidak resmi yang dibuat oleh CACHO.Ai semata-mata sebagai demonstrasi kreatif portofolio. Beberapa karya tidak dipesan, disetujui, disponsori, atau diproduksi bersama merek yang ditampilkan. Nama, logo, produk, dan elemen identitas lainnya adalah milik pemegang hak masing-masing.',
    },
    seo: {
      title: 'CACHO.Ai | Rumah Produksi Video AI di Amerika Latin',
      description: 'CACHO.Ai adalah rumah produksi kreatif Amerika Latin yang membuat iklan, film, video korporat, dan konten UGC dengan kecerdasan buatan.',
      locale: 'id_ID',
    },
  },
};

type AboutCopy = {
  recognition: string;
  pillars: Array<{ title: string; text: string }>;
  cta: string;
};

const ABOUT_COPY: Record<Language, AboutCopy> = {
  es: {
    recognition: 'Reconocido por los medios más importantes del país.',
    pillars: [
      { title: 'Conceptos', text: 'Convertimos desafíos de marca en ideas que merecen ser vistas.' },
      { title: 'Historias', text: 'Escribimos narrativas con personalidad, emoción y una mirada humana.' },
      { title: 'Campañas + producción', text: 'Diseñamos campañas y producimos piezas audiovisuales con potencia IA.' },
    ],
    cta: 'Hacemos que las marcas sean imposibles de ignorar.',
  },
  en: {
    recognition: "Recognized by Argentina's leading media outlets.",
    pillars: [
      { title: 'Concepts', text: 'We turn brand challenges into ideas worth watching.' },
      { title: 'Stories', text: 'We write narratives with personality, emotion and a human point of view.' },
      { title: 'Campaigns + production', text: 'We design campaigns and produce audiovisual work powered by AI.' },
    ],
    cta: 'We make brands impossible to ignore.',
  },
  zh: {
    recognition: '获得阿根廷最重要媒体的认可。',
    pillars: [
      { title: '概念', text: '我们将品牌挑战转化为值得被看见的创意。' },
      { title: '故事', text: '我们以个性、情感和人类视角书写叙事。' },
      { title: '营销活动与制作', text: '我们设计营销活动，并以 AI 的力量制作视听作品。' },
    ],
    cta: '我们让品牌令人无法忽视。',
  },
  hi: {
    recognition: 'अर्जेंटीना के प्रमुख मीडिया संस्थानों द्वारा मान्यता प्राप्त।',
    pillars: [
      { title: 'अवधारणाएँ', text: 'हम ब्रांड की चुनौतियों को देखने योग्य विचारों में बदलते हैं।' },
      { title: 'कहानियाँ', text: 'हम व्यक्तित्व, भावना और मानवीय दृष्टिकोण वाली कहानियाँ लिखते हैं।' },
      { title: 'अभियान + निर्माण', text: 'हम अभियान डिज़ाइन करते हैं और AI की शक्ति से ऑडियोविज़ुअल काम बनाते हैं।' },
    ],
    cta: 'हम ब्रांडों को नज़रअंदाज़ करना असंभव बनाते हैं।',
  },
  fr: {
    recognition: "Reconnu par les médias les plus importants d'Argentine.",
    pillars: [
      { title: 'Concepts', text: 'Nous transformons les défis des marques en idées qui méritent d’être vues.' },
      { title: 'Histoires', text: 'Nous écrivons des récits avec de la personnalité, de l’émotion et un regard humain.' },
      { title: 'Campagnes + production', text: 'Nous concevons des campagnes et produisons des œuvres audiovisuelles propulsées par l’IA.' },
    ],
    cta: 'Nous rendons les marques impossibles à ignorer.',
  },
  ar: {
    recognition: 'معترف به من أهم وسائل الإعلام في الأرجنتين.',
    pillars: [
      { title: 'المفاهيم', text: 'نحوّل تحديات العلامات التجارية إلى أفكار تستحق المشاهدة.' },
      { title: 'القصص', text: 'نكتب سرديات تتمتع بالشخصية والعاطفة ونظرة إنسانية.' },
      { title: 'الحملات + الإنتاج', text: 'نصمّم الحملات وننتج أعمالًا سمعية بصرية بقوة الذكاء الاصطناعي.' },
    ],
    cta: 'نجعل تجاهل العلامات التجارية أمرًا مستحيلًا.',
  },
  bn: {
    recognition: 'আর্জেন্টিনার শীর্ষস্থানীয় সংবাদমাধ্যমগুলোর স্বীকৃতিপ্রাপ্ত।',
    pillars: [
      { title: 'ধারণা', text: 'আমরা ব্র্যান্ডের চ্যালেঞ্জকে দেখার যোগ্য আইডিয়ায় রূপান্তর করি।' },
      { title: 'গল্প', text: 'আমরা ব্যক্তিত্ব, আবেগ ও মানবিক দৃষ্টিভঙ্গিসম্পন্ন গল্প লিখি।' },
      { title: 'ক্যাম্পেইন + প্রোডাকশন', text: 'আমরা ক্যাম্পেইন ডিজাইন করি এবং AI-এর শক্তিতে অডিওভিজ্যুয়াল কাজ তৈরি করি।' },
    ],
    cta: 'আমরা ব্র্যান্ডকে উপেক্ষা করা অসম্ভব করে তুলি।',
  },
  pt: {
    recognition: 'Reconhecido pelos meios de comunicação mais importantes da Argentina.',
    pillars: [
      { title: 'Conceitos', text: 'Transformamos desafios de marca em ideias que merecem ser vistas.' },
      { title: 'Histórias', text: 'Escrevemos narrativas com personalidade, emoção e um olhar humano.' },
      { title: 'Campanhas + produção', text: 'Criamos campanhas e produzimos peças audiovisuais com a potência da IA.' },
    ],
    cta: 'Tornamos as marcas impossíveis de ignorar.',
  },
  ru: {
    recognition: 'Признан ведущими СМИ Аргентины.',
    pillars: [
      { title: 'Концепции', text: 'Мы превращаем задачи бренда в идеи, которые хочется увидеть.' },
      { title: 'Истории', text: 'Мы пишем истории с характером, эмоциями и человеческим взглядом.' },
      { title: 'Кампании + производство', text: 'Мы создаём кампании и аудиовизуальные работы с мощью ИИ.' },
    ],
    cta: 'Мы делаем бренды такими, что их невозможно игнорировать.',
  },
  id: {
    recognition: 'Diakui oleh media-media terkemuka di Argentina.',
    pillars: [
      { title: 'Konsep', text: 'Kami mengubah tantangan merek menjadi ide yang layak ditonton.' },
      { title: 'Cerita', text: 'Kami menulis narasi dengan karakter, emosi, dan sudut pandang manusia.' },
      { title: 'Kampanye + produksi', text: 'Kami merancang kampanye dan memproduksi karya audiovisual dengan kekuatan AI.' },
    ],
    cta: 'Kami membuat merek mustahil diabaikan.',
  },
};

type AboutStoryCopy = {
  manifesto: string;
  storyEyebrow: string;
  storyTitle: string;
  storyText: string;
  craftEyebrow: string;
  craftTitle: string;
  craftText: string;
  stats: Array<{ value: string; label: string }>;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  source: string;
};

type AboutManifestoCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  actorsEyebrow: string;
  actorsTitle: string;
  actorsCounterpoint: string;
  actorsText: string;
};

const ABOUT_MANIFESTO_COPY: Record<Language, AboutManifestoCopy> = {
  es: {
    heroEyebrow: 'LA PRIMERA PRODUCTORA CREATIVA 100% IA DE LATAM',
    heroTitle: 'CREAMOS MUNDOS QUE NO EXISTÍAN. Y PERSONAJES QUE SE SIENTEN REALES.',
    heroText: 'Partimos de una idea humana y usamos IA para llevarla más lejos: desarrollamos conceptos, escribimos historias, dirigimos emociones y producimos contenido audiovisual para que las marcas sean imposibles de ignorar.',
    actorsEyebrow: 'NUESTRO MANIFIESTO / 01',
    actorsTitle: 'SIN ACTORES EGOCÉNTRICOS.',
    actorsCounterpoint: 'NO ES CONTRA LOS ACTORES. ES A FAVOR DE LA IDEA.',
    actorsText: 'Respetamos y admiramos el oficio actoral. Lo que cuestionamos es un sistema que a veces pone toda la atención en quien aparece frente a cámara y deja fuera de foco a quienes imaginaron, escribieron y dirigieron la obra. Con personajes creados por IA podemos construir presencias coherentes, disponibles y profundamente expresivas, sin que el ego se interponga entre la idea y su ejecución. Cacho no busca una cara que se lleve el crédito: reivindica a quienes trabajan detrás de escena. La tecnología nos permite crear mundos y personalidades capaces de emocionar con humanidad, mientras el reconocimiento vuelve al concepto, al guion, la dirección y al equipo creativo.',
  },
  en: {
    heroEyebrow: 'LATIN AMERICA’S FIRST 100% AI CREATIVE PRODUCTION COMPANY',
    heroTitle: 'WE CREATE WORLDS THAT DID NOT EXIST. AND CHARACTERS THAT FEEL REAL.',
    heroText: 'We begin with a human idea and use AI to take it further: we develop concepts, write stories, direct emotion and produce audiovisual content that makes brands impossible to ignore.',
    actorsEyebrow: 'OUR MANIFESTO / 01',
    actorsTitle: 'NO EGOCENTRIC ACTORS.',
    actorsCounterpoint: 'THIS IS NOT AGAINST ACTORS. IT IS FOR THE IDEA.',
    actorsText: 'We respect and admire the craft of acting. What we question is a system that sometimes places all attention on the person in front of the camera while those who imagined, wrote and directed the work fade from view. With AI-created characters, we can build consistent, available and deeply expressive presences without ego getting between the idea and its execution. Cacho does not seek a face to take the credit: he champions the people working behind the scenes. Technology lets us create worlds and personalities that move audiences with humanity, while recognition returns to the concept, script, direction and creative team.',
  },
  zh: {
    heroEyebrow: '拉丁美洲首家 100% AI 创意制作公司',
    heroTitle: '我们创造不存在的世界，以及让人感到真实的角色。',
    heroText: '我们从人的创意出发，用 AI 将它推向更远：开发概念、书写故事、指导情感并制作让品牌无法被忽视的视听内容。',
    actorsEyebrow: '我们的宣言 / 01',
    actorsTitle: '不要自我中心的演员。',
    actorsCounterpoint: '这不是反对演员，而是捍卫创意。',
    actorsText: '我们尊重并欣赏表演这门专业。我们质疑的是一种有时把全部目光放在镜头前的人身上，却让构思、写作和导演作品的人被忽略的体系。AI 角色让我们创造稳定、随时可用且富有表现力的存在，不让自我阻隔创意与执行。Cacho 不寻找一张独占功劳的脸，而是让幕后创作者回到聚光灯下。技术帮助我们创造具有人性与感染力的世界和角色，让荣誉重新属于概念、剧本、导演与创意团队。',
  },
  hi: {
    heroEyebrow: 'लैटिन अमेरिका की पहली 100% AI क्रिएटिव प्रोडक्शन कंपनी',
    heroTitle: 'हम ऐसे संसार बनाते हैं जो पहले नहीं थे। और ऐसे किरदार जो सच लगते हैं।',
    heroText: 'हम एक मानवीय विचार से शुरू करते हैं और AI से उसे आगे ले जाते हैं: कॉन्सेप्ट बनाते हैं, कहानियाँ लिखते हैं, भावनाओं को निर्देशित करते हैं और ऐसा ऑडियोविज़ुअल कंटेंट बनाते हैं जिसे नज़रअंदाज़ करना असंभव हो।',
    actorsEyebrow: 'हमारा घोषणापत्र / 01',
    actorsTitle: 'अहंकारी अभिनेता नहीं।',
    actorsCounterpoint: 'यह अभिनेताओं के खिलाफ नहीं, विचार के पक्ष में है।',
    actorsText: 'हम अभिनय के पेशे का सम्मान और प्रशंसा करते हैं। हमारा सवाल उस व्यवस्था से है जो कभी-कभी कैमरे के सामने दिखने वाले व्यक्ति को पूरा श्रेय देती है और कल्पना, लेखन व निर्देशन करने वालों को पीछे छोड़ देती है। AI से बने किरदार हमें निरंतर, उपलब्ध और गहराई से अभिव्यंजक उपस्थिति बनाने देते हैं, जहाँ अहंकार विचार और उसके निष्पादन के बीच नहीं आता। Cacho श्रेय लेने वाला चेहरा नहीं ढूँढता; वह पर्दे के पीछे काम करने वालों को सामने लाता है। तकनीक हमें मानवीय संवेदना वाले संसार और व्यक्तित्व बनाने देती है, जबकि पहचान फिर कॉन्सेप्ट, स्क्रिप्ट, निर्देशन और क्रिएटिव टीम को मिलती है।',
  },
  fr: {
    heroEyebrow: 'LA PREMIÈRE SOCIÉTÉ DE PRODUCTION CRÉATIVE 100 % IA D’AMÉRIQUE LATINE',
    heroTitle: 'NOUS CRÉONS DES MONDES QUI N’EXISTAIENT PAS. ET DES PERSONNAGES QUI SEMBLENT RÉELS.',
    heroText: 'Nous partons d’une idée humaine et utilisons l’IA pour l’emmener plus loin : concepts, récits, direction des émotions et contenus audiovisuels qui rendent les marques impossibles à ignorer.',
    actorsEyebrow: 'NOTRE MANIFESTE / 01',
    actorsTitle: 'SANS ACTEURS ÉGOCENTRIQUES.',
    actorsCounterpoint: 'CE N’EST PAS CONTRE LES ACTEURS. C’EST POUR L’IDÉE.',
    actorsText: 'Nous respectons et admirons le métier d’acteur. Nous remettons en question un système qui place parfois toute l’attention sur la personne devant la caméra et laisse dans l’ombre ceux qui ont imaginé, écrit et réalisé l’œuvre. Les personnages créés par IA nous permettent de construire des présences cohérentes, disponibles et profondément expressives, sans que l’ego s’interpose entre l’idée et son exécution. Cacho ne cherche pas un visage qui s’attribue tout le mérite : il remet en lumière les équipes de l’ombre. La technologie permet de créer des mondes et des personnalités émouvants et humains, tout en rendant la reconnaissance au concept, au scénario, à la réalisation et à l’équipe créative.',
  },
  ar: {
    heroEyebrow: 'أول شركة إنتاج إبداعي بالذكاء الاصطناعي 100٪ في أمريكا اللاتينية',
    heroTitle: 'نصنع عوالم لم تكن موجودة، وشخصيات تبدو حقيقية.',
    heroText: 'نبدأ بفكرة إنسانية ونستخدم الذكاء الاصطناعي لدفعها أبعد: نطوّر المفاهيم ونكتب القصص ونوجّه المشاعر وننتج محتوى بصرياً يجعل العلامات التجارية عصية على التجاهل.',
    actorsEyebrow: 'بياننا / 01',
    actorsTitle: 'من دون ممثلين متمحورين حول ذواتهم.',
    actorsCounterpoint: 'لسنا ضد الممثلين، بل نقف مع الفكرة.',
    actorsText: 'نحترم مهنة التمثيل ونقدّرها. ما ننتقده هو نظام يضع أحياناً كل الاهتمام على من يظهر أمام الكاميرا، بينما يتوارى من تخيّل العمل وكتبه وأخرجه. تمنحنا الشخصيات المصنوعة بالذكاء الاصطناعي حضوراً متسقاً ومتوافراً وعميق التعبير، من دون أن تقف الأنا بين الفكرة وتنفيذها. لا يبحث Cacho عن وجه ينفرد بالفضل، بل يعيد الاعتبار إلى العاملين خلف الكواليس. تتيح لنا التقنية صنع عوالم وشخصيات مؤثرة بإنسانيتها، فيما يعود التقدير إلى الفكرة والنص والإخراج والفريق الإبداعي.',
  },
  bn: {
    heroEyebrow: 'লাতিন আমেরিকার প্রথম ১০০% AI ক্রিয়েটিভ প্রোডাকশন কোম্পানি',
    heroTitle: 'আমরা এমন জগৎ তৈরি করি যা আগে ছিল না। আর এমন চরিত্র, যাদের সত্যি মনে হয়।',
    heroText: 'আমরা মানবিক একটি ধারণা থেকে শুরু করি এবং AI দিয়ে তাকে আরও দূরে নিয়ে যাই: কনসেপ্ট তৈরি করি, গল্প লিখি, আবেগ পরিচালনা করি এবং এমন অডিওভিজ্যুয়াল কনটেন্ট বানাই যা ব্র্যান্ডকে উপেক্ষা করা অসম্ভব করে।',
    actorsEyebrow: 'আমাদের ম্যানিফেস্টো / 01',
    actorsTitle: 'আত্মকেন্দ্রিক অভিনেতা নয়।',
    actorsCounterpoint: 'এটি অভিনেতাদের বিরুদ্ধে নয়, ধারণার পক্ষে।',
    actorsText: 'আমরা অভিনয় পেশাকে সম্মান ও শ্রদ্ধা করি। আমাদের প্রশ্ন সেই ব্যবস্থাকে নিয়ে, যা কখনও ক্যামেরার সামনের মানুষটির ওপর সব আলো ফেলে এবং যাঁরা কাজটি কল্পনা, লেখা ও পরিচালনা করেছেন তাঁদের আড়াল করে দেয়। AI-নির্মিত চরিত্র দিয়ে আমরা ধারাবাহিক, সহজলভ্য ও গভীরভাবে অভিব্যক্তিশীল উপস্থিতি তৈরি করতে পারি, যেখানে অহং ধারণা ও বাস্তবায়নের মাঝে বাধা হয় না। Cacho কৃতিত্ব নেওয়ার মুখ খোঁজে না; সে পর্দার পেছনের মানুষদের সামনে আনে। প্রযুক্তি আমাদের মানবিক অনুভূতিসম্পন্ন জগৎ ও ব্যক্তিত্ব তৈরি করতে দেয় এবং স্বীকৃতি ফিরিয়ে দেয় কনসেপ্ট, স্ক্রিপ্ট, পরিচালনা ও ক্রিয়েটিভ টিমকে।',
  },
  pt: {
    heroEyebrow: 'A PRIMEIRA PRODUTORA CRIATIVA 100% IA DA AMÉRICA LATINA',
    heroTitle: 'CRIAMOS MUNDOS QUE NÃO EXISTIAM. E PERSONAGENS QUE PARECEM REAIS.',
    heroText: 'Partimos de uma ideia humana e usamos IA para levá-la mais longe: desenvolvemos conceitos, escrevemos histórias, dirigimos emoções e produzimos conteúdo audiovisual para tornar as marcas impossíveis de ignorar.',
    actorsEyebrow: 'NOSSO MANIFESTO / 01',
    actorsTitle: 'SEM ATORES EGOCÊNTRICOS.',
    actorsCounterpoint: 'NÃO É CONTRA OS ATORES. É A FAVOR DA IDEIA.',
    actorsText: 'Respeitamos e admiramos o ofício da atuação. O que questionamos é um sistema que às vezes concentra toda a atenção em quem aparece diante da câmera e deixa fora de foco quem imaginou, escreveu e dirigiu a obra. Com personagens criados por IA, podemos construir presenças coerentes, disponíveis e profundamente expressivas, sem que o ego fique entre a ideia e sua execução. Cacho não procura um rosto para levar o crédito: valoriza quem trabalha nos bastidores. A tecnologia nos permite criar mundos e personalidades capazes de emocionar com humanidade, enquanto o reconhecimento volta ao conceito, ao roteiro, à direção e à equipe criativa.',
  },
  ru: {
    heroEyebrow: 'ПЕРВАЯ В ЛАТИНСКОЙ АМЕРИКЕ КРЕАТИВНАЯ СТУДИЯ НА 100% С ИИ',
    heroTitle: 'МЫ СОЗДАЁМ МИРЫ, КОТОРЫХ НЕ БЫЛО. И ПЕРСОНАЖЕЙ, КОТОРЫЕ КАЖУТСЯ ЖИВЫМИ.',
    heroText: 'Мы начинаем с человеческой идеи и с помощью ИИ развиваем её дальше: создаём концепции, пишем истории, режиссируем эмоции и производим контент, который невозможно проигнорировать.',
    actorsEyebrow: 'НАШ МАНИФЕСТ / 01',
    actorsTitle: 'БЕЗ ЭГОЦЕНТРИЧНЫХ АКТЁРОВ.',
    actorsCounterpoint: 'ЭТО НЕ ПРОТИВ АКТЁРОВ. ЭТО ЗА ИДЕЮ.',
    actorsText: 'Мы уважаем и ценим актёрское мастерство. Мы спорим с системой, которая порой отдаёт всё внимание человеку в кадре, оставляя в тени тех, кто придумал, написал и поставил работу. Персонажи, созданные с ИИ, позволяют строить цельные, доступные и глубоко выразительные образы без эго между идеей и её воплощением. Cacho не ищет лицо, которое заберёт всю славу: он возвращает внимание людям за кадром. Технология помогает создавать миры и личности, способные трогать по-человечески, а признание возвращается концепции, сценарию, режиссуре и творческой команде.',
  },
  id: {
    heroEyebrow: 'RUMAH PRODUKSI KREATIF 100% AI PERTAMA DI AMERIKA LATIN',
    heroTitle: 'KAMI MENCIPTAKAN DUNIA YANG BELUM PERNAH ADA. DAN KARAKTER YANG TERASA NYATA.',
    heroText: 'Kami memulai dari ide manusia lalu memakai AI untuk membawanya lebih jauh: mengembangkan konsep, menulis cerita, mengarahkan emosi, dan memproduksi konten audiovisual yang membuat merek mustahil diabaikan.',
    actorsEyebrow: 'MANIFESTO KAMI / 01',
    actorsTitle: 'TANPA AKTOR EGOSENTRIS.',
    actorsCounterpoint: 'INI BUKAN MELAWAN AKTOR. INI MEMBELA IDE.',
    actorsText: 'Kami menghormati dan mengagumi profesi akting. Yang kami pertanyakan adalah sistem yang kadang memusatkan seluruh perhatian pada sosok di depan kamera, sementara orang yang membayangkan, menulis, dan menyutradarai karya itu luput dari sorotan. Karakter buatan AI memungkinkan kami membangun sosok yang konsisten, tersedia, dan sangat ekspresif tanpa ego menghalangi ide dan pelaksanaannya. Cacho tidak mencari wajah untuk mengambil semua kredit; ia mengangkat orang-orang di balik layar. Teknologi membantu kami menciptakan dunia dan kepribadian yang menyentuh secara manusiawi, sementara pengakuan kembali kepada konsep, naskah, penyutradaraan, dan tim kreatif.',
  },
};

const ABOUT_STORY_COPY: Record<Language, AboutStoryCopy> = {
  es: {
    manifesto: 'MANIFIESTO CACHO / 01',
    storyEyebrow: 'DE HOBBY A FENÓMENO',
    storyTitle: 'CACHO NACIÓ PARA HACER UN HUMOR MÁS LIBRE, REAL Y DISRUPTIVO.',
    storyText: 'Creado por Emmanuel Altamirano y Esteban Molina, Cacho debutó en diciembre en el Obelisco. Su primer video superó los diez millones de reproducciones y el experimento se convirtió en el primer personaje IA masivo de LATAM, con campañas, televisión y una comunidad que ya cruzó fronteras.',
    craftEyebrow: 'NO ES APRETAR UN BOTÓN',
    craftTitle: 'DETRÁS DE CADA PLANO HAY PERSONAS.',
    craftText: 'Creativos, guionistas y realizadores trabajan el ritmo, la iluminación, la actuación, el montaje y cada decisión visual. La IA acelera la producción; la mirada sigue siendo humana.',
    stats: [
      { value: '10M+', label: 'REPRODUCCIONES EN EL PRIMER VIDEO' },
      { value: 'DIC.', label: 'DEBUT EN EL OBELISCO' },
      { value: 'ARG → MX', label: 'ALCANCE REGIONAL' },
      { value: 'IDEA + IA', label: 'NUESTRO MÉTODO' },
    ],
    capabilitiesEyebrow: 'LO QUE HACEMOS',
    capabilitiesTitle: 'DE UNA IDEA A UN UNIVERSO DE MARCA.',
    source: 'Historia y cifras publicadas por Infobae.',
  },
  en: {
    manifesto: 'THE CACHO MANIFESTO / 01',
    storyEyebrow: 'FROM HOBBY TO PHENOMENON',
    storyTitle: 'CACHO WAS BORN TO MAKE HUMOR FREER, REALER AND MORE DISRUPTIVE.',
    storyText: "Created by Emmanuel Altamirano and Esteban Molina, Cacho debuted in December at Buenos Aires' Obelisk. His first video passed ten million views, and the experiment became Latin America’s first mass-audience AI character, spanning campaigns, television and a community beyond Argentina.",
    craftEyebrow: 'THIS IS NOT PUSHING A BUTTON',
    craftTitle: 'THERE ARE PEOPLE BEHIND EVERY SHOT.',
    craftText: 'Creatives, writers and filmmakers shape rhythm, lighting, performance, editing and every visual decision. AI accelerates production; the point of view remains human.',
    stats: [
      { value: '10M+', label: 'VIEWS ON THE FIRST VIDEO' },
      { value: 'DEC.', label: 'DEBUT AT THE OBELISK' },
      { value: 'ARG → MX', label: 'REGIONAL REACH' },
      { value: 'IDEA + AI', label: 'OUR METHOD' },
    ],
    capabilitiesEyebrow: 'WHAT WE DO',
    capabilitiesTitle: 'FROM ONE IDEA TO AN ENTIRE BRAND UNIVERSE.',
    source: 'Story and figures published by Infobae.',
  },
  zh: {
    manifesto: 'CACHO 宣言 / 01',
    storyEyebrow: '从兴趣实验到文化现象',
    storyTitle: 'CACHO 为更自由、更真实、更具颠覆性的幽默而生。',
    storyText: 'Cacho 由 Emmanuel Altamirano 与 Esteban Molina 创造，12 月在布宜诺斯艾利斯方尖碑首次亮相。首支视频播放量突破一千万，这个实验由此成为拉丁美洲首个大众化 AI 角色，并走入广告、电视和跨越国界的社群。',
    craftEyebrow: '这不是按一下按钮',
    craftTitle: '每一个镜头背后都有人。',
    craftText: '创意、编剧与影像团队共同掌控节奏、灯光、表演、剪辑及每一项视觉决定。AI 加速制作，但观点始终来自人。',
    stats: [
      { value: '10M+', label: '首支视频播放量' },
      { value: '12月', label: '方尖碑首次亮相' },
      { value: 'ARG → MX', label: '区域影响力' },
      { value: '创意 + AI', label: '我们的方法' },
    ],
    capabilitiesEyebrow: '我们做什么',
    capabilitiesTitle: '从一个创意到完整的品牌宇宙。',
    source: '故事与数据来源：Infobae。',
  },
  hi: {
    manifesto: 'CACHO घोषणापत्र / 01',
    storyEyebrow: 'शौक से सांस्कृतिक घटना तक',
    storyTitle: 'CACHO का जन्म अधिक स्वतंत्र, वास्तविक और अलग हास्य के लिए हुआ।',
    storyText: 'Emmanuel Altamirano और Esteban Molina द्वारा बनाया गया Cacho दिसंबर में ब्यूनस आयर्स के ओबेलिस्क पर सामने आया। उसके पहले वीडियो ने एक करोड़ से अधिक व्यू पाए और यह प्रयोग लैटिन अमेरिका का पहला व्यापक लोकप्रिय AI किरदार बन गया।',
    craftEyebrow: 'यह सिर्फ बटन दबाना नहीं है',
    craftTitle: 'हर शॉट के पीछे लोग हैं।',
    craftText: 'क्रिएटिव, लेखक और फिल्ममेकर गति, रोशनी, अभिनय, संपादन और हर दृश्य निर्णय पर काम करते हैं। AI निर्माण को तेज़ करता है; नज़र इंसानी रहती है।',
    stats: [
      { value: '10M+', label: 'पहले वीडियो पर व्यू' },
      { value: 'दिसं.', label: 'ओबेलिस्क पर शुरुआत' },
      { value: 'ARG → MX', label: 'क्षेत्रीय पहुँच' },
      { value: 'विचार + AI', label: 'हमारा तरीका' },
    ],
    capabilitiesEyebrow: 'हम क्या करते हैं',
    capabilitiesTitle: 'एक विचार से पूरे ब्रांड यूनिवर्स तक।',
    source: 'कहानी और आँकड़े Infobae द्वारा प्रकाशित।',
  },
  fr: {
    manifesto: 'LE MANIFESTE CACHO / 01',
    storyEyebrow: 'DU HOBBY AU PHÉNOMÈNE',
    storyTitle: 'CACHO EST NÉ POUR UN HUMOUR PLUS LIBRE, PLUS RÉEL ET PLUS DISRUPTIF.',
    storyText: 'Créé par Emmanuel Altamirano et Esteban Molina, Cacho a fait ses débuts en décembre à l’Obélisque de Buenos Aires. Sa première vidéo a dépassé dix millions de vues et l’expérience est devenue le premier personnage IA grand public d’Amérique latine.',
    craftEyebrow: 'CE N’EST PAS APPUYER SUR UN BOUTON',
    craftTitle: 'IL Y A DES HUMAINS DERRIÈRE CHAQUE PLAN.',
    craftText: 'Créatifs, scénaristes et réalisateurs travaillent le rythme, la lumière, le jeu, le montage et chaque décision visuelle. L’IA accélère la production ; le regard reste humain.',
    stats: [
      { value: '10M+', label: 'VUES SUR LA PREMIÈRE VIDÉO' },
      { value: 'DÉC.', label: 'DÉBUT À L’OBÉLISQUE' },
      { value: 'ARG → MX', label: 'PORTÉE RÉGIONALE' },
      { value: 'IDÉE + IA', label: 'NOTRE MÉTHODE' },
    ],
    capabilitiesEyebrow: 'CE QUE NOUS FAISONS',
    capabilitiesTitle: 'D’UNE IDÉE À TOUT UN UNIVERS DE MARQUE.',
    source: 'Histoire et chiffres publiés par Infobae.',
  },
  ar: {
    manifesto: 'بيان CACHO / 01',
    storyEyebrow: 'من هواية إلى ظاهرة',
    storyTitle: 'وُلد CACHO ليقدّم فكاهة أكثر حرية وواقعية وجرأة.',
    storyText: 'ابتكر Emmanuel Altamirano وEsteban Molina شخصية Cacho، وظهرت لأول مرة في ديسمبر عند مسلة بوينس آيرس. تجاوز الفيديو الأول عشرة ملايين مشاهدة، وتحولت التجربة إلى أول شخصية جماهيرية بالذكاء الاصطناعي في أمريكا اللاتينية.',
    craftEyebrow: 'الأمر ليس مجرد ضغطة زر',
    craftTitle: 'خلف كل لقطة أشخاص حقيقيون.',
    craftText: 'يعمل المبدعون والكتّاب وصنّاع الأفلام على الإيقاع والإضاءة والأداء والمونتاج وكل قرار بصري. الذكاء الاصطناعي يسرّع الإنتاج، لكن الرؤية تظل إنسانية.',
    stats: [
      { value: '10M+', label: 'مشاهدة للفيديو الأول' },
      { value: 'ديسمبر', label: 'الظهور الأول عند المسلة' },
      { value: 'ARG → MX', label: 'انتشار إقليمي' },
      { value: 'فكرة + AI', label: 'منهجنا' },
    ],
    capabilitiesEyebrow: 'ما الذي نفعله',
    capabilitiesTitle: 'من فكرة واحدة إلى عالم كامل للعلامة التجارية.',
    source: 'القصة والأرقام منشورة في Infobae.',
  },
  bn: {
    manifesto: 'CACHO ম্যানিফেস্টো / 01',
    storyEyebrow: 'শখ থেকে আলোচিত ঘটনা',
    storyTitle: 'আরও স্বাধীন, বাস্তব ও ব্যতিক্রমী হাস্যরস তৈরির জন্য CACHO-র জন্ম।',
    storyText: 'Emmanuel Altamirano ও Esteban Molina নির্মিত Cacho ডিসেম্বর মাসে বুয়েনস আইরেসের ওবেলিস্কে আত্মপ্রকাশ করে। প্রথম ভিডিওটি এক কোটির বেশি ভিউ পায় এবং এই পরীক্ষা লাতিন আমেরিকার প্রথম গণজনপ্রিয় AI চরিত্রে পরিণত হয়।',
    craftEyebrow: 'এটি শুধু একটি বোতাম চাপা নয়',
    craftTitle: 'প্রতিটি শটের পেছনে মানুষ আছে।',
    craftText: 'ক্রিয়েটিভ, লেখক ও নির্মাতারা ছন্দ, আলো, অভিনয়, সম্পাদনা এবং প্রতিটি ভিজ্যুয়াল সিদ্ধান্তে কাজ করেন। AI প্রোডাকশন দ্রুত করে; দৃষ্টিভঙ্গি থাকে মানবিক।',
    stats: [
      { value: '10M+', label: 'প্রথম ভিডিওর ভিউ' },
      { value: 'ডিসে.', label: 'ওবেলিস্কে আত্মপ্রকাশ' },
      { value: 'ARG → MX', label: 'আঞ্চলিক পৌঁছ' },
      { value: 'আইডিয়া + AI', label: 'আমাদের পদ্ধতি' },
    ],
    capabilitiesEyebrow: 'আমরা যা করি',
    capabilitiesTitle: 'একটি আইডিয়া থেকে সম্পূর্ণ ব্র্যান্ড ইউনিভার্স।',
    source: 'গল্প ও পরিসংখ্যান Infobae-এ প্রকাশিত।',
  },
  pt: {
    manifesto: 'MANIFESTO CACHO / 01',
    storyEyebrow: 'DE HOBBY A FENÔMENO',
    storyTitle: 'CACHO NASCEU PARA FAZER UM HUMOR MAIS LIVRE, REAL E DISRUPTIVO.',
    storyText: 'Criado por Emmanuel Altamirano e Esteban Molina, Cacho estreou em dezembro no Obelisco de Buenos Aires. Seu primeiro vídeo superou dez milhões de visualizações e o experimento virou o primeiro personagem de IA de alcance massivo da América Latina.',
    craftEyebrow: 'NÃO É APENAS APERTAR UM BOTÃO',
    craftTitle: 'HÁ PESSOAS POR TRÁS DE CADA PLANO.',
    craftText: 'Criativos, roteiristas e realizadores trabalham ritmo, iluminação, atuação, montagem e cada decisão visual. A IA acelera a produção; o olhar continua humano.',
    stats: [
      { value: '10M+', label: 'VISUALIZAÇÕES NO PRIMEIRO VÍDEO' },
      { value: 'DEZ.', label: 'ESTREIA NO OBELISCO' },
      { value: 'ARG → MX', label: 'ALCANCE REGIONAL' },
      { value: 'IDEIA + IA', label: 'NOSSO MÉTODO' },
    ],
    capabilitiesEyebrow: 'O QUE FAZEMOS',
    capabilitiesTitle: 'DE UMA IDEIA A UM UNIVERSO INTEIRO DE MARCA.',
    source: 'História e números publicados pelo Infobae.',
  },
  ru: {
    manifesto: 'МАНИФЕСТ CACHO / 01',
    storyEyebrow: 'ОТ ХОББИ К ФЕНОМЕНУ',
    storyTitle: 'CACHO РОДИЛСЯ РАДИ БОЛЕЕ СВОБОДНОГО, ЖИВОГО И СМЕЛОГО ЮМОРА.',
    storyText: 'Созданный Emmanuel Altamirano и Esteban Molina, Cacho дебютировал в декабре у Обелиска в Буэнос-Айресе. Первое видео набрало более десяти миллионов просмотров, а эксперимент стал первым массовым ИИ-персонажем Латинской Америки.',
    craftEyebrow: 'ЭТО НЕ ПРОСТО НАЖАТЬ КНОПКУ',
    craftTitle: 'ЗА КАЖДЫМ КАДРОМ СТОЯТ ЛЮДИ.',
    craftText: 'Креаторы, сценаристы и режиссёры работают над ритмом, светом, актёрской игрой, монтажом и каждым визуальным решением. ИИ ускоряет производство, но взгляд остаётся человеческим.',
    stats: [
      { value: '10M+', label: 'ПРОСМОТРОВ ПЕРВОГО ВИДЕО' },
      { value: 'ДЕК.', label: 'ДЕБЮТ У ОБЕЛИСКА' },
      { value: 'ARG → MX', label: 'РЕГИОНАЛЬНЫЙ ОХВАТ' },
      { value: 'ИДЕЯ + ИИ', label: 'НАШ МЕТОД' },
    ],
    capabilitiesEyebrow: 'ЧТО МЫ ДЕЛАЕМ',
    capabilitiesTitle: 'ОТ ОДНОЙ ИДЕИ ДО ЦЕЛОЙ ВСЕЛЕННОЙ БРЕНДА.',
    source: 'История и цифры опубликованы Infobae.',
  },
  id: {
    manifesto: 'MANIFESTO CACHO / 01',
    storyEyebrow: 'DARI HOBI MENJADI FENOMENA',
    storyTitle: 'CACHO LAHIR UNTUK HUMOR YANG LEBIH BEBAS, NYATA, DAN DISRUPTIF.',
    storyText: 'Diciptakan oleh Emmanuel Altamirano dan Esteban Molina, Cacho debut pada Desember di Obelisk Buenos Aires. Video pertamanya melampaui sepuluh juta tayangan dan eksperimen ini menjadi karakter AI massal pertama di Amerika Latin.',
    craftEyebrow: 'INI BUKAN SEKADAR MENEKAN TOMBOL',
    craftTitle: 'ADA MANUSIA DI BALIK SETIAP SHOT.',
    craftText: 'Tim kreatif, penulis, dan pembuat film mengerjakan ritme, pencahayaan, akting, penyuntingan, dan setiap keputusan visual. AI mempercepat produksi; sudut pandangnya tetap manusiawi.',
    stats: [
      { value: '10M+', label: 'TAYANGAN VIDEO PERTAMA' },
      { value: 'DES.', label: 'DEBUT DI OBELISK' },
      { value: 'ARG → MX', label: 'JANGKAUAN REGIONAL' },
      { value: 'IDE + AI', label: 'METODE KAMI' },
    ],
    capabilitiesEyebrow: 'APA YANG KAMI KERJAKAN',
    capabilitiesTitle: 'DARI SATU IDE MENJADI SEMESTA MEREK.',
    source: 'Kisah dan angka diterbitkan oleh Infobae.',
  },
};

const TRANSLATIONS: Record<Language, any> = {
  es: {
    nav: { trabajos: 'Trabajos', nosotros: 'Nosotros', contacto: 'Contacto' },
    hero: {
      eyebrow: 'LA PRIMERA PRODUCTORA CREATIVA 100% IA DE LATAM',
      title1: 'CREATIVIDAD',
      title2: 'HUMANA.',
      title3: 'POTENCIA',
      subtitle: 'La CREATIVIDAD es HUMANA, pero nuestra POTENCIA es IA. Desarrollamos conceptos, escribimos historias, diseñamos campañas y producimos contenido audiovisual para que las marcas sean imposibles de ignorar.',
      badge: 'SIN ACTORES EGOCÉNTRICOS',
      services: []
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

const CREATIVE_HUB_CREDIT: Record<Language, string> = {
  es: 'Pieza realizada para la agencia Creactive Hub.',
  en: 'Piece created for the Creactive Hub agency.',
  zh: '为 Creactive Hub 代理公司制作。',
  hi: 'Creactive Hub एजेंसी के लिए निर्मित।',
  fr: 'Pièce réalisée pour l’agence Creactive Hub.',
  ar: 'عمل أُنجز لصالح وكالة Creactive Hub.',
  bn: 'Creactive Hub এজেন্সির জন্য নির্মিত।',
  pt: 'Peça realizada para a agência Creactive Hub.',
  ru: 'Работа создана для агентства Creactive Hub.',
  id: 'Karya dibuat untuk agensi Creactive Hub.',
};

const FAN34_SPEC_CREDIT: Record<Language, string> = {
  es: 'Spec ad para la agencia Fan#34',
  en: 'Spec ad for the Fan#34 agency',
  zh: '为 Fan#34 代理公司制作的 Spec ad',
  hi: 'Fan#34 एजेंसी के लिए Spec ad',
  fr: 'Spec ad pour l’agence Fan#34',
  ar: 'إعلان تجريبي لصالح وكالة Fan#34',
  bn: 'Fan#34 এজেন্সির জন্য Spec ad',
  pt: 'Spec ad para a agência Fan#34',
  ru: 'Spec ad для агентства Fan#34',
  id: 'Spec ad untuk agensi Fan#34',
};

const FAN34_WORK_CREDIT: Record<Language, string> = {
  es: 'Trabajo para la agencia Fan#34',
  en: 'Work created for the Fan#34 agency',
  zh: '为 Fan#34 代理公司制作',
  hi: 'Fan#34 एजेंसी के लिए काम',
  fr: 'Travail réalisé pour l’agence Fan#34',
  ar: 'عمل لصالح وكالة Fan#34',
  bn: 'Fan#34 এজেন্সির জন্য কাজ',
  pt: 'Trabalho realizado para a agência Fan#34',
  ru: 'Работа для агентства Fan#34',
  id: 'Karya untuk agensi Fan#34',
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
    id: "Q9ZKoUoT4w0", isShort: false,
    titles: localizedTitle("Campaña anti Argentina x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "LLIwEkrWP4s", isShort: false,
    titles: localizedTitle("Spec Ad Bon Jovi para Agencia x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "f7KgP33ytiA", isShort: false,
    titles: localizedTitle("Avianca animada x Cacho"),
    descKey: "generated_ai",
    isSpecAd: true
  },
  {
    id: "otJEBDL1NXQ", isShort: false,
    titles: localizedTitle("AVIANCA  seguros de la tierra al cielo x Cacho"),
    descKey: "generated_ai",
    isSpecAd: true
  },
  {
    id: "6h5qgDVIORU", isShort: false,
    titles: localizedTitle("Otro Día Perdido (Día del Niño) x Cacho"),
    descKey: "generated_ai"
  },
  {
    id: "et_FJ1YoXxg", isShort: false,
    titles: localizedTitle("Vinnic x Cacho"),
    descKey: "generated_ai",
    isFan34Work: true
  },
  {
    id: "ETbeFjhkiAA", isShort: false,
    titles: localizedTitle("Bolden x Cacho"),
    descKey: "generated_ai",
    isFan34Work: true
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
    id: "M3VQ0VydAUc", isShort: false,
    titles: localizedTitle("Planchabragas - Torbe"),
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
    descKey: "generated_ai",
    isSpecAd: true
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
    descKey: "generated_ai",
    isSpecAd: true,
    isFan34Spec: true
  },
  {
    id: "aeJ72DcaYC0", isShort: true,
    titles: localizedTitle("Liliana x Cacho"),
    descKey: "generated_ai",
    isFan34Work: true
  },
  {
    id: "_sQgV29AmKQ", isShort: true,
    titles: localizedTitle("Liliana x Cacho"),
    descKey: "generated_ai",
    isFan34Work: true
  },
  {
    id: "8jIrO55s1FM", isShort: true,
    titles: localizedTitle("Tau x Cacho"),
    descKey: "generated_ai",
    isSpecAd: true,
    isFan34Spec: true
  },
  {
    id: "tTIRyt2Fmas", isShort: true,
    titles: localizedTitle("Franui x Cacho"),
    descKey: "generated_ai",
    isSpecAd: true,
    isFan34Spec: true
  },
  {
    id: "-YkX1zSSMvQ", isShort: true,
    titles: localizedTitle("Manchester x Cacho"),
    descKey: "generated_ai",
    isFan34Work: true
  },
  {
    id: "I4ZDCC7B6Bg", isShort: true,
    titles: localizedTitle("Colgate x Cacho"),
    descKey: "generated_ai",
    isSpecAd: true,
    isFan34Spec: true
  },
  {
    id: "Hcvqa2eruh8", isShort: true,
    titles: localizedTitle("Mercado pago x cacho"),
    descKey: "generated_ai",
    isSpecAd: true
  }
];

type PortfolioVideoCardProps = {
  video: (typeof VIDEOS)[number];
  index: number;
  position: number;
  currentLang: Language;
  galleryCopy: SiteCopy['gallery'];
  isFeatured: boolean;
  previewsEnabled: boolean;
  onOpen: (index: number) => void;
};

const PortfolioVideoCard = React.memo(function PortfolioVideoCard({
  video,
  index,
  position,
  currentLang,
  galleryCopy,
  isFeatured,
  previewsEnabled,
  onOpen,
}: PortfolioVideoCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const title = video.titles[currentLang] || video.titles.en || video.titles.es;
  const shouldRenderPreview = previewsEnabled && isNearViewport;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !previewsEnabled) {
      setIsNearViewport(false);
      setPreviewReady(false);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setPreviewReady(false);
        }
      },
      {
        rootMargin: '280px 0px',
        threshold: 0.05,
      },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
    };
  }, [previewsEnabled]);

  const openVideo = () => onOpen(index);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (position % 4) * 0.05 }}
      role="button"
      tabIndex={0}
      aria-label={`${galleryCopy.openVideo}: ${title}`}
      className={`group relative w-full touch-manipulation cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 outline-none transition-[border-color,transform] duration-500 hover:border-[#F27D26]/70 focus-visible:border-[#F27D26] focus-visible:ring-2 focus-visible:ring-[#F27D26]/60 sm:rounded-3xl ${
        video.isShort ? 'aspect-[9/16]' : 'aspect-video'
      } ${isFeatured ? 'lg:col-span-2' : ''}`}
      onClick={openVideo}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openVideo();
        }
      }}
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        }}
        alt={`${galleryCopy.thumbnail}: ${title}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        loading={position < 3 && !video.isShort ? 'eager' : 'lazy'}
      />

      {shouldRenderPreview && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-[10%] h-[120%] w-[120%] transition-opacity duration-200 ${
            previewReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <YouTube
            key={`autoplay-preview-${video.id}`}
            videoId={video.id}
            title={`${galleryCopy.silentPreview}: ${title}`}
            className="pointer-events-none h-full w-full"
            iframeClassName="pointer-events-none h-full w-full"
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                loop: 1,
                playlist: video.id,
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
                iv_load_policy: 3,
                cc_load_policy: 0,
                showinfo: 0,
                mute: 1,
                vq: 'hd1080',
              },
            }}
            onReady={(event) => {
              event.target.mute();
              event.target.setVolume(0);
              // YouTube suele iniciar algunas vistas previas en 360p cuando hay
              // varios reproductores visibles. Solicitamos HD antes de reproducir.
              event.target.setPlaybackQuality('hd1080');
              event.target.playVideo();
            }}
            onPlay={(event) => {
              event.target.setPlaybackQuality('hd1080');
              setPreviewReady(true);
            }}
            onStateChange={(event) => {
              if (event.data !== 1) {
                setPreviewReady(false);
              }
            }}
            onError={() => setPreviewReady(false)}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5 lg:p-6">
        <div className="mb-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#F27D26] drop-shadow-[0_2px_5px_rgba(0,0,0,1)] sm:text-[10px]">
          <span className="h-px w-5 bg-[#F27D26] sm:w-7" />
          {String(position + 1).padStart(2, '0')}
        </div>
        <h3
          className={`max-w-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white drop-shadow-[0_3px_7px_rgba(0,0,0,1)] ${
            video.isShort
              ? 'text-xs sm:text-base lg:text-xl'
              : isFeatured
                ? 'text-xl sm:text-3xl lg:text-5xl'
                : 'text-base sm:text-xl lg:text-2xl'
          }`}
        >
          {title}
        </h3>
        {video.isFan34Spec ? (
          <p className="mt-1.5 text-[8px] font-black uppercase leading-snug tracking-[0.14em] text-white/75 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] sm:text-[10px]">
            {FAN34_SPEC_CREDIT[currentLang]}
          </p>
        ) : video.isFan34Work ? (
          <p className="mt-1.5 text-[8px] font-black uppercase leading-snug tracking-[0.14em] text-white/75 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] sm:text-[10px]">
            {FAN34_WORK_CREDIT[currentLang]}
          </p>
        ) : video.isSpecAd ? (
          <p className="mt-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-white/75 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] sm:text-[10px]">
            Spec ad
          </p>
        ) : null}
        {(video.id === 'oomjGUHKFlY' || video.id === 'IMMDsV006bk') && (
          <p className="mt-2 max-w-2xl text-[8px] font-semibold leading-snug tracking-[0.04em] text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] sm:text-[10px] lg:text-xs">
            {CREATIVE_HUB_CREDIT[currentLang]}
          </p>
        )}
      </div>

    </motion.article>
  );
});

const updateMetaContent = (selector: string, content: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'trabajos' | 'nosotros'>('trabajos');
  
  // La portada es la versión española; los demás idiomas tienen una URL rastreable propia.
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    if (langParam && LANGUAGES.some(l => l.code === langParam)) return langParam;
    return 'es';
  });

  const t = TRANSLATIONS[currentLang];
  const siteCopy = SITE_COPY[currentLang];
  const aboutCopy = ABOUT_COPY[currentLang];
  const aboutStory = ABOUT_STORY_COPY[currentLang];
  const aboutManifesto = ABOUT_MANIFESTO_COPY[currentLang];

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

  // Sincronizar idioma, dirección, metadatos y datos estructurados con la URL localizada.
  useEffect(() => {
    const localizedUrl = currentLang === 'es'
      ? 'https://cacho.ai/'
      : `https://cacho.ai/?lang=${currentLang}`;

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.title = siteCopy.seo.title;

    updateMetaContent('meta[name="description"]', siteCopy.seo.description);
    updateMetaContent('meta[property="og:title"]', siteCopy.seo.title);
    updateMetaContent('meta[property="og:description"]', siteCopy.seo.description);
    updateMetaContent('meta[property="og:url"]', localizedUrl);
    updateMetaContent('meta[property="og:locale"]', siteCopy.seo.locale);
    updateMetaContent('meta[name="twitter:title"]', siteCopy.seo.title);
    updateMetaContent('meta[name="twitter:description"]', siteCopy.seo.description);
    updateMetaContent('meta[name="twitter:url"]', localizedUrl);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = localizedUrl;

    let pageSchema = document.querySelector<HTMLScriptElement>('#localized-page-schema');
    if (!pageSchema) {
      pageSchema = document.createElement('script');
      pageSchema.id = 'localized-page-schema';
      pageSchema.type = 'application/ld+json';
      document.head.appendChild(pageSchema);
    }
    pageSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${localizedUrl}#webpage`,
      url: localizedUrl,
      name: siteCopy.seo.title,
      description: siteCopy.seo.description,
      inLanguage: currentLang,
      isPartOf: { '@id': 'https://cacho.ai/#website' },
      about: { '@id': 'https://cacho.ai/#organization' },
    });
  }, [currentLang, siteCopy]);

  useEffect(() => {
    const syncLanguageFromHistory = () => {
      const langParam = new URLSearchParams(window.location.search).get('lang') as Language | null;
      setCurrentLang(langParam && LANGUAGES.some(({ code }) => code === langParam) ? langParam : 'es');
    };
    window.addEventListener('popstate', syncLanguageFromHistory);
    return () => window.removeEventListener('popstate', syncLanguageFromHistory);
  }, []);

  // Cambiar idioma y actualizar URL
  const handleLanguageChange = (langCode: Language) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    const url = new URL(window.location.href);
    if (langCode === 'es') url.searchParams.delete('lang');
    else url.searchParams.set('lang', langCode);
    const newUrl = `${url.pathname}${url.search}${url.hash}`;
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

  const openVideo = useCallback((index: number) => {
    setActiveIndex(index);
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

  const indexedVideos = VIDEOS.map((video, index) => ({ video, index }));
  const findVideo = (id: string) => indexedVideos.find(({ video }) => video.id === id);
  const cachoHero = findVideo('Q9ZKoUoT4w0');
  const topWidescreen = ['LLIwEkrWP4s', '_16VPifqFgc']
    .map(findVideo)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const waveVideo = findVideo('oomjGUHKFlY');
  const verticalSpotlight = ['2tQwIZGvhPk', 'uuA2uO6F1n4', 'IMMDsV006bk']
    .map(findVideo)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const lostDayVideo = findVideo('IBh1BRPHbKo');
  const torbeCampanella = ['2Y8FpsZsIoo', 'U2EtsosufFI']
    .map(findVideo)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const fan34VerticalRow = ['_sQgV29AmKQ', '8jIrO55s1FM', 'tTIRyt2Fmas']
    .map(findVideo)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const widescreenTail = [
    'M3VQ0VydAUc',
    'f7KgP33ytiA',
    'otJEBDL1NXQ',
    'ETbeFjhkiAA',
    '6h5qgDVIORU',
    'et_FJ1YoXxg',
  ]
    .map(findVideo)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const featuredIds = new Set([
    ...(cachoHero ? [cachoHero.video.id] : []),
    ...topWidescreen.map(({ video }) => video.id),
    ...(waveVideo ? [waveVideo.video.id] : []),
    ...verticalSpotlight.map(({ video }) => video.id),
    ...(lostDayVideo ? [lostDayVideo.video.id] : []),
    ...torbeCampanella.map(({ video }) => video.id),
    ...fan34VerticalRow.map(({ video }) => video.id),
    ...widescreenTail.map(({ video }) => video.id),
  ]);
  const remainingWidescreen = indexedVideos.filter(
    ({ video }) => !video.isShort && !featuredIds.has(video.id),
  );
  const remainingVertical = indexedVideos.filter(
    ({ video }) => video.isShort && !featuredIds.has(video.id),
  );
  const portfolioOrder = [
    ...(cachoHero ? [cachoHero] : []),
    ...topWidescreen,
    ...(waveVideo ? [waveVideo] : []),
    ...verticalSpotlight,
    ...(lostDayVideo ? [lostDayVideo] : []),
    ...torbeCampanella,
    ...fan34VerticalRow,
    ...widescreenTail,
    ...remainingWidescreen,
    ...remainingVertical,
  ];
  const displayPosition = new Map(
    portfolioOrder.map(({ video }, position) => [video.id, position]),
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white relative">
      {/* Header Semántico */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Logo y Selector de Idioma */}
          <div className="relative">
            <motion.button
              type="button"
              aria-label="CACHO.Ai"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
              onClick={() => handleTabChange('trabajos')}
            >
              <span className="text-lg font-black uppercase leading-none tracking-tighter sm:text-2xl">
                CACHO<span className="text-[#F27D26]">.Ai</span>
              </span>
            </motion.button>
            
            {/* Language Selector (Absolute positioned below logo) */}
            <div className="absolute top-full start-0 mt-1" ref={langMenuRef}>
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
                    className="absolute top-full start-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[160px] z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-start px-4 py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${currentLang === lang.code ? 'text-[#F27D26]' : 'text-white'}`}
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
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 text-start relative overflow-hidden">
              {/* Logo de Fondo (Placeholder - User should replace src) */}
              <div className="pointer-events-none absolute right-3 top-[18%] z-0 h-[280px] w-[280px] opacity-15 sm:right-4 sm:top-1/2 sm:h-[500px] sm:w-[500px] sm:-translate-y-1/2 sm:opacity-20 lg:right-6 lg:h-[540px] lg:w-[540px] xl:right-8 xl:h-[560px] xl:w-[560px] xl:opacity-25">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 sm:text-xs">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#F27D26] shadow-[0_0_14px_rgba(242,125,38,0.9)]" />
                  {siteCopy.hero.eyebrow}
                </div>

                <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.86] tracking-tighter sm:text-6xl lg:text-7xl">
                  {siteCopy.hero.title1}<br/>
                  <span className="text-[#F27D26]">{siteCopy.hero.title2}</span><br/>
                  {siteCopy.hero.title3}
                  {siteCopy.hero.aiLabel && <> <span className="text-[#F27D26]">{siteCopy.hero.aiLabel}</span></>}
                </h1>

                <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <div className="inline-flex -rotate-2 items-center gap-2.5 rounded-full border-2 border-[#F27D26] bg-[#F27D26]/10 px-5 py-3 text-sm font-black uppercase tracking-[0.11em] text-[#F27D26] shadow-[0_0_30px_rgba(242,125,38,0.12)] sm:text-base">
                    <Flame className="h-5 w-5 fill-current" />
                    {siteCopy.hero.badge}
                  </div>
                  <p className="max-w-lg border-s-2 border-white/15 ps-4 text-sm font-medium leading-relaxed text-white/75 sm:text-base">
                    {siteCopy.hero.subtitle}
                  </p>
                </div>

              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="relative z-20 mx-1 mt-8 block w-[calc(100%-0.5rem)] max-w-xl rotate-2 overflow-hidden rounded-3xl border-2 border-black bg-[#F27D26] p-4 text-black shadow-[0_22px_70px_rgba(0,0,0,0.55)] sm:mx-0 sm:w-full sm:p-5 xl:absolute xl:right-6 xl:top-20 xl:mt-0 xl:w-[400px] xl:max-w-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/65">
                      {siteCopy.press.eyebrow}
                    </span>
                    <span className="h-px flex-1 bg-black/25" />
                    <span className="h-2 w-2 rounded-full bg-black" />
                  </div>

                  <p className="mt-4 text-lg font-black uppercase leading-[0.96] tracking-[-0.035em] text-black sm:text-xl">
                    {siteCopy.press.headline}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <a
                      href="https://www.clarin.com/zonales/cacho-primer-influencer-argentino-masivo-creado-ia_0_P5rpeasv5j.html"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={siteCopy.press.clarinAria}
                      className="group/media flex min-h-14 items-center justify-between gap-2 rounded-xl border border-black/25 bg-black/[0.06] px-3 py-3 transition-colors hover:bg-black/[0.13]"
                    >
                      <img
                        src={CLARIN_LOGO_SRC}
                        alt="Clarín"
                        className="h-6 w-auto max-w-[100px] object-contain brightness-0"
                      />
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-black transition-transform group-hover/media:translate-x-0.5 group-hover/media:-translate-y-0.5" />
                    </a>

                    <a
                      href="https://www.infobae.com/tendencias/2026/07/31/el-fenomeno-detras-de-cacho-el-influencer-creado-con-inteligencia-artificial-que-paso-de-un-hobby-a-trabajar-con-grandes-marcas/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={siteCopy.press.infobaeAria}
                      className="group/media flex min-h-14 items-center justify-between gap-2 rounded-xl border border-black/25 bg-black/[0.06] px-3 py-3 transition-colors hover:bg-black/[0.13]"
                    >
                      <img
                        src={INFOBAE_LOGO_SRC}
                        alt="Infobae"
                        className="h-6 w-auto max-w-[100px] object-contain brightness-0"
                      />
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-black transition-transform group-hover/media:translate-x-0.5 group-hover/media:-translate-y-0.5" />
                    </a>
                  </div>
              </motion.div>
            </section>

            {/* Portfolio Feed - Galería cinematográfica curada */}
            <section className="relative z-10 px-4 sm:px-6">
              {cachoHero && (
                <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-2">
                  <PortfolioVideoCard
                    video={cachoHero.video}
                    index={cachoHero.index}
                    position={displayPosition.get(cachoHero.video.id) ?? cachoHero.index}
                    currentLang={currentLang}
                    galleryCopy={siteCopy.gallery}
                    isFeatured
                    previewsEnabled={activeIndex === null}
                    onOpen={openVideo}
                  />
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
                {topWidescreen.map(({ video, index }) => (
                  <PortfolioVideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    position={displayPosition.get(video.id) ?? index}
                    currentLang={currentLang}
                    galleryCopy={siteCopy.gallery}
                    isFeatured={false}
                    previewsEnabled={activeIndex === null}
                    onOpen={openVideo}
                  />
                ))}
              </div>

              {waveVideo && (
                <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
                  <PortfolioVideoCard
                    video={waveVideo.video}
                    index={waveVideo.index}
                    position={displayPosition.get(waveVideo.video.id) ?? waveVideo.index}
                    currentLang={currentLang}
                    galleryCopy={siteCopy.gallery}
                    isFeatured
                    previewsEnabled={activeIndex === null}
                    onOpen={openVideo}
                  />
                </div>
              )}

              <div className="mt-10 sm:mt-16">
                <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-3">
                  {verticalSpotlight.map(({ video, index }) => (
                    <PortfolioVideoCard
                      key={video.id}
                      video={video}
                      index={index}
                      position={displayPosition.get(video.id) ?? index}
                      currentLang={currentLang}
                      galleryCopy={siteCopy.gallery}
                      isFeatured={false}
                      previewsEnabled={activeIndex === null}
                      onOpen={openVideo}
                    />
                  ))}
                </div>
              </div>

              {lostDayVideo && (
                <div className="mt-10 grid grid-cols-1 items-start gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2">
                  <PortfolioVideoCard
                    video={lostDayVideo.video}
                    index={lostDayVideo.index}
                    position={displayPosition.get(lostDayVideo.video.id) ?? lostDayVideo.index}
                    currentLang={currentLang}
                    galleryCopy={siteCopy.gallery}
                    isFeatured
                    previewsEnabled={activeIndex === null}
                    onOpen={openVideo}
                  />
                </div>
              )}

              {torbeCampanella.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-2">
                    {torbeCampanella.map(({ video, index }) => (
                      <PortfolioVideoCard
                        key={video.id}
                        video={video}
                        index={index}
                        position={displayPosition.get(video.id) ?? index}
                        currentLang={currentLang}
                        galleryCopy={siteCopy.gallery}
                        isFeatured={false}
                        previewsEnabled={activeIndex === null}
                        onOpen={openVideo}
                      />
                    ))}
                  </div>
                </div>
              )}

              {fan34VerticalRow.length > 0 && (
                <div className="mt-10 sm:mt-16">
                  <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-3">
                    {fan34VerticalRow.map(({ video, index }) => (
                      <PortfolioVideoCard
                        key={video.id}
                        video={video}
                        index={index}
                        position={displayPosition.get(video.id) ?? index}
                        currentLang={currentLang}
                        galleryCopy={siteCopy.gallery}
                        isFeatured={false}
                        previewsEnabled={activeIndex === null}
                        onOpen={openVideo}
                      />
                    ))}
                  </div>
                </div>
              )}

              {(widescreenTail.length > 0 || remainingWidescreen.length > 0) && (
                <div className="mt-4 sm:mt-6">
                  <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-flow-row-dense lg:grid-cols-2">
                    {[...widescreenTail, ...remainingWidescreen].map(({ video, index }) => (
                      <PortfolioVideoCard
                        key={video.id}
                        video={video}
                        index={index}
                        position={displayPosition.get(video.id) ?? index}
                        currentLang={currentLang}
                        galleryCopy={siteCopy.gallery}
                        isFeatured={video.id === 'M3VQ0VydAUc' || video.id === 'ETbeFjhkiAA'}
                        previewsEnabled={activeIndex === null}
                        onOpen={openVideo}
                      />
                    ))}
                  </div>
                </div>
              )}

              {remainingVertical.length > 0 && (
                <div className="mt-10 sm:mt-16">
                  <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-3">
                    {remainingVertical.map(({ video, index }) => (
                      <PortfolioVideoCard
                        key={video.id}
                        video={video}
                        index={index}
                        position={displayPosition.get(video.id) ?? index}
                        currentLang={currentLang}
                        galleryCopy={siteCopy.gallery}
                        isFeatured={false}
                        previewsEnabled={activeIndex === null}
                        onOpen={openVideo}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </>
        ) : (
          /* Sección Nosotros */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto min-w-0 max-w-7xl overflow-x-clip px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-36"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-black/20 bg-[#E9E6DF] text-black sm:rounded-[2.75rem]">
              <div className="grid min-w-0 lg:grid-cols-[1.06fr_0.94fr]">
                <div className="flex min-w-0 flex-col justify-between p-6 sm:min-h-[560px] sm:p-10 lg:p-12">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="min-w-0 text-[9px] font-black uppercase leading-relaxed tracking-[0.16em] text-black/60 sm:text-xs sm:tracking-[0.2em]">
                      {aboutManifesto.heroEyebrow}
                    </span>
                    <span className="hidden h-px flex-1 bg-black/25 sm:block" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#F27D26]" />
                  </div>

                  <div className="min-w-0 py-10 sm:py-14">
                    <h1 className="max-w-4xl break-normal text-[clamp(2.2rem,9.5vw,6.25rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] [hyphens:none] [overflow-wrap:normal] [word-break:normal] sm:text-[clamp(3.5rem,7vw,6.25rem)] lg:text-[clamp(3rem,4.2vw,4rem)]">
                      {aboutManifesto.heroTitle}
                    </h1>
                  </div>

                  <p className="max-w-3xl border-s-2 border-[#F27D26] ps-4 text-sm font-bold leading-relaxed text-black/70 sm:ps-5 sm:text-lg">
                    {aboutManifesto.heroText}
                  </p>
                </div>

                <div className="relative min-h-[330px] overflow-hidden border-t border-black/20 bg-black sm:min-h-[470px] lg:min-h-full lg:border-s lg:border-t-0">
                  <img
                    src="https://img.youtube.com/vi/67FMhfAcCBk/maxresdefault.jpg"
                    onError={(event) => {
                      event.currentTarget.src = 'https://img.youtube.com/vi/67FMhfAcCBk/hqdefault.jpg';
                    }}
                    alt={siteCopy.press.headline}
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-4 border border-white/35 sm:inset-6" />
                  <div className="absolute bottom-6 start-6 max-w-[calc(100%-3rem)] rounded-full bg-[#F27D26] px-4 py-2 text-[9px] font-black uppercase tracking-[0.13em] text-black sm:bottom-8 sm:start-8 sm:text-xs sm:tracking-[0.16em]">
                    {aboutStory.storyEyebrow}
                  </div>
                  <span className="absolute end-7 top-6 text-4xl font-black tracking-tighter text-white/85 sm:end-9 sm:top-8 sm:text-7xl">01</span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black sm:mt-4 lg:grid-cols-4">
              {aboutStory.stats.map((stat, index) => (
                <div
                  key={stat.value}
                  className={`min-h-32 p-5 sm:min-h-40 sm:p-6 ${index % 2 !== 0 ? 'border-s border-white/15' : ''} ${index > 1 ? 'border-t border-white/15 lg:border-t-0' : ''} ${index > 0 ? 'lg:border-s lg:border-white/15' : ''}`}
                >
                  <p className="text-2xl font-black uppercase tracking-[-0.05em] text-[#F27D26] sm:text-4xl">{stat.value}</p>
                  <p className="mt-3 max-w-[13rem] text-[9px] font-black uppercase leading-relaxed tracking-[0.14em] text-white/55 sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:pt-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F27D26] sm:text-xs">{aboutStory.storyEyebrow}</p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  {aboutStory.storyTitle}
                </h2>
              </div>
              <div className="flex flex-col justify-end">
                <p className="max-w-2xl text-base font-medium leading-relaxed text-white/65 sm:text-xl">{aboutStory.storyText}</p>
                <a
                  href="https://www.infobae.com/tendencias/2026/07/31/el-fenomeno-detras-de-cacho-el-influencer-creado-con-inteligencia-artificial-que-paso-de-un-hobby-a-trabajar-con-grandes-marcas/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#F27D26] hover:text-white sm:text-xs"
                >
                  {aboutStory.source} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-[1.5rem] border border-black bg-[#F27D26] text-black sm:rounded-[2.75rem]">
              <div className="grid min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex min-w-0 flex-col justify-between border-b border-black/25 p-6 sm:min-h-[470px] sm:p-10 lg:border-b-0 lg:border-e lg:p-12">
                  <div className="flex items-center gap-3">
                    <Flame className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/60 sm:text-xs sm:tracking-[0.22em]">{aboutManifesto.actorsEyebrow}</p>
                    <span className="h-px flex-1 bg-black/25" />
                  </div>
                  <h2 className="my-10 max-w-3xl break-normal text-[clamp(2.2rem,9.5vw,6.5rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] [hyphens:none] [overflow-wrap:normal] [word-break:normal] sm:text-[clamp(4rem,7vw,6.5rem)] sm:leading-[0.8] sm:tracking-[-0.07em] lg:text-[clamp(2.75rem,3.8vw,3.5rem)] lg:leading-[0.84] lg:tracking-[-0.055em]">
                    {aboutManifesto.actorsTitle}
                  </h2>
                  <p className="max-w-xl border-t border-black/25 pt-5 text-sm font-black uppercase leading-tight tracking-[-0.02em] sm:text-xl">
                    {aboutManifesto.actorsCounterpoint}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col justify-between p-6 sm:p-10 lg:p-12">
                  <span className="text-[4.5rem] font-black leading-none tracking-[-0.08em] text-black/10 sm:text-[8rem]">“</span>
                  <p className="-mt-6 max-w-3xl text-base font-bold leading-[1.65] text-black/75 sm:-mt-10 sm:text-xl lg:text-2xl">
                    {aboutManifesto.actorsText}
                  </p>
                  <div className="mt-8 flex items-center gap-4 sm:mt-12">
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/55 sm:text-xs">CACHO.AI — FILM PRODUCTION</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid overflow-hidden rounded-[1.75rem] border border-white/15 bg-zinc-950 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[300px] overflow-hidden sm:min-h-[430px]">
                <img
                  src="https://img.youtube.com/vi/oomjGUHKFlY/maxresdefault.jpg"
                  onError={(event) => {
                    event.currentTarget.src = 'https://img.youtube.com/vi/oomjGUHKFlY/hqdefault.jpg';
                  }}
                  alt="CACHO.Ai"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-5 start-5 max-w-[calc(100%-2.5rem)] bg-black px-3 py-2 text-white sm:bottom-7 sm:start-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] sm:text-xs">CACHO.Ai / FILM PRODUCTION</p>
                  <p className="mt-1 text-[8px] font-semibold leading-snug tracking-[0.04em] text-white/70 sm:text-[10px]">
                    {CREATIVE_HUB_CREDIT[currentLang]}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center border-t border-white/15 p-6 sm:p-10 lg:border-s lg:border-t-0 lg:p-12">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F27D26] sm:text-xs">{aboutStory.craftEyebrow}</p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl">{aboutStory.craftTitle}</h2>
                <p className="mt-6 text-sm font-medium leading-relaxed text-white/60 sm:text-lg">{aboutStory.craftText}</p>
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-[1.75rem] bg-[#E9E6DF] text-black sm:rounded-[2.25rem]">
              <div className="grid gap-6 border-b border-black/20 p-6 sm:p-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end lg:p-12">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/55 sm:text-xs">{aboutStory.capabilitiesEyebrow}</p>
                <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{aboutStory.capabilitiesTitle}</h2>
              </div>

              <div className="grid sm:grid-cols-3">
                {aboutCopy.pillars.map((pillar, index) => (
                  <article
                    key={pillar.title}
                    className={`min-h-56 p-6 sm:p-8 lg:min-h-64 lg:p-10 ${index > 0 ? 'border-t border-black/20 sm:border-s sm:border-t-0' : ''}`}
                  >
                    <div className="mb-12 flex items-center gap-3">
                      <span className="text-xs font-black tracking-[0.2em] text-[#F27D26]">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-px flex-1 bg-black/20" />
                    </div>
                    <h3 className="text-xl font-black uppercase leading-tight sm:text-2xl">{pillar.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-black/55 sm:text-base">{pillar.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 border-y border-white/15 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F27D26]">{siteCopy.press.eyebrow}</p>
                <p className="mt-2 text-sm font-bold text-white/60 sm:text-base">{aboutCopy.recognition}</p>
              </div>
              <div className="flex items-center gap-6 sm:gap-9">
                <a href="https://www.clarin.com/zonales/cacho-primer-influencer-argentino-masivo-creado-ia_0_P5rpeasv5j.html" target="_blank" rel="noreferrer" aria-label={siteCopy.press.clarinAria} className="group flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                  <img src={CLARIN_LOGO_SRC} alt="Clarín" className="h-5 w-auto max-w-[90px] object-contain" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="https://www.infobae.com/tendencias/2026/07/31/el-fenomeno-detras-de-cacho-el-influencer-creado-con-inteligencia-artificial-que-paso-de-un-hobby-a-trabajar-con-grandes-marcas/" target="_blank" rel="noreferrer" aria-label={siteCopy.press.infobaeAria} className="group flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                  <img src={INFOBAE_LOGO_SRC} alt="Infobae" className="h-5 w-auto max-w-[90px] object-contain" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <p className="mx-auto mt-14 max-w-5xl text-center text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:mt-20 sm:text-5xl">
              {aboutCopy.cta}
            </p>
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
        <p>&copy; {new Date().getFullYear()} CACHO.Ai. {siteCopy.footer.rights}</p>
        <p className="max-w-4xl mx-auto mt-3 px-6 text-[10px] sm:text-xs leading-relaxed text-white/30">
          {siteCopy.footer.disclaimer}
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
              aria-label={siteCopy.gallery.close}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Controles de Navegación (Desktop & Tablet) */}
            <button 
              onClick={handlePrevious}
              className="hidden sm:flex absolute left-4 sm:left-8 z-50 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label={siteCopy.gallery.previous}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button 
              onClick={handleNext}
              className="hidden sm:flex absolute right-4 sm:right-8 z-50 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label={siteCopy.gallery.next}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Contenedor del Video */}
            <div
              className={`relative mx-auto flex flex-col justify-center ${VIDEOS[activeIndex].isShort ? 'w-full max-w-sm aspect-[9/16]' : 'aspect-video'}`}
              style={VIDEOS[activeIndex].isShort ? undefined : { width: 'min(90vw, calc(88vh * 16 / 9))' }}
            >
              
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
                      disablekb: 1,
                      fs: 0,
                      rel: 0,
                      modestbranding: 1,
                      playsinline: 1,
                      iv_load_policy: 3,
                      cc_load_policy: 0,
                      showinfo: 0,
                      mute: 0,
                      start: 0,
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
                    e.target.seekTo(0, true);
                    e.target.unMute();
                    e.target.setVolume(100);
                    e.target.playVideo();
                  }}
                  onPlay={(e) => {
                    e.target.unMute();
                    e.target.setVolume(100);
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
                  aria-label={siteCopy.gallery.previous}
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <ChevronLeft className="w-6 h-6" /> {siteCopy.gallery.previous}
                </button>
                <span className="text-white/40 text-sm">
                  {activeIndex + 1} / {VIDEOS.length}
                </span>
                <button 
                  onClick={handleNext}
                  aria-label={siteCopy.gallery.next}
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  {siteCopy.gallery.next} <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
