import { motion } from "framer-motion";
import { Filter, TrendingDown, Clock, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterControlsProps {
  fuelType: string;
  onFuelTypeChange: (value: string) => void;
  radius: string;
  onRadiusChange: (value: string) => void;
  brandFilter: string;
  onBrandFilterChange: (value: string) => void;
  scheduleFilter: string;
  onScheduleFilterChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const FilterControls = ({
  fuelType,
  onFuelTypeChange,
  radius,
  onRadiusChange,
  brandFilter,
  onBrandFilterChange,
  scheduleFilter,
  onScheduleFilterChange,
  sortBy,
  onSortChange,
}: FilterControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 mb-6 md:mb-8"
    >
      {/* Header with toggle for mobile */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <h3 className="text-lg md:text-xl font-bold">Filtros</h3>
        </div>

        {/* Mobile toggle button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Primary filters - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Fuel Type */}
        <div className="space-y-1 md:space-y-2">
          <label className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-1 md:gap-2">
            <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Combustible</span>
            <span className="sm:hidden">Tipo</span>
          </label>
          <Select value={fuelType} onValueChange={onFuelTypeChange}>
            <SelectTrigger className="glass border-white/10 h-10 md:h-12 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Gasolina Regular</SelectItem>
              <SelectItem value="premium">Gasolina Premium</SelectItem>
              <SelectItem value="diesel">Diésel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Radius */}
        <div className="space-y-1 md:space-y-2">
          <label className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-1 md:gap-2">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            Radio
          </label>
          <Select value={radius} onValueChange={onRadiusChange}>
            <SelectTrigger className="glass border-white/10 h-10 md:h-12 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2.5">2.5 km</SelectItem>
              <SelectItem value="5">5 km</SelectItem>
              <SelectItem value="10">10 km</SelectItem>
              <SelectItem value="15">15 km</SelectItem>
              <SelectItem value="20">20 km</SelectItem>
              <SelectItem value="30">30 km</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort - Visible on tablet+ or when expanded */}
        <div className={`space-y-1 md:space-y-2 col-span-2 md:col-span-1 ${!isExpanded ? 'hidden md:block' : ''}`}>
          <label className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-1 md:gap-2">
            <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4" />
            Ordenar por
          </label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="glass border-white/10 h-10 md:h-12 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Precio más bajo</SelectItem>
              <SelectItem value="distance">Distancia</SelectItem>
              <SelectItem value="name">Nombre (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Secondary filters - Collapsible on mobile */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4 ${!isExpanded ? 'hidden md:grid' : ''}`}>
        {/* Brand Filter */}
        <div className="space-y-1 md:space-y-2">
          <label className="text-xs md:text-sm font-medium text-muted-foreground">
            Marca
          </label>
          <Select value={brandFilter} onValueChange={onBrandFilterChange}>
            <SelectTrigger className="glass border-white/10 h-10 md:h-12 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="pemex">PEMEX</SelectItem>
              <SelectItem value="oxxo">OXXO Gas</SelectItem>
              <SelectItem value="mobil">Mobil</SelectItem>
              <SelectItem value="shell">Shell</SelectItem>
              <SelectItem value="bp">BP</SelectItem>
              <SelectItem value="g500">G500</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Filter - Disabled for Mexico API */}
        <div className="space-y-1 md:space-y-2 opacity-50">
          <label className="text-xs md:text-sm font-medium text-muted-foreground">
            Horario
          </label>
          <Select value={scheduleFilter} onValueChange={onScheduleFilterChange} disabled>
            <SelectTrigger className="glass border-white/10 h-10 md:h-12 text-sm">
              <SelectValue placeholder="No disponible" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">No disponible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset button */}
        <div className="flex items-end col-span-2 md:col-span-1">
          <Button
            variant="outline"
            className="w-full h-10 md:h-12 glass border-white/20 hover:bg-white/10 text-sm"
            onClick={() => {
              onFuelTypeChange("regular");
              onRadiusChange("5");
              onBrandFilterChange("all");
              onScheduleFilterChange("all");
              onSortChange("price");
            }}
          >
            Resetear filtros
          </Button>
        </div>
      </div>
    </motion.div>
  );
};