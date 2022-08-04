import { ReactElement } from "react";
import NavBar from "../../components/NavBar";

export default function ReportsPage(): ReactElement {
  return (
    <>
      <ReportsContent />
      <NavBar />
    </>
  )
}

function ReportsContent(): ReactElement {
  return (
    <h1> Hey this must contains something!</h1>
  )
}
