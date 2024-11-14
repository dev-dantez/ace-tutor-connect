import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TutorSubjectsProps {
  tutorId: string;
}

const TutorSubjects = ({ tutorId }: TutorSubjectsProps) => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [experienceYears, setExperienceYears] = React.useState("");
  const [hourlyRate, setHourlyRate] = React.useState("");

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await fetch("/api/subjects.php");
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `/api/subjects.php?tutor_id=${tutorId}&subject_id=${selectedSubject}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add subject");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Subject added successfully",
      });
      setSelectedSubject("");
      setExperienceYears("");
      setHourlyRate("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add subject",
        variant: "destructive",
      });
    },
  });

  const handleAddSubject = () => {
    if (!selectedSubject || !experienceYears || !hourlyRate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({
      experience_years: parseInt(experienceYears),
      hourly_rate: parseFloat(hourlyRate),
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Subjects</h3>
      <div className="grid gap-4">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects?.data?.map((subject: any) => (
              <SelectItem key={subject.subject_id} value={subject.subject_id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Years of experience"
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Hourly rate ($)"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
        <Button onClick={handleAddSubject} disabled={mutation.isPending}>
          {mutation.isPending ? "Adding..." : "Add Subject"}
        </Button>
      </div>
    </div>
  );
};

export default TutorSubjects;