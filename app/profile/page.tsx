"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myProjects, setMyProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const fetchUserRole = async () => {
    try {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session.user.id}`);
        const data = await response.json();
        if (data.role === "admin") setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [session]);

  

  return (
    <>
    <Profile
      session={session}
      isAdmin={isAdmin}
    />
    </>

  );
};

export default MyProfile;
