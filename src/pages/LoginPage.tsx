import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { CircleUserRound , Lock } from "lucide-react";

export function LoginPage() {
  return (
    <div className="flex justify-center items-center h-lvh login-main">
      <Card className="w-72 h-2/3 relative">
        <CardHeader className="flex justify-center items-center cardHeader">
          <img src={logo} alt="" className="w-16" />
          <span className="font underline">EasyParty</span>
        </CardHeader>

        <CardContent className="flex flex-col gap-2.5 justify-center items-center">
          <div className="flex justify-center items-center">
            <CircleUserRound />
            <Input placeholder="Username...." className="w-56" />
          </div>

          <div className="flex justify-center items-center">
            <Lock />
            <Input
              placeholder="Password...."
              className="w-56"
              type="password"
            />
          </div>
          <a href="#" className="text-sm underline">
            Esqueci minha senha
          </a>
        </CardContent>

        <CardFooter className="flex flex-col justify-center items-center">
          <Link to={"userName/"}>
            <Button className="login-button w-48">Entrar</Button>
          </Link>

          <a href="#" className="absolute bottom-1 text-sm underline">
            Não é membro? Cadastre-se aqui
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
