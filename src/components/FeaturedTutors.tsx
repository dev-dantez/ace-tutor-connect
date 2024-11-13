import TutorCard from "./TutorCard";

const FeaturedTutors = () => {
  const tutors = [
    {
      name: "Sarah Chen",
      subject: "Mathematics",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "David Park",
      subject: "Physics",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Emma Wilson",
      subject: "Literature",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-primary-accent font-medium">Featured Tutors</span>
          <h2 className="text-4xl font-bold text-primary mt-2">Learn from Expert Tutors</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TutorCard {...tutor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;