import React, {useState, useEffect,} from "react";
import { Text, Image, View, Pressable, ActivityIndicator} from "react-native";
import {useNavigation,} from "@react-navigation/core";
import {Auth, DataStore, SortDirection } from "aws-amplify"
import {ChatRoomUser, User, Message,} from "../../src/models";
import styles from "./styles";
import moment from "moment";
import { useFonts } from "expo-font";
import manPhoto from "../../assets/images/manPhoto.png";
import group from "../../assets/images/group.png";
import { S3Image } from "aws-amplify-react-native";




export default function ChatsItem ({chatRoom, searchTerm}) {
     const [user, setUser] = useState<User | null>(null); // the display use 
     const [messageTime, updateMessageTime] = useState <string | null> (null)
     const [LastMessage, setLastMessage] = useState<string | null >(null);   
     const [newMessages, setNewMessages] = useState<number | null>(null);
     const [isLoading, setIsLoading] = useState(true);
     const [allUsers, setAllUsers] = useState<User[]> ([]);
     const navigation = useNavigation();
     const [filterdUsers, setFilterdUsers] = useState <User | null>(null)
     const [onlineCircle, setOnlinecircle] = useState(false)
     
     
      
     
     
      const [loaded] = useFonts({
      NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
      
    });
      


    const fetchNewMessages = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const NewMessages = (await DataStore.query(
    Message, message => message.chatroomID(
    "eq", chatRoom.id))).filter((unReadMessages) => unReadMessages.status === "DELIVERED" && unReadMessages.userID !== authUser.attributes.sub).map((unReadMessages) => unReadMessages.content)
    setNewMessages(NewMessages.length)
    }


      const messageDate = () => {

        const lastOnlineDiffMS = moment().diff(moment(messageTime));
        if (moment(messageTime).isSame(moment(), 'day')) {
          return  `Today`
    
        } else if (moment(messageTime).isBefore(moment(),'day') && !moment(messageTime).isBefore(moment(),'day'))   {
          return `${moment(messageTime).format("dddd")}`;
          
    
        } else if (moment(messageTime).isBefore(moment(), "days") &&  !moment(messageTime).isBefore(moment(), "year")) {
          return `${moment(messageTime).format("MMM D")}`;
    
        } else if (moment(messageTime).isBefore(moment(), "year")) {
            return `${moment(messageTime).format("D.MM.YY")}`;
    
          }
      };

      // const fetchMessageTime = async () => {
      //   const messageTime = await DataStore.query(Message, messageTime => messageTime.chatroomID("eq", chatRoom.id))
      //   updateMessageTime(messageTime);
      // }

      const fetchLastMessage = async () => {
        const lastMessage = (await DataStore.query(
          Message, lastMessage => lastMessage.chatroomID("eq", chatRoom.id), {sort: lastMessage => lastMessage.createdAt(SortDirection.ASCENDING)},)).map((lastMessage) => lastMessage.content)

        setLastMessage(lastMessage[lastMessage.length-1])
      }
     
      
      const fetchMessageTime = async () => {
        const messageTime = (await DataStore.query(
          Message, lastMessage => lastMessage.chatroomID("eq", chatRoom.id), {sort: lastMessage => lastMessage.createdAt(SortDirection.ASCENDING)},)).map((lastMessage) => lastMessage.createdAt)

        updateMessageTime(messageTime[messageTime.length-1])
      }
 


      const fetchUsers = async () => {
        const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id).map(chatRoomUser => chatRoomUser.user);
          
        setAllUsers(fetchedUsers);
  
         
          
          //setUsers(fetchedUsers);
          
        const authUser = await Auth.currentAuthenticatedUser();
        // setUser(fetchedUsers.filter(user => user.id.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).find(user => user.id !== authUser.attributes.sub) || null
        // );
        setUser(fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
        );
  
        setFilterdUsers(fetchedUsers.filter(user => user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).find(user => user.id !== authUser.attributes.sub) || null
        );
  
  
  
        setIsLoading(false);
        }; 
      
     


      useEffect(() => {
      if(!chatRoom) {
        return;
      }
     
     
      fetchUsers()
      }, []);


      //subscribing user rleated things

      




      // Subscribing messages and message related things
      useEffect(() => {
      // fetchMessageTime()
      
      fetchNewMessages();
      fetchMessageTime()
      fetchLastMessage();
      const subscription = DataStore.observe(Message, ).subscribe(
      () => {fetchLastMessage(),fetchNewMessages(),fetchMessageTime()})

      return () => subscription.unsubscribe();
      
      }, [chatRoom, searchTerm])

      


      



// const [searchTerm, setSearchTerm] = useState("");
// const [filterdContacts, setFilterdContacts] = useState(User)
  
