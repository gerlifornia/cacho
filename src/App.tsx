/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Play, Instagram, MessageCircle, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// Lista de videos ordenados por prioridad con clasificación de formato (Shorts vs Regular)
const VIDEOS = [
  { id: "UMchZoJYREI", title: "Campaña Aderezos TAU", description: "Video 100% hecho con IA", isShort: true },
  { id: "hugScc-tf8c", title: "Comercial Fernet Branca", description: "100% hecho con IA", isShort: true },
  { id: "w8-AnteKVSw", title: "Comercial Neo QLED 85", description: "Electrodomésticos 100% IA", isShort: true },
  { id: "ils5lSAB3x0", title: "Publicidad Helados Franui", description: "100% hecho con IA", isShort: true },
  { id: "FvZHPkUbr3w", title: "Obra de Teatro Campanella", description: "Video hecho con IA", isShort: false },
  { id: "2qmk-FAnvYs", title: "El Renacer de Gilda", description: "Videoclip Pasión de Sábado", isShort: false },
  { id: "r9CwY4R81_k", title: "Trailer Película de Terror", description: "Película Argentina hecha con IA", isShort: false },
  { id: "G1Vb-IWnSuc", title: "Comercial Pico de Oro", description: "Comercial para TV con IA", isShort: false },
  { id: "7gf_WCqGKJU", title: "Comercial Arroz Gallo", description: "Video comercial IA", isShort: true },
  { id: "F5FLomhMJvc", title: "Parodia Política", description: "Generado con IA", isShort: true },
  { id: "kKKoV2tXTy4", title: "Contenido UGC Polimarket", description: "Contenido generado con IA", isShort: true },
  { id: "B_xxBGFUjXc", title: "Videoclip Leo Mattioli", description: "Pasión de Sábado 100% IA", isShort: false },
  { id: "YDtcXKXq5e8", title: "Creación de Contenido", description: "Generado con IA", isShort: true },
  { id: "Ya0bY_G_EnY", title: "Comercial de Cacho", description: "Generado con IA", isShort: true },
  { id: "GNTaILtDVQ0", title: "Noticiero IA", description: "Generado con IA", isShort: false },
  { id: "J3XXrOGaC4Y", title: "Comercial The Beetles", description: "Generado con IA", isShort: false },
  { id: "RiyWWRydKWo", title: "Animación IA", description: "Generada por IA", isShort: true },
  { id: "hynSfvLLeSU", title: "Spot Philips", description: "Spot publicitario con IA", isShort: true },
  { id: "iM3y0K-WCSI", title: "Personajes UGC", description: "Creación de personajes con IA", isShort: true },
  { id: "WCwsfVAZt7U", title: "Videoclip Rodrigo", description: "Creado con Inteligencia Artificial", isShort: false },
  { id: "ofoSYhA3Bp4", title: "Comercial TV", description: "Marcas de primera necesidad", isShort: false },
  { id: "Ahi1sSIVwO4", title: "Comercial TV 2", description: "Marcas de primera necesidad", isShort: false },
  { id: "gXnDKUg4UVA", title: "Spot Parodia", description: "Spot publicitario con IA", isShort: true },
  { id: "Ngsagu0H-00", title: "Noticiero UGC", description: "Personajes UGC con IA", isShort: true },
  { id: "4GXfQaOrhfw", title: "Video Musical", description: "Pasión de Sábado", isShort: false }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'trabajos' | 'nosotros'>('trabajos');

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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white">
      {/* Header Semántico */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
            onClick={() => handleTabChange('trabajos')}
          >
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#F27D26]" />
            <h1 className="font-bold text-lg sm:text-2xl tracking-tighter">cacho<span className="text-[#F27D26]">.ai</span></h1>
          </motion.div>
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
              Trabajos
            </button>
            <button 
              onClick={() => handleTabChange('nosotros')}
              className={`text-[10px] sm:text-sm font-semibold uppercase tracking-widest transition-colors ${activeTab === 'nosotros' ? 'text-[#F27D26]' : 'text-white/70 hover:text-white'}`}
            >
              Nosotros
            </button>
            <a 
              href="#contacto"
              className="text-[10px] sm:text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </motion.nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-24 w-full">
        {activeTab === 'trabajos' ? (
          <>
            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
                  CREAMOS<br/>
                  <span className="text-[#F27D26]">VIDEOS</span><br/>
                  CON <span className="text-[#F27D26]">IA.</span>
                </h2>
                <p className="text-white/60 text-base sm:text-lg lg:text-xl leading-relaxed max-w-md">
                  Productora audiovisual especializada en Inteligencia Artificial. Comerciales, videoclips y contenido UGC sin límites.
                </p>
              </motion.div>
            </section>

            {/* Portfolio Feed - Grilla Responsiva (Izquierda a Derecha) */}
            <section className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-center">
                {VIDEOS.map((video, index) => (
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
                      alt={`Miniatura del video: ${video.title}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 leading-tight">{video.title}</h3>
                      <p className="text-xs sm:text-sm text-white/70 line-clamp-2">{video.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Sección Nosotros */
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-8">
              EL MUNDO CAMBIÓ.<br/>
              <span className="text-[#F27D26]">LA FORMA DE HACER VIDEOS TAMBIÉN.</span>
            </h2>
            
            <div className="space-y-8 text-white/80 text-lg sm:text-xl leading-relaxed">
              <p>
                La producción audiovisual tradicional es lenta, costosa y está limitada por el mundo físico. Locaciones, actores, clima, presupuestos gigantescos... todo eso quedó en el pasado.
              </p>
              <p>
                En <strong className="text-white">Cacho.ai</strong> no grabamos, <strong className="text-[#F27D26]">creamos</strong>. Utilizamos Inteligencia Artificial generativa de última generación para transformar ideas en realidades visuales sin ningún tipo de límite.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl">
                  <Sparkles className="w-8 h-8 text-[#F27D26] mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Creatividad Infinita</h3>
                  <p className="text-sm text-white/60">¿Un comercial en Marte? ¿Un videoclip cyberpunk? Si podés imaginarlo, podemos generarlo.</p>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl">
                  <Sparkles className="w-8 h-8 text-[#F27D26] mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Tiempos Récord</h3>
                  <p className="text-sm text-white/60">Lo que antes tardaba meses de rodaje y postproducción, ahora lo resolvemos en una fracción del tiempo.</p>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl">
                  <Sparkles className="w-8 h-8 text-[#F27D26] mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Optimización</h3>
                  <p className="text-sm text-white/60">Reducimos drásticamente los costos operativos sin sacrificar calidad cinematográfica.</p>
                </div>
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4">
                No te quedes atrás. El futuro de tu marca se genera con IA.
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">¿Hacemos algo increíble?</h2>
            <p className="text-white/60 text-base sm:text-lg mb-8">Escribinos y contanos tu idea. El futuro es hoy.</p>
            
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

      {/* Footer Semántico */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Cacho.ai. Todos los derechos reservados.</p>
      </footer>

      {/* Video Modal con Navegación */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-0"
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
              <iframe
                src={`https://www.youtube.com/embed/${VIDEOS[activeIndex].id}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&showinfo=0`}
                title={VIDEOS[activeIndex].title}
                className={`w-full h-full shadow-2xl ${VIDEOS[activeIndex].isShort ? 'rounded-2xl' : 'sm:rounded-2xl'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Controles de Navegación Móvil (Abajo del video) */}
              <div className="flex sm:hidden justify-between items-center mt-6 px-2">
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
