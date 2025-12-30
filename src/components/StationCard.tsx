import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Fuel, Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBrandLogo } from "@/lib/brandLogosMx";
import { SavingsCalculator } from "@/components/SavingsCalculator";

interface StationCardProps {
  station: {
    id: string;
    name: string;
    address: string;
    price: number;
    distance?: number;
    schedule?: string;
    brand?: string;
  };
  index: number;
  onNavigate: () => void;
  allStations?: Array<{
    id: string;
    name: string;
    address: string;
    price: number;
    distance?: number;
    schedule?: string;
    brand?: string;
  }>;
}

export const StationCard = ({ station, index, onNavigate, allStations = [] }: StationCardProps) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const logo = getBrandLogo(station.brand);

  if (import.meta.env.DEV) {
    console.debug('StationCard brand resolve', { brand: station.brand, logo });
  }

  const closestStation = allStations.length > 0
    ? allStations.reduce((prev, current) =>
      (prev.distance || 0) < (current.distance || 0) ? prev : current
    )
    : undefined;

  // Format price in Mexican pesos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="glass rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Main content - Responsive layout */}
        <div className="flex items-start gap-3 md:gap-4">
          {/* Brand logo - Smaller on mobile */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-white flex-shrink-0 shadow-lg">
            <img
              src={logo}
              alt={station.brand || "Gasolinera"}
              className="w-full h-full object-contain p-1"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Station info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl font-bold mb-1 group-hover:text-primary transition-colors truncate">
              {station.name}
            </h3>
            <div className="flex items-start gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{station.address}</span>
            </div>
          </div>

          {/* Price and action - Mobile optimized */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="flex items-center gap-1 md:gap-2 text-xl md:text-3xl font-bold text-primary">
                <Fuel className="w-5 h-5 md:w-7 md:h-7" />
                <span className="whitespace-nowrap">{formatPrice(station.price)}</span>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground">por litro</div>
            </div>
          </div>
        </div>

        {/* Distance and Schedule row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
            {station.distance && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Navigation className="w-3 h-3 md:w-4 md:h-4" />
                <span>{station.distance.toFixed(1)} km</span>
              </div>
            )}
            {station.schedule && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span>{station.schedule}</span>
              </div>
            )}
          </div>

          {/* Navigate button */}
          <Button
            size="sm"
            onClick={onNavigate}
            className="rounded-lg md:rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_15px_hsl(263_70%_60%_/_0.3)] hover:shadow-[0_0_25px_hsl(263_70%_60%_/_0.5)] transition-all text-xs md:text-sm px-3 md:px-4"
          >
            <Navigation className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Cómo llegar</span>
            <span className="sm:hidden">Ir</span>
          </Button>
        </div>

        {/* Calculator Toggle - Collapsible */}
        {allStations.length > 1 && (
          <div className="border-t border-white/10 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-full justify-between hover:bg-white/5 text-xs md:text-sm h-8 md:h-10"
            >
              <span className="flex items-center gap-1 md:gap-2">
                <Calculator className="w-3 h-3 md:w-4 md:h-4" />
                {showCalculator ? "Ocultar" : "Ver"} calculadora
              </span>
              {showCalculator ? (
                <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
              )}
            </Button>

            <AnimatePresence>
              {showCalculator && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 md:pt-4">
                    <SavingsCalculator
                      currentStation={station}
                      closestStation={closestStation}
                      allStations={allStations}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};