//   useEffect(() => {
//     const newContacts = Users.filter(contact => contact.name.toLocaleLowerCase().
//     includes(searchTerm.toLocaleLowerCase()), 
//     );
//     setFilterdContacts(newContacts)
//   }, [searchTerm])

useEffect(() => {
  getLastOnlineText()
  // console.log("user last online 2", onlineCircle)
},[user?.lastOnlineAt])

     

      // useEffect(() => {
      //   fetchLastMessageTime()
      //   const subscription = DataStore.observe(Message, chatRoom.chatRoomLastMessageId).subscribe(() => fetchLastMessageTime())

      //   return () => subscription.unsubscribe()
      // }, [])


  //     useEffect(() => {
  //       fetchMessageTime()
  //       const subscription = DataStore.observe(Message,).subscribe((msg) => {
  //               if (msg.model === Message) {
  //                   if (msg.opType === "UPDATE") {   
  //                       console.log("Last Message date",messageTime?.content)
  //                       updateMessageTime((messageTime) => ({...messageTime, ...msg.element}));
                      
  //                   }
  //           }
  //       }
  //       );
  
        
        
  //   return () => subscription.unsubscribe();
    
  // }, [])

      const onPress = () => { 
      navigation.navigate("ChatRoom", { id: chatRoom.id});

      }

      useEffect(() => {
        if(!user) {
          return;
        }
        
        
        const subscription = DataStore.observe(User, user.id).subscribe((msg) =>{
            if (msg.model === User && msg.opType === "UPDATE") {
              setUser((lastOnlineAt) => ({...lastOnlineAt, ...msg.element}));
              setUser((imageUri) => ({...imageUri, ...msg.element}));
            }
        });
        
        // console.log("Last online", user?.lastOnlineAt)
        return () => subscription.unsubscribe();
      },[chatRoom])
      

      

      const getLastOnlineText = () => {
        if (!user?.lastOnlineAt) {
          return null;
        };
        //if lastOnline less than 5 minutes ago, show him as online
        const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
        if (lastOnlineDiffMS < 10000) {
          //less than 5 minutes
          return setOnlinecircle(true)  //  return "Online" 
        } else {
             return setOnlinecircle(false) // return "Offline"
        }

      };
      
      

      // const getLastOnlineText = () => {
      //   if (!user?.lastOnlineAt) {
      //     return null;
      //   };
      //   //if lastOnline less than 5 minutes ago, show him as online
      //   const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
      //   if (lastOnlineDiffMS < 10000) {
      //     //less than 5 minutes
      //     return "online";
      //   } else {
      //     return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
      //   }
      // };
     
    

      if (!user && !searchTerm) {
      return <ActivityIndicator />
      }

   if(!loaded) {return null}
     
      return (
       //Don't forget to put: chatRoom?.imageUri 
        <Pressable onPress={onPress} style={newMessages > 0 ? styles.newMessages : styles.container}>
           
           {allUsers.length > 2 && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 20,
          paddingBottom: 20, 
          padding: 25, 
          marginRight: 10, 
          borderRadius: 25,
        }}>
          <Text style={styles.noImageText}>
            {chatRoom?.name && chatRoom?.name[0]}
          </Text>
          </View>}
        
        {user?.imageUri && allUsers.length === 2 && (<S3Image
        imgKey={user?.imageUri}
        style={styles.image}
        resizeMode="cover" />)} 

        {!user?.imageUri && allUsers.length === 2 && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 10,
          paddingBottom: 10, 
          padding: 15, 
          marginRight: 10, 
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
        }}>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}

        

            {onlineCircle ? <View style={newMessages > 0 ? styles.newMGonlineContainer: styles.onlineContainer}>
          
          </View> : null}
          

  
        
       
         
         
         <View style={styles.rightContainer}>
           <View style={styles.row}>
             <Text numberOfLines={1} style={styles.name}>{chatRoom?.name ? chatRoom.name : filterdUsers?.name}</Text>
             <Text style={styles.dateText}>{messageDate()}</Text>
             

         </View>
         
         <View style= {{alignItems: "flex-end"}}>
         
          </View>

          <View style= {{justifyContent: "space-between", flexDirection: "row"}}>
          {chatRoom.name !== null && !LastMessage ? 
         <Text style={styles.text}>
              A group has been created </Text> : 
              <Text numberOfLines={1} style={styles.text}>
              {LastMessage ? LastMessage : "Tap to chat now"} </Text>}
          
          {newMessages > 0 && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}> {newMessages}</Text>
          </View>}
          </View>
         
              

        

         
           
         </View>
         
       </Pressable>
       );
       }

