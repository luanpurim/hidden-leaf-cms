import { useCallback, useEffect, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import {
  createEditor,
  Descendant,
} from 'slate'
import { withHistory } from 'slate-history'
import {FaBold, FaCode, FaItalic, FaListOl, FaListUl, FaQuoteRight, FaUnderline} from 'react-icons/fa'

import Header from '~/components/header'
import Element from '~/components/editor/element'
import Leaf from '~/components/editor/leaf'
import MarkButton from '~/components/editor/mark-button'
import BlockButton from '~/components/editor/block-button'
import Toolbar from '~/components/editor/toolbar'
import { withComponents } from '~/components/editor/utils'
import { InsertImageButton } from '~/components/editor/image-element'



export default function PageBuilder() {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withComponents(withHistory(withReact(createEditor()))), [])

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='mt-4 p-8 grow flex flex-col'>
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <div className='flex flex-col grow'>
            <Toolbar className='max-w-3xl'>
              <MarkButton format="bold" icon={<FaBold />} />
              <MarkButton format="italic" icon={<FaItalic />} />
              <MarkButton format="underline" icon={<FaUnderline />} />
              <MarkButton format="code" icon={<FaCode />} />
              <BlockButton format="heading-one" icon={<span>H1</span>} />
              <BlockButton format="heading-two" icon={<span>H2</span>} />
              <BlockButton format="block-quote" icon={<FaQuoteRight />} />
              <BlockButton format="numbered-list" icon={<FaListOl />} />
              <BlockButton format="bulleted-list" icon={<FaListUl />} />
              <InsertImageButton />
            </Toolbar>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              className='p-4 mt-4 border border-gray-200 bg-slate-50 grow overflow-auto max-w-6xl'
            />
          </div>
        </Slate>
      </div>
    </div>
  )
}


const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
  {
    type: "image",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png",
    children: [{ text: '' }],
  }
]
