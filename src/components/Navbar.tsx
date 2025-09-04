
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  // { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a href="#home" className="font-bold text-xl">
            <span className="gradient-text">NS</span>
          </a>

          {/* Navigation - Always compact */}
          <div className="flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Menu Dropdown - Works on all screen sizes */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[72px] bg-background/95 backdrop-blur-lg shadow-lg border-t border-border">
            <div className="flex flex-col p-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
