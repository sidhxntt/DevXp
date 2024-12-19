import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[rgba(0,0,0,0.23)] backdrop-blur-md mb-12  z-50">
      <div className="flex items-center justify-end mx-auto max-w-7xl">
        <div className="flex items-center space-x-6">
          <Link
            className="text-white"
            to="https://x.com/sidhxntt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </Link>
          <Link
            className="text-white"
            to="https://github.com/sidhxntt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-white"
            to="https://www.linkedin.com/in/siddhant-gupta-885384239/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="text-white"
            to="https://www.instagram.com/siddhant.xo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </Link>
        </div>
        </div>
    </footer>
  );
};

export default Footer;

