import { ChangeEvent, ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";

export default function SearchserInput(props: Props): ReactElement {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    props.onSearch(text ? text : "");
  }
  return (
    <div className="flex flex-row items-center justify-center">
      <p className="mr-2">Buscar</p>
      <div className="flex flex-row border-none outline-none shadow-lg rounded-full p-2 w-fit">
        <input className="border-none outline-none"
          type="text" name="search"
          placeholder={props.placeholder} onChange={handleChange} />
        <div className="flex align-center justify-center mr-3 text-gray-2">
          <Icon.Search size={20} />
        </div>
      </div>
    </div >
  )
}

interface Props {
  placeholder: string;
  onSearch: (text: string) => void;
}
