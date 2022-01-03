import Auth from "@aws-amplify/auth";
import { StatusBar } from 'expo-status-bar';
import { DataStore } from "@aws-amplify/datastore";
import { AntDesign, EvilIcons, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react"
import {Text, View, Image, Pressable, TextInput, Platform,} from "react-native"
import { User } from "../../src/models";
import styles from "./styles";


const CommentsHeader = () => {
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
          alignItems: "center",
          justifyContent: "space-between",
          }}>
        <View style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,} } >
               <Ionicons name="arrow-back" size={30} color="white"/>
               
               </View>
        
        </Pressable>
        
        <Text style={{color: "white", fontWeight: "700", fontSize: 22,}} > Comments </Text>


        <Pressable 
               onPress={() => {}} style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,} } >
        
        <FontAwesome name="send" size={19} color="white" style={{padding: 5,}} />
        </Pressable>
        

      
      
    
      <StatusBar style={"light"} />
      </View>
  );
}

export default CommentsHeader;