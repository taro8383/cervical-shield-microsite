
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  type?: 'milestone' | 'regular';
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline = ({ events, className }: TimelineProps) => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const events = timelineRef.current.querySelectorAll('[data-event-id]');
        
        events.forEach((event) => {
          const rect = event.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.2;
          
          if (isVisible) {
            const eventId = parseInt(event.getAttribute('data-event-id') || '0');
            setActiveEvent(eventId);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Set initial active event
    if (events.length > 0) {
      setActiveEvent(events[0].id);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [events]);
  
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="overflow-x-auto pb-4" ref={timelineRef}>
          {/* Timeline years */}
          <div className="flex border-b border-border sticky top-0 bg-background z-10">
            {events.map((event) => (
              <div 
                key={`year-${event.id}`}
                className={cn(
                  "flex-none px-6 py-3 text-center font-medium text-sm transition-colors",
                  activeEvent === event.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                )}
                onClick={() => {
                  const eventElement = document.querySelector(`[data-event-id="${event.id}"]`);
                  if (eventElement) {
                    eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                  setActiveEvent(event.id);
                }}
              >
                <div className="whitespace-nowrap">{event.year}</div>
              </div>
            ))}
          </div>
          
          {/* Timeline events */}
          <div className="relative pt-6 px-6">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 h-0.5 bg-border top-6" />
            
            <div className="space-y-12">
              {events.map((event) => (
                <div 
                  key={`event-${event.id}`}
                  data-event-id={event.id}
                  className={cn(
                    "relative pl-8 transition-all duration-500",
                    event.type === 'milestone' ? "ml-0" : "ml-12",
                    activeEvent === event.id ? "opacity-100" : "opacity-50"
                  )}
                >
                  {/* Circle on timeline */}
                  <div 
                    className={cn(
                      "absolute left-0 -top-6 w-4 h-4 rounded-full border-2 border-primary z-10",
                      event.type === 'milestone' ? "bg-primary" : "bg-background"
                    )}
                  />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <div className="font-medium">{event.year}</div>
                    </div>
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
