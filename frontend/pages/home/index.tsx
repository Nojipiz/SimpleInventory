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
      <Link href={"/create-sale"}>
        <button className="bg-green-1 text-white p-2 rounded-xl text-2xl w-fullm m-5">
          Crear Factura
        </button>
      </Link>
    </div>
  )
}

