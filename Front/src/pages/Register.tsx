import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    telephone: "",
    dateOfBirth: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData;

    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.data == "200") {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:");
      alert("Erro ao registrar usuário");
    }
  };

  return (
    <div className="background-login w-full h-screen flex justify-center items-center">
      <div className="w-[500px] flex flex-col h-[550px] text-black border-white bg-white items-center p-8 rounded-lg">
        <h1 className="text-xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
          <div className="flex gap-3 w-full">
            <div>
              <p>First Name</p>
              <Input
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Last Name</p>
              <Input
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div>
              <p>E-mail</p>
              <Input
                name="email"
                type="email"
                placeholder="Enter your e-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Password</p>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2">
              <div>
                <p>Date of birth</p>
                <Input
                  type="date"
                  name="dateOfBirth"  
                  value={formData.dateOfBirth}
                  className="uppercase"
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <p>Gender</p>
                <select
                  name="gender"
                  className="w-full border rounded-md px-3 py-1 h-[36px] input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="masculine">Masculine</option>
                  <option value="feminine">Feminine</option>
                </select>
              </div>
            </div>
            <div>
              <p>Telephone</p>
              <Input
                name="telephone"
                placeholder="Enter your telephone"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="mt-3 bg-easy text-white">
              Save
            </Button>
            <div className="flex gap-2 justify-center">
              <p>Already have an account?</p>
              <Link to="/" className="text-blue-600 underline">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
