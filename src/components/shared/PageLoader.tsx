'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles - responsive count based on screen size
    const initParticles = () => {
      const particles: Particle[] = [];
      const isMobile = window.innerWidth < 768;
      const numParticles = isMobile ? 30 : 50;

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: isMobile ? 1.5 : 2,
        });
      }
      particlesRef.current = particles;
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const isMobile = window.innerWidth < 768;
      const connectionDistance = isMobile ? 80 : 100;

      // Update particle positions
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Draw connecting lines between nearby particles (thinner lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.25;
            ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`; // secondary color
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles as small glowing dots
      particles.forEach(particle => {
        // Outer glow (smaller)
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, 'rgba(100, 116, 139, 0.6)'); // secondary color
        gradient.addColorStop(1, 'rgba(100, 116, 139, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core dot (smaller)
        ctx.fillStyle = 'rgba(100, 116, 139, 0.9)'; // secondary color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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
            })
            .to(progressBarRef.current, {
              scaleX: 0,
              opacity: 0,
              duration: 0.4,
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
            }, '-=0.4')
            .to(canvasRef.current, {
              opacity: 0,
              duration: 0.5,
            }, '-=0.4')
            .to(loaderRef.current, {
              autoAlpha: 0,
              duration: 0.3,
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
        duration: 2,
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
        duration: 2,
        ease: 'power1.inOut',
      }, '-=2');

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
      {/* Animated Canvas Background - Small Particles and Thin Lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10 pointer-events-none" />

      {/* Main Content - Fully Responsive - Smaller Size */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-8">
        
        {/* Center Loading Icon - Smaller */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div ref={centerRef}>
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 via-secondary/10 to-background shadow-xl shadow-secondary/20 backdrop-blur-md border-2 border-secondary/30">
              
              {/* Animated rotating ring */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-secondary/20 animate-spin" style={{ animationDuration: '6s' }} />
              
              {/* Inner pulsing ring */}
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-dotted border-secondary/15 animate-pulse" />
              
              {/* Center code icon - Smaller */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">
                  {'</>'}
                </div>
              </div>

              {/* Pulsing dot indicator - Smaller */}
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-secondary animate-pulse shadow-lg shadow-secondary/50" />
            </div>
          </div>
        </div>

        {/* Loading Text and Progress - Responsive & Smaller */}
        <div ref={textRef} className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
          
          {/* Loading Title - Smaller */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-center">
              <span className="bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                Loading
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wide">
              Please wait...
            </p>
          </div>

          {/* Progress Bar - Smaller */}
          <div className="relative w-full">
            {/* Bar container */}
            <div className="relative h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-secondary/10 backdrop-blur-sm shadow-inner">
              <div
                ref={progressBarRef}
                className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-secondary via-secondary to-secondary/70 relative overflow-hidden"
              >
                {/* Animated shimmer */}
                <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full shadow-md shadow-secondary/30" />
            </div>

            {/* Percentage Counter - Smaller */}
            <div className="mt-2 sm:mt-3 md:mt-4 text-center">
              <span
                ref={counterRef}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums tracking-tight"
              >
                <span className="bg-gradient-to-r from-secondary via-secondary to-secondary/70 bg-clip-text text-transparent">
                  0%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blur orbs - responsive positioning - Smaller */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-5 left-5 sm:top-8 sm:left-8 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-secondary/5 blur-2xl" />
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
