import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
  tutorId: string;
  onBookingConfirmed: () => void;
}

const BookingCalendar = ({ tutorId, onBookingConfirmed }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const { data: tutorAvailability } = useQuery({
    queryKey: ["tutor-availability", tutorId],
    queryFn: async () => {
      const response = await fetch(`/api/tutors.php?id=${tutorId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      return response.json();
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await fetch("/api/bookings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
      onBookingConfirmed();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive",
      });
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    if (!selectedDate) return;
    
    bookingMutation.mutate({
      tutor_id: tutorId,
      start_time: selectedDate,
      end_time: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour session
    });
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
      />
      <Button 
        onClick={handleBooking}
        disabled={!selectedDate || bookingMutation.isPending}
        className="w-full"
      >
        {bookingMutation.isPending ? "Booking..." : "Book Session"}
      </Button>
    </div>
  );
};

export default BookingCalendar;