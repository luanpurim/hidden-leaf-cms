import { db } from "./db.server";

export function createPage(page: any) {
  return db.page.create({
    data: {
      title: 'asdfasf',
      slug: 'askdnfkasdnf',
      body: {a: 'b'}
    }
  })
}