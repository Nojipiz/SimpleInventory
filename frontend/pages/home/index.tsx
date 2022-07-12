import { ReactElement } from "react";
import useAuth from "../../hooks/useAuth";

export default function Home():ReactElement{
    const {logout} = useAuth();
    return (
       <>
            <h1>Home Page!</h1>
            <button onClick={() => logout()}>logout</button>
        </>
    )
}
