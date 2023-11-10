'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import SkillCard from '@components/SkillCard';

function skillFeed() {
  const [skills, setskills] = useState([]);
  
  const test = {
    skill1 :{
      id : '1',
      title: 'skill 1',
      description: 'This is a description of the skill 1',
      imageUrl: 'https://placehold.co/600x400',
      tags:  [
        'React',
        'Next.js',
        'Tailwind',
        'Tailwind CSS'
      ]
    },
    skill2 :{
      id : '2',
      title: 'skill 2',
      description: 'This is a description of the skill 2',
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
    async function getskills() {
      // Décommentez les lignes suivantes lorsque l'API sera prête
      // const response = await fetch('/api/skills');
      // const data = await response.json();
      // setskills(data);
  
      // Utiliser les données de test pour le moment
      const skills = Object.values(test);
      setskills(skills);
    }
  
    getskills();
  }, []);

  return (
    <div className="w-full flex justify-center py-5">
      <div className="flex flex-wrap container gap-10">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default skillFeed;
