import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, CreditCard, Gift, TrendingDown, Star, Zap, Car, Leaf, Gauge } from "lucide-react";
import { motion } from "framer-motion";

interface Promotion {
    brand: string;
    color: string;
    mainDiscount: string;
    description: string;
    highlights: string[];
    cardType: string;
    icon: React.ReactNode;
    category: "loyalty" | "bank" | "app";
}

const promotions: Promotion[] = [
    {
        brand: "OXXO GAS / Spin Premia",
        color: "from-red-500 to-yellow-500",
        mainDiscount: "Puntos dobles",
        description: "Acumula puntos Spin Premia en cada carga y canjéalos en OXXO.",
        highlights: [
            "1 punto por cada litro de gasolina",
            "Puntos dobles en días específicos",
            "Canje por productos en tiendas OXXO",
            "Promociones exclusivas en la app",
            "Válido en más de 500 estaciones"
        ],
        cardType: "Tarjeta Spin o App Smartphone",
        icon: <Star className="w-5 h-5" />,
        category: "loyalty"
    },
    {
        brand: "BPme Rewards",
        color: "from-green-500 to-yellow-400",
        mainDiscount: "Puntos canjeables",
        description: "Programa de lealtad global de BP adaptado a México.",
        highlights: [
            "Acumula puntos por cada litro cargado",
            "Canje directo por combustible",
            "Pago rápido desde la App BPme",
            "Facturación automática integrada",
            "Descuentos en tienda Wild Bean Cafe"
        ],
        cardType: "App BPme",
        icon: <Zap className="w-5 h-5" />,
        category: "app"
    },
    {
        brand: "Shell ClubSmart",
        color: "from-yellow-400 to-red-500",
        mainDiscount: "Recompensas exclusivas",
        description: "Uno de los programas más grandes a nivel mundial.",
        highlights: [
            "Puntos por cada compra de combustible",
            "Catálogo de recompensas variadas",
            "Experiencias exclusivas Ferrari",
            "Descuentos en lubricantes Shell Helix",
            "Promociones de temporada"
        ],
        cardType: "Tarjeta ClubSmart / App",
        icon: <Gift className="w-5 h-5" />,
        category: "loyalty"
    },
    {
        brand: "G500 / G500 Network",
        color: "from-blue-600 to-blue-400",
        mainDiscount: "Facturación + Promo",
        description: "Red mexicana con enfoque en servicio y tecnología.",
        highlights: [
            "Plataforma de facturación G500",
            "Alianzas con flotilleras (Edenred, Sodexo)",
            "Combustible G-Super / G-Premium aditivado",
            "Promociones locales por estación",
            "Soporte directo en App"
        ],
        cardType: "App G500 / Monederos",
        icon: <CreditCard className="w-5 h-5" />,
        category: "loyalty"
    },
    {
        brand: "TotalEnergies / Club",
        color: "from-red-600 to-blue-700",
        mainDiscount: "Descuentos directos",
        description: "Calidad internacional con beneficios locales.",
        highlights: [
            "Promociones 'Rasca y Gana' frecuentes",
            "Sorteos de autos y viajes",
            "Servicio de cambio de aceite Quartz",
            "Tiendas Bonjour con combos",
            "Combustible Excellium aditivado"
        ],
        cardType: "App TotalEnergies",
        icon: <TrendingDown className="w-5 h-5" />,
        category: "app"
    },
    {
        brand: "Promociones Bancarias",
        color: "from-indigo-600 to-purple-600",
        mainDiscount: "Cashback / MSI",
        description: "Beneficios al pagar con tarjetas de crédito participantes.",
        highlights: [
            "BBVA: Puntos dobles en gasolina",
            "Citibanamex: Promos estacionales a MSI",
            "Santander: Cashback con tarjeta LikeU",
            "American Express: Bonificaciones anuales",
            "Vales de gasolina (Sodexo, Edenred)"
        ],
        cardType: "Tarjetas de Crédito / Vales",
        icon: <Percent className="w-5 h-5" />,
        category: "bank"
    }
];

