import { useNavigation } from "@react-navigation/core";
import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {View, Text, TextInput, StyleSheet, Pressable, Alert, Platform, KeyboardAvoidingView} from "react-native";
import { User } from "../../../../src/models";
import { BlurView } from 'expo-blur';
import { ScrollView } from "react-native-gesture-handler";


const UserNameEdit =  ({showUserNameEdit, setShowUserNameEdit}) => {
    const [ user, setUser ] = useState<User | null> (null)
    const [updatedName, setUpdatedName] = useState <string | null>(null)
    const [visible, setVisible] = useState <boolean>(false)

    const navigation  = useNavigation()

    useEffect(() => {
        const fetchUser = async () =>
        {
            const authUser = await Auth.currentAuthenticatedUser()
            const fetchUser = await DataStore.query(User,authUser.attributes.sub)
            if(fetchUser) {
                setUser(fetchUser);
            }
           
            
        };

        fetchUser()
    },[user])

    const onPress = async () => {
        if(!user){return}
        if(updatedName !== null && user?.name !== updatedName){
                await DataStore.save(
                    User.copyOf(user, (updated) => {
                        updated.name = updatedName;
                      })
                   ).then(setShowUserNameEdit(prev => !prev));
            } else {
                setShowUserNameEdit(prev => !prev);
            }
        }

        

        const onCancel = () => {
                setShowUserNameEdit(prev => !prev)
         }

        

    return(
     <>
     {showUserNameEdit ? <BlurView tint={"dark"} intensity={70} style={Platform.OS === "android" ?
        styles.pageAndroid : styles.pageIos}>

     <BlurView intensity={150} tint={"default"} style={{padding: 15, borderRadius: 12, overflow: 'hidden',}} >
        <View style={styles.userNameView}>

        <Text style={styles.userName}>
             Username
            </Text>
           
        <View >
            <TextInput maxLength={30} defaultValue={user?.name} multiline={true} autoFocus onChangeText={setUpdatedName} returnKeyType="done" onSubmitEditing={onPress} style={{textAlignVertical: "top"}}>
            </TextInput>
        </View>
        
        </View>
        {/* //Buttons */}
        <Pressable onPress={onPress} style={{backgroundColor: "white", padding: 15, marginTop: 10, borderRadius:10,}}>
        <Text>
        Save changes
        </Text>
        </Pressable>

        <Pressable onPress={onCancel} style={{backgroundColor: "white", padding: 15, marginTop: 10, borderRadius: 10,}}>
        <Text>
        Cancel
        </Text>
        </Pressable>
        {/* //Buttons edn here */}

        <View>

        </View>
     </BlurView>
    

        </BlurView> : null} 

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

export default UserNameEdit;
