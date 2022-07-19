import { ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";

export default function LoadingScreen():ReactElement{
    return (
        <div className="flex w-100 h-screen items-center justify-center">
            <Icon.ArrowRepeat size={200}  className="animate-spin text-green-2 w-1/2 " />
        </div>
    );
}
