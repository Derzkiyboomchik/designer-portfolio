import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ExternalLink, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface SubwayRunnerProps {
  onOpenStudio?: () => void;
}

export const SubwayRunner: React.FC<SubwayRunnerProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('swiss_runner_highscore') || '0', 10);
  });

  // Game internal mutable refs for 60fps loop
  const stateRef = useRef({
    lane: 0, // -1 (Left), 0 (Center), 1 (Right)
    targetX: 0,
    currentX: 0,
    posY: 0,
    velocityY: 0,
    isJumping: false,
    isSliding: false,
    slideTimer: 0,
    score: 0,
    speed: 0.8,
    obstacles: [] as Array<{
      id: number;
      lane: number;
      z: number; // Distance from player (1000 to 0)
      type: 'BLOCK' | 'HURDLE' | 'BARRIER'; // BLOCK: dodge; HURDLE: jump; BARRIER: slide
    }>,
    particles: [] as Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
    }>,
    nextObstacleDist: 200,
    status: 'START' as 'START' | 'PLAYING' | 'GAMEOVER',
  });

  // Keep stateRef status updated
  useEffect(() => {
    stateRef.current.status = gameState;
  }, [gameState]);

  // Touch Swipe Handling
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (stateRef.current.status !== 'PLAYING') {
      if (e.code === 'Space' || e.code === 'Enter') {
        startGame();
      }
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      moveLane(-1);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      moveLane(1);
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'Space') {
      e.preventDefault();
      jump();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      slide();
    }
  };

  const moveLane = (dir: number) => {
    const nextLane = Math.max(-1, Math.min(1, stateRef.current.lane + dir));
    stateRef.current.lane = nextLane;
    stateRef.current.targetX = nextLane * 180;
  };

  const jump = () => {
    if (!stateRef.current.isJumping) {
      stateRef.current.isJumping = true;
      stateRef.current.velocityY = 18;
      stateRef.current.isSliding = false;
    }
  };

  const slide = () => {
    if (!stateRef.current.isSliding) {
      stateRef.current.isSliding = true;
      stateRef.current.slideTimer = 35;
      if (stateRef.current.isJumping) {
        stateRef.current.velocityY = -20; // Fast drop
      }
    }
  };

  const startGame = () => {
    stateRef.current = {
      lane: 0,
      targetX: 0,
      currentX: 0,
      posY: 0,
      velocityY: 0,
      isJumping: false,
      isSliding: false,
      slideTimer: 0,
      score: 0,
      speed: 1.0,
      obstacles: [],
      particles: [],
      nextObstacleDist: 150,
      status: 'PLAYING',
    };
    setGameState('PLAYING');
    setScore(0);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) moveLane(1);
      else if (dx < -30) moveLane(-1);
    } else {
      if (dy < -30) jump();
      else if (dy > 30) slide();
    }
    touchStartRef.current = null;
  };

  // Keyboard Event Registration
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main 60fps Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const width = canvas.width = canvas.parentElement?.clientWidth || 800;
      const height = canvas.height = 480;

      const primaryColor = isDark ? '#FFFFFF' : '#111111';
      const bgColor = isDark ? '#0E0E10' : '#FAFAFA';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
      const obstacleColor = isDark ? '#FFFFFF' : '#111111';

      // Clear Screen
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const state = stateRef.current;

      // Horizon Line
      const horizonY = height * 0.35;
      const cx = width / 2;

      // Draw Perspective Grid Lanes (-1, 0, 1)
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1.5;

      const laneSpacings = [-260, -80, 80, 260];
      laneSpacings.forEach((offset) => {
        ctx.beginPath();
        ctx.moveTo(cx + offset * 0.15, horizonY);
        ctx.lineTo(cx + offset * 1.5, height);
        ctx.stroke();
      });

      // Horizon bar
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      if (state.status === 'PLAYING') {
        // Update Game Loop
        state.score += state.speed * 0.2;
        state.speed += 0.0003;
        setScore(Math.floor(state.score));

        // Smooth X interpolation
        state.currentX += (state.targetX - state.currentX) * 0.22;

        // Jump Physics
        if (state.isJumping) {
          state.posY += state.velocityY;
          state.velocityY -= 1.1; // Gravity
          if (state.posY <= 0) {
            state.posY = 0;
            state.isJumping = false;
          }
        }

        // Slide Timer
        if (state.isSliding) {
          state.slideTimer -= 1;
          if (state.slideTimer <= 0) {
            state.isSliding = false;
          }
        }

        // Spawn Obstacles
        state.nextObstacleDist -= state.speed * 8;
        if (state.nextObstacleDist <= 0) {
          const lanes = [-1, 0, 1];
          const chosenLane = lanes[Math.floor(Math.random() * lanes.length)];
          const types: Array<'BLOCK' | 'HURDLE' | 'BARRIER'> = ['BLOCK', 'HURDLE', 'BARRIER'];
          const chosenType = types[Math.floor(Math.random() * types.length)];

          state.obstacles.push({
            id: Date.now() + Math.random(),
            lane: chosenLane,
            z: 1000,
            type: chosenType,
          });

          state.nextObstacleDist = Math.max(120, 280 - state.speed * 15);
        }

        // Update Obstacles
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.z -= state.speed * 14;

          // Check Collision when close to player (z between 20 and 120)
          if (obs.z > 20 && obs.z < 120) {
            const laneDiff = Math.abs(state.currentX - obs.lane * 180);
            if (laneDiff < 100) {
              let hit = false;
              if (obs.type === 'BLOCK') {
                hit = true; // Cannot dodge by jumping/sliding
              } else if (obs.type === 'HURDLE') {
                if (state.posY < 40) hit = true; // Must jump
              } else if (obs.type === 'BARRIER') {
                if (!state.isSliding && state.posY < 60) hit = true; // Must slide
              }

              if (hit) {
                state.status = 'GAMEOVER';
                setGameState('GAMEOVER');
                const finalScore = Math.floor(state.score);
                if (finalScore > highScore) {
                  setHighScore(finalScore);
                  localStorage.setItem('swiss_runner_highscore', finalScore.toString());
                }
              }
            }
          }

          // Remove passed obstacles
          if (obs.z <= 0) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Moving Road Lines
      const roadLineOffset = (Date.now() * 0.3 * (state.status === 'PLAYING' ? state.speed : 0.3)) % 40;
      ctx.strokeStyle = gridColor;
      for (let z = 0; z < 1000; z += 40) {
        const lineZ = (z - roadLineOffset + 1000) % 1000;
        const scale = 1 - lineZ / 1000;
        const y = horizonY + (height - horizonY) * scale;
        ctx.beginPath();
        ctx.moveTo(cx - 400 * scale, y);
        ctx.lineTo(cx + 400 * scale, y);
        ctx.stroke();
      }

      // Draw Obstacles with Perspective
      state.obstacles.sort((a, b) => b.z - a.z); // Render far to near
      state.obstacles.forEach((obs) => {
        const scale = 1 - obs.z / 1000;
        if (scale <= 0) return;

        const obsX = cx + (obs.lane * 180) * scale;
        const obsY = horizonY + (height - horizonY) * scale;

        const baseWidth = 140 * scale;
        const baseHeight = 160 * scale;

        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.strokeStyle = obstacleColor;
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';

        if (obs.type === 'BLOCK') {
          // Full Monolithic Block
          const w = baseWidth;
          const h = baseHeight;
          ctx.fillRect(obsX - w / 2, obsY - h, w, h);
          ctx.strokeRect(obsX - w / 2, obsY - h, w, h);

          // Top label indicator
          ctx.fillStyle = obstacleColor;
          ctx.font = `${Math.max(9, 11 * scale)}px Space Grotesk`;
          ctx.textAlign = 'center';
          ctx.fillText('MONOLITH', obsX, obsY - h + 15 * scale);
        } else if (obs.type === 'HURDLE') {
          // Low Hurdle (Must Jump over)
          const w = baseWidth * 1.1;
          const h = baseHeight * 0.35;
          ctx.fillRect(obsX - w / 2, obsY - h, w, h);
          ctx.strokeRect(obsX - w / 2, obsY - h, w, h);

          // Diagonal stripes
          ctx.beginPath();
          ctx.moveTo(obsX - w / 2, obsY - h);
          ctx.lineTo(obsX + w / 2, obsY);
          ctx.stroke();

          ctx.fillStyle = obstacleColor;
          ctx.font = `${Math.max(8, 10 * scale)}px Space Grotesk`;
          ctx.textAlign = 'center';
          ctx.fillText('▲ JUMP ▲', obsX, obsY - h - 5);
        } else if (obs.type === 'BARRIER') {
          // Overhead Barrier (Must Slide under)
          const w = baseWidth * 1.2;
          const h = baseHeight * 0.45;
          const topY = obsY - baseHeight * 1.2;
          ctx.fillRect(obsX - w / 2, topY, w, h);
          ctx.strokeRect(obsX - w / 2, topY, w, h);

          // Support legs
          ctx.beginPath();
          ctx.moveTo(obsX - w / 2 + 5, topY + h);
          ctx.lineTo(obsX - w / 2 + 5, obsY);
          ctx.moveTo(obsX + w / 2 - 5, topY + h);
          ctx.lineTo(obsX + w / 2 - 5, obsY);
          ctx.stroke();

          ctx.fillStyle = obstacleColor;
          ctx.font = `${Math.max(8, 10 * scale)}px Space Grotesk`;
          ctx.textAlign = 'center';
          ctx.fillText('▼ SLIDE ▼', obsX, topY + h / 2 + 3);
        }
      });

      // Draw Player (Runner Cube / Person silhouette)
      const playerZScale = 0.95;
      const playerX = cx + state.currentX * playerZScale;
      const playerY = horizonY + (height - horizonY) * playerZScale - state.posY;

      ctx.save();
      ctx.translate(playerX, playerY);

      const pWidth = state.isSliding ? 50 : 38;
      const pHeight = state.isSliding ? 22 : 54;

      // Shadow on floor
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, state.posY, pWidth * 0.7, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main Player Body
      ctx.fillStyle = primaryColor;
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;

      // Draw Player Box/Icon
      ctx.fillRect(-pWidth / 2, -pHeight, pWidth, pHeight);
      ctx.strokeRect(-pWidth / 2, -pHeight, pWidth, pHeight);

      // Inner Swiss minimalism cross detail
      ctx.strokeStyle = isDark ? '#0E0E10' : '#FAFAFA';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -pHeight + 10);
      ctx.lineTo(0, -10);
      ctx.moveTo(-10, -pHeight / 2);
      ctx.lineTo(10, -pHeight / 2);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8 select-none">
      <div className="border border-[#111111]/15 dark:border-white/20 rounded-xl overflow-hidden bg-[#FAFAFA] dark:bg-[#0E0E10] shadow-2xl relative">
        
        {/* Top Info Banner */}
        <div className="p-4 border-b border-[#E5E5E5] dark:border-[#222225] flex flex-wrap items-center justify-between gap-4 bg-[#F0F0F0] dark:bg-[#141416]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <div>
              <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#111] dark:text-white">
                SANITY DATABASE EMPTY • MONOCHROME SUBWAY RUNNER
              </h3>
              <p className="font-sans text-[11px] text-[#666] dark:text-[#999]">
                No projects published in Sanity Studio yet. Enjoy this 3-lane runner while waiting!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-[#888] text-[10px] uppercase block">HIGH SCORE</span>
              <span className="font-serif text-lg text-[#111] dark:text-white">{highScore}m</span>
            </div>
            <div>
              <span className="text-[#888] text-[10px] uppercase block">SCORE</span>
              <span className="font-serif text-lg text-[#111] dark:text-white">{score}m</span>
            </div>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div 
          className="relative w-full h-[460px] bg-[#FAFAFA] dark:bg-[#0E0E10] overflow-hidden cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Start Screen Overlay */}
          {gameState === 'START' && (
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-6 text-white z-20">
              <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                SWISS MONOCHROME EDITION
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight">
                SUBWAY RUNNER
              </h2>

              <p className="font-sans text-xs text-white/80 max-w-md leading-relaxed font-light">
                Use <strong className="text-white font-mono">← → / A D</strong> to switch lanes, <strong className="text-white font-mono">↑ / W / SPACE</strong> to Jump, and <strong className="text-white font-mono">↓ / S</strong> to Slide.
              </p>

              <button
                onClick={startGame}
                className="px-8 py-3.5 bg-white text-[#111] font-mono text-xs font-medium tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                START RUN
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6 text-white z-20">
              <span className="text-xs font-mono tracking-widest uppercase text-red-400">
                COLLISION DETECTED
              </span>

              <h2 className="font-serif text-4xl font-light tracking-tight">
                GAME OVER
              </h2>

              <div className="flex items-center gap-8 py-2 border-y border-white/20">
                <div>
                  <span className="text-[10px] font-mono text-white/60 block">DISTANCE</span>
                  <span className="font-serif text-3xl">{score}m</span>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div>
                  <span className="text-[10px] font-mono text-white/60 block">BEST RUN</span>
                  <span className="font-serif text-3xl">{highScore}m</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-white text-[#111] font-mono text-xs font-medium tracking-widest uppercase rounded-full hover:scale-105 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  TRY AGAIN (SPACE)
                </button>

                <a
                  href="https://designer-portfolio-fko873di.sanity.studio"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-widest uppercase rounded-full transition-all flex items-center gap-2"
                >
                  OPEN SANITY STUDIO
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / On-screen Control Buttons */}
        <div className="p-4 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#F0F0F0] dark:bg-[#141416] flex items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#777] dark:text-[#888] hidden sm:block">
            CONTROLS: ← LEFT | → RIGHT | ↑ JUMP | ↓ SLIDE
          </div>

          {/* On-screen D-Pad for Touch/Click */}
          <div className="flex items-center gap-2 mx-auto sm:mr-0">
            <button
              onClick={() => moveLane(-1)}
              className="p-3 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 text-[#111] dark:text-white"
              aria-label="Move Left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={jump}
              className="p-3 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 text-[#111] dark:text-white"
              aria-label="Jump"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={slide}
              className="p-3 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 text-[#111] dark:text-white"
              aria-label="Slide"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => moveLane(1)}
              className="p-3 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 text-[#111] dark:text-white"
              aria-label="Move Right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
