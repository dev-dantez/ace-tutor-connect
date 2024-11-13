import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FeaturedTutors from "../components/FeaturedTutors";
import SubjectGrid from "../components/SubjectGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <div className="relative -mt-8 px-4 z-20">
        <SearchBar />
      </div>
      <FeaturedTutors />
      <SubjectGrid />
    </div>
  );
};

export default Index;