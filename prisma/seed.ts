import { register } from "../app/utils/session.server";

async function seed() {
  await register({username: 'admin', password: 'admin'})
}

seed()
