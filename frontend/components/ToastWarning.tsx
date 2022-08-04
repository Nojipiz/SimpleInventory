import { ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";

export default function ToastWarning(props: Props): ReactElement {
  return (
    <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute top-5 left-2" role="alert">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <Icon.ExclamationTriangle />
      </div>
      <div className="ml-3 text-sm font-normal">{props.text}</div>
    </div>
  )
}

interface Props {
  text: string
}
