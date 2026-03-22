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
          Designing the Future of Interaction
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
    image: "https://picsum.photos/seed/zepto-ux-redesign/1200/800",
    color: "from-purple-700 via-indigo-600 to-purple-800"
  }
];

const skills = [
  { name: "Frontend", icon: <Layout className="w-5 h-5" />, items: ["React", "TypeScript", "Tailwind CSS", "Next.js"], color: "text-blue-400" },
  { name: "Backend", icon: <Terminal className="w-5 h-5" />, items: ["Node.js", "Express", "PostgreSQL", "Firebase"], color: "text-purple-400" },
  { name: "AI & ML", icon: <Cpu className="w-5 h-5" />, items: ["Gemini AI", "OpenAI API", "TensorFlow.js"], color: "text-rose-400" },
  { name: "Tools", icon: <Code2 className="w-5 h-5" />, items: ["Git", "Docker", "Vite", "AWS"], color: "text-amber-400" }
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
      const sections = ["home", "about", "works", "skills", "contact"];
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
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">GMS</span>
                  </motion.div>
                  
                  <div className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                    {["home", "about", "works", "skills", "contact"].map((item) => (
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
                        {item === "works" ? "Works" : item}
                      </motion.a>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all"
                  >
                    Let's Talk
                  </motion.button>
                </div>
              </div>
            </nav>

            <main className="relative z-10">
              {/* Hero Section */}
              <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="max-w-5xl text-center">
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
                        Explore Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest backdrop-blur-md transition-all"
                      >
                        Contact Me
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
                >
                  <div className="w-1 h-2 bg-indigo-500 rounded-full" />
                </motion.div>
              </section>

              {/* About Section */}
              <section id="about" className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl">
                        <img 
                          src="https://picsum.photos/seed/gms-designer/1000/1000" 
                          alt="Profile" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                      
                      <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="absolute -bottom-10 -right-10 p-8 bg-indigo-600/20 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl hidden md:block"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            <Layers size={24} />
                          </div>
                          <div>
                            <p className="text-white font-black uppercase tracking-tighter text-lg">Product Design</p>
                            <p className="text-zinc-300 text-xs font-bold uppercase tracking-widest">Design with Purpose</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
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

                      <motion.button 
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm hover:text-indigo-400 transition-colors"
                      >
                        Download Resume <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Selected Works Section */}
              <section id="works" className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 text-indigo-400 mb-6">
                        <div className="w-8 h-[2px] bg-indigo-500" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">Selected Works</span>
                      </div>
                      <h2 className="text-6xl font-black text-white leading-none font-display">Portfolio</h2>
                    </motion.div>
                    <p className="text-zinc-500 max-w-md font-medium">
                      A curated collection of digital experiences where I've combined 
                      technical excellence with innovative design.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {works.map((work, index) => (
                      <motion.div
                        key={work.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -12,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className="project-card group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/20 cursor-pointer"
                      >
                        <a 
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img 
                              src={work.image} 
                              alt={work.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                            <div className="absolute top-6 right-6 flex gap-2">
                              <div className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <ExternalLink size={18} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-8">
                            <div className="flex flex-wrap gap-2 mb-6">
                              {work.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 text-zinc-400 rounded-lg border border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white group-hover:text-indigo-400 transition-colors font-display">
                              {work.title}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                              {work.description}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                              <div className="text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 transition-colors flex items-center gap-2">
                                View Case Study <ExternalLink size={14} />
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
                      <h2 className="text-6xl font-black text-white mb-6 font-display">Tech Stack</h2>
                      <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium">
                        I use a modern and powerful set of tools to bring ideas to life with 
                        efficiency and precision.
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
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

              {/* Contact Section */}
              <section id="contact" className="py-40 px-4 relative">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
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
                            { icon: <Linkedin size={24} />, href: "#" },
                            { icon: <Github size={24} />, href: "#" },
                            { icon: <Globe size={24} />, href: "#" }
                          ].map((social, i) => (
                            <motion.a
                              key={i}
                              href={social.href}
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
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                    <Zap size={16} fill="currentColor" />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-white uppercase">GMS.port</span>
                </div>
                
                <div className="flex gap-8">
                  {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map(item => (
                    <motion.a 
                      key={item} 
                      href="#" 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                      {item}
                    </motion.a>
                  ))}
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


