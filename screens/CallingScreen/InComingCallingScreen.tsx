import React from "react";
import {View, Text, StyleSheet, Image, ImageBackground, Pressable, Alert} from "react-native";
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import ios_bg from "../../assets/images/ios_bg.jpg";

const InComingCallingScreen = () => {
    const onDecline = () => {
        Alert.alert("The Decline button", "this is only UI")
    }
    const onAccpet = () => {
        Alert.alert("The accept button", "this is only UI")
    }
    
    return(
    <View >
        <ImageBackground source={ios_bg} style={styles.image} resizeMode="cover">
        
        <View style={styles.page}>
        <Ionicons name="md-arrow-back-circle" size={45} color="white" />
        <View style={styles.body}>
                <Text style={styles.name}> UserName </Text>
                <Text style={styles.phoneNumber}> HiTHERE calling... </Text>
            </View>

            
        


            

        <View style={styles.timerAndMessageView}>
        <Pressable>
            <MaterialCommunityIcons name="timer" size={30} color="white" style={{alignSelf: "center"}} />
            <Text style={{color: "white", alignSelf: "center", marginTop: 5,}}> Remind Me</Text>
        </Pressable>
            
        <Pressable>
            <Entypo name="message" size={30} color="white" style={{alignSelf: "center"}} />
            <Text style={{color: "white", alignSelf: "center", marginTop: 5,}}>Quick chat</Text>
        </Pressable>
        </View>


        <View style={styles.icons}>
        <Pressable onPress={onDecline}>
            <Ionicons name="close-outline" size={50} color="white" style={styles.redIconBorder} />
            <Text style={{color: "white", alignSelf: "center", marginTop: 5,}}>Decline</Text>
        </Pressable>


        <Pressable onPress={onAccpet}>
            <Ionicons name="checkmark-outline" size={50} color="white" style={styles.blueIconBorder} />
            <Text style={{color: "white", alignSelf: "center", marginTop: 5,}}>Accept</Text>
        </Pressable>
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
    image:{
        width: "100%",
        height: "100%",
    },
    
    body: {
        alignItems: "center",
        
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
    arrowUp:{
    },
    
    
    iconsBorder:{
    backgroundColor:"#3D4785", 
    padding: 10, 
    borderRadius: 10,
    },

    timerAndMessageView:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "80%",
        padding: 40,
        paddingBottom: 20,
    },
    
    timer:{

    },

    message:{

    },

    icons:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 40,
        paddingBottom: 40,
        
    
    },

    redIconBorder:{
        backgroundColor:"red",
        padding: 10, 
        borderRadius: 10,
    },
    blueIconBorder:{
        backgroundColor:"blue",
        padding: 10, 
        borderRadius: 10,
    },

    

})

export default InComingCallingScreen;