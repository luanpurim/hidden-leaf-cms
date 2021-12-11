import React, { ReactNode } from 'react'
import { H1, H2, H3, H4 } from './heading'
import RenderHeadingPropsModal from './heading/modal'
import TestComponent from './test-component'

export type ComponentRegistry = {
  name: string
  component: React.ElementType
  props?: Array<any>
  propsGetterComponent?: React.ElementType
}

const componentRegistry: Array<ComponentRegistry> = [
  {
    name: 'test-component',
    component: TestComponent,
  },
  {
    name: 'Heading 1',
    component: H1,
    propsGetterComponent: RenderHeadingPropsModal,
  },
  {
    name: 'Heading 2',
    component: H2,
    propsGetterComponent: RenderHeadingPropsModal,
  },
  {
    name: 'Heading 3',
    component: H3,
    propsGetterComponent: RenderHeadingPropsModal,
  },
  {
    name: 'Heading 4',
    component: H4,
    propsGetterComponent: RenderHeadingPropsModal,
  },
]

export default componentRegistry
