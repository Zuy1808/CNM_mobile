import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import userService from "../services/userService";
import { useAuth } from "../provider/AuthProvider";
import { useChat } from "../provider/ChatProvider";
import chatService from "../services/chatService";

const ChatList = ({ chats, navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { userVerified } = useAuth();
  const {
    selectedRoom,
    setSidebarVisibility,
    isSidebarVisible,
    setSelectedRoom,
    roomList,
    setRoomList,
    fetchUpdatedRooms,
  } = useChat();

  const getRoomName = (room) => {
    // Lấy danh sách thành viên của phòng chat
    const members = room.members;

    // Tìm tên người nhận bằng cách lọc danh sách thành viên và tìm người nhận không phải là người dùng hiện tại
    const receiver = members.find((member) => member !== userVerified._id);

    // Trả về tên người nhận
    return receiver.username; // Giả sử tên người gửi được lưu trong cột "username"
  };

  useEffect(() => {
    if (selectedRoom) {
      navigation.navigate("ChatScreen");
    }
  }, [selectedRoom]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchText.trim() !== "") {
        try {
          const result = await userService.getUsersBySearchTerms(searchText);
          // Remove the current user from the search results
          const filteredResult = result.filter(
            (user) => user._id !== userVerified._id
          );

          setFilteredUsers(filteredResult);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        setFilteredUsers([]);
      }
    };

    fetchUsers();
  }, [searchText, userVerified._id]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const isFriend = (user) => {
    return userVerified.friends.some((friend) => friend._id === user._id);
  };

  const handleAddFriend = async (user) => {
    console.log("Adding friend:", user);
    try {
      const response = await userService.sendFriendRequest({
        senderId: userVerified._id,
        receiverId: user._id,
      });
      console.log("Friend request sent:", response);

      // socket.emit('send-friend-request', response);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleUserSelect = async (user) => {
    try {
      // Create a chat room with the selected user
      const members = [userVerified._id, user._id];
      const response = await chatService.createChatRoom({
        members,
        type: "1v1",
      });
      console.log("Created chat room:", response);

      // check if the chat room already exists
      const existingChatroom = roomList.find(
        (room) => room._id === response._id
      );

      if (existingChatroom) {
        // Set the selected room to the existing chat room
        setSelectedRoom(existingChatroom);
        return;
      } else {
        // Add the new chat room to the list of chat rooms
        setRoomList([...roomList, response]);
        setSelectedRoom(response);

        // Emit a socket event to the server to notify the other user
        // socket.emit('create-room', {
        //     createdRoom: response,
        // });
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={24} color="black" />
      </View>

      {/* Hiển thị danh sách người dùng đã lọc */}
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              const friend = isFriend(item);
              if (friend) {
                await handleUserSelect(item);
              } else {
                await handleAddFriend(item);
              }
            }}
          >
            <View style={styles.chat}>
              <Image source={{ uri: item.profilePic }} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.sender}>{item.username}</Text>
              </View>
              {/* Kiểm tra nếu không phải là bạn bè thì hiển thị icon kết bạn */}
              {!isFriend(item) && (
                <Ionicons name="person-add" size={24} color="blue" />
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />

      {/* Chatroom */}
      <FlatList
        data={roomList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatroom}
            onPress={() => {
              setSelectedRoom(item);
              navigation.navigate("ChatScreen");
            }}
          >
            {/* Hiển thị biểu tượng phòng chat */}
            <Ionicons name="chatbubbles" size={24} color="green" />
            {/* Hiển thị tên người nhận tin nhắn ở phần "Room: " */}
            <Text style={styles.sender}>Room: {getRoomName(item)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />

      {/* Button to navigate to Settings screen */}
      <View style={styles.settingsButton}>
        <TouchableOpacity onPress={() => navigation.navigate("FriendList")}>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    backgroundColor: "blue",
  },
  chat: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "green",
  },
  chatroom: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "red",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  sender: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "violet",
  },
  settingsButton: {
    bottom: 20, // Đặt nút cài đặt ở dưới cùng của màn hình
    right: 20,
    alignItems: "flex-end",
    padding: 5,
  },
});

export default ChatList;
