
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface SectionPermalinkProps {
  sectionId: string;
  className?: string;
}

export const SectionPermalink = ({ sectionId, className }: SectionPermalinkProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Enlace copiado", {
          description: "El enlace permanente ha sido copiado al portapapeles"
        });
        
        // Animation feedback
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={handleShare}
      title="Copiar enlace permanente a esta sección"
    >
      <Share2 className={`h-4 w-4 ${isAnimating ? 'animate-ping' : ''}`} />
    </Button>
  );
};
