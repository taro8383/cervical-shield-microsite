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
import { Timeline, TimelineEvent } from '@/components/features/Timeline';
import { SectionPermalink } from '@/components/features/SectionPermalink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, ChartBar, Calendar, Map, Filter, Tags } from 'lucide-react';

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
      id: 'demografia',
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
    { year: '2018', casos: 89, porcentaje: 43 },
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
    { kit: 'DH-2 (Dalton)', sensibilidad: 92, especificidad: 90, costo: 15, facilidad: 95 },
    { kit: 'PCR (Roche)', sensibilidad: 90, especificidad: 87, costo: 30, facilidad: 70 },
    { kit: 'CMIA (Abbott)', sensibilidad: 95.6, especificidad: 92, costo: 25, facilidad: 75 },
    { kit: 'HC-2 (Qiagen)', sensibilidad: 93.6, especificidad: 94.5, costo: 28, facilidad: 65 },
  ];

  const progressSteps = [
    {
      id: 1,
      title: 'Desarrollo del programa',
      description: 'Diseño de protocolos y procesos para implementación eficiente.',
      completed: false
    },
    {
      id: 2,
      title: 'Adquisición de kits DH-2',
      description: 'Negociación con proveedores y proceso de compra.',
      completed: false
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
      value: '92',
      description: 'Sensibilidad de los kits DH-2 para detección de VPH de alto riesgo'
    },
    {
      value: '70-90',
      description: 'Muertes anuales en Corrientes por esta causa prevenible'
    }
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      year: '2025',
      title: 'Análisis epidemiológico',
      description: 'Evaluación de la situación actual del cáncer de cuello uterino en Corrientes.',
      type: 'milestone'
    },
    {
      id: 2,
      year: '2025',
      title: 'Desarrollo del programa',
      description: 'Diseño del programa de rastrillaje con kits DH-2.',
      type: 'regular'
    },
    {
      id: 3,
      year: '2025',
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
      <section className="min-h-[50vh] md:min-h-[70vh] bg-[url('/assets/hero.jpeg')] bg-cover bg-center pt-24 pb-12 md:pt-32 md:pb-16 flex items-center relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/50 before:to-black/30 before:content-['']">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black [text-shadow:_1px_1px_2px_rgba(14,117,135,0.8)]">
              Programa de Rastrillaje de VPH con Kits DH-2
            </h1>
            <p className="text-xl md:text-2xl text-black/90 mb-8 [text-shadow:_0_1px_1px_rgba(14,117,135,0.6)]">
              Propuesta ejecutiva para la provincia de Corrientes
            </p>
            <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row justify-center relative z-10">
              <a 
                href="/assets/Propuesta ejecutiva_ Programa de rastrillaje de VPH con kits DH-2 para la provincia de Corrientes.pdf"
                download 
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Descargar propuesta completa
                </Button>
              </a>
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
              <TableOfContents sections={tableOfContentsSections} defaultCollapsed={true} />
              
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
                      icon={<ChartBar className="h-4 w-4" />}
                      color="bg-[#43B5A4]"
                    />
                    <StatCard 
                      title="Precisión diagnóstica"
                      value="90%"
                      description="Especificidad de los kits DH-2"
                      icon={<ChartBar className="h-4 w-4" />}
                      color="bg-[#0e7587]"
                    />
                    <StatCard 
                      title="Cobertura ampliada"
                      value="100%"
                      description="Acceso a poblaciones objetivo"
                      icon={<Map className="h-4 w-4" />}
                      color="bg-[#164587]"
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
                      <li>Alta sensibilidad (92%) y especificidad (&gt;90%).</li>
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
                    yKeys={[{ key: 'tasa', name: 'Tasa de mortalidad', color: '#164587' }]}
                  />
                </div>
                
                <h4 className="text-xl font-medium mb-2">Panorama epidemiológico actual</h4>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>4,700 nuevos casos anuales en Argentina, con 2,500 muertes.</li>
                  <li>Tasa de mortalidad ajustada (2022): 7.5 muertes por cada 100,000 mujeres.</li>
                  <li>Mayor riesgo en mujeres mayores: Picos en edades de 65-69 años y &gt;75 años.</li>
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
                    chartTypes={['bar', 'line']}
                    xKey="year"
                    yKeys={[
                      { key: 'casos', name: 'Casos anuales', color: '#0e7587' },
                      { key: 'porcentaje', name: 'Porcentaje de cánceres femeninos', color: '#b5b1b2' }
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
                  a pruebas validadas, con un valor predictivo negativo superior al 92%.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-4">Impacto esperado en salud pública</h3>
                
                <div className="border border-border p-6 rounded-lg bg-muted/30">
                  <h4 className="text-lg font-medium mb-2">Proyecciones de impacto:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reducción de casos de cáncer de cuello uterino avanzado y mortalidad en provincias objetivo.</li>
                    <li>Ahorro en costos de tratamientos agresivos (cirugía, radioterapia, quimioterapia) gracias a la detección temprana.</li>
                    <li>Ejemplos internacionales (Suecia y Australia) demuestran la efectividad de programas sostenibles en la reducción de tasas de mortalidad.</li>
                  </ul>
                </div>
                
                <ComparisonSlider
                  beforeImage="/assets/sinprograma.png"
                  afterImage="/assets/conprograma.png"
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
                
              <div className="overflow-x-auto mb-6 rounded-lg border border-border">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-4 text-left font-medium">Característica</th>
                        <th className="p-4 text-left font-medium">Dalton DH-2</th>
                        <th className="p-4 text-left font-medium">Roche (PCR)</th>
                        <th className="p-4 text-left font-medium">Abbott (CMIA)</th>
                        <th className="p-4 text-left font-medium">Qiagen HC-2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-4">Sensibilidad</td>
                        <td className="p-4 font-medium text-[#43B5A4]">92%</td>
                        <td className="p-4">90%</td>
                        <td className="p-4">95.6%</td>
                        <td className="p-4">93.6%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-4">Especificidad</td>
                        <td className="p-4 font-medium text-[#43B5A4]">90%</td>
                        <td className="p-4">87%</td>
                        <td className="p-4">92%</td>
                        <td className="p-4">94.5%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-4">Costo</td>
                        <td className="p-4 font-medium text-[#43B5A4]">Bajo</td>
                        <td className="p-4">Alto</td>
                        <td className="p-4">Medio</td>
                        <td className="p-4">Medio-Alto</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-4">Facilidad de Uso</td>
                        <td className="p-4 font-medium text-[#43B5A4]">✅ Alta (sin extracción de ADN)</td>
                        <td className="p-4">❌ Requiere laboratorio especializado</td>
                        <td className="p-4">⚠️ Riesgo de falsos positivos</td>
                        <td className="p-4">⚠️ Infraestructura compleja</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <DataVisualizer
                  title="Comparación de Kits de Detección"
                  description="Análisis de factores clave por fabricante"
                  data={kitComparisonData}
                  chartTypes={['bar']}
                  xKey="kit"
                    yKeys={[
                    { key: 'sensibilidad', name: 'Sensibilidad', color: '#43B5A4' },
                    { key: 'especificidad', name: 'Especificidad', color: '#0e7587' },
                    { key: 'facilidad', name: 'Facilidad', color: '#B5B1B2' }
                  ]}
                />
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Conclusiones y recomendaciones</h3>
                
                <p className="mb-4">
                  Los kits DH-2 ofrecen una solución integral para el rastrillaje de VPH, combinando:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Alta sensibilidad y especificidad para minimizar falsos resultados</li>
                  <li>Costo-efectividad para implementación a gran escala</li>
                  <li>Facilidad de uso que reduce requisitos de infraestructura especializada</li>
                  <li>Adaptabilidad a diversas condiciones de campo, ideal para Corrientes</li>
                </ul>
              </div>
            </section>
            
            {/* Demografía */}
            <section id="demografia" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Demografía y Acceso</h2>
                <SectionPermalink sectionId="demografia" />
              </div>
              
              <p className="mb-6">
                La planificación estratégica del programa requiere un análisis detallado de la 
                demografía y acceso a servicios de salud en Corrientes.
              </p>
              
              <div id="analisis-demografico" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Análisis demográfico</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-xl font-medium mb-2">Datos poblacionales</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Población total: 1,212,696 habitantes</li>
                      <li>Población femenina: 623,673 mujeres</li>
                      <li>Población objetivo (30-64 años): ~323,160 mujeres</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2">Distribución urbana-rural</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Población urbana: 82.8% (datos 2010)</li>
                      <li>Población rural: 17.2%</li>
                      <li>Concentración en la capital: 35.4% (428,346 habitantes)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div id="incidencia" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Incidencia histórica</h3>
                <p className="mb-4">
                  El cáncer de cuello uterino presenta un impacto significativo en Corrientes:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Entre 70-90 fallecimientos anuales por esta causa</li>
                  <li>Tasa de mortalidad superior al promedio nacional</li>
                  <li>Tendencia creciente preocupante si no se implementa un programa efectivo</li>
                </ul>
              </div>
              
              <div id="recomendaciones" className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Recomendaciones técnicas</h3>
                
                <div className="border border-border p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-3">Estrategias para maximizar el acceso:</h4>
                  
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Zonas urbanas:</strong> Integración con centros de salud existentes y hospitales de referencia
                    </li>
                    <li>
                      <strong>Zonas rurales:</strong> Implementación de unidades móviles y sistema de autotoma
                    </li>
                    <li>
                      <strong>Capacitación local:</strong> Alianza con universidades regionales para formación de personal
                    </li>
                    <li>
                      <strong>Seguimiento:</strong> Sistema de información centralizado y notificaciones para asegurar el tratamiento oportuno
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Conclusiones */}
            <section id="conclusiones" className="mb-16 section-reveal">
              <div className="flex justify-between items-center section-heading">
                <h2>Conclusiones</h2>
                <SectionPermalink sectionId="conclusiones" />
              </div>
              
              <p className="mb-6 text-lg">
                La implementación del programa de rastrillaje de VPH con kits DH-2 representa 
                una oportunidad única para reducir significativamente la carga del cáncer de 
                cuello uterino en Corrientes, aprovechando tecnología de vanguardia con 
                relación costo-beneficio favorable.
              </p>
              
              <div className="border-l-4 border-primary pl-6 my-8 py-2">
                <p className="text-xl italic">
                  "Un programa de prevención efectivo no es un gasto, sino una inversión en salud 
                  pública que salva vidas, reduce sufrimiento y genera ahorros significativos 
                  a largo plazo."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <StatCard 
                  title="Vidas salvadas"
                  value="87+"
                  description="Casos evitables anualmente"
                  color="bg-[#43B5A4]"
                />
                <StatCard 
                  title="Detección temprana"
                  value="70%"
                  description="De lesiones precancerosas"
                  color="bg-primary/20"
                />
                <StatCard 
                  title="Costo-efectividad"
                  value="30%"
                  description="Ahorro en tratamientos avanzados"
                  color="bg-primary/20"
                />
              </div>
              
              <div className="flex justify-center mt-10">
                <a 
                  href="/assets/Propuesta ejecutiva_ Programa de rastrillaje de VPH con kits DH-2 para la provincia de Corrientes.pdf"
                  download
                  className="no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Descargar propuesta completa
                  </Button>
                </a>
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
