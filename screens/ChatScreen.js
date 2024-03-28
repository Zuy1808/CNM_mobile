import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const ChatScreen = ({ route }) => {
  const { sender } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{sender}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {/* Example messages */}
        <View style={styles.messageContainer}>
          <View style={[styles.messageBubble, styles.sentMessage]}>
            <Text style={styles.messageText}>Hello!</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <View style={[styles.messageBubble, styles.receivedMessage]}>
            <Text style={styles.messageText}>Hi there!</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type a message..." />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#4e71ba',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 15,
  },
  sentMessage: {
    backgroundColor: '#4e71ba',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4e71ba',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
