import { districts as knownDistrictsWithCoords } from "./districts";
import { CSSProperties } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

type DistrictMapProps = {
  style?: CSSProperties;
  model: string[];
  onClick?: (district: string) => void;
};

const DistrictMap = ({
  style,
  model,
  onClick = () => {},
}: DistrictMapProps) => {
  const pins = model
    .filter((name) => !!knownDistrictsWithCoords[name])
    .map((name) => ({
      name,
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
      <MapContainer
        center={[49.8, 15.5]}
        zoom={7}
        style={style}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map(({ name, coords }) => (
          <Marker
            key={name}
            position={coords as any}
            title={name}
            eventHandlers={{
              click: () => onClick(name),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
