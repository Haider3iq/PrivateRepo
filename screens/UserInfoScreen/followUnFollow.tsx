import { useNavigation } from "@react-navigation/core";
import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import {View, Text, TextInput, StyleSheet, Pressable, Alert, Platform, KeyboardAvoidingView, Animated} from "react-native";
import { User } from "../../../../src/models";
import { BlurView } from 'expo-blur';
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 10000,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

const FollowUnFollow =  ({onFollowUnFollow, setShowModal, showModal, user}) => {


    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

   
    
        const onCancel = () => {
            setShowModal(prev => !prev)
        }

        const onUnFollow = () => {
            onFollowUnFollow(setShowModal(prev => !prev))
        }

    return(
     <>

     {showModal ? 
     
          
     <BlurView tint={"dark"} intensity={70} style={Platform.OS === "android" ?
        styles.pageAndroid : styles.pageIos}>

     <BlurView intensity={150} tint={"default"} style={{padding: 15, borderRadius: 12, overflow: 'hidden',}} >
        <View style={styles.userNameView}>

        <Text style={styles.userName}>
             unFollowing {user?.name}
            </Text>
           
        <View>
            <Text style={{textAlignVertical: "top"}}>
                You are about to unfollow {user?.name}, do you still want to unfollow? 
            </Text>  
                
        </View>
        
        </View>
        {/* //Buttons */}
        <TouchableHighlight underlayColor={"rgba(255, 0, 0, 0.9)"} onPress={onUnFollow} style={{backgroundColor: "red", padding: 15, marginTop: 10, borderRadius:10,}}>
        <Text style={{color: "white"}}>
        Unfollow
        </Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={"rgba(250, 250, 250, 0.98)"} onPress={onCancel} style={{backgroundColor: "white", padding: 15, marginTop: 10, borderRadius: 10,}}>
        <Text>
        Cancel
        </Text>
        </TouchableHighlight>
        {/* //Buttons edn here */}

        <View>

        </View>
     </BlurView>
    

        </BlurView> 
        : null} 

         </>
    )
    
}

const styles = StyleSheet.create({
    pageIos:{
    paddingTop: 200, 
    padding: 40, 
    width: "100%", 
    height: "100%", 
    marginBottom: "-198%", 
    zIndex: 1,
    },
    pageAndroid:{
        paddingTop: 200, 
        padding: 40, 
        width: "100%", 
        height: "100%", 
        marginBottom: "-186%", 
        zIndex: 1,
        },
    userNameView:{
    padding: 15,
    backgroundColor: "white",
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
     
    }

})

export default FollowUnFollow;
