import { ChangeEvent, ReactElement } from "react";

export default function InputElement(props: Props): ReactElement {
    return (
        <input
            className="w-full border-none outline-none bg-gray-1 text-black rounded-full p-1 pl-2 pr-2 text-center"
            type={props.type} name={props.name}
            placeholder={props.placeHolder}
            required={props.required} id={props.name}
            defaultValue={props.defaultValue}
            onChange={(e:ChangeEvent<HTMLInputElement>) => props.onChange(e)}
            disabled={props.disable}
        />
    )
}

interface Props {
    type?: string;
    name?: string;
    placeHolder?: string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    defaultValue?: string | number;
    disable?: boolean;
}
