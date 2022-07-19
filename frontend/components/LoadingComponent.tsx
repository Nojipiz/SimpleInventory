import { ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";

export default function LoadingComponent():ReactElement{
    return (
        <div className="flex w-full h-full justify-center items-center">
            <Icon.ArrowRepeat size={50} className="animate-spin text-green-2 w-1/2 " />
        </div>
    )
}
