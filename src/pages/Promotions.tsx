import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";
import { PromotionsSection } from "@/components/PromotionsSection";
import { useState } from "react";

const Promotions = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

                    {/* Mobile menu button (placeholder functionality for consistency) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden opacity-0 pointer-events-none" // Hidden but keeps spacing
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    {/* Desktop spacer */}
                    <div className="hidden md:block w-32" />
                </div>
            </header>

            {/* Main content with padding for fixed header */}
            <div className="pt-16 md:pt-20">
                <PromotionsSection />
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

export default Promotions;
