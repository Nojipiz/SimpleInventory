import Link from "next/link";
import { ReactElement } from "react";
import NavBar from "../../components/NavBar";

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
      <Link href={"/create-bill"}>
        <button className="bg-green-1 text-white p-2 rounded-xl text-2xl w-full">
          Crear Factura
        </button>
      </Link>
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
