import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";

interface TutorAvailabilityProps {
  tutorId: string;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const TutorAvailability = ({ tutorId }: TutorAvailabilityProps) => {
  const { toast } = useToast();
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  const mutation = useMutation({
    mutationFn: async (data: Record<string, string[]>) => {
      const response = await fetch(`/api/tutors.php?id=${tutorId}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update availability");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Availability updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    },
  });

  const handleTimeToggle = (day: string, time: string) => {
    setAvailability((prev) => {
      const dayTimes = prev[day] || [];
      const updated = dayTimes.includes(time)
        ? dayTimes.filter((t) => t !== time)
        : [...dayTimes, time];
      return { ...prev, [day]: updated };
    });
  };

  const handleSave = () => {
    mutation.mutate(availability);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Availability</h3>
      <div className="grid gap-4">
        {DAYS.map((day) => (
          <div key={day} className="space-y-2">
            <h4 className="font-medium">{day}</h4>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((time) => (
                <label
                  key={`${day}-${time}`}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    checked={(availability[day] || []).includes(time)}
                    onCheckedChange={() => handleTimeToggle(day, time)}
                  />
                  <span className="text-sm">{time}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleSave}
        className="mt-4"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Saving..." : "Save Availability"}
      </Button>
    </div>
  );
};

export default TutorAvailability;