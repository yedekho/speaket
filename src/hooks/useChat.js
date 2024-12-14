import { useEffect, useState } from 'react';
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';
import { database } from '../firebase/config';

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);

    // Listen for new messages in real-time
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value
          }))
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messageList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => off(messagesRef);
  }, [chatId]);

  const sendMessage = async (content, senderId) => {
    try {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      await push(messagesRef, {
        content,
        senderId,
        timestamp: serverTimestamp() // Use server timestamp for better synchronization
      });
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  return { messages, loading, sendMessage };
};