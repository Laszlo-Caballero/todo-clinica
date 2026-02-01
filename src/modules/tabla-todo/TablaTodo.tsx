"use client";
import { updateEstado } from "@/actions/update-estado.action";
import { TodoResponse } from "@/app/api/todos/route";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import Table from "@/components/ui/table/Table";
import { EstadoEnum } from "@/generated/prisma-client/enums";
import cx from "@/lib/cx";
import { toast } from "sonner";
import ButtonDate from "./ButtonDate";

interface TablaTodoProps {
  todos: TodoResponse[];
}

export default function TablaTodo({ todos }: TablaTodoProps) {
  const onChangeEstado = async (id: number, newEstado: EstadoEnum) => {
    const { success } = await updateEstado(id, newEstado);

    if (!success) {
      toast.error("Error al actualizar el estado");
      return;
    }

    toast.success("Estado actualizado correctamente");
  };

  return (
    <Table
      data={todos}
      columns={[
        {
          header: "Tarea",
          accessorKey: "tarea",
        },
        {
          header: "Importancia",
          accessorKey: "importancia",
        },
        {
          header: "Fecha Inicio",
          cell: ({
            row: {
              original: { fechaInicio, todoId },
            },
          }) => {
            return (
              <div>
                <ButtonDate
                  id={todoId}
                  keyData="fechaInicio"
                  date={fechaInicio}
                  message="Agregar Fecha Inicio"
                />
              </div>
            );
          },
        },
        {
          header: "Tiempo Estimado",
          accessorFn: (row) => row.tiempoEstimado || "No especificado",
        },
        {
          header: "Fecha Fin",
          cell: ({
            row: {
              original: { fechaFin, todoId },
            },
          }) => {
            return (
              <div>
                <ButtonDate
                  id={todoId}
                  keyData="fechaFin"
                  date={fechaFin}
                  message="Agregar Fecha Fin"
                />
              </div>
            );
          },
        },
        {
          header: "Personal que lo asignó",
          cell: ({
            row: {
              original: { personal },
            },
          }) => {
            return (
              <div className={cx("flex items-center gap-2")}>
                <Badge
                  variant="success"
                  className="w-full text-base text-center"
                >
                  {personal?.nombreCompleto}
                </Badge>
              </div>
            );
          },
        },
        {
          header: "Estado",
          cell({
            row: {
              original: { estado, todoId },
            },
          }) {
            return (
              <Select
                id="estado"
                defaultValue={estado}
                placeholder="Seleccione el Estado"
                name="estado"
                onChange={(e) => {
                  onChangeEstado(todoId, e.target.value as EstadoEnum);
                }}
                options={[
                  { label: "APROBADA", value: "APROBADA" },
                  { label: "FINALIZADA", value: "FINALIZADA" },
                  { label: "POR INICIAR", value: "POR_INICIAR" },
                  { label: "POR VERIFICAR", value: "POR_VERIFICAR" },
                  { label: "POR APROBAR", value: "POR_APROBAR" },
                ]}
              />
            );
          },
        },
      ]}
    />
  );
}
