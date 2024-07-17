import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, FilePenLine } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns"; // Importa a função format do date-fns
import { useNavigate } from "react-router-dom";

interface EventData {
  id: number;
  nomeDoEvento: string;
  dataDoEvento: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function EventLister() {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<EventData[]>(
          `http://localhost:3000/get-events-user?id=${id}`
        );
        // Formata a dataDoEvento antes de atualizar o estado
        const formattedData = response.data.map((event) => ({
          ...event,
          dataDoEvento: format(
            new Date(event.dataDoEvento),
            "dd/MM/yyyy HH:mm"
          ), // Formata como dd/MM/yyyy HH:mm
        }));
        setEventData(formattedData); // Atualiza o estado com os dados formatados
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchData();
  }, [id]); // Adiciona userName como dependência para que useEffect seja reexecutado quando userName mudar

  const deleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:3000/delete-event?id=${eventId}`);
      // Remove o evento deletado do estado
      setEventData((prevEventData) =>
        prevEventData.filter((event) => event.id !== eventId)
      );
      navigate(0);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  };

  return (
    <Table>
      <TableCaption>Your Parties</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Date of the event</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventData.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.nomeDoEvento}</TableCell>
            <TableCell>{event.dataDoEvento}</TableCell>
            <TableCell>{`${event.street}, ${event.number}, ${event.neighborhood}, ${event.city}, ${event.state}`}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <button>
                  {" "}
                  <FilePenLine />
                </button>
                <button onClick={() => deleteEvent(event.id)}>
                  <Trash2 />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
