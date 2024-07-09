import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Profile } from "../profile";
import logo from "../../img/logoo-new-png.png";
import "./side-bar.css";
import { Link, useParams } from "react-router-dom";
import {
  LogOut,
  Menu,
  HandHeart,
  PartyPopper,
  Star,
  Settings,
} from "lucide-react";
import { EventLister } from "../event-lister";

export function Sidebar() {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const { userName } = useParams<{ userName: string }>();

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");
    return initials.toUpperCase();
  };

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const sidebarClass = `sidebar bg-background ${
    isSidebarClosed ? "close" : "open"
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
          <Dialog>
            <DialogTrigger>
              <li>
                <HandHeart />
                <span>Para você</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <PartyPopper />
                <span>Suas Festas</span>
              </li>
            </DialogTrigger>
            <DialogContent className="max-w-[55%]">
              <EventLister/>
            </DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <Star />
                <span>Favoritos</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <Settings />
                <span>Configurações</span>
              </li>
            </DialogTrigger>
            <DialogContent>
              <Profile />
            </DialogContent>
          </Dialog>
        </ul>
      </div>

      <div className="side-bot">
        <Avatar className="">
          <AvatarImage
            src={`https://github.com/${userName}.png`}
            className=""
          />
          <AvatarFallback className="bg-gray-300">
            {getInitials(userName ? getInitials(userName) : "")}
          </AvatarFallback>
        </Avatar>
        <span className="user-name font-family">{userName}</span>
        <Link to="/">
          <span className="cursor-pointer">
            <LogOut className="logout" />
          </span>
        </Link>
      </div>
    </div>
  );
}
