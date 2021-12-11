import { useCallback, useRef, useState } from 'react'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import { ComponentRegistry } from '~/cms-components/component.registry'
import { DRAG_TYPE } from '..'
import { v4 as uuidv4 } from 'uuid'

type PageComponentProps = {
  item: ComponentRegistry
  onRemove: () => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  index: number
  onChangeProps: (index, props) => void
}

function PageComponent({
  item,
  onRemove,
  onMove,
  index,
  onChangeProps,
}: PageComponentProps) {
  const [open, setOpen] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop(
    {
      accept: DRAG_TYPE.pageCompojent,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item: { index: number }, monitor: DropTargetMonitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        onMove(dragIndex, hoverIndex)

        item.index = hoverIndex
      },
    },
    [index, item]
  )

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DRAG_TYPE.pageCompojent,
      item: () => {
        return { ...item, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [index, item]
  )

  function _onChangeProps(props) {
    onChangeProps(index, props)
  }

  drag(drop(ref))

  const style = isDragging ? 'opacity-0' : ' opacity-100'

  return (
    <div
      ref={ref}
      className={`relative mb-1 hover:bg-gray-300 rounded-md p-2 border-gray-700 border ${style}`}
      data-handler-id={handlerId}
    >
      <span
        onClick={onRemove}
        className="absolute right-1 top-1/2 cursor-pointer border-black border rounded-full p-1 transform -translate-y-1/2"
      >
        <svg height="16px" version="1.1" viewBox="0 0 512 512" width="16px">
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
      </span>
      <item.component />
      {open ? (
        <item.propsGetterComponent data={item.props} setData={_onChangeProps} />
      ) : null}
    </div>
  )
}

type PageItem = {
  uuid: string
} & ComponentRegistry

export function PageComponents() {
  const [pageItems, setPageItems] = useState<Array<PageItem>>([])
  const [{ canDrop, isOver }, drop] = useDrop(() => {
    return {
      accept: DRAG_TYPE.component,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: PageItem) => {
        item.uuid = uuidv4()
        setPageItems((actual) => [...actual, { ...item }])
      },
    }
  }, [pageItems])

  function removeItem(uuid: string) {
    setPageItems((actualItems) =>
      actualItems.filter((item) => item.uuid !== uuid)
    )
  }

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setPageItems((actualItems) => {
        const dragItem = actualItems[dragIndex]
        const hoverItem = actualItems[hoverIndex]

        const orderedItems = [...actualItems]

        orderedItems[dragIndex] = hoverItem
        orderedItems[hoverIndex] = dragItem
        return orderedItems
      })
    },
    [pageItems]
  )

  function onChangeProps(index, props) {
    setPageItems((actualItems) => {
      const item = actualItems[index]
      return [...actualItems].splice(index, 1, { ...item, props })
    })
  }

  const isDropActive = canDrop && isOver
  const containerStyle = isDropActive ? 'bg-gray-300' : ''

  return (
    <div
      ref={drop}
      className={`w-full h-full p-2 max-w-screen-lg border border-gray-300 rounded-md ${containerStyle}`}
    >
      {pageItems.map((item, index) => {
        return (
          <PageComponent
            key={item.uuid}
            item={item}
            onRemove={() => removeItem(item.uuid)}
            onMove={moveItem}
            index={index}
            onChangeProps={onChangeProps}
          />
        )
      })}
    </div>
  )
}
