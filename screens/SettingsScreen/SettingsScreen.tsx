import React, {useEffect, useState, } from 'react';
import {Auth, DataStore} from 'aws-amplify';
import { StyleSheet, SafeAreaView, Pressable, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';
import { Text, View, } from '../../components/Themed';
import { Feather, MaterialIcons, Fontisto, Ionicons, Entypo, FontAwesome} from '@expo/vector-icons'; 
import { User} from "../../src/models"
import { useNavigation } from '@react-navigation/core';
import SettingsHeader from '../../navigation/SettingsHeader/SettingsHeader';
import * as Sharing from 'expo-sharing';
import Share from 'react-native-share';


export default function SettingsScreen() {
const [user, setUser] = useState <User|null> (null) 
  
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
    <SettingsHeader/>
  <ScrollView  style={styles.container}>
      
     
     
        {/* //Body */}
        <View style={{backgroundColor: "white", margin: 10, padding: 10, borderRadius: 15,}}>

              {/* //Notification */}
            <TouchableHighlight  underlayColor={"rgba(48,49,52, 0.2)"} onPress={()=> navigation.navigate("SavedMessages") }>
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <MaterialIcons name="label-important" size={25} color="#00BCF2" />
               </View>

               <Text >
              Saved Messages
              </Text>
              </View>
              
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
               
            </View>
            </TouchableHighlight >
              {/* //Recent Calls */}
            <TouchableHighlight 
            underlayColor={"rgba(48,49,52, 0.2)"} 
            onPress={() => {}}
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
             <TouchableHighlight 
            underlayColor={"rgba(48,49,52, 0.2)"}>
             <View style={styles.lastElemet}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.iconView} >
                <FontAwesome name="eye" size={24} color="orange" />
                 </View>
  
                 <Text>
                Online Status and Last Seen
                </Text>
                </View>
                
                <View style={{justifyContent: "center"}} >
                 <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
                 
                 </View>
              </View>
              </TouchableHighlight>
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
              <TouchableHighlight 
            underlayColor={"rgba(48,49,52, 0.2)"} 
            onPress={() => {}}
            >
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <Ionicons name="ios-share" size={24} color="#00BCF2" />
               </View>
              
               <Text>
              Share App
              </Text>
              </View>
              
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" size={20} color="#90A8B2"/>
               
               </View>
            </View>
            </TouchableHighlight>


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
      
      {/* //Login style */}
      <View style={{ marginTop: 20, backgroundColor: "#F0EFF4", alignItems:"center"}}>
      <Pressable onPress={logOut} style={{backgroundColor: "#705AD0", height: 50, width: 300, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 15, marginBottom: 10,}}>
      
      <MaterialIcons name="logout" size={24} color="white" />
      <Text style={{color:"white", fontWeight: "bold",}}> Logout </Text>
        
      </Pressable>
      </View>
      

   </ScrollView>
   </>

  );
}

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
