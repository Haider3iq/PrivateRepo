import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ActivityIndicator,} from "react-native";
import {Auth, Storage, DataStore } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native"
import ReplyAudioMe from "../../AudioPlayer/ReplyAudioMe";


const MeReply = ({message, user, isMe, soundURI, isDeleted}) => {

    if (!user) {
        return <ActivityIndicator />
    }

    return (

        <View style={[styles.rightContainerMe,
        ]}>
                
        <View>
            
        <View>
            
            
            <View>
                <View>
                <Text numberOfLines={1} style={styles.userNameText}>{user.name}</Text>
                {message.image && (
                    
                <View style={styles.S3ImageView}>
                    <S3Image
                        imgKey={message.image}
                        style={styles.S3Image}
                        resizeMode="cover" />
                </View>
                )}


                {soundURI && <View style={{marginRight: "-80%"}}>
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
    backgroundColor: "rgba(63,65,72,.5)",
     borderLeftWidth: 4,
     borderColor: "rgba(255,12,85, .9)",
     padding: 5,
     borderRadius: 5,
     margin: -8,
     marginBottom: 3,
     
 }, 
 image:{
     width: "100%",
     height: "100%",
     
 },
 userNameText: {
    color: "rgba(255,12,85, .9)", 
    fontWeight: "bold", 
    marginBottom: 3,
    
 },
 messageContent: {
    color:  "#F6F9FA", 
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

export default MeReply;