import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { FaPlane } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";

// Fit bounds so both airports are visible
const FitMapBounds = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (from && to) {
      const bounds = L.latLngBounds([from.lat, from.lon], [to.lat, to.lon]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [from, to, map]);

  return null;
};

// Smooth easing
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const MapView = ({ from, to }) => {
  const [planePos, setPlanePos] = useState(null);
  const [angle, setAngle] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    let step = 0;
    const totalSteps = 300;

    intervalRef.current = setInterval(() => {
      step++;
      const t = step / totalSteps;
      const easedT = easeInOutQuad(t);

      const lat = from.lat + (to.lat - from.lat) * easedT;
      const lon = from.lon + (to.lon - from.lon) * easedT;
      setPlanePos([lat, lon]);

      // Direction of movement
      const dx = to.lon - from.lon;
      const dy = to.lat - from.lat;
      setAngle((Math.atan2(dy, dx) * 180) / Math.PI);

      if (step >= totalSteps) clearInterval(intervalRef.current);
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [from, to]);

  // Don't render map until both airports exist
  if (!from || !to) return null;

  const planeIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(
      <FaPlane
        style={{
          transform: `rotate(${angle}deg)`,
          width: "1.6vw",
          height: "1.6vw",
          minWidth: "16px",
          minHeight: "16px",
          color: "#5948DB",
        }}
      />
    ),
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div
      className="
        w-full rounded-[0.6vw] overflow-hidden shadow-md
        h-[55vw] sm:h-[40vw] lg:h-[22vw] xl:h-[18vw]
      "
    >
      <MapContainer
        center={[(from.lat + to.lat) / 2, (from.lon + to.lon) / 2]}
        zoom={4}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMapBounds from={from} to={to} />

        {/* Route line */}
        <Polyline
          positions={[
            [from.lat, from.lon],
            [to.lat, to.lon],
          ]}
          color="#5948DB"
        />

        {/* Plane marker */}
        {planePos && <Marker position={planePos} icon={planeIcon} />}
      </MapContainer>
    </div>
  );
};

export default MapView;
