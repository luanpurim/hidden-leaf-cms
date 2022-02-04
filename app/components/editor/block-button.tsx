import { useSlate } from "slate-react"
import { isBlockActive, toggleBlock } from "./utils"

type BlockButtonProps = {
  format: string,
  icon: JSX.Element
}

export default function BlockButton ({ format, icon }: BlockButtonProps) {
  const editor = useSlate()
  const active= isBlockActive(editor, format)
  return (
    <button
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      className={`p-2 bg-gray-100 flex items-center justify-center ${active ? 'text-black' : 'text-gray-400'}`}
    >
      {icon}
    </button>
  )
}
