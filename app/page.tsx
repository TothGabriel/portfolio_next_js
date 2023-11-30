"use client";

import Image from "next/image";
import Hero from "@components/Hero";
import ProjectFeed from "@components/ProjectFeed";
import SkillFeed from "@components/SkillFeed";
import CommentFeed from "@components/CommentFeed";
import CommentForm from "@components/CommentForm";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
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
      <Hero />
      <ProjectFeed />
      <SkillFeed />
      <CommentFeed />
      {session?.user?.id ? (
        <>
          <CommentForm session={session} />
        </>
      ) : (
        <>
          {/* {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="btn btn-1 me-3"
              >
                Se connecter
              </button>
            ))} */}
        </>
      )}
    </>
  );
};

export default Home;
