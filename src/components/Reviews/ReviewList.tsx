import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewListProps {
  tutorId: string;
}

const ReviewList = ({ tutorId }: ReviewListProps) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', tutorId],
    queryFn: async () => {
      const response = await fetch(`/api/reviews.php?tutor_id=${tutorId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="space-y-4">
      {reviews?.data.map((review: any) => (
        <Card key={review.review_id}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                by {review.first_name} {review.last_name}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <div className="text-sm text-gray-500 mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;