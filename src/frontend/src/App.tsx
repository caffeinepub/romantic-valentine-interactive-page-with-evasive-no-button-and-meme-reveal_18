import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

type AppState = 'question' | 'success';

export default function App() {
  const [appState, setAppState] = useState<AppState>('question');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position to center-right
  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({
        x: container.width / 2 + 60,
        y: container.height / 2 - button.height / 2
      });
    }
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries (keep button fully visible)
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    const minX = 20;
    const minY = 20;

    // Generate random position within safe boundaries
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoPointerEnter = () => {
    moveNoButton();
  };

  const handleNoPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleYesClick = () => {
    setAppState('success');
  };

  if (appState === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <Heart className="w-20 h-20 mx-auto text-romantic-deep fill-romantic-deep animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-romantic-deep tracking-tight">
              Good Choice! 💕
            </h1>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
            <img
              src="/assets/generated/valentine-good-choice-meme.dim_900x900.png"
              alt="Good choice meme"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          <p className="text-2xl md:text-3xl text-romantic-deep font-medium">
            I knew you'd say yes! ❤️
          </p>
        </div>

        <footer className="fixed bottom-4 text-center text-sm text-romantic-deep/70">
          © {new Date().getFullYear()} · Built with{' '}
          <Heart className="inline w-4 h-4 fill-romantic-deep text-romantic-deep" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-romantic-deep transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4 overflow-hidden">
      <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">
        <div className="space-y-6">
          <div className="flex justify-center gap-2 animate-float">
            <Heart className="w-12 h-12 text-romantic-deep fill-romantic-deep" />
            <Heart className="w-16 h-16 text-romantic-deep fill-romantic-deep" />
            <Heart className="w-12 h-12 text-romantic-deep fill-romantic-deep" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-romantic-deep tracking-tight leading-tight px-4">
            Will you be my Valentine?
          </h1>
          
          <p className="text-xl md:text-2xl text-romantic-deep/80 font-medium">
            Choose wisely... 💝
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative h-64 md:h-80 w-full"
        >
          {/* Yes Button - Fixed position */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32 md:-ml-40">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-2xl md:text-3xl px-12 md:px-16 py-8 md:py-10 rounded-full bg-romantic-deep hover:bg-romantic-deep/90 text-white shadow-2xl hover:scale-110 transition-all duration-300 font-bold"
            >
              Yes! 💖
            </Button>
          </div>

          {/* No Button - Evasive position */}
          <Button
            ref={noButtonRef}
            onPointerEnter={handleNoPointerEnter}
            onPointerDown={handleNoPointerDown}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            size="lg"
            variant="outline"
            className="absolute text-2xl md:text-3xl px-12 md:px-16 py-8 md:py-10 rounded-full border-4 border-romantic-deep/30 text-romantic-deep/70 hover:bg-transparent hover:border-romantic-deep/40 shadow-lg transition-all duration-200 font-bold cursor-pointer"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transform: 'translate(0, 0)',
              touchAction: 'none'
            }}
          >
            No 😢
          </Button>
        </div>

        <p className="text-sm md:text-base text-romantic-deep/60 italic">
          (Hint: The "No" button is a bit shy... 😉)
        </p>
      </div>

      <footer className="fixed bottom-4 text-center text-sm text-romantic-deep/70">
        © {new Date().getFullYear()} · Built with{' '}
        <Heart className="inline w-4 h-4 fill-romantic-deep text-romantic-deep" /> using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-romantic-deep transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
