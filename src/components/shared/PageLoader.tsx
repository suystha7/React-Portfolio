'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

const PageLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const colorOffsetRef = useRef(0);
  const [loadingWord, setLoadingWord] = useState('Initializing');

  const loadingWords = [
    'Initializing',
    'Compiling',
    'Building',
    'Optimizing',
    'Deploying',
    'Loading',
  ];

  useEffect(() => {
    // Rotate loading words
    let wordIndex = 0;
    const wordInterval = setInterval(() => {
      wordIndex = (wordIndex + 1) % loadingWords.length;
      setLoadingWord(loadingWords[wordIndex]);
    }, 400);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles - Hero section style
    const initParticles = () => {
      const particles: Particle[] = [];
      const width = window.innerWidth;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      
      // Similar particle count calculation as Hero
      const particleCount = Math.floor((canvas.width * canvas.height) / 18000);
      const numParticles = Math.min(particleCount, isMobile ? 30 : isTablet ? 40 : 60);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Match Hero velocity
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 1.2, // Match Hero radius
          hue: 25, // Orange
        });
      }
      particlesRef.current = particles;
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop - Hero section style
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const width = window.innerWidth;
      const isMobile = width < 640;
      
      const connectionDistance = isMobile ? 90 : 110; // Match Hero distance

      // Check if dark mode
      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(217, 119, 6, 0.4)';
      const lineColor = isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(217, 119, 6, 0.12)';

      // Update particle positions (wrapping like Hero)
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges (Hero style)
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles as dots (Hero style)
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations
    const ctx_gsap = gsap.context(() => {
      gsap.set(loaderRef.current, { autoAlpha: 1 });
      gsap.set(centerRef.current, { scale: 0, rotation: -180, opacity: 0 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
              }
              setIsComplete(true);
            }
          });

          exitTl
            .to(counterRef.current, {
              scale: 0.5,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
            })
            .to(progressBarRef.current, {
              scaleX: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            }, '-=0.2')
            .to(centerRef.current, {
              scale: 0,
              rotation: 180,
              opacity: 0,
              duration: 0.6,
              ease: 'back.in(2)',
            }, '-=0.3')
            .to(textRef.current, {
              y: -20,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            }, '-=0.4')
            .to(canvasRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
            }, '-=0.4')
            .to(loaderRef.current, {
              autoAlpha: 0,
              duration: 0.3,
              ease: 'power2.in',
            }, '-=0.2');
        }
      });

      // Entrance animations
      tl.to(centerRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');

      // Counter animation
      const counter = { value: 0 };
      tl.to(counter, {
        value: 100,
        duration: 2.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value) + '%';
          }
        },
      }, '-=0.8');

      // Progress bar
      tl.to(progressBarRef.current, {
        scaleX: 1,
        duration: 2.2,
        ease: 'power1.inOut',
      }, '-=2.2');

      // Continuous rotation of center element
      gsap.to(centerRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

    }, loaderRef);

    return () => {
      ctx_gsap.revert();
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(wordInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Canvas Background - Hero Style Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-80"
      />

      {/* Animated Blur Orbs - Hero Style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-12 top-20 sm:-left-16 sm:top-24 md:-left-24 md:top-32">
          <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 animate-blob rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="absolute -right-12 top-40 sm:-right-16 sm:top-48 md:-right-24 md:top-64">
          <div className="h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 animate-blob rounded-full bg-amber-500/10 blur-3xl [animation-delay:2s]" />
        </div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/8 pointer-events-none" />

      {/* Main Content - Fully Responsive */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        
        {/* Center Loading Icon - Responsive Sizes */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div ref={centerRef}>
            <div className="relative flex h-14 w-14 xs:h-16 xs:w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 via-secondary/10 to-background shadow-xl shadow-secondary/20 backdrop-blur-md border-2 border-secondary/30">
              
              {/* Animated rotating ring */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border-2 border-dashed border-secondary/20 animate-spin" style={{ animationDuration: '6s' }} />
              
              {/* Inner pulsing ring */}
              <div className="absolute inset-2.5 sm:inset-3 md:inset-4 rounded-full border border-dotted border-secondary/20 animate-pulse" />
              
              {/* Center code icon */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-secondary">
                  {'</>'}
                </div>
              </div>

              {/* Pulsing dot indicator */}
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full bg-secondary animate-pulse shadow-lg shadow-secondary/50" />
            </div>
          </div>
        </div>

        {/* Loading Text and Progress - Fully Responsive */}
        <div ref={textRef} className="flex flex-col items-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 w-full max-w-[260px] xs:max-w-[280px] sm:max-w-xs md:max-w-sm">
          
          {/* Loading Title */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-center">
              <span className="bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                {loadingWord}
              </span>
            </h2>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wider">
              Setting up environment...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full">
            {/* Bar container */}
            <div className="relative h-0.5 xs:h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-secondary/10 backdrop-blur-sm shadow-inner">
              <div
                ref={progressBarRef}
                className="h-full origin-left scale-x-0 rounded-full bg-secondary relative overflow-hidden"
              >
                {/* Animated shimmer */}
                <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full shadow-sm sm:shadow-md shadow-secondary/30" />
            </div>

            {/* Percentage Counter */}
            <div className="mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 text-center">
              <span
                ref={counterRef}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-secondary"
              >
                0%
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(24px, -32px) scale(1.08); }
          66% { transform: translate(-20px, 20px) scale(0.94); }
        }
        .animate-blob {
          animation: blob 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
