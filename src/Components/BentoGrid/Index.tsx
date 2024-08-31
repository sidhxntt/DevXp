import { BentoGrid, BentoGridItem } from "./BentoGrid";
import { SiTypescript, SiAnaconda, SiTensorflow } from "react-icons/si";
import { FaReact, FaCloud, FaBitcoin } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { DiLinux } from "react-icons/di";
import Image from "next/image";

interface SkeletonProps {
  image: string;
}

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

const Skeleton: React.FC<SkeletonProps> = ({ image }) => (
  <div className="relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <Image
      src={image}
      alt="Skeleton Image"
      layout="fill" // Ensures the image fills the container
      objectFit="cover" // Ensures the image covers the container without distortion
      className="absolute inset-0 w-full h-full"
    />
  </div>
);

const items = [
  {
    title: "Frontend Development",
    description: "Master essentials concepts needed for frontend development.",
    header: <Skeleton image="/Frontend.jpeg" />,
    icon: <FaReact className="h-4 w-4 text-neutral-500" />,
    path: "frontend",
  },
  {
    title: "Backend Development",
    description: "Master essentials concepts needed for backend development..",
    header: <Skeleton image={"/Backend.jpeg"}/>,
    icon: <SiTypescript className="h-4 w-4 text-neutral-500" />,
    path: "backend",
  },
  {
    title: "Devops",
    description: "Master essentials concepts needed for devops engineering.",
    header: <Skeleton image={"/Devops.jpeg"}/>,
    icon: <DiLinux className="h-4 w-4 text-neutral-500" />,
    path: "devops",
  },
  {
    title: "Machine Learning",
    description: "Master essentials concepts needed for machine learning.",
    header: <Skeleton image={"/ML.jpeg"}/>,
    icon: <SiAnaconda className="h-4 w-4 text-neutral-500" />,
    path: "machine-learning",
  },
  {
    title: "Cloud Computing",
    description: "Master essentials concepts needed for cloud computing.",
    header: <Skeleton  image={"/aws.jpeg"}/>,
    icon: <FaCloud className="h-4 w-4 text-neutral-500" />,
    path: "cloud-computing",
  },
  {
    title: "Database Management Systems",
    description: "Master essentials concepts needed for all kinds of DBMS.",
    header: <Skeleton image={"/db.jpeg"}/>,
    icon: <FaDatabase className="h-4 w-4 text-neutral-500" />,
    path: "dbms",
  },
  {
    title: "Deep Learning",
    description: "Master essentials concepts needed for deep learning.",
    header: <Skeleton image={"/DL.jpeg"}/>,
    icon: <SiTensorflow className="h-4 w-4 text-neutral-500" />,
    path: "deep-learning",
  },

];
