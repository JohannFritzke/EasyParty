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
      <DialogContent>
        <h1>Adicionar um novo Evento!!</h1>

        <form action="" className="flex justify-center flex-col">
          <div className="flex w-[90%] justify-between p-3">
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

          <div>
            <div>
              <p>Endereço</p>
              <Input placeholder="Informe o Endereço"></Input>
            </div>
          </div>

          <Button className="mt-2 bg-easy">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
