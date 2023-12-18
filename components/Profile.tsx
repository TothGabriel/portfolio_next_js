// Importez les dépendances nécessaires
import { useEffect, useState } from "react";
import { Tabs } from "flowbite";
import Image from "next/image";
import ProjectCard from "@components/ProjectCard";
import CommentFeed from "@components/CommentFeed";
import { usePathname, useRouter } from "next/navigation";

const Profile = ({ session, isAdmin }) => {
  const router = useRouter();

  useEffect(() => {
    // Sélectionnez les éléments DOM nécessaires
    const tabsElement = document.getElementById("tabs");

    // Créez un tableau d'objets représentant vos onglets
    const tabElements = [
      {
        id: "profile",
        triggerEl: document.getElementById("profile-tab"),
        targetEl: document.getElementById("profile"),
      },
      {
        id: "projects",
        triggerEl: document.getElementById("projects-tab"),
        targetEl: document.getElementById("projects"),
      },
      {
        id: "comments",
        triggerEl: document.getElementById("comments-tab"),
        targetEl: document.getElementById("comments"),
      },
      // ... Ajoutez les autres onglets de la même manière
    ];

    // Options pour les onglets
    const options = {
      defaultTabId: "profile", // ID de l'onglet par défaut
      // Autres options si nécessaire
    };

    // Options d'instance pour les onglets
    const instanceOptions = {
      id: "tabs",
      override: true,
    };

    // Créez l'instance de Tabs
    const tabs = new Tabs(tabsElement, tabElements, options, instanceOptions);

    // Nettoyez l'instance lorsqu'elle n'est plus utilisée
    return () => {
      tabs.destroy();
    };
  }, []); // Assurez-vous que cela se déclenche une seule fois après le rendu initial

  const [allProjects, setAllProjects] = useState([]);
  const [MyComments, setMyComments] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setAllProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMyComments = async () => {
    try {
      const response = await fetch(`/api/comments/getCommentsByUserId/${session?.user?.id}`);
      const data = await response.json();
      setMyComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  

  useEffect(() => {
    if (isAdmin === true) {
      fetchProjects();
    }
    fetchMyComments();
  }, [session]);

  const createProject = () => {
    router.push(`/create-project`);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="container">
        <div className="md:flex">
          <ul
            id="tabs"
            role="tablist"
            className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
          >
            {/* Onglets */}
            <li>
              <a
                id="profile-tab"
                href="#"
                className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
              >
                {/* Icone */}
                <svg
                  className="w-4 h-4 me-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                Mon profil
              </a>
            </li>
            <li>
              <a
                id="projects-tab"
                href="#"
                className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
              >
                {/* Icone */}
                <svg
                  className="w-4 h-4 me-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                Mes projets
              </a>
            </li>
            <li>
              <a
                id="comments-tab"
                href="#"
                className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
              >
                {/* Icone */}
                <svg
                  className="w-4 h-4 me-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                Mes commentaires
              </a>
            </li>
            {/* Ajoutez les autres onglets de la même manière */}
          </ul>

          {/* Contenu des onglets */}
          <div
            className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* Contenu de l'onglet Profile */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mon profil
            </h3>
            <p className="mb-2">Bienvenue dans votre espace de connextion</p>
            <Image
              width={60}
              height={60}
              className="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-5.jpg"
              alt="Rounded avatar"
            />
          </div>

          {isAdmin ? (
            <div
              className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
              id="projects"
              role="tabpanel"
              aria-labelledby="project-tab"
            >
              {/* Contenu de l'onglet Profile */}
              <div className="flex justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Mes projets
                </h3>
                <button
                  onClick={createProject}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Créer un projet
                </button>
              </div>



              <div className="flex flex-wrap gap-5">
                {allProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
            id="comments"
            role="tabpanel"
            aria-labelledby="comments-tab"
          >
            {/* Contenu de l'onglet Profile */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mes commentaires
            </h3>
            <CommentFeed session={session} comments={MyComments}/>
          </div>

          {/* Ajoutez les autres contenus d'onglets de la même manière */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
