import { getUser } from "../utils/auth/hooks/getUser";
import AccountForm from "./account-form";

export default async function Account() {
  const user = await getUser();

  return <AccountForm user={user} />;
}
