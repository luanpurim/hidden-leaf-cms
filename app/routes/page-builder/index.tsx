import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AvailableComponentList } from './components/available-component-list'
import { PageComponents } from './components/page-components'

export enum DRAG_TYPE {
  component = 'COMPONENT',
  pageCompojent = 'PAGE_COMPONENT',
}

function PageBuilder() {
  return (
    <div className="min-h-screen flex min-w-full">
      <div className="flex w-full">
        <div className="flex-grow bg-gray-200 p-4 flex justify-center">
          <PageComponents />
        </div>
        <div className="flex-shrink-0 w-1/5 bg-gray-300 p-2 shadow-xl">
          <AvailableComponentList />
        </div>
      </div>
    </div>
  )
}

export default function DnDContainer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageBuilder />
    </DndProvider>
  )
}
