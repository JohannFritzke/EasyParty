import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { Sidebar } from "../components/Sidebar/side-bar";
import { Search } from "../components/search/search";
import { AddParty } from "../components/add-party/add-party";

export function Home() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Verifica se o mapa já foi inicializado
    if (!mapRef.current) {
      // Inicializa o mapa
      const mymap = L.map("map", { zoomControl: false }).setView(
        [-26.9212, -49.0395],
        12
      );
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(mymap);

      // Atualiza a referência do mapa
      mapRef.current = mymap;
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex absolute w-full">
        <ModeToggle />
        <Sidebar />
        <Search />
        <AddParty />
      </div>
      <div id="map" style={{ height: "100vh" }} className="z-0"></div>
    </ThemeProvider>
  );
}
