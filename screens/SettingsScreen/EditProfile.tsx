import { Auth } from "@aws-amplify/auth";

import { DataStore } from "@aws-amplify/datastore";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, } from "@react-navigation/core";
import { useFonts } from "expo-font";
import React, {useState, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable, Alert, Image, Platform, ScrollView, KeyboardAvoidingView} from "react-native";
import * as ImagePicker  from "expo-image-picker";
import { User } from "../../src/models";
import { useActionSheet } from '@expo/react-native-action-sheet';
import ProfileUserName from "./Profile/ProfileItems/NameEdit";
import ProfileEditHeader from "../../navigation/ProfileEditHeader/ProfileEditHeader";
import { S3Image } from "aws-amplify-react-native";


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

const changeNameItem = () => {
const [updatedName, setUpdatedName] = useState <string | null>(null);
const [updatedBio, setUpdatedBio] = useState<string | null>(null);
const [cancel, updateCancel] = useState <boolean> (false);
const [showModal, setShowModal] = useState(false);
const [user, setUser] = useState<User | null> (null);
const [image, setImage] = useState<string | null>(null);
const [showImage, setShowImage] = useState(false)

    const [loaded] = useFonts({
        NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
      });

      const route = useRoute()
    //   const user = route?.params?.userData
      const fetchUser = async () =>
        {
            const authUser = await Auth.currentAuthenticatedUser()
            const fetchUser = await DataStore.query(User, authUser.attributes.sub)
            if(fetchUser) {
                setUser(fetchUser);
            }
            
        };

            useEffect(() => {
                fetchUser()
            },[])
                

            

         
    


        useEffect(() => {
        
            (async () => {
              if (Platform.OS !== 'web') {
                const libraryResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoRosponse = await ImagePicker.requestCameraPermissionsAsync();
                 if (
                    libraryResponse.status !== 'granted' || 
                    photoRosponse.status !== "granted"
                    ) {
                  alert('Sorry, we need camera roll permissions to make this work!');
                }
              }
            })();
            console.log("test from edit profile")
          }, []);

        const onSaveChanges = async () => {
            if(!user) {
                return
            }
            if(updatedBio !== null && updatedBio !== user?.status){
                    await DataStore.save(
                        User.copyOf(user, (updated) => {
                            updated.status = updatedBio;
                          })
                       )
                } if (updatedName !== null) {
                await DataStore.save(
                    User.copyOf(user, (updated) => {
                        updated.name = updatedName;
                    }
                  )
                );

               } if (image !== null) {
                   await DataStore.save(User.copyOf(user, (updated) => 
                   {
                       updated.imageUri = image
                    })
                   );
               } else if(updatedBio === null && updatedName === null && image === null) {
                    navigation.goBack()
               }
           }

           

    const navigation = useNavigation()

    const goBack = () => {
        navigation.goBack()
    }
      if(!loaded) { return null }

     const onCancel = () => {
        
        if(updatedName === null && updatedBio === null && image === null) {
            navigation.goBack()
        }
        
        else if ( updatedName !== null || updatedBio !== null || image !== null) {
            Alert.alert("Unsaved changes", "You have unsaved changes. Are you sure you want to cancel?", [
                {
                   text: "Yes",
                   onPress: goBack,
                   style: "destructive"
                },
 
                {
                    text: "Cancel",
                 }
             ])

        } 

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

        const {showActionSheetWithOptions} = useActionSheet();

        const onActionPress = (index) => {
            if(index === 0) {
                takePhoto()
            } else if(index ===2) {
                null
            } else {
                pickImage()
            }
        };

        const openMessageMenu = () => {

            if(!image && !user?.imageUri){

                const options = ["Take a photo"];
            
            options.push("Chose from library");
    
            options.push("Cancel")
            const destructiveButtonIndex = 1;
            const cancelButtonIndex = 2;
            
            showActionSheetWithOptions(
                {
                options,
            }, 
                onActionPress
            );
        } else {

            setShowImage(true)
        }

            }
        
            

        const show = () => {
            setShowModal(prev => !prev);
        }

        const hide = () => {
            setShowModal(false)
        }



      
return (

    <>

    {/* <ProfileUserName showModal={showModal} setShowModal={setShowModal}/> */}
   
    <ProfileEditHeader 
    
    />
<View style={styles.page}>
<DismissKeyboard>

<ScrollView >
<KeyboardAvoidingView behavior={"position"}
        keyboardVerticalOffset={80}>
    {/* <Ionicons onPress={goBack} name="md-chevron-back" size={24} color="#90A8B2" />
<UnsavedMessage updatedName={updatedName} updatedBio={updatedBio} onPress={onPress} cancel={cancel}/> */}
            <View>

            <Pressable onPress={openMessageMenu} style={{alignSelf: "center", 
            marginBottom: 15,}}>

                <View style={{marginTop: 20,}}>
            {!image && user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.profileImage}
        resizeMode="cover" />)} 

        {image && (<Image
        source={{uri: image}}
        style={styles.profileImage}
        resizeMode="cover" />)} 

        {!image && !user?.imageUri && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 10,
          paddingBottom: 10, 
          padding: 28,  
          borderTopLeftRadius:45,
          borderTopRightRadius:45,
          borderBottomLeftRadius:45,
          borderBottomRightRadius:45,
          alignSelf: "center",
          marginBottom: 15,
          
        }}>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}
            </View>
                
        <Text style={{color:"#705AD0", fontWeight: "700", marginBottom: 10, fontSize: 15,}}>Change profile image</Text>
            </Pressable>

        

        

        {/* //UserName */}
        <View style={styles.userNameView}>

        <Text  style={styles.userName}>
             Username
            </Text>
           
        <View >
            <TextInput defaultValue={user?.name} onChangeText={setUpdatedName}returnKeyType="done" style={{textAlignVertical: "top"}}>
            </TextInput>
        </View>

        </View>

        <View style={{margin: 15, marginTop: 7, marginBottom: 10,}} >
        <Text style={{color:"#90A8B2", fontWeight: "700",}}>
            Add a special user name for people to find you.
        </Text>
        </View>
        {/* //Username edns here */}



        {/* //Name */}
        <View style={styles.nameView}>
            
            <View style={styles.firstNameView}>
            <Text style={styles.firstNameHolder}>
            First name
            </Text>
            
            <View>
            
            <TextInput style={styles.firstNameValue} returnKeyType="done">
            Hayder
            </TextInput>
            </View>
            

            </View>
            
            <View style={styles.lastNameView}>
            <Text style={styles.lastNameHolder}>
            Last name
            </Text>
            <TextInput style={styles.lastNameValue} returnKeyType="done">
            Al-Tameemi
            </TextInput>
            </View>
        
        </View>

        <View style={{margin: 15, marginTop: 7, marginBottom: 10,}} >
        <Text style={{color:"#90A8B2", fontWeight: "700",}}>
            Enter your first name and last name here for pepole to know who you are.
        </Text>
        </View>
        {/* //Name edns here */}

        
         
         {/* //Bio */}
        <View style={styles.BioView}>

        <Text style={styles.BioHolder}>
             Bio
            </Text>

        <View >
        <TextInput multiline={true} maxLength={80} defaultValue={user?.status} onChangeText={setUpdatedBio} returnKeyType="done" onSubmitEditing={() => Keyboard.dismiss()} style={{textAlignVertical: "top"}}>
            </TextInput>
               
            {updatedBio === null && <Text style={{alignSelf: "flex-end", color: "#90A8B2",marginBottom: -10, marginTop:5, marginRight: -10,}}>
                 left({80- user?.status?.length})
                </Text>}

                {updatedBio !== null && <Text style={{alignSelf: "flex-end", color: "#90A8B2",marginBottom: -10, marginTop:5, marginRight: -10,}}>
                 left({80- updatedBio?.length})
                </Text>}
        </View>
        </View>

        <View style={{margin: 15, marginTop: 7, marginBottom: 10,}} >
        <Text style={{color:"#90A8B2", fontWeight: "700",}}>
            Any details about you such as work, country, age, thigs you like, etc.
        </Text>
        </View>
        
    </View>
    </KeyboardAvoidingView>
    </ScrollView>

    
    </DismissKeyboard>
            
