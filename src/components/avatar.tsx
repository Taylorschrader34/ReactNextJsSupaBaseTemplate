"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../app/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({ url }: { url: Profiles["avatar_url"] }) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }
        
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  return (
    <div>
      {avatarUrl ? (
        <Image
          width={1}
          height={1}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full w-12 h-12"
        />
      ) : (
        <div className="avatar no-image rounded-lg w-12 h-12" />
      )}
    </div>
  );
}
