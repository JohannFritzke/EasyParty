import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "./ui/button";

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

export function Profile() {
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const userName = userData ? `${userData.firstName}${userData.lastName}` : "";
  const formattedDate = userData
    ? format(new Date(userData.dateOfBirth), "dd/MM/yyyy")
    : "";
  // Function to extract initials from the username
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");
    return initials.toUpperCase();
  };

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:3000/get-user?id=${id}`);
    setUserData(response.data[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="font-bold">Your Profile</h1>
      <div className="content flex gap-14 w-ful">
        <div className="img-user">
          <Avatar
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-[152px] h-[152px] rounded-lg"
          >
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 text-white cursor-pointer">
                <Pencil />
              </div>
            )}
            <AvatarImage src={`https://github.com/${userName}.png`} />
            <AvatarFallback className="flex items-center justify-center w-full bg-gray-300">
              {getInitials(userName ? getInitials(userName) : "")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 capitalize">
            <span className="font-bold">Name:</span>
            <span>{`${userData?.firstName} ${userData?.lastName}`}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Date Birth:</span>
            <span>{formattedDate}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Email:</span>
            <span>{userData?.email}</span>
          </div>

          <div className="flex gap-1 capitalize">
            <span className="font-bold">Gender:</span>
            <span>{userData?.gender}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Telephone:</span>
            <span>{userData?.telephone}</span>
          </div>
        </div>
      </div>
      <Button className="bg-easy w-[120px] mt-6 text-white">Save</Button>
    </div>
  );
}
