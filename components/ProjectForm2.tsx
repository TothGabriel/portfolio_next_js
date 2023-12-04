import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from 'react-spinners';

const ProjectForm = ({
  type,
  project,
  setProject,
  submitting,
  handleSubmit,
}) => {
  // Assurez-vous que project.tags est toujours un tableau
  if (!project.tags) {
    setProject({ ...project, tags: [] });
  }

  return (
    <section className="w-full flex justify-center mt-5">
      <div className="container flex justify-center">
        <div className="shadow-lg flex flex-col p-5">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl flex flex-col gap-7 "
          >
            <label>
              <span>Titre du projet</span>
            </label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Votre Project
              </span>
            </label>
            <textarea
              value={project.content_short}
              onChange={(e) =>
                setProject({ ...project, content_short: e.target.value })
              }
              placeholder="Description du projet"
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Tags{" "}
                <span className="font-normal">
                  (#product, #webdevelopment, #idea, etc.)
                </span>
              </span>
            </label>
            <input
              value={project.tags.join(", ")} // Convertit le tableau de tags en une chaîne séparée par des virgules
              onChange={(e) =>
                setProject({
                  ...project,
                  tags: e.target.value.split(",").map((tag) => tag.trim()), // Convertit la chaîne en un tableau de tags
                })
              }
              type="text"
              placeholder="#Tags (séparées par des virgules)"
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm">
                Annuler
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                {type}
                {submitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <ClipLoader color="#fff" size={20} />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectForm;
