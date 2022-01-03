// import { Auth, DataStore } from "aws-amplify";
// import InvertedSectionList from "inverted-section-list";
// import moment from "moment";
// import React, { useEffect, useState } from "react"
// import {View, Text, FlatList, SafeAreaView, Dimensions, StyleSheet} from "react-native"
// import { TouchableHighlight } from "react-native-gesture-handler"
// import { Message, User } from "../src/models";


// const TestScreen = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [currentIndex, setCurrentIndex] = useState();
//     const [currentSection, setCurrentSection] = useState();
//     const [refFlatList, setRefFlatList] = useState();
    
    
    

        
        
//         const fetchMessages = async () => {
           
//               const authUser = await Auth.currentAuthenticatedUser()
//               const user = await DataStore.query(User, authUser.attributes.sub)
//               if(!user?.id) {
//                 return
//             }
//               const fetchedMessages = (await DataStore.query(Message, message => message.userID("eq", user?.id)))
//               setMessages(fetchedMessages);
//         };

//         useEffect(() => {
//             fetchMessages();
//         },[])



        


                       
//         const onPressItem = (item, index) => {
//             setCurrentIndex(index,)
//             const newMessages = messages.map((e, index) => {
//                 if(item.id === e.id) {
//                     return {
//                         ...e,
//                         selected: true,
//                     }
//                 }

//                 else {
//                     return {
//                         ...e,
//                         selected: false
//                     }
                    
//                 }
                
//             })
//             setMessages(newMessages)
//         }

//         const DATA = Object.values(messages.reduce((acc, item) => {
  
//             const getMessageDate = () => {
//               if (moment(item.createdAt).isSame(moment(), 'day')) {
//                 return  `Today`
          
//               } else if (moment(item.createdAt).isBefore(moment(),'day') && !moment(item.createdAt).isBefore(moment(),'day'))   {
//                 return `${moment(item.createdAt).format("dddd")}`;
                
          
//               } else if (moment(item.createdAt).isBefore(moment(), "days") &&  !moment(item.createdAt).isBefore(moment(), "year")){
//                 return `${moment(item.createdAt).format("MMMM D")}`;
          
//               } else if (moment(item.createdAt).isBefore(moment(), "year")) {
//                   return `${moment(item.createdAt).format("D.MM.YYYY")}`;
          
//                 }
              
//             };
          
//             if (!acc[moment(item.createdAt).format('L')]) acc[moment(item.createdAt).format('L')] = {
//               title: getMessageDate(),
//               data: []
//             };
//             acc[moment(item.createdAt).format('L')].data.push(item);
//             return acc;
          
//           }, {}))

        


//         // const onScrollToItemSelected = () =>{
//         //     refFlatList.scrollToIndex({animated: true, index: currentIndex});
//         // }

        
        


//         const getItemLayout = (data, index) => {
//            return  {length: Dimensions.get('window').width / 7, offset: Dimensions.get('window').width / 5 * index, index} 
//         }
 

//         const onScrollToItemSelected = (index) =>{
//             refFlatList.scrollToLocation({
//                 animated: true,
//                 itemIndex: currentIndex,
//               });
//         }
        
//         const renderItem = ({item, index}) => (
//             <View style={{padding:10,}}>

//                 <TouchableHighlight 
//                 underlayColor={"#4A4D55"} 
//                 style={{borderRadius: 50}}
                
//                 onPress={() =>  {onPressItem(item,index);  onScrollToItemSelected()}}
//                 >
//                 <View style={ item.selected ? {padding:20, backgroundColor: "red", borderRadius: 50, } : {padding:20, backgroundColor: "white", borderRadius: 50, }}> 
//                 <Text >
//                     {item.content}
//                 </Text>
                
//                 </View>
//                 </TouchableHighlight>
                
//             </View>)




// const sectionHeader = ({section,}) => (<View>
//    { <View style={styles.groupView}>
//       <View style={styles.groupTextView}>
//       <Text style ={styles.groupText}>
//         {section.title}
//         </Text>
//       </View>
   
