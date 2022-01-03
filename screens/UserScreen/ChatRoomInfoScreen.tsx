import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons";
import {View, Text, StyleSheet, Image, ImageBackground, Pressable, ScrollView, Platform } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/core";
import moment from "moment";
import {Message, User,} from "../../src/models";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { FlatList } from "react-native-gesture-handler";
import { S3Image } from "aws-amplify-react-native"
import ios_bg from "../../assets/images/ios_bg.jpg";
import Auth from "@aws-amplify/auth";
import manPhoto from "../../assets/images/manPhoto.png"
import { useFonts } from "expo-font";





const ChatRoomInfoScreen = () => {
    const [ media, setMedia ] = useState<Message[]>([]);
    const [me, setMe] = useState<User| undefined> (undefined);
    const [messagesNumber, setMessagesNumber] = useState<number | null> (null)

    


    useEffect(() => {
        
        const fetchImages = async () => {
            const images = (await DataStore.query(
                Message, media => media.chatroomID("eq", chatRoom.id), {sort: media => media.createdAt(SortDirection.DESCENDING)},)).map((media) => media.image)
                if(!images) {return null}
                  const media = images.filter(a => typeof a === "string")
                  setMedia(media)
        }

        fetchImages();
    }, [])

    useEffect(() => {
        
        const fetchMessagesNumber = async () => {
            const messages = (await DataStore.query(
                Message, media => media.chatroomID("eq", chatRoom.id)))
                if(!messages) {return null}
                  setMessagesNumber(messages.length)
        }

        fetchMessagesNumber();
    }, [])
    
    useEffect(() =>{
        const fetchAuthUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser()
            const fetchUser = await DataStore.query(User, authUser.attributes.sub)
            setMe(fetchUser)
        } 

        fetchAuthUser()
    },[])
    
    const [ bill, setBill ] = useState(true);
    
    const getLastOnlineText = () => {
        if (!user?.lastOnlineAt) {
          return null;
        };
        //if lastOnline less than 5 minutes ago, show him as online
        const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
        if (lastOnlineDiffMS < 5000) {
          //less than 5 minutes
          return "online";
        } else {
          return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
        }
      };
    const navigation = useNavigation()
    const route = useRoute();

    const goBack = () => {
        navigation.goBack();
    }
    

    const user = route?.params?.user;
    const chatRoom = route?.params?.chatRoom;

    const onBillPress =  () => {
        setBill(currentValue => !currentValue)
    }


    const ListEmptyComponent = () => <Text style={{color: "#555658", fontSize: 15,}}> There are no media between you and {user?.name} </Text>

    const renderItem = ({item,}) => (
    <Pressable>

    
    <S3Image 
    imgKey={item} 
    style={styles.s3Image}
    resizeMode="cover"
    />
    </Pressable>);

    const keyExtractor = (index) => {return index};

    const [loaded] = useFonts({
        NewueHaas: require("../../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
      });

      if(!loaded) {return null}

    return (
    <View >
        
    
    <ImageBackground source={ios_bg} style={styles.imageBackground} resizeMode="cover">
     
     <View style={styles.header}>
 
                 <Pressable onPress={goBack} style={{backgroundColor: "white", borderRadius: 5, padding: 2,}}>
                 <Ionicons name="arrow-back" size={24} color="#3D4785"/>
                 </Pressable>
                 
                 <View>
                 <Text numberOfLines={1} style={{color: "white", fontWeight: "bold", fontSize: 18, alignSelf: "center", fontFamily: "NewueHaas"}}>Chat Room</Text>
                 <Text style={{color: "white", fontSize: 13, }}>
                   {messagesNumber} message in chat 
                 </Text>
                 </View>
                 
                 <Pressable onPress={onBillPress} style={{backgroundColor: "white", borderRadius: 5, padding: 2,}}>
                 <Ionicons name={ bill ? "notifications" : "notifications-off"} size={24} color="#3D4785" />
                 </Pressable>
 
     </View>
        
            <View>
                 <Text style={Platform.OS === "ios" ?{color: "white", fontSize: 13,  marginLeft: 30,marginBottom: 10 } : {color: "white", fontSize: 13,  marginLeft: 30,}}>
                   CHAT ROOM PROFILE! 
                 </Text>
                 <Text numberOfLines={2} style={{color: "white", fontWeight: "bold", fontSize: 24, marginLeft: 30, maxWidth: 200, fontFamily: "NewueHaas"}}>{me?.name} & {user?.name}</Text>
            </View>
               
    </ImageBackground>
            
    

   <View style={styles.chatRoom}>

        <View>
       <View style={styles.row}>
       
       <View style={styles.userImageView}>
       {user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.userImage}
        resizeMode="cover" />)} 

        {!user?.imageUri && <Image
        source={manPhoto}
        style={styles.userImage}
        />}

       </View>
       <View style={styles.meImageView}>
       {user?.imageUri && (<S3Image
        imgKey={me?.imageUri}
        style={styles.userImage}
        resizeMode="cover" />)} 

        {!user?.imageUri && <Image
        source={manPhoto}
        style={styles.userImage}
        />}
       </View>
       
    {/* Username and Bio */}
    </View>
        <View style={styles.username}>
           <Text style={{fontSize: 14, color: "#555658"}}> Username </Text>
           <Text style={{
               fontSize: 16, color: "#3D4785", marginBottom: 10,}}> @{user?.name} </Text>
           <Text style={{fontSize: 14, color: "#555658"}}> Bio </Text>
           <Text style={{fontSize: 16, color: "black"}}> here comes the bio of the user... </Text>
    </View>

        {/* level, followers and following */}
        <View style={{flexDirection: "row", justifyContent: "space-between", marginRight: 30, marginLeft: 30,}}> 


            <View style={styles.attributes}>
            <Text style={{fontSize: 17, color: "black", alignSelf: "center", fontWeight: "bold",}}> 14 </Text>
            <Text style={{fontSize: 13, color: "#555658", paddingLeft: 10, paddingRight:10,}}> Level</Text>
            </View>
       
            <View style={styles.attributes}>
            <Text style={{fontSize: 17, color: "black", alignSelf: "center", fontWeight: "bold",}}> 114 </Text>
            <Text style={{fontSize: 13, color: "#555658",}}> following </Text>
            </View>

            <View style={styles.attributes}>
            <Text style={{fontSize: 17, color: "black", alignSelf: "center", fontWeight: "bold",}}> 114 </Text>
            <Text style={{fontSize: 13, color: "#555658"}}> followers </Text>
            </View>
        </View>

            {/* chat room media */}
            <View style={styles.media}>
            <Text style={{color: "#555658", fontSize: 20, marginBottom: 10,}}> Sheard Media </Text>

            
            <View style={styles.s3ImageView}> 
            <FlatList
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            ListEmptyComponent={ListEmptyComponent}
             style={styles.chatRoomImages}
             data={media} 
             renderItem={renderItem}
             keyExtractor={keyExtractor}
              />
            </View>
           
           
             
            </View>
       
   </View>
            
            
        </View>
            
    </View>
    
    )
};


