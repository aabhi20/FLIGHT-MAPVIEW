import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaPlane } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

// Plane marker using React Icons with dynamic rotation and responsive size
const PlaneMarker = ({ position, angle, sizeVW }) => {
  const planeIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(
      <FaPlane
        style={{
          transform: `rotate(${angle}deg)`,
          width: `${sizeVW}vw`,
          height: `${sizeVW}vw`,
          color: "#5948DB",
        }}
      />
    ),
    className: "",
    iconSize: [sizeVW * 16, sizeVW * 16],
    iconAnchor: [sizeVW * 8, sizeVW * 8],
  });

  return <Marker position={position} icon={planeIcon} />;
};

// Hook to calculate plane size based on screen width
const usePlaneSize = () => {
  const [sizeVW, setSizeVW] = useState(3); // smaller default

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setSizeVW(3); // mobile
      else if (width < 1024) setSizeVW(2.5); // tablet
      else setSizeVW(1.8); // desktop
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return sizeVW;
};

const MapView = ({ from, to }) => {
  if (!from || !to) return null;

  const positions = [
    [from.lat, from.lon],
    [to.lat, to.lon],
  ];

  const [planePos, setPlanePos] = useState(positions[0]);
  const [angle, setAngle] = useState(0);
  const [forward, setForward] = useState(true);

  const planeSizeVW = usePlaneSize();

  useEffect(() => {
    setPlanePos(positions[0]);
    setForward(true);

    let start = null;
    const duration = 5000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const startPos = forward ? positions[0] : positions[1];
      const endPos = forward ? positions[1] : positions[0];

      const lat = startPos[0] + (endPos[0] - startPos[0]) * progress;
      const lon = startPos[1] + (endPos[1] - startPos[1]) * progress;
      setPlanePos([lat, lon]);

      const dy = endPos[0] - startPos[0];
      const dx = endPos[1] - startPos[1];
      const theta = Math.atan2(dy, dx) * (180 / Math.PI);
      setAngle(theta);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setForward(!forward);
        start = null;
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, forward]);

  const center = [(from.lat + to.lat) / 2, (from.lon + to.lon) / 2];

  return (
    <div className="w-full h-[40vw] max-w-[90vw] rounded-[0.8vw] shadow-md overflow-hidden mx-auto">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Source Marker */}
        <Marker position={positions[0]}>
          <Popup>
            {from.city} ({from.iata})<br />
            {from.name}
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={positions[1]}>
          <Popup>
            {to.city} ({to.iata})<br />
            {to.name}
          </Popup>
        </Marker>

        {/* Animated Rotating Plane */}
        <PlaneMarker position={planePos} angle={angle} sizeVW={planeSizeVW} />

        {/* Route Line */}
        <Polyline positions={positions} color="#5948DB" weight={3} />
      </MapContainer>
    </div>
  );
};

export default MapView;
