"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@components/ProjectCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProjectCardList = ({
  data,
  handleTagClick,
  handleEdit,
  session,
  isAdmin,
}) => {
  return (
    <div className="flex flex-wrap gap-5">
      {data.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const ProjectFeed = () => {
  const [allProjects, setAllProjects] = useState([]);
  const router = useRouter();
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(allProjects.flatMap((project) => project.tags))
  );

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setAllProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterprojects = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allProjects.filter((item) => {
      const tagMatch = item.tags.some((tag) => regex.test(tag)); // Check if any tag matches the search
      return (
        regex.test(item.title) || tagMatch || regex.test(item.content_short)
      );
    });
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterprojects(tag);
    setSearchedResults(searchResult);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterprojects(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleClear = () => {
    setSearchText("");
    setSearchedResults([]);
    setSelectedTags([]);
  };

  return (
    <section className="feed">
      <div className="w-full flex justify-center">
        <div className="container">
          <form className="relative mb-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for a tag or a username"
                required
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {/* Boutons de filtrage par tag */}
          <div className="flex space-x-2 mb-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Bouton de réinitialisation */}
          {searchText || selectedTags.length > 0 ? (
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={handleClear}
            >
              Clear
            </button>
          ) : null}

          {/* All projects */}
          {searchText ? (
            <ProjectCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <ProjectCardList
              data={allProjects}
              handleTagClick={handleTagClick}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectFeed;
