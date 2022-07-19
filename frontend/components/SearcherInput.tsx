import { ChangeEvent, ReactElement, useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function SearchserInput(props: Props): ReactElement {
    const [currentText, setText] = useState<string | null>();
    const handleChange = (e: ChangeEvent) => {
        setText(e.target.textContent);
    }
    return (
        <div className="flex flex-row items-center justify-center">
            <p className="mr-2">Buscar</p>
            <div className="flex flex-row border-none outline-none shadow-lg rounded-full p-2 w-fit">
                <input className="border-none outline-none"
                    type="text" name="search"
                    placeholder={props.placeholder} onChange={handleChange} />
                <button className="flex align-center justify-center mr-3"
                    onClick={() => props.onSearch(currentText)}>
                    <Icon.Search size={20} />
                </button>
            </div>
        </div>
    )
}

interface Props {
    placeholder: string;
    onSearch: Function;
}
