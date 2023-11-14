"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [projectData, setProjectData] = useState({ title: "", content_short: "", tags: [] });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        console.log(data);
        setProjectData({
          title: data.title,
          content_short: data.content_short,
          tags: data.tags || [], // Assurez-vous que tags est un tableau
        });
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!projectId) return alert("Missing ProjectId!");

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: projectData.title,
          content_short: projectData.content_short,
          tags: projectData.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
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
    <Form
      type="Edit"
      project={projectData}
      setProject={setProjectData}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

export default UpdateProject;
