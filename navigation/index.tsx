


import * as React from "react";
import {NavigationContainer, DefaultTheme, DarkTheme,} from "@react-navigation/native";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ColorSchemeName, Text, View, Image, Pressable, Platform, StyleSheet} from "react-native";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Ionicons,Entypo, Fontisto, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons'; 
import Users from "../assets/dummy-data/Users"
import { S3Image } from "aws-amplify-react-native";


//Screens
import ChatRoomScreen from "../screens/ChatRoomScreen";
import PostsScreen from "../screens/PostsScreen/PostsScreen";
import ChatsScreen from "../screens/ChatsScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";


import GamesScreen from "../screens/GamesScreen"
import GroubsScreen from "../screens/GroubsScreen"
import UserScreen from "../screens/UserScreen/UserScreen"
import GroupInfoScreen from "../screens/GroupInfoScreen/GroupInfoScreen"
import GroupInfoHeader from "./GroupInfoHeader/GroupInfoHeader";
import OutGoingCallingScreen from "../screens/CallingScreen/OutGoingCallingScreen";
import VideoScreen from "../screens/CallingScreen/VideoScreen";
import CallsHistoryScreen from "../screens/CallsHistory/CallsHistoryScreen";
import UserInfoScreen from "../screens/UserInfoScreen/UserInfoScreen";
import Images from "../screens/UserInfoScreen/Images";
import EditProfile from "../screens/SettingsScreen/EditProfile";
import ChatRoomHeader from "./ChatRoomHeader/ChatRoomHeader";
import Profile from "../screens/Profile";
import ChatRoomInfoScreen from "../screens/UserScreen/ChatRoomInfoScreen";
import SavedMessagesScreen from "../screens/SettingsScreen/SavedMessages/SavedMessagesScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import RecentCalls from "../screens/SettingsScreen/OnlineStatus";
import OnlineStatus from "../screens/SettingsScreen/OnlineStatus";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { User } from "../src/models";
import { Auth, DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import Comments from "../screens/PostsScreen/CommentsScreen";
import CommentsScreen from "../screens/PostsScreen/CommentsScreen";



//_________________________________________________________________________________
export default function Navigation({colorScheme,}: {colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name= "ChatsScreen"component={BottomTabNavigator} 
      options={{headerShown: false}}/>


      
      {/* <Stack.Screen  name="ChatRoom" 
      component={ChatRoomScreen} 
      options={{headerShown: false}}/> */}

      <Stack.Screen  name="ChatRoom" 
      component={ChatRoomScreen} 
      options={({route})=> ({
      headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
      headerBackTitleVisible:false,
      headerBackVisible: false, 
      headerShadowVisible: false,
      

      headerStyle: {backgroundColor: "#705AD0"} })}/>

     
      <Stack.Screen  name="UserScreen" 
      component={UserScreen} 
      options={{
        headerShown: false
      }}/>

     <Stack.Screen  name="ChatsScreen1" 
      component={ChatsScreen} 
      options={{
        headerShown: false
      }}/>



<Stack.Screen  name="GroupInfoScreen" component={GroupInfoScreen} 
options={({route})=> ({
headerTitle: () => <GroupInfoHeader id= {route.params?.id} />,
headerBackTitleVisible:false,

  
})}/>



<Stack.Group screenOptions={{headerShown: false}}>
<Stack.Screen  
name="OutGoingCallingScreen" 
component={OutGoingCallingScreen}  />

<Stack.Screen  
name="VideoScreen" 
component={VideoScreen}/>

<Stack.Screen  
name="UserInfoScreen" 
component={UserInfoScreen}/>
<Stack.Screen  
name="ChatRoomInfoScreen" 
component={ChatRoomInfoScreen}/>

<Stack.Screen  
name="Images" 
component={Images}/>

</Stack.Group>

<Stack.Group screenOptions={{headerShown: false}}>

{/* <Stack.Screen  
name="Profile" 
component={Profile}/> */}

<Stack.Screen  
name="Profile" 
component={ProfileScreen}/>




<Stack.Screen  name="EditProfile" 
      component={EditProfile} />

<Stack.Screen  name="Settings" 
      component={SettingsScreen} />

<Stack.Screen  name="SavedMessages" 
      component={SavedMessagesScreen} />

<Stack.Screen  name="OnlineStatus" 
      component={OnlineStatus} />

<Stack.Screen  name="Comments" 
      component={CommentsScreen} />

</Stack.Group>


      </Stack.Navigator>
  );
}



const Tab = createMaterialTopTabNavigator();

function BottomTabNavigator() {
  const [user, setUser] = useState<User|null>(null)

  const dummyImage = Users.map(images => images.imageUri)[0]

  
  
  
  const fetchUser = async () =>  {
      const userData = await Auth.currentAuthenticatedUser();
      const user = await DataStore.query(User, userData.attributes.sub);
      if(user) {
          setUser(user)
      }
  }
  
      useEffect(() => {
          fetchUser()
          const subscription = DataStore.observe(User).subscribe(
            () => fetchUser())
          return () => subscription.unsubscribe();
          
          
      },[]);


  return (
  
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarPressColor: "transparent",
      
        tabBarStyle: { 
          backgroundColor: "white", 
          paddingTop: 10, 
          paddingBottom: 10,
          marginBottom:(Platform.OS === "ios" ? 30 : 10), 
          marginLeft: 10,
          marginRight: 10,
          shadowOffset: {width: 10, height: 10},
          shadowRadius: 5,
          elevation: 5,
          borderRadius: 10,
          
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarIndicatorStyle: {
          backgroundColor: "#705AD0", 
          minHeight: 60, 
          marginBottom: 4, 
          borderRadius: 10,
          alignSelf: "center",
        }
    }} 

    tabBarPosition="bottom">
          

  
      <Tab.Screen  name="Posts" component={PostsScreen} options={{tabBarIcon:({focused}) => (
        <View style={{transform: (focused ? [{translateY: -10}] : [{translateY: 0}] ),}}>
          <SimpleLineIcons name="home" size={24} color={focused ?"white" : "#4A4D55"} />
          {focused && <Text style={{color: "white",minWidth: 70, transform: [{translateX: -7,}]}}>Home</Text>}
        </View>
      )}} />

      <Tab.Screen name="Groups" component={GroubsScreen} 
       options={{tabBarIcon:({focused}) => (
        <View style={{transform: (focused ? [{translateY: -10}] : [{translateY: 0}] ),}}>
          <SimpleLineIcons name="people" size={24} color={focused ?"white" : "#4A4D55"} />
          {focused && <Text style={{color: "white",minWidth: 70, transform: [{translateX: -10,}]}}>Groups</Text>}
        </View>
      )}} />

      <Tab.Screen name="CallsHistory" component={CallsHistoryScreen} 
       options={{tabBarIcon:({focused}) => (
        <View style={{transform: (focused ? [{translateY: -10}] : [{translateY: 0}] ),}}>
          <SimpleLineIcons name="magnifier" size={24} color={focused ?"white" : "#4A4D55"} />
          {focused && <Text style={{color: "white",minWidth: 70, transform: [{translateX: -10,}]}}>Search</Text>}
        </View>
      )}} />

      

      <Tab.Screen name="Games" component={GamesScreen} 
       options={{tabBarIcon:({focused}) => (
        <View style={{transform: (focused ? [{translateY: -10}] : [{translateY: 0}] ),}}>
          <SimpleLineIcons name="game-controller" size={24} color={focused ?"white" : "#4A4D55"} />
          {focused && <Text style={{color: "white",minWidth: 70, transform: [{translateX: -10,}]}}>Games</Text>}
        </View>
      )}} />

      

      <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
       options={{tabBarIcon:({focused}) => (
        <View style={{ transform: (focused ? [{translateY: -10}] : [{translateY: -5}]),}}>
          
          <View >
          {!user?.imageUri && <View style={{
            backgroundColor: user?.color,
            maxHeight: 30,
            minHeight:30,
            minWidth: 30, 
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomStartRadius: 12,
            borderBottomEndRadius: 12,
            marginLeft: -2,
            shadowOffset: {width: 10, height: 10},
            shadowRadius: 5,
            elevation: 5,
            
          }}>
          <Text style={styles.noImageText}>{user?.name[0]}</Text>

          {/* Online status */}
          {focused && <View style={{
            maxWidth: 15,
            minWidth: 15, 
            minHeight: 15, 
            borderRadius: 10, 
            backgroundColor: "red",
            borderWidth: 4,
            borderColor: "#705AD0",
            marginLeft: 20,
            transform: [{translateY: -20,}],
            }}/>}
          </View>}



          {user?.imageUri && <View>
            <S3Image
        imgKey={{uri:dummyImage}}
        style={styles.image}
        resizeMode="cover" />
        
            {focused && <View style={{
            maxWidth: 15,
            minWidth: 15, 
            minHeight: 15, 
            borderRadius: 10, 
            backgroundColor: "red",
            borderWidth: 4,
            borderColor: "#705AD0",
            marginLeft: 20,
            transform: [{translateY: -18,}],
            }}/>}
            </View>}
          
        </View>

          {focused && <Text style={{color: "white",minWidth: 70, transform: [{translateX: -7,}]}}>Profile</Text>}
        </View>
      )}} />

       </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
    paddings:{
      marginBottom: 25,
    },
    header:{
        flexDirection: "row", 
        justifyContent: "space-between",
        width: "100%", 
        alignItems: "center",
        backgroundColor: "#705AD0",
        paddingRight: 15,
        paddingLeft:15,
        paddingTop: 50,
        paddingBottom: 55,
        marginBottom: -45,
      },
    
      image:{
        width: 30, 
        height: 30, 
        borderRadius: 10,
        marginBottom: -15,
        marginLeft: (Platform.OS === "ios" ? 0 : -2)
      },
      editIcon:{
        marginHorizontal: 5,
        marginRight: 20,
      },
      text: {
        flex: 1, 
        textAlign: "center",
        marginLeft: 20,
        fontWeight: "bold",
        
      },
    
        textInputView:{
          flexDirection: "row",
          alignContent: "center",
          flex: 1,
          marginRight:10,
          padding : 10,
          backgroundColor: "#F6F9FA",
          borderRadius: 15,
  
      },
      textInput:{
      alignSelf: "flex-start",
      marginLeft: 10,
      fontFamily: "NewueHaas",
      fontSize: 20,
      },
  
      createButton: {
        marginRight: 10,
      },
      noImage: {
      },
      noImageText: {
        fontSize: 15,
        fontWeight: "bold", 
        color: "#FAFAFA", 
        textAlign: "center",
        transform:(Platform.OS === "ios" ? [{translateY: 4,}] :  [{translateY: 2,}]) 
      },
    })