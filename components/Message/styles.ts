import { StyleSheet } from "react-native";


const styles = StyleSheet.create ({
 
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
   
    
    rightContainerMe:{
        backgroundColor: "#705AD0",
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        marginLeft: "auto",
        marginRight: 20,
        paddingBottom: 10,
        maxWidth:"80%",
        borderBottomLeftRadius: 8,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        margin: 2,
      
    }, 


    leftReactionSender: {
      backgroundColor: "#F6F9FA",
      paddingTop: 7,
      paddingLeft: 7,
      paddingRight: 7,
      paddingBottom: 7,
      maxWidth:"80%",
      borderRadius: 8,
      marginLeft: 20,
      marginRight: "auto",
      marginBottom: 10,
      marginTop: -12,
      shadowOffset: {width:0, height: 2,},
      shadowOpacity: .2,
      elevation: 10,
      shadowRadius: 10,

      
  },
 
  
  rightReactionMe:{
      backgroundColor: "#F6F9FA",
      paddingLeft: 7,
      paddingTop: 7,
      paddingRight: 7,
      paddingBottom: 7,
      maxWidth:"80%",
      marginLeft: "auto",
      marginBottom: 5,
      marginRight: 20,
      borderRadius: 8,
      margin: 2,
      marginTop: -10,
      shadowOffset: {width:0, height: 2,},
      shadowOpacity: .2,
      elevation: 10,
      shadowRadius: 10,
      
    
  }, 
    image:{
        width: "100%",
        height: "100%",
        
    },
   
     messageStatusIsMe:{
       flexDirection: "row",
       marginBottom: 12,
       paddingRight:35,
       alignSelf: "flex-end",
     },
   
     textInputReplyingView:{
       flexDirection: "row", 
       justifyContent: "space-between", 
       alignSelf: "flex-start",
       
     },
     replyingText:{
       color: "#555658", 
       marginTop:-20,
     },
   
   
   
   
     //!setAsMessageReply search for it hear to find it
     setAsMessageReply:{
       marginLeft: -5,
       flexDirection: "row", 
       marginBottom: 15,
     },
   
     replyUserName1: {
       color: "#555658", 
       fontWeight: "bold", 
       width: 200, 
       marginLeft: -25
   
     },
   
     textAboveUserName1:{
       color: "#555658", 
       width: 100,
     },
   // here ednds the !setAsMessageReply
   
   
   
   
    messageStatus: { 
       marginHorizontal: 5,
       marginRight:0,
   },
   
   textView: {
       flexDirection: "row", 
       alignSelf: "flex-end",
   },
   
   inputReplyingUserNameMe:{
       color: "#555658", 
       fontWeight: "bold",
       marginTop:-20,
   },
   
   rightAction: {
       
       backgroundColor: "#555658",
       
       marginRight: 10,
       marginLeft: 10,
       padding: 10,
       borderRadius: 50,
   
   },
   
   S3ImageMe:{
       width: "100%", 
       aspectRatio: 3 / 4, 
       borderRadius: 10, 
       marginBottom: 5, 
       marginTop: -7, 
       marginRight: -7, 
       marginLeft: -7, 
   },
   
   S3ImageOtherUser:{
       width: "100%", 
       aspectRatio: 3 / 4, 
       borderRadius: 10, 
       marginBottom: 5, 
       marginTop: -7, 
       marginRight: -7, 
       marginLeft: -7,
   
   },
   
   messageContentMe: {
       color:  "white",
        alignSelf: "flex-start"
   },
   
   messageContentMeOtherUser:{
        color:  "#555658", 
        alignSelf: "flex-start"
   },
   
   
   
   // Message Time
   messageTimeViewMe:{
    alignSelf: "flex-end",
   },

    messageTimeViewOtherUser:{
        alignSelf: "flex-start"
    },

   messageTimeMe:{
       color: "white", 
       fontSize: 12,
   },
   
   messageTimeOtherUser:{
       color: "#555658", 
       fontSize: 12,
   
   },
   // Here ends Message Time




   //sound input reply
   souundURIReplyView:{
    flexDirection: "row", 
    marginBottom: 7,
   },

   replyingTo:{
    color: "#555658",
   },

   userNameSound:{
    color: "#555658", 
    fontWeight: "bold",
   },
   //here ends the input sound reply
   
   
   });

   export default styles;