//     </View>}
//     </View>)




        
//     return (
//         <View style={{paddingTop: 50, paddingBottom: 100, padding: 20, backgroundColor: "#ECF0F3"}}>

//             {/* <FlatList 
//             data={messages}
//             renderItem={renderItem}
//             keyExtractor={item => `key-${item.id}`}
//             getItemLayout={getItemLayout}
//             ref={(ref) => setRefFlatList(ref)}

//             /> */}

//             <InvertedSectionList
//            sections={DATA} 
//            renderItem={renderItem}
//            renderSectionFooter={sectionHeader}
//            keyExtractor={item => `key-${item.id}`}
//            getItemLayout={getItemLayout}
//            ref={(ref) => setRefFlatList(ref)}
//            />

//             <TouchableHighlight 
//             onPress={onScrollToItemSelected}
//             style={{padding: 20, backgroundColor: "red", borderRadius: 20,}}>
//             <Text style={{alignSelf:"center", color: "white",}}>
//             Hello
//             </Text>
//             </TouchableHighlight>

            
            
            
//         </View>
//     )
// }



// const styles = StyleSheet.create ({
//     page:{
//         flex: 1,
//     },

//     topSpace:{
//       backgroundColor: "#705AD0",
//       padding: 20,
//       paddingTop:20,
//       marginBottom: -25,
//     },
  
//   chat:{
//         paddingTop: 2,
//         backgroundColor: "#EFF3F5",
//         flex: 1,
//         borderRadius: 30,
//     },

//     chatReaction:{
//       paddingTop: 2,
//         backgroundColor: "rgba(32,33,36, .3)",
//         flex: 1,
//         borderRadius: 30,
//     },

//     groupView:{
//         alignItems: "center",
//         marginTop: 10,
//     },

//     groupTextView:{
//       backgroundColor: "#FAFAFA",
//       margin: 5,
//       padding: 5,
//       borderRadius: 10,
//       shadowColor: "#000",
//       marginBottom: 10,
      
//     },

//     groupText:{
//         color: "rgba(63,65,72,.7)", 
//         fontSize: 14,
//     }
// })


// export default TestScreen; 





import { Auth, DataStore } from "aws-amplify";
import InvertedSectionList from "inverted-section-list";
import moment from "moment";
import React, { useEffect, useState } from "react"
import {View, Text, FlatList, SafeAreaView, Dimensions, StyleSheet} from "react-native"
import { TouchableHighlight } from "react-native-gesture-handler"
import { Message, User } from "../src/models";


const TestScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    
    const [currentSection, setCurrentSection] = useState();
    const [refFlatList, setRefFlatList] = useState();
    const [showReactions, setShowReactions] = useState(false);
    
    

        
        
        const fetchMessages = async () => {
           
              const authUser = await Auth.currentAuthenticatedUser()
              const user = await DataStore.query(User, authUser.attributes.sub)
              if(!user?.id) {
                return
            }
              const fetchedMessages = (await DataStore.query(Message, message => message.userID("eq", user?.id)))
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

        


        // const onScrollToItemSelected = () =>{
        //     refFlatList.scrollToIndex({animated: true, index: currentIndex});
        // }

        
        


        
 

       
        
        




const sectionHeader = ({section,}) => (<View>
   <View style={styles.groupView}>
      <View style={styles.groupTextView}>
      <Text style ={styles.groupText}>
        {section.title}
        </Text>
      </View>
   
    </View>
    </View>)


    const [index, setIndex] = useState(0);
    const ref = React.useRef(null);

    

    const renderItem = ({item, index: findex}) => (
      <View style={{padding:10,}}>

          <TouchableHighlight 
          underlayColor={"#4A4D55"} 
          style={{borderRadius: 50}}
          
          onPress={() =>  setIndex(findex)}
          >
          <View style={ item.selected ? {padding:20, backgroundColor: "red", borderRadius: 50, } : {padding:20, backgroundColor: findex === index ? "pink" : "white", borderRadius: 50, }}> 
          <Text >
              {item.content}
          </Text>
          
          </View>
          </TouchableHighlight>
          
      </View>)

      

useEffect(() => {
  if (index < messages.length) {
  ref.current?.scrollTo({
    index,
    
    animated: true,
  });

}
},[index])

// useEffect(() => {
//   if (index < messages.length) {
//   ref.current?.scrollToIndex({
//     index,
//     animated: true,
//   });

// }
// },[index])
        
    return (


        <View style={{paddingTop: 50, paddingBottom: 100, padding: 20, backgroundColor: "#ECF0F3"}}>

            
            
            <InvertedSectionList
            ref={ref}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={index}
            sections={DATA}
            renderSectionFooter={sectionHeader}
            renderItem={renderItem}
            keyExtractor={item => `key-${item.id}`}
            />

            {/* <FlatList
            ref={ref}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={index}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => `key-${item.id}`}
            /> */}
            

<View style={{marginTop: -100,}}>
            <TouchableHighlight 
            onPress={() => {
              if(index === 0) {
                return 
              }

              setIndex(index -1)
            }}
            style={{padding: 20, backgroundColor: "red", borderRadius: 20, }}>
            <Text style={{alignSelf:"center", color: "white",}}>
            up
            </Text>
            </TouchableHighlight>


            <TouchableHighlight 
            onPress={() => null}
            style={{padding: 20, backgroundColor: "red", borderRadius: 20,}}>
            <Text style={{alignSelf:"center", color: "white",}}>
            Selected
            </Text>
            </TouchableHighlight>



            <TouchableHighlight 
            onPress={() => {
              if(index === messages.length -1) {
                return 
              }

              setIndex(index + 1)
            }}
            style={{padding: 20, backgroundColor: "red", borderRadius: 20,}}>
            <Text style={{alignSelf:"center", color: "white",}}>
            Down
            </Text>
            </TouchableHighlight>
            </View>


           </View>
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
    }
})


export default TestScreen; 




// for userInfoScreen you can delete if not needed

