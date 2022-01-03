import React, {useState, useEffect } from "react";
import {View, FlatList, Pressable, Text, StyleSheet, Alert} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser, Message,} from "../../src/models";
import styles from "./styles";




import UserItem from "../../components/UserListItem/UserItem";
import NewGroupButton from "../../components/NewGroupButton"
import UserListHeader from "../../navigation/UserListHeader/UserListHeader";


export default function UserScreen () {
  const [users, setUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState (false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  const navigation = useNavigation();
 
   
   const fetchUsers = async () => {
   const authUser = await Auth.currentAuthenticatedUser()
   const fetchedUsers = (await DataStore.query(User)).filter((user) => user.id !== authUser.attributes.sub)
   setUsers(fetchedUsers)
   
 } 

 
  useEffect(() => {
    fetchUsers();
    console.log(users)
  }, [])

 

       //connect authenticated user with the chat room 
      const addUserToChatRoom = async (user, chatroom) => {
        DataStore.save(new ChatRoomUser({user, chatroom}));
      };

        //Chat Room creation 
        const createChatRoom = async (users) => {
        //Create a chat room
        const authUser = await Auth.currentAuthenticatedUser();
        const dbUser = await DataStore.query(User, authUser.attributes.sub); 
      
      if(!dbUser) {
        Alert.alert("Error not DBuser")
        return;
      }
   
     
       const newChatRoomData = {
        newMessages: 0,
        Admin: dbUser,
    };
      if(users.length > 1) {
        newChatRoomData.name = "New group",
        newChatRoomData.imageUri = null
        
      };
  
      
      const newChatRoom = await DataStore.save(new ChatRoom (newChatRoomData))
  
      
      if(dbUser){
        await addUserToChatRoom(dbUser, newChatRoom);

         navigation.navigate("ChatRoom", {id: newChatRoom.id}) 
         console.log("New chat room", newChatRoom.id)
          
            await Promise.all(
            users.map((user) => addUserToChatRoom(user, newChatRoom))
        );
        
      };
       
      
        
      };

      const isUserSelected = (user) => {
        return selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      };

      
      const onUserPress = async (user) => {
        if(isNewGroup) {
          if(isUserSelected(user)) {
            //remove it from selected
            setSelectedUsers(
              selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
            );
          } else {
            setSelectedUsers([...selectedUsers, user]);
          }

        } 
        else  { 
      //     const authUser = await Auth.currentAuthenticatedUser()
      //     const dbUser = await DataStore.query(User, authUser.attributes.sub)
      //     //Here we query the chatRooms that the authUser has
      //     const authChatRoomUser = (await DataStore.query(ChatRoomUser,)).filter((chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub).filter((chatRoomUser) => chatRoomUser.chatroom.name !== null ? (chatRoomUser.chatroom.name === null) : (chatRoomUser.chatroom.name === null)).map((chatRoom) => chatRoom.chatroom.id)
      //     console.log("authChatRooms",authChatRoomUser)
          
      //     //Here we query the the chatrooms that the listUser(clicked user) has.
      //     const listChatRoomUser = (await DataStore.query(ChatRoomUser)).filter((chatRoomUser) => chatRoomUser.user.id === user?.id).filter((chatRoomUser) => chatRoomUser.chatroom.name !== null ? (chatRoomUser.chatroom.name === null) : (chatRoomUser.chatroom.name === null)).map((chatRoom) => chatRoom.chatroom.id)
            
      //     // Here is the shared room id between authUser and listUser
      //     let commonChatRoom = authChatRoomUser.filter( ai => listChatRoomUser.includes(ai));
      
      //     console.log
      //     //If there is no a shared chat room than create one
      //     if (!commonChatRoom.toString()) {
      //     console.log("did not export a chatroom ID", !commonChatRoom.toString())
      //     return await createChatRoom([user]);
          
      //     //Else navigate to the active one
      //     } else {
      //     navigation.navigate("ChatRoom", {id: commonChatRoom.toString()})
      //     console.log("the shared chat room id is:", commonChatRoom.toString())
      //   }

      navigation.navigate("UserInfoScreen", {user, createChatRoom})
      }
          
      };

      const saveGroup = async () => {
        await createChatRoom(selectedUsers);
      };


      //Flatlist improvment
      const renderItem = ({ item }) => 
      (<UserItem user={item} onPress={() => onUserPress(item)} isSelected={isNewGroup ? isUserSelected(item) : undefined}/>
      )

      // const ListHeaderComponent = () => (
      //   <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
      //   )

  return (
    <>
    <UserListHeader/>
    <View style={styles.page}>
    <FlatList
      data={users}
      renderItem={renderItem}
      showsVerticalScrollIndicator ={false}
      // ListHeaderComponent={ListHeaderComponent}
      />

      {isNewGroup && (
      <View style={styles.buttonContainer} >
      <Pressable style={styles.button} onPress={saveGroup} >
        <Text style={styles.buttonText}>
          Create Group of ({selectedUsers.length} users) 
        </Text>
      </Pressable>
      
    </View>
    )}
      </View>
      </>
  );
}



