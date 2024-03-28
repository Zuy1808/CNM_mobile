import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const ChatList = ({ chats, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { sender: item.sender })}>
            <View style={styles.chat}>
              <Image source={{uri: 'https://placeimg.com/50/50/people'}} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <Text style={styles.time}>11:30 AM</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  chat: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#333',
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
});

export default ChatList;
