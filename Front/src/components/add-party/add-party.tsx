import { Plus } from "lucide-react";
import "./add-party.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function AddParty() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="add-party bg-easy">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <h1>Adicionar um novo Evento</h1>
        <form action="" className="flex flex-col w-[85%]">
          <div className="flex w-full justify-between p-">
            <div>
              <p>Nome do Evento</p>
              <Input placeholder="Nome do Evento" />
            </div>
            <div>
              <p>Data do Evento</p>
              <input
                type="datetime-local"
                className={cn(
                  "uppercase input-date border-input disabled:opacity-50"
                )}
              />
            </div>
          </div>

          <div className="mt-2">
            <div>
              <p>Endereço</p>
              <Input placeholder="Informe o Endereço"></Input>
            </div>
          </div>

          <Button className="mt-3 bg-easy">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
