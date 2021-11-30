import React, { ReactNode } from 'react'
import TestComponent from './test-component'

export type ComponentRegistry = {
  name: string
  component: React.ElementType
}

const componentRegistry: Array<ComponentRegistry> = [
  {
    name: 'test-component',
    component: TestComponent,
  },
]

export default componentRegistry
