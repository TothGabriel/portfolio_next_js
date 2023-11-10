import Image from "next/image";
import Hero from '@components/Hero'
import ProjectFeed from '@components/ProjectFeed'
import SkillFeed from "@components/SkillFeed";

// export default function Home() {
//   return (
//     <>
//       <Hero/>
//       <ProjectFeed/>
//       <SkillFeed/>
//     </>
//   );
// }

const Home = () => {
  return (
    <>
      <Hero/>
      <ProjectFeed/>
      <SkillFeed/>
    </>
  );
}

export default Home;