import { createContext, ReactElement, useContext, useState } from "react";
import ActionButton from "../../components/ActionButton";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import CreateClient from "./CreateClient";

export const AddClientContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });

interface ContextModal {
  isOpen: boolean,
  setOpen: Function
}

export default function Clients(): ReactElement {
  const [addClientOpen, setAddClientOpen] = useState<boolean>(false);
  return (
    <AddClientContext.Provider value={{ isOpen: addClientOpen, setOpen: setAddClientOpen }}>
      {addClientOpen === true &&
        <CreateClient />
      }
      <Header />
      <NavBar />
    </AddClientContext.Provider>
  )
}

function Header(): ReactElement {
  const { setOpen } = useContext(AddClientContext);
  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Clientes</h1>
      <SearchserInput placeholder="Busca los clientes aqui" onSearch={() => console.log("This must search")} />
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Cliente" dark={false} preventDefault={false} />
      </div>
    </header>
  );
}
