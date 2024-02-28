import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  LogOut,
  Menu,
  MapPin,
  PartyPopper,
  Heart,
  Settings,
} from "lucide-react";

import logo from "../../img/logoo-new-png.png";
import "./side-bar.css";

export function Sidebar() {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const [activeItem, setActiveItem] = useState("mapa");

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const sidebarClass = `sidebar bg-background ${
    isSidebarClosed ? "close" : ""
  }`;

  return (
    <div className={sidebarClass}>
      <div className="side-top">
        <img src={logo} alt="" className="side-img" />
        <span className="font logo-name">EasyParty</span>
        <span className="menu" onClick={toggleSidebar}>
          <Menu />
        </span>
      </div>

      <div className="side-mid font-family">
        <ul>
          <li
            className={activeItem === "mapa" ? "action" : ""}
            onClick={() => handleItemClick("mapa")}
          >
            <MapPin />
            <span>Mapa</span>
          </li>
          <li
            className={activeItem === "partys" ? "action" : ""}
            onClick={() => handleItemClick("partys")}
          >
            <PartyPopper />
            <span>Suas Partys</span>
          </li>
          <li
            className={activeItem === "favoritos" ? "action" : ""}
            onClick={() => handleItemClick("favoritos")}
          >
            <Heart />
            <span>Favoritos</span>
          </li>
          <li
            className={activeItem === "configuracoes" ? "action" : ""}
            onClick={() => handleItemClick("configuracoes")}
          >
            <Settings />
            <span>Configurações</span>
          </li>
        </ul>
      </div>

      <div className="side-bot">
        <Avatar className="avatar">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="user-name">User Name</span>
        <LogOut className="logout" />
      </div>
    </div>
  );
}
