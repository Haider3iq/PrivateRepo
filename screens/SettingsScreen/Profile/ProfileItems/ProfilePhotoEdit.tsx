import { useNavigation } from "@react-navigation/core";
import { Auth, DataStore, Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Pressable, Platform, Image} from "react-native";
import { User } from "../../../../src/models";
import { BlurView } from 'expo-blur';
import manPhoto from "../../../../assets/images/manPhoto.png"
import * as ImagePicker  from "expo-image-picker";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { S3Image } from "aws-amplify-react-native"


const ProfilePhotoEdit =  ({showProfilePhotoEdit, setShowProfilePhoto,}) => {
    const [ user, setUser ] = useState<User | null> (null)
    const [updatedName, setUpdatedName] = useState <string | null>(null)
    const [image, setImage] = useState<string | null>(null);
    const [key, setKey] = useState <string | undefined> (undefined);

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

    useEffect(() => {
        sendImage()
    },[image])

    const getBlob = async (uri: string) => {
        const respone = await fetch(uri);
        const blob = await respone.blob();
        return blob;
      };

    const sendImage = async () => {
        if (!image) {
            return;
        } else if ( image === "image has been deleted") {
            return
        }
        const blob = await getBlob(image);
        const { key } = await Storage.put(`${uuidv4()}.png`,blob,);
        setKey(key)
    }
    
    const onPress = async () => {
        if(!user){return}
        
        if(image !== null && user?.imageUri !== image && image !== "image has been deleted") {
            await DataStore.save(User.copyOf(user, (updated) => 
            {updated.imageUri = key})).then(console.log("User new image", user.imageUri)).then(setShowProfilePhoto(prev => !prev));
            }  else if (image === "image has been deleted"){
                await DataStore.save(User.copyOf(user, (updated) => 
            {updated.imageUri = image})).then(setShowProfilePhoto(prev => !prev));
            } else {
                setShowProfilePhoto(prev => !prev);
            }
        }

        const goBack = () => {
            navigation.navigate("Profile")
        }

        const onCancel = () => {

            setShowProfilePhoto(prev => !prev, setImage(null))
    
            } 
    

         const DeleteImage = () => {
             setImage("image has been deleted")
         }


         const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
            });
        
            if (!result.cancelled) {
                setImage(result.uri);
              }
              
            };
    
            const takePhoto = async () => {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [4, 3],
                    quality: 0.5,
                });
        
                if (!result.cancelled) {
                    setImage(result.uri);
                }
            };
    

            
    
            


    return(
     <>
     {showProfilePhotoEdit ? <BlurView tint={"dark"} intensity={70} style={Platform.OS === "android" ?
        styles.pageAndroid : styles.pageIos}>

     <BlurView intensity={150} tint={"default"} style={{padding: 15, borderRadius: 12, overflow: 'hidden',}} >
        <View style={styles.userNameView}>

        {image !== "image has been deleted" && image !== null && <S3Image
        imgKey={key}
        style={{
        width: 350, height: 350, borderRadius: 10, alignSelf: "center",}}
        resizeMode="cover" />}


        {image !== "image has been deleted" && image === null && user?.imageUri !== "image has been deleted" && <S3Image
        imgKey={user?.imageUri}
        style={{
        width: 250, height: 250, borderRadius: 10, alignSelf: "center",}}
        resizeMode="cover" />}


                {image === "image has been deleted" || user?.imageUri === "image has been deleted" && image === null  ? <Image source={manPhoto} style={{width: 250, height: 250, borderRadius: 10, alignSelf: "center",}}/> : null}
                {image === null && user?.imageUri === null ? <Image source={manPhoto} style={{width: 250, height: 250, borderRadius: 10, alignSelf: "center",}}/> : null}
        
        </View>
        {/* //Buttons */}
        <Pressable onPress={takePhoto} style={{backgroundColor: "white", padding: 15, marginTop: 10, borderRadius:10, flexDirection: "row", alignItems: "center"}}>
        <AntDesign name="camera" size={24} color="black" style={{marginRight: 10, marginTop: -2,}} />
        <Text>
        Take a photo
        </Text>
        </Pressable>

        <Pressable onPress={pickImage} style={{backgroundColor: "white", padding: 15, marginTop: 10, borderRadius: 10,flexDirection: "row", alignItems: "center"}}>
        <Entypo name="folder-images" size={24} color="black" style={{marginRight: 10, marginTop: -2,}}/>
        <Text>
        Chose from library
        </Text>
        </Pressable>

        <Pressable onPress={DeleteImage} style={{backgroundColor: "red", padding: 15, marginTop: 10, borderRadius: 10,}}>
        <Text style={{color: "white"}}>
        Delete profile photo
        </Text>
        </Pressable>

        <View style={{flexDirection: "row", justifyContent: "space-between",}}>
        <Pressable onPress={onPress} style={Platform.OS === "ios" ? styles.saveAndCancelIos : styles.saveAndCancelAndroid}>
        <Text>
        Save
        </Text>
        </Pressable>

        <Pressable onPress={onCancel} style={Platform.OS === "ios" ? styles.saveAndCancelIos : styles.saveAndCancelAndroid}>
        <Text>
        Cancel
        </Text>
        </Pressable>
        </View>
        
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
    paddingTop: 180, 
    padding: 40, 
    width: "100%", 
    height: "100%", 
    marginBottom: "-198%", 
    zIndex: 1,
    },
    pageAndroid:{
        paddingTop: 140, 
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
     
    }, 

    saveAndCancelIos: {
        backgroundColor: "white", 
        padding: 15, 
        marginTop: 10,
        borderRadius: 10, 
        alignItems:"center", 
        minWidth: 148,
    },

    saveAndCancelAndroid: {
        backgroundColor: "white", 
        padding: 15, 
        marginTop: 10,
        borderRadius: 10, 
        alignItems:"center", 
        minWidth: 135,
    }

})

export default ProfilePhotoEdit;
