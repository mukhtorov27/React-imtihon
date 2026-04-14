import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";

interface ModalWrapperProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

export function ModalWrapper({
  open,
  title,
  subtitle,
  onClose,
  children,
}: ModalWrapperProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button
          type="button"
          className="icon-btn close-btn"
          aria-label="Close modal"
          onClick={onClose}
        >
          <FiX />
        </button>
        {subtitle ? <p className="modal-subtitle">{subtitle}</p> : null}
        <h3 className="modal-title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
