import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Input from '~/components/input'
import Label from '~/components/label'
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
        <div className="flex-grow bg-gray-200 p-4 flex flex-col">
          <div className="mb-2 flex justify-center w-full">
            <div className="grid max-w-screen-lg w-full">
              <Label htmlFor="title">Page title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                className="max-w-screen-sm"
              />
            </div>
          </div>
          <div className="w-full flex-grow flex justify-center">
            <PageComponents />
          </div>
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
