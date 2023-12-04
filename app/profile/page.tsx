"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {session? (
        <Profile session={session} isAdmin={session?.user?.isAdmin} />
      ) : (
        "access fordbidden"
      )}
    </>
  );
};

export default MyProfile;
