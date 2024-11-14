import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const navigate = useNavigate();
  
  const { data: upcomingLessons } = useQuery({
    queryKey: ["tutor-upcoming-lessons"],
    queryFn: async () => {
      const response = await fetch("/api/bookings.php?type=tutor&status=upcoming");
      if (!response.ok) throw new Error("Failed to fetch upcoming lessons");
      return response.json();
    },
  });

  const { data: earnings } = useQuery({
    queryKey: ["tutor-earnings"],
    queryFn: async () => {
      const response = await fetch("/api/payments.php?type=earnings");
      if (!response.ok) throw new Error("Failed to fetch earnings");
      return response.json();
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingLessons?.map((lesson: any) => (
                <div key={lesson.id} className="p-2 border rounded">
                  <p className="font-medium">{lesson.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lesson.datetime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earnings?.total || "0.00"}
            </div>
            <p className="text-sm text-muted-foreground">
              This month: ${earnings?.monthly || "0.00"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/messages")}
            >
              View Messages
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorDashboard;