"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@components/ProjectCard";
import { useSession } from "next-auth/react";


const ProjectCardList = ({ data, handleTagClick, isAdmin }) => {
  return (
    <div className="flex flex-wrap">
      {data.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleTagClick={handleTagClick}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

const ProjectFeed = () => {
  const [allProjects, setAllProjects] = useState([]);
  const { data: session } = useSession();
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    // console.log(data);
    setAllProjects(data);
  };
  
  const fetchUserRole = async () => {
    const response = await fetch(`/api/users/${session?.user.id}`);
    const data = await response.json();
    console.log(data);
    console.log(session);
    if (data.role === "admin") setIsAdmin(true);
  };

  useEffect(() => {
    fetchUserRole();
    fetchProjects();
    
    console.log(isAdmin);
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
              isAdmin={isAdmin}
              handleTagClick={handleTagClick}
            />
          ) : (
            <ProjectCardList
              data={allProjects}
              isAdmin={isAdmin}
              handleTagClick={handleTagClick}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectFeed;
