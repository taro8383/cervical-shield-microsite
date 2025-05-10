
import { Button } from '@/components/ui/button';
import { Download, Mail, Share2 } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Programa de Rastrillaje de VPH para Corrientes',
          text: 'Propuesta ejecutiva para el Programa de Rastrillaje de VPH con Kits DH-2 para la Provincia de Corrientes',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error compartiendo:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      // Check for email pattern in share function
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapeles');
    }
  };
  
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="font-bold text-lg">Programa de Rastrillaje de VPH</div>
            <p className="text-muted-foreground text-sm">
              Propuesta ejecutiva para la implementación de un programa de rastrillaje 
              de VPH con kits DH-2 en la provincia de Corrientes.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="font-medium">Contacto</div>
            <address className="text-muted-foreground text-sm not-italic">
              Bioproductos LATAM
            </address>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@bioproductos-latam.com" className="text-primary hover:underline">
                info@bioproductos-latam.com
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="font-medium">Recursos</div>
            <div className="flex flex-col gap-2">
              <a 
                href="/assets/Propuesta-VPH-Corrientes.pdf"
                download
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="justify-start gap-2 w-fit">
                  <Download className="h-4 w-4" />
                  <span>Descargar propuesta completa</span>
                </Button>
              </a>
              <Button variant="outline" size="sm" className="justify-start gap-2 w-fit" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span>Compartir</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
          <div>
            © {currentYear} Bioproductos LATAM
          </div>
          <div>
            <a href="#" className="hover:text-primary transition-colors">Política de privacidad</a>
            {' | '}
            <a href="#" className="hover:text-primary transition-colors">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
