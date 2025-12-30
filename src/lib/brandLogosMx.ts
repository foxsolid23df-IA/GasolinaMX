import defaultLogo from "@/assets/logos/default.jpg";

interface BrandLogoMap {
  [key: string]: string;
}

// Logos de marcas de gasolineras en México
// Por ahora usamos el logo default, pero se pueden agregar logos específicos más adelante
const brandLogos: BrandLogoMap = {
  // Marcas principales en México
  pemex: defaultLogo,
  'oxxo gas': defaultLogo,
  'mobil': defaultLogo,
  'shell': defaultLogo,
  'bp': defaultLogo,
  'total': defaultLogo,
  'g500': defaultLogo,
  'redco': defaultLogo,
  'arco': defaultLogo,
  'chevron': defaultLogo,
  'texaco': defaultLogo,
  'orsan': defaultLogo,
  'petromax': defaultLogo,
  'hidrosina': defaultLogo,
  
  // Variaciones comunes
  'estacion': defaultLogo,
  'gasolinera': defaultLogo,
  'servicio': defaultLogo,
  
  default: defaultLogo,
};

export const getBrandLogo = (brandName?: string): string => {
  if (!brandName) return defaultLogo;

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/\b(estacion(?:es)?|servicio|s\.?a\.?|de|c\.?v\.?|s\.?\s?de\s?r\.?l\.?)\b/g, ' ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const clean = normalize(brandName);

  for (const [key, logo] of Object.entries(brandLogos)) {
    if (key !== 'default' && clean.includes(key)) {
      return logo;
    }
  }

  return defaultLogo;
};

// Función para extraer un nombre de marca más legible
export const extractBrandName = (fullName: string): string => {
  if (!fullName) return 'Gasolinera';
  
  // Lista de marcas conocidas para detectar
  const knownBrands = ['PEMEX', 'OXXO GAS', 'MOBIL', 'SHELL', 'BP', 'TOTAL', 'G500', 'REDCO', 'ARCO', 'CHEVRON', 'TEXACO', 'ORSAN', 'PETROMAX', 'HIDROSINA'];
  
  const upperName = fullName.toUpperCase();
  
  for (const brand of knownBrands) {
    if (upperName.includes(brand)) {
      return brand;
    }
  }
  
  // Si no hay marca conocida, limpiar y truncar el nombre
  const cleanName = fullName
    .replace(/S\.?A\.?\s*(DE\s*)?C\.?V\.?/gi, '')
    .replace(/S\.?\s*DE\s*R\.?L\.?\s*(DE\s*)?C\.?V\.?/gi, '')
    .replace(/,/g, '')
    .trim();
  
  // Tomar las primeras palabras relevantes
  const words = cleanName.split(' ').filter(w => w.length > 2);
  return words.slice(0, 3).join(' ') || 'Gasolinera';
};
