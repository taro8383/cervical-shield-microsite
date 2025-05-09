
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Circle, Activity } from 'lucide-react';

interface Fact {
  value: string;
  description: string;
}

interface QuickFactsPanelProps {
  title: string;
  facts: Fact[];
  className?: string;
}

export const QuickFactsPanel = ({ title, facts, className }: QuickFactsPanelProps) => {
  const getRandomIcon = (index: number) => {
    const icons = [
      <Circle key="circle" className="h-4 w-4 text-primary fill-primary/40" />,
      <Activity key="activity" className="h-4 w-4 text-primary" />
    ];
    
    return icons[index % icons.length];
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {facts.map((fact, index) => (
          <div key={index}>
            {index > 0 && <Separator className="my-3" />}
            <div className="flex gap-3">
              <div className="mt-1">
                {getRandomIcon(index)}
              </div>
              <div>
                <p className="font-medium text-lg">{fact.value}</p>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
