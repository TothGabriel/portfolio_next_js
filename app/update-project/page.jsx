"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({ project: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();

      setProject({
        project: data.project,
        tag: data.tag,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!projectId) return alert("Missing ProjectId!");

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          project: project.project,
          tag: project.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      project={project}
      setProject={setProject}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

export default UpdateProject;
