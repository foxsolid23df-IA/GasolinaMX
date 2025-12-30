# GasolinaMX 🇲🇽

[![Deploy to GitHub Pages](https://github.com/foxsolid23df-IA/GasolinaMX/actions/workflows/deploy.yml/badge.svg)](https://github.com/foxsolid23df-IA/GasolinaMX/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Aplicación web para encontrar las gasolineras más baratas cerca de ti en **México**. Compara precios de combustible en tiempo real utilizando datos oficiales de la **Comisión Reguladora de Energía (CRE)**.

🔗 **Demo en vivo:** [https://foxsolid23df-ia.github.io/GasolinaMX/](https://foxsolid23df-ia.github.io/GasolinaMX/)

---

## 🙏 Créditos y Agradecimientos

Este proyecto es un fork adaptado y mejorado para México, basado en el trabajo original de **ComputingVictor**.

- **Proyecto Original:** [Gasolina_Smart](https://github.com/ComputingVictor/Gasolina_Smart) por [ComputingVictor](https://github.com/ComputingVictor)
- **Repositorio Original:** https://github.com/ComputingVictor/Gasolina_Smart

Agradecemos enormemente a ComputingVictor por compartir su código y permitir que la comunidad de código abierto construya sobre él. ❤️

---

## 🇲🇽 Adaptación para México

Se han realizado modificaciones extensas para adaptar la aplicación al contexto mexicano:

### 🔄 Cambios Principales
1.  **Integración API CRE**: Reemplazo de la API de España por la API oficial de la Comisión Reguladora de Energía de México.
2.  **Proxy CORS**: Implementación de proxy y fallback para permitir el consumo de la API gubernamental desde el navegador.
3.  **Moneda y Unidades**: Adaptación de precios a **Pesos Mexicanos (MXN)**.

### ✨ Funcionalidades Nuevas
- **Tipos de Combustible**: Soporte para **Regular (Magna), Premium y Diésel**.
- **Marcas Nacionales**: Inclusión de logos y marcas como **PEMEX, OXXO Gas, G500, Petro-7, Mobil, etc.**
- **Promociones Locales**: Nueva sección con programas de lealtad mexicanos (Spin Premia, BPme, etc.).
- **Consejos de Ahorro**: Sección educativa con tips para ahorrar combustible.
- **Gráficos Históricos**: Datos reales de la evolución de precios en México (2023-2025).

## 📸 Características

- **Búsqueda Inteligente**: Geolocalización y búsqueda por dirección en ciudades mexicanas.
- **Comparación Real**: Precios actualizados al momento.
- **Calculadora de Ahorro**: Algoritmo ajustado al consumo y precios de México.
- **Diseño Responsivo**: Interfaz optimizada para móviles con filtros colapsables.

## 🛠️ Tecnologías

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Leaflet (Mapas)
- Recharts (Gráficos)
- TanStack Query

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/foxsolid23df-IA/GasolinaMX.git
cd GasolinaMX

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ para México 🇲🇽