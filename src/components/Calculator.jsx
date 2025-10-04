import React, { useState } from "react";
import AirportAutocomplete from "./AirportAutocomplete";
import AircraftSelector from "./AircraftSelector";
import { calculateDistance } from "../utils/distance";
import { estimateFuelConsumption } from "../utils/calculations";
import ResultsDisplay from "./ResultsDisplay";
import MapView from "./MapView";

const Calculator = () => {
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fuelRequired, setFuelRequired] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    if (!fromAirport) return setError("Please select a departure airport.");
    if (!toAirport) return setError("Please select a destination airport.");
    if (!selectedAircraft) return setError("Please select an aircraft.");

    const dist = calculateDistance(
      fromAirport.lat,
      fromAirport.lon,
      toAirport.lat,
      toAirport.lon
    );
    setDistance(dist);

    const fuel = estimateFuelConsumption(selectedAircraft, dist);
    setFuelRequired(fuel);
  };

  return (
    <div
      className="
        max-w-[95vw] mx-auto p-[4vw] text-[4vw]
        sm:max-w-[85vw] sm:text-[3vw]
        lg:max-w-[70vw] lg:text-[1.6vw]
        xl:max-w-[60vw] xl:text-[1.2vw]
      "
    >
      <h1
        className="
          font-bold mb-[4vw] text-center text-[6vw]
          sm:text-[4.5vw] lg:text-[2.2vw] xl:text-[1.8vw]
        "
      >
        Aviation Fuel Calculator
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
        className="
          grid grid-cols-1 gap-[3vw] mb-[4vw]
          sm:grid-cols-2 sm:gap-[2.5vw_4vw]
          lg:gap-[2vw_3vw]
        "
      >
        <div className="col-span-1 sm:col-span-2">
          <label className="font-semibold mb-[1vw] block text-[3.5vw] sm:text-[2.5vw] lg:text-[1.2vw] text-[#5948DB]">
            Departure Airport
          </label>
          <AirportAutocomplete
            placeholder="Enter departure city or airport"
            onSelect={setFromAirport}
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="font-semibold mb-[1vw] block text-[3.5vw] sm:text-[2.5vw] lg:text-[1.2vw] text-[#5948DB]">
            Arrival Airport
          </label>
          <AirportAutocomplete
            placeholder="Enter arrival city or airport"
            onSelect={setToAirport}
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <AircraftSelector onSelect={setSelectedAircraft} />
        </div>

        {error && (
          <div className="col-span-1 sm:col-span-2 p-[2.5vw] bg-red-200 rounded-[0.6vw] text-red-800 font-semibold text-[3.5vw] sm:text-[2.2vw] lg:text-[1.1vw]">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="
            col-span-1 sm:col-span-2
            bg-[#5948DB] hover:bg-[#4837b8]
            text-white font-bold uppercase tracking-wider
            rounded-[0.6vw] py-[3.5vw] sm:py-[2.5vw] lg:py-[1.2vw]
            text-[4.5vw] sm:text-[2.8vw] lg:text-[1.2vw]
            cursor-pointer transition-colors
          "
        >
          Calculate
        </button>
      </form>

      {distance !== null &&
        fuelRequired !== null &&
        selectedAircraft &&
        fromAirport &&
        toAirport && (
          <>
            <ResultsDisplay
              from={fromAirport}
              to={toAirport}
              aircraft={selectedAircraft}
              distance={distance}
              fuel={fuelRequired}
            />
            <div className="mt-[4vw] sm:mt-[3vw]">
              <MapView from={fromAirport} to={toAirport} />
            </div>
          </>
        )}
    </div>
  );
};

export default Calculator;
