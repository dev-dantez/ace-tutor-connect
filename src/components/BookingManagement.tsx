import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BookingManagementProps {
  userId: string;
  userType: "student" | "tutor";
}

const BookingManagement = ({ userId, userType }: BookingManagementProps) => {
  const { toast } = useToast();

  const { data: bookings, refetch } = useQuery({
    queryKey: ["bookings", userId, userType],
    queryFn: async () => {
      const param = userType === "tutor" ? "tutor_id" : "student_id";
      const response = await fetch(`/api/bookings.php?${param}=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
  });

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings.php?id=${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error("Failed to update booking");
      
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>{userType === "tutor" ? "Student" : "Tutor"}</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.data?.map((booking: any) => (
            <TableRow key={booking.booking_id}>
              <TableCell>
                {new Date(booking.start_time).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {userType === "tutor" ? booking.student_name : booking.tutor_name}
              </TableCell>
              <TableCell>{booking.subject_name}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                {userType === "tutor" && booking.status === "pending" && (
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(booking.booking_id, "confirmed")}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(booking.booking_id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingManagement;