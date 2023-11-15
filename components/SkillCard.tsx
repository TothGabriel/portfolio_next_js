import Image from "next/image";

function SkillCard({ skill }) {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* <img className="w-full" src={skill.imageUrl} alt={skill.title} /> */}
      {/* <Image fill={true} src={skill.imageUrl} alt={skill.title} /> */}
      <div className="">
        <div className="font-bold text-xl mb-2">{skill.title}</div>
        <p className="text-gray-700 text-base">{skill.description}</p>
      </div>
      <div className="">
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
