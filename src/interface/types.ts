export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}
export interface FormState<T> {
  status: boolean;
  data?: T;
  errors?: {
    [key in keyof T]?: string[];
  };
}
