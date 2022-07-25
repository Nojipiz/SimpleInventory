import { ReactElement } from "react";

export default function Modal(props: Props): ReactElement {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black absolute bottom-0 bg-opacity-50 z-10">
      <div className="w-1/2 bg-white rounded-xl p-5">
        {props.children}
      </div>
    </div>
  )
}

interface Props {
  children: ReactElement | ReactElement[]
}
