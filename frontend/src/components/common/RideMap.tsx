import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

interface RideMapProps {
  pickup?: [number, number]
  destination?: [number, number]
  height?: string
}

const pickupIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#006EB6;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,.25);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const destinationIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#F9BFCB;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,.25);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function MapController({
  pickup,
  destination,
}: {
  pickup?: [number, number]
  destination?: [number, number]
}) {
  const map = useMap()

  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds([pickup, destination])
      map.fitBounds(bounds, {
        padding: [40, 40],
      })
    }
  }, [map, pickup, destination])

  return null
}

export default function RideMap({
  pickup = [-1.9441, 30.0619],
  destination = [-1.9706, 30.1044],
  height = '420px',
}: RideMapProps) {
  return (
    <div
      className="overflow-hidden rounded-[28px]"
      style={{ height }}
    >
      <MapContainer
        center={pickup}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={pickup} icon={pickupIcon} />

        <Marker
          position={destination}
          icon={destinationIcon}
        />

        <Polyline
          positions={[pickup, destination]}
          pathOptions={{
            color: '#006EB6',
            weight: 5,
          }}
        />

        <MapController
          pickup={pickup}
          destination={destination}
        />
      </MapContainer>
    </div>
  )
}