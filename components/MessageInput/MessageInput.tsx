import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Animated} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, MaterialCommunityIcons, Ionicons, Feather, FontAwesome,} from '@expo/vector-icons'; 
import {ChatRoom, Message, User} from "../../src/models";
import { Auth, Storage, DataStore  } from "aws-amplify"
import EmojiSelector from 'react-native-emoji-selector';
import * as ImagePicker  from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { Audio, AVPlaybackStatus } from 'expo-av';
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import MessageComponent from "../Message";
import LottieView from "lottie-react-native";
import  audio  from "../../assets/Lottie/audio.json"
import recordingLottie from "../../assets/Lottie/recordingLottie.json"

const MessageInput = ({ chatRoom, messageReplyTo, removeMessageReplyTo,}) => {
const [message, setMessage] = useState("");
const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
const [progress, setProgress] = useState(0);
const [image, setImage] = useState<string | null>(null);
const [recording, setRecording] = useState<Audio.Recording | null>(null);
const [soundURI, setSoundURI] = useState<string | null>(null);
const [isTyping, setTyping] = useState(false);



    

    //send message
   const sendMessage = async () => {
       
       const user = await Auth.currentAuthenticatedUser();
      const newMessage =  await DataStore.save(new Message ({
           content: message,
           userID: user.attributes.sub,
           chatroomID: chatRoom.id,
           replyToMessageID: messageReplyTo?.id
       }))

       updateLastMessage(newMessage)

       resetFields(); // for (message, image and emoji) to be hidden rest to normal and keyborad also after sending. wich meanns (null). see below related conde!!
       
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom =>{
          updatedChatRoom.LastMessage = newMessage;
        }))
    }

   const onPlusClicked = () => {
       console.warn ("On plus clicked");
   }
    const onPress=() => {
    
        // if(audio){
        //     sendAudio();
        
        // } else if (video) {
        //     sendVideo();
        
        if (image) {
            sendImage();
        } else if (soundURI) {
            sendAudio();
        } else if (message)  {
        sendMessage();
        } else {
        onPlusClicked();
        }
};

        



const resetFields = () => {
    setMessage("");
       setIsEmojiPickerOpen(false);
       setImage(null);
       setProgress(0);
       setSoundURI(null);
       removeMessageReplyTo();
       setTyping(false)
    };



//   const sendAudio = async () => {

//   }
//   const sendVideo = async () => {

//   }

    const progressCallback = (progress) => {
        setProgress(progress.loaded / progress.total);
    } 

   const sendImage = async () => {
    if (!image) {
        return;
    }
    const blob = await getBlob(image);
    const { key } = await Storage.put(`${uuidv4()}.png`,blob, {
        progressCallback,
    });

    console.log({key})
   
    const user = await Auth.currentAuthenticatedUser();
    const newMessage =  await DataStore.save(new Message ({
         content: message,
         image: key,
         userID: user.attributes.sub,
         chatroomID: chatRoom.id,
        //  status: "SENT",
         

     })
    );

     updateLastMessage(newMessage)

     resetFields();
  }
    
   const getBlob = async (uri: string) => {
   const respone = await fetch(uri);
   const blob = await respone.blob();
   return blob;
 };

 

