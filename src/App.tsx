/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "motion/react";
import { CustomCursor } from "./components/CustomCursor";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  User, 
  Terminal,
  ChevronRight,
  ChevronUp,
  Cpu,
  Globe,
  Layout,
  MessageSquare,
  Sparkles,
  Zap,
  Palette,
  Play,
  Code,
  Trophy,
  Layers
} from "lucide-react";
import { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(40px)"
      }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#000000] flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* The seamless Logo Reveal Video (with mix-blend-screen to drop background) */}
        <motion.video 
          src="/assets/logo_reveal_intro.mp4" 
          autoPlay 
          muted 
          playsInline
          preload="auto"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-48 md:w-64 mb-6 object-contain mix-blend-screen"
        />
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
                strokeDashoffset: { duration: 2.5, ease: "easeInOut" },
                fill: { duration: 1.2, delay: 2.0 },
                stroke: { duration: 1.2, delay: 2.0 }
              }}
            >
              GMS
            </motion.text>
          </svg>
          
          {/* Architectural accent lines */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2.0, delay: 0.8, ease: "circOut" }}
            className="absolute -bottom-2 left-0 right-0 h-[0.5px] bg-white/20 origin-center"
          />
        </div>
        
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "160px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.2, ease: "circOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, delay: 2.8 }}
          className="text-[9px] uppercase tracking-[0.8em] text-white mt-6 font-light font-display"
        >
          CRAFTING EXPERIENCE
        </motion.p>
      </div>

      {/* Sophisticated ambient glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"
      />
    </motion.div>
  );
};

const roles = [
  { text: "Creative Designer", icon: <Palette className="w-6 h-6" /> },
  { text: "Motion Designer", icon: <Play className="w-6 h-6" /> },
  { text: "Web Developer", icon: <Code className="w-6 h-6" /> }
];

const works = [
  {
    title: "Zepto UX Redesign",
    description: "Enhancing Quick-Commerce through Lens AI & Collaborative Shopping. A deep dive into improving user retention and discovery through innovative features.",
    tags: ["UX Research", "UI Design", "Figma", "4 Weeks"],
    link: "https://zepto-cs.netlify.app",
    github: "#",
    image: "/assets/zepto_thumbnail_new.png",
    color: "from-purple-700 via-indigo-600 to-purple-800"
  }
];

const skills = [
  { name: "Soft Skills", icon: <User className="w-5 h-5" />, items: ["Communication", "Problem Solving", "Teamwork", "Adaptability", "Time Management"], color: "text-blue-400" },
  { name: "Design Skills", icon: <Palette className="w-5 h-5" />, items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Thinking"], color: "text-rose-400" },
  { name: "Technical Skills", icon: <Code2 className="w-5 h-5" />, items: ["HTML/CSS/JS", "React", "Tailwind CSS", "Java", "SQL"], color: "text-emerald-400" }
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      const sections = ["home", "about", "works", "skills", "achievements", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-400 overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[100] origin-left"
              style={{ scaleX }}
            />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
              <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              scrolled ? "py-4 bg-black/40 backdrop-blur-xl border-b border-white/10" : "py-6 bg-transparent"
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer font-display"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:-rotate-12 transition-transform">
                      <img src="/assets/logoreveal.jpeg" alt="GMS Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">GMS PORTFOLIO</span>
                  </motion.div>
                  
                  <div className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                    {["home", "about", "works", "skills", "achievements", "contact"].map((item) => (
                      <motion.a
                        key={item}
                        href={`#${item}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                          activeSection === item 
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40" 
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item === "works" ? "Projects" : item}
                      </motion.a>
                    ))}
                  </div>

                  <motion.a
                    href="mailto:hello@gms.dev"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all"
                  >
                    Let's Talk
                  </motion.a>
                </div>
              </div>
            </nav>

            <main className="relative z-10">
              {/* Hero Section */}
              <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="max-w-5xl text-center pb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
                      <Sparkles size={14} /> Available for new work
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] font-display">
                      ENGINEERING <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        DIGITAL DREAMS
                      </span>
                    </h1>

                    <div className="h-12 flex items-center justify-center gap-3 mb-12 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={roleIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-indigo-400"
                        >
                          {roles[roleIndex].icon}
                          <span>{roles[roleIndex].text}</span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                      I’m a Product Designer and Developer focused on building 
                      immersive, high-performance digital experiences that balance aesthetic elegance 
                      with functional precision.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <motion.a
                        href="#works"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25 transition-all"
                      >
                        Explore Projects <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest backdrop-blur-md transition-all"
                      >
                        Hire Me
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-sm z-20"
                >
                  <div className="w-1 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                </motion.div>
              </section>

              {/* About Section */}
              <section id="about" className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl">
                        <img 
                          src="/assets/ai_image.jpeg" 
                          alt="Profile" 
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                      

                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="flex items-center gap-3 text-indigo-400 mb-6">
                        <div className="w-8 h-[2px] bg-indigo-500" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">About Me</span>
                      </div>
                      <h2 className="text-5xl font-black mb-8 leading-tight text-white font-display">
                        Design with Purpose. <br />
                        <span className="text-indigo-500">Build</span> with Precision.
                      </h2>
                      <p className="text-zinc-300 text-xl leading-relaxed mb-8 font-medium">
                        I’m a designer who builds and a developer who designs. I live in the space where complex engineering meets intuitive interface, making sure digital products don't just function—they feel right.
                      </p>
                      <p className="text-zinc-300 text-lg leading-relaxed mb-10 font-medium opacity-80">
                        My work is driven by a simple question: how can we make technology more human? Whether I’m sketching a flow or writing code, I’m focused on creating things that are useful, elegant, and genuinely valuable.
                      </p>

                      <motion.a 
                        href="/assets/resume.pdf"
                        download="Shanmuham_Resume.pdf"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all border border-indigo-500"
                      >
                        Download Resume <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Selected Works Section */}
              <section id="works" className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="flex items-center gap-3 text-indigo-400 mb-6">
                        <div className="w-8 h-[2px] bg-indigo-500" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">Projects</span>
                      </div>
                      <h2 className="text-6xl font-black text-white leading-none font-display">Projects</h2>
                    </motion.div>
                    <p className="text-zinc-500 max-w-md font-medium">
                      A curated collection of digital experiences where I've combined 
                      technical excellence with innovative design.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-10 max-w-4xl mx-auto">
                    {works.map((work, index) => (
                      <motion.div
                        key={work.title}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -12,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className="project-card group relative rounded-[2.5rem] overflow-hidden cursor-pointer w-full bg-zinc-900 border border-white/10"
                      >
                        <a 
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative w-full h-full md:aspect-[16/9] aspect-[4/3]"
                          data-cursor="view"
                        >
                          {/* Background Image Container */}
                          <img 
                            src={work.image} 
                            alt={work.title} 
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Overlay Gradients */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500" />
                          {/* Subtle dark overlay on hover to ensure text readability without changing the poster's actual color */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                          
                          {/* Bottom Content Container */}
                          <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-10 text-white">
                            
                            {/* Slide-Up Container */}
                            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {work.tags.map(tag => (
                                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              <h3 className="text-3xl font-black mb-2 font-display">
                                {work.title}
                              </h3>
                              
                              {/* Hidden by default, revealed via Grid 0fr trick! */}
                              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-0 group-hover:opacity-100">
                                <div className="overflow-hidden">
                                  <p className="text-zinc-200 text-sm leading-relaxed mt-3 mb-6 font-medium line-clamp-3">
                                    {work.description}
                                  </p>
                                  
                                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all hover:bg-zinc-200">
                                    View Case Study <ExternalLink size={14} />
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="py-32 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/5 blur-[150px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative">
                  <div className="text-center mb-24">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center gap-3 text-emerald-400 mb-6">
                        <div className="w-8 h-[2px] bg-emerald-500" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">Expertise</span>
                        <div className="w-8 h-[2px] bg-emerald-500" />
                      </div>
                      <h2 className="text-6xl font-black text-white mb-6 font-display">My Skills</h2>
                      <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium">
                        A dynamic blend of technical proficiency, design excellence, and essential interpersonal skills that drive successful project outcomes.
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group"
                      >
                        <motion.div 
                          whileHover={{ 
                            rotate: [0, -5, 5, 0], 
                            scale: 1.1,
                            filter: "drop-shadow(0 0 8px currentColor)"
                          }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center ${skill.color} mb-8 border border-white/5 shadow-xl transition-all duration-300 group-hover:bg-white/10`}
                        >
                          {skill.icon}
                        </motion.div>
                        <h3 className="text-2xl font-black mb-6 text-white font-display">{skill.name}</h3>
                        <div className="flex flex-wrap gap-3">
                          {skill.items.map(item => (
                            <span key={item} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white/5 text-zinc-400 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Achievements Section */}
              <section id="achievements" className="py-32 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-600/5 blur-[150px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative">
                  <div className="text-center mb-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center gap-3 text-pink-400 mb-6">
                        <div className="w-8 h-[2px] bg-pink-500" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">Beyond the Screen</span>
                        <div className="w-8 h-[2px] bg-pink-500" />
                      </div>
                      <h2 className="text-6xl font-black text-white mb-6 font-display">Athletic Achievements</h2>
                      <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium">
                        Discipline, strategy, and teamwork aren't just for digital projects. I bring the same competitive spirit and dedication to my professional life.
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Kabaddi Achievement */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 relative group overflow-hidden"
                    >
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-500" />
                      <div className="relative z-10">
                        <motion.div 
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-pink-400 mb-8 border border-white/5 shadow-xl group-hover:bg-white/10 transition-all"
                        >
                          <Trophy className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-2 text-white font-display">Kabaddi</h3>
                        <h4 className="text-pink-400 text-sm font-bold uppercase tracking-widest mb-6 border-b border-pink-500/20 pb-4 inline-block">State Level Champion</h4>
                        <p className="text-zinc-400 text-base leading-relaxed font-medium">
                          Attained the prestigious State Level Championship, demonstrating exceptional physical endurance, tactical awareness, and the ability to perform under high-pressure situations.
                        </p>
                      </div>
                    </motion.div>

                    {/* Cricket Achievement */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 relative group overflow-hidden"
                    >
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all duration-500" />
                      <div className="relative z-10">
                        <motion.div 
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-amber-400 mb-8 border border-white/5 shadow-xl group-hover:bg-white/10 transition-all"
                        >
                          <Trophy className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-2 text-white font-display">Cricket</h3>
                        <h4 className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-6 border-b border-amber-500/20 pb-4 inline-block">District Level Player</h4>
                        <p className="text-zinc-400 text-base leading-relaxed font-medium">
                          Represented at the District Level, showcasing strategic thinking, focus, and strong collaborative teamwork on the field.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-40 px-4 relative">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden text-center shadow-2xl shadow-indigo-500/20"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-3 text-white/80 mb-8">
                        <MessageSquare size={24} />
                        <span className="text-sm font-black uppercase tracking-[0.4em]">Get in Touch</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-none font-display">
                        Ready to start <br /> your next project?
                      </h2>
                      <p className="text-white/80 text-xl mb-14 max-w-2xl mx-auto font-medium">
                        I'm currently available for freelance work and full-time positions. 
                        Let's build something extraordinary together.
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-6">
                        <motion.a
                          href="mailto:hello@gms.dev"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
                        >
                          <Mail size={20} /> Say Hello
                        </motion.a>
                        <div className="flex gap-4">
                          {[
                            { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/gmshanmuham", label: "LinkedIn" },
                            { icon: <Github size={24} />, href: "https://github.com", label: "GitHub" }
                          ].map((social, i) => (
                            <motion.a
                              key={i}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.label}
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                              whileTap={{ scale: 0.9 }}
                              className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 transition-all"
                            >
                              {social.icon}
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </main>

            <footer className="py-20 px-4 border-t border-white/5 relative z-10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/20 hover:rotate-12 transition-transform cursor-pointer">
                    <img src="/assets/logoreveal.jpeg" alt="GMS Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-white uppercase">GMS PORTFOLIO</span>
                </div>
                


                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} GMS. All rights reserved.
                </p>
              </div>
            </footer>

            {/* Back to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 1)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-white/20 backdrop-blur-md transition-colors"
                >
                  <ChevronUp size={24} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


