// ChatList data fetching config/chatservice.js
/*
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, StyleSheet } from 
'react-native';
import { fetchChats } from '../config/chatService'; // Adjust this import 
path to match your file structure
export default function ChatList({ navigation }) {
const [chats, setChats] = useState([]);
useEffect(() => {
const loadChats = async () => {
const chatData = await fetchChats();
setChats(chatData);
};
loadChats();
}, []);
const openChat = (chat) => {
navigation.navigate('Chat', { chat });
};
return (
<SafeAreaView style={styles.container}>
<FlatList
data={chats}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<TouchableOpacity style={styles.item} onPress={() => 
openChat(item)}>
<Text style={styles.title}>{item.title}</Text>
</TouchableOpacity>
)}
/>
</SafeAreaView>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#34a0a4',
},
item: {
backgroundColor: '#b5e48c',
padding: 20,
marginVertical: 8,
marginHorizontal: 16,
borderRadius: 10,
},
title: {
fontSize: 24,
fontWeight: 'bold',
},
});
*/
//chat list no data fetching (hide when using the fetching version)
// ChatList.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, StyleSheet } from
'react-native';
export default function ChatList({ navigation }) {
const [chats, setChats] = useState([]);
const fetchChats = async () => {
// Fetch chats from your backend or local storage here
// This is just a placeholder, modifiable code is up hidden, service file 
//is in ../config/chat service
const fetchedChats = [
{ id: '1', title: 'Chat 1' },
{ id: '2', title: 'Chat 2' },
{ id: '3', title: 'Chat 3' },
];
setChats(fetchedChats);
};
useEffect(() => {
fetchChats();
}, []);
const openChat = (chat) => {
navigation.navigate('Chat', { chat });
};
return (
    <SafeAreaView style={styles.container}>
    <FlatList
    data={chats}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() =>
    openChat(item)}>
    <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
    )}
    />
    </SafeAreaView>
    );
    }
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#34a0a4'
    },
    item: {
    backgroundColor: '#b5e48c',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    });