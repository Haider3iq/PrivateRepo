import React, {useState, useEffect, useMemo, useCallback, Component, useRef} from "react";
import {
    View,
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
    Alert, 
    ImageBackground,
    Text,
    ScrollView,
    SectionList,
    Pressable,
    Dimensions,
} 


from "react-native";
import {useRoute,} from "@react-navigation/core";
import {ChatRoom, ChatRoomUser, Message as MessageModel, User,} from "../src/models"
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { SortDirection, DataStore, Auth } from "aws-amplify";
import moment from "moment";
import { useFonts } from "expo-font";
import InvertedSectionList from "inverted-section-list";
import Reactions from "../components/Message/Reactions/Reactions";
import { BlurView } from "expo-blur";
import Chats from "../assets/dummy-data/Chats"
import { TouchableHighlight } from "react-native-gesture-handler";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function ChatRoomScreen() {

  // const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageReplyTo, setMessageReplyTo ] = useState<MessageModel | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [ user, setUser ] = useState< User | null> (null)
  const [otherUser, setOtherUser] = useState <boolean | null> (null)
  const [showReactions, setShowReactions] = useState(false);
  

  
  const [currentIndex, setCurrentIndex] = useState();
  const [refFlatList, setRefFlatList] = useState();




  const [loaded] = useFonts({
      NewueHaas: require("../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
    });

    const route = useRoute();


    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatroom.id === route?.params?.id)
      .map((chatRoomUser) => chatRoomUser.user);
     
     const authUser = await Auth.currentAuthenticatedUser();
      setUser(fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };


    useEffect(() => {
      if(!user) {
        return;
      }
  
      const subscription = DataStore.observe(User, user.id).subscribe((msg) =>{
          if (msg.model === User && msg.opType === "UPDATE") {
            setUser((lastOnlineAt) => ({...lastOnlineAt, ...msg.element}));
            setUser((imageUri) => ({...imageUri, ...msg.element}));
            setUser ((typingStatus) => ({...typingStatus, ...msg.element}))

          }
      });
  
      console.log("user name", user?.name);
      console.log("user typing status", user.typingStatus)
      return () => subscription.unsubscribe();
    },[user?.id])


    const fetchMessages = async () => {
      if (!chatRoom) {
          return;
      }
        const fetchedMessages = (await DataStore.query(MessageModel, message => message.chatroomID("eq", chatRoom?.id), {
          sort: message => message.createdAt(SortDirection.DESCENDING)
      }))
        setMessages(fetchedMessages);
  };

  const fetchIvertedMessages = () => {


  }

  
      const fetchChatRoom = async () => {
        if (!route.params?.id) {
            return (Alert.alert("Couldn't find a chat room with this id this alert is from route"))
        }
  
        
        
        const chatRoom = await DataStore.query(ChatRoom, route.params.id);
        // console.log(chatRoom)
        if (!chatRoom) {
            return Alert.alert("Couldn't find a chat room with this id");
            
        } 
        else {
            setChatRoom(chatRoom);
        }
 
    };
    

    useEffect(() => {
      console.log("fetchatroom")
      
      fetchChatRoom()
    },[])


    
    
   

  //subscriping to real time messaging
  useEffect(() => {

    fetchMessages()
        console.log("test from subscription chat room screen")
        const subscription = DataStore.observe(MessageModel,).subscribe(() => {fetchMessages()})
        return () => subscription.unsubscribe();

  },[chatRoom])


// useEffect(() => {
//   fetchMessages()
//   const subscription = DataStore.observe(MessageModel, message => message.chatroomID("eq", route?.params?.id)).subscribe(msg =>{
//       console.log(msg.model, msg.opType, msg.element);
//       if (msg.model === MessageModel && msg.opType === "INSERT") {
//           setMessages(existingMessage => [msg.element, ...existingMessage])
         
//       }
//   });
//   console.log("show test", showReactions)
//   return () => subscription.unsubscribe();
// }, [chatRoom])


    
    





const getGroupDate = () => {
  if (moment(chatRoom?.createdAt).isSame(moment(), 'day')) {
    return  `Today at ${moment(chatRoom?.createdAt).format("LT")}`

  } else if (moment(chatRoom?.createdAt).isBefore(moment(),'day'))   {
    return `${moment(chatRoom?.createdAt).format("dddd LT")}`;
    

  } else if (moment(chatRoom?.createdAt).isBefore(moment(), "days")){
    return `${moment(chatRoom?.createdAt).format("MMM dddd LT")}`;

  } else if (moment(chatRoom?.createdAt).isBefore(moment(), "months") 
  || moment(chatRoom?.createdAt).isBefore(moment(), "month")) {
      return `${moment(chatRoom?.createdAt).format("MMM dddd LT")}`;

    } else if (moment(chatRoom?.createdAt).isBefore(moment(), "year") 
    || moment(chatRoom?.createdAt).isBefore(moment(), "years")) {
      return `${moment(chatRoom?.createdAt).format("YYYY MMM ddd LT")}`;
    }
  
};
    
   
    
   





// const onPressItem = (item, index) => {
//   setCurrentIndex(index,)
//   const newMessages = messages.map((e, index) => {
//       if(item.id === e.id) {
//           return {
//               ...e,
//               selected: true,
//           }
//       }

//       else {
//           return {
//               ...e,
//               selected: false
//           }
          
//       }
      
//   })
//   setMessages(newMessages)
// }

const DATA = Object.values(messages.reduce((acc, item) => {

  const getMessageDate = () => {
    if (moment(item.createdAt).isSame(moment(), 'day')) {
      return  `Today`

    } else if (moment(item.createdAt).isBefore(moment(),'day') && !moment(item.createdAt).isBefore(moment(),'day'))   {
      return `${moment(item.createdAt).format("dddd")}`;
      

    } else if (moment(item.createdAt).isBefore(moment(), "days") &&  !moment(item.createdAt).isBefore(moment(), "year")){
      return `${moment(item.createdAt).format("MMMM D")}`;

    } else if (moment(item.createdAt).isBefore(moment(), "year")) {
        return `${moment(item.createdAt).format("D.MM.YYYY")}`;

      }
    
  };

  if (!acc[moment(item.createdAt).format('L')]) acc[moment(item.createdAt).format('L')] = {
    title: getMessageDate(),
    data: []
  };
  acc[moment(item.createdAt).format('L')].data.push(item);
  return acc;

}, {}))




// const onScrollToItemSelected = () =>{
//     refFlatList.scrollToIndex({animated: true, index: currentIndex});
// }





// const getItemLayout = (data, index) => {
//  return  {length: Dimensions.get('window').width / 5, offset: Dimensions.get('window').width / 5 * index, index} 
// }


// const onScrollToItemSelected = (index) =>{
//   refFlatList.scrollToLocation({
//       animated: true,
//       itemIndex: currentIndex,
//       sectionIndex: index,
//     });
// }

// const renderItem = ({item, index}) => (
//   <View style={{padding:10,}}>

//       <TouchableHighlight 
//       underlayColor={"#4A4D55"} 
//       style={{borderRadius: 50}}
      
//       onPress={() =>  {onPressItem(item,index);  onScrollToItemSelected()}}
//       >
//       <View style={ item.selected ? {padding:20, backgroundColor: "red", borderRadius: 50, } : {padding:20, backgroundColor: "white", borderRadius: 50, }}> 
//       <Text >
//           {item.content}
//       </Text>
      
//       </View>
//       </TouchableHighlight>
      
//   </View>)


const groupRoomHeader = () => ((<View>
  {chatRoom?.name !== null && <View style={styles.groupView}>

    <View style={styles.groupTextView}>
    <Text style ={styles.groupText}>{getGroupDate()} </Text>
    </View>
  
    <View style={styles.groupTextView}>
    <Text style ={styles.groupText}>
    {chatRoom?.Admin?.name} created the group "{chatRoom?.name}"
      </Text>
    </View>
      
  </View>}
  </View>))


const sectionHeader = ({section,}) => (<View>
{ <View style={styles.groupView}>
<View style={styles.groupTextView}>
<Text style ={styles.groupText}>
{section.title}
</Text>
</View>

</View>}
</View>)

const typingUserInvertedHeader = () => ((<View>
  {user?.typingStatus === route.params?.id && <View>
    <View style={[
    styles.leftContainerSender, {flexDirection: "row", alignItems: "center",}
                     ]}>
    <Text style={{fontSize: 15,}}>Typing...</Text>
    </View>
    </View>}
  </View>))

      


      
      const renderItems = ({item, index }) => (
  
      
      <TouchableHighlight 
      underlayColor={"black"} 
      onPress={() =>  null}>
      <Message user={user} setUser={setUser} message={item} setOtherUser={setOtherUser} otherUser={otherUser}
      setAsMessageReply={() => setMessageReplyTo(item)} 
      ReactionsBoolean={showReactions}
      setReactionsBoolean={setShowReactions}
      />  
      </TouchableHighlight>
      
      )








        

      if(!chatRoom) {
        return <ActivityIndicator />
    }

    if(!loaded) {return}

            

     
    return (

        <View style={styles.page} >
          {/* <ChatRoomHeader typing={typing} setTyping={setTyping} id={route.params?.id}/> */}
          <View style={styles.topSpace}>
          {/* <Reactions showReactions={showReactions}
      setShowReactions={setShowReactions}  propChatRoomForReactions={propChatRoomForReactions} /> */}
          </View>

          
        
          
        
          <View style={showReactions ?  styles.chatReaction : styles.chat }>
          
          <InvertedSectionList
           sections={DATA} 
           ListFooterComponent={groupRoomHeader}
           ListHeaderComponent={typingUserInvertedHeader}
           renderItem={renderItems}
           renderSectionFooter={sectionHeader}
           stickySectionHeadersEnabled
           />

           <MessageInput chatRoom={chatRoom} messageReplyTo={messageReplyTo} removeMessageReplyTo={() => setMessageReplyTo(null)}
           />
          

          {/* <FlatList style={{padding: 10}}
            data={messages}
            renderItem={({item}) => (
            <Message 
            message={item}
            setAsMessageReply={() => setMessageReplyTo(item)} 
            />
            )}
            inverted />
            <MessageInput typing={typing} setTyping={setTyping} chatRoom={chatRoom} messageReplyTo={messageReplyTo} removeMessageReplyTo={() => setMessageReplyTo(null)}
          /> */}
          


          </View> 

          
            
       </View>
       
  
    )
}

    

const styles = StyleSheet.create ({
    page:{
        flex: 1,
    },

    topSpace:{
      backgroundColor: "#705AD0",
      padding: 20,
      paddingTop:20,
      marginBottom: -25,
    },
  
  chat:{
        paddingTop: 2,
        backgroundColor: "#EFF3F5",
        flex: 1,
        borderRadius: 30,
    },

    chatReaction:{
      paddingTop: 2,
        backgroundColor: "rgba(32,33,36, .3)",
        flex: 1,
        borderRadius: 30,
    },

    groupView:{
        alignItems: "center",
        marginTop: 10,
    },

    groupTextView:{
      backgroundColor: "#FAFAFA",
      margin: 5,
      padding: 5,
      borderRadius: 10,
      shadowColor: "#000",
      marginBottom: 10,
      
    },

    groupText:{
        color: "rgba(63,65,72,.7)", 
        fontSize: 14,
        fontFamily: "NewueHaas",
    },

    leftContainerSender: {
      backgroundColor: "#FFFF",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      maxWidth:"80%",
      borderBottomRightRadius: 8,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      marginLeft: 20,
      marginRight: "auto",
      marginBottom: 5,
      
  },
})