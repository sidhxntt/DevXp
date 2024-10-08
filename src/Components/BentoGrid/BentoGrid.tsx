import { cn } from "../../lib/utils"
import { Link } from "react-router-dom"; 

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[20rem] sm:auto-rows-[22rem] md:auto-rows-[20rem] lg:md:auto-rows-[18rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-16",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  path,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer row-span-1 rounded-xl group/bento transition duration-200 shadow-none p-4 b border-white/[0.2] bg-black border justify-between flex flex-col space-y-4",
        className
      )}
    >
      <Link to={`${path}`}>
        {header}
        <div className="mt-2 group-hover/bento:translate-x-2 transition duration-200">
          {icon}
          <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-xs text-neutral-300">
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
};
