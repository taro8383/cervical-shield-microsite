
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

interface FilterableTagsProps {
  tags: string[];
  onFilterChange: (activeTags: string[]) => void;
  className?: string;
}

export const FilterableTags = ({ tags, onFilterChange, className }: FilterableTagsProps) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  const toggleTag = (tag: string) => {
    const newActiveTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    
    setActiveTags(newActiveTags);
    onFilterChange(newActiveTags);
  };
  
  const clearFilters = () => {
    setActiveTags([]);
    onFilterChange([]);
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Tag className="h-4 w-4 mr-2" />
          <span>Filtrar por categoría</span>
        </div>
        
        {activeTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={activeTags.includes(tag) ? "default" : "outline"}
            className={cn(
              "cursor-pointer hover:bg-primary/20",
              activeTags.includes(tag) ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
