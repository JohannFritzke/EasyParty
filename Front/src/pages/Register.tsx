import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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
  const [date, setDate] = React.useState<Date>();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    telephone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      dateOfBirth: date?.toISOString(), // Convertendo a data para string
    };

    try {
      const response = await axios.post("http://localhost:3000/register", data);
      console.log("Usuário registrado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao registrar usuário:");
      alert('Erro ao registrar usuário');
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
              <Input name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <p>Last Name</p>
              <Input name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div>
              <p>E-mail</p>
              <Input name="email" placeholder="Enter your e-mail" value={formData.email} onChange={handleChange} />
            </div>

            <div>
              <p>Password</p>
              <Input name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="flex gap-2">
              <div>
                <p>Date of birth</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full">
                <p>Gender</p>
                <select name="gender" className="w-full border rounded-md px-3 py-1 h-[36px] input" value={formData.gender} onChange={handleChange}>
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
              <Input name="telephone" placeholder="Enter your telephone" value={formData.telephone} onChange={handleChange} />
            </div>
            <Button type="submit" className="mt-3 bg-easy text-white">Save</Button>
            <div className="flex gap-2 justify-center">
              <p>Already have an account?</p>
              <Link to="/" className="text-blue-600 underline">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
