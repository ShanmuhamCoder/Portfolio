import { motion } from "motion/react";
import { useEffect } from "react";

export const SplashScreenV1 = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.2,
        filter: "blur(20px)"
      }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#000000] flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <svg viewBox="0 0 400 120" className="w-[280px] md:w-[500px] overflow-visible">
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="transparent"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.3"
              fontSize="100"
              fontWeight="200"
              style={{ 
                letterSpacing: "0.3em",
                fontFamily: "var(--font-display)"
              }}
              initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
              animate={{ 
                strokeDashoffset: 0,
                fill: "rgba(255,255,255,1)",
                stroke: "rgba(255,255,255,0)"
              }}
              transition={{ 
                strokeDashoffset: { duration: 1.8, ease: "easeInOut" },
                fill: { duration: 0.8, delay: 1.2 },
                stroke: { duration: 0.8, delay: 1.2 }
              }}
            >
              GMS
            </motion.text>
          </svg>
          
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="absolute -bottom-2 left-0 right-0 h-[0.5px] bg-white/20 origin-center"
          />
        </div>
        
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: "circOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-[9px] uppercase tracking-[0.8em] text-white mt-6 font-light font-display"
        >
          Architecting Digital Experiences
        </motion.p>
      </div>

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"
      />
    </motion.div>
  );
};
