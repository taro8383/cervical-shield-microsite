
import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { StatCard } from '@/components/features/StatCard';
import { DataVisualizer } from '@/components/features/DataVisualizer';
import { ComparisonSlider } from '@/components/features/ComparisonSlider';
import { ProgressTracker } from '@/components/features/ProgressTracker';
import { QuickFactsPanel } from '@/components/features/QuickFactsPanel';
import { FilterableTags } from '@/components/features/FilterableTags';
import { Timeline } from '@/components/features/Timeline';
import { SectionPermalink } from '@/components/features/SectionPermalink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress, ChartBar, Calendar, Map, Filter, Tags } from 'lucide-react';

const Index = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const contentSectionsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const tableOfContentsSections = [
    {
      id: 'resumen-ejecutivo',
      title: 'Resumen Ejecutivo',
    },
    {
      id: 'marco-cientifico',
      title: 'Marco Científico y Tecnológico',
      subsections: [
        { id: 'urgente-necesidad', title: 'La urgente necesidad' },
        { id: 'prevencion', title: 'Prevención del cáncer' },
      ],
    },
    {
      id: 'programa-rastrillaje',
      title: 'Programa de Rastrillaje de VPH',
    },
    {
      id: 'justificacion',
      title: 'Justificación e Impacto',
    },
    {
      id: 'evaluacion-economica',
      title: 'Evaluación Económica',
    },
    {
      id: 'kits-dh2',
      title: 'Kits DH-2',
    },
    {
      id: 'demografía',
      title: 'Demografía y Acceso',
      subsections: [
        { id: 'analisis-demografico', title: 'Análisis demográfico' },
        { id: 'incidencia', title: 'Incidencia histórica' },
        { id: 'recomendaciones', title: 'Recomendaciones técnicas' },
      ],
    },
    {
      id: 'conclusiones',
      title: 'Conclusiones',
    },
  ];

  // Sample data for visualization
  const incidenceData = [
    { year: '2016', casos: 91, porcentaje: 46.67 },
    { year: '2017', casos: 87, porcentaje: 54.7 },
    { year: '2018 (S1)', casos: 38, porcentaje: 43 },
    { year: '2019 (est)', casos: 95, porcentaje: 50 },
    { year: '2020 (est)', casos: 100, porcentaje: 52 },
    { year: '2021 (est)', casos: 105, porcentaje: 53 },
    { year: '2022 (est)', casos: 112, porcentaje: 55 },
  ];

  const comparativeData = [
    { provincia: 'Formosa', tasa: 17.3 },
    { provincia: 'Misiones', tasa: 15.0 },
    { provincia: 'Chaco', tasa: 13.1 },
    { provincia: 'Corrientes', tasa: 11.5 },
    { provincia: 'Promedio Nacional', tasa: 7.5 },
  ];

  const kitComparisonData = [
    { kit: 'DH-2 (Dalton)', sensibilidad: 98, especificidad: 99.9, costo: 15, facilidad: 95 },
    { kit: 'PCR (Roche)', sensibilidad: 95, especificidad: 98, costo: 30, facilidad: 70 },
    { kit: 'CMIA (Abbott)', sensibilidad: 90, especificidad: 97, costo: 25, facilidad: 75 },
    { kit: 'HC-2 (Qiagen)', sensibilidad: 92, especificidad: 99, costo: 28, facilidad: 65 },
  ];

  const progressSteps = [
    {
      id: 1,
      title: 'Desarrollo del programa',
      description: 'Diseño de protocolos y procesos para implementación eficiente.',
      completed: true
    },
    {
      id: 2,
      title: 'Adquisición de kits DH-2',
      description: 'Negociación con proveedores y proceso de compra.',
      completed: true
    },
    {
      id: 3,
      title: 'Capacitación del personal',
      description: 'Entrenamiento de personal médico y técnico para el uso de kits.',
      completed: false
    },
    {
      id: 4,
      title: 'Implementación piloto',
      description: 'Implementación en centros de salud seleccionados.',
      completed: false
    },
    {
      id: 5,
      title: 'Expansión provincial',
      description: 'Implementación completa en toda la provincia de Corrientes.',
      completed: false
    }
  ];

  const quickFacts = [
    {
      value: '4,700',
      description: 'Nuevos casos anuales de cáncer de cuello uterino en Argentina'
    },
    {
      value: '2,500',
      description: 'Muertes anuales por cáncer de cuello uterino en Argentina'
    },
    {
      value: '98%',
      description: 'Sensibilidad de los kits DH-2 para detección de VPH de alto riesgo'
    },
    {
      value: '70-90',
      description: 'Muertes anuales en Corrientes por esta causa prevenible'
    }
  ];

  const timelineEvents = [
    {
      id: 1,
      year: '2022',
      title: 'Análisis epidemiológico',
      description: 'Evaluación de la situación actual del cáncer de cuello uterino en Corrientes.',
      type: 'milestone'
    },
    {
      id: 2,
      year: '2023',
      title: 'Desarrollo del programa',
      description: 'Diseño del programa de rastrillaje con kits DH-2.',
      type: 'regular'
    },
    {
      id: 3,
      year: '2024',
      title: 'Implementación piloto',
      description: 'Prueba piloto en centros de salud seleccionados.',
      type: 'milestone'
    },
    {
      id: 4,
      year: '2025',
      title: 'Expansión provincial',
      description: 'Implementación en toda la provincia de Corrientes.',
      type: 'regular'
    },
    {
      id: 5,
      year: '2030',
      title: 'Objetivo OMS',
      description: 'Alcanzar el objetivo 90-70-90 de la OMS para eliminación del cáncer cervical.',
      type: 'milestone'
    }
  ];

  const filterTags = ['Tecnología', 'Economía', 'Salud Pública', 'Demografía', 'Implementación', 'VPH'];

  const handleFilterChange = (tags: string[]) => {
    setActiveTags(tags);
    // In a real implementation, we would filter content based on tags
  };

  return (
    <>
      <LoadingScreen />
      <Header />
      
      {/* Hero */}
      <section className="min-h-[70vh] bg-gradient-to-br from-health-100 to-health-200 pt-32 pb-16 flex items-center">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Programa de Rastrillaje de VPH con Kits DH-2
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Propuesta ejecutiva para la provincia de Corrientes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Descargar informe completo
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                contentSectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Explorar propuesta
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <div className="container py-12" ref={contentSectionsRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar with TOC */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-20">
              <TableOfContents sections={tableOfContentsSections} />
              
              <div className="mt-8">
                <FilterableTags 
                  tags={filterTags}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              <div className="mt-8">
                <QuickFactsPanel 
                  title="Datos Rápidos"
                  facts={quickFacts}
                />
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Resumen Ejecutivo */}
            <section id="resumen-ejecutivo" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Resumen Ejecutivo</h2>
                <SectionPermalink sectionId="resumen-ejecutivo" />
              </div>
              
              <p className="mb-6 text-lg">
                El cáncer de cuello uterino representa una crisis de salud pública significativa en Argentina, 
                con una carga desproporcionadamente alta en las provincias del noreste argentino. Cada año, 
                miles de mujeres argentinas son diagnosticadas y muchas más pierden la vida a causa de esta 
                enfermedad prevenible.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
                <StatCard 
                  title="Detección temprana"
                  value="70%"
                  description="De lesiones precancerosas identificadas"
                  icon={<Progress className="h-4 w-4" />}
                  color="bg-health-100"
                />
                <StatCard 
                  title="Precisión diagnóstica"
                  value="99.9%"
                  description="Especificidad de los kits DH-2"
                  icon={<ChartBar className="h-4 w-4" />}
                  color="bg-health-200"
                />
                <StatCard 
                  title="Cobertura ampliada"
                  value="100%"
                  description="Acceso a poblaciones objetivo"
                  icon={<Map className="h-4 w-4" />}
                  color="bg-health-100"
                />
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Objetivo principal del programa</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Reducir drásticamente la incidencia y la mortalidad del cáncer de cuello uterino en 
                      la región noreste de Argentina a través de:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Detección temprana de infecciones por VPH.</li>
                      <li>Tratamiento oportuno de lesiones precancerosas.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Justificación técnica</AccordionTrigger>
                  <AccordionContent>
                    <p>Los kits DH-2 destacan por:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Alta sensibilidad (98%) y especificidad (>99.9%).</li>
                      <li>No requieren extracción ni amplificación de ADN, simplificando el proceso.</li>
                      <li>Adaptabilidad a entornos con infraestructura limitada.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            {/* Marco científico y tecnológico */}
            <section id="marco-cientifico" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Marco Científico y Tecnológico</h2>
                <SectionPermalink sectionId="marco-cientifico" />
              </div>
              
              <div id="urgente-necesidad" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">La urgente necesidad de un programa mejorado</h3>
                
                <div className="mb-6">
                  <DataVisualizer
                    title="Tasas de Mortalidad por Cáncer de Cuello Uterino"
                    description="Comparación por provincia (muertes por cada 100,000 mujeres)"
                    data={comparativeData}
                    chartTypes={['bar', 'line']}
                    xKey="provincia"
                    yKeys={[{ key: 'tasa', name: 'Tasa de mortalidad', color: '#8B5CF6' }]}
                  />
                </div>
                
                <h4 className="text-xl font-medium mb-2">Panorama epidemiológico actual</h4>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>4,700 nuevos casos anuales en Argentina, con 2,500 muertes.</li>
                  <li>Tasa de mortalidad ajustada (2022): 7.5 muertes por cada 100,000 mujeres.</li>
                  <li>Mayor riesgo en mujeres mayores: Picos en edades de 65-69 años y >75 años.</li>
                </ul>
                
                <h4 className="text-xl font-medium mb-2">Impacto desproporcionado en el noreste Argentino</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Formosa: Tasa de mortalidad ajustada (TAE) de 17.3/100,000 (quintil más alto).</li>
                  <li>Misiones: TAE de 15.0/100,000 (quintil superior).</li>
                  <li>Chaco: TAE de 13.1/100,000 (doble del promedio nacional).</li>
                  <li>Corrientes: Representa 3.4% de muertes nacionales por esta causa (70-90 fallecimientos anuales).</li>
                </ul>
              </div>
              
              <div id="prevencion" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">La naturaleza prevenible del cáncer de cuello uterino</h3>
                
                <p className="mb-4">
                  El cáncer de cuello uterino es altamente prevenible mediante estrategias efectivas:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h4 className="font-medium mb-2">Vacunación</h4>
                    <p className="text-sm text-muted-foreground">
                      Contra el VPH, especialmente antes de la exposición
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <h4 className="font-medium mb-2">Rastrillaje</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular para detectar lesiones precancerosas
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h4 className="font-medium mb-2">Tratamiento</h4>
                    <p className="text-sm text-muted-foreground">
                      Oportuno de lesiones identificadas
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Programa de rastrillaje de VPH */}
            <section id="programa-rastrillaje" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Programa de Rastrillaje de VPH Propuesto</h2>
                <SectionPermalink sectionId="programa-rastrillaje" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Población objetivo y estrategia</h3>
                  <ul className="list-disc pl-6 space-y-1 mb-5">
                    <li>Mujeres de 30 a 64 años en la provincia de Corrientes.</li>
                    <li>Prueba primaria de VPH con kits DH-2.</li>
                    <li>Positivos: derivación para DH-3 y colposcopia si es necesario.</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-3">Logística e infraestructura</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Centros de rastreo en centros de salud existentes.</li>
                    <li>Gestión eficiente de la cadena de suministro para kits DH-2.</li>
                    <li>Laboratorios centralizados con control de calidad.</li>
                    <li>Sistema de información para seguimiento de pacientes y resultados.</li>
                  </ul>
                </div>
                
                <div>
                  <ProgressTracker steps={progressSteps} />
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full mb-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Capacitación del personal</AccordionTrigger>
                  <AccordionContent>
                    <p>Entrenamiento en:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Protocolos de toma de muestras cervicales.</li>
                      <li>Uso de kits DH-2 e interpretación de resultados.</li>
                      <li>Comunicación efectiva con pacientes.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Concientización comunitaria</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Campañas con medios locales, talleres y materiales educativos.</li>
                      <li>Colaboración con líderes comunitarios para fomentar la participación.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Gestión de datos y monitoreo</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Sistema robusto para monitorear cobertura, resultados y tasas de derivación.</li>
                      <li>Evaluación continua para optimizar eficacia.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Implementación por fases</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Fase inicial:</strong> Lanzamiento en centros seleccionados.</li>
                      <li><strong>Fases posteriores:</strong> Expansión progresiva a toda la población objetivo.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Timeline events={timelineEvents} className="mt-10" />
            </section>
            
            {/* Justificación e Impacto */}
            <section id="justificacion" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Justificación Basada en Datos e Impacto Esperado</h2>
                <SectionPermalink sectionId="justificacion" />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-medium mb-4">Epidemiología del cáncer de cuello uterino en Corrientes</h3>
                <p className="mb-4">
                  La implementación de un programa de rastrillaje de VPH en Corrientes se fundamenta 
                  en datos que muestran una prevalencia y mortalidad elevadas por este cáncer en 
                  comparación con el promedio nacional.
                </p>
                <p className="mb-4">
                  Provincias como Formosa y Misiones lideran las tasas de mortalidad por cáncer de 
                  cuello uterino en Argentina, destacando la urgencia de intervenciones específicas.
                </p>
                
                <div className="mb-6">
                  <DataVisualizer
                    title="Incidencia Histórica de Casos"
                    description="Hospital Dr. José R. Vidal, Corrientes"
                    data={incidenceData}
                    chartTypes={['bar', 'line', 'pie']}
                    xKey="year"
                    yKeys={[
                      { key: 'casos', name: 'Casos anuales', color: '#8B5CF6' },
                      { key: 'porcentaje', name: 'Porcentaje de cánceres femeninos', color: '#0EA5E9' }
                    ]}
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Ventajas del rastrillaje con pruebas de VPH</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                  <div className="bg-muted/40 rounded-lg p-6">
                    <h4 className="text-xl font-medium mb-3">Metodología tradicional</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Basada en citología (Papanicolaou)</li>
                      <li>Sensibilidad limitada (~50-70%)</li>
                      <li>Requiere interpretación subjetiva</li>
                      <li>Necesita infraestructura compleja</li>
                      <li>Intervalos cortos entre pruebas</li>
                    </ul>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-6">
                    <h4 className="text-xl font-medium mb-3">Prueba de VPH con kits DH-2</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Alta sensibilidad (98%)</li>
                      <li>Detecta infecciones antes de anomalías celulares</li>
                      <li>Resultados objetivos y reproducibles</li>
                      <li>Posibilidad de auto-toma</li>
                      <li>Intervalo seguro de 5-10 años si es negativo</li>
                    </ul>
                  </div>
                </div>
                
                <p>
                  Los kits DH-2 de Hangzhou Dalton BioSciences, Ltd. ofrecen sensibilidad y especificidad comparables 
                  a pruebas validadas, con un valor predictivo negativo superior al 99.9%.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-4">Impacto esperado en salud pública</h3>
                
                <div className="border border-border p-6 rounded-lg mb-6 bg-muted/30">
                  <h4 className="text-lg font-medium mb-2">Proyecciones de impacto:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reducción de casos de cáncer de cuello uterino avanzado y mortalidad en provincias objetivo.</li>
                    <li>Ahorro en costos de tratamientos agresivos (cirugía, radioterapia, quimioterapia) gracias a la detección temprana.</li>
                    <li>Ejemplos internacionales (Suecia y Australia) demuestran la efectividad de programas sostenibles en la reducción de tasas de mortalidad.</li>
                  </ul>
                </div>
                
                <ComparisonSlider 
                  beforeImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  afterImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  beforeLabel="Sin programa de rastrillaje"
                  afterLabel="Con programa implementado"
                />
              </div>
            </section>
            
            {/* Evaluación Económica */}
            <section id="evaluacion-economica" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Evaluación Económica y Sostenibilidad</h2>
                <SectionPermalink sectionId="evaluacion-economica" />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-medium mb-4">Costo-beneficio de los kits DH-2</h3>
                <p className="mb-4">
                  Los kits DH-2 combinan calidad y costo competitivo, ideal para escalamiento 
                  en sistemas públicos de salud.
                </p>
                <p className="mb-4">
                  Aunque requieren inversión inicial en adquisición, capacitación y logística, 
                  los beneficios a largo plazo superan los gastos:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Reducción de costos asociados al tratamiento de cáncer avanzado.</li>
                  <li>Mejora en la esperanza de vida y productividad económica de las comunidades.</li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-muted/40 p-6 rounded-lg">
                    <h4 className="text-xl font-medium mb-3">Costos directos del programa</h4>
                    <ul className="space-y-3">
                      <li>
                        <div className="font-medium">Adquisición de kits DH-2:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Precio estimado por prueba: entre US$9 y US$18 (según volumen).
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Personal:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Salarios para profesionales de salud y personal administrativo.
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Logística:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Transporte, instalaciones y servicios básicos.
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Seguimiento de casos positivos:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Pruebas adicionales y tratamiento de lesiones precancerosas.
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h4 className="text-xl font-medium mb-3">Carga económica del cáncer</h4>
                    <ul className="space-y-3">
                      <li>
                        <div className="font-medium">Costos médicos directos:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Diagnóstico, tratamientos complejos y hospitalizaciones prolongadas.
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Costos indirectos:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Pérdida de productividad y cuidados familiares.
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Contexto regional:</div>
                        <div className="text-sm text-muted-foreground pl-4">
                          Datos de Brasil indican costos anuales de varios miles de dólares por paciente.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-4">Rentabilidad del rastrillaje masivo</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Evidencia respaldatoria</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2"><strong>Estudio en Zixi, Zhejiang (2017)</strong>:</p>
                      <ul className="list-disc pl-6 space-y-1 mb-3">
                        <li>Ahorro del 30% en costos hospitalarios gracias a la detección temprana.</li>
                      </ul>
                      
                      <p className="mb-2"><strong>Ventajas de la prueba de VPH vs. citología</strong>:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Menor costo por lesión CIN2+ detectada.</li>
                        <li>Mayor cobertura poblacional con auto-toma.</li>
                        <li>La OMS recomienda la detección basada en VPH por su sensibilidad y eficiencia.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Proyecciones para Corrientes</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Reducción del 30% en tratamientos de cáncer avanzado.</li>
                        <li>Ahorros anuales significativos si se evitan casos costosos.</li>
                        <li>Aunque los datos locales requieren análisis, el potencial es alto debido a las altas tasas de mortalidad.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
            
            {/* Kits DH-2 */}
            <section id="kits-dh2" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Introducción de los kits de prueba DH-2</h2>
                <SectionPermalink sectionId="kits-dh2" />
              </div>
              
              <p className="mb-6">
                Los kits DH-2 de Hangzhou Dalton BioSciences, Ltd. representan una solución avanzada 
                y eficaz para el rastrillaje del VPH. Estos kits están diseñados para detectar 14 tipos 
                de VPH de alto riesgo, clasificados por la OMS, incluyendo los tipos 16, 18, 31, 33, 
                35, 39, 45, 51, 52, 56, 58, 59, 66 y 68.
              </p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Comparativa tecnológica</h3>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-3 text-left border">Característica</th>
                        <th className="p-3 text-left border">Dalton DH-2</th>
                        <th className="p-3 text-left border">Roche (PCR)</th>
                        <th className="p-3 text-left border">Abbott (CMIA)</th>
                        <th className="p-3 text-left border">Qiagen HC-2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">Sensibilidad</td>
                        <td className="p-3 border">Alta (98%)</td>
                        <td className="p-3 border">95%</td>
                        <td className="p-3 border">90%</td>
                        <td className="p-3 border">92%</td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Especificidad</td>
                        <td className="p-3 border">>99.9%</td>
                        <td className="p-3 border">98%</td>
                        <td className="p-3 border">97%</td>
                        <td className="p-3 border">99%</td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Costo</td>
                        <td className="p-3 border">Bajo</td>
                        <td className="p-3 border">Alto</td>
                        <td className="p-3 border">Medio</td>
                        <td className="p-3 border">Medio-Alto</td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Facilidad de Uso</td>
                        <td className="p-3 border">✅ Alta (sin extracción de ADN)</td>
                        <td className="p-3 border">❌ Requiere laboratorio especializado</td>
                        <td className="p-3 border">⚠️ Riesgo de falsos positivos</td>
                        <td className="p-3 border">⚠️ Infraestructura compleja</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <DataVisualizer
                  title="Comparación de Kits de Detección"
                  description="Análisis de factores clave por fabricante"
                  data={kitComparisonData}
                  chartTypes={['bar', 'pie']}
                  xKey="kit"
                  yKeys={[
                    { key: 'sensibilidad', name: 'Sensibilidad (%)', color: '#8B5CF6' },
                    { key: 'especificidad', name: 'Especificidad (%)', color: '#0EA5E9' },
                    { key: 'facilidad', name: 'Facilidad de uso', color: '#22C55E' }
                  ]}
                  className="mb-6"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-medium mb-4">Ventajas clave</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow hover-scale">
                    <h4 className="font-medium mb-2">Detección diferenciada</h4>
                    <p className="text-sm text-muted-foreground">
                      De los tipos 16 y 18 (más comunes) y otros 12 tipos de alto riesgo en conjunto,
                      responsables de aproximadamente el 70% de los casos de cáncer de cuello uterino mundialmente.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow hover-scale">
                    <h4 className="font-medium mb-2">Tecnología avanzada</h4>
                    <p className="text-sm text-muted-foreground">
                      Método de captura híbrida con quimioluminiscencia (Hybrid Capture-CLIA) 
                      sin necesidad de extracción ni amplificación de ácido nucleico.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow hover-scale">
                    <h4 className="font-medium mb-2">Alta precisión</h4>
                    <p className="text-sm text-muted-foreground">
                      Uso de 14 sondas de ARN para evitar falsos negativos asociados a la falta 
                      de la región L1 del VPH. Valor predictivo negativo > 99.9%.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow hover-scale">
                    <h4 className="font-medium mb-2">Presentación y almacenamiento</h4>
                    <p className="text-sm text-muted-foreground">
                      Disponible en 48 o 96 pruebas por caja. Validez de 12 meses a 2–8 °C (evitar congelación).
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Demografía y Acceso */}
            <section id="demografía" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Demografía y Acceso a Salud</h2>
                <SectionPermalink sectionId="demografía" />
              </div>
              
              <div id="analisis-demografico" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Análisis demográfico y acceso a la salud en Corrientes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard 
                    title="Población Total"
                    value="1,212,696"
                    description="Habitantes de Corrientes (Censo 2022)"
                    icon={<ChartBar className="h-4 w-4" />}
                    color="bg-health-200"
                  />
                  <StatCard 
                    title="Población Femenina"
                    value="623,673"
                    description="Mujeres en Corrientes (Censo 2022)"
                    icon={<ChartBar className="h-4 w-4" />}
                    color="bg-health-100"
                  />
                  <StatCard 
                    title="Población Objetivo"
                    value="323,160"
                    description="Estimación de mujeres de 20-59 años"
                    icon={<Filter className="h-4 w-4" />}
                    color="bg-health-200"
                  />
                </div>
                
                <h4 className="text-xl font-medium mb-2">Distribución de la población urbana y rural</h4>
                <p className="mb-4">
                  La distribución urbana-rural afecta la logística del programa. Según el censo de 2010:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li><strong>Población urbana:</strong> 822,224 habitantes (82.8%).</li>
                  <li><strong>Población rural:</strong> 170,371 habitantes (17.2%):
                    <ul className="list-disc pl-6 mt-1">
                      <li>Rural agrupada: 35,770 personas.</li>
                      <li>Rural dispersa: 134,601 personas.</li>
                    </ul>
                  </li>
                </ul>
                
                <h4 className="text-xl font-medium mb-2">Cobertura actual de citología</h4>
                <p className="mb-4">
                  La evaluación de la cobertura existente es vital para identificar brechas:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Encuesta Nacional de Factores de Riesgo (2005):</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>53% de mujeres de 35–64 años en el Noreste realizó Papanicolaou en los últimos 2 años.</li>
                      <li>En Corrientes, solo 25% de mujeres sin obra social o seguro privado accedió a la prueba.</li>
                    </ul>
                  </li>
                  <li><strong>Cobertura nacional (2018):</strong> 70.3% en promedio, aunque regionalmente podría variar.</li>
                </ul>
              </div>
              
              <div id="incidencia" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Incidencia histórica y proyección de impacto</h3>
                
                <h4 className="text-xl font-medium mb-2">Casos anuales de cáncer cervical</h4>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li>A nivel nacional, se diagnostican ~4,000 nuevos casos de cáncer cervical al año en Argentina.</li>
                  <li>
                    <strong>Datos del Hospital "Dr. José R. Vidal" (Corrientes)</strong>:
                    <ul className="list-disc pl-6 mt-1">
                      <li>2016: 91 casos (46.67% de cánceres femeninos).</li>
                      <li>2017: 87 casos (54.70% de cánceres femeninos).</li>
                      <li>Primer semestre de 2018: 38 casos (43% de cánceres femeninos).</li>
                    </ul>
                  </li>
                  <li>Estudios sugieren que entre 70 y 90 mujeres fallecen anualmente en Corrientes por VPH.</li>
                </ul>
                
                <h4 className="text-xl font-medium mb-2">Proyección de casos evitables</h4>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li>Un programa de rastrillaje masivo de VPH podría detectar el 70% de lesiones precancerosas, reduciendo la incidencia futura.</li>
                  <li>Basado en la estimación de 125 casos anuales: 87.5 casos evitables/año mediante detección temprana.</li>
                  <li>
                    Impacto real depende de:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Cobertura del programa.</li>
                      <li>Eficacia en el tratamiento de lesiones.</li>
                    </ul>
                  </li>
                  <li>La progresión de lesiones a cáncer invasivo puede tomar 10–20 años, por lo que los resultados serán visibles a largo plazo.</li>
                </ul>
              </div>
              
              <div id="recomendaciones" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Recomendaciones técnicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-xl font-medium mb-3">Áreas urbanas</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h5 className="font-medium">Metodología de prueba de VPH</h5>
                        <p className="text-sm text-muted-foreground">Kit DH-2 con método de hibridación por captura con quimioluminiscencia.</p>
                      </div>
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h5 className="font-medium">Recolección de muestras</h5>
                        <p className="text-sm text-muted-foreground">Utilizar células exfoliadas del cuello uterino siguiendo las instrucciones del fabricante.</p>
                      </div>
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h5 className="font-medium">Equipamiento e Infraestructura</h5>
                        <p className="text-sm text-muted-foreground">Analizador de inmunoensayo por quimioluminiscencia (Dalton CS-SA301C) con integración a sistemas LIS/HIS.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-3">Áreas rurales</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-health-300 pl-4 py-2">
                        <h5 className="font-medium">Campañas de rastrillaje móvil</h5>
                        <p className="text-sm text-muted-foreground">Superar barreras geográficas con unidades móviles y espacios privados para la toma de muestras.</p>
                      </div>
                      <div className="border-l-4 border-health-300 pl-4 py-2">
                        <h5 className="font-medium">Promoción de la autotoma</h5>
                        <p className="text-sm text-muted-foreground">Aumentar la participación con métodos respaldados por la FDA y programas exitosos como ROSE en Malasia.</p>
                      </div>
                      <div className="border-l-4 border-health-300 pl-4 py-2">
                        <h5 className="font-medium">Método autónomo de quimioluminiscencia</h5>
                        <p className="text-sm text-muted-foreground">Uso del analizador CS-SA301C en unidades móviles con comunicación de resultados mediante tecnología móvil.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-xl font-medium mb-3">Capacitación técnica y desarrollo de capacidades</h4>
                <Accordion type="single" collapsible className="w-full mb-8">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Alianzas con universidades locales</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2"><strong>Instituciones clave:</strong> Universidad Nacional del Nordeste, Fundación Barceló.</p>
                      <p className="mb-2"><strong>Roles:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Desarrollo de currículos para capacitación en pruebas de VPH.</li>
                        <li>Sesiones prácticas para personal de salud.</li>
                        <li>Formación continua en estándares de calidad y protocolos actualizados.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Programas de capacitación</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Temas incluidos:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Marco teórico del VPH y cáncer de cuello uterino.</li>
                        <li>Uso del kit DH-2 y analizador Dalton CS-SA301C.</li>
                        <li>Control de calidad, bioseguridad y ética en programas de rastrillaje.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
            
            {/* Conclusiones */}
            <section id="conclusiones" className="section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Conclusiones y Recomendaciones</h2>
                <SectionPermalink sectionId="conclusiones" />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-medium mb-4">Importancia de la prevención y detección temprana</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>El cáncer de cuello uterino es una enfermedad prevenible, y el rastrillaje con VPH supera en sensibilidad a la citología tradicional.</li>
                  <li>Los kits DH-2 permiten detectar tipos de VPH de alto riesgo específicos y simplifican el proceso de prueba.</li>
                  <li>La estrategia propuesta (rastrillaje primario con VPH en mujeres de 30 a 64 años, seguido de citología de triage para resultados positivos) se alinea con guías nacionales e internacionales.</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-medium mb-4">Llamado a la acción</h3>
                <p className="text-lg">
                  Se recomienda al Ministerio de Salud de Corrientes adoptar y financiar el programa propuesto 
                  para establecer un programa de rastrillaje de VPH integral utilizando los kits DH-2. Esta 
                  inversión estratégica tendrá un impacto duradero en la reducción de la carga del cáncer de 
                  cuello uterino y en la mejora de la calidad de vida.
                </p>
              </div>
              
              <div className="flex justify-center mt-10 mb-6">
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Descargar informe completo
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
