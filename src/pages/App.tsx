import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchSection } from "@/components/SearchSection";
import { FilterControls } from "@/components/FilterControls";
import { MapComponent } from "@/components/MapComponent";
import { StationsList } from "@/components/StationsList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { fetchMexicoStations, MexicoStation, FUEL_TYPE_MAP_MX } from "@/lib/mexicoApi";
import { extractBrandName } from "@/lib/brandLogosMx";

const GEOCODING_API = 'https://nominatim.openstreetmap.org/search';

interface Station {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  distance?: number;
  schedule?: string;
  brand?: string;
}

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [allStations, setAllStations] = useState<MexicoStation[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filters
  const [fuelType, setFuelType] = useState("regular");
  const [radius, setRadius] = useState("5");
  const [brandFilter, setBrandFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price");

  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchStationsData = async (): Promise<MexicoStation[]> => {
    try {
      const data = await fetchMexicoStations();
      return data;
    } catch (error) {
      console.error("Error fetching stations:", error);
      toast.error("Error al cargar los datos de gasolineras. Reintentando...");

      // Retry after 2 seconds
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const data = await fetchMexicoStations();
        toast.success("Datos cargados correctamente");
        return data;
      } catch (retryError) {
        toast.error("No se pudieron cargar las gasolineras. Por favor, recarga la página.");
        return [];
      }
    }
  };

  const processStations = (rawStations: MexicoStation[], location: [number, number]) => {
    const fuelField = FUEL_TYPE_MAP_MX[fuelType];
    const maxRadius = parseFloat(radius);

    const processed = rawStations
      .map((station: MexicoStation) => {
        const price = station[fuelField] as number | undefined;
        const distance = calculateDistance(location[0], location[1], station.lat, station.lng);
        const brandName = extractBrandName(station.name);

        return {
          id: station.id,
          name: brandName,
          address: station.name, // Full name as address since we don't have address data
          lat: station.lat,
          lng: station.lng,
          price: price || 999999,
          distance,
          schedule: '', // CRE API doesn't provide schedule info
          brand: brandName.toLowerCase(),
        };
      })
      .filter((station: Station) => {
        // Filter stations with valid prices and within radius
        if (station.price >= 999999 || station.distance === undefined || station.distance > maxRadius) {
          return false;
        }
        return true;
      });

    // Apply filters
    let filtered = processed;

    if (brandFilter !== 'all') {
      filtered = filtered.filter((s: Station) => s.brand?.includes(brandFilter.toLowerCase()));
    }

    // Note: Schedule filter not available for Mexico API
    // if (scheduleFilter === '24h') { ... }

    // Sort
    filtered.sort((a: Station, b: Station) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'distance') return (a.distance || 0) - (b.distance || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      toast.error('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(location);

        const data = await fetchStationsData();
        setAllStations(data);

        const processed = processStations(data, location);
        setStations(processed);

        setIsLoading(false);
        toast.success(`${processed.length} gasolineras encontradas`);
        scrollToResults();
      },
      (error) => {
        setIsLoading(false);
        toast.error('No se pudo obtener tu ubicación');
      }
    );
  };

  const handleSearch = async (address: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${GEOCODING_API}?q=${encodeURIComponent(address)},México&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length === 0) {
        toast.error('No se encontró la ubicación');
        setIsLoading(false);
        return;
      }

      const location: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      setUserLocation(location);

      const stationsData = await fetchStationsData();
      setAllStations(stationsData);

      const processed = processStations(stationsData, location);
      setStations(processed);

      setIsLoading(false);
      toast.success(`${processed.length} gasolineras encontradas`);
      scrollToResults();
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al buscar la ubicación');
    }
  };

  const handleNavigate = (station: Station) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`,
      '_blank'
    );
  };

  // Reprocess when filters change
  useEffect(() => {
    if (userLocation && allStations.length > 0) {
      const processed = processStations(allStations, userLocation);
      setStations(processed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelType, radius, brandFilter, scheduleFilter, sortBy, userLocation, allStations]);

  return (
    <div className="min-h-screen">
      {/* Header - Mobile Responsive */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver al inicio</span>
            <span className="sm:hidden">Inicio</span>
          </Button>

          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GasolinaMX
          </h1>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Desktop spacer */}
          <div className="hidden md:block w-32" />
        </div>
      </header>

      {/* Main content with padding for fixed header */}
      <div className="pt-16 md:pt-20">
        <SearchSection
          onGeolocate={handleGeolocate}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {userLocation && stations.length > 0 && (
          <div ref={resultsRef} className="container mx-auto px-3 md:px-4 py-8 md:py-20">
            <FilterControls
              fuelType={fuelType}
              onFuelTypeChange={setFuelType}
              radius={radius}
              onRadiusChange={setRadius}
              brandFilter={brandFilter}
              onBrandFilterChange={setBrandFilter}
              scheduleFilter={scheduleFilter}
              onScheduleFilterChange={setScheduleFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Responsive grid - Stack on mobile, side by side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-12">
              {/* Map - Full width on mobile, show first on mobile */}
              <div className="order-1 lg:order-1 h-[300px] md:h-[500px] lg:h-auto">
                <MapComponent
                  stations={stations}
                  center={userLocation}
                  zoom={13}
                  radius={parseFloat(radius)}
                />
              </div>

              {/* Stations list - Scrollable on all devices */}
              <div className="order-2 lg:order-2 max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 md:pr-2 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <StationsList
                  stations={stations}
                  onNavigate={handleNavigate}
                />
              </div>
            </div>
          </div>
        )}
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

export default App;
