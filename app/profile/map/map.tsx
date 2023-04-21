import { districts as knownDistrictsWithCoords } from "./districts";
import { CSSProperties } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type DistrictMapProps = {
  style?: CSSProperties;
  stats: Record<string, number>;
};

const DistrictMap = ({ style, stats }: DistrictMapProps) => {
  const pins = Object.entries(stats)
    .filter(([name]) => !!knownDistrictsWithCoords[name])
    .map(([name, count]) => ({
      name,
      count,
      coords: knownDistrictsWithCoords[name],
    }));
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossOrigin=""
      />
      <MapContainer center={[49.8, 15.5]} zoom={7} style={style}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map(({ name, count, coords }) => (
          <Marker key={name} position={coords as any}>
            <Popup>
              okres {name}: {count}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
