import { useState, useEffect } from "react";
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
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  password: string;
  telephone: string;
  tipo: string;
}

export function Sidebar() {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const userName = userData ? `${userData.firstName}${userData.lastName}` : "";
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

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:3000/get-user?id=${id}`);
    setUserData(response.data[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={sidebarClass}>
      <div className="side-top">
        <img src={logo} alt="" className="side-img" />
        <span className="font logo-name gradient-text">EasyParty</span>
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
            <DialogContent className="max-w-[55%]">
              <EventLister />
            </DialogContent>
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
            <DialogContent className="h-[300px]">
              <Profile />
            </DialogContent>
          </Dialog>
        </ul>
      </div>

      <div className="side-bot">
        <Avatar className="rounded-full">
          <AvatarImage
            src={`https://github.com/${userName}.png`}
            className=""
          />
          <AvatarFallback className="bg-gray-300">
            {getInitials(userName ? getInitials(userName) : "")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center user-info">
          <div className="flex gap-1 capitalize text-white font-bold">
            <span>{userData?.firstName}</span>
            <span>{userData?.lastName}</span>
          </div>
          <span className="text-[10px] text-white">{userData?.email}</span>
        </div>
        <div className="logout">
          <Link to="/" className="flex gap-1 text-white ">
            <span className="cursor-pointe font-bold">Log out</span>
            <LogOut />
          </Link>
        </div>
      </div>
    </div>
  );
}
