import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { Sidebar } from "../components/Sidebar/side-bar";
import { Search } from "../components/search/search";
import { AddParty } from "../components/add-party/add-party";
import iconUrl from "../img/1.ico";
import axios from "axios";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface EventInfo {
  nomeDoEvento: string;
  dataDoEvento: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  lat: number;
  lng: number;
}

export function Home() {
  const mapRef = useRef<L.Map | any>(null);
  const [showAddParty, setShowAddParty] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
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

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-events");
      const events: EventInfo[] = response.data;

      if (mapRef.current) {
        events.forEach((event: EventInfo) => {
          const marker = L.marker([event.lat, event.lng], {
            icon: customIcon,
          });
          const formattedDate = format(
            new Date(event.dataDoEvento),
            "dd/MM/yyyy HH:mm"
          );
          const popupContent = `
            <div>
              <h3>${event.nomeDoEvento}</h3>
              <p>Data: ${formattedDate}</p>
              <p>CEP: ${event.cep}</p>
              <p>Rua: ${event.street}</p>
              <p>Bairro: ${event.neighborhood}</p>
              <p>Cidade: ${event.city}</p>
              <p>Estado: ${event.state}</p>
              <p>Número: ${event.number}</p>
            </div>
          `;
          marker.bindPopup(popupContent);
          marker.addTo(mapRef.current);
        });
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClose = () => {
    setShowAddParty(false);
    setMarkerPosition(null);
  };

  const handleAddEvent = async (eventAdded: boolean) => {
    if (eventAdded) {
      await fetchEvents();
      setShowSuccessToast(true);
      setTimeout(() => {
        toast.success("Evento adicionado com sucesso!");
      }, 100);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000); // Aguarda um pequeno atraso para a atualização do estado ser refletida
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex absolute w-full">
        <ModeToggle />
        <Sidebar />
        <Search />
        {showAddParty && markerPosition && (
          <AddParty onClose={handleClose} onAddEvent={handleAddEvent} />
        )}
      </div>
      <div id="map" style={{ height: "100vh" }} className="z-0"></div>

      {showSuccessToast && <ToastContainer autoClose={3000} className="z-50" />}
    </ThemeProvider>
  );
}
