const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-soft to-white opacity-50" />
      
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-primary-accent font-medium mb-6">
            Transform Your Learning Journey
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Learn from the Best
            <br />
            <span className="text-primary-accent">Excel with ACE</span>
          </h1>
          
          <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
            Connect with expert tutors who are passionate about helping you achieve your academic goals. Personalized learning experiences tailored just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-accent transition-colors">
              Find Your Tutor
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-full hover:bg-secondary transition-colors">
              Explore Subjects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;