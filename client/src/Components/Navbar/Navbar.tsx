import { Link } from "react-router-dom";

const Navbar = () => {

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu?.classList.toggle("hidden");
  };

  return (
    <header className="sticky top-0 bg-[rgba(0,0,0,0.23)] backdrop-blur-md p-6 z-50 text-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-20 w-20">
            <img className="object-fill scale-150" src="/Logo.png" alt="logo" />
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            <Link
              to="https://handler.devxp.in/"
              target="_blank"
              className="text-sm font-medium hover:underline"
            >
              Connect with me
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden flex items-center px-2"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="hidden absolute top-16 left-0 right-0 bg-white shadow-md rounded-lg p-4 space-y-4 md:hidden"
        >
          <button
            className="self-end flex items-center px-2 text-gray-600"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link
            to="https://handler.devxp.in/"
            target="_blank"
            className="block text-sm font-medium text-gray-800 hover:underline"
          >
            Connect with me
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
