// src/api/ninjaAPI.js

const NINJA_API_KEY = import.meta.env.VITE_NINJA_API_KEY;

export async function searchAirportsByCity(query) {
  if (!NINJA_API_KEY) {
    console.warn("No API key found. Skipping Ninja API fetch.");
    return [];
  }

  const baseUrl = "https://api.api-ninjas.com/v1/airports";
  const url = `${baseUrl}?city=${encodeURIComponent(query)}&limit=7`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      },
    });

    if (!response.ok) {
      console.error("Ninja API error", response.status);
      return [];
    }

    const data = await response.json();

    return data.filter(
      (airport) => airport.city && airport.iata && airport.name
    );
  } catch (error) {
    console.error("Ninja API fetch failed:", error);
    return [];
  }
}
