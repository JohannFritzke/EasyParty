import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

export function Profile() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-[10px]">
      <div>
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-[10px]">
          <div>
            <span>First Name</span>
            <Input placeholder="User" />
          </div>
          <div>
            <span>Last Name</span>
            <Input placeholder="Name" />
          </div>
        </div>

        <div>
          <span>E-mail</span>
          <Input />
        </div>
        <div>
          <span>Address</span>
          <Input />
        </div>

        <div>
          <span>Contact Number</span>
          <Input />
        </div>

        <div className="flex gap-[10px]">
          <div>
            <span>City</span>
            <Input />
          </div>
          <div>
            <span>State</span>
            <Input />
          </div>
        </div>
      </div>
      <Button className="w-[140px] bg-easy text-white">Save</Button>
    </div>
  );
}
