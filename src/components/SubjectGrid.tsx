import { Book, Code, Calculator, Globe, Microscope, Palette } from "lucide-react";

const SubjectGrid = () => {
  const subjects = [
    { icon: Calculator, name: "Mathematics", count: "250+ Tutors" },
    { icon: Code, name: "Computer Science", count: "180+ Tutors" },
    { icon: Globe, name: "Languages", count: "320+ Tutors" },
    { icon: Book, name: "Literature", count: "150+ Tutors" },
    { icon: Microscope, name: "Sciences", count: "200+ Tutors" },
    { icon: Palette, name: "Arts", count: "120+ Tutors" }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-primary-accent font-medium">Browse by Subject</span>
          <h2 className="text-4xl font-bold text-primary mt-2">Discover Your Perfect Match</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <div
                key={index}
                className="glass-card hover-lift p-6 rounded-2xl animate-fade-up flex items-center space-x-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-soft p-4 rounded-xl">
                  <Icon className="h-6 w-6 text-primary-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{subject.name}</h3>
                  <p className="text-sm text-primary/60">{subject.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectGrid;