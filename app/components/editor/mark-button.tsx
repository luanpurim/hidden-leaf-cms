import { useSlate } from "slate-react"
import { isMarkActive, toggleMark } from "./utils"

type MarkButtonProps = {
  format: string,
  icon: JSX.Element
}

export default function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate()
  const active=isMarkActive(editor, format)
  return (
    <button
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      className={`p-2 bg-gray-100 flex items-center justify-center ${active ? 'text-black' : 'text-gray-400'}`}
    >
     {icon}
    </button>
  )
}