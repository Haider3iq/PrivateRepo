import React, { useState } from "react";
import {View, Text, StyleSheet, Image, ImageBackground, Pressable, Alert} from "react-native";
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import ios_bg from "../../assets/images/ios_bg.jpg";

const CallingScreen = () => {
    const [isCameraOn , setIsCameraOn] = useState(true);
    const [ isMute, setIsMute ] = useState(true);
    
    const onSpeackerPress = () => {
        Alert.alert("The Speacker button", "This is only UI")
    }
    const onVideoPress = () => {
        setIsCameraOn(currentVlaue => !currentVlaue)
    }
    const onMutePress = () => {
        setIsMute(currentValue => !currentValue)
    }
    const onHangOutPress = () => {
        Alert.alert("The hang out Button", "This is only UI")
    }
    return(
    <View >
        <ImageBackground source={ios_bg} style={{width: "100%", height: "100%"}} resizeMode="cover">

        <View style={styles.page}>
            <Ionicons name="md-arrow-back-circle" size={45} color="white" />
            

            <View style={styles.body}>
                <Text style={styles.phoneNumber}> 00:00 </Text>
                <View style={styles.imageView}>
                <Image style={styles.image} source={ {uri:'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}} />
                </View>
               
            </View>

            

            
            <View style={styles.beforeIcons}>
            <Entypo name="chevron-up" size={45} color="#3D4785" style={{alignSelf:"center", marginBottom: -10, marginTop: -20,}} />
            
            <View style={styles.icons}>
                
                <Pressable onPress={onSpeackerPress} style={styles.iconsBorder}>
                <FontAwesome name="volume-up" size={35} color="white"  />
                </Pressable>
            
            
                <Pressable onPress={onVideoPress} style={styles.iconsBorder}>
                <FontAwesome5 name={isCameraOn ? "video-slash" : "video"} size={35} color="white" />
                </Pressable>
            
                <Pressable onPress={onMutePress} style={{ backgroundColor: "#3D4785", padding: 10, paddingRight: 15, paddingLeft: 15, borderRadius: 10,}}>
                <FontAwesome name={isMute ? "microphone" : "microphone-slash"} size={35} color="white" />
                </Pressable>

                <Pressable onPress={onHangOutPress} style={{ backgroundColor:"red",padding: 10, borderRadius: 10,}}>
                <Ionicons name="call" size={35} color="white"/>
                </Pressable>

            </View>
            </View>
        </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create ({

    page:{
        height: "100%",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 50,
        paddingLeft: 10,
    },
    
    body: {
        alignItems: "center",
        flex: 1,
    },
    

    imageView:{
        alignSelf: "flex-end",
        shadowColor: "#000",
        shadowOffset: {width:10, height: 10,},
        shadowOpacity: .3,
        elevation: 10,
        shadowRadius: 20,
    },
    
    image: {
        height: 170,
        width: 115,
        borderRadius: 15,
        backgroundColor: "white",
        marginRight: 15,
        borderWidth: 2,
        borderColor: "white",
        
        
       
        
      },
    
      name: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 5,
    },
    phoneNumber: {
        color: "#E4E6EB",
        fontSize: 18,
        overflow: "hidden",
        
        
    },
    beforeIcons:{
        padding: 20,
        marginLeft: -10,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: "rgba(0, 0, 0, .5)",
    },
    arrowUp:{
    },
    icons:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 40,
        marginLeft: -20,
        marginRight: -20,
    
    },
    iconsBorder:{
    backgroundColor:"#3D4785", 
    padding: 10, 
    borderRadius: 10,
    }
    

})

export default CallingScreen;