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

    expect(
      screen.getByRole("button", { name: "Modal button 1" })
    ).toHaveFocus();
  });

  it("should trap focus", () => {
    renderAndOpenModal();

    userEvent.tab();
    expect(
      screen.getByRole("button", { name: "Modal button 2" })
    ).toHaveFocus();

    userEvent.tab();
    expect(screen.getByLabelText("modalInput")).toBeInTheDocument();

    userEvent.tab();
    expect(
      screen.getByRole("button", { name: "Modal button 1" })
    ).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByLabelText("modalInput")).toBeInTheDocument();
  });

  it("should stop onClick event leakage (bubbling) outside modal", () => {
    renderModalInButton();
    // Direct button click - onClick should be executed
    userEvent.click(screen.getByRole("button", { name: "Show Message" }));
    screen.getByText("Button clicked");
    userEvent.click(screen.getByRole("button", { name: "Show Message" })); // Hide message

    // Modal button click - onClick should not bubble to container button
    userEvent.click(getOpenModalButton());
    userEvent.click(screen.getByRole("button", { name: "Modal button 1" }));
    expect(screen.queryByText("Button clicked")).not.toBeInTheDocument();
  });

  it.todo(
    "should stop tab keydown event leakage outside modal when there is a modal inside a modal"
  );

  it.todo(
    "should stop shift+tab keydown event leakage outside modal when there is a modal inside a modal"
  );

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

const getModal = () => screen.getByRole("dialog");

const getOpenModalButton = () =>
  screen.getByRole("button", { name: "Open modal" });

const renderAndOpenModal = () => {
  renderModal();

  userEvent.click(getOpenModalButton());
};

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

const ModalContent = () => (
  <>
    <span>Modal content</span>
    <button>Modal button 1</button>
    <button>Modal button 2</button>
    <input aria-label="modalInput" />
  </>
);
