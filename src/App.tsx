import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BookingCalendar from "./components/BookingCalendar";
import BookingManagement from "./components/BookingManagement";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TutorDashboard from "./components/Dashboard/TutorDashboard";
import ChatWindow from "./components/Chat/ChatWindow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/bookings" element={<BookingManagement userId="1" userType="student" />} />
          <Route path="/tutor/:id/book" element={<BookingCalendar tutorId="1" onBookingConfirmed={() => {}} />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/tutor" element={<TutorDashboard />} />
          <Route path="/messages/:recipientId" element={<ChatWindow userId="1" recipientId=":recipientId" />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;