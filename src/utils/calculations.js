// src/utils/calculations.js

/**
 * Estimate total fuel required for a route based on aircraft specs.
 * Includes a 10% reserve fuel.
 * @param {object} aircraft - Selected aircraft with fuelConsumption gal/nm
 * @param {number} distanceNm - Distance in nautical miles
 * @returns {number} Total fuel required in gallons (rounded)
 */
export function estimateFuelConsumption(aircraft, distanceNm) {
  if (!aircraft || !distanceNm) return null;
  
  // basic fuel burn = distance * fuelConsumption per nm
  const baseFuelBurn = distanceNm * aircraft.fuelConsumption;

  // add 10% reserve fuel
  const totalFuelRequired = baseFuelBurn * 1.1;

  return Math.round(totalFuelRequired);
}
