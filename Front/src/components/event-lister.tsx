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
import { Trash2, FilePenLine } from 'lucide-react';
import { useParams } from "react-router-dom";
import { format } from 'date-fns'; // Importa a função format do date-fns

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
  const { userName } = useParams<{ userName: string }>(); // Captura o parâmetro userName da URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<EventData[]>(`http://localhost:3000/get-events-user?userName=${userName}`);
        // Formata a dataDoEvento antes de atualizar o estado
        const formattedData = response.data.map(event => ({
          ...event,
          dataDoEvento: format(new Date(event.dataDoEvento), 'dd/MM/yyyy HH:mm') // Formata como dd/MM/yyyy HH:mm
        }));
        setEventData(formattedData); // Atualiza o estado com os dados formatados
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchData();
  }, [userName]); // Adiciona userName como dependência para que useEffect seja reexecutado quando userName mudar

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
                <button> <FilePenLine /></button>
                <button><Trash2 /></button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
