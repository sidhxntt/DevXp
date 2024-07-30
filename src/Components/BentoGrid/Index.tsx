import { BentoGrid, BentoGridItem } from "./BentoGrid";
import { SiTypescript, SiAnaconda, SiTensorflow } from "react-icons/si";
import { FaReact, FaAws, FaCloud, FaBitcoin } from "react-icons/fa";
import { DiLinux } from "react-icons/di";
import { VscVscodeInsiders } from "react-icons/vsc";

export function BentoGridDemo() {
  return (
    <BentoGrid className="w-screen h-sv">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          path={item.path}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({ image }) => (
  <div className="relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={image}
      alt="Skeleton Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);

const items = [
  {
    title: "Frontend Development",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton image="/Frontend.jpeg" />,
    icon: <FaReact className="h-4 w-4 text-neutral-500" />,
    path: "frontend",
  },
  {
    title: "Backend Development",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton image={"/Backend.jpeg"}/>,
    icon: <SiTypescript className="h-4 w-4 text-neutral-500" />,
    path: "backend",
  },
  {
    title: "Devops",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton image={"/Devops.jpeg"}/>,
    icon: <DiLinux className="h-4 w-4 text-neutral-500" />,
    path: "devops",
  },
  {
    title: "Machine Learning",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton image={"/ML.jpeg"}/>,
    icon: <SiAnaconda className="h-4 w-4 text-neutral-500" />,
    path: "machine-learning",
  },
  {
    title: "AWS",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton  image={"/aws.jpeg"}/>,
    icon: <FaAws className="h-4 w-4 text-neutral-500" />,
    path: "aws",
  },
  {
    title: "System Design",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton image={"/sd.jpeg"}/>,
    icon: <FaCloud className="h-4 w-4 text-neutral-500" />,
    path: "system-design",
  },
  {
    title: "Web 3.0",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton image={"/web3.jpeg"}/>,
    icon: <FaBitcoin className="h-4 w-4 text-neutral-500" />,
    path: "web3",
  },
  {
    title: "Productivity",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton image={"/productivity.jpeg"}/>,
    icon: <VscVscodeInsiders className="h-4 w-4 text-neutral-500" />,
    path: "productivity",
  },
  {
    title: "Deep Learning",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton image={"/DL.jpeg"}/>,
    icon: <SiTensorflow className="h-4 w-4 text-neutral-500" />,
    path: "productivity",
  },

];
