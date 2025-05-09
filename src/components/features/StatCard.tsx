
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
  animate?: boolean;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  color = 'bg-primary/10', 
  className,
  animate = true
}: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const numericValue = typeof value === 'number' ? value : 0;
  const isNumeric = typeof value === 'number';
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible && isNumeric && animate) {
      let start = 0;
      const end = numericValue;
      const duration = 1500;
      const startTime = performance.now();
      
      const updateValue = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        setDisplayValue(Math.floor(easeOut * end));
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          setDisplayValue(end);
        }
      };
      
      requestAnimationFrame(updateValue);
    }
  }, [isVisible, numericValue, animate, isNumeric]);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1", 
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      ref={cardRef}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon && (
            <div className={cn("p-1.5 rounded-md", color)}>
              {icon}
            </div>
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {isNumeric ? displayValue : value}
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
