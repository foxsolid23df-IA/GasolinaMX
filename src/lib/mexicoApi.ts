// API de la Comisión Reguladora de Energía (CRE) de México
// En desarrollo usamos el proxy de Vite, en producción usamos un CORS proxy
const isDev = import.meta.env.DEV;
const PRICES_API_URL = isDev
    ? '/api/cre/prices'
    : 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://publicacionexterna.azurewebsites.net/publicaciones/prices');
const PLACES_API_URL = isDev
    ? '/api/cre/places'
    : 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://publicacionexterna.azurewebsites.net/publicaciones/places');

export interface MexicoStation {
    id: string;
    name: string;
    creId: string;
    lat: number;
    lng: number;
    regularPrice?: number;
    premiumPrice?: number;
    dieselPrice?: number;
}

interface PlaceData {
    place_id: string;
    name: string;
    cre_id: string;
    x: number; // longitude
    y: number; // latitude
}

interface PriceData {
    place_id: string;
    regular?: number;
    premium?: number;
    diesel?: number;
}

// Parse XML response from CRE API - Places
const parsePlacesXml = (xmlText: string): PlaceData[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const places = xmlDoc.getElementsByTagName('place');
    const result: PlaceData[] = [];

    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const placeId = place.getAttribute('place_id') || '';
        const nameElement = place.getElementsByTagName('name')[0];
        const creIdElement = place.getElementsByTagName('cre_id')[0];
        const locationElement = place.getElementsByTagName('location')[0];

        if (locationElement) {
            const xElement = locationElement.getElementsByTagName('x')[0];
            const yElement = locationElement.getElementsByTagName('y')[0];

            result.push({
                place_id: placeId,
                name: nameElement?.textContent || 'Sin nombre',
                cre_id: creIdElement?.textContent || '',
                x: parseFloat(xElement?.textContent || '0'),
                y: parseFloat(yElement?.textContent || '0'),
            });
        }
    }

    return result;
};

// Parse XML response from CRE API - Prices
const parsePricesXml = (xmlText: string): Map<string, PriceData> => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const places = xmlDoc.getElementsByTagName('place');
    const result = new Map<string, PriceData>();

    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const placeId = place.getAttribute('place_id') || '';
        const gasPrices = place.getElementsByTagName('gas_price');

        // Get existing data or create new
        const existing = result.get(placeId) || { place_id: placeId };

        for (let j = 0; j < gasPrices.length; j++) {
            const gasPrice = gasPrices[j];
            const type = gasPrice.getAttribute('type');
            const price = parseFloat(gasPrice.textContent || '0');

            if (type === 'regular' && price > 0) {
                existing.regular = price;
            } else if (type === 'premium' && price > 0) {
                existing.premium = price;
            } else if (type === 'diesel' && price > 0) {
                existing.diesel = price;
            }
        }

        result.set(placeId, existing);
    }

    return result;
};

// Fetch with retry logic
const fetchWithRetryMx = async (url: string, retries = 3, delay = 1000): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return response;
            }
        } catch (error) {
            console.error(`Fetch attempt ${i + 1} failed:`, error);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error('Failed to fetch after multiple retries');
};

// Main function to fetch all station data
export const fetchMexicoStations = async (): Promise<MexicoStation[]> => {
    try {
        // Fetch both places and prices in parallel
        const [placesResponse, pricesResponse] = await Promise.all([
            fetchWithRetryMx(PLACES_API_URL),
            fetchWithRetryMx(PRICES_API_URL)
        ]);

        const placesXml = await placesResponse.text();
        const pricesXml = await pricesResponse.text();

        const places = parsePlacesXml(placesXml);
        const prices = parsePricesXml(pricesXml);

        // Combine places with prices
        const stations: MexicoStation[] = places
            .filter(place => {
                // Filter out places without valid coordinates
                return place.x !== 0 && place.y !== 0 &&
                    !isNaN(place.x) && !isNaN(place.y);
            })
            .map(place => {
                const priceData = prices.get(place.place_id);
                return {
                    id: place.place_id,
                    name: place.name,
                    creId: place.cre_id,
                    lat: place.y,
                    lng: place.x,
                    regularPrice: priceData?.regular,
                    premiumPrice: priceData?.premium,
                    dieselPrice: priceData?.diesel,
                };
            });

        return stations;
    } catch (error) {
        console.error('Error fetching Mexico stations:', error);
        throw error;
    }
};

// Fuel type mapping for Mexico
export const FUEL_TYPE_MAP_MX: Record<string, keyof MexicoStation> = {
    'regular': 'regularPrice',
    'premium': 'premiumPrice',
    'diesel': 'dieselPrice'
};

// Get fuel type label
export const getFuelLabel = (type: string): string => {
    const labels: Record<string, string> = {
        'regular': 'Gasolina Regular',
        'premium': 'Gasolina Premium',
        'diesel': 'Diésel'
    };
    return labels[type] || type;
};
