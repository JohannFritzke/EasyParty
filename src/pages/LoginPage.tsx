import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "../img/logoo-new-png.png";
import { Instagram, Facebook, Twitter } from "lucide-react";
export function LoginPage() {
  return (
    <div className="background-login w-full h-screen flex justify-center items-center">
      <Card className="w-[768px] flex h-[400px] text-black border-white bg-white">
        <CardContent className="flex flex-col justify-center items-center	w-full gap-[20px]">
          <h1 className="font-600 text-3xl">Sign In</h1>
          <div className="flex gap-[10px]">
            <Twitter />
            <Facebook />
            <Instagram />
          </div>
          <p>or use your username/e-mail and password</p>
          <Input placeholder="Username or e-mail" className="w-[75%]" />
          <Input placeholder="Password" type="password" className="w-[75%]" />
          <p className="cursor underline">Forget Your Password?</p>
          <Link to="/username/">
            <Button className="login-button font-bold text-sm uppercase w-[140px] text-white">
              Sing In
            </Button>
          </Link>
        </CardContent>
        <CardContent className="text-white bg-easy w-full rounded-r-xl rounded-l-[100px] flex flex-col items-center gap-[30px]">
          <img src={logo} alt="" className="w-[40%] mt-[30px]" />
          <h1 className="font-bold text-2xl">Welcome to EasyParty!!!</h1>
          <p className="text-xl underline">With EasyParty it's easy</p>
        </CardContent>
      </Card>
    </div>
  );
}
