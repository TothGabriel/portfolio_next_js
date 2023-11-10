import Image from 'next/image'

function ProjectCard({ project }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 relative">
        {/* <img className="w-full" src={project.imageUrl} alt={project.title} /> */}
        <Image fill={true} src={project.imageUrl} alt={project.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{project.title}</div>
          <p className="text-gray-700 text-base">
            {project.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {project.tags.map((tag) => (
            <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProjectCard;
  
