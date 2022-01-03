import Auth from "@aws-amplify/auth";
import { StatusBar } from 'expo-status-bar';
import { DataStore } from "@aws-amplify/datastore";
import { AntDesign, EvilIcons, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react"
import {Text, View, Image, Pressable, TextInput, Platform, Alert,} from "react-native"
import { User } from "../../src/models";
import styles from "./styles";
import { TouchableHighlight } from "react-native-gesture-handler";


const PostsHeader = (onSaveChanges) => {



const navigation = useNavigation();

const onPress = () => { 
  navigation.navigate("ChatsScreen1");
    // Alert.alert("button", "button is pressed ")
  }

const [loaded] = useFonts({
  NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
});


    if(!loaded) {return null}
  
return (
      <View style={styles.header}>

        <Text style={{color: "white", fontWeight: "700", fontSize: 20,}} > HelloThere </Text>

        <View style={{
          flexDirection: "row",
          alignItems: "center",}}>
        <Pressable  onPress={onPress} style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 15} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 15,} } >
        
        <FontAwesome name="heart" size={15} color="white" style={{padding: 5,}} />
               </Pressable >
               <Pressable 
               onPress={onPress} style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,} } >
        
        <FontAwesome name="send" size={15} color="white" style={{padding: 5,}} />
        </Pressable>
        
        </View>
        

      
      
    
      <StatusBar style={"light"} />
      </View>
  );
}

export default PostsHeader;