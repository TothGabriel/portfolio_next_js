'use client'

import { useState, useEffect } from 'react';
import ProjectCard from '@components/ProjectCard';

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  
  const test = {
    project1 :{
      id : '1',
      title: 'Project 1',
      description: 'This is a description of the project 1',
      imageUrl: 'https://placehold.co/600x400',
      tags:  [
        'React',
        'Next.js',
        'Tailwind',
        'Tailwind CSS'
      ]
    },
    project2 :{
      id : '2',
      title: 'Project 2',
      description: 'This is a description of the project 2',
      imageUrl: 'https://placehold.co/600x400',
      tags:  [
        'React',
        'Next.js',
        'Tailwind',
        'Tailwind CSS'
      ]
    }
  }

  useEffect(() => {
    async function getProjects() {
      // Décommentez les lignes suivantes lorsque l'API sera prête
      // const response = await fetch('/api/projects');
      // const data = await response.json();
      // setProjects(data);
  
      // Utiliser les données de test pour le moment
      const projects = Object.values(test);
      setProjects(projects);
    }
  
    getProjects();
  }, []);

  return (
    <div className="w-full flex justify-center py-5">
      <div className="flex flex-wrap container gap-10">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectFeed;
