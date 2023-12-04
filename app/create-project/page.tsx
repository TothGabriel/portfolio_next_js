"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectForm from "@components/ProjectForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateProject = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [project, setProject] = useState({
    title: "",
    content_short: "",
    tags: [],
    // ... Autres champs nécessaires pour la création ...
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique de soumission pour la création
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/projects/new`, {
        method: "POST",
        body: JSON.stringify({
          title: project.title,
          content_short: project.content_short,
          tags: project.tags,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        console.error("Error creating project:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {session?.user?.isAdmin ? (
        <ProjectForm
          type="Créer"
          project={project}
          setProject={setProject}
          submitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      ) : (
        "Access forbidden"
      )}
    </>
  );
};

export default CreateProject;
