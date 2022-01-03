
import React, {useState, useEffect, useRef} from "react";
import {View, Text, ActivityIndicator,Pressable, Alert, Animated, TouchableWithoutFeedback} from "react-native";
import {Auth, Storage, DataStore } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native"
import AudioPlayerIsMe from "../AudioPlayer";
import AudioPlayerIsNotMe from "../AudioPlayer/AudioPlayerIsNotMe"
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { User, Message as MessageModel, Reaction} from "../../src/models"
import { User, Message as MessageModel,} from "../../src/models"
import { useActionSheet } from '@expo/react-native-action-sheet';
import moment from "moment";
import MeReply from "./MessageReply/MeReply";
import SenderReply from "./MessageReply/SenderReply"
import ReplyAudioMe from "../AudioPlayer/ReplyAudioMe";
import styles from "./styles"
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Reactions from "./Reactions/Reactions";
import { SafeAreaView } from "react-native-safe-area-context";




const Message = ( props ) => {
    const {propChatRoomForReactions} = props;
    const {setAsMessageReply, message: propMessage} = props;
    const [message, setMessage] = useState<MessageModel>(propMessage);
    const [repliedTo, setRepliedTo] = useState<MessageModel | null> (null);
    const [user, setUser] = useState<User | undefined>();
    const [isMe, setIsMe] = useState< boolean | null>(null);
    const [otherUser, setOtherUser] = useState <boolean | null> (null)
    const [soundURI, setSoundURI] = useState<any>(null);
    const {showActionSheetWithOptions} = useActionSheet();
    const {isDeleted, setIsDeleted} = props;
    const {ReactionsBoolean, setReactionsBoolean} = props;
    const [lastMessage, setLastMessage] = useState <boolean | null>(null) 
    const [showReactions, setShowReactions] = useState(false)
    const [reaction, setReaction] = useState<Reaction []>([]);
    const [reactionItemOnlyAuthUser, setReactionItemOnlyAuthUser] = useState<Reaction | undefined>
    (undefined);
    const [messageHasReaction, setMessageHasReaction] = useState <Reaction | undefined>
    (undefined);
    const [authUser, setAuthUser] = useState<string | null> (null);
    

    // useEffect(() => {
        
    //     const fetchMessagesNumber = async () => {
    //         const messages = (await DataStore.query(
    //             MessageModel, media => media.chatroomID("eq", propChatRoomForReactions)))
    //             if(!messages) {return null}
    //             if(message === messages[messages.length -1]){
    //                 setLastMessage(true)
    //                 console.log("LastMessage",lastMessage)
    //             }
    //     }
    //     fetchMessagesNumber();
    // }, [message])

    

    useEffect(() => {
        
        console.log("reaction user id", reactionItemOnlyAuthUser?.userID)
        console.log("authUser id", authUser)
        fetchReaction()
        const subscription = DataStore.observe(Reaction).subscribe(() => 
        fetchReaction()
        )
        return () => subscription.unsubscribe()
        
    },[message])


    useEffect(() => {
      DataStore.query(User, message.userID).then(setUser);  
    }, []);

    useEffect(() => {
            setMessage(propMessage);
            if(message.Reactions){
                console.log("message reactions:", message.Reactions)
            }
            
    },[props]);

    useEffect(() => {
        if(message?.replyToMessageID) {
        DataStore.query(MessageModel, message.replyToMessageID).then(setRepliedTo);
        }
    }, [message]);

    useEffect(() =>{
            setAsRead();  
    },[isMe, message])

    useEffect(() => {   
    if(message.audio) {
         Storage.get(message.audio).then(setSoundURI);
            } 
    }, [message]);


    // useEffect(() => {
    //     const subscription = DataStore.observe(MessageModel, message.id).subscribe((msg) => {
    //         if (msg.model === MessageModel) {
    //             if (msg.opType === "UPDATE") {    
    //                 setMessage((message) => ({...message, ...msg.element}));
    //             } else if (msg.opType === "DELETE") {
    //                 setIsDeleted(true);
    //             }
        
        
           
    //     }
    // }
    // );
        
    //     return () => subscription.unsubscribe();
    // }, [])

      const fetchReaction = async () => {
      const authUser = await Auth.currentAuthenticatedUser()
      const fetchedReaction =(await DataStore.query(Reaction,)).filter(reaction => reaction.messageID === message.id)
      setReaction(fetchedReaction)
      setReactionItemOnlyAuthUser(fetchedReaction?.find((reaction) => reaction.messageID === message.id && reaction.userID === authUser.attributes.sub))
      setMessageHasReaction(fetchedReaction?.find((reaction) => reaction.messageID === message.id))
      
      const messageReaction = reactionItemOnlyAuthUser?.messageID === message.id
      
    }

   

    const reaction1 = message.Reactions?.filter(reaction => reaction?.messageID === message.id).map(reaction => reaction?.content)
    
    useEffect(() =>  {
            const checkIfMe = async () => {
                if (!user) {
                    return;
                }
                 const authUser = await Auth.currentAuthenticatedUser();
                 setIsMe(user.id === authUser.attributes.sub);
                 setOtherUser(user.id !== authUser.attributes.sub);
                 setAuthUser(authUser.attributes.sub)
             };
             checkIfMe();
        
    }, [user]);
        



        //message to be seen when its seen by other chater
        const setAsRead = async () => {
        if (isMe === false && message.status !== "READ" ){
           await DataStore.save(MessageModel.copyOf(message, (updated) => {
                updated.status = "READ"
            })); 
        }
        }

        
    const onPress = () => {
        setShowReactions(false, setReactionsBoolean(false), setStopScorlling(prev => !prev)) 
    }
    
    // swieaple
    const rightAction = () => {

        return (
            <View style={{justifyContent: "center",}}>
                <View style={styles.rightAction}>
                <FontAwesome5 name="reply-all" size={20} color="white" />
                </View>
                
            </View>
        )
    }

     const onMessageLongPress = () => {
            setReactionsBoolean(curreantValue => !curreantValue, setShowReactions(curreantValue => !curreantValue))
    }

    // const firstreaction = async () => {
    //     const authUser = await Auth.currentAuthenticatedUser()
    //     if(message.reactionsUserId?.includes(authUser.attributes.sub)) {

    //         const reactionUserIdToDelete = (
    //             await DataStore.query(MessageModel)
    //         ).filter(
    //             (userId) => userId.reactionsUserId === authUser.attributes.sub).map(reactionUserId => reactionUserId);

    //         const removeReactionUser = message.reactionsUserId?.filter(reactionUserId => reactionUserId === authUser.attributes.sub)
            
    //         const removeReaction = message.reactions?.filter(reaction => reaction === "😍")
    //         // setShowReactions(prev => !prev, setReactionsBoolean(curreantValue => !curreantValue,));
    //         console.log(message.reactionsUserId)
    //         await DataStore.delete(reactionUserIdToDelete)
    //          console.log("removeItem",reactionUserIdToDelete)
    //         console.log("reaction to delete", removeReaction[0])
    //     } else {
    //         console.log("message reactions", message.reactions)
    //         if(!message.reactions) {
                
    //             const firstEmoji = ["😍"]
    //             const user =  [authUser.attributes.sub]
    //             await DataStore.save(MessageModel.copyOf(message, 
    //                 (updated) =>  { 
    //                     updated.reactions = firstEmoji,
    //                     updated.reactionsUserId = user
    //             })).then(setShowReactions(prev => !prev, setReactionsBoolean(curreantValue => !curreantValue,)));
    //         }
    //         await DataStore.save(MessageModel.copyOf(message, 
    //             (updated) =>  { 
    //                 updated.reactions = [...updated.reactions, "😍"],
    //                 updated.reactionsUserId = [...updated.reactionsUserId, authUser.attributes.sub]
    //         })).then(setShowReactions(prev => !prev, setReactionsBoolean(curreantValue => !curreantValue,)));
    //     }
            
    // }


    const firstreaction = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        if(reactionItemOnlyAuthUser?.userID === authUser.attributes.sub) {
                if(reactionItemOnlyAuthUser?.content === "😍" ) {
                    await DataStore.delete(reactionItemOnlyAuthUser);
                    setReactionsBoolean(false, setShowReactions(false));

                } else {
                    if(!reactionItemOnlyAuthUser) {return}
                await DataStore.save(Reaction.copyOf(reactionItemOnlyAuthUser, 
                    (updated) =>  { 
                        updated.content = "😍" 
                        updated.userID = authUser.attributes.sub,
                        updated.messageID = message.id
                    }))
                    setReactionsBoolean(false, setShowReactions(false));
                }
                
        } else {
                await DataStore.save(
                    new Reaction({
                      userID: authUser.attributes.sub,
                      content: "😍",
                      messageID: message.id,
                    })
                  );
                  setReactionsBoolean(false, setShowReactions(false));
        }
            
    }



    const secondReaction = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        if(reactionItemOnlyAuthUser?.userID === authUser.attributes.sub) {
                if(reactionItemOnlyAuthUser?.content === "😂" ) {
                    await DataStore.delete(reactionItemOnlyAuthUser);
                    setReactionsBoolean(false, setShowReactions(false));
                } else {
                    if(!reactionItemOnlyAuthUser) {return}
                await DataStore.save(Reaction.copyOf(reactionItemOnlyAuthUser, 
                    (updated) =>  { 
                        updated.content = "😂" 
                        updated.userID = authUser.attributes.sub,
                        updated.messageID = message.id
                    }));
                    setReactionsBoolean(false, setShowReactions(false));
                }
                
        } else {
                await DataStore.save(
                    new Reaction({
                      userID: authUser.attributes.sub,
                      content: "😂",
                      messageID: message.id,
                    })
                  );
                  setReactionsBoolean(false, setShowReactions(false));
        }
    }
    const thirdReaction = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        if(reactionItemOnlyAuthUser?.userID === authUser.attributes.sub) {
                if(reactionItemOnlyAuthUser?.content === "😡" ) {
                    await DataStore.delete(reactionItemOnlyAuthUser);
                    setReactionsBoolean(false, setShowReactions(false));
                } else {
                    if(!reactionItemOnlyAuthUser) {return}
                await DataStore.save(Reaction.copyOf(reactionItemOnlyAuthUser, 
                    (updated) =>  { 
                        updated.content = "😡" 
                        updated.userID = authUser.attributes.sub,
                        updated.messageID = message.id
                    }));
                    setReactionsBoolean(false, setShowReactions(false));
                }
                
        } else {
                await DataStore.save(
                    new Reaction({
                      userID: authUser.attributes.sub,
                      content: "😡",
                      messageID: message.id,
                    })
                  );
                  setReactionsBoolean(false, setShowReactions(false));
        }
    }
    const fourthReaction = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        if(reactionItemOnlyAuthUser?.userID === authUser.attributes.sub) {
                if(reactionItemOnlyAuthUser?.content === "👍" ) {
                    await DataStore.delete(reactionItemOnlyAuthUser);
                    setReactionsBoolean(false, setShowReactions(false));
                } else {
                    if(!reactionItemOnlyAuthUser) {return}
                await DataStore.save(Reaction.copyOf(reactionItemOnlyAuthUser, 
                    (updated) =>  { 
                        updated.content = "👍" 
                        updated.userID = authUser.attributes.sub,
                        updated.messageID = message.id
                    }));
                    setReactionsBoolean(false, setShowReactions(false));
                }
                
        } else {
                await DataStore.save(
                    new Reaction({
                      userID: authUser.attributes.sub,
                      content: "👍",
                      messageID: message.id,
                    })
                  );
                  setReactionsBoolean(false, setShowReactions(false));
        }
    }
    const fifthReaction = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        if(reactionItemOnlyAuthUser?.userID === authUser.attributes.sub) {
                if(reactionItemOnlyAuthUser?.content === "👎" ) {
                    await DataStore.delete(reactionItemOnlyAuthUser);
                    setReactionsBoolean(false, setShowReactions(false));
                } else {
                    if(!reactionItemOnlyAuthUser) {return}
                await DataStore.save(Reaction.copyOf(reactionItemOnlyAuthUser, 
                    (updated) =>  { 
                        updated.content = "👎" 
                        updated.userID = authUser.attributes.sub,
                        updated.messageID = message.id
                    }));
                    setReactionsBoolean(false, setShowReactions(false));
                }
                
        } else {
                await DataStore.save(
                    new Reaction({
                      userID: authUser.attributes.sub,
                      content: "👎",
                      messageID: message.id,
                    })
                  );
                  setReactionsBoolean(false, setShowReactions(false));
        }
    }

    const emojiArray = ["😍", "😂", "😡", "👍", "👎"]
    
    
    // let emojiToShow = message.reactions?.filter( ai => emojiArray.includes(ai));
    // console.log(emojiToShow, "emoji to show")
    const onlyReactions = reaction.map(reaction => reaction.content)
    const uniquArray = onlyReactions.filter(function(item,pos) {
        return onlyReactions.indexOf(item) == pos;
    })
