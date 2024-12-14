import { ref, push, get, query, orderByChild, equalTo, set } from 'firebase/database';
import { database } from './config';

// Create a new chat room
export const createChat = async (participants) => {
  try {
    const chatsRef = ref(database, 'chats');
    const newChatRef = push(chatsRef);
    
    await set(newChatRef, {
      participants,
      createdAt: Date.now()
    });
    
    return newChatRef.key;
  } catch (error) {
    throw error;
  }
};

// Get chat details
export const getChat = async (chatId) => {
  try {
    const chatRef = ref(database, `chats/${chatId}`);
    const snapshot = await get(chatRef);
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

// Get user's chats
export const getUserChats = async (userId) => {
  try {
    const chatsRef = ref(database, 'chats');
    const userChatsQuery = query(
      chatsRef,
      orderByChild(`participants/${userId}`),
      equalTo(true)
    );
    
    const snapshot = await get(userChatsQuery);
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};