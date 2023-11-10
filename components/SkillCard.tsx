import Image from "next/image";

function SkillCard({ skill }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 relative">
      {/* <img className="w-full" src={skill.imageUrl} alt={skill.title} /> */}
      <Image fill={true} src={skill.imageUrl} alt={skill.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{skill.title}</div>
        <p className="text-gray-700 text-base">{skill.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <ul>
          {skill.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SkillCard;
