import { preventEventPropagationProps } from "../utils/preventEventPropagation";
import { useFocusTrap } from "../utils/useFocusTrap";
import { useRestoreTriggerFocus } from "../utils/useRestoreTriggerFocus";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ children, isOpen }: ModalProps) => {
  return <>{isOpen && <ModalElement children={children} />}</>;
};

const ModalElement = ({ children }: { children: React.ReactNode }) => {
  useRestoreTriggerFocus();
  const modalRef = useFocusTrap();

  return (
    <div
      className="modal background"
      role={"dialog"}
      {...preventEventPropagationProps}
    >
      <div className="content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};
