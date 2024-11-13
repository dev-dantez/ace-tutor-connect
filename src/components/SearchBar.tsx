import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for subjects or tutors..."
          className="w-full px-6 py-4 pl-12 rounded-full border border-secondary-dark focus:outline-none focus:border-primary-accent transition-colors bg-white/80 backdrop-blur-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/50 h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchBar;