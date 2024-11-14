import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  tutorId: string;
  bookingId: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ tutorId, bookingId, onSuccess }: ReviewFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = React.useState(0);

  const submitReview = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/reviews.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutor_id: tutorId,
          booking_id: bookingId,
          rating,
          comment: data.comment,
        }),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Review submitted',
        description: 'Thank you for your feedback!',
      });
      reset();
      setRating(0);
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => submitReview.mutate(data))} className="space-y-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      
      <Textarea
        {...register('comment', { required: true })}
        placeholder="Write your review..."
        className="min-h-[100px]"
      />
      
      <Button 
        type="submit" 
        disabled={rating === 0 || submitReview.isPending}
      >
        {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;