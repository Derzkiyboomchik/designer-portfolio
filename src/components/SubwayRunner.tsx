import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';

export const SubwayRunner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('pixel_runner_highscore') || '0', 10);
  });

  const stateRef = useRef({
    playerY: 0,
    velocityY: 0,
    isJumping: false,
    isDucking: false,
    duckTimer: 0,
    score: 0,
    speed: 5.0,
    animFrame: 0,
    animTimer: 0,
    obstacles: [] as Array<{
      id: number;
      x: number;
      width: number;
      height: number;
      type: 'CACTUS_SMALL' | 'CACTUS_TALL' | 'BIRD';
      yOffset: number;
    }>,
    groundDots: [] as Array<{ x: number; y: number; size: number }>,
    clouds: [] as Array<{ x: number; y: number; scale: number }>,
    nextSpawnTimer: 60,
    status: 'START' as 'START' | 'PLAYING' | 'GAMEOVER',
  });

  useEffect(() => {
    stateRef.current.status = gameState;
  }, [gameState]);

  // Generate background static ground dots and clouds once
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * 800,
        y: Math.random() * 12 + 2,
        size: Math.random() > 0.6 ? 2 : 1,
      });
    }

    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: i * 180 + Math.random() * 80,
        y: Math.random() * 60 + 30,
        scale: 0.8 + Math.random() * 0.4,
      });
    }

    stateRef.current.groundDots = dots;
    stateRef.current.clouds = clouds;
  }, []);

  const jump = () => {
    if (!stateRef.current.isJumping) {
      stateRef.current.isJumping = true;
      stateRef.current.velocityY = -12.5;
      stateRef.current.isDucking = false;
    }
  };

  const duck = () => {
    if (stateRef.current.isJumping) {
      // Fast drop if in air
      stateRef.current.velocityY = 14;
    } else {
      stateRef.current.isDucking = true;
      stateRef.current.duckTimer = 30;
    }
  };

  const startGame = () => {
    stateRef.current.playerY = 0;
    stateRef.current.velocityY = 0;
    stateRef.current.isJumping = false;
    stateRef.current.isDucking = false;
    stateRef.current.duckTimer = 0;
    stateRef.current.score = 0;
    stateRef.current.speed = 5.2;
    stateRef.current.obstacles = [];
    stateRef.current.nextSpawnTimer = 40;
    stateRef.current.status = 'PLAYING';

    setGameState('PLAYING');
    setScore(0);
  };

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current.status !== 'PLAYING') {
        if (e.code === 'Space' || e.code === 'Enter' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'Space') {
        e.preventDefault();
        jump();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        duck();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        stateRef.current.isDucking = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main 60fps Pixel-Art Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = 360);

      // Pixel Art Crisp Settings
      ctx.imageSmoothingEnabled = false;

      const primaryColor = isDark ? '#FFFFFF' : '#000000';
      const bgColor = isDark ? '#0E0E10' : '#FAFAFA';

      // Clear Canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const state = stateRef.current;
      const groundY = height - 60;

      // Update Game Loop if PLAYING
      if (state.status === 'PLAYING') {
        state.score += 0.15;
        state.speed = Math.min(10.5, 5.2 + state.score * 0.0035);
        setScore(Math.floor(state.score));

        // Animation Frame Counter
        state.animTimer += 1;
        if (state.animTimer >= 6) {
          state.animFrame = (state.animFrame + 1) % 4;
          state.animTimer = 0;
        }

        // Player Jump Physics
        if (state.isJumping) {
          state.playerY += state.velocityY;
          state.velocityY += 0.65; // Gravity
          if (state.playerY >= 0) {
            state.playerY = 0;
            state.isJumping = false;
          }
        }

        // Duck Timer
        if (state.isDucking && !state.isJumping) {
          state.duckTimer -= 1;
          if (state.duckTimer <= 0) {
            state.isDucking = false;
          }
        }

        // Move Background Clouds
        state.clouds.forEach((cloud) => {
          cloud.x -= state.speed * 0.2;
          if (cloud.x < -80) cloud.x = width + 50;
        });

        // Move Ground Dots
        state.groundDots.forEach((dot) => {
          dot.x -= state.speed;
          if (dot.x < 0) dot.x = width;
        });

        // Spawn Obstacles
        state.nextSpawnTimer -= 1;
        if (state.nextSpawnTimer <= 0) {
          const types: Array<'CACTUS_SMALL' | 'CACTUS_TALL' | 'BIRD'> = ['CACTUS_SMALL', 'CACTUS_TALL', 'BIRD'];
          const chosenType = types[Math.floor(Math.random() * types.length)];

          let obsWidth = 24;
          let obsHeight = 44;
          let yOffset = 0;

          if (chosenType === 'CACTUS_SMALL') {
            obsWidth = 20;
            obsHeight = 36;
          } else if (chosenType === 'CACTUS_TALL') {
            obsWidth = 32;
            obsHeight = 54;
          } else if (chosenType === 'BIRD') {
            obsWidth = 36;
            obsHeight = 26;
            yOffset = Math.random() > 0.5 ? 42 : 18; // Flying high or low
          }

          state.obstacles.push({
            id: Date.now() + Math.random(),
            x: width + 20,
            width: obsWidth,
            height: obsHeight,
            type: chosenType,
            yOffset,
          });

          // Minimum gap between obstacles for fair balanced gameplay
          state.nextSpawnTimer = Math.floor(Math.random() * 45 + 50 - state.speed * 1.5);
        }

        // Update & Check Obstacles
        const playerX = 80;
        const playerWidth = state.isDucking ? 46 : 30;
        const playerHeight = state.isDucking ? 22 : 46;
        const playerTopY = groundY - playerHeight + state.playerY;

        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          const obsLeft = obs.x;
          const obsRight = obs.x + obs.width;
          const obsTop = groundY - obs.height - obs.yOffset;
          const obsBottom = groundY - obs.yOffset;

          // Precise Pixel Box Collision Check
          const margin = 5; // Generous hitbox for player-friendly balance
          if (
            playerX + playerWidth - margin > obsLeft &&
            playerX + margin < obsRight &&
            playerTopY + playerHeight - margin > obsTop &&
            playerTopY + margin < obsBottom
          ) {
            // Collision Triggered!
            state.status = 'GAMEOVER';
            setGameState('GAMEOVER');
            const finalScore = Math.floor(state.score);
            if (finalScore > highScore) {
              setHighScore(finalScore);
              localStorage.setItem('pixel_runner_highscore', finalScore.toString());
            }
          }

          if (obs.x < -60) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // --- RENDER PIXEL GRAPHICS ---

      // 1. Draw Clouds
      ctx.fillStyle = primaryColor;
      state.clouds.forEach((cloud) => {
        const cx = cloud.x;
        const cy = cloud.y;
        ctx.globalAlpha = 0.25;
        // Pixel Cloud shape
        ctx.fillRect(cx, cy, 36, 10);
        ctx.fillRect(cx + 6, cy - 6, 24, 6);
        ctx.globalAlpha = 1.0;
      });

      // 2. Draw Ground Line
      ctx.fillStyle = primaryColor;
      ctx.fillRect(0, groundY, width, 2);

      // 3. Draw Ground Dots (Pixel texture)
      state.groundDots.forEach((dot) => {
        ctx.fillRect(dot.x, groundY + dot.y, dot.size, dot.size);
      });

      // 4. Draw Obstacles (Pixel Cacti & Birds)
      state.obstacles.forEach((obs) => {
        const ox = Math.floor(obs.x);
        const oy = Math.floor(groundY - obs.height - obs.yOffset);

        if (obs.type === 'CACTUS_SMALL' || obs.type === 'CACTUS_TALL') {
          // Pixel Cactus / Pillar
          ctx.fillRect(ox + obs.width * 0.35, oy, obs.width * 0.3, obs.height);
          // Left Arm
          ctx.fillRect(ox, oy + obs.height * 0.3, obs.width * 0.45, 6);
          ctx.fillRect(ox, oy + obs.height * 0.15, 6, obs.height * 0.2);
          // Right Arm
          ctx.fillRect(ox + obs.width * 0.55, oy + obs.height * 0.4, obs.width * 0.45, 6);
          ctx.fillRect(ox + obs.width - 6, oy + obs.height * 0.25, 6, obs.height * 0.2);
        } else if (obs.type === 'BIRD') {
          // Pixel Bird / Flying Drone
          const wingUp = state.animFrame % 2 === 0;
          ctx.fillRect(ox, oy + 8, obs.width, 10);
          ctx.fillRect(ox + 8, oy + 4, 16, 4);
          // Head / Eye
          ctx.fillRect(ox, oy + 4, 8, 6);

          // Wings
          if (wingUp) {
            ctx.fillRect(ox + 12, oy - 8, 8, 14);
          } else {
            ctx.fillRect(ox + 12, oy + 12, 8, 12);
          }
        }
      });

      // 5. Draw Pixel Runner Character (Google Dino / Swiss Pixel Style)
      const px = 80;
      const py = Math.floor(groundY + state.playerY);

      ctx.fillStyle = primaryColor;

      if (state.isDucking && !state.isJumping) {
        // Ducking Pixel Silhouette
        ctx.fillRect(px, py - 22, 46, 18);
        ctx.fillRect(px + 30, py - 26, 16, 10); // Head forward
        // Running legs when ducking
        if (state.animFrame % 2 === 0) {
          ctx.fillRect(px + 6, py - 4, 8, 4);
          ctx.fillRect(px + 28, py - 4, 8, 4);
        } else {
          ctx.fillRect(px + 14, py - 4, 8, 4);
          ctx.fillRect(px + 36, py - 4, 8, 4);
        }
      } else if (state.isJumping) {
        // Jumping Pixel Silhouette (Legs together)
        ctx.fillRect(px + 6, py - 46, 22, 28);
        ctx.fillRect(px + 12, py - 54, 14, 10); // Head
        ctx.fillRect(px + 8, py - 18, 6, 14); // Left Leg
        ctx.fillRect(px + 18, py - 18, 6, 14); // Right Leg
      } else {
        // Standard Running Pixel Silhouette
        ctx.fillRect(px + 6, py - 46, 22, 28); // Torso
        ctx.fillRect(px + 12, py - 54, 14, 10); // Head
        ctx.fillRect(px + 2, py - 40, 8, 14); // Arm

        // Animated Running Legs (4-frame cycle)
        if (state.animFrame === 0) {
          ctx.fillRect(px + 6, py - 18, 6, 18);
          ctx.fillRect(px + 18, py - 18, 6, 10);
          ctx.fillRect(px + 24, py - 10, 8, 4);
        } else if (state.animFrame === 1) {
          ctx.fillRect(px + 8, py - 18, 6, 14);
          ctx.fillRect(px + 18, py - 18, 6, 18);
        } else if (state.animFrame === 2) {
          ctx.fillRect(px + 4, py - 10, 8, 4);
          ctx.fillRect(px + 10, py - 18, 6, 10);
          ctx.fillRect(px + 18, py - 18, 6, 18);
        } else {
          ctx.fillRect(px + 6, py - 18, 6, 18);
          ctx.fillRect(px + 16, py - 18, 6, 14);
        }
      }

      // 6. Draw 8-Bit Score Counter in top right
      ctx.fillStyle = primaryColor;
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      const paddedScore = String(Math.floor(state.score)).padStart(5, '0');
      const paddedHigh = String(highScore).padStart(5, '0');
      ctx.fillText(`HI ${paddedHigh}  ${paddedScore}`, width - 20, 32);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [highScore]);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      <div className="border border-[#111111]/20 dark:border-white/30 rounded-xl overflow-hidden bg-[#FAFAFA] dark:bg-[#0E0E10] shadow-2xl relative">
        
        {/* Game Canvas Container */}
        <div className="relative w-full h-[360px] bg-[#FAFAFA] dark:bg-[#0E0E10] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Start Screen Overlay */}
          {gameState === 'START' && (
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-5 text-white z-20">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                8-BIT MONOCHROME EDITION
              </span>

              <h2 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">
                VOID RUNNER
              </h2>

              <p className="font-mono text-xs text-white/80 max-w-sm leading-relaxed">
                Press <strong className="text-white">SPACE / ↑ / W</strong> to Jump, and <strong className="text-white">↓ / S</strong> to Duck under birds.
              </p>

              <button
                onClick={startGame}
                className="px-7 py-3 bg-white text-[#111] font-mono text-xs font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                START GAME
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-5 text-white z-20">
              <span className="text-xs font-mono tracking-widest uppercase text-red-400">
                GAME OVER
              </span>

              <h2 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">
                VOID RUNNER
              </h2>

              <div className="flex items-center gap-6 py-2 border-y border-white/20 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-white/60 block">SCORE</span>
                  <span className="text-xl font-bold">{score}m</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div>
                  <span className="text-[10px] text-white/60 block">BEST</span>
                  <span className="text-xl font-bold">{highScore}m</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-white text-[#111] font-mono text-xs font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESTART (SPACE)
                </button>

                <a
                  href="https://designer-portfolio-fko873di.sanity.studio"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-widest uppercase rounded-full transition-all flex items-center gap-2"
                >
                  SANITY STUDIO
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / On-screen Control Buttons */}
        <div className="p-3 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#F0F0F0] dark:bg-[#141416] flex items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-[#777] dark:text-[#888] hidden sm:block">
            CONTROLS: [SPACE / ↑ / W] JUMP  |  [↓ / S] DUCK
          </div>

          <div className="flex items-center gap-2 mx-auto sm:mr-0">
            <button
              onClick={jump}
              className="px-4 py-2 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 font-mono text-xs font-semibold text-[#111] dark:text-white flex items-center gap-1.5"
            >
              <ArrowUp className="w-4 h-4" /> JUMP
            </button>
            <button
              onClick={duck}
              className="px-4 py-2 bg-white dark:bg-[#222226] border border-[#DDD] dark:border-[#333] rounded-lg active:scale-95 font-mono text-xs font-semibold text-[#111] dark:text-white flex items-center gap-1.5"
            >
              <ArrowDown className="w-4 h-4" /> DUCK
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
