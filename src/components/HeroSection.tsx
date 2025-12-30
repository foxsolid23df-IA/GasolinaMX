import { motion } from "framer-motion";
import { MapPin, TrendingDown, Zap, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewHistory?: () => void;
  onViewPromotions?: () => void;
}

export const HeroSection = ({ onGetStarted, onViewHistory, onViewPromotions }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass mb-6 md:mb-8"
          >
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium">Precios en tiempo real</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            Encuentra la
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              gasolina más barata
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Compara precios en tiempo real de miles de gasolineras en México.
            Ahorra en cada repostaje con datos de la CRE.
          </p>

          {/* Responsive button group */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_40px_hsl(263_70%_60%_/_0.6)] hover:shadow-[0_0_60px_hsl(263_70%_60%_/_0.8)] transition-all duration-300"
              onClick={onGetStarted}
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Buscar cerca de mí
            </Button>

            {onViewPromotions && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full glass border-white/20 hover:bg-white/10"
                onClick={onViewPromotions}
              >
                <Gift className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Promociones
              </Button>
            )}

            {onViewHistory && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full glass border-white/20 hover:bg-white/10"
                onClick={onViewHistory}
              >
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Histórico
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats - Responsive grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-3 md:gap-8 mt-12 md:mt-24 max-w-4xl mx-auto px-4"
        >
          {[
            { icon: MapPin, value: "+13.000", label: "Gasolineras" },
            { icon: TrendingDown, value: "20%", label: "Ahorro" },
            { icon: Zap, value: "Tiempo real", label: "Datos" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="glass rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
              <div className="text-lg md:text-3xl font-bold mb-0.5 md:mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - Hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};