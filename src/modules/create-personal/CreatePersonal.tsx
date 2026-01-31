"use client";
import { registerPersonal } from "@/actions/register-personal.action";
import Button from "@/components/ui/button/Button";
import FieldErrors from "@/components/ui/errors/FieldErrors";
import Input from "@/components/ui/input/Input";
import ActionTrigger from "@/components/ui/modal/ActionTrigger";
import Modal from "@/components/ui/modal/Modal";
import ModalBody from "@/components/ui/modal/ModalBody";
import ModalFooter from "@/components/ui/modal/ModalFooter";
import ModalHeader from "@/components/ui/modal/ModalHeader";
import ModalTitle from "@/components/ui/modal/ModalTitle";
import { Personal } from "@/generated/prisma-client/client";
import { ModalProps } from "@/interface/types";
import { PersonalFormState } from "@/schemas/personal.schema";
import { useActionState, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Table from "@/components/ui/table/Table";
import Badge from "@/components/ui/badge/Badge";
import { LuPen, LuTrash } from "react-icons/lu";

const initial_state: PersonalFormState = {
  status: false,
  data: {
    nombreCompleto: "",
  },
  errors: {},
};

export default function CreatePersonal({ isOpen, onClose }: ModalProps) {
  const [formState, formAction] = useActionState(
    registerPersonal,
    initial_state,
  );

  const { data, refetch } = useQuery<Personal[]>({
    queryFn: async () => {
      const res = await axios.get("/api/personal");
      return res.data;
    },
    queryKey: ["personal", formState.status],
    refetchOnWindowFocus: false,
  });
  const [personalId, setPersonalId] = useState<number | null>(null);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formState.status) {
      refetch();
      setPersonalId(null);
      if (refInput.current) {
        refInput.current.value = "";
      }
    }
  }, [formState, refInput]);

  return (
    <Modal isOpen={isOpen!} onClose={onClose!}>
      <ModalHeader>
        <ModalTitle>Crear Personal</ModalTitle>
        <form action={formAction} className="flex items-center min-w-min gap-2">
          <input type="hidden" name="personalId" value={personalId || ""} />

          <FieldErrors error={formState.errors?.nombreCompleto}>
            <Input
              className={{
                container: "flex items-center gap-2",
              }}
              label="Nombre Completo"
              placeholder="Nombre Completo"
              id="nombreCompleto"
              name="nombreCompleto"
              defaultValue={formState.data?.nombreCompleto || ""}
              ref={refInput}
            />
          </FieldErrors>
          <Button type="submit">{personalId ? "Actualizar" : "Crear"}</Button>
        </form>
      </ModalHeader>
      <ModalBody>
        <Table
          data={data || []}
          columns={[
            {
              header: "Id",
              accessorKey: "personalId",
            },
            {
              header: "Nombre Completo",
              accessorKey: "nombreCompleto",
            },
            {
              header: "Estado",
              cell: ({
                row: {
                  original: { estado },
                },
              }) => (
                <Badge variant={estado ? "success" : "danger"}>
                  {estado ? "Activo" : "Inactivo"}
                </Badge>
              ),
            },
            {
              header: "Fecha de Creación",
              accessorFn: (personal) =>
                new Date(personal.fechaCreacion).toLocaleDateString(),
            },
            {
              header: "Acciones",
              cell: ({
                row: {
                  original: { personalId, nombreCompleto },
                },
              }) => (
                <div className="flex gap-2 items-center">
                  <Button
                    icon
                    onClick={() => {
                      setPersonalId(personalId);
                      refInput.current?.focus();
                      refInput.current!.value = nombreCompleto;
                    }}
                  >
                    <LuPen className="me-1.5 -ms-0.5" />
                    Editar
                  </Button>
                  <Button icon variant="danger">
                    <LuTrash className="me-1.5 -ms-0.5" />
                    Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </ModalBody>
      <ModalFooter>
        <ActionTrigger>
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </ActionTrigger>
      </ModalFooter>
    </Modal>
  );
}
