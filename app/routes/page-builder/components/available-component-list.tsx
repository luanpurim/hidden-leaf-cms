import { useDrag } from 'react-dnd'
import componentRegistry, {
  ComponentRegistry,
} from '~/cms-components/component.registry'
import { DRAG_TYPE } from '..'

export function AvailableComponent({
  component,
}: {
  component: ComponentRegistry
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAG_TYPE.component,
    item: component,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const draggingStyle = isDragging ? 'opacity-25' : ''
  return (
    <p
      ref={drag}
      className={`border border-gray-500 rounded-md p-1 text-gray-700 ${draggingStyle}`}
    >
      {component.name}
    </p>
  )
}

export function AvailableComponentList() {
  return (
    <div className="w-full h-full">
      {componentRegistry.map((component) => {
        return <AvailableComponent key={component.name} component={component} />
      })}
    </div>
  )
}
