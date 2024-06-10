import { ReactNode } from "react";

export interface ModalPropsModal {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = () => {
  return <div></div>;
};

export default Modal;
