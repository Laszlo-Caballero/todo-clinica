import { updateDate } from "@/actions/update-date.action";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { toast } from "sonner";

interface ButtonDateProps {
  date?: Date | null;
  id: number;
  keyData: "fechaInicio" | "fechaFin";
  message?: string;
}

export default function ButtonDate({
  date,
  keyData,
  message,
  id,
}: ButtonDateProps) {
  console.log("date", date);

  const [newDate, setNewDate] = useState(date ? new Date(date) : null);

  const onClick = async () => {
    const date = new Date();
    const { status } = await updateDate(id, date, keyData);
    if (status) {
      toast.success("Fecha actualizada");
      setNewDate(date);
    } else {
      toast.error("Error al actualizar la fecha");
    }
  };

  if (newDate) {
    return newDate?.toISOString()?.split("T")[0];
  }

  return <Button onClick={onClick}>{message}</Button>;
}
