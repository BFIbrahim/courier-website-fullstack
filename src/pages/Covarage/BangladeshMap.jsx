import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BangladeshMap = ({ warehouse }) => {
  const [search, setSearch] = useState("");
  const [filteredDistrict, setFilteredDistrict] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef();

  const MapController = ({ target }) => {
    const map = useMap();
    useEffect(() => {
      if (target) {
        map.flyTo([target.latitude, target.longitude], 10, {
          duration: 1,
        });
      }
    }, [target, map]);
    return null;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setFilteredDistrict(null);
      setActiveMarker(null);
      return;
    }

    const found = warehouse.find(
      (item) =>
        item.district.toLowerCase() === search.toLowerCase().trim() ||
        item.city.toLowerCase() === search.toLowerCase().trim()
    );

    if (found) {
      setFilteredDistrict(found);
      setActiveMarker(found.district);
    } else {
      alert("District not found. Please try another name.");
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white mt-14 p-12">
      <h1 className="text-4xl font-bold text-secondary mb-8">
        We are available in 64 districts
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex mb-6 border-b border-gray-300 pb-4"
      >
        <input
          type="text"
          placeholder="Search district or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3 md:w-1/2 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 bg-gray-300"
        />
        <button
          type="submit"
          className="bg-primary text-black px-5 py-2 rounded-r-lg hover:bg-secondary hover:text-white hover:cursor-pointer"
        >
          Search
        </button>
      </form>

      <h4 className="text-2xl font-bold text-secondary mt-5 mb-4">
        We deliver almost all over Bangladesh
      </h4>

      <div className="h-[300px] rounded-xl overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {warehouse.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              eventHandlers={{
                add: (marker) => {
                  if (activeMarker === district.district) {
                    setTimeout(() => marker.target.openPopup(), 1500);
                  }
                },
              }}
            >
              <Popup>
                <div>
                  <h2 className="font-semibold text-lg mb-1">
                    {district.district}
                  </h2>
                  <p className="text-sm">
                    <strong>Region:</strong> {district.region}
                  </p>
                  <p className="text-sm">
                    <strong>City:</strong> {district.city}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Covered Areas:</strong>{" "}
                    {district.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapController target={filteredDistrict} />
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
