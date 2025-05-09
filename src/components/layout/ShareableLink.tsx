
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Link, Share2 } from 'lucide-react';

interface ShareableLinkProps {
  url: string;
  title?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export const ShareableLink = ({ 
  url, 
  title = "Compartir", 
  size = 'sm', 
  variant = 'outline',
  className 
}: ShareableLinkProps) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Enlace copiado", {
          description: "El enlace ha sido copiado al portapapeles"
        });
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    } finally {
      setIsSharing(false);
    }
  };
  
  return (
    <Button 
      variant={variant} 
      size={size}
      className={className}
      onClick={handleShare}
      disabled={isSharing}
    >
      {isSharing ? (
        <span className="flex items-center gap-2">
          <Link className="h-4 w-4 animate-spin" />
          <span>Compartiendo...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>{title}</span>
        </span>
      )}
    </Button>
  );
};
