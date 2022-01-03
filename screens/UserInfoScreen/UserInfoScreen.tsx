import React, { useEffect, useState } from "react"
import { Entypo, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import {View, Animated, Text, StyleSheet, Image, ImageBackground, Pressable, ScrollView, Platform } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/core";
import moment from "moment";
import {ChatRoomUser, Message, User,} from "../../src/models";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { S3Image } from "aws-amplify-react-native"
import ios_bg from "../../assets/images/ios_bg.jpg";
import manPhoto from "../../assets/images/manPhoto.png"
import { USER_AGENT_HEADER } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import FollowUnFollow from "./followUnFollow";
import { StatusBar } from "expo-status-bar";
import UserInfoScreenHeader from "../../navigation/UserInfoScreenHeader/UserInfoScreenHeader";






const UserInfoScreen = () => {
    const [ media, setMedia ] = useState<any>(null);
    const [showFollow, setShowFollow] = useState (false);
    const [user, setUser] = useState <User| undefined> (undefined)
    const [loggedInUser, setLoggedInUser] = useState <User | undefined> (undefined)
    const [showModal, setShowModal] = useState (false);


    

    // useEffect(() => {
        
    //     const fetchImages = async () => {
    //         const images = (await DataStore.query(
    //             Message, media => media.chatroomID("eq", chatRoom.id), {sort: media => media.createdAt(SortDirection.DESCENDING)},)).map((media) => media.image)
    //             if(!images) {return null}
    //             setMedia(images) 
    //             console.log(images)
    //     }

    //     fetchImages();
    //     console.log("Media", media)
    const route = useRoute();

    const fetchUser = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        const loggedInUser = await DataStore.query(User, authUser.attributes.sub)
        setLoggedInUser(loggedInUser)
        const fetchedUser = await DataStore.query(User, route.params?.user?.id)
        setUser(fetchedUser)
        
    }

    // useEffect(() => {
    //     fetchUser()
    // },[])

    useEffect(() => {
        console.log("user image ",user?.imageUri)
        fetchUser()
        const subscription = DataStore.observe(User).subscribe(
          () => fetchUser())
        return () => subscription.unsubscribe();
    
        
      }, []);


    // useEffect(() => {
    //     if(!user) {
    //       return;
    //     }
    //     const subscription = DataStore.observe(User, user.id,).subscribe((msg) =>{
    //         if (msg.model === User && msg.opType === "UPDATE") {
    //           setUser((followers) => ({...followers, ...msg.element}));
    //           setUser((imageUri) => ({...imageUri, ...msg.element}));
    //           setLoggedInUser((following) => ({...following, ...msg.element}))
    //         }
    //     });
    
    //     return () => subscription.unsubscribe();
    //   },[user?.id, user?.followers])
        
    // // }, [])



    const navigation = useNavigation()
    
    const createChatRoom = route?.params?.createChatRoom;
    
    const chatRoom = route?.params?.chatRoom;
    
    const onMessagePress = async () => {
          const authUser = await Auth.currentAuthenticatedUser()
          const dbUser = await DataStore.query(User, authUser.attributes.sub)


          //Here we query the chatrrooms that the authUser has.
          const authChatRoomUser = (await DataStore.query(ChatRoomUser,)).filter((chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub).filter((chatRoomUser) => chatRoomUser.chatroom.name !== null ? (chatRoomUser.chatroom.name === null) : (chatRoomUser.chatroom.name === null)).map((chatRoom) => chatRoom.chatroom.id)
          console.log("authChatRooms",authChatRoomUser)
          
          //Here we query the the chatrooms that the listUser(clicked user) has.
          const listChatRoomUser = (await DataStore.query(ChatRoomUser)).filter((chatRoomUser) => chatRoomUser.user.id === user?.id).filter((chatRoomUser) => chatRoomUser.chatroom.name !== null ? (chatRoomUser.chatroom.name === null) : (chatRoomUser.chatroom.name === null)).map((chatRoom) => chatRoom.chatroom.id)
            
          // Here is the shared room id between authUser and listUser(clicked user)
          let commonChatRoom = authChatRoomUser.filter( ai => listChatRoomUser.includes(ai));
      
          console.log
          //If there is no a shared chat room than create one
          if (!commonChatRoom.toString()) {
          console.log("did not export a chatroom ID", !commonChatRoom.toString())
          return await createChatRoom([user]);
          
          //Else navigate to the active one
          } else {
          navigation.navigate("ChatRoom", {id: commonChatRoom.toString()})
          console.log("the shared chat room id is:", commonChatRoom.toString())
        }
   }
    
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
    

    const goBack = () => {
        navigation.goBack();
    }
    

    

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

    // const fetchFollowersAndFollowing = async () => {
    //     const authUser = await Auth.currentAuthenticatedUser();
    //     const fetchedFollowersAndFollowing = (await DataStore.query(FollowersFollowing))
        
    // }
 
    const onFollowUnFollow = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        
        if(user?.followers?.includes(authUser.attributes.sub)) {
            console.log("from here");

            //filtering following users without user
            const deleteUserFromMyFollowingList = loggedInUser?.following?.filter(following => following !== user?.id)

            const uniqueFollowingList = deleteUserFromMyFollowingList?.filter(function(item, pos) {
                return deleteUserFromMyFollowingList?.indexOf(item) == pos;
            })


            //filtering followers from user without authUser
            const deleteMeFromUserFollwersList = user?.followers?.filter(followers => followers !== loggedInUser?.id);

                const uniqueFollowersList = deleteMeFromUserFollwersList.filter(function(item, pos) {
                    return deleteMeFromUserFollwersList.indexOf(item) == pos;
                })


            
            // pushing new data to backend
            console.log("unique following list", uniqueFollowingList);
            await DataStore.save(User.copyOf(loggedInUser, 
                (updated) =>  { 
                    updated.following = uniqueFollowingList
            }));
            console.log("unique follower lilst", uniqueFollowersList)
            await DataStore.save(User.copyOf(user, 
                (updated) =>  { 
                    updated.followers = uniqueFollowersList
            }));
            console.log("following", deleteUserFromMyFollowingList);
            console.log("followers", deleteUserFromMyFollowingList);

            // const indexOfFollower = following?.indexOf(authUser.attributes.sub)
            // console.log("following", following)
            // console.log(indexOfFollower)
            // if(indexOfFollower < -1) {
            //     return null
            // }
            // const deletedFollower = following?.splice(indexOfFollower, 1)
            
            

           console.log("authUser", authUser.attributes.sub)
           

        } else {
            if(user?.followers === null && loggedInUser?.following === null) {

                const userFollower =  [authUser.attributes.sub]
                
                console.log("userFollower", userFollower)
                
                await DataStore.save(User.copyOf(user, 
                    (updated) =>  { 
                        updated.followers = userFollower
                }));
                const loggedInFollower = [user?.id]
                console.log("loggedInFollower",loggedInFollower)
                await DataStore.save(User.copyOf(loggedInUser, 
                    (updated) =>  { 
                        updated.following = loggedInFollower
                }));

                
            } else if(loggedInUser?.following === null && user?.followers) {
    
                
                
                const userFollower =  [authUser.attributes.sub]

                const followersPlusNewFollower = [...user?.followers, authUser.attributes.sub]
                const uniqueFollowers = followersPlusNewFollower.filter(function(item, pos) {
                    return followersPlusNewFollower.indexOf(item) == pos;
                })
                console.log("userFollower", userFollower)
                await DataStore.save(User.copyOf(user, 
                    (updated) =>  { 
                        updated.followers = uniqueFollowers
                }));

                const loggedInFollower = [user?.id]
                console.log("loggedInFollower",loggedInFollower)
                await DataStore.save(User.copyOf(loggedInUser, 
                    (updated) =>  { 
                        updated.following = loggedInFollower
                }));


            } else if(loggedInUser?.following && user?.followers === null) {

                const followingPlusNewFollowing = [...loggedInUser?.following, user?.id]
                const uniqueFollowing = followingPlusNewFollowing.filter(function(item, pos) {
                    return followingPlusNewFollowing.indexOf(item) == pos;
                })

                await DataStore.save(User.copyOf(loggedInUser, 
                    (updated) =>  { 
                        updated.following = uniqueFollowing
                }));
                
                const userFollower =  [authUser.attributes.sub]
                console.log("userFollower", userFollower)
                
                await DataStore.save(User.copyOf(user, 
                    (updated) =>  { 
                        updated.followers = userFollower 
                    }));
            }
            else {
                const followersPlusNewFollower = [...user?.followers, authUser.attributes.sub]
                const uniqueFollowers = followersPlusNewFollower.filter(function(item, pos) {
                    return followersPlusNewFollower.indexOf(item) == pos;
                })
                await DataStore.save(User.copyOf(user, 
                    (updated) =>  { 
                        updated.followers = uniqueFollowers
                }));

                const followingPlusNewFollowing = [...loggedInUser?.following, user?.id]
                const uniqueFollowing = followingPlusNewFollowing.filter(function(item, pos) {
                    return followingPlusNewFollowing.indexOf(item) == pos;
                })
                await DataStore.save(User.copyOf(loggedInUser, 
                    (updated) =>  { 
                        updated.following = uniqueFollowing
                }));
                
            }
            
        }
            
            
    }
        


        // const numberManagement =  () => {
        //     if (user?.followers?.length >= 1000) {

        //         return `${user?.followers?.length - 999}K` 
        //     } else if (user?.followers?.length >= 10000) {
        //         return `${user?.followers?.length - 900}K`
        //     }

        // }

        const onUnFollowPress = () => {
            if(user?.followers?.includes(loggedInUser?.id)) {
               setShowModal(prev => !prev)
            } else {
                onFollowUnFollow()
            }
        }


    return (
        <>
        
        <FollowUnFollow onFollowUnFollow={onFollowUnFollow} showModal={showModal} setShowModal={setShowModal} user={user}/>
        
        {/* //First icons */}
        <UserInfoScreenHeader user={user}/>
    <View style={styles.page}>

            



            {/* //Profile photo and followers*/}
            <View style={styles.profileInfo}>
           
            <View>
                <Text style={styles.H1Text}>{user?.followers?.length}
                </Text>

                <Text style={styles.H2Text}>
                    followers
                </Text>
            </View>

            <View>
            {user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.profileImage}
        resizeMode="cover" />)} 

        {!user?.imageUri && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 10,
          paddingBottom: 10, 
          padding: 28,  
          borderTopLeftRadius: (Platform.OS === "ios") ? 45 : 35,
          borderTopRightRadius: (Platform.OS === "ios") ? 45 : 35,
          borderBottomLeftRadius: (Platform.OS === "ios") ? 45 : 35,
          borderBottomRightRadius: (Platform.OS === "ios") ? 45 : 35,
          
        }}>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}
            </View>

            <View>
                <Text style={styles.H1Text}>
                    {user?.following?.length}
                </Text>
                <Text style={styles.H2Text}>
                  following
                </Text>
            </View>

            </View>




            {/* //Username and bio*/}
            <View style={styles.userNameAndBio}>
            <Text style={styles.userNameText}>{user?.name}</Text>
            <Text style={styles.H2Text}>{user?.status}</Text>
            </View>
            
            

            {/* //Buttons below username*/}
            <View style={styles.followMessageBothView}>

             <TouchableHighlight underlayColor={"rgba(NaN, 236, 240, 0.95, .2)"} onPress={onUnFollowPress} style={styles.followView}>
                <Text style={styles.followText}>{user?.followers?.includes(loggedInUser?.id) ? "FOLLOWING" : "FOLLOW"}</Text>
             </TouchableHighlight>

             <Pressable onPress={onMessagePress} style={styles.messageView}>
                <Text style={styles.messageText}>MESSAGE</Text>
             </Pressable>

            </View>

            {/* //Posts and favorite*/}
            <View style={ Platform.OS === "ios" ? styles.postsAndFavoriteView : styles.postsAndFavoriteAndroid}>

            <View style={styles.posts}> 
            <Entypo name="folder-images" size={24} color="black" style={{alignSelf: "center"}} />
            </View>

            <View style={styles.favorite}>
            <Fontisto name="favorite" size={24} color="black" style={{alignSelf: "center"}}/>
            </View>
            </View>
            
            {/* chat room media */}
            {/* <View style={styles.media}>
            <Text style={{color: "#555658", fontSize: 20, marginBottom: 10,}}> Sheard Media </Text>
            </View> */}

            
            {/* <View style={styles.s3ImageView}> 
            <FlatList
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            ListEmptyComponent={ListEmptyComponent}
             style={styles.chatRoomImages}
             data={media} 
             renderItem={renderItem}
             keyExtractor={keyExtractor}
              />
            </View> */}

        <StatusBar style={"dark"}/>
        </View>
        </>
            
           
           
             
        
    
    )
};