//image picker permissions
 useEffect(() => {(async () => {
      if (Platform.OS !== 'web') {
        const libraryResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoRosponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

         if (
            libraryResponse.status !== 'granted' || 
            photoRosponse.status !== "granted"
            ) {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  


  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
     
      
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
    

  async function stopRecording() {
    console.log('Stopping recording..');
    if (!recording){
        return;
    }
    
    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
    });
    
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    if (!uri) {
        return;
  }

  setSoundURI (uri);

  }


//   const getAudioBlob = async () => {
//       if(!audio) {
//           return null;
//       }
//   };

//   const getVideoBlob = async () => {
//       if(!video)
//       return null; 
//   };



// useEffect(() => {
//     userTypingStatus()
// },[isTyping])

// const userTypingStatus = async () => {
//     const authUser = await Auth.currentAuthenticatedUser();
//     const user = await DataStore.query(User, authUser.attributes.sub)
//     if(!user) {
//         return
//     } else if(isTyping && !user.typingStatus) {
//         await DataStore.save(User.copyOf(user, (updated) =>{updated.typingStatus = chatRoom.id}))
//         console.log("typing chatRoom id:", user?.typingStatus)
        
//     } else if (!isTyping && user.typingStatus === chatRoom.id) {
//         await DataStore.save(User.copyOf(user, (updated) =>{updated.typingStatus = "No chat room id"}))
//         console.log("typing chatRoom id:", user?.typingStatus)
//     }
// }

// const chatRoomTypingStatus = async () => {
//     const authUser = await Auth.currentAuthenticatedUser();
//     const chatroom = await DataStore.query(ChatRoom, chatRoom?.id)
//     if(!chatroom) {
//         return
//     } else if(isTyping && chatroom.typingUserIDs === null) {
//         await DataStore.save(ChatRoom.copyOf(chatroom, (updated) =>{updated.typingUserIDs = [authUser.attributes.sub]}))
//     } else if (isTyping && chatroom.typingUserIDs) {
//         await DataStore.save(ChatRoom.copyOf(chatroom, (updated) =>{updated.typingUserIDs = [...updated.typingUserIDs,authUser.attributes.sub]}))
//     }
// }
    

  //Image picker real time working
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



    //Taking photo
    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    
    
    const sendAudio = async () => {
        if (!soundURI) {
            return;
        }
    const uriParts = soundURI.split(".");
    const extenstion = uriParts[uriParts.length -1];
    const blob = await getBlob(soundURI);
    const { key } = await Storage.put(`${uuidv4()}.${extenstion}`,blob, {
        progressCallback,
    });
       
    const user = await Auth.currentAuthenticatedUser();
   const newMessage =  await DataStore.save(new Message ({
        content: message,
        audio: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        status: "SENT",
        replyToMessageID: messageReplyTo?.id,
     })
    );

    updateLastMessage(newMessage)

    resetFields(); // for (message, image and emoji) to be hidden rest to normal and keyborad also after sending. wich meanns (null). see below related conde!!
    
 };


  //animation only
  


    return(

        <KeyboardAvoidingView style={[styles.root, {height:isEmojiPickerOpen ? "50%" : "auto"}]} behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}>
            
            {/* Reply styilng start point */}
            {messageReplyTo && (
            <View>
               
               

                <View style={styles.replyText}>
                
                <Text style={{fontSize: 30,}}> </Text>
                    <Pressable  onPress={() => removeMessageReplyTo()} >
                    <Ionicons name="close" size={35} style={{marginBottom: 15, backgroundColor: "#F6F9FA", borderRadius: 50, marginRight: 20,}} color="#555658" />
                    </Pressable>

                    
                    </View>
                
                    
                    <View style={styles.replyRowIcons}>
                   
                    {/* Arrow and line Reply */}
                    <View>
                        <View style={{marginTop: 10, marginLeft: 4,}}>
                        
                        </View>
                        <MessageComponent message={messageReplyTo}/>
                </View>
                    

            </View>
                     
            </View>)}
                
            {/* Reply styilng start point */}
            {image && (
            <View style={{borderTopWidth: 1, marginRight: -10, marginLeft: -10, borderColor:  'rgba(158, 150, 150, .3)',}}>
            <Pressable  onPress={() => setImage(null)} >
            <Ionicons name="close" size={35} style={{ backgroundColor: "#F6F9FA", borderRadius: 50, marginRight: 30, alignSelf: "flex-end", marginLeft: 5, zIndex: 1, marginTop: 10,}} color="#555658" />
            </Pressable>
             <Image 
             source= {{uri: image}} 
             style={{width:100, height:100, borderRadius: 10, alignSelf: "flex-start", marginBottom: 5, marginTop: -15, marginLeft: 20,}} 
             />
            </View>
            )}
            
            {recording && <View style={{alignSelf: "flex-end", marginRight: -5,}}>
                 <LottieView style={{width: 80, height: 60,}} source={recordingLottie}
                 autoPlay
                 />
                 </View>}

            

            {/* //ImageProgress  */}
            <View style={{ height:5, marginRight: 5 , marginLeft: 5,  borderRadius:5, backgroundColor: "black",  width:`${progress * 100}%`, }}/>
            
            
            
            {/*to close or not send image we use onPress={() => setExample(null)} */}
            {soundURI && <View style={{borderTopWidth: 1, marginRight: -10, marginLeft: -10, borderColor:  'rgba(158, 150, 150, .3)',}}>
                <Pressable  onPress={() => setSoundURI(null)} >
             <Ionicons name="close" size={35} style={{ backgroundColor: "#F6F9FA", borderRadius: 50, marginRight: 20, alignSelf: "flex-end", marginLeft: 5, zIndex: 1, marginTop: 10, marginBottom: 30,}} color="#555658" />
            </Pressable>
            </View>}


            {soundURI && 
            <View style={styles.unSendSound}>
             <AudioPlayer soundURI={soundURI}/>
            </View>
            }

           
         
          <View style={soundURI ? {flexDirection: "row", alignSelf: "center", marginTop: -40, marginBottom: 35, marginLeft: "85%"} :styles.row}>



         {!soundURI && <View style= {[ !recording && styles.inputContainer, {},{marginBottom:isEmojiPickerOpen ? 0 : 20}]}>
            
           {recording ? (<View style={ Platform.OS === "ios" ? styles.iosRecording : styles.androidRecording }>
                 
           <LottieView style={styles.lottieAudio} source={audio}
                 autoPlay/>
                 <LottieView style={styles.lottieAudio} source={audio}
                 autoPlay/>
                 <LottieView style={styles.lottieAudio} source={audio}
                 autoPlay/>
                
                 </View>) : 
                 
                 (<View style= {{flexDirection:"row", alignSelf: "flex-end"}}>
                     
                     
                 <Pressable onPress = {() => setIsEmojiPickerOpen((currentValue) => 
                          !currentValue)}>
                      <MaterialCommunityIcons name="sticker-emoji" size={23} color="#5c5c5c" style={styles.icon} />
                      </Pressable>
                 
                      <TextInput 
                      multiline={true}
                      style={styles.input} 
                      value={message}
                      onChangeText={setMessage}
                      placeholder="Type message..."
                      onFocus={() =>  setTyping(true)}
                      onBlur={() => setTyping(false)}/>
                      
                      <Pressable onPress={takePhoto}>
                      <EvilIcons name="camera" size={30} color="black" style={styles.icon} />
                      </Pressable>
                      
                      <Pressable onPress={pickImage}>
                      <EvilIcons name="image" size={30} color="black" style={styles.icon} />
                      </Pressable>
                      

                 </View>)}

            </View>}
            
           
             
            
            <Pressable onPress={onPress} style={recording ? styles.buttonContainerRecording : styles.buttonContainer}>
            {message || image || soundURI ? (<Ionicons name="arrow-forward-sharp" size={24} color="white" />
            ) : (
                <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
                <Ionicons 
                name={"mic-sharp"}
                size={24} color={"white"}
                style={styles.icon} />
                </Pressable> 
            )}
            </Pressable>
            </View>
            
            
            {isEmojiPickerOpen && (
                <EmojiSelector
                onEmojiSelected={(emoji) => 
                    setMessage(currentMessage => currentMessage + emoji)
                } 
                columns={8} 
                />
            )}
            

            
            
         
        </KeyboardAvoidingView>
       
            


    );

};

const styles = StyleSheet.create({
    root: {
        marginTop: 10,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: -5,
        
    },
    row:{
        flexDirection: "row",
        
        
    },
    input:{
        flex: 1,
       
    },
    inputContainer: {
        backgroundColor: "white",
        flex: 1,
        borderWidth: 1,
        borderColor: "#DBDBDB",
        marginRight: 17,
        borderRadius: 50,
        justifyContent: "center",
        marginBottom: 100,
        flexDirection: "row",
        padding: 10,
        maxHeight: 300,
        

    },
    
    icon:{
        marginHorizontal: 5,
        paddingTop: 3,
        
    },
    buttonContainer:{
        marginTop: 5,
        width:40,
        height:40,
        backgroundColor: "#3D4785",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        
    },
    
    buttonContainerRecording:{
        marginTop: 5,
        width:40,
        height:40,
        backgroundColor: "red",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    cameraMic:{
        justifyContent: "center",
    },
    pickedImage:{
        flexDirection: "row",
        marginVertical: 10,
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderWidth: 1, 
        borderColor: "lightgray",
        borderRadius: 10, 
        overflow: "hidden", 
    },
    replyRowIcons:{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 25,
        
        
    },
    replyText:{
        borderTopWidth: 0.5,
        borderColor:  'rgba(158, 150, 150, .3)',
        paddingTop: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginRight:-5,
        marginLeft:-5,
        marginBottom: -20
        
    }, 
    audioCircleAnimation: {
        width: 90,
        height: 90,
    },

    lottieAudio:{
        width: 100,
        height: 45,
        marginRight: 5,
    },
    iosRecording: {
        backgroundColor: "white",
        marginLeft: 17,
        marginRight: 17,
        padding: 4,
        flexDirection: "row",
        borderRadius: 4,
    },
    androidRecording: {
        backgroundColor: "white",
        marginLeft: 0,
        marginRight: 10,
        padding: 4,
        flexDirection: "row",
        borderRadius: 4,
    },
    unSendSound:{
        alignItems: "flex-end",
        borderRadius: 10, 
        marginBottom: -10,
        
    },
   
}


)
export default MessageInput 