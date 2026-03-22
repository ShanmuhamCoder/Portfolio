import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

type CursorState = "default" | "hover" | "view" | "drag";

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Primary Dot (Instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Trailing Follower (Spring Physics)
  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };
  const followerX = useSpring(dotX, springConfig);
  const followerY = useSpring(dotY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    dotX.set(e.clientX);
    dotY.set(e.clientY);
    if (!isVisible) setIsVisible(true);

    const target = e.target as HTMLElement;
    
    // Determine Cursor State
    const isProjectCard = target.closest(".project-card");
    const isDraggable = target.closest(".draggable");
    const isInteractive = 
      target.tagName === "A" || 
      target.tagName === "BUTTON" || 
      target.closest("button") || 
      target.closest("a") ||
      target.classList.contains("cursor-pointer");

    if (isProjectCard) {
      setCursorState("view");
    } else if (isDraggable) {
      setCursorState("drag");
    } else if (isInteractive) {
      setCursorState("hover");
    } else {
      setCursorState("default");
    }
  }, [dotX, dotY, isVisible]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", () => setIsVisible(true));
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  // Disable on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Primary Dot */}
            <motion.div
              className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-500 rounded-full z-[10000]"
              style={{ 
                x: dotX, 
                y: dotY, 
                translateX: "-50%", 
                translateY: "-50%" 
              }}
            />

            {/* Trailing Follower */}
            <motion.div
              className="fixed top-0 left-0 flex items-center justify-center rounded-full bg-white mix-blend-difference"
              style={{
                x: followerX,
                y: followerY,
                translateX: "-50%",
                translateY: "-50%",
                width: 40,
                height: 40,
              }}
              animate={{
                scale: isClicked 
                  ? 0.85 
                  : (cursorState === "default" ? 1 : cursorState === "hover" ? 1.8 : 2.5),
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                scale: { duration: 0.1 } 
              }}
            >
              <AnimatePresence mode="wait">
                {cursorState === "view" && (
                  <motion.span
                    key="view"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-[8px] font-black uppercase tracking-widest text-black"
                  >
                    View
                  </motion.span>
                )}
                {cursorState === "drag" && (
                  <motion.span
                    key="drag"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-[8px] font-black uppercase tracking-widest text-black"
                  >
                    Drag
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
