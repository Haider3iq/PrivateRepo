import Auth from "@aws-amplify/auth";
import { StatusBar } from 'expo-status-bar';
import { DataStore } from "@aws-amplify/datastore";
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react"
import {Text, View, Image, Pressable, TextInput, Platform,} from "react-native"
import { User } from "../../src/models";
import styles from "./styles";


const ProfileHeader = () => {
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

        <Pressable style={{
          flexDirection: "row",
          alignItems: "center",
          }}>
        <View >
        <Text style={{color: "white", fontSize: 17, fontWeight: "700",}}>{user?.name}</Text>
               
               </View>
        </Pressable>
        

        <Pressable onPress={() => navigation.navigate("Settings")}  style={{
          flexDirection: "row",
          alignItems: "center",
          }}>
        <View style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,} } >
        <MaterialCommunityIcons name="menu-open" size={30} color="white" />
               </View>
        
        </Pressable>
        

      
      
    
      <StatusBar style={"light"} />
      </View>
  );
}

export default ProfileHeader;