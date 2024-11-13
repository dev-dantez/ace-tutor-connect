import { useState, useEffect } from "react";
import { Search, GraduationCap } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "glass-card py-4" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary-accent" />
          <span className="text-xl font-semibold text-primary">ACE</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-primary hover:text-primary-accent transition-colors">Find Tutors</a>
          <a href="#" className="text-primary hover:text-primary-accent transition-colors">Subjects</a>
          <a href="#" className="text-primary hover:text-primary-accent transition-colors">How it Works</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="h-5 w-5 text-primary" />
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-accent transition-colors">
            Become a Tutor
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;