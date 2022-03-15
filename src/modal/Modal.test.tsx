import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("should not be displayed until triggered to be opened", () => {
    renderModal();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should be displayed when triggered to be opened", () => {
    renderAndOpenModal();

    expect(getModal()).toBeInTheDocument();
  });

  it("should display modal content once opened", () => {
    renderAndOpenModal();

    within(getModal()).getByText("Modal content");
  });

  it("should focus the first focusable element by default", () => {
    renderAndOpenModal();

    expect(getButton("Modal button 1")).toHaveFocus();
  });

  it("should trap focus", () => {
    renderAndOpenModal();

    expect(getButton("Modal button 1")).toHaveFocus();

    userEvent.tab();
    expect(getButton("Modal button 2")).toHaveFocus();

    userEvent.tab();
    expect(screen.getByLabelText("modalInput")).toBeInTheDocument();

    userEvent.tab();
    expect(getButton("Modal button 1")).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByLabelText("modalInput")).toBeInTheDocument();
  });

  it("should stop onClick event leakage (bubbling) outside modal", () => {
    renderModalInButton();

    // Direct button click - onClick should be executed
    userEvent.click(getButton("Show Message"));
    screen.getByText("Button clicked");

    // Hide message
    userEvent.click(getButton("Show Message"));

    // Modal button click - onClick should not bubble to container button
    userEvent.click(getOpenModalButton());
    userEvent.click(getButton("Modal button 1"));
    expect(screen.queryByText("Button clicked")).not.toBeInTheDocument();
  });

  it("should stop tab keydown event leakage outside modal when there is a modal inside a modal", () => {
    renderModalInModal();

    userEvent.click(getOpenModalButton());

    // BaseModal focus trap
    expect(getButton("BaseModal button 1")).toHaveFocus();
    userEvent.tab();
    expect(getButton("BaseModal button 2")).toHaveFocus();
    userEvent.tab();
    expect(getButton("BaseModal button 1")).toHaveFocus();

    userEvent.click(getButton("BaseModal button 1"));

    // Modal focus trap
    expect(getButton("Modal button 1")).toHaveFocus();
    userEvent.tab();
    expect(getButton("Modal button 2")).toHaveFocus();
    userEvent.tab();
    expect(screen.getByLabelText("modalInput")).toHaveFocus();
    userEvent.tab();
    expect(getButton("Modal button 1")).toHaveFocus();
  });

  it("should stop shift+tab keydown event leakage outside modal when there is a modal inside a modal", () => {
    renderModalInModal();

    userEvent.click(getOpenModalButton());

    // BaseModal focus trap
    expect(getButton("BaseModal button 1")).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(getButton("BaseModal button 2")).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(getButton("BaseModal button 1")).toHaveFocus();

    userEvent.click(getButton("BaseModal button 1"));

    // Modal focus trap
    expect(getButton("Modal button 1")).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(screen.getByLabelText("modalInput")).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(getButton("Modal button 2")).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(getButton("Modal button 1")).toHaveFocus();
  });

  it.todo(
    "should close on click of escape if corresponding prop is passed in such a way"
  );

  it.todo(
    "should not close on click of escape if corresponding prop is passed in such a way"
  );

  it.todo("should focus triggering element on closing modal");
});

const renderModal = () => render(<ModalWithTrigger />);
const renderModalInButton = () => render(<ModalInButton />);
const renderModalInModal = () => render(<ModalInModal />);

const getModal = () => screen.getByRole("dialog");

const getOpenModalButton = () =>
  screen.getByRole("button", { name: "Open modal" });

const renderAndOpenModal = () => {
  renderModal();

  userEvent.click(getOpenModalButton());
};

const getButton = (name: string) => screen.getByRole("button", { name });

const ModalWithTrigger = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open modal</button>
      <Modal isOpen={showModal}>
        <ModalContent />
      </Modal>
      <button>Button 2</button>
    </>
  );
};

const ModalInButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open modal</button>
      <button onClick={() => setShowMessage(!showMessage)}>
        Show Message
        <Modal isOpen={showModal}>
          <ModalContent />
        </Modal>
      </button>
      {showMessage && <span>Button clicked</span>}
    </>
  );
};

const ModalInModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open modal</button>
      <Modal isOpen={showModal}>
        <button onClick={() => setShowModal2(true)}>BaseModal button 1</button>
        <button>BaseModal button 2</button>
        <Modal isOpen={showModal2}>
          <ModalContent />
        </Modal>
      </Modal>
    </>
  );
};

const ModalContent = () => (
  <>
    <span>Modal content</span>
    <button>Modal button 1</button>
    <button>Modal button 2</button>
    <input aria-label="modalInput" />
  </>
);
