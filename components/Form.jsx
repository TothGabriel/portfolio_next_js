import Link from "next/link";
import { useState } from "react";

const Form = ({ type, project, setProject, submitting, handleSubmit }) => {
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
              className="form_textarea"
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
              className="form_input"
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
                {submitting ? `${type}ing...` : type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
