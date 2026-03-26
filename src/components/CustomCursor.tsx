import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorState = 'default' | 'hover' | 'view' | 'drag';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');

  // Motion values for tracking cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics setup for the follower (Lags slightly behind for that premium feel)
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide default cursor globally on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      document.body.style.cursor = 'none';

      // Inject a style tag to override all cursors
      const style = document.createElement('style');
      style.id = 'custom-cursor-style';
      style.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(style);
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Event delegation to check what we are hovering over
      const target = e.target as HTMLElement;

      const clickableGroup = target.closest('a, button, input, [data-cursor="hover"], .cursor-pointer');
      const viewGroup = target.closest('[data-cursor="view"], .project-card');
      const dragGroup = target.closest('[data-cursor="drag"]');

      if (viewGroup) setCursorState('view');
      else if (dragGroup) setCursorState('drag');
      else if (clickableGroup) setCursorState('hover');
      else setCursorState('default');
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'auto';
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    };
  }, [mouseX, mouseY]);

  // Disable completely on mobile devices
  if (typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  // Define states for the OUTER follower
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      mixBlendMode: "difference" as const
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      mixBlendMode: "difference" as const
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      mixBlendMode: "normal" as const
    },
    drag: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      mixBlendMode: "normal" as const
    }
  };

  return (
    <>
      {/* Outer Follower */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* State text inside cursor */}
        <motion.span
          className="text-black text-[10px] font-black tracking-widest pointer-events-none absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: cursorState === 'view' || cursorState === 'drag' ? 1 : 0,
            scale: cursorState === 'view' || cursorState === 'drag' ? 1 : 0.5
          }}
        >
          {cursorState === 'view' ? 'VIEW' : 'DRAG'}
        </motion.span>
      </motion.div>

      {/* Inner Dot (Instant exact pointer) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorState === 'default' ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};
