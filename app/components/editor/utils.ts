import { Editor, Element, Transforms } from "slate"
import { SUPPORTED_FORMATS, voidElements } from "./constants"

const LIST_TYPES = ['numbered-list', 'bulleted-list']


export const toggleMark = (editor: Editor, format: SUPPORTED_FORMATS) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor: Editor, format: SUPPORTED_FORMATS) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  )

  return !!match
}

export const isMarkActive = (editor: Editor, format: SUPPORTED_FORMATS) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleBlock = (editor: Editor, format: SUPPORTED_FORMATS) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<Element> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<Element>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const withComponents = (editor: Editor) => {
  {
    const { isVoid } = editor
  
    editor.isVoid = element => {
      return voidElements.some(el => el ===  element.type)? true : isVoid(element)
    }

    return editor
  }
}
