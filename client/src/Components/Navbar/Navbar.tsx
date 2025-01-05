import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const DisplayPic = () => (
  <header className="text-white">
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const template = "DevXPUserInfo";
        const token = await getToken({ template });
        if (token) {
          setDisplay(true);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };

    fetchToken();
  }, [getToken]);

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
            {display && (
              <Link
                to="/favourites"
                className="text-sm font-medium hover:underline"
              >
                Your Favourites
              </Link>
            )}
          </nav>

          {/* User Section */}
          <DisplayPic />

          {/* Subscribe Button */}
          <button
            onClick={() => navigate("/subscription")}
            className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>

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
          {display && (
            <Link
              to="/favourites"
              className="block text-sm font-medium text-gray-800 hover:underline"
            >
              Your Favourites
            </Link>
          )}

          <button
            onClick={() => navigate("/subscription")}
            className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
