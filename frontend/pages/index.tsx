import Link from "next/link";
import { ReactElement } from "react";

export default function MainPage():ReactElement{
  return (
      <Link href="/login">
            <h1 className="bg-green-2 text-white">Login</h1>
      </Link>
  )
}