//    const uniqueArray = message.messageReaction?.reaction?.filter(function(item, pos) {
//         return message.messageReaction?.reaction?.indexOf(item) == pos;
//     })

    if (!user) {
        return <ActivityIndicator />
    }

    return (
        <>
            
        {/* <SafeAreaView style={ isMe ? {zIndex: 10, position: "absolute", top: 0, alignSelf: "flex-end", } : {zIndex: 10, position: "absolute", top: 0, alignItems: "flex-end", marginTop: 0}}> */}
        
        
         {showReactions && <View style={isMe ?{alignItems: "flex-end",} : {alignItems: "flex-start"}}>
        <Reactions ReactionsBoolean={ReactionsBoolean} message={message} propChatRoomForReactions={propChatRoomForReactions} isMe={isMe}  showReactions={showReactions} setAsMessageReply={setAsMessageReply} setShowReactions={setShowReactions} firstreaction={firstreaction} secondReaction={secondReaction} thirdReaction={thirdReaction} fourthReaction={fourthReaction} fifthReaction={fifthReaction} onReactionLongPress />
        </View>}
        
        {/* </SafeAreaView>
         */}
        <View>
                  
                <View>
                <TouchableHighlight  onLongPress={onMessageLongPress} >
                    <View style={[
                        !!setAsMessageReply && isMe && styles.rightContainerMe, !!setAsMessageReply && otherUser && styles.leftContainerSender,
                     ]}>
                        

                          <View>
                    {!!setAsMessageReply && repliedTo && isMe && <MeReply message={repliedTo} user={user} isMe={isMe} soundURI={soundURI} isDeleted={isDeleted}/> }
                    
                    {!!setAsMessageReply && repliedTo && otherUser && <SenderReply message={repliedTo} user={user} isMe={isMe} soundURI={soundURI} isDeleted={isDeleted}/> }
                    </View>
                    
                    {!setAsMessageReply && soundURI && <View>
                    <View style={styles.souundURIReplyView}>
                        <Text style={styles.replyingTo}>Replying to </ Text>
                        <Text style={styles.userNameSound}>{isMe ? "you" : user.name}</Text>
                    </View>    
                    
                    <View style={{marginRight: "-25%"}}>
                     <ReplyAudioMe soundURI={soundURI}/>
                    </View> 
            </View>}
                    {!!setAsMessageReply && soundURI && isMe && <View style={{marginRight: "-85%"}}>
                        <AudioPlayerIsMe soundURI={soundURI}/> 
                        </View>}
                    {!!setAsMessageReply && soundURI && otherUser &&
                    <View style={{marginRight: "-85%"}}> 
                    <AudioPlayerIsNotMe soundURI={soundURI}/> 
                    </View>}
                    {message.image && (
                        <View style={!!setAsMessageReply ? { width: "45%",} : { width: "15%",} }>

                        
                           {!setAsMessageReply && <View style={styles.setAsMessageReply}>
                            <Text style={styles.textAboveUserName1}>Replying to </Text>
                            <Text style={styles.replyUserName1}>{isMe ? "you" : user.name}</Text> 
                            </View>}
                           <S3Image
                                imgKey={message.image}
                                style={isMe ? styles.S3ImageMe  : styles.S3ImageOtherUser}
                                resizeMode="cover" />
                        </View>
                    )}
                    {!setAsMessageReply && !!message.content && !message.image && <View>

                        <View  style={styles.textInputReplyingView}>
                        <Text style={styles.replyingText}>Replying to </Text>
                        <Text style={styles.inputReplyingUserNameMe}>{isMe ? "you" : user.name}</Text>
                        </View>
                        
                        <Text numberOfLines={1} style={{ color: "#555658", alignSelf: "flex-end", fontSize: 13,}} >
                    
                        {isDeleted ? "Message deleted" : message.content}
                    </Text> 
                    </View>}
            <View>
                {!!setAsMessageReply && !!message.content && (
                <Text style={isMe ? styles.messageContentMe : styles.messageContentMeOtherUser} >
                    
                        {isDeleted ? "Message deleted" : message.content}
                        </Text>
                    )}

                    <View style={[isMe && styles.messageTimeViewMe, 
                    otherUser && !soundURI && styles.messageTimeViewOtherUser]}>
                    
                    {!!setAsMessageReply && (<View style={styles.textView}>
                    <Text style={isMe ?  styles.messageTimeMe : styles.messageTimeOtherUser }>
                        {moment(message.createdAt).format("LT")}
                        </Text>

                    {/* {isMe && !!message.status && message.status !== "SENT" && (<Ionicons
                        name={message.status === "DELIVERED" ? "ios-checkmark" : "ios-checkmark-done"}
                        style={styles.messageStatus}
                        size={16} color= "white" />)} */}
                    </View>)}
                </View>
            </View>        
                    
                    </View>
                    </TouchableHighlight>
                    {/* {message.reaction &&<View>
                        <View style={[
                        !!setAsMessageReply && isMe && styles.rightContainerMe, !!setAsMessageReply && otherUser && styles.leftContainerSender,
                     ]}>
                        </View>
                    </View>} */}


                    {/* <FlatList 
                    data={reaction} 
                    horizontal
                    scrollEnabled={false}
                    renderItem={({item}) => <View>
                        <View style={[
                        !!setAsMessageReply && isMe && styles.rightReactionMe, !!setAsMessageReply && otherUser && styles.leftReactionSender, {flexDirection: "row", alignItems: "center",}
                     ]}>
                            <Text style={{fontSize: 15,}}>{item.content}</Text>
                            {message.reactions?.length > 2 && <Text style={{fontSize:12,}}>{reaction.content?.length}</Text>}
                        </View>
                    </View>}/> */}

                    {messageHasReaction?.messageID === message.id && <View>
                        <View style={[
                        !!setAsMessageReply && isMe && styles.rightReactionMe, !!setAsMessageReply && otherUser && styles.leftReactionSender, {flexDirection: "row", alignItems: "center",}
                     ]}>
                            <Text style={{fontSize: 15,}}>{uniquArray} </Text>
                            {reaction.map(reaction => reaction.content).length > 1 && <Text style={{fontSize:12,}}>{reaction.map(reaction => reaction.content).length}</Text>}
                        </View>
                    </View>}

                </View>
                
            </View>
            </>
    );
};


export default Message;
