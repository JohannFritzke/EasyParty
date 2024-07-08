import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import est from "./estadosBrasil.json";


interface AddPartyProps {
  onClose(): void;
  onAddEvent(eventInfo: any): void;
}
export function AddParty({
  onClose,
  onAddEvent
}: AddPartyProps) {
  const [address, setAddress] = useState({
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setAddress((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress({
            cep,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress((prev) => ({ ...prev, state: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nomeDoEvento = formData.get("nomeDoEvento") as string;
    const dataDoEvento = formData.get("dataDoEvento") as string;
    const fullAddress = `${address.street}, ${address.city},${address.neighborhood}, ${address.state},Brasil`;

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        fullAddress
      )}`
    );
    console.log( `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullAddress
    )}`)

    if(response.data.length >0){
      const eventInfo = {
        nomeDoEvento,
        dataDoEvento,
        cep: address.cep,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        number,
        lat: response.data[0].lat,
        lng: response.data[0].lon,
      };
  
      try {
        const response = await axios.post(
          "http://localhost:3000/adicionar-evento",
          eventInfo
        );
        onAddEvent(eventInfo);
        onClose();
        setMessage("Evento adicionado com sucesso!");
      } catch (error) {
        setMessage("Erro ao adicionar o evento.");
        console.error("Erro ao salvar o evento:", error);
      }
    }else{
      alert("Local não mapeado!!")
    }
    
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center w-[100rem]">
        <h1>Adicionar um novo Evento</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-[85%]">
          <div className="flex w-full justify-between">
            <div>
              <p>Nome do Evento</p>
              <Input name="nomeDoEvento" placeholder="Nome do Evento" />
            </div>
            <div>
              <p>Data do Evento</p>
              <input
                name="dataDoEvento"
                type="datetime-local"
                className={cn(
                  "uppercase flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
            </div>
          </div>

          <div className="mt-2">
            <div>
              <p>CEP</p>
              <Input
                placeholder="Informe o CEP"
                value={address.cep}
                onChange={handleCepChange}
              />
            </div>
            <div className="flex gap-1 mt-2">
              <div>
                <p>Bairro</p>
                <Input
                  placeholder="Bairro"
                  value={address.neighborhood}
                  readOnly
                />
              </div>
              <div>
                <p>Cidade</p>
                <Input placeholder="Cidade" value={address.city} readOnly />
              </div>
              <div>
                <p>Estado</p>
                <select
                  value={address.state}
                  onChange={handleStateChange}
                  className="w-[100px] border rounded-md px-3 py-1 h-[36px] input"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {est.estadosBrasil.map((estado: string) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-6 mt-2">
              <div>
                <p>Rua</p>
                <Input placeholder="Rua" value={address.street} readOnly />
              </div>
              <div>
                <p>Número</p>
                <Input
                  name="numero"
                  placeholder="Número"
                  value={number}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-3 bg-easy text-white ">
            Salvar
          </Button>
        </form>
        {message && <p>{message}</p>}
      </DialogContent>
    </Dialog>
  );
}
