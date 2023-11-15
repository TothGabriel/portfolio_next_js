import ProjectCard from "./ProjectCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, isAdmin }) => {
  // console.log(data);
  return (
    <section className="w-full flex justify-center mt-5">
      <div className="container">
        <h1 className="text-left">
          <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left">{desc}</p>

        <div className="mt-10 flex justify-between flex-wrap">
          {data.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              isAdmin={isAdmin}
              handleEdit={() => handleEdit && handleEdit(project)}
              handleDelete={() => handleDelete && handleDelete(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
