import { useNavigation } from "@react-navigation/core";
import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {View, Text, TextInput, StyleSheet, Pressable, Alert, Platform, KeyboardAvoidingView} from "react-native";
import { User } from "../../../../src/models";
import { BlurView } from 'expo-blur';
import { ScrollView } from "react-native-gesture-handler";


const UserBioEdit =  ({showUserBioEdit, setShowUserBioEdit}) => {
    const [ user, setUser ] = useState<User | null> (null)
    const [updatedBio, setUpdatedBio] = useState <string | null>(null)
    const [leftCharacters, setLeftCharacters] = useState <number | null>(null)
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
        if(updatedBio !== null && user?.status !== updatedBio){
                await DataStore.save(
                    User.copyOf(user, (updated) => {
                        updated.status = updatedBio;
                      })
                   ).then(setShowUserBioEdit(prev => !prev));
            } else {
                setShowUserBioEdit(prev => !prev);
            }
        }


        const onCancel = () => {
                setShowUserBioEdit(prev => !prev, setUpdatedBio(null))
         }


    return(
     <>
     {showUserBioEdit ? <BlurView tint={"dark"} intensity={70} style={Platform.OS === "android" ?
        styles.pageAndroid : styles.pageIos}>

     <BlurView intensity={150} tint={"default"} style={{padding: 15, borderRadius: 12, overflow: 'hidden',}} >
        <View style={styles.userNameView}>

        <Text style={styles.userName}>
             Bio
            </Text>
           
        <View >
            <TextInput multiline={true} maxLength={80} defaultValue={user?.status} autoFocus onChangeText={setUpdatedBio} returnKeyType="done" onSubmitEditing={onPress} style={{textAlignVertical: "top"}}>
            </TextInput>
               
            {updatedBio === null && <Text style={{alignSelf: "flex-end", color: "#90A8B2",marginBottom: -10, marginTop:5, marginRight: -10,}}>
                 left({80- user?.status?.length})
                </Text>}

                {updatedBio !== null && <Text style={{alignSelf: "flex-end", color: "#90A8B2",marginBottom: -10, marginTop:5, marginRight: -10,}}>
                 left({80- updatedBio?.length})
                </Text>}

                
                
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

export default UserBioEdit;
