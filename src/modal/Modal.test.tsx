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
        <span>Modal content</span>
        <button>Modal button 1</button>
        <button>Modal button 2</button>
        <input aria-label="modalInput" />
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
    expect(screen.getByLabelText("modalInput"));

    userEvent.tab();
    expect(
      screen.getByRole("button", { name: "Modal button 1" })
    ).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByLabelText("modalInput"));
  });

  it.todo("should stop onClick event leakage outside modal");

  it.todo("should stop tab keydown event leakage outside modal");

  it.todo("should stop shift+tab keydown event leakage outside modal");

  it.todo(
    "should close on click of escape if corresponding prop is passed in such a way"
  );

  it.todo(
    "should not close on click of escape if corresponding prop is passed in such a way"
  );

  it.todo("should focus triggering element on closing modal");
});

const getModal = () => screen.getByRole("dialog");

const getOpenModalButton = () =>
  screen.getByRole("button", { name: "Open modal" });

const renderAndOpenModal = () => {
  renderModal();

  userEvent.click(getOpenModalButton());
};
