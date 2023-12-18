"use client";

import Image from "next/image";
import Hero from "@components/Hero";
import ProjectFeed from "@components/ProjectFeed";
import SkillFeed from "@components/SkillFeed";
import CommentFeed from "@components/CommentFeed";
import CommentForm from "@components/CommentForm";
import Contact from "@components/Contact";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Hero />
      <ProjectFeed session={session} isAdmin={session?.user?.isAdmin}/>
      <SkillFeed session={session} isAdmin={session?.user?.isAdmin} />
      <CommentFeed session={session} isAdmin={session?.user?.isAdmin}/>
      <Contact/>
    </>
  );
};

export default Home;
