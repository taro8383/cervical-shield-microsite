
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const ComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  className,
}: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full h-[300px] md:h-[400px] select-none"
        >
          {/* Before image */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${beforeImage})` }}
          >
            <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 text-sm rounded">
              {beforeLabel}
            </div>
          </div>
          
          {/* After image */}
          <div 
            className="absolute top-0 left-0 h-full bg-cover bg-center z-20"
            style={{ 
              backgroundImage: `url(${afterImage})`,
              width: `${sliderPosition}%` 
            }}
          >
            <div className="absolute top-4 right-4 bg-primary/80 text-white px-2 py-1 text-sm rounded">
              {afterLabel}
            </div>
          </div>
          
          {/* Slider control */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-30 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md flex items-center justify-center">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
