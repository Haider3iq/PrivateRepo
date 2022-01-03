import {useRoute} from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React , {useState, useEffect} from "react";
import {View, Text, Image, FlatList, Alert} from "react-native";
import UserItem from "../../components/UserListItem/UserItem";
import { ChatRoom, ChatRoomUser, User} from "../../src/models";
import styles from "./styles";

const GroupInfoScreen = () => {
    
    const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null);
    const [allUsers, setAllUsers] = useState<User[]> ([]);
    const route = useRoute();
    
    useEffect(() => {
        fetchChatRoom();
        fetchUsers();
    }, []);
    
    
    const fetchChatRoom = async () => {
        if (!route.params?.id) {
            Alert.alert("No chatroom id provided");
            return;
        }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    
    if (!chatRoom) {
        Alert.alert("Couldn't find a chat room with this id");
    } else {
        setChatRoom(chatRoom);
    }
};

    const fetchUsers = async () => {
        const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id === route.params?.id)
        .map(chatRoomUser => chatRoomUser.user);
       
       setAllUsers(fetchedUsers);

       
};

    const confirmDeleteGroupUser = async (user) =>{
        //check if Auth user is admin of this group
        const authData = await Auth.currentAuthenticatedUser();
        if(chatRoom?.Admin?.id !== authData.attributes.sub){
            Alert.alert(`You are not the admim of ${chatRoom?.name}, you can't make any changes to members`);
            return;
        }

        if(user.id === chatRoom?.Admin?.id) {
            Alert.alert("You are the admin, you cannot delete yourself")
            return;
        }
        Alert.alert(
            "Confirm delete",
            `Are you sure you want to delete ${user.name} from ${chatRoom?.name}`,
            [
                {
                    text: "Delete",
                    onPress: () => deleteGroupUser(user),
                    style: "destructive",
                },
                {
                    text: "Cancel"
                }
            
            ]
         );
       };

       const deleteGroupUser = async (user) => {
        const chatRoomUsersToDelete = (
            await DataStore.query(ChatRoomUser)
        ).filter(
            (cru) => cru.chatroom.id === chatRoom?.id && cru.user.id === user.id 
            );
       
       console.log(chatRoomUsersToDelete)
       
       if(chatRoomUsersToDelete.length > 0) {
        await DataStore.delete(chatRoomUsersToDelete[0]);

        setAllUsers(allUsers.filter((u) => u.id !== user.id));
       };
    }

return (
    <View style={styles.header}>
       
       <View style={styles.root}>
       <Image
                  //or {chatRoom?.imageUri || user?.imageUri}
        source={{uri: chatRoom?.imageUri === null ? "https://amplify-hideer-staging-191248-deployment.s3.us-east-2.amazonaws.com/avatars/chat-group+(2).png" : chatRoom?.imageUri }}
        style={styles.groupImage}
        />
        <Text style={styles.groupText}>{chatRoom?.name}</Text>
        <Text style={styles.memberText}>{allUsers.length} members</Text>
       </View>
        <FlatList
        data={allUsers}
        renderItem={({item}) => <UserItem 
        user={item} 
        isAdmin={chatRoom?.Admin?.id === item.id} 
        onLongPress={() => confirmDeleteGroupUser(item)}
        />}
        />

    
    </View>
)
};

export default GroupInfoScreen;

