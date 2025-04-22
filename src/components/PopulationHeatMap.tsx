import { MapContainer, TileLayer, CircleMarker, Tooltip, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

// Dados simplificados das províncias
const provinces = [
  {
    name: 'Luanda',
    population: 6500000,
    density: 347.6,
    coords: [-8.8383, 13.2344],
    color: '#f87171', // Vermelho forte
  },
  {
    name: 'Cuando Cubango',
    population: 600000,
    density: 2.6,
    coords: [-15.5700, 18.1200],
    color: '#60a5fa', // Azul
  },
  {
    name: 'Benguela',
    population: 2300000,
    density: 63.0,
    coords: [-12.5783, 13.4072],
    color: '#fbbf24', // Amarelo
  },
  {
    name: 'Cabinda',
    population: 800000,
    density: 80.0,
    coords: [-5.5500, 12.2000],
    color: '#34d399', // Verde
  },
  // Adicione outras províncias conforme necessário
];

export default function PopulationHeatMap() {
  return (
    <MapContainer center={[-11.2027, 17.8739]} zoom={5} style={{ width: '100%', height: 400, borderRadius: '0.75rem' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="HeatMap Populacional">
          <LayerGroup>
            {provinces.map((prov) => (
              <CircleMarker
                key={prov.name}
                center={prov.coords as LatLngExpression}
                radius={Math.max(10, Math.sqrt(prov.population) / 50)}
                color={prov.color}
                fillColor={prov.color}
                fillOpacity={0.5}
                weight={2}
              >
                <Tooltip direction="top" offset={[0, -2]} opacity={1} permanent>
                  <div>
                    <strong>{prov.name}</strong><br />
                    População: {prov.population.toLocaleString()}<br />
                    Densidade: {prov.density} hab/km²
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Cluster Marker">
          <LayerGroup>
            {provinces.map((prov) => (
              <CircleMarker
                key={prov.name + '-cluster'}
                center={prov.coords as LatLngExpression}
                radius={8}
                color="#1e293b"
                fillColor={prov.color}
                fillOpacity={0.8}
                weight={1}
              >
                <Tooltip direction="top" offset={[0, -2]} opacity={1} permanent>
                  <div>
                    <strong>{prov.name}</strong><br />
                    População: {prov.population.toLocaleString()}<br />
                    Densidade: {prov.density} hab/km²
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
