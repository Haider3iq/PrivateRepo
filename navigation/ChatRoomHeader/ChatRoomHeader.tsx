import React, {useEffect, useState } from "react";
import { Text, Image, View, Pressable, Platform } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import {Auth,DataStore} from "aws-amplify";
import styles from "./styles";
import {ChatRoomUser, User, ChatRoom } from "../../src/models";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";
import manPhoto from "../../assets/images/manPhoto.png";
import group from "../../assets/images/group.png";
import { S3Image } from "aws-amplify-react-native";
import { StatusBar } from "expo-status-bar";


const ChatRoomHeader = ({ id, children, showReactions }) => {
  const [user, setUser] = useState<User | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [allUsers, setAllUsers] = useState<User[]> ([]);

  useEffect(() => {
    if(!user) {
      return;
    }

    const subscription = DataStore.observe(User, user.id).subscribe((msg) =>{
        if (msg.model === User && msg.opType === "UPDATE") {
          setUser((lastOnlineAt) => ({...lastOnlineAt, ...msg.element}));
          setUser((imageUri) => ({...imageUri, ...msg.element}));
          // setUser ((typingStatus) => ({...typingStatus, ...msg.element}))
          getLastOnlineText()
        }
    });

    // console.log("user name", user?.name);
    // console.log("user typing status", user.typingStatus)
    return () => subscription.unsubscribe();
  },[user?.id])

  const navigation = useNavigation();

    const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
    .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
    .map((chatRoomUser) => chatRoomUser.user);
   
   setAllUsers(fetchedUsers);
   
   const authUser = await Auth.currentAuthenticatedUser();
    setUser(fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };



  //  const userTypingStatus = () => {
  //   if (!user?.typingStatus) {
  //     return null;
  //   };
  //   if(user?.typingStatus > 0) {
  //     return "Typing..."
  //   } else {return null}
    
  //  }

  //  useEffect(() => {
  //    userTypingStatus()
  //  }, [user?.typingStatus])

   

  
  const fetchChatRoom = async () => {
  DataStore.query(ChatRoom, id).then(setChatRoom)
  
  }

  
  
  
  useEffect(() => {
  if (!id) {
     return;
   }
  
    
    fetchUsers();
    fetchChatRoom();
  }, []);
  
 
  

  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    };
    //if lastOnline less than 5 minutes ago, show him as online
    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 10000) {
      //less than 5 minutes
      return "online";
    } else {
      return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  const getUsernames = () => {
    return allUsers.map((user) => user.name).join(", ");
  };


  //or it can be also only a variable like this: const isGroup = allUsers.length > 2;
  const isGroup = () => {
    return allUsers.length > 2;
  }

  const onCallPress = () =>{
    navigation.navigate("OutGoingCallingScreen", {user})
  }
  const onVideoPress = () => {
    navigation.navigate("VideoScreen", {user})
  }

  const onHeaderPress= () => {
    if(allUsers.length > 2) {
      navigation.navigate("GroupInfoScreen", { id })
    }  else {
      navigation.navigate("ChatRoomInfoScreen", {user, chatRoom})
    }
  }

  const onUserPress = () => {
    if(allUsers.length > 2) {
      navigation.navigate("GroupInfoScreen", { id })
    }  else {
      navigation.navigate("UserInfoScreen", {user, chatRoom})
    }
    
  }


  const goBack = () => {
    navigation.goBack()
  }
 
  return (
    <>
    
    <View style={ Platform.OS === "ios" ? styles.header : styles.androidHeader}>
      

      <Pressable onPress={goBack} style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight:-5} } >
               <Ionicons name="arrow-back" size={24} color="white"/>
               </Pressable>
               
      
      

      <Pressable onPress={onHeaderPress} style={styles.text}>
      <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#FAFAFA", alignSelf: "center"}}>{chatRoom?.name ? chatRoom.name : user?.name}</Text>
      {user?.typingStatus === false && <Text numberOfLines={1} style={{fontSize:12, color: "#FAFAFA", alignSelf: "center"}}>{isGroup() && getUsernames()}{getLastOnlineText()}</Text>}

      {user?.typingStatus === true && <Text numberOfLines={1} style={{fontSize:12, color: "#FAFAFA", alignSelf: "center"}}>Typing...</Text>}
      
      </Pressable>
      
      <Pressable onPress={onUserPress} style={{marginRight: 15, marginLeft: -10,}}>
      {allUsers.length > 2 && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 10,
          paddingBottom: 10, 
          padding: 15, 
          marginRight: 10, 
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
        }
        }>
          <Text style={styles.noImageText}>
            {chatRoom?.name && chatRoom?.name[0]}
          </Text>
          </View>}
        
        {user?.imageUri && allUsers.length === 2 && (<S3Image
        imgKey={user?.imageUri}
        style={styles.image}
        resizeMode="cover" />)} 

        {!user?.imageUri && allUsers.length === 2 && <View style={Platform.OS === "ios" ? {
          backgroundColor: user?.color, 
          paddingTop: 10,
          paddingBottom: 10, 
          padding: 15, 
          marginRight: 10, 
          borderRadius: 15,
        } : {
          backgroundColor: user?.color, 
          paddingTop: 7,
          paddingBottom: 7, 
          padding: 15, 
          marginRight: 10, 
          borderRadius: 15,
        } }>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}

        
      </Pressable>

      <StatusBar style={"light"} />
    <View></View>
    </View>
    </>
  );
}

export default ChatRoomHeader;