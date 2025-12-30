import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FuelPriceHistoryChart } from "@/components/FuelPriceHistoryChart";

const Landing = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    navigate('/app');
  };

  const handleViewHistory = () => {
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewPromotions = () => {
    navigate('/promociones');
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        onGetStarted={handleGetStarted}
        onViewHistory={handleViewHistory}
        onViewPromotions={handleViewPromotions}
      />
      <FeaturesSection />
      <div ref={chartRef}>
        <FuelPriceHistoryChart />
      </div>

      <footer className="py-8 md:py-12 text-center text-muted-foreground border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="mb-2 text-sm md:text-base">Datos de la Comisión Reguladora de Energía (CRE)</p>
          <p className="text-xs md:text-sm mb-2">© 2025 GasolinaMX. Precios actualizados en tiempo real.</p>
          <p className="text-xs md:text-sm">
            Desarrollado con ❤️ para México
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
