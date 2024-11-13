interface TutorCardProps {
  name: string;
  subject: string;
  rating: number;
  image: string;
}

const TutorCard = ({ name, subject, rating, image }: TutorCardProps) => {
  return (
    <div className="glass-card hover-lift rounded-2xl overflow-hidden">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <span className="text-sm text-primary-accent font-medium">{subject}</span>
        <h3 className="text-xl font-semibold text-primary mt-2">{name}</h3>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-primary-accent" : "text-secondary-dark"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-primary/60">{rating}.0</span>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;