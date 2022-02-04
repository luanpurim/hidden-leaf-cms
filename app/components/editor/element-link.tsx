import { Editor, Element, Transforms } from "slate"

const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={selected ? ` shadow-[0_0_0_3px #ddd]` : ''}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    style="font-size: 0;"
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

const wrapLink = (editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}


const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
  return !!link
}