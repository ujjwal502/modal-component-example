import { useState } from "react";
import "./App.css";
import Modal from "./Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      <button onClick={() => setIsOpen(true)}>Click me to open a modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is an example modal</p>
      </Modal>
    </div>
  );
}

export default App;
