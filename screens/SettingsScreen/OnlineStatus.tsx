import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {View,Text, StyleSheet, Pressable, ScrollView, TouchableHighlight, Switch} from "react-native";

import OnlineStatusheader from "../../navigation/OnlineStatusHeader/OnlineStatusheader";
import SettingsHeader from "../../navigation/SettingsHeader/SettingsHeader";
import { User } from "../../src/models";
import CallsHistoryScreen from "../CallsHistory/CallsHistoryScreen"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tabs = createMaterialTopTabNavigator();


const OnlineStatus = () => {
    const [user, setUser] = useState <User|null> (null) 
    const [isOnlineEnabled, setIsOnlineEnabled] = useState(false);

  //Here we save the switcher value
  // useEffect(() => {
  //   if(user?.offline === true) {
  //     setIsOnlineEnabled(true);
  //   }
  // },[])
  


  const toggleSwitch = () => {
    if(isOnlineEnabled === false) {
      setIsOnlineEnabled(true);
      //here you can update user last online field to be hidden
    } else {
      setIsOnlineEnabled(false);
      //here you can update user last online time stamp
    }
  }
const fetchUser = async () => {
  const userData = await Auth.currentAuthenticatedUser();
  const user = await DataStore.query(User, userData.attributes.sub);
  if(user) {
    setUser(user);
  }
}
 
  useEffect(() => {
    
    fetchUser()
    const subscription = DataStore.observe(User).subscribe(
      () => fetchUser())
    return () => subscription.unsubscribe();

    
  }, []);
  
    const navigation = useNavigation()


    
  //await DataStore.clear();
  const logOut = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  
  return (
    <>
    <OnlineStatusheader/>
  <ScrollView  style={styles.container}>
      
     
     
        {/* //Body */}
        <View style={{backgroundColor: "white", margin: 10, padding: 10, borderRadius: 15,}}>

              {/* //Notification */}
            
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
                <FontAwesome name="eye-slash" size={24} color="orange" />
                 </View>
  
                 <Text>
                Show as offline
                </Text>
                </View>
              
              
              <Switch 
        trackColor={{ false: "#767577", true: "#705AD0" }}
        thumbColor={isOnlineEnabled ? "white" : "white"}
        ios_backgroundColor="#ECF0F3"
        onValueChange={toggleSwitch}
        value={isOnlineEnabled} style={{
          justifyContent: "flex-end", transform: [{ scaleX: .9 }, { scaleY: .9 }]}} >
               </Switch>
            </View>
  

              {/* //Recent Calls */}
            <TouchableHighlight 
            underlayColor={"rgba(48,49,52, 0.2)"} 
            onPress={() => navigation.navigate("RecentCalls")}
            >
              <View style={styles.threeElement}>
              
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <Ionicons name="call" size={24} color="#79DB75" />
               </View>

               <Text>
               Recent Calls
              </Text>
              </View>
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>

               </View>
            </TouchableHighlight>

            


             {/* //Data and Storage */}
             <View style={styles.lastElemet}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.iconView} >
                <FontAwesome name="eye" size={24} color="orange" />
                 </View>
  
                 <Text>
                Show as online
                </Text>
                </View>
                
                <View style={{justifyContent: "center"}} >
                 <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
                 
                 </View>
              </View>
        </View>


        
{/* ////////////////////////////////////////////////////////////////////////////*/}

         <View style={{backgroundColor: "white", margin: 10, padding: 10, borderRadius: 15,}}>

              {/* //Notification */}
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <MaterialIcons name="notifications" size={24} color="red" />
               </View>

               <Text >
              Notifications
              </Text>
              </View>
              
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
            </View>

              {/* //Privacy */}
            <View style={styles.threeElement}>
              
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <MaterialIcons name="lock" size={24} color="#90A8B2" />
               </View>

               <Text>
              Privacy
              </Text>
              </View>
              


              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
            </View>

             {/* //Data and Storage */}
             <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.iconView} >
                <MaterialIcons name="storage" size={24} color="#40AE5E" />
                 </View>
  
                 <Text>
                Data and Storage
                </Text>
                </View>
                
                <View style={{justifyContent: "center"}} >
                 <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
                 
                 </View>
              </View>

              {/* //Language */}
            <View style={styles.lastElemet}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.iconView} >
                <Entypo name="language" size={24} color="#83BEEC" />
                 </View>
  
                 <Text>
                Language
                </Text>
                </View>
                
                <View style={{justifyContent: "center"}} >
                 <MaterialIcons name="arrow-forward-ios" size={20} color="#43B2C6"/>
                 
                 </View>
              </View>
        </View>


{/* ////////////////////////////////////////////////////////////////////////////*/}

       <View style={{backgroundColor: "white", margin: 10, padding: 10, borderRadius: 15,}}>

              {/* //Notification */}
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <Ionicons name="ios-share" size={24} color="#00BCF2" />
               </View>

               <Text >
              Share App
              </Text>
              </View>
              
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
            </View>

              {/* //Help */}
            <View style={styles.lastElemet}>
              
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <Ionicons name="information-outline" size={24} color="#6891B1" />
               </View>

               <Text>
              Help
              </Text>
              </View>
              


              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
            </View>
        </View>

   </ScrollView>
   </>

  );
}




export default OnlineStatus;

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      borderRadius: 30,
      flexGrow: 1,
      backgroundColor: "#ECF0F3",
      marginBottom: 50,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  
    settingsWord: {
      fontSize: 30, 
      paddingTop: 20, 
      paddingLeft: 10, 
      paddingBottom: 5, 
      fontWeight: "700", 
      color: "#4A4D55",
      marginRight:30,
      marginLeft: 30,
  },
  
    iconView: {
      borderWidth: 1.5, 
      borderColor: "#4A4D55", 
      borderRadius: 5, 
      padding: 2, 
      marginRight: 15
    },
  
    threeElement: {
      margin: 5, 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "space-between", 
      borderBottomWidth: 2, 
      borderColor: "rgba(144, 168, 178, 0.2)", 
      paddingBottom: 15,
    },
  
    lastElemet: {
        margin: 5, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",  
        borderColor: "rgba(144, 168, 178, 0.2)", 
        paddingBottom: 15,
    }
  });