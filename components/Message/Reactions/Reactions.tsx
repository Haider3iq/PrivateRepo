import { useNavigation } from "@react-navigation/core";
import { Auth, DataStore, Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {View, SafeAreaView, TouchableWithoutFeedback, Text, StyleSheet, Pressable, Platform, Image, Alert} from "react-native";
import { Message, User } from "../../../src/models";
import { BlurView } from 'expo-blur';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker  from "expo-image-picker";
import { AntDesign, Entypo, FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { S3Image } from "aws-amplify-react-native"
import moment from "moment";
import { TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";


const Reactions =  (props) => {
    const [ user, setUser ] = useState<User | null> (null)
    const [updatedName, setUpdatedName] = useState <string | null>(null)
    const [image, setImage] = useState<string | null>(null);
    const [key, setKey] = useState <string | undefined> (undefined);
    const [lastMessage, setLastMessage] = useState <boolean | null>(null) 
    const {showActionSheetWithOptions} = useActionSheet();
    const {firstreaction, secondReaction, thirdReaction, fourthReaction, fifthReaction, setAsMessageReply, showReactions, setShowReactions, message, ReactionsBoolean} = props;
    const navigation  = useNavigation()

    
    const deleteMessage = async () => {
        await DataStore.delete(message).then(setShowReactions(false));
     };
     
     const confirmaDelete = () => {
         Alert.alert("Confirm delete", "Are you sure you want to delete message", [
            {
               text: "Delete",
               onPress: deleteMessage,
               style: "destructive"
            },

            {
                text: "Cancel",
             }
         ])
     }
//      const onActionPress = (index) => {
//          if(index === 0) {
//              Alert.alert("you have not Implemented this feature yet") } else if (index === 2){
//                  return null

//              } else if(!isMe && index === 1) {
//                  return null
//              } else {
//                  confirmaDelete();
//          }
//      };
//      const openMessageMenu = () => {
//      const options = ["Delete only from me"];
//      if (isMe) {
//          options.push("Delete");
//      }
//      options.push("Cancel")
//      const destructiveButtonIndex = 1;
//      const cancelButtonIndex = 2;
//      showActionSheetWithOptions(
//          {
//          options,
//          destructiveButtonIndex, 
//          cancelButtonIndex
//      }, 
//          onActionPress
//      );
//  };
            const onDeleteFromMe= () => {
                Alert.alert("you have not Implemented this feature yet")
            }

            const onDelete= () => {
                confirmaDelete();
            }

            const onCancel = () => {
                setShowReactions(currenatValue => !currenatValue)
            }
    
            // useEffect(() => {
        
            //     const fetchMessagesNumber = async () => {
            //         const messages = (await DataStore.query(
            //             Message, media => media.chatroomID("eq", propChatRoomForReactions)))
            //             if(!messages) {return null}
            //             if(message === messages[0]){
            //                 setLastMessage(true)
            //                 console.log("LastMessage",lastMessage)
            //             } else {
            //                console.log("its not")
            //             }
            //     }
            //     fetchMessagesNumber();
            // }, [])
            
            const closeReaction = () => { 
                setShowReactions(false)
            }

            
        

    return(
     <>
     
     {showReactions && <SafeAreaView style={styles.notMePage}>

     {/* <Pressable  style={{
        backgroundColor: "#FFFF",
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        maxWidth:"80%",
        borderBottomRightRadius: 8,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        marginLeft: 10,
        marginRight: "auto",
        marginBottom: 15,}}>
        <Text style={isMe ? {color: "white", fontSize: 12,}:
        {color: "#555658", fontSize: 14,}}>
        {message?.content}
        </Text>

        <Text style={isMe ? {color: "white", fontSize: 12,}:
        {color: "#555658", fontSize: 12,}}>
        {moment(message.createdAt).format("LT")}
        </Text>
        </Pressable> */}
     <BlurView intensity={100} tint={"light"} style={{padding: 10,  borderRadius: 12, overflow: 'hidden', backgroundColor: "blue" }} >


        <View style={styles.userNameView}>
        
        <TouchableHighlight onPress={firstreaction} underlayColor={"rgba(144, 168, 178, .2)"} style={{paddingTop:5, paddingBottom:5, borderRadius: 50, paddingRight: 10, paddingLeft: 10,}} >
        <Text style={Platform.OS === "ios" ? {fontSize: 25, } : {fontSize: 20,}}>😍</Text>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={secondReaction} underlayColor={"rgba(144, 168, 178, .2)"} style={{paddingTop:5, paddingBottom:5, borderRadius: 50, paddingRight: 10, paddingLeft: 10,}} >
        <Text style={Platform.OS === "ios" ? {fontSize: 25, } : {fontSize: 20,}}>😂</Text>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={thirdReaction} underlayColor={"rgba(144, 168, 178, .2)"}  style={{paddingTop:5, paddingBottom:5, borderRadius: 50, paddingRight: 10, paddingLeft: 10,}}>
        <Text style={Platform.OS === "ios" ? {fontSize: 25, } : {fontSize: 20,}}>😡</Text>
        </TouchableHighlight>
        

        <TouchableHighlight onPress={fourthReaction} underlayColor={"rgba(144, 168, 178, .2)"} style={{paddingTop:5, paddingBottom:5, borderRadius: 50, paddingRight: 10, paddingLeft: 10,}}>
        <Text style={Platform.OS === "ios" ? {fontSize: 25, } : {fontSize: 20,}}>👍</Text>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={fifthReaction} underlayColor={"rgba(144, 168, 178, .2)"} style={{paddingTop:5, paddingBottom:5, borderRadius: 50, paddingRight: 10, paddingLeft: 10,}}>
        <Text style={Platform.OS === "ios" ? {fontSize: 25, } : {fontSize: 20,}}>👎</Text>
        </TouchableHighlight>
        
        </View>
        
        
        {/* //Buttons */}

        <TouchableHighlight underlayColor={"rgba(144, 168, 178, .2)"} 
        onPressIn={setAsMessageReply} onPress={closeReaction}>

        <Pressable style={{padding: 10, marginTop: 10, borderRadius:10, flexDirection: "row",justifyContent:"space-between", alignItems: "center", borderBottomWidth: 1.4, borderColor: "rgba(144, 168, 178, .2)"}}>
        
        <Text>
        Reply
        </Text>
        
        </Pressable>
        </TouchableHighlight>
        


        <TouchableHighlight underlayColor={"rgba(144, 168, 178, .2)"} >
        <Pressable  style={{ padding: 10, marginTop: 10, borderRadius:10, flexDirection: "row",justifyContent:"space-between", alignItems: "center", borderBottomWidth: 1.4, borderColor: "rgba(144, 168, 178, .2)"}}>
        
        
        <Text style={{alignSelf: "flex-start"}}>
        Delete only from me
        </Text>
        <MaterialIcons name="delete-forever" size={24} color="#4A4D55" style={{marginRight: 10, marginTop: -2, alignSelf: "flex-end"}} />
        </Pressable>
        </TouchableHighlight>

        
        <TouchableHighlight onPress={confirmaDelete} underlayColor={"rgba(144, 168, 178, .2)"} >
        <Pressable  style={{ padding: 10, marginTop: 10, borderRadius:10, flexDirection: "row",justifyContent:"space-between", alignItems: "center", }}>
        
        
        <Text style={{alignSelf: "flex-start", color: "red",}}>
        Delete from both
        </Text>
        <MaterialIcons name="delete-forever" size={24} color="red" style={{marginRight: 10, marginTop: -2, alignSelf: "flex-end"}} />
        </Pressable>
        </TouchableHighlight>
        

        {/* <View style={{flexDirection: "row", justifyContent: "space-between",}}>
        <Pressable onPress={onPress} style={Platform.OS === "ios" ? styles.saveAndCancelIos : styles.saveAndCancelAndroid}>
        <Text>
        Save
        </Text>
        </Pressable>

        <Pressable onPress={onCancel} style={Platform.OS === "ios" ? styles.saveAndCancelIos : styles.saveAndCancelAndroid}>
        <Text>
        Cancel
        </Text>
        </Pressable>
        </View> */}
        
        {/* //Buttons edn here */}

        <View>

        </View>
     </BlurView>
    

        </SafeAreaView> }

         </>
    )
    
}

const styles = StyleSheet.create({
    isMepage:{
        paddingTop: 10, 
        padding: 10, 
        width: 380,
        zIndex: 1,
    
    },
    notMePage:{
        paddingTop: 10, 
        padding: 10,
        margin:10, 
        width: 240,
        zIndex: 1,
        },
    userNameView:{
    flexDirection: "row",
    justifyContent:"center",
    padding: 15,
    borderBottomWidth: 1.4, 
    borderColor: "rgba(144, 168, 178, .2)",
    borderRadius: 10,
    },

    userName:{
    color: "lightgray",
    fontSize: 15,
    marginBottom: 3,
    fontFamily: "NewueHaas"
    },

    userNameValue:{
    color: "lightgray",
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 3,
     
    }, 

    saveAndCancelIos: {
        backgroundColor: "white", 
        padding: 15, 
        marginTop: 10,
        borderRadius: 10, 
        alignItems:"center", 
        minWidth: 148,
    },

    saveAndCancelAndroid: {
        backgroundColor: "white", 
        padding: 15, 
        marginTop: 10,
        borderRadius: 10, 
        alignItems:"center", 
        minWidth: 135,
    }

})

export default Reactions;


