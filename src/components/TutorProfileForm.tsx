import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface TutorProfileFormProps {
  tutor: any;
}

const TutorProfileForm = ({ tutor }: TutorProfileFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bio: tutor?.bio || "",
      hourly_rate: tutor?.hourly_rate || "",
      education: tutor?.education || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/tutors.php?id=${tutor.tutor_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <Textarea {...register("bio")} placeholder="Tell us about yourself" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
        <Input
          type="number"
          {...register("hourly_rate")}
          placeholder="Enter your hourly rate"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Education</label>
        <Textarea
          {...register("education")}
          placeholder="Enter your educational background"
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default TutorProfileForm;