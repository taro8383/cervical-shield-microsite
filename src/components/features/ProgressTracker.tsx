
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, useEffect } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  className?: string;
}

export const ProgressTracker = ({ steps, className }: ProgressTrackerProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const trackerRef = useRef<HTMLDivElement>(null);
  const completedSteps = steps.filter(step => step.completed).length;
  
  useEffect(() => {
    const totalSteps = steps.length;
    const completedPercentage = (completedSteps / totalSteps) * 100;
    setProgress(completedPercentage);
  }, [steps, completedSteps]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (trackerRef.current) {
        const rect = trackerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          // Calculate which step should be active based on scroll position
          const middleOfScreen = window.innerHeight / 2;
          
          // Get all step elements
          const stepElements = trackerRef.current.querySelectorAll('[data-step]');
          
          stepElements.forEach((stepEl) => {
            const stepRect = stepEl.getBoundingClientRect();
            const stepMiddle = stepRect.top + stepRect.height / 2;
            
            if (Math.abs(stepMiddle - middleOfScreen) < 100) {
              const stepId = parseInt(stepEl.getAttribute('data-step') || '1');
              setActiveStep(stepId);
            }
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Card className={className} ref={trackerRef}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Progreso del Programa</span>
          <span className="text-sm font-normal">
            {completedSteps} de {steps.length} completados
          </span>
        </CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              data-step={step.id}
              className={`relative pl-8 transition-all duration-300 ${
                activeStep === step.id ? 'scale-105 -translate-y-1' : ''
              }`}
            >
              <div 
                className={`absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium border-2 transition-colors ${
                  step.completed 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background text-muted-foreground border-muted-foreground'
                }`}
              >
                {step.id}
              </div>
              
              {/* Connecting line */}
              {step.id !== steps.length && (
                <div 
                  className={`absolute left-3 top-6 w-0.5 h-[calc(100%+2rem)] -ml-px ${
                    step.completed ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              )}
              
              <h3 className={`font-medium ${step.completed ? 'text-primary' : ''}`}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
