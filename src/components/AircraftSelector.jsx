import React from "react";
import aircraftData from "../data/aircrafts";

const AircraftSelector = ({ onSelect }) => {
  return (
    <select
      onChange={(e) => onSelect(aircraftData[e.target.value])}
      className="
        w-full border border-gray-300
        rounded-[0.6vw] px-[3vw] py-[3vw]
        sm:px-[2vw] sm:py-[2vw]
        lg:px-[1vw] lg:py-[0.8vw]
        text-[4vw] sm:text-[2.8vw] lg:text-[1.1vw]
        focus:outline-none focus:ring-2 focus:ring-[#5948DB]
      "
    >
      <option value="">Select an aircraft</option>
      {Object.keys(aircraftData).map((key) => (
        <option key={key} value={key}>
          {aircraftData[key].name}
        </option>
      ))}
    </select>
  );
};

export default AircraftSelector;
