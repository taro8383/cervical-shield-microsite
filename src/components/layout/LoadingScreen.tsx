
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 5;
          if (newProgress === 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500);
          }
          return newProgress;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-300">
      <div className="mb-8">
        <div className="text-4xl font-bold text-primary mb-2">HPV</div>
        <div className="text-xl text-muted-foreground">Programa de Rastrillaje</div>
      </div>
      
      <div className="w-64 mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      
      <p className="text-sm text-muted-foreground">Cargando contenido...</p>
    </div>
  );
};
