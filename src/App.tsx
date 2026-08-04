/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, Sparkles, Flame, X, ChevronLeft, ChevronRight, Globe, ArrowUpRight } from 'lucide-react';
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
    services: string[];
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
      subtitle: 'Creamos piezas que sorprenden y hacen hablar.',
      badge: 'SIN ACTORES EGOCÉNTRICOS',
      services: ['COMERCIALES', 'CINE', 'INSTITUCIONALES', 'UGC'],
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
      subtitle: 'We create work that surprises people and gets them talking.',
      badge: 'NO EGOCENTRIC ACTORS',
      services: ['COMMERCIALS', 'FILM', 'CORPORATE', 'UGC'],
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
      subtitle: '我们创作令人惊喜并引发讨论的作品。',
      badge: '不用自恋的演员',
      services: ['广告', '影视', '企业视频', 'UGC'],
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
      subtitle: 'हम ऐसी रचनाएँ बनाते हैं जो चौंकाती हैं और चर्चा शुरू करती हैं।',
      badge: 'अहंकारी अभिनेताओं के बिना',
      services: ['विज्ञापन', 'फ़िल्म', 'कॉर्पोरेट', 'UGC'],
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
      subtitle: 'Nous créons des œuvres qui surprennent et font parler.',
      badge: 'SANS ACTEURS ÉGOCENTRIQUES',
      services: ['PUBLICITÉS', 'CINÉMA', 'INSTITUTIONNEL', 'UGC'],
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
      subtitle: 'نصنع أعمالًا تفاجئ الناس وتثير الحديث.',
      badge: 'بدون ممثلين أنانيين',
      services: ['إعلانات', 'سينما', 'مؤسسات', 'UGC'],
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
      subtitle: 'আমরা এমন কাজ তৈরি করি যা চমকে দেয় এবং আলোচনা তৈরি করে।',
      badge: 'আত্মকেন্দ্রিক অভিনেতা ছাড়া',
      services: ['বিজ্ঞাপন', 'সিনেমা', 'কর্পোরেট', 'UGC'],
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
      subtitle: 'Criamos peças que surpreendem e fazem as pessoas falar.',
      badge: 'SEM ATORES EGOCÊNTRICOS',
      services: ['COMERCIAIS', 'CINEMA', 'INSTITUCIONAIS', 'UGC'],
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
      subtitle: 'Мы создаём работы, которые удивляют и вызывают обсуждение.',
      badge: 'БЕЗ ЭГОЦЕНТРИЧНЫХ АКТЁРОВ',
      services: ['РЕКЛАМА', 'КИНО', 'КОРПОРАТИВНОЕ', 'UGC'],
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
      subtitle: 'Kami membuat karya yang mengejutkan dan menjadi bahan pembicaraan.',
      badge: 'TANPA AKTOR EGOSENTRIS',
      services: ['IKLAN', 'FILM', 'KORPORAT', 'UGC'],
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
        if (!entry.isIntersecting) setPreviewReady(false);
      },
      {
        rootMargin: '280px 0px',
        threshold: 0.05,
      },
    );

    observer.observe(card);
    return () => observer.disconnect();
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
          className={`pointer-events-none absolute -inset-[5%] h-[110%] w-[110%] transition-opacity duration-500 ${
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
              },
            }}
            onReady={(event) => {
              event.target.mute();
              event.target.setVolume(0);
              event.target.playVideo();
            }}
            onPlay={() => setPreviewReady(true)}
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
              <div className="pointer-events-none absolute -right-20 top-[14%] z-0 h-[300px] w-[300px] opacity-15 sm:-right-24 sm:top-[64%] sm:h-[580px] sm:w-[580px] sm:-translate-y-1/2 sm:opacity-20 lg:-right-20 lg:h-[760px] lg:w-[760px] xl:-right-16 xl:h-[900px] xl:w-[900px] xl:opacity-25">
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
                  <div className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-[#F27D26] bg-[#F27D26]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#F27D26] shadow-[0_0_30px_rgba(242,125,38,0.12)] sm:text-sm">
                    <Flame className="h-4 w-4 fill-current" />
                    {siteCopy.hero.badge}
                  </div>
                  <p className="max-w-md border-s-2 border-white/15 ps-4 text-base font-medium leading-relaxed text-white/75 sm:text-lg">
                    {siteCopy.hero.subtitle}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {siteCopy.hero.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-white/55 sm:text-xs"
                    >
                      {service}
                    </span>
                  ))}
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

            {/* Portfolio Feed - Galería cinematográfica */}
            <section className="relative z-10 px-4 sm:px-6">
              {[false, true].map((isShort) => {
                const sectionVideos = VIDEOS
                  .map((video, index) => ({ video, index }))
                  .filter(({ video }) => video.isShort === isShort);

                return (
                  <div key={isShort ? 'verticales' : 'horizontales'} className={isShort ? 'mt-16 sm:mt-24' : ''}>
                    <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/15 pb-4 sm:mb-7">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#F27D26] shadow-[0_0_14px_rgba(242,125,38,0.9)]" />
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                          {isShort ? siteCopy.gallery.vertical : siteCopy.gallery.widescreen}
                        </p>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35 sm:text-xs">
                        {String(sectionVideos.length).padStart(2, '0')} {siteCopy.gallery.pieces}
                      </p>
                    </div>

                    <div
                      className={`grid items-start ${
                        isShort
                          ? 'grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3'
                          : 'grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'
                      }`}
                    >
                      {sectionVideos.map(({ video, index }, position) => {
                        const isFeatured = !isShort && (position === 0 || position === 5 || video.id === 'M3VQ0VydAUc');
                        return (
                          <PortfolioVideoCard
                            key={video.id}
                            video={video}
                            index={index}
                            position={position}
                            currentLang={currentLang}
                            galleryCopy={siteCopy.gallery}
                            isFeatured={isFeatured}
                            previewsEnabled={activeIndex === null}
                            onOpen={openVideo}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
                {t.nosotros.p2Part1} <strong className="text-white">CACHO.Ai</strong> {t.nosotros.p2Part2} <strong className="text-[#F27D26]">{t.nosotros.p2Part3}</strong>{t.nosotros.p2Part4}
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
