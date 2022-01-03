import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ActivityIndicator, Image, Pressable, Alert} from "react-native";
import {Auth, Storage, DataStore } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native"
import ReplyAudioMe from "../../AudioPlayer/ReplyAudioMe";



import {Ionicons } from '@expo/vector-icons';
import { User, Message as MessageModel} from "../../../src/models"

const SenderReply = ({message, user, isMe, soundURI, isDeleted}) => {
         
    if (!user) {
        return <ActivityIndicator />
    }

    return (
     
        <View>
                
                <View>  
                    
                <View style={[styles.rightContainerMe,]}>
                    
                    <View>
                        <View>
                        <Text numberOfLines={1} style={styles.userNameText}>{isMe ? "you" : user.name}</Text>
                        {message.image && (
                            
                        <View style={styles.S3ImageView}>
                            <S3Image
                                imgKey={message.image}
                                style={styles.S3Image}
                                resizeMode="cover" />
                        </View>
                        )}


                        {soundURI && <View style={{marginRight: "-25%"}}>
                            <ReplyAudioMe soundURI={soundURI}/>
                            </View>}
                        {!!message.content && (
                        <Text numberOfLines={1} style={styles.messageContent} >
                            {isDeleted ? "Message deleted" : message.content}
                        </Text>
                        )}
                        </View>
                    </View>                
                   
                    </View>
                    

                </View>
                
                
                
            </View>
            
    );
};

const styles = StyleSheet.create ({
 

 rightContainerMe:{
     backgroundColor: "#F6F9FA",
     borderLeftWidth: 4,
     borderColor: "#705AD0",
     padding: 5,
     borderRadius: 5,
     margin: -7,
     marginBottom: 3,
     
 }, 
 image:{
     width: "100%",
     height: "100%",
 },

 userNameText: {
    color: "#3D4785", 
    fontWeight: "bold", 
    marginBottom: 3,
    
 },

 messageContent: {
    color:  "#555658", 
    alignSelf:"flex-start"
 },

 S3Image:{
    width: "100%", 
    aspectRatio: 3 / 4, 
    borderRadius: 7, 
    marginTop: 0, 
    marginRight: 5, 
    marginLeft: -2,
 },

 S3ImageView:{
     width: 30,
 },
});

export default SenderReply;