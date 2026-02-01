"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext } from "react";

interface ContainerErrorProps<T> {
  errors?: { [key in keyof T]?: string[] };
}

interface ContainerErrorContextType<T> {
  errors?: { [key in keyof T]?: string[] };
  getErrorMessages: (field: keyof T) => string[];
}

const ContainerErrorContext = createContext<
  ContainerErrorContextType<any> | undefined
>(undefined);

export default function ContainerError<T>({
  errors,
  children,
}: PropsWithChildren<ContainerErrorProps<T>>) {
  const getErrorMessages = (field: keyof T) => {
    if (!errors) return [];
    return errors[field] || [];
  };

  return (
    <ContainerErrorContext.Provider
      value={{
        errors,
        getErrorMessages: (field) => getErrorMessages(field as keyof T),
      }}
    >
      {children}
    </ContainerErrorContext.Provider>
  );
}

export function useContainerErrorContext<T>() {
  const context = useContext(ContainerErrorContext);

  if (!context) {
    throw new Error(
      "useContainerErrorContext must be used within a ContainerError provider",
    );
  }

  return context as ContainerErrorContextType<T>;
}
