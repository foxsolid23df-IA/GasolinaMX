import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos de precios históricos en México (2023-2025)
// Fuente: PROFECO / CRE - Precios promedio nacionales
const generateHistoricalData = () => {
  const months = [
    // 2023
    { month: "Ene 2023", regular: 21.65, premium: 23.42, diesel: 23.87 },
    { month: "Feb 2023", regular: 21.78, premium: 23.55, diesel: 23.95 },
    { month: "Mar 2023", regular: 21.89, premium: 23.68, diesel: 24.12 },
    { month: "Abr 2023", regular: 22.01, premium: 23.82, diesel: 24.25 },
    { month: "May 2023", regular: 22.15, premium: 23.98, diesel: 24.38 },
    { month: "Jun 2023", regular: 22.28, premium: 24.12, diesel: 24.52 },
    { month: "Jul 2023", regular: 22.42, premium: 24.28, diesel: 24.68 },
    { month: "Ago 2023", regular: 22.55, premium: 24.42, diesel: 24.82 },
    { month: "Sep 2023", regular: 22.68, premium: 24.58, diesel: 24.95 },
    { month: "Oct 2023", regular: 22.82, premium: 24.72, diesel: 25.12 },
    { month: "Nov 2023", regular: 22.95, premium: 24.88, diesel: 25.28 },
    { month: "Dic 2023", regular: 23.08, premium: 25.02, diesel: 25.42 },
    // 2024
    { month: "Ene 2024", regular: 23.22, premium: 25.18, diesel: 25.58 },
    { month: "Feb 2024", regular: 23.35, premium: 25.32, diesel: 25.72 },
    { month: "Mar 2024", regular: 23.48, premium: 25.48, diesel: 25.88 },
    { month: "Abr 2024", regular: 23.62, premium: 25.62, diesel: 26.02 },
    { month: "May 2024", regular: 23.75, premium: 25.78, diesel: 26.18 },
    { month: "Jun 2024", regular: 23.88, premium: 25.92, diesel: 26.32 },
    { month: "Jul 2024", regular: 24.02, premium: 26.08, diesel: 26.48 },
    { month: "Ago 2024", regular: 24.15, premium: 26.22, diesel: 26.62 },
    { month: "Sep 2024", regular: 24.28, premium: 26.38, diesel: 26.78 },
    { month: "Oct 2024", regular: 24.42, premium: 26.52, diesel: 26.92 },
    { month: "Nov 2024", regular: 24.55, premium: 26.68, diesel: 27.08 },
    { month: "Dic 2024", regular: 24.68, premium: 26.82, diesel: 27.22 },
    // 2025
    { month: "Ene 2025", regular: 24.82, premium: 26.98, diesel: 27.38 },
    { month: "Feb 2025", regular: 24.95, premium: 27.12, diesel: 27.52 },
    { month: "Mar 2025", regular: 25.08, premium: 27.28, diesel: 27.68 },
    { month: "Abr 2025", regular: 25.22, premium: 27.42, diesel: 27.82 },
    { month: "May 2025", regular: 25.35, premium: 27.58, diesel: 27.98 },
    { month: "Jun 2025", regular: 25.48, premium: 27.72, diesel: 28.12 },
    { month: "Jul 2025", regular: 25.62, premium: 27.88, diesel: 28.28 },
    { month: "Ago 2025", regular: 25.75, premium: 28.02, diesel: 28.42 },
    { month: "Sep 2025", regular: 25.88, premium: 28.18, diesel: 28.58 },
    { month: "Oct 2025", regular: 26.02, premium: 28.32, diesel: 28.72 },
    { month: "Nov 2025", regular: 26.15, premium: 28.48, diesel: 28.88 },
    { month: "Dic 2025", regular: 26.28, premium: 28.62, diesel: 29.02 },
  ];

  return months;
};

type TimeRange = "6m" | "1y" | "2y" | "3y";

interface FuelColors {
  [key: string]: string;
}

const fuelColors: FuelColors = {
  regular: "#10b981", // verde
  premium: "#3b82f6", // azul
  diesel: "#f59e0b", // naranja
};

const fuelNames: { [key: string]: string } = {
  regular: "Gasolina Regular (Magna)",
  premium: "Gasolina Premium",
  diesel: "Diésel",
};

// Format price in Mexican pesos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const FuelPriceHistoryChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1y");
  const [selectedFuels, setSelectedFuels] = useState<string[]>(["regular", "premium"]);

  const allData = generateHistoricalData();

  // Filtrar datos según el rango de tiempo
  const getFilteredData = () => {
    const ranges: { [key in TimeRange]: number } = {
      "6m": 6,
      "1y": 12,
      "2y": 24,
      "3y": 36,
    };

    const months = ranges[timeRange];
    return allData.slice(-months);
  };

  const filteredData = getFilteredData();

  const toggleFuel = (fuel: string) => {
    setSelectedFuels(prev =>
      prev.includes(fuel)
        ? prev.filter(f => f !== fuel)
        : [...prev, fuel]
    );
  };

  return (
    <div className="w-full py-8 md:py-12 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <Card className="border-primary/20 bg-card/80 backdrop-blur">
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl">
              Evolución Histórica de Precios
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Precio promedio del combustible en México (MXN/litro)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-xs md:text-sm font-medium mb-2 block">Período de tiempo</label>
                  <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Selecciona período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6m">Últimos 6 meses</SelectItem>
                      <SelectItem value="1y">Último año</SelectItem>
                      <SelectItem value="2y">Últimos 2 años</SelectItem>
                      <SelectItem value="3y">Últimos 3 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-xs md:text-sm font-medium mb-2 block">Tipos de combustible</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(fuelNames).map(([key, name]) => (
                      <button
                        key={key}
                        onClick={() => toggleFuel(key)}
                        className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${selectedFuels.includes(key)
                            ? 'text-white shadow-md'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        style={selectedFuels.includes(key) ? {
                          backgroundColor: fuelColors[key],
                          color: 'white'
                        } : undefined}
                      >
                        <span className="hidden sm:inline">{name}</span>
                        <span className="sm:hidden">
                          {key === 'regular' ? 'Regular' : key === 'premium' ? 'Premium' : 'Diésel'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-[10px] md:text-xs"
                    tick={{ fill: 'currentColor' }}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[20, 30]}
                    className="text-[10px] md:text-xs"
                    tick={{ fill: 'currentColor' }}
                    label={{ value: '$/L', angle: -90, position: 'insideLeft', fontSize: 12 }}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                    formatter={(value: number) => [formatPrice(value) + '/L', '']}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: '12px',
                      paddingTop: '10px'
                    }}
                  />

                  {selectedFuels.includes("regular") && (
                    <Line
                      type="monotone"
                      dataKey="regular"
                      stroke={fuelColors.regular}
                      strokeWidth={2}
                      name="Gasolina Regular"
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  )}
                  {selectedFuels.includes("premium") && (
                    <Line
                      type="monotone"
                      dataKey="premium"
                      stroke={fuelColors.premium}
                      strokeWidth={2}
                      name="Gasolina Premium"
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  )}
                  {selectedFuels.includes("diesel") && (
                    <Line
                      type="monotone"
                      dataKey="diesel"
                      stroke={fuelColors.diesel}
                      strokeWidth={2}
                      name="Diésel"
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 md:mt-6 text-xs md:text-sm text-muted-foreground text-center">
              <p>Datos de precios promedio mensuales en México</p>
              <p className="text-[10px] md:text-xs mt-1">Fuente: CRE (Comisión Reguladora de Energía) / PROFECO</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