</View>

</>

)
};

const styles = StyleSheet.create({
    page:{
    borderRadius: 30,
    paddingTop: 0,
    padding: 20,
    flex: 1,
    backgroundColor: "#ECF0F3" ,
    },
    userNameView:{
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white"
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

    Name:{
    color: "#4A4D55",
    fontFamily: "NewueHaas"
    },

    nameView:{

    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderRadius: 10,
    },

    firstNameView:{
    color: "lightgray",
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 3,
    minWidth: "48%",
    maxWidth: "48%",
    fontFamily: "NewueHaas"
    },

    firstNameHolder:{
    color: "lightgray",
    fontSize: 15,
    marginBottom: 3,
    fontFamily: "NewueHaas"
    },

    firstNameValue:{
    color: "#4A4D55",
    fontSize: 15,
    marginBottom: 3,
    },


    lastNameView:{
    color: "lightgray",
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    minWidth: "48%",
    maxWidth: "48%",
    marginBottom: 3,
 
    },

    lastNameHolder:{
    color: "lightgray",
    fontSize: 15,
    marginBottom: 3,
    fontFamily: "NewueHaas"
    },

    lastNameValue:{
    color: "#4A4D55",
    fontSize: 15,
    marginBottom: 3,
    
    },

    BioView:{
        marginTop: 15,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 10,
    },

    BioHolder:{

        color: "lightgray",
        fontFamily: "NewueHaas",
        fontSize: 15, 
    
    },

        noImageText: {
            fontSize: 55,
            fontWeight: "bold", 
            color: "#FAFAFA", 
            minWidth: 80, 
            maxWidth: 80,
            maxHeight: 100,
            minHeight: 100,
            textAlign: "center",
            marginTop: 20, 
        
   
    },

    profileImage: {
        width: 90, 
        height: 90, 
        borderRadius: 20,
        alignSelf: "center",

    },


})

export default changeNameItem;

