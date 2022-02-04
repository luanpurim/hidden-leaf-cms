import { createPage } from "../app/utils/pages";
import { register } from "../app/utils/session.server";

async function seed() {
  // await register({username: 'admin', password: 'admin'})
  await createPage({
        title: 'aaa',
        slug: 'aaa',
        body: [
          {
            uuid: 'a3162ab4-88f8-427d-a8da-b7d8b1c86826',
            props: 'aaa',
            name: 'Heading 2'
          }
        ]
    })
}

seed()
