import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SearchSectionProps {
  onGeolocate: () => void;
  onSearch: (address: string) => void;
  isLoading: boolean;
}

export const SearchSection = ({ onGeolocate, onSearch, isLoading }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Por favor, introduce una ubicación");
      return;
    }
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="buscar" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 border border-white/10">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-center">
              Comienza a ahorrar
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-6 md:mb-8 px-2">
              Busca gasolineras cerca de ti o introduce una ubicación en México
            </p>

            <div className="space-y-3 md:space-y-4">
              {/* Geolocation button */}
              <Button
                size="lg"
                onClick={onGeolocate}
                disabled={isLoading}
                className="w-full text-sm sm:text-base md:text-lg py-4 md:py-6 rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(263_70%_60%_/_0.4)] hover:shadow-[0_0_40px_hsl(263_70%_60%_/_0.6)] transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                    <span className="hidden sm:inline">Buscando gasolineras...</span>
                    <span className="sm:hidden">Buscando...</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="hidden sm:inline">Usar mi ubicación actual</span>
                    <span className="sm:hidden">Mi ubicación</span>
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-3 md:py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 md:px-4 text-xs md:text-sm text-muted-foreground">
                    O busca por dirección
                  </span>
                </div>
              </div>

              {/* Search input */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="CDMX, Guadalajara, Monterrey..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 h-12 md:h-14 px-4 md:px-6 text-sm md:text-lg rounded-xl glass border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  size="lg"
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="h-12 md:h-14 px-6 md:px-8 rounded-xl glass hover:bg-white/10 border border-white/20"
                  variant="outline"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Buscar</span>
                </Button>
              </div>

              {/* Helper text */}
              <p className="text-[10px] md:text-xs text-muted-foreground text-center mt-2">
                Ejemplos: Ciudad de México, Polanco, Monterrey Centro, 44100
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};