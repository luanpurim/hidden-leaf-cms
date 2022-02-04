import { RenderElementProps } from "slate-react"
import { ImageElement } from "./image-element"


export default function Element({ attributes, children, element }: RenderElementProps) {
  switch (element.type) {
    case 'block-quote':
      return <blockquote className="border-l-2 border-slate-400 italic pl-2 text-slate-400" {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes} className="list-disc list-inside">{children}</ul>
    case 'heading-one':
      return <h1 {...attributes} className='text-2xl'>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes} className='text-xl'>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes} className="list-decimal list-inside">{children}</ol>
    case 'image':
      return <ImageElement attributes={attributes} element={element} children={children} />
    default:
      return <p {...attributes}>{children}</p>
  }
}
