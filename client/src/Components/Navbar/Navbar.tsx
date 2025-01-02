import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-[rgba(0,0,0,0.23)] backdrop-blur-md mb-12 p-4 z-50">
      <div className="flex items-center justify-end p-4 mx-auto max-w-7xl">
        <Link className="absolute left-14 mt-2 cursor-pointer" to="/">
          <img src="/Logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex items-center space-x-6">
        <button
          onClick={() => {
            navigate("/subscription");
          }}
          className="bg-transparent no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(138,43,226,0.6)_0%,rgba(138,43,226,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-0.5 px-4 ring-1 ring-white/10 ">
            <span>Subscribe</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        <Link
            className="text-white"
            to="https://shimmering-crepe-02d6ce.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
