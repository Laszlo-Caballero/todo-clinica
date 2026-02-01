"use client";
import { registerTodo } from "@/actions/register-todo.action";
import Button from "@/components/ui/button/Button";
import ContainerError from "@/components/ui/Error/ContainerError";
import FieldError from "@/components/ui/Error/FieldError";
import Input from "@/components/ui/input/Input";
import CloseButton from "@/components/ui/modal/CloseButton";
import Modal from "@/components/ui/modal/Modal";
import ModalBody from "@/components/ui/modal/ModalBody";
import ModalFooter from "@/components/ui/modal/ModalFooter";
import ModalHeader from "@/components/ui/modal/ModalHeader";
import ModalTitle from "@/components/ui/modal/ModalTitle";
import Select from "@/components/ui/select/Select";
import TextArea from "@/components/ui/text-area/TextArea";
import { Personal } from "@/generated/prisma-client/client";
import { ModalProps } from "@/interface/types";
import { TodoFormState } from "@/schemas/todo.schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initial_state: TodoFormState = {
  status: false,
  data: {
    tarea: "",
    importancia: "Baja",
    fechaInicio: undefined,
    fechaFin: undefined,
    tiempoEstimado: "",
    personalId: -1,
    estado: "APROBADA",
  },
  errors: {},
};

export default function CreateTodo({ isOpen, onClose }: ModalProps) {
  const { data } = useQuery<Personal[]>({
    queryKey: ["personal-list"],
    queryFn: async () => {
      const res = await axios.get("/api/personal");

      return res.data;
    },
  });

  const [formState, formAction] = useActionState(registerTodo, initial_state);

  useEffect(() => {
    if (formState.status) {
      onClose?.();
      toast.success("Tarea creada exitosamente");
    } else {
      toast.error("Error al crear la tarea");
    }
  }, [formState]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Crear Tarea</ModalTitle>
        <CloseButton />
      </ModalHeader>
      <form action={formAction}>
        <ContainerError errors={formState.errors}>
          <ModalBody className="grid grid-cols-2 gap-x-4">
            <FieldError errorKey="tarea" className="col-span-2">
              <TextArea
                label="Nombre de la Tarea"
                id="tarea"
                name="tarea"
                defaultValue={formState.data?.tarea}
              />
            </FieldError>

            <FieldError errorKey="importancia">
              <Select
                name="importancia"
                label="Importancia"
                id="importancia"
                defaultValue={formState.data?.importancia}
                placeholder="Seleccione la Importancia"
                options={[
                  {
                    label: "Baja",
                    value: "Baja",
                  },
                  {
                    label: "Media",
                    value: "Media",
                  },
                  {
                    label: "Alta",
                    value: "Alta",
                  },
                ]}
              />
            </FieldError>

            <FieldError errorKey="tiempoEstimado">
              <Input
                label="Tiempo Estimado"
                id="tiempoEstimado"
                defaultValue={formState.data?.tiempoEstimado}
                name="tiempoEstimado"
              />
            </FieldError>

            <FieldError errorKey="fechaInicio">
              <Input
                label="Fecha de Inicio"
                id="fechaInicio"
                type="date"
                defaultValue={formState.data?.fechaInicio?.toString() || ""}
                name="fechaInicio"
              />
            </FieldError>

            <FieldError errorKey="fechaFin">
              <Input
                label="Fecha de Fin"
                id="fechaFin"
                type="date"
                defaultValue={formState.data?.fechaFin?.toString() || ""}
                name="fechaFin"
              />
            </FieldError>

            <FieldError errorKey="personalId">
              <Select
                label="Asignar a Personal"
                id="personalId"
                defaultValue={formState.data?.personalId}
                name="personalId"
                placeholder="Seleccione el Personal"
                options={
                  data?.map((personal) => ({
                    label: personal.nombreCompleto,
                    value: personal.personalId.toString(),
                  })) || []
                }
              />
            </FieldError>

            <FieldError errorKey="estado">
              <Select
                label="Estado"
                id="estado"
                defaultValue={formState.data?.estado}
                placeholder="Seleccione el Estado"
                name="estado"
                options={[
                  { label: "APROBADA", value: "APROBADA" },
                  { label: "FINALIZADA", value: "FINALIZADA" },
                  { label: "POR INICIAR", value: "POR_INICIAR" },
                  { label: "POR VERIFICAR", value: "POR_VERIFICAR" },
                  { label: "POR APROBAR", value: "POR_APROBAR" },
                ]}
              />
            </FieldError>
          </ModalBody>
        </ContainerError>
        <ModalFooter>
          <Button>Crear Tarea</Button>

          <Button variant="secondary" type="button" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