const categoryTitles = {
    loyalty: "Programas de Lealtad",
    app: "Apps Móviles",
    bank: "Beneficios Bancarios"
};

const savingTips = [
    {
        title: "Presión de Llantas",
        description: "Mantener la presión correcta puede mejorar el rendimiento hasta un 3%.",
        icon: <Gauge className="w-6 h-6 text-blue-500" />
    },
    {
        title: "Velocidad Constante",
        description: "Evita acelerones y frenadas bruscas. El manejo suave ahorra hasta un 20%.",
        icon: <Gauge className="w-6 h-6 text-green-500" />
    },
    {
        title: "Aire Acondicionado",
        description: "A bajas velocidades, baja las ventanas. En carretera, usa el A/C para reducir resistencia.",
        icon: <Leaf className="w-6 h-6 text-teal-500" />
    },
    {
        title: "Carga Innecesaria",
        description: "Cada 50kg extra de peso incrementa el consumo en un 2% aproximadamente.",
        icon: <Car className="w-6 h-6 text-orange-500" />
    }
];

export const PromotionsSection = () => {
    const groupedPromotions = {
        loyalty: promotions.filter(p => p.category === "loyalty"),
        app: promotions.filter(p => p.category === "app"),
        bank: promotions.filter(p => p.category === "bank")
    };

    return (
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <Badge className="mb-4" variant="outline">
                        <Gift className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Ahorro Inteligente
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Maximiza tus{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Beneficios
                        </span>
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                        Aprovecha los programas de recompensas de las gasolineras en México y sigue nuestros consejos.
                    </p>
                </motion.div>

                {/* Promotions Grid */}
                {Object.entries(groupedPromotions).map(([category, promos]) => (
                    <div key={category} className="mb-12">
                        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                            {category === 'loyalty' && <Star className="w-5 h-5 text-yellow-500" />}
                            {category === 'app' && <Zap className="w-5 h-5 text-blue-500" />}
                            {category === 'bank' && <CreditCard className="w-5 h-5 text-purple-500" />}
                            {categoryTitles[category as keyof typeof categoryTitles]}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {promos.map((promo, index) => (
                                <motion.div
                                    key={promo.brand}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className={`bg-gradient-to-r ${promo.color} p-2 md:p-3 rounded-lg text-white`}>
                                                    {promo.icon}
                                                </div>
                                                <Badge variant="secondary" className="text-xs md:text-sm font-bold truncate max-w-[50%]">
                                                    {promo.mainDiscount}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg md:text-xl">{promo.brand}</CardTitle>
                                            <CardDescription className="text-xs md:text-sm line-clamp-2">
                                                {promo.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                {promo.highlights.map((highlight, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${promo.color} flex-shrink-0`} />
                                                        <span className="text-muted-foreground">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-4 border-t border-border">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                                                    <span className="font-medium truncate">{promo.cardType}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Separator */}
                <div className="my-16 border-t border-white/10" />

                {/* Saving Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Consejos para Ahorrar Gasolina</h2>
                        <p className="text-muted-foreground">Pequeños cambios en tus hábitos pueden hacer una gran diferencia.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {savingTips.map((tip, index) => (
                            <Card key={index} className="glass border-white/10 hover:bg-white/5 transition-colors">
                                <CardHeader>
                                    <div className="mb-4 p-3 bg-background/50 rounded-full w-fit mx-auto">
                                        {tip.icon}
                                    </div>
                                    <CardTitle className="text-center text-lg">{tip.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-center text-muted-foreground">{tip.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-16 text-center text-xs md:text-sm text-muted-foreground">
                    <p>Información de programas vigente a 2025. Consulta términos y condiciones directamente con cada proveedor.</p>
                </div>
            </div>
        </section>
    );
};
