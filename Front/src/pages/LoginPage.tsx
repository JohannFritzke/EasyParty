import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../img/logoo-new-png.png";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate(`/${username}`);
      }
    } catch (error) {
      setMessage("Erro ao conectar ao servidor");
    }
  };


  return (
    <div className="background-login w-full h-screen flex justify-center items-center">
      <Card className="w-[768px] flex h-[400px] text-black border-white bg-white">
        <CardContent className="flex flex-col justify-center items-center w-full gap-[20px]">
          <h1 className="font-600 text-3xl">Sign In</h1>
          <div className="flex gap-[10px]">
            <Twitter />
            <Facebook />
            <Instagram />
          </div>
          <p>or use your username/e-mail and password</p>
          <form
            onSubmit={handleLogin}
            className="w-[75%] flex flex-col items-center"
          >
            <Input
              placeholder="Username or e-mail"
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="login-button font-bold text-sm uppercase w-[140px] text-white mt-4"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <p className="cursor underline">Forget Your Password?</p>
          <div className="flex gap-1">
            <p>Dont't have an accunt? </p>
            <Link to="/sing-up" className="text-blue-600 underline">Sing up</Link>
          </div>
          {message && <p>{message}</p>}
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
