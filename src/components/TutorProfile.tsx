import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import TutorAvailability from "./TutorAvailability";
import TutorSubjects from "./TutorSubjects";
import TutorProfileForm from "./TutorProfileForm";

interface TutorProfileProps {
  tutorId: string;
}

const TutorProfile = ({ tutorId }: TutorProfileProps) => {
  const { toast } = useToast();
  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", tutorId],
    queryFn: async () => {
      const response = await fetch(`/api/tutors.php?id=${tutorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tutor profile");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <img
              src={tutor?.profile_image || "/placeholder.svg"}
              alt={`${tutor?.first_name} ${tutor?.last_name}`}
            />
          </Avatar>
          <div>
            <CardTitle>{`${tutor?.first_name} ${tutor?.last_name}`}</CardTitle>
            <p className="text-sm text-gray-500">{tutor?.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <TutorProfileForm tutor={tutor} />
          <TutorAvailability tutorId={tutorId} />
          <TutorSubjects tutorId={tutorId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorProfile;