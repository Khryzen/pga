import "./App.css";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useRef, useEffect, useState } from "react";

function App() {
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

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
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Flowbite
            </span>
          </a>
          <div className="flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button className="bg-white text-black px-5 py-2 rounded cursor-pointer">
              Share
            </button>
            <button className="bg-[#588de9] text-white px-5 py-2 rounded cursor-pointer">
              Contact
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-open-sans font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
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
