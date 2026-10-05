import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/Components/ui/input-group";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu?.classList.toggle("hidden");
  };

  return (
    <header className="sticky top-0 bg-[rgba(0,0,0,0.23)] backdrop-blur-md p-6 z-50 text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-20 w-20">
            <img className="object-fill scale-150" src="/Logo.png" alt="logo" />
          </div>
        </Link>

        <form role="search" onSubmit={handleSearch} className="order-3 w-full min-w-0 md:order-3 md:ml-auto md:w-80">
          <InputGroup className="h-11 overflow-hidden rounded-xl border-white/20 bg-white/10 p-1 text-white backdrop-blur-md focus-within:border-white/40">
            <InputGroupInput
              type="text"
              role="searchbox"
              aria-label="Search DevXP blogs"
              placeholder="Search blogs"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-full min-w-0 px-3 text-white placeholder:text-neutral-300"
            />
            <InputGroupAddon align="inline-end" className="h-full shrink-0 !mr-0 py-0 pr-0">
              <InputGroupButton
                type="submit"
                size="sm"
                className="h-full rounded-lg border border-white bg-white px-4 font-medium text-black shadow-none hover:bg-white/90 hover:text-black focus-visible:border-white focus-visible:ring-white/70"
              >
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>

        <div className="order-2 flex items-center space-x-4 md:order-3">
          {/* Desktop Navigation Links */}


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

        </div>
      </div>
    </header>
  );
};

export default Navbar;
