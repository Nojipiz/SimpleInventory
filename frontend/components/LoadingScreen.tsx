import { ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";

export default function LoadingScreen():ReactElement{
    return (
        <Icon.ArrowRepeat className="animate-spin text-green-2 w-1/2 " />
    );
}
