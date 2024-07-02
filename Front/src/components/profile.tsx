import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";

export function Profile() {
  const [isHovered, setIsHovered] = useState(false);
  const { userName } = useParams<{ userName: string }>();

  // Function to extract initials from the username
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");
    return initials.toUpperCase();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[10px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between h-[50px]">
          <h1 className="font-bold">Edit Profile</h1>
          <Avatar
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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

        <div className="flex gap-[10px]">
          <div>
            <span>Primeiro nome</span>
            <Input placeholder="Primeiro nome" />
          </div>
          <div>
            <span>Sobrenome</span>
            <Input placeholder="Sobrenome" />
          </div>
        </div>

        <div>
          <span>E-mail</span>
          <Input />
        </div>
        <div>
          <span>Endereço</span>
          <Input />
        </div>

        <div>
          <span>Número de contato</span>
          <Input />
        </div>

        <div className="flex gap-[10px]">
          <div>
            <span>Cidade</span>
            <Input />
          </div>
          <div>
            <span>Estado</span>
            <Input />
          </div>
        </div>
      </div>
      <Button className="w-[140px] bg-easy text-white">Salvar</Button>
    </div>
  );
}
