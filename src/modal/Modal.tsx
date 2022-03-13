import { createPortal } from "react-dom";
import { preventEventPropagationProps } from "../utils/preventEventPropagation";
import { useFocusTrap } from "../utils/useFocusTrap";
import { useRestoreTriggerFocus } from "../utils/useRestoreTriggerFocus";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ isOpen, ...otherProps }: ModalProps) => {
  return <>{isOpen && <ModalElement {...otherProps} />}</>;
};

const ModalElement = ({ children }: Omit<ModalProps, "isOpen">) => {
  useRestoreTriggerFocus();
  const modalRef = useFocusTrap();

  return createPortal(
    <div
      className="modal background"
      role={"dialog"}
      {...preventEventPropagationProps}
    >
      <div className="content" ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  );
};
