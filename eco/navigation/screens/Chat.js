import React, { useState } from 'react';
import { GiftedChat, Bubble, InputToolbar, Actions } from 'react-native-gifted-chat';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default function Chat({ navigation }) {
// Initialize messages state
const [messages, setMessages] = useState([]);
// Function to handle sending of messages
const onSend = newMessages => {
// Append the new message to the existing messages
setMessages(GiftedChat.append(messages, newMessages))
};
}
// Function to handle adding a picture
const handleAddPicture = () => {
const options = {
title: 'Select Picture',
storageOptions: {
skipBackup: true,
path: 'images',
},
};
// Display the image picker
ImagePicker.showImagePicker(options, (response) => {
if (response.didCancel) {
console.log('User cancelled image picker');
} else if (response.error) {
console.log('ImagePicker Error: ', response.error);
} else {
// Create a new message with the chosen image
const imageMessage = {
_id: Math.random().toString(),
createdAt: new Date(),
user: {
_id: 1, // replace with the current user id
},
image: response.uri,
};
// Send the image message
onSend([imageMessage]);
}
});
};
// Render the action button (for adding a picture)
const renderActions = (props) => {
return (
<Actions
{...props}
options={{
'Send a picture': handleAddPicture,
}}
optionTintColor="#222B45"
/>
);
};
// Render the message bubbles (actual messages)
const renderBubble = (props) => {
    return (
        <Bubble
        {...props}
        wrapperStyle={{
        right: {
        backgroundColor: '#52b69a'
        },
        left: {
        backgroundColor: '#99d98c'
        }
        }}
        textStyle={{
        right: {
        color: '#fff'
        },
        left: {
        color: '#000'
        }
        }}
        />
        );
        };
        // Render the input toolbar (where users type their message)
        const renderInputToolbar = (props) => {
        return (
        <InputToolbar
        {...props}
        containerStyle={{
        backgroundColor: '#b5e48c',
        borderTopWidth: 1,
        borderTopColor: '#fff'
        }}
        />
        );
        };
        // Render the ticks (check marks) indicating the status of the message
        const renderTicks = (message) => {
        if (message.user._id === 1) {
        if (message.received) {
        return (
        <View style={{ flexDirection: 'row' }}>
        <Text>✔✔</Text>
        </View>
        );
        }
        return (
        <View style={{ flexDirection: 'row' }}>
        <Text>✔</Text
        
        </View>
        );
}
return null;
};
// Set the header title
React.useLayoutEffect(() => {
navigation.setOptions({
headerTitle: () => (
<Text style={styles.headerTitle}>EcoBin</Text>
),
headerTitleAlign: 'center',
});
}, [navigation]);
// Render the chat UI
return (
<SafeAreaView style={styles.container}>
<GiftedChat
messages={messages}
onSend={newMessages => onSend(newMessages)}
user={{_id: 1}}
renderBubble={renderBubble}
renderInputToolbar={renderInputToolbar}
renderActions={renderActions}
renderTicks={renderTicks} // Add this line
/>
</SafeAreaView>
);
}
// Define the styles
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#34a0a4'
},
headerTitle: {
color: '#b5e48c',
fontSize: 24,
fontWeight: 'bold',
}
});
