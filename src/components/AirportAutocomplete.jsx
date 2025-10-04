import React, { useState } from "react";
import airports from "../data/airports.js";

const AirportAutocomplete = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (airport) => {
    setQuery(`${airport.city} - ${airport.name}`);
    setResults([]);
    onSelect(airport);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full border border-gray-300 
          rounded-[0.6vw] px-[3vw] py-[3vw] 
          sm:px-[2vw] sm:py-[2vw] 
          lg:px-[1vw] lg:py-[0.8vw]
          text-[4vw] sm:text-[2.8vw] lg:text-[1.1vw]
          focus:outline-none focus:ring-2 focus:ring-[#5948DB]
        "
      />
      {results.length > 0 && (
        <ul
          className="
            absolute z-10 bg-white border border-gray-300 
            rounded-[0.6vw] mt-[1vw] max-h-[40vw] overflow-y-auto w-full
            text-[3.8vw] sm:text-[2.5vw] lg:text-[1vw]
          "
        >
          {results.map((airport) => (
            <li
              key={airport.code}
              onClick={() => handleSelect(airport)}
              className="px-[3vw] py-[2vw] sm:px-[2vw] sm:py-[1.2vw] lg:px-[1vw] lg:py-[0.6vw] hover:bg-gray-100 cursor-pointer"
            >
              {airport.city} - {airport.name} ({airport.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportAutocomplete;
