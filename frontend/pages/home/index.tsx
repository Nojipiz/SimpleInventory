import { ReactElement } from "react";
import ActionButton from "../../components/ActionButton";
import NavBar from "../../components/NavBar";
import * as Icon from "react-bootstrap-icons";

export default function Home(): ReactElement {
  return (
    <>
      <HomeContent />
      <NavBar />
    </>
  )
}

function HomeContent(): ReactElement {
  return (
    <div className="m-10">
      <h1 className="text-3xl"> Bienvenido Usuario </h1>
      <ActionButton
        text="Crear Factura"
        dark={false} preventDefault={false}
        onClick={() => console.log("Creaer")} />
      <div className="flex flex-row justify-between ml-28 mr-28 mt-10">
        <LastSales />
        <LastAddedProducts />
      </div>
    </div>
  )
}

function LastSales(): ReactElement {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Ultimas Ventas</h1>
    </div>
  )
}

function LastAddedProducts(): ReactElement {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Ultimas Productos</h1>
    </div>
  )
}
