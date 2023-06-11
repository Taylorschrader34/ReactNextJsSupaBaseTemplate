import { getSession } from "./getSession";

export async function getUser() {
  const session = await getSession();
  const user = session?.user;

  return user;
}
