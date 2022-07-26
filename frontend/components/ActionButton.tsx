import { ReactElement } from "react";

export default function ActionButton(props: Props): ReactElement {
  const color: string = props.dark ? 'bg-green-2 ' : 'bg-green-1 ';
  const style: string = color + 'text-white text-2xl rounded-full pr-3 pl-3 pt-2 pb-2 mt-2 w-full';
  return (
    <button
      type={props.preventDefault ? "button" : undefined}
      className={style}
      onClick={() => {
        if (props.onClick != undefined)
          props.onClick();
      }}>
      {props.text}
    </button>
  );
}

interface Props {
  onClick: Function | undefined;
  text: string;
  dark: boolean;
  preventDefault: boolean;
}
