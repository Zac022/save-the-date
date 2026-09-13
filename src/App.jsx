import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Custom Compact Circular Countdown Component ---
const CountdownRing = ({ value, max, label }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center mx-1 md:mx-2.5">
      <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="1.5" />
          <circle
            cx="50" cy="50" r={radius} fill="none" stroke="#C5A880" strokeWidth="1.5"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="text-lg md:text-2xl font-serif font-light">{value}</span>
      </div>
      <span className="text-[7px] md:text-[8px] tracking-[0.3em] uppercase mt-2.5 opacity-60 text-[#C5A880]">
        {label}
      </span>
    </div>
  );
};

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const pressTimer = useRef(null);

  const [showGallery, setShowGallery] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const galleryPhotos = ['/photo1.jpeg', '/photo2.jpeg', '/photo3.png', '/photo4.jpeg', '/photo.jpg'];

  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handlePressStart = () => {
    if (isRevealed) return;
    setIsPressing(true);
    pressTimer.current = setTimeout(() => {
      setIsRevealed(true);
      setIsPressing(false);
    }, 1500); 
  };

  const handlePressEnd = () => {
    if (isRevealed) return;
    setIsPressing(false);
    clearTimeout(pressTimer.current);
  };

  const calculateTimeLeft = () => {
    const difference = +new Date("December 23, 2026") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard support for gallery navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showGallery) return;
      if (e.key === 'ArrowRight') {
        setCurrentPhoto((prev) => (prev + 1) % galleryPhotos.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentPhoto((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
      } else if (e.key === 'Escape') {
        setShowGallery(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery, galleryPhotos.length]);

  const googleCalGusaba = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiston+%26+Nancy+-+Gusaba+no+Gukwa&dates=20261223T100000Z/20261223T180000Z&details=Traditional+Ceremony+(Gusaba+no+Gukwa)&location=Kigali,+Rwanda";
  const googleCalReception = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiston+%26+Nancy+-+Wedding+Reception&dates=20261226T120000Z/20261226T230000Z&details=Wedding+Reception+Celebration&location=Kigali,+Rwanda";

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Fiston and Nancy Wedding//EN\nBEGIN:VEVENT\nDTSTAMP:20260913T023559Z\nDTSTART:20261223T100000Z\nDTEND:20261223T180000Z\nSUMMARY:Fiston & Nancy - Gusaba no Gukwa\nLOCATION:Kigali, Rwanda\nDESCRIPTION:Traditional Ceremony (Gusaba no Gukwa)\nEND:VEVENT\nBEGIN:VEVENT\nDTSTAMP:20260913T023559Z\nDTSTART:20261226T120000Z\nDTEND:20261226T230000Z\nSUMMARY:Fiston & Nancy - Wedding Reception\nLOCATION:Kigali, Rwanda\nDESCRIPTION:Wedding Reception Celebration\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fiston_Nancy_Wedding_Celebrations.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="relative bg-[#080808] text-white font-sans overflow-x-hidden selection:bg-[#C5A880] selection:text-black antialiased">
      
      {/* Background Photo & Enhanced Visible Gold Dust Particle Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
        <motion.img 
          src="/photo1.png" 
          alt="Fiston and Nancy" 
          className="w-full h-full object-cover object-[58%_center] md:object-center grayscale contrast-125"
          animate={{ 
            filter: isRevealed ? 'blur(0px) contrast(125%) grayscale(100%)' : 'blur(12px) contrast(125%) grayscale(100%)',
            opacity: isRevealed ? 0.75 : 0.35,
            scale: isRevealed ? 1 : 1.05 
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Enhanced Visible Gold Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(22)].map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomDuration = 5 + Math.random() * 7;
            const randomDelay = Math.random() * 4;
            const randomSize = 3 + Math.random() * 3;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#E5C598]"
                style={{
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  left: `${randomLeft}%`,
                  bottom: '-20px',
                  boxShadow: '0 0 12px 2px rgba(197, 168, 128, 0.9)',
                }}
                animate={{
                  y: [0, -window.innerHeight - 100],
                  opacity: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 40 : -40), 0]
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Interlocking Rings Gate with Refined Subtle Glow */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none cursor-pointer bg-black/20 backdrop-blur-[2px]"
            onPointerDown={handlePressStart}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative flex items-center justify-center w-48 h-28 mb-8">
              {/* Left Ring */}
              <motion.div 
                className="absolute w-24 h-24 rounded-full border border-[#C5A880]"
                style={{ left: '10px' }}
                animate={{ 
                  x: isPressing ? 10 : 0,
                  scale: isPressing ? 1.05 : 1,
                  boxShadow: isPressing 
                    ? '0 0 25px 2px rgba(197, 168, 128, 0.4), inset 0 0 10px rgba(197, 168, 128, 0.3)' 
                    : '0 0 10px rgba(197, 168, 128, 0.15)'
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Right Ring */}
              <motion.div 
                className="absolute w-24 h-24 rounded-full border border-[#C5A880]"
                style={{ right: '10px' }}
                animate={{ 
                  x: isPressing ? -10 : 0,
                  scale: isPressing ? 1.05 : 1,
                  boxShadow: isPressing 
                    ? '0 0 25px 2px rgba(197, 168, 128, 0.4), inset 0 0 10px rgba(197, 168, 128, 0.3)' 
                    : '0 0 10px rgba(197, 168, 128, 0.15)'
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <motion.p 
              className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880]"
              animate={{ opacity: isPressing ? 0.6 : 0.9 }}
            >
              {isPressing ? "Holding..." : "Hold to Reveal"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Champagne Gold Timeline Line */}
      <motion.div 
        className="fixed top-0 left-1/2 w-[1px] bg-[#C5A880] -translate-x-1/2 z-20 pointer-events-none"
        style={{ height: lineHeight, boxShadow: "0 0 20px 3px rgba(197, 168, 128, 0.5)" }}
      />

      {/* Scrolling Content */}
      {isRevealed && (
        <div className="relative z-20 w-full flex flex-col items-center">
          
          {/* HERO SECTION */}
          <section className="min-h-[90vh] sm:h-screen w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16">
            <div className="flex flex-col items-start z-10 w-full max-w-5xl mx-auto">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-2 mb-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#C5A880]" />
                  <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5A880]">
                    December 23: Gusaba no Gukwa
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5A880]/80">
                    December 26: Reception
                  </p>
                </div>
              </motion.div>

              <div className="relative w-full flex flex-col items-start">
                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-wide leading-none"
                >
                  Fiston
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
                  className="my-2 md:my-4 ml-12 md:ml-32 flex items-center gap-4"
                >
                  <div className="w-16 h-[1px] bg-[#C5A880]/50" />
                  <span className="text-3xl md:text-5xl font-serif italic text-[#C5A880]">and</span>
                  <div className="w-16 h-[1px] bg-[#C5A880]/50" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-wide leading-none self-end md:mr-24"
                >
                  Nancy
                </motion.h1>
              </div>

            </div>
            
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#C5A880]">Scroll</span>
            </motion.div>
          </section>

          {/* COUNTDOWN SECTION (Gusaba - Dec 23) */}
          <section className="w-full flex flex-col items-center justify-center py-24 md:py-32 px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="text-center w-full bg-black/50 backdrop-blur-md py-8 px-6 rounded-2xl max-w-lg mx-auto border border-[#C5A880]/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-[9px] tracking-[0.4em] uppercase text-[#C5A880] mb-1">Gusaba no Gukwa</h3>
              <p className="text-xs tracking-widest text-white/70 mb-6 font-serif italic">December 23, 2026</p>
              
              <div className="flex justify-center items-center gap-1 md:gap-3">
                <CountdownRing value={timeLeft.days} max={365} label="Days" />
                <CountdownRing value={timeLeft.hours} max={24} label="Hours" />
                <CountdownRing value={timeLeft.minutes} max={60} label="Mins" />
                <CountdownRing value={timeLeft.seconds} max={60} label="Secs" />
              </div>
            </motion.div>
          </section>

          {/* RECEPTION CARD (Dec 26) */}
          <section className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="text-center w-full bg-black/50 backdrop-blur-md py-10 px-8 rounded-2xl max-w-lg mx-auto border border-[#C5A880]/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-[9px] tracking-[0.4em] uppercase text-[#C5A880] mb-1">Wedding Reception</h3>
              <p className="text-xl md:text-2xl font-serif text-white/90 mb-2">December 26, 2026</p>
              <div className="w-8 h-[1px] bg-[#C5A880]/40 mx-auto my-4" />
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Kigali, Rwanda</p>
            </motion.div>
          </section>

          {/* SAVE THE DATE BUTTONS */}
          <section className="w-full flex flex-col items-center justify-center py-24 md:py-32 px-6 text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1 }}
             >
              <h2 className="text-xl md:text-2xl font-serif tracking-widest uppercase mb-2">Save The Dates</h2>
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-16 text-[#C5A880]">Add celebrations to your calendar</p>

              <div className="flex gap-16 md:gap-24 items-center justify-center">
                
                {/* Apple Button */}
                <div className="flex flex-col items-center group">
                  <button 
                    onClick={downloadICS}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F9F7F1] border border-[#C5A880]/40 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] transition-all duration-500 shadow-xl"
                  >
                    <svg className="w-8 h-8 fill-[#6B1D23]" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </button>
                  <span className="text-[10px] tracking-[0.3em] uppercase mt-6 opacity-80 text-[#C5A880]">Apple</span>
                </div>

                {/* Google Button */}
                <div className="flex flex-col items-center group">
                  <button 
                    onClick={() => setShowGoogleModal(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F9F7F1] border border-[#C5A880]/40 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] transition-all duration-500 shadow-xl"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8 fill-[#6B1D23]" viewBox="0 0 448 512">
                      <path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329.4 282.6c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L273.4 429.3c-12.5 12.5-32.8 12.5-45.3 0l-71.3-71.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L250.7 361.4 329.4 282.6z"/>
                    </svg>
                  </button>
                  <span className="text-[10px] tracking-[0.3em] uppercase mt-6 opacity-80 text-[#C5A880]">Google</span>
                </div>

              </div>
             </motion.div>
          </section>

          {/* SNEAK PEEKS PROMPT */}
          <section className="w-full flex flex-col items-center justify-start py-20 px-6 pb-32">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
              <button 
                onClick={() => setShowGallery(true)}
                className="px-10 py-4 bg-black/60 backdrop-blur-md border border-[#C5A880]/60 text-[#C5A880] text-xs tracking-[0.3em] uppercase hover:bg-[#C5A880] hover:text-black transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(197,168,128,0.2)]"
              >
                Sneak Peeks — Civil Wedding
              </button>
            </motion.div>
          </section>

        </div>
      )}

      {/* Google Calendar Selection Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-[#111] border border-[#C5A880]/30 p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setShowGoogleModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-xs tracking-widest"
              >
                ✕
              </button>

              <h3 className="text-sm tracking-[0.3em] uppercase text-[#C5A880] mb-2">Google Calendar</h3>
              <p className="text-xs text-white/60 mb-6 font-serif italic">Choose which date to add:</p>

              <div className="flex flex-col gap-4">
                <a 
                  href={googleCalGusaba} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setShowGoogleModal(false)}
                  className="py-3 px-6 rounded-full bg-[#F9F7F1] text-[#6B1D23] font-medium text-xs tracking-widest uppercase hover:bg-[#C5A880] transition-colors"
                >
                  Gusaba (Dec 23)
                </a>
                <a 
                  href={googleCalReception} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setShowGoogleModal(false)}
                  className="py-3 px-6 rounded-full bg-[#F9F7F1] text-[#6B1D23] font-medium text-xs tracking-widest uppercase hover:bg-[#C5A880] transition-colors"
                >
                  Reception (Dec 26)
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Soft-Curved Cinematic Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between z-50 w-full max-w-7xl mx-auto">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880]">Civil Wedding Archives</span>
                <span className="text-xs font-serif italic text-white/60">Moment {currentPhoto + 1} of {galleryPhotos.length}</span>
              </div>
              <button 
                onClick={() => setShowGallery(false)}
                className="px-5 py-2 rounded-full border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880] hover:text-black text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
              >
                Close ✕
              </button>
            </div>

            {/* Main Active Photo View with Pillowed/Soft Curves */}
            <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentPhoto}
                  src={galleryPhotos[currentPhoto]}
                  alt="Wedding Moments"
                  className="max-h-[62vh] md:max-h-[68vh] max-w-full object-contain rounded-2xl md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-[#C5A880]/20"
                  initial={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(6px)", scale: 1.04 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </AnimatePresence>

              {/* Minimalist Floating Arrows */}
              <button 
                onClick={() => setCurrentPhoto((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)}
                className="absolute left-4 md:left-12 p-3 rounded-full bg-black/40 border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880] hover:text-black transition-all text-xl"
              >
                ‹
              </button>
              <button 
                onClick={() => setCurrentPhoto((prev) => (prev + 1) % galleryPhotos.length)}
                className="absolute right-4 md:right-12 p-3 rounded-full bg-black/40 border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880] hover:text-black transition-all text-xl"
              >
                ›
              </button>
            </div>

            {/* Bottom Soft-Curved Thumbnails Bar */}
            <div className="flex flex-col items-center gap-4 z-50 w-full max-w-xl mx-auto">
              <div className="flex items-center gap-2.5 md:gap-3.5 overflow-x-auto py-2 px-4 max-w-full scrollbar-none">
                {galleryPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhoto(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                      currentPhoto === i 
                        ? 'w-14 h-14 md:w-18 md:h-18 border-2 border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.6)] scale-105' 
                        : 'w-10 h-10 md:w-12 md:h-12 border border-white/20 opacity-40 hover:opacity-80 rounded-lg'
                    }`}
                  >
                    <img src={photo} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}