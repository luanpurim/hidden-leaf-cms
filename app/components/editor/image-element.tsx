import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
} from 'slate-react'
import { Editor, Transforms } from 'slate'
import { useSlateStatic } from 'slate-react'
import { FaImage, FaTrash } from 'react-icons/fa'

export const ImageElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes} className="w-full flex justify-center p-6">
      <div
        contentEditable={false}
        className={`relative w-full max-w-[500px] aspect-video text-center cursor-pointer ${
          selected && focused ? 'shadow-[0_0_0_3px_#B4D5FF]' : ''
        }`}
      >
        <img src={element.url} className="object-contain w-full h-full" />
        {children}
        <button 
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className="absolute top-1 right-1 text-slate-600 bg-slate-200 hover:bg-slate-300 p-2 rounded-sm">
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <button
      className="p-2 bg-gray-100 flex items-center justify-center text-gray-400"
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url) {
          insertImage(editor, url)
        }
      }}
    >
      <FaImage />
    </button>
  )
}