const styles = StyleSheet.create({

    //________________________________________________

    page:{
        borderRadius: 30,
        paddingTop: 50,
        flex:1,
        padding: 15,
        backgroundColor: "#ECF0F3",
    },
    
    firstIcons:{
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    
    profileInfo:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 15,
        padding: 50,
    },
    
    H1Text: {
        alignSelf: "center", 
        fontSize: 25, 
        fontWeight: "700"
    },
    H2Text:{
        color: "#90A8B2",
        fontWeight: "700",
        alignSelf: "center",
    },

    noImageText: {
        fontSize: 55,
        fontWeight: "bold", 
        color: "#FAFAFA", 
        minWidth: (Platform.OS === "ios") ? 60 : 50, 
        maxWidth: (Platform.OS === "ios") ? 60 : 50,
        maxHeight: (Platform.OS === "ios") ? 80 : 75,
        minHeight: (Platform.OS === "ios") ? 80 : 75,
        textAlign: "center",
        marginTop: (Platform.OS === "ios") ? 15 : 2,
        marginBottom: (Platform.OS === "ios") ? 5 : 8,
    },
    
    userNameText:{
        fontSize: 20, 
        fontWeight: "700",
        color: "#454B5E",
        marginBottom: 10,
    },
    
    profileImage: {
        width: 90, 
        height: 90, 
        borderRadius: 20,
    },
    
    userNameAndBio:{
        paddingRight: 50, 
        paddingLeft: 50,
        alignItems: "center",
        marginBottom: 30,
    },
    
    followMessageBothView:{
        flexDirection: "row", 
        justifyContent: "space-between" ,
        paddingRight: 45, 
        paddingLeft: 45,
    },
    
    followView:{
        backgroundColor: "#705AD0", 
        borderRadius: 20, 
        minWidth: 130,  
        paddingTop: 15, 
        paddingBottom: 15,
    },
    
    messageView:{
        borderWidth: 1, 
        borderColor: "#90A8B2", 
        minWidth: 130, 
        paddingTop: 15, 
        paddingBottom: 15, 
        borderRadius: 20,
    },
    
    followText:{
        alignSelf: "center", 
        fontSize: 16, 
        fontWeight: "700", 
        color: "#FAFAFA",
    },
    
    messageText:{
        alignSelf: "center", 
        fontSize: 16, 
        fontWeight: "700", 
        color: "#454B5E",
    },
    
    postsAndFavoriteView:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginRight: -16,
        marginLeft: -27,
    },
    
    postsAndFavoriteAndroid:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginRight: -16,
        marginLeft: -37,
    },
    
    posts:{
        borderWidth: .7, 
        borderRightWidth: .2, 
        minWidth:220, maxWidth:220, 
        paddingTop: 20, paddingBottom: 20, 
        borderColor: "rgba(161,181,190, .5)",
    },
    
    favorite:{
        borderWidth: .7, 
        borderLeftWidth: .2, 
        minWidth:220, maxWidth:220, 
        paddingTop: 20, 
        paddingBottom: 20, 
        borderColor:"rgba(161,181,190, .5)",
    },


})

export default UserInfoScreen; 