import { ChangeEvent, ReactElement } from "react";

export default function InputElement(props: Props): ReactElement {
    return (
        <input className="w-full border-none outline-none bg-gray-1 text-black rounded-full p-1 pl-2 pr-2 text-center"
            type={props.type} name={props.name}
            placeholder={props.placeHolder}
            onChange={(e:ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} />
    )
}

interface Props {
    type: string;
    name: string;
    placeHolder: string;
    onChange: (text:string) => void;
}
