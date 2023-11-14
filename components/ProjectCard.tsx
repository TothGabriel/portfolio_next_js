"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ProjectCard = ({ project, handleEdit, handleDelete, handleTagClick, isAdmin }) => {
 
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  return (
    <div className="overflow-hidden shadow-lg m-4 relative">
      <Image
        src={project.imageUrl}
        alt="user_image"
        width={600}
        height={400}
        // fill={true}
        className=""
      />

      <div className="">
        <h3 className="font-semibold">
          {project.title}
        </h3>
        <p className="my-4 text-sm">
          {project.content_short}
        </p>
        {project.tags ? (
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {isAdmin === true && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
