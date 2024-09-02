import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-[rgba(0,0,0,0.23)] backdrop-blur-md mb-12 p-4 z-50">
      <div className="flex items-center justify-end p-4 mx-auto max-w-7xl">
        <Link className="absolute left-14 mt-2 cursor-pointer" to="/">
          <img src="/Logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex items-center space-x-6">
          <a className="text-white" href="https://x.com/sidhxntt" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
          <a className="text-white" href="https://github.com/sidhxntt" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a className="text-white" href="https://www.linkedin.com/in/siddhant-gupta-885384239/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a className="text-white" href="https://www.instagram.com/siddhant.xo/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
