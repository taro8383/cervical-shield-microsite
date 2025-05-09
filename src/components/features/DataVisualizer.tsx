
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

type DataVisualizerProps = {
  title: string;
  description?: string;
  data: any[];
  chartTypes: ('bar' | 'line' | 'pie')[];
  xKey: string;
  yKeys: { key: string; name: string; color: string }[];
  className?: string;
};

type ChartType = 'bar' | 'line' | 'pie';

export const DataVisualizer = ({
  title,
  description,
  data,
  chartTypes,
  xKey,
  yKeys,
  className,
}: DataVisualizerProps) => {
  const [activeChart, setActiveChart] = useState<ChartType>(chartTypes[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const COLORS = yKeys.map((y) => y.color);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
          {`Valor: ${value}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, index) => (
                <Bar key={yKey.key} dataKey={yKey.key} name={yKey.name} fill={yKey.color} />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey) => (
                <Line
                  key={yKey.key}
                  type="monotone"
                  dataKey={yKey.key}
                  name={yKey.name}
                  stroke={yKey.color}
                  activeDot={{ r: 8 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        // Transform data for pie chart
        const pieData = yKeys.map((yKey, index) => {
          const total = data.reduce((sum, entry) => sum + entry[yKey.key], 0);
          return {
            name: yKey.name,
            value: total,
          };
        });

        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case 'bar':
        return <BarChart className="h-5 w-5" />;
      case 'line':
        return <LineChart className="h-5 w-5" />;
      case 'pie':
        return <PieChart className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-2">
            {chartTypes.map((type) => (
              <Button
                key={type}
                variant={activeChart === type ? "default" : "outline"}
                size="icon"
                onClick={() => setActiveChart(type)}
                title={`Ver gráfico de ${type}`}
              >
                {getChartIcon(type)}
              </Button>
            ))}
          </div>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className={cn("pt-2", activeChart === 'pie' && "flex justify-center")}>
        {renderChart()}
      </CardContent>
    </Card>
  );
};
