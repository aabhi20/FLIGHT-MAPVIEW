// src/utils/distance.js

export function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Calculate distance in nautical miles between two coordinates using Haversine formula.
 * @param {number} lat1 - Latitude of point 1 (degrees)
 * @param {number} lon1 - Longitude of point 1 (degrees)
 * @param {number} lat2 - Latitude of point 2 (degrees)
 * @param {number} lon2 - Longitude of point 2 (degrees)
 * @returns {number} Distance in nautical miles (nm)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // kilometers
  const earthRadiusNm = 3440.065; // nautical miles

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const radLat1 = degreesToRadians(lat1);
  const radLat2 = degreesToRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceNm = earthRadiusNm * c;

  return Math.round(distanceNm);
}
