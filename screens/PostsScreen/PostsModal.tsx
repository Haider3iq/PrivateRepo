import { FontAwesome, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import React, { useEffect, useRef, useState } from "react"
import {View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Pressable, Animated} from "react-native"



export default function PostsModal ({showModal, setShowModal}) {

        // const [slideUp, setSlideUp] = useState(500);

        const closeModal = () => {
           setTimeout( () => setShowModal(false), 0) 
           Animated.timing(slideUp, {
                toValue: 500,
                duration: 250,
                useNativeDriver: true
           }).start();
        }

        const slideUp = useRef(new Animated.Value(500)).current;

          useEffect(() => {
            Animated.timing(slideUp, {
                toValue: 5,
                duration: 200,
                useNativeDriver: true
            }).start();
          },[])



    return(
        <>
        
        {showModal && <Pressable onPress={closeModal} style={styles.page}>


            <Animated.View  style={[
                styles.secondPage, {transform: [{translateY: slideUp}], }, 
                ]}>
            
            <Pressable onPress={() =>  setShowModal(true)} style={styles.icons}>

            
                <Pressable onPress={() => setShowModal} style={styles.icon}>
                <FontAwesome name="share-square-o" size={35} color="white" />
                <Text style={{color: "white"}}>Share</Text>
                </Pressable>

                <Pressable onPress={() => setShowModal(true)} style={styles.icon}>
                <FontAwesome name="external-link" size={35} color="white" />
                <Text style={{color: "white"}}>Link</Text>
                </Pressable>

                <Pressable onPress={() => setShowModal(true)} style={[styles.icon, {marginRight: 0, backgroundColor: "red"}]}>
                <MaterialIcons name="report" size={44} color="white" style={{marginBottom: -4,}} />
                <Text style={{color: "white"}}>Report</Text>
                </Pressable>

                

            </Pressable>

            <View style={{
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 20,
                padding: 20,
                paddingLeft: 50,
                paddingRight: 50,
                backgroundColor: "white",
                flexDirection: "row"
            }}>
                <SimpleLineIcons name="info" size={24} color="black" />
                <Text style={{ fontSize: 18, color: "#4A4D55", fontWeight: "700", marginLeft: 10,}}>About this account</Text>
                


            </View>

            <View style={{
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 20,
                padding: 20,
                paddingLeft: 50,
                paddingRight: 50,
                backgroundColor: "white",
                flexDirection: "row"
            }}>
                <SimpleLineIcons name="user-unfollow" size={24} color="black" />
                <Text style={{ fontSize: 18, color: "#4A4D55", fontWeight: "700", marginLeft: 10,}}>Unfollow</Text>
                


            </View>

            <Pressable onPress={() => setShowModal(false)} style={{
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 20,
                padding: 20,
                paddingLeft: 50,
                paddingRight: 50,
                backgroundColor: "white",
                flexDirection: "row"
            }}>
                <SimpleLineIcons name="ban" size={24} color="red" />
                <Text style={{ fontSize: 18, color: "#4A4D55", fontWeight: "700", marginLeft: 10,}}>Block</Text>
                


            </Pressable>
            
            </Animated.View>
        </Pressable> }
        
        </>
    )
}

const styles = StyleSheet.create({


page:{
    paddingTop: (Platform.OS === "ios") ? 440 : 330, 
    width: "100%", 
    height: "100%", 
    marginBottom: (Platform.OS === "ios") ? "-198%" : "-187%", 
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
},

secondPage: {
    marginBottom: -100,
    backgroundColor: "#ECF0F3",
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    justifyContent: "flex-end",
    paddingBottom: 120,
    borderRadius: 30,
    zIndex: 2,
    

},

icons: {
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"

},

icon : {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    maxHeight: 80,
    maxWidth: (Platform.OS === "ios") ? 120 : 110, 
    minWidth: (Platform.OS === "ios") ? 120 : 110,
    backgroundColor: "#705AD0",
    borderRadius: 10,
    marginRight: 15,
},
})


