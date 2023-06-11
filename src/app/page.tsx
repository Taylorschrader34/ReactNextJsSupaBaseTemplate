import { getUser } from "./utils/auth/hooks/getUser";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Welcome {user?.email}!</h1>
      </div>
    </div>
  );
}
