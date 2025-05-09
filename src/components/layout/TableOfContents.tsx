
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  subsections?: {
    id: string;
    title: string;
  }[];
}

interface TableOfContentsProps {
  sections: Section[];
  defaultCollapsed?: boolean;
}

export const TableOfContents = ({ sections, defaultCollapsed = false }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
        
        // Check subsections
        if (section.subsections) {
          for (let j = section.subsections.length - 1; j >= 0; j--) {
            const subsection = section.subsections[j];
            const subElement = document.getElementById(subsection.id);
            
            if (subElement) {
              const subOffsetTop = subElement.offsetTop;
              if (scrollPosition >= subOffsetTop) {
                setActiveSection(subsection.id);
                return;
              }
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="sticky top-4 z-30 bg-background/80 backdrop-blur-sm rounded-lg border p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3 className="text-lg font-medium">Contenido</h3>
        <button className="p-1 hover:bg-muted rounded">
          <ChevronDown className={cn("h-5 w-5 transition-transform", !isCollapsed && "rotate-180")} />
        </button>
      </div>
      
      {!isCollapsed && (
        <nav className="max-h-[60vh] overflow-y-auto pr-1">
          <ul className="space-y-1 text-sm">
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <a 
                  href={`#${section.id}`}
                  className={cn(
                    "block py-1 hover:text-primary transition-colors",
                    activeSection === section.id ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {section.title}
                </a>
                
                {section.subsections && (
                  <ul className="ml-4 mt-1 space-y-1 text-xs border-l border-border pl-3">
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <a 
                          href={`#${subsection.id}`}
                          className={cn(
                            "block py-1 hover:text-primary transition-colors",
                            activeSection === subsection.id ? "text-primary font-medium" : "text-muted-foreground"
                          )}
                        >
                          {subsection.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
