import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "./Modal";

const ModalWithTrigger = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open modal</button>
      <Modal isOpen={showModal}>
        <text>Modal content</text>
        <button>Modal button 1</button>
        <button>Modal button 2</button>
      </Modal>
      <button>Button 2</button>
    </>
  );
};

const renderModal = () => render(<ModalWithTrigger />);

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
});

const getModal = () => screen.getByRole("dialog");

const getOpenModalButton = () =>
  screen.getByRole("button", { name: "Open modal" });

const renderAndOpenModal = () => {
  renderModal();

  userEvent.click(getOpenModalButton());
};
