"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import ProjectForm from "@components/ProjectForm";

const UpdateProject = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    content_short: "",
    tags: [],
  });
  const [submitting, setIsSubmitting] = useState(false);

  const getProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        content_short: data.content_short,
        tags: data.tags || [], // Assurez-vous que tags est un tableau
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    console.log(projectId);
    if (projectId) getProjectDetails();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!projectId) return alert("Missing ProjectId!");

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: project.title,
          content_short: project.content_short,
          tags: project.tags,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        console.error("Error updating project:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {session?.user?.isAdmin ? (
        <ProjectForm
          type="Mettre à jour"
          project={project}
          setProject={setProject}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      ) : (
        "Access forbidden"
      )}
      ;
    </>
  );
};

export default UpdateProject;
