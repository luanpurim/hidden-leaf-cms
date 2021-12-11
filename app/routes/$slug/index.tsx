import { LoaderFunction, useLoaderData } from 'remix'
import { db } from '~/utils/db.server'
import componentRegistry from '~/cms-components/component.registry'
import type { ComponentRegistry } from '~/cms-components/component.registry'
import { Page } from '.prisma/client'
import { ReactNode } from 'react'

type LoaderData = { page: Page }
export const loader: LoaderFunction = async ({ params }) => {
  try {
    const page = await db.page.findUnique({ where: { slug: params.slug } })

    return { page }
  } catch (e) {
    console.log(e)
  }
  return null
}

const RenderComponentByName = ({ name }) => {
  const component = componentRegistry.find(
    (component) => component.name === name
  ) as ComponentRegistry
  return <component.component />
}

export default function Slug() {
  const data = useLoaderData<LoaderData>()

  return data.page.body.map((el) => <RenderComponentByName name={el} />)
}
