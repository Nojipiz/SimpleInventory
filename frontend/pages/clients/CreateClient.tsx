import { ReactElement, useContext } from "react";
import { AddClientContext } from ".";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";

export default function CreateClient(): ReactElement {
  const { setOpen } = useContext(AddClientContext);
  return (
    <Modal>
      <header className="flex flex-row justify-between">
        <h1 className="text-2xl bold">Crear Cliente</h1>
        <button onClick={() => setOpen(false)}>
          <Icon.X size={30} className="text-black" />
        </button>
      </header>
    </Modal>
  )
}
