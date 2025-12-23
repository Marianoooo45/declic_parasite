import { cities, CityData } from "@/data/cities";

function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

/**
 * Returns a list of cities closest to the given city.
 * @param slug - The slug of the reference city
 * @param limit - Max number of results (default 6)
 */
export function getNearbyCities(slug: string, limit: number = 6): CityData[] {
    const currentCity = cities.find((c) => c.slug === slug);
    if (!currentCity) return [];

    const distances = cities
        .filter((c) => c.slug !== slug) // Exclude self
        .map((city) => {
            const dist = getDistanceFromLatLonInKm(
                currentCity.coordinates.lat,
                currentCity.coordinates.lng,
                city.coordinates.lat,
                city.coordinates.lng,
            );
            return { ...city, distance: dist };
        });

    // Sort by distance (asc)
    distances.sort((a, b) => a.distance - b.distance);

    return distances.slice(0, limit);
}
