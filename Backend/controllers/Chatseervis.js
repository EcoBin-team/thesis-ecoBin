// chatService.js
import firebase from '../config/firebase'; // Adjust this import path to match your file structure
export async function fetchChats() {
const chats = [];
const chatSnapshot = await firebase.firestore()
.collection('chatrooms')
.get();
chatSnapshot.forEach((doc) => {
    const chatData = doc.data();
    chatData.id = doc.id; // Ensure the chat object has an id field
    chats.push(chatData);
    });
    return chats;
    }