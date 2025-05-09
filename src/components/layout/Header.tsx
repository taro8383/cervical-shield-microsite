
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
      "fixed top-0 left-0 w-full z-40 transition-all duration-300 px-4",
      isScrolled 
        ? "bg-background/80 backdrop-blur-lg shadow-sm py-3" 
        : "bg-transparent py-3 md:py-5"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo.png" 
            alt="Bioproductos LATAM Logo" 
            className="h-8 w-auto md:h-12 transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <a 
          href="/assets/Propuesta ejecutiva_ Programa de rastrillaje de VPH con kits DH-2 para la provincia de Corrientes.pdf"
          download
          className="no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Descargar propuesta completa</span>
          </Button>
        </a>
      </div>
    </header>
  );
};
