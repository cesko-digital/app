import { districts } from "./districts";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

const Map = (props: MapContainerProps) => (
  <div>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
      integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
      crossOrigin=""
    />
    <MapContainer {...props}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(districts).map(([name, coords]) => (
        <Marker key={name} position={coords as any}>
          <Popup>okres {name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default Map;
