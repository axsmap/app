/**
 * Distance Calculation Utilities
 * 
 * Provides functions to calculate distances between geographic coordinates
 * using the Haversine formula for accurate great-circle distance calculation.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate the distance between two geographic points using the Haversine formula.
 * 
 * The Haversine formula determines the great-circle distance between two points
 * on a sphere given their longitudes and latitudes.
 * 
 * @param point1 - First coordinate {lat, lng}
 * @param point2 - Second coordinate {lat, lng}
 * @param unit - 'km' for kilometers, 'mi' for miles (default: 'mi')
 * @returns Distance in the specified unit
 */
export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates,
  unit: 'km' | 'mi' = 'mi'
): number {
  const R = unit === 'km' ? 6371 : 3959; // Earth's radius in km or miles
  
  const lat1Rad = toRadians(point1.lat);
  const lat2Rad = toRadians(point2.lat);
  const deltaLat = toRadians(point2.lat - point1.lat);
  const deltaLng = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance with appropriate unit
 * 
 * For distances less than 1 mile/km, shows in feet/meters.
 * For longer distances, shows in miles/km with appropriate decimal places.
 * 
 * @param distance - Distance in miles or kilometers
 * @param unit - 'km' for kilometers, 'mi' for miles (default: 'mi')
 * @returns Formatted distance string (e.g., "0.5 mi", "1,234 ft", "2.3 km")
 */
export function formatDistance(distance: number, unit: 'km' | 'mi' = 'mi'): string {
  if (distance < 0.1) {
    // Convert to feet or meters for very short distances
    if (unit === 'mi') {
      const feet = Math.round(distance * 5280);
      return `${feet.toLocaleString()} ft`;
    } else {
      const meters = Math.round(distance * 1000);
      return `${meters.toLocaleString()} m`;
    }
  } else if (distance < 10) {
    // Show one decimal place for distances under 10
    return `${distance.toFixed(1)} ${unit}`;
  } else {
    // Round to nearest integer for longer distances
    return `${Math.round(distance).toLocaleString()} ${unit}`;
  }
}

/**
 * Calculate and format distance between two points
 * 
 * Convenience function that combines calculateDistance and formatDistance
 * 
 * @param point1 - First coordinate {lat, lng}
 * @param point2 - Second coordinate {lat, lng}
 * @param unit - 'km' for kilometers, 'mi' for miles (default: 'mi')
 * @returns Formatted distance string
 */
export function getFormattedDistance(
  point1: Coordinates,
  point2: Coordinates,
  unit: 'km' | 'mi' = 'mi'
): string {
  const distance = calculateDistance(point1, point2, unit);
  return formatDistance(distance, unit);
}

/**
 * Sort venues by distance from a reference point
 * 
 * @param venues - Array of objects with location property
 * @param userLocation - Reference point {lat, lng}
 * @returns Sorted array with closest venues first
 */
export function sortByDistance<T extends { location: { lat: number; lng: number } }>(
  venues: T[],
  userLocation: Coordinates
): T[] {
  return [...venues].sort((a, b) => {
    const distanceA = calculateDistance(userLocation, a.location);
    const distanceB = calculateDistance(userLocation, b.location);
    return distanceA - distanceB;
  });
}
