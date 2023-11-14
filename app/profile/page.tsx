"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectFeed from "@components/ProjectFeed";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  

  const [myProjects, setMyProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        // 1. Fetch user role
        const UserResponse = await fetch(`/api/users/${session?.user.id}`);
        const UserData = await UserResponse.json();
       
        if (UserData.role === 'admin') {
          // 2. If user is admin, set isAdmin to true
          setIsAdmin(true);

          // 3. Fetch projects only if the user is admin
          const projectsResponse = await fetch('/api/projects');
          const projectsData = await projectsResponse.json();
          setMyProjects(projectsData);
        }
      } catch (error) {
        console.error('Error fetching role and projects:', error);
      }
    };

    if (session?.user.id) {
      fetchUserAndProjects();
    }
  }, [session?.user.id]);

  const handleEdit = (project) => {
    router.push(`/update-project?id=${project._id}`);
  };

  const handleDelete = async (project) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/project/${project._id.toString()}`, {
          method: "DELETE",
        });

        const filteredProjects = myProjects.filter((item) => item._id !== project._id);

        setMyProjects(filteredProjects);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional projects and inspire others with the power of your imagination'
      data={myProjects}
      isAdmin={isAdmin}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
    <p>test</p>
    </>

  );
};

export default MyProfile;
