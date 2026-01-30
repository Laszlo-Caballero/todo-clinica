"use client";

import Button from "@/components/ui/button/Button";
import { ModalProps } from "@/interface/types";
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";

export default function ButtonWrapper({
  message,
  children,
}: PropsWithChildren<{ message: string }>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {message}
      </Button>

      {isValidElement(children) &&
        cloneElement(children as ReactElement<ModalProps>, {
          isOpen,
          onClose: () => setIsOpen(false),
        })}
    </>
  );
}
