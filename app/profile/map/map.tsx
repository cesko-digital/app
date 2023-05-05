import { districts as knownDistrictsWithCoords } from "./districts";
import { CSSProperties } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

type DistrictMapProps = {
  style?: CSSProperties;
  districts: string[];
  selectedDistrict?: string;
  highlightedDistricts: string[];
  onClick?: (district: string) => void;
};

// https://stackoverflow.com/a/35847937/17279
const makeIcon = (color: string) =>
  new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const ColorIcon = {
  red: makeIcon("red"),
  blue: makeIcon("blue"),
  grey: makeIcon("grey"),
};

const DistrictMap = ({
  style,
  districts,
  selectedDistrict,
  highlightedDistricts,
  onClick = () => {},
}: DistrictMapProps) => {
  // Convert district name list to pins with coords
  const pins = districts
    .filter((name) => !!knownDistrictsWithCoords[name])
    .map((name) => ({
      name,
      coords: knownDistrictsWithCoords[name],
    }));
  // Get appropriate color icon for given district
  const iconForDistrict = (name: string) =>
    name === selectedDistrict
      ? ColorIcon.red
      : highlightedDistricts?.includes(name)
      ? ColorIcon.blue
      : ColorIcon.grey;
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
            icon={iconForDistrict(name)}
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
