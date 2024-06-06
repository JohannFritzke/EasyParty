import { Plus } from "lucide-react";
import "./add-party.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
export function AddParty() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="add-party bg-easy">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
