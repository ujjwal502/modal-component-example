import React, { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: "ltr" | "rtl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  direction = "ltr",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);

      // Focus the close button when the modal opens
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleTabKey = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  const modalClass = direction === "rtl" ? "modal-container-rtl" : "";

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div
        className={`modal-container ${modalClass}`}
        ref={modalRef}
        onKeyDown={handleTabKey}
      >
        <button className="modal-close" ref={closeButtonRef} onClick={onClose}>
          Close me!
        </button>
        <div className="modal-content">
          <button>This is a sample button to test focus</button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
