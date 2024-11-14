import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

interface ChatWindowProps {
  userId: string;
  recipientId: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  senderName: string;
  senderAvatar?: string;
}

const ChatWindow = ({ userId, recipientId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    
    newSocket.on("connect", () => {
      newSocket.emit("join", { userId, recipientId });
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("error", (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId, recipientId]);

  const handleSendMessage = (content: string) => {
    if (socket) {
      socket.emit("sendMessage", {
        senderId: userId,
        recipientId,
        content,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <MessageList messages={messages} currentUserId={userId} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Card>
  );
};

export default ChatWindow;