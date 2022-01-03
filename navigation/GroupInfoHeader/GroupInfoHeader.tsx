import React, {useState} from "react";
import {Text, View, Image, Pressable} from "react-native"
import { ChatRoom } from "../../src/models";
import stylesChatRoom from "../ChatRoomHeader/styles";
import user from "../../navigation/ChatRoomHeader/ChatRoomHeader"

const GroupInfoHeader = ({id}) => {
    const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
    
    return (
        <View style={stylesChatRoom.header}>
        
        <Image

                  //or {chatRoom?.imageUri || user?.imageUri}
        source={{uri: chatRoom?.imageUri === null ? "https://amplify-hideer-staging-191248-deployment.s3.us-east-2.amazonaws.com/avatars/chat-group+(2).png" : chatRoom?.imageUri }}
        style={chatRoom?.imageUri === null ?
          stylesChatRoom.imageGroup : stylesChatRoom.image}
          />

        <Pressable style={stylesChatRoom.text}>
        <Text numberOfLines={1} style={{ fontWeight: "bold"}}>{chatRoom?.name ? chatRoom.name : user?.name}</Text>
        <Text numberOfLines={1} style={{fontSize:12}}></Text>
        </Pressable>
      

      
      
  
      <View></View>
      </View>
      
    );
  }
    
export default GroupInfoHeader;