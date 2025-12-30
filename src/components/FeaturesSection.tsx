import { motion } from "framer-motion";
import featureLocation from "@/assets/feature-location.jpg";
import featurePrice from "@/assets/feature-price.jpg";
import featureFilter from "@/assets/feature-filter.jpg";
import featureRealtime from "@/assets/feature-realtime.jpg";
import featureSecurity from "@/assets/feature-security.jpg";
import featureMobile from "@/assets/feature-mobile.jpg";

const features = [
  {
    image: featureLocation,
    title: "Geolocalización precisa",
    description: "Encuentra las gasolineras más cercanas a tu ubicación actual en segundos",
    color: "from-blue-500 to-cyan-500",
  },
  {
    image: featurePrice,
    title: "Mejor precio garantizado",
    description: "Compara precios en tiempo real y ahorra hasta un 20% en cada tanqueada",
    color: "from-purple-500 to-pink-500",
  },
  {
    image: featureFilter,
    title: "Filtros avanzados",
    description: "Filtra por tipo de combustible, marca y distancia",
    color: "from-orange-500 to-red-500",
  },
  {
    image: featureRealtime,
    title: "Datos en tiempo real",
    description: "Información actualizada directamente desde la CRE",
    color: "from-green-500 to-emerald-500",
  },
  {
    image: featureSecurity,
    title: "100% confiable",
    description: "Datos verificados de la Comisión Reguladora de Energía de México",
    color: "from-indigo-500 to-purple-500",
  },
  {
    image: featureMobile,
    title: "Diseño responsivo",
    description: "Experiencia perfecta en cualquier dispositivo, móvil o escritorio",
    color: "from-pink-500 to-rose-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Todo lo que necesitas
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              en una sola app
            </span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Tecnología avanzada al servicio de tu economía. Simple, rápido y preciso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 h-full hover:bg-white/10 transition-all duration-300 border border-white/10">
                {/* Image with gradient background */}
                <div className="relative mb-4 md:mb-6">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-xl md:rounded-2xl overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className={`absolute inset-0 w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                </div>

                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};