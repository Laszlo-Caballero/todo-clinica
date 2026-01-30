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
import { useQuery } from "@/hooks/useQuery";
import { ModalProps } from "@/interface/types";
import { PersonalFormState } from "@/schemas/personal.schema";
import { useActionState, useEffect } from "react";
import axios from "axios";

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

  const {} = useQuery<Personal>({
    queryFn: async () => {
      const res = await axios.get("/api/personal");
      return res.data;
    },
    dependencies: [formState.status],
  });

  useEffect(() => {
    if (formState.status) {
      onClose?.();
    }
  }, [formState.status, onClose]);

  return (
    <Modal isOpen={isOpen!} onClose={onClose!}>
      <ModalHeader>
        <ModalTitle>Crear Personal</ModalTitle>
      </ModalHeader>
      <form action={formAction}>
        <ModalBody>
          <FieldErrors error={formState.errors?.nombreCompleto}>
            <Input
              label="Nombre Completo"
              placeholder="Nombre Completo"
              id="nombreCompleto"
              name="nombreCompleto"
              defaultValue={formState.data?.nombreCompleto || ""}
            />
          </FieldErrors>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" disabled={formState.status}>
            Crear
          </Button>
          <ActionTrigger>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </ActionTrigger>
        </ModalFooter>
      </form>
    </Modal>
  );
}
