
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-40 transition-all duration-300",
      isScrolled 
        ? "bg-background/80 backdrop-blur-lg shadow-sm py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
            HPV
          </div>
          <div className="font-medium">
            <span className="hidden md:inline">Programa de Rastrillaje |</span> Corrientes
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Descargar Informe</span>
        </Button>
      </div>
    </header>
  );
};
