import { useState } from "react";
import "./App.css";
import { Modal } from "./modal/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="wrapper">
      <div>
        <label htmlFor="dummyInput 1">Input 1: </label>
        <input id="dummyInput 1" />
      </div>
      <div>
        <label htmlFor="dummyInput 2">Input 2: </label>
        <input id="dummyInput 2" />
      </div>
      <button className={"wheatButton"} onClick={() => setShowModal(true)}>
        {"Open modal"}
      </button>

      <Modal isOpen={showModal}>
        <form>
          <h3>Enter details</h3>
          <div>
            <label htmlFor="firstName">First name: </label>
            <input id="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last name: </label>
            <input id="lastName" />
          </div>
          <button
            type="button"
            className={"wheatButton"}
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
