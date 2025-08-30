import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useRef, useEffect, useState } from "react";

type SchoolDetails = {
  school: string;
  logo: string;
};

function App() {
  const [content, setContent] = useState<SchoolDetails | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/school.json`)
      .then((res) => res.json())
      .then(setContent);
  }, []);

  // Favicon
  useEffect(() => {
    if (!content?.logo) return;
    let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!favicon) {
      favicon = document.querySelector<HTMLLinkElement>(
        "link[rel='shortcut icon']"
      );
    }

    if (favicon) {
      favicon.href = `${import.meta.env.BASE_URL}${content.logo.replace(
        /^\//,
        ""
      )}`;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = `${import.meta.env.BASE_URL}${content.logo.replace(
        /^\//,
        ""
      )}`;
      document.head.appendChild(newFavicon);
    }
  }, [content]);

  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const basename = import.meta.env.MODE === "production" ? "/pga" : "/";

  return (
    <BrowserRouter basename={basename}>
      {/* Navbar */}
      <nav
        ref={navRef}
        className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={`${import.meta.env.BASE_URL}${content?.logo.replace(
                /^\//,
                ""
              )}`}
              className="h-8"
              alt="School Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {content?.school}
            </span>
          </a>

          {/* Buttons + Hamburger */}
          <div className="flex items-center gap-2 md:order-2">
            <button className="hidden lg:block bg-white text-black px-5 py-2 rounded cursor-pointer border border-gray-300">
              Share
            </button>
            <button className="hidden lg:block bg-[#588de9] text-white px-5 py-2 rounded cursor-pointer">
              Contact
            </button>

            {/* Hamburger button (visible on mobile) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close icon
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
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
              ) : (
                // Hamburger icon
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-open-sans font-medium border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link to="/" className="block py-2 px-3 text-blue-700">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-700"
                >
                  Activities & Events
                </Link>
              </li>
              <li>
                <Link
                  to="/faculty"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-700"
                >
                  Faculty
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-700"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-700"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content wrapper with dynamic margin */}
      <div style={{ marginTop: navHeight }}>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/events" element={<div>Events</div>} />
          <Route path="/faculty" element={<div>Faculty</div>} />
          <Route path="/admissions" element={<div>Admissions</div>} />
          <Route path="/contact-us" element={<div>Contact Us</div>} />
          <Route path="/admin" element={<div>Admin</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
