"use client";

import { useState, useEffect } from "react";

import ProjectCard from "@components/ProjectCard";

const ProjectCardList = ({ data, handleTagClick }) => {
  return (
    <div className="flex flex-wrap">
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

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    console.log(data);
    // Utiliser les données de test pour le moment
    // const projects = Object.values(test);
    // setAllProjects(projects);

    setAllProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterprojects = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allProjects.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.tags) ||
        regex.test(item.content_short)
    );
  };

  const handleSearchChange = (e) => {
    e.preventDefault()
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

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterprojects(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <div className="w-full flex justify-center">
        <div className="container">
          <form className="relative">
            <input
              type="text"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="search_input peer"
            />
          </form>
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