//     const button = async () => {
    //         if(user?.followers === null) {

    //             const userFollower =  [authUser.attributes.sub]
    //             const loggedInFollower = [user?.id]
    //             console.log("userFollower", userFollower)
    //             console.log("loggedInFollower",loggedInFollower)
    //             await DataStore.save(User.copyOf(user, 
    //                 (updated) =>  { 
    //                     updated.followers = userFollower
    //             }))
    //             await DataStore.save(User.copyOf(loggedInUser, 
    //                 (updated) =>  { 
    //                     updated.following = loggedInFollower
    //             }))
    //     } else {
    //         await DataStore.save(User.copyOf(user, 
    //             (updated) =>  { 
    //                 updated.followers = [...updated.followers, authUser.attributes.sub]
    //         }));

    //         await DataStore.save(User.copyOf(loggedInUser, (updated) => {
    //             updated.following = [...updated.following, user?.id]
    //         }));
    //     }
    // }




 
    // const onFollowUnFollow = async () => {
    //     const authUser = await Auth.currentAuthenticatedUser()
        
    //     if(user?.followers?.includes(authUser.attributes.sub)) {
    //         console.log("from here");

    //         //filtering following users without user
    //         const deleteUserFromMyFollowingList = loggedInUser?.following?.filter(following => following !== user?.id)

    //         const uniqueFollowingList = deleteUserFromMyFollowingList?.filter(function(item, pos) {
    //             return deleteUserFromMyFollowingList?.indexOf(item) == pos;
    //         })


    //         //filtering followers from user without authUser
    //         const deleteMeFromUserFollwersList = user?.followers?.filter(followers => followers !== loggedInUser?.id);

    //             const uniqueFollowersList = deleteMeFromUserFollwersList.filter(function(item, pos) {
    //                 return deleteMeFromUserFollwersList.indexOf(item) == pos;
    //             })


            
    //         // pushing new data to backend
    //         console.log("unique following list", uniqueFollowingList);
    //         await DataStore.save(User.copyOf(loggedInUser, 
    //             (updated) =>  { 
    //                 updated.following = uniqueFollowingList
    //         }));
    //         console.log("unique follower lilst", uniqueFollowersList)
    //         await DataStore.save(User.copyOf(user, 
    //             (updated) =>  { 
    //                 updated.followers = uniqueFollowersList
    //         }));
    //         console.log("following", deleteUserFromMyFollowingList);
    //         console.log("followers", deleteUserFromMyFollowingList);

    //         // const indexOfFollower = following?.indexOf(authUser.attributes.sub)
    //         // console.log("following", following)
    //         // console.log(indexOfFollower)
    //         // if(indexOfFollower < -1) {
    //         //     return null
    //         // }
    //         // const deletedFollower = following?.splice(indexOfFollower, 1)
            
            

    //        console.log("authUser", authUser.attributes.sub)
           

    //     } else {
    //         if(user?.followers === null && loggedInUser?.following === null) {

    //             const userFollower =  [authUser.attributes.sub]
                
    //             console.log("userFollower", userFollower)
                
    //             await DataStore.save(User.copyOf(user, 
    //                 (updated) =>  { 
    //                     updated.followers = userFollower
    //             }));
    //             const loggedInFollower = [user?.id]
    //             console.log("loggedInFollower",loggedInFollower)
    //             await DataStore.save(User.copyOf(loggedInUser, 
    //                 (updated) =>  { 
    //                     updated.following = loggedInFollower
    //             }));

                
    //         } else if(loggedInUser?.following === null && user?.followers) {
    
                
                
    //             const userFollower =  [authUser.attributes.sub]

    //             const followersPlusNewFollower = [...user?.followers, authUser.attributes.sub]
    //             const uniqueFollowers = followersPlusNewFollower.filter(function(item, pos) {
    //                 return followersPlusNewFollower.indexOf(item) == pos;
    //             })
    //             console.log("userFollower", userFollower)
    //             await DataStore.save(User.copyOf(user, 
    //                 (updated) =>  { 
    //                     updated.followers = uniqueFollowers
    //             }));

    //             const loggedInFollower = [user?.id]
    //             console.log("loggedInFollower",loggedInFollower)
    //             await DataStore.save(User.copyOf(loggedInUser, 
    //                 (updated) =>  { 
    //                     updated.following = loggedInFollower
    //             }));


    //         } else if(loggedInUser?.following && user?.followers === null) {

    //             const followingPlusNewFollowing = [...loggedInUser?.following, user?.id]
    //             const uniqueFollowing = followingPlusNewFollowing.filter(function(item, pos) {
    //                 return followingPlusNewFollowing.indexOf(item) == pos;
    //             })

    //             await DataStore.save(User.copyOf(loggedInUser, 
    //                 (updated) =>  { 
    //                     updated.following = uniqueFollowing
    //             }));
                
    //             const userFollower =  [authUser.attributes.sub]
    //             console.log("userFollower", userFollower)
                
    //             await DataStore.save(User.copyOf(user, 
    //                 (updated) =>  { 
    //                     updated.followers = userFollower 
    //                 }));
    //         }
    //         else {
    //             const followersPlusNewFollower = [...user?.followers, authUser.attributes.sub]
    //             const uniqueFollowers = followersPlusNewFollower.filter(function(item, pos) {
    //                 return followersPlusNewFollower.indexOf(item) == pos;
    //             })
    //             await DataStore.save(User.copyOf(user, 
    //                 (updated) =>  { 
    //                     updated.followers = uniqueFollowers
    //             }));

    //             const followingPlusNewFollowing = [...loggedInUser?.following, user?.id]
    //             const uniqueFollowing = followingPlusNewFollowing.filter(function(item, pos) {
    //                 return followingPlusNewFollowing.indexOf(item) == pos;
    //             })
    //             await DataStore.save(User.copyOf(loggedInUser, 
    //                 (updated) =>  { 
    //                     updated.following = uniqueFollowing
    //             }));
                
    //         }
            
    //     }
            
            
    // }
