import React from "react";

const ResultsDisplay = ({ from, to, aircraft, distance, fuel }) => {
  return (
    <div
      className="
        mt-[4vw] p-[3vw] sm:p-[2vw] lg:p-[1.2vw]
        bg-gray-100 rounded-[0.6vw] shadow-md
        text-[3.8vw] sm:text-[2.5vw] lg:text-[1vw]
      "
    >
      <h2 className="font-bold text-[#5948DB] mb-[2vw] text-[4.5vw] sm:text-[3vw] lg:text-[1.3vw]">
        Flight Summary
      </h2>
      <p>
        <strong>From:</strong> {from.city}
      </p>
      <p>
        <strong>To:</strong> {to.city}
      </p>
      <p>
        <strong>Aircraft:</strong> {aircraft.name}
      </p>
      <p>
        <strong>Distance:</strong> {distance.toFixed(2)} km
      </p>
      <p>
        <strong>Estimated Fuel:</strong> {fuel.toFixed(2)} liters
      </p>
    </div>
  );
};

export default ResultsDisplay;
