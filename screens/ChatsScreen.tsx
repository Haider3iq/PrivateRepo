import React, { useState, useEffect, useRef } from "react";
import {View,FlatList, StyleSheet , Text, Platform, Animated, Pressable, Dimensions} from "react-native";
import ChatsScreenItem from "../components/ChatsScreenItem/ChatsScreenItem";
import {Auth, DataStore } from "aws-amplify"
import { ChatRoom, ChatRoomUser} from "../src/models";
import ChatsScreenHeader from "../navigation/ChatsScreenHeader/ChatsScreenHeader";
import { useFonts } from "expo-font";
import CallsHistoryScreen from "./CallsHistory/CallsHistoryScreen"
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderTabBar = (props) =>  { 
  console.log("Props", props)
  return (
  <TabBar
    {...props}
    
    tabStyle={{alignSelf: "center",}}
    labelStyle={{color: "black", textTransform: "none", fontSize: 20, fontWeight: "600",}}
    indicatorStyle={{
      minHeight: 50,
      borderRadius: 10,
      backgroundColor:"white",
      zIndex: 0,
    }}
      style={{
        backgroundColor: "rgba(0,0,0,0)",
      }}
      pressColor='transparent'
    
  />
);}

function chatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loaded] = useFonts({
    NewueHaas: require("../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
  });
  

  const fetchChatRooms = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const fetchedChatRooms = (await DataStore.query(ChatRoomUser))
    .filter((chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub).filter((chatRoomUser) => chatRoomUser.user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map((chatRoomUser) => chatRoomUser.chatroom).filter(
      (chatRoom) => chatRoom.name !== null ? (chatRoom.LastMessage === null || chatRoom.LastMessage !== null) : (chatRoom.LastMessage !== null))
     
    
    
    setChatRooms(fetchedChatRooms);
  };
  


    useEffect(() => {
      console.log("Chat Rooms", chatRooms)
      fetchChatRooms();
       const subscription = DataStore.observe(ChatRoomUser).subscribe(() => fetchChatRooms())
     return () => subscription.unsubscribe();
    },[])
  

  
  const RenderItem = ({item}) => <ChatsScreenItem searchTerm={searchTerm} chatRoom={item} />
  
  const listHeaderComponent = () => {
    return (
      <View style={styles.messagesView}>
      <Text style={styles.messagesText}> Chats </Text>
      </View>)
  }

  if(!loaded) {return null}

    return (
      <>
    <FlatList 
      ListHeaderComponent={listHeaderComponent}
      data={chatRooms}
      renderItem={RenderItem}
      showsVerticalScrollIndicator ={false}
      />

    </>
    ) 
}

  
  function RequestsScreen() {
    return (
      <View>
        <Text> Empty </Text>
      </View>
    )
  }


export default function ChatsScreen() {


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Calls', title: 'Calls'},
    {key: 'Chats', title: 'Chats'},
    {key: 'Requests', title: 'Requests'},
  ]);

  const renderScene = SceneMap({
    Calls: CallsHistoryScreen,
    Chats: chatRooms,
    Requests: RequestsScreen,
  });




  const screenOptions = {
    tabBarStyle: { backgroundColor: "#ECF0F3", paddingTop: 10, paddingBottom: 10, elevation: 0,},
    tabBarActiveTintColor: '#e91e63',
    tabBarIndicatorStyle: {backgroundColor: "#705AD0",},
    renderIndicator: () => null
    
}



  return (
    <View style={styles.page}>

      
    
    <ChatsScreenHeader/>
    
    <View style={styles.flatList}>
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      
    />
    </View>


    </View>
   
  );
}
  
const styles = StyleSheet.create({

  page: {
    backgroundColor: "#EFF3F5",
    flex: 1,
  },
  flatList: {
    backgroundColor: "#EFF3F5",
    borderRadius: 30,
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
buttonContainer:{

  backgroundColor: "white",

},
  button: {
    backgroundColor: "#3D4785",
    marginBottom: 35,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 15,
 },

 messagesText:{
  fontSize: 30,
  fontFamily: "NewueHaas",
  color: "#4A4D55"
 },

  buttonText: {
    color: "white"
  },

  messagesView:{
   marginTop: 10,
   marginRight:30,
   marginLeft: 30,
  },

  tabBackgroundStyle:{
      minWidth: 130,
      minHeight: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor:"white",
      zIndex: 0,
  },

})


  // const FirstTitle = (props) => {

  //   const {focused} = props
  //   const animatedTab = useRef(new Animated.Value(0)).current


  //   const onPress = (index) => {
  //       Animated.spring(animatedTab, {
  //         toValue: 140,
  //         useNativeDriver: true
  //       }).start();
  //     }



  //   return (
  //     <>
      
  //     <Animated.View style={{ 
  //     minWidth: 130,
  //     minHeight: 50,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     borderRadius: 10,
  //     backgroundColor:"red",
  //     transform: [{translateX: animatedTab,}],
  //     zIndex: 0,
  //     position: "absolute"
  //     }}/>
      
  //     <Pressable onPress={onPress}>
  //   <Animated.View style={{ 
  //     minWidth: 130,
  //     minHeight: 50,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     borderRadius: 10,}}>
  //     <Text style={{fontSize: 20, fontWeight: "600", color: "white"}}>Calls</Text>
  //   </Animated.View>
  //   </Pressable>  
  //   </>
  // )}



  // const animatedTab = new Animated.Value(0)
  // const onPress = () => {
  //       Animated.timing(animatedTab,{
  //         toValue: 10,
  //         duration: 400,
  //         useNativeDriver: true,

  //       }).start();
  // }


//______________________________________________________________________

// const animatedTab = useRef(new Animated.Value(Platform.OS === "ios" ? -125 : -120)).current;
    


       
//   Animated.timing(animatedTab, {
//       toValue: (Platform.OS === "ios" ? -125 : -120),
//       duration: 140,
//       useNativeDriver: true,
//   },).start();


  
//     const onSecondTabPress= () => {
//       Animated.timing(animatedTab, {
//         toValue: 140,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     }

//     const onThirdTabPress= () => {
//       Animated.timing(animatedTab, {
//         toValue: 275,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     }

//     const AnimatedBackground = () => (
//       <Animated.View style={{backgroundColor: "red", 
//       minWidth: 130,
//       minHeight: 50,
//       position: "absolute",
//       zIndex: 0,
//       borderRadius: 10,
//       transform: [{translateX: animatedTab}]
//       }}>

//       </Animated.View>
//     )