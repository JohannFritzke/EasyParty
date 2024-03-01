import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  LogOut,
  Menu,
  HandHeart,
  PartyPopper,
  Star,
  Settings,
  Hand,
} from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import logo from "../../img/logoo-new-png.png";
import "./side-bar.css";

export function Sidebar() {
  const [isSidebarClosed, setSidebarClosed] = useState(true);

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
                <span>For You</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <PartyPopper />
                <span>Your Parties</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <Star />
                <span>Favorites</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>

          <hr className="divider" />

          <Dialog>
            <DialogTrigger>
              <li>
                <Settings />
                <span>Settings</span>
              </li>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </ul>
      </div>

      <div className="side-bot">
        <Avatar className="avatar">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="user-name font-family">User Name</span>
        <LogOut className="logout" />
      </div>
    </div>
  );
}
