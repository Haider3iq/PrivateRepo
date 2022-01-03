import React, {useState, useEffect, useMemo, useCallback, Component, useRef} from "react";
import {
    View,
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
    Alert, 
    ImageBackground,
    Text,
    ScrollView,
    SectionList,
    Pressable,
    Dimensions,
} 


from "react-native";
import {useRoute,} from "@react-navigation/core";
import {ChatRoom, ChatRoomUser, Message as MessageModel, User,} from "../../../src/models"
import { SortDirection, DataStore, Auth } from "aws-amplify";
import moment from "moment";

import InvertedSectionList from "inverted-section-list";
import SavedMessagesHeader from "./SavedMessagesHeader.tsx/SavedMessagesHeader";
import { Fontisto } from "@expo/vector-icons";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [ user, setUser ] = useState< User | null> (null)




    const fetchMessages = async () => {
        const authUser = await Auth.currentAuthenticatedUser();
        const fetchedMessages = (await DataStore.query(SavedMessages, savedMessage => savedMessage.userID("eq", authUser.attributes.sub), {
          sort: Savedmessage => Savedmessage.createdAt(SortDirection.DESCENDING)
      }))
        setMessages(fetchedMessages);
  };
      
  useEffect(() => {
    fetchMessages();
  },[])

const DATA = Object.values(messages.reduce((acc, item) => {

  const getMessageDate = () => {
    if (moment(item.createdAt).isSame(moment(), 'day')) {
      return  `Today`

    } else if (moment(item.createdAt).isBefore(moment(),'day') && !moment(item.createdAt).isBefore(moment(),'day'))   {
      return `${moment(item.createdAt).format("dddd")}`;
      

    } else if (moment(item.createdAt).isBefore(moment(), "days") &&  !moment(item.createdAt).isBefore(moment(), "year")){
      return `${moment(item.createdAt).format("MMMM D")}`;

    } else if (moment(item.createdAt).isBefore(moment(), "year")) {
        return `${moment(item.createdAt).format("D.MM.YYYY")}`;

      }
    
  };

  if (!acc[moment(item.createdAt).format('L')]) acc[moment(item.createdAt).format('L')] = {
    title: getMessageDate(),
    data: []
  };
  acc[moment(item.createdAt).format('L')].data.push(item);
  return acc;

}, {}))

const sectionHeader = ({section,}) => (<View>
{ <View style={styles.groupView}>
<View style={styles.groupTextView}>
<Text style ={styles.groupText}>
{section.title}
</Text>
</View>

</View>}
</View>)


      


      
      const renderItems = ({item, index }) => (

        <View style={styles.leftContainerSender}>
            <Text>{item.senderName}</Text>
                <Text>
                    {item.content}
                </Text>
        </View>
      
      )

     if(!messages) {
         return <ActivityIndicator/>
     }
    return (

        <>
        <SavedMessagesHeader/>
        <View style={styles.page} >
          
          {messages && <View style={ styles.chat }>
          
          <InvertedSectionList
           sections={DATA} 
           renderItem={renderItems}
           renderSectionFooter={sectionHeader}
           stickySectionHeadersEnabled
           />
          </View> }

            {!messages && <View style={{alignItems: "center", marginTop: 30, }}>
                <View style={{borderWidth: 2, padding: 10, borderRadius: 10,borderColor: "#454B5E", marginBottom: 20,}}>
                <Fontisto name="photograph" size={55} color="#90A8B2" />
                </View>

                <Text style={styles.userNameText}>Your photos and videos</Text>
                <Text style={{color: "#90A8B2",
                fontWeight: "700",
                alignSelf: "center",
                fontSize: 15,
                marginRight: 20,
                marginLeft: 20,
                textAlign: "center"
                }}>Here will appear the photos and videos that you might want to share </Text>
            </View> }
            
          
            
       </View>
       </>
  
    )
}

    

const styles = StyleSheet.create ({
    page:{
        flex: 1,
    },

    topSpace:{
      backgroundColor: "#705AD0",
      padding: 20,
      paddingTop:20,
      marginBottom: -25,
    },
  
  chat:{
        paddingTop: 2,
        backgroundColor: "#EFF3F5",
        flex: 1,
        borderRadius: 30,
    },

    chatReaction:{
      paddingTop: 2,
        backgroundColor: "rgba(32,33,36, .3)",
        flex: 1,
        borderRadius: 30,
    },

    groupView:{
        alignItems: "center",
        marginTop: 10,
    },

    groupTextView:{
      backgroundColor: "#FAFAFA",
      margin: 5,
      padding: 5,
      borderRadius: 10,
      shadowColor: "#000",
      marginBottom: 10,
      
    },

    groupText:{
        color: "rgba(63,65,72,.7)", 
        fontSize: 14,
        fontFamily: "NewueHaas",
    },

    leftContainerSender: {
      backgroundColor: "#FFFF",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      maxWidth:"80%",
      borderBottomRightRadius: 8,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      marginLeft: 20,
      marginRight: "auto",
      marginBottom: 5,
      
  },

  userNameText:{
    fontSize: 20, 
    fontWeight: "700",
    color: "#454B5E",
    marginBottom: 10,
},
})