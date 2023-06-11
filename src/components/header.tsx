import { getUser } from "@/app/utils/auth/hooks/getUser";
import Navigation from "./navigation";

export default async function Header() {
  const user = await getUser();

  return <Navigation user={user} />;
}
