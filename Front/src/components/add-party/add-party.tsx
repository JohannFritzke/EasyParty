import { useState } from "react";
import { Plus } from "lucide-react";
import "./add-party.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function AddParty() {
  const [address, setAddress] = useState({
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [number, setNumber] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nomeDoEvento = formData.get("nomeDoEvento") as string;
    const dataDoEvento = formData.get("dataDoEvento") as string;
    const enderecoCompleto = `${address.street}, ${address.neighborhood}, ${address.city}, ${address.state}, ${number}`;
    
    // Aqui você pode enviar os dados para o seu banco de dados
    console.log({
      nomeDoEvento,
      dataDoEvento,
      endereco: enderecoCompleto,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="add-party bg-easy">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center w-[100rem]">
        <h1>Adicionar um novo Evento</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-[85%]">
          <div className="flex w-full justify-between p-">
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
                  "uppercase input-date border-input disabled:opacity-50"
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
                <Input
                  placeholder="Estado"
                  value={address.state}
                  readOnly
                  className="w-[50px]"
                />
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

          <Button type="submit" className="mt-3 bg-easy">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
