import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../img/logo-new.jpg";

export function LoginPage() {
  return (
    <div className="flex justify-center items-center h-lvh login-main">
      <Card className="w-72 h-96 relative">
        <CardHeader className="flex justify-center items-center">
          <img src={logo} alt="" className="w-2/5 rounded-3xl" />
        </CardHeader>

        <CardContent className="flex flex-col gap-2.5 justify-center items-center">
          <div className="flex justify-center items-center">
            <Label>
              <i className="bx bxs-user-circle text-3xl"></i>
            </Label>
            <Input placeholder="Username...." className="w-56" />
          </div>

          <div className="flex justify-center items-center">
            <Label>
              <i className="bx bxs-lock-alt text-3xl"></i>
            </Label>
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
          <Button className="login-button w-48">Entrar</Button>
          <a href="#" className="absolute bottom-1 text-sm underline">
            Não é membro? Cadastre-se aqui
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
