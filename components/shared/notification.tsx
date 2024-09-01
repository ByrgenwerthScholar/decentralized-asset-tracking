// components/NotificationBell.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bell } from 'lucide-react';

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3003'); // Adjust the WebSocket URL to match your server's address

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      toast.info(`Notification: ${message}`, {
        position: 'top-right', // Set the position using a string
        autoClose: 5000,
      });
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-600" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default NotificationBell;
