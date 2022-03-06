import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="modal background">
          <div className="content">{children}</div>
        </div>
      )}
    </>
  );
};
