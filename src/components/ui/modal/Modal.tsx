"use client";
import { useClose } from "@/hooks/useClose";
import cx from "@/lib/cx";
import { createContext, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends PropsWithChildren {
  className?: {
    backdrop?: string;
    container?: string;
  };
  isOpen?: boolean;
  onClose?: () => void;
}

interface ModalContextProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export default function Modal({
  className,
  isOpen,
  onClose,
  children,
}: ModalProps) {
  const ref = useClose({
    closeFunction: onClose,
  });
  return (
    <ModalContext
      value={{
        isOpen: !!isOpen,
        onClose: onClose || (() => {}),
      }}
    >
      {isOpen &&
        createPortal(
          <div
            className={cx(
              "overflow-y-auto overflow-x-hidden fixed flex bg-black/50 top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full",
              className?.backdrop,
            )}
          >
            <div
              className={cx(
                "relative p-4 w-full max-w-2xl max-h-full bg-white rounded-base",
                className?.container,
              )}
              ref={ref}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </ModalContext>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
}
