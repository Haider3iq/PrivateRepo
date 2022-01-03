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


const UserInfoScreenHeader = (user) => {




const [loaded] = useFonts({
  NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
});


    const navigation = useNavigation();

    if(!loaded) {return null}
  
return (
      <View style={styles.header}>

        <Pressable onPress={() => navigation.goBack()} style={{
          flexDirection: "row",
          alignItems: "center",
          }}>
        <View style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,} } >
               <Ionicons name="arrow-back" size={30} color="white"/>
               
               </View>
        
        </Pressable>
        
        <Text style={{color: "white", fontWeight: "700", fontSize: 20,}} >{user.name}</Text>

        <Pressable onPress={() => {}} style={{
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

export default UserInfoScreenHeader;