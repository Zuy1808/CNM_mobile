import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = ({ route }) => {
  const { sender } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{sender}</Text>
        <View style={styles.info}>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="call" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="videocam" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {/* Example messages */}
        <View style={[styles.messageContainer, styles.messageContainerRight]}>
          <View style={[styles.messageBubble, styles.sentMessage]}>
            <Text style={styles.messageText}>Hello!</Text>
          </View>
        </View>
        <View style={[styles.messageContainer, styles.messageContainerLeft]}>
          <View style={[styles.messageBubble, styles.receivedMessage]}>
            <Text style={styles.messageText}>Hi there!</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="image" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic" size={24} color="#333333" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Type a message..." />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#4267B2",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  backButton: {
    padding: 5,
  },
  info:{
    flexDirection: "row",
    alignItems: "center",
   justifyContent:"space-between"
  },
  infoButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
    marginTop:10,
  },
  messageContainerRight: {
    alignSelf: "flex-end",
  },
  messageContainerLeft:{
    alignSelf:"flex-start",
  },
  messageBubble: {
    maxWidth: "100%",
    borderRadius: 20,
    padding: 15,
  },
  sentMessage: {
    backgroundColor: "#4267B2",
  },
  receivedMessage: {
    backgroundColor: "#ECEFF1",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  messageText: {
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  iconButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: "#4267B2",
    borderRadius: 30,
    padding: 10,
  },
});

export default ChatScreen;
