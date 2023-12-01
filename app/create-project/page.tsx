'use client'

import { useState, useEffect} from 'react';
import Image from 'next/image';
import ProjectForm from '@components/ProjectForm'

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    content_short: "",
    tags: [],
    // ... Autres champs nécessaires pour la création ...
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission pour la création
  };

  return (
    <>
    <ProjectForm
      type="Create"
      project={project}
      setProject={setProject}
      submitting={(e) => e.preventDefault()}
      handleSubmit={handleSubmit}
    />
    </>
  );
};


export default CreateProject;