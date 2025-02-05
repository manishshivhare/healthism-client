import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navItems = [
    { label: "WHO WE ARE", to: "/about" },
    { label: "BEHIND HEALTHISM", to: "/satvik-pandey" },
    { label: "CLASSES", to: "/classes" },
  ];

  const navigate = useNavigate();

  const handleJoinUs = () => {
    navigate("/contact");
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div>
      <div className=" flex flex-col">
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? "py-1 sm:py-2" : "py-2 sm:py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center backdrop-blur-sm shadow-lg rounded-full px-2 py-1 sm:py-2 bg-black/30">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="font-bold text-2xl tracking-wider">
                  <img
                    className="w-auto h-[1rem] sm:h-[2rem] md:h-[2.5rem]"
                    src="https://res.cloudinary.com/dzbuyze8t/image/upload/v1738736280/vtmphojr7qkmjsvc5t5i.png"
                    alt="Healthism"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-white hover:text-orange-400 transition-all duration-200 text-sm lg:text-md font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-200 group-hover:w-full" />
                  </Link>
                ))}

                <button
                  onClick={handleJoinUs}
                  className="text-white text-xs sm:text-sm lg:text-md font-bold px-4 sm:px-6 py-2 rounded-full
                    border-2 border-orange-400 hover:bg-orange-400 
                    transition-all duration-300 transform hover:scale-105"
                >
                  JOIN US
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white p-1 hover:text-orange-400 transition-all"
                  aria-label="Toggle navigation menu"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="md:hidden fixed inset-0 bg-black/80 z-40">
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-[90%] max-w-md bg-black/70 backdrop-blur-lg rounded-3xl p-4 sm:p-6 
                  transition-all duration-300"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block text-center text-white hover:text-orange-400 
                        text-base sm:text-lg font-medium transition-colors py-2 sm:py-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/contact"
                      className="block mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white 
                      text-base sm:text-lg font-medium rounded-full text-center 
                      hover:bg-orange-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      JOIN US
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main content container */}
        <main className="flex-grow pt-16 sm:pt-20 md:pt-32 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default NavbarLayout;
