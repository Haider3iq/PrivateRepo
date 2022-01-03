import React from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from "@react-navigation/core";

const VideoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const chatRoomUser = route?.params?.user;

    const goBack = () => {
        navigation.goBack();
    }
    
    
    
    
    return(
    <View style={styles.page}>
        
            <Pressable onPress={goBack}>
              <Ionicons name="md-arrow-back-circle" size={45} color="white" />
            </Pressable>
            <View style={styles.body}>
                <Text numberOfLines={1} style={styles.name}>{chatRoomUser?.name} </Text>
                <Text style={styles.phoneNumber}> calling +358 45 3222626...</Text>
            </View>

            <View style={styles.imageView}>
            <Image source={{uri: !chatRoomUser?.imageUri ? "https://amplify-hideer-staging-191248-deployment.s3.us-east-2.amazonaws.com/avatars/man+(2).png" : chatRoomUser?.imageUri }}
            style={!chatRoomUser?.imageUri ? 
            styles.image : styles.image}/>
            </View>

            
            <View style={styles.beforeIcons}>
            <View style={styles.icons}>
            <FontAwesome name="volume-up" size={35} color="white" style={styles.iconsBorder} />
            <FontAwesome name="video-camera" size={35} color="white" style={styles.iconsBorder} />
            <FontAwesome name="microphone-slash" size={35} color="white" style={styles.iconsBorder}/>
            <Ionicons name="call" size={35} color="white"  style={{ backgroundColor:"red",padding: 10, borderRadius: 10,}}/>
            </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create ({

    page:{
        backgroundColor:  "#3D4785",
        height: "100%",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 50,
        paddingLeft: 10,
    },
    
    body: {
        alignItems: "center",
        
    },
    

    imageView:{
        alignItems: "center",
        marginTop: 100,
        flex: 1,
    },
    
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: "white",
        marginRight: 10,
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

export default VideoScreen;