const styles = StyleSheet.create({

    page: {
        backgroundColor: "white",
        borderRadius: 50,
        
    },

    imageBackground:{
        paddingTop: 40,
        width: "100%",
        height: 330,
        borderRadius: 10,
        marginBottom: -45,
        
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        marginBottom: 45,

    },

    row: {
        flexDirection: "row",
    },

    userImageView: {
        height: 80,
        width: 65,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: {width:0, height: 5,},
        shadowOpacity: .1,
        elevation: 10,
        marginTop: -50,
        marginBottom: 20,
        marginLeft: 30,
    },

    meImageView: {
        height: 80,
        width: 65,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: {width:0, height: 5,},
        shadowOpacity: .1,
        elevation: 10,
        marginTop: -50,
        marginBottom: 20,
    },

    userImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "white",
        
    },

    chatRoom: {
       backgroundColor: "white",  
       borderRadius: 50,
       paddingBottom: "100%"
       
    },

    chatRoomImages: {
        flexDirection: "row",
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 2,
    
    },

    username:{
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
    },

    attributes:{
        borderRadius: 20,
        padding: 20,
        marginTop: 15,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {width:0, height: 0,},
        shadowOpacity: 0.2,
        elevation: 3,
    },

    media: {
        paddingLeft: 30,
        marginTop: 30,
        
    },

    s3ImageView:{
        flexDirection: "row", 
        backgroundColor: "white", 
       
    },
    s3Image: {
        width: 150, 
        height: 150, 
        borderRadius: 10, 
        marginRight: 15,
    }


})

export default ChatRoomInfoScreen; 