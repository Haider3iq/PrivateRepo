import React from "react";
import {Pressable,View, Text, StyleSheet} from "react-native"
import { MaterialIcons } from '@expo/vector-icons'; 

const NewGroupButton = ({onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.row}>
            <MaterialIcons name="group-add" size={24} color="white" />
            <Text style={styles.text}> Create a New Group  </Text>
            </View>
            
        </Pressable>
    )
}

export default NewGroupButton


const styles = StyleSheet.create({

    row:{
        padding: 20,
        
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#3D4785"
    },
    text:{
        marginLeft: 5,
        fontSize: 15,
        color: "white"
    }

});