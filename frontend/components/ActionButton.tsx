import { ReactElement } from "react";

export default function ActionButton(props:Props):ReactElement{
    const color:string = props.dark ? 'bg-green-2 ' : 'bg-green-1 ';
    const style:string = color + 'text-white text-2xl rounded-full p-2 m-2 w-full';
    return(
        <button
            type="button"
            className= {style}
            onClick={() => props.onClick()}>
            {props.text}
        </button>
    );
}

interface Props{
    onClick:Function;
    text: string;
    dark: boolean;
}
