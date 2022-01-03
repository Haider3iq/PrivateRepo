import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { StatusBar } from 'expo-status-bar';
import { AntDesign, EvilIcons, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react"
import {Text, View, Image, Pressable, TextInput, Platform, TouchableHighlight,} from "react-native"
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";
import styles from "./styles";
import { transform } from "@babel/core";


const ChatsScreenHeader = () => {

  const [user, setUser] = useState <User|null>(null)



  const [loaded] = useFonts({
    NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
  });
  
  
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
  
  
      const navigation = useNavigation();
  
      if(!loaded) {return null}
    
  return (
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={{
          flexDirection: "row",
          }}>
        <View style={{borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,}}>
               <Ionicons name="arrow-back" size={26} color="white"/>
               </View>
        
        </Pressable>

          <View style={{backgroundColor: "white", padding: 5, flexDirection: "row", alignItems
          : "center", borderRadius: 10}}>
          {!user?.imageUri && <View style={{
            backgroundColor: user?.color,
            minHeight: 40,
            minWidth: 40,
            marginRight: 5, 
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderBottomStartRadius: 15,
            borderBottomEndRadius: 15,
          }}>
          <Text style={styles.noImageText}>{user?.name[0]}</Text>

          {/* Online status */}
          <View style={{
            maxWidth: 15, 
            minHeight: 15, 
            borderRadius: 10, 
            backgroundColor: "red",
            borderWidth: 4,
            borderColor: "white",
            marginLeft: 25,
            transform: [{translateY: -20,}],
            
            

            
            }}/>
          </View>}

          {user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.image}
        resizeMode="cover" />)} 


          <Text 
          numberOfLines={1}
          style={{color: "#4A4D55", fontWeight: "700", fontSize: 15, maxWidth: 200
          }}>{user?.name}</Text>


          </View>

          <View 
          style={{
            flexDirection: "row",
            }}>
          
                 <TouchableHighlight 
                 underlayColor={"rgba(0,0,0,0.5)"} 
                 style={{borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,}} 
                 >
          
          <MaterialIcons 
          name="group-add" 
          size={26} 
          color="white" 
          style={{padding: 1,}} 
          />
          </TouchableHighlight>
          
          </View>
          
  
        
        
      
        <StatusBar style={"light"} />
        </View>
    );
  }

export default ChatsScreenHeader;