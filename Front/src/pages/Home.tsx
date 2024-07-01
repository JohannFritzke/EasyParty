import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { Sidebar } from "../components/Sidebar/side-bar";
import { Search } from "../components/search/search";
import { AddParty } from "../components/add-party/add-party";
import iconUrl from '../img/1.ico';

export function Home() {
  const mapRef = useRef<L.Map | null>(null);
  const [showAddParty, setShowAddParty] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [markers, setMarkers] = useState<{ marker: L.Marker, info: any }[]>([]); // Adicionando info para armazenar informações do evento

  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32], // Ajuste o tamanho do ícone conforme necessário
    iconAnchor: [16, 32], // Âncora do ícone, o ponto onde o ícone é "ancorado" no mapa
    popupAnchor: [0, -32], // Âncora do popup em relação ao ícone
  });

  useEffect(() => {
    if (!mapRef.current) {
      const mymap = L.map("map", { zoomControl: false }).setView(
        [-26.9212, -49.0395],
        12
      );
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(mymap);

      mymap.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition(L.latLng(lat, lng));
        setShowAddParty(true);
      });

      mapRef.current = mymap;
    }
  }, []);

  const handleAddEvent = (eventInfo) => {
    if (mapRef.current && markerPosition) {
      const marker = L.marker(markerPosition, { icon: customIcon }).addTo(mapRef.current);

      // Adiciona o listener de clique para mostrar as informações do evento
      marker.on('click', () => {
        const popupContent = `
          <div>
            <h3>${eventInfo.nomeDoEvento}</h3>
            <p>Data: ${eventInfo.dataDoEvento}</p>
            <p>CEP: ${eventInfo.cep}</p>
            <p>Rua: ${eventInfo.street}</p>
            <p>Bairro: ${eventInfo.neighborhood}</p>
            <p>Cidade: ${eventInfo.city}</p>
            <p>Estado: ${eventInfo.state}</p>
            <p>Número: ${eventInfo.number}</p>
          </div>
        `;
        marker.bindPopup(popupContent).openPopup();
      });

      // Adiciona o listener de clique com o botão direito para remover o marcador
      marker.on('contextmenu', () => {
        mapRef.current?.removeLayer(marker);
        setMarkers((prevMarkers) => prevMarkers.filter((m) => m.marker !== marker));
      });

      setMarkers((prevMarkers) => [...prevMarkers, { marker, info: eventInfo }]);
    }
    setShowAddParty(false);
    setMarkerPosition(null);
  };

  const handleClose = () => {
    setShowAddParty(false);
    setMarkerPosition(null);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex absolute w-full">
        <ModeToggle />
        <Sidebar />
        <Search />
        {showAddParty && markerPosition && (
          <AddParty markerPosition={markerPosition} onClose={handleClose} onAddEvent={handleAddEvent} />
        )}
      </div>
      <div id="map" style={{ height: "100vh" }} className="z-0"></div>
    </ThemeProvider>
  );
}
