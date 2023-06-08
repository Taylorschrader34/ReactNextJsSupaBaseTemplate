"use client";

import Link from "next/link";
import FullLogo from "../assets/images/example.png";
import Image from "next/image";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../app/database.types";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";

export default function Navigation({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getAvatarUrl = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      alert("Error loading user data!");
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      getAvatarUrl();
    }
  }, [user, getAvatarUrl]);

  return (
    <header className="bg-white rounded-b-lg p-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <Image src={FullLogo} alt="Logo" className="rounded-lg w-12 h-12" />
          </Link>
          <nav>
            <ul className="flex space-x-4 flex-wrap">
              <li>
                <Link href="/" className="text-black font-bold">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {session?.user ? (
          <Link href={"/account"} className="">
            <Avatar url={avatar_url} />
          </Link>
        ) : (
          <Link href="/signup" className="text-black font-bold">
            <button> Sign Up</button>
          </Link>
        )}
      </div>
    </header>
  );
}
