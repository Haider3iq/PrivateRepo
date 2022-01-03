import  React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView, Platform, BackHandler, Pressable } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native';
import Users from "../../assets/dummy-data/Users"
import PostsHeader from '../../navigation/PostsHeader/PostsHeader';
import { AntDesign, EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {useNavigation,} from "@react-navigation/core";
import { FadeLoading } from 'react-native-fade-loading';
import PostsModal from './PostsModal';
import LottieView from "lottie-react-native";
import heart from "../../assets/Lottie/44921-like-animation.json"


const PostsItem = (props) => { 
   const {
    setShowModal,
    isRender,
    post, 
    index, 
    setDummyPosts, 
    dummyPosts, 
    setIsRender
   } = props

   const navigation = useNavigation()

   const likeAnimation = React.useRef(null);
   const likeAnimationBig = React.useRef(null);
   const isFirstRun = React.useRef(true);

   useEffect(() => {
       if(isFirstRun.current) {
        if(post.like) {
            likeAnimation.current.play(66, 66);
        } else {
          likeAnimation.current.play(19, 19);
        }
        isFirstRun.current = false;
       
    } else if(post.like) {

        likeAnimation.current.play(30, 50);
        // likeAnimationBig.current.play(30, 50);  

       } else {

        likeAnimation.current.play(0, 19);
        // likeAnimationBig.current.play(0, 19);

       }

    //    if(likeAnimationBig.current.play(19)) {
    //        likeAnimationBig.current = null;
    //    } else if (likeAnimationBig.current.play(50)) {
    //        likeAnimationBig.current = null;
    //    }
    //    console.log("current like animation big", likeAnimationBig.current)
    //    console.log("//__________________________//");
    //    console.log("likeAnimation", likeAnimation)
   },[post.like])

   
    const onLikePress = () => {
      const updatedData = dummyPosts.map(postToUpdate => {
        if(post.id === postToUpdate.id) {
          if(post.like === true) {
            postToUpdate.like = false
          } else {
            postToUpdate.like = true
          }
        }
        return postToUpdate
      })
      setDummyPosts(updatedData)
        setIsRender(!isRender)
     }

     
     
    
    return (
    
  <View >
    <View style={{ 
    marginBottom: -10,  
    marginTop: 10, 
    paddingRight: 25, 
    paddingLeft: 15, 
    flexDirection: "row", 
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    }}>


    
    <View style={styles.postOwnerContainer}>
      <Image key={index} style={styles.postProfileImage} source={{uri:post.imageUri}}/>
    <Text >{post.name}</Text>
    </View>

    

    <Pressable  onPress={() => setShowModal(prev => !prev)} style={{borderWidth: 1.5, borderColor: "#71727A", borderRadius: 5, padding: 2, marginRight: 5, marginBottom: -2, } } >
        <MaterialCommunityIcons name="menu-open" size={26} color="#71727A" />
               </Pressable>
    </View>
    
    {/* <LottieView source={heart} 
    ref={likeAnimationBig}
    autoPlay={false}
    loop={false}
    style=
    {{
      width: 100, 
      height: 100,
      transform: [{translateY: 10}]
    }}/> */}
    <View style={{ marginBottom: 10, margin: 10, borderRadius: 30,}}>
    <Image key={index} 
    style={styles.postImage} 
    source={{uri:post.imageUri}}/>
     
    <BlurView tint="light" intensity={Platform.OS === "ios" ? 70 : 100} style={styles.blurView}>
      <View style={styles.postActivites}>

      <Pressable onPress={onLikePress}>
      <LottieView source={heart}
    ref={likeAnimation} 
    autoPlay={false}
    loop={false}
    style=
    {{
      width: 110, 
      height: 110,
      marginLeft:( Platform.OS === "ios" ? -10 : -10),
      marginRight:( Platform.OS === "ios" ? -50 : -40),
      marginTop: ( Platform.OS === "ios" ? -10 : -17),
      marginBottom: ( Platform.OS === "ios" ? -50 : -50),
      
    }}/>
      </Pressable>
      <Text>500</Text>
      </View>
    
     <Pressable onPress={() =>  navigation.navigate("Comments")} style={styles.postActivites}>
     <EvilIcons name="comment" size={50} color="black" />
     <Text>700k</Text>
     </Pressable>
    <EvilIcons name="share-google" size={50} color="black" />
    </BlurView>

   {Platform.OS === "ios" && <View style={styles.iosShadow}>
    </View>}
    
    <View style={styles.postText}>

      <Text style={{fontWeight: "700"}}>{post.name}  </Text>
    <Text style={{color: "#4A4D55"}}>{post.status}</Text>
    </View>
    </View>


  </View>
  )
}

export default PostsItem;

const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
      flex: 1,
      
      backgroundColor: "#ECF0F3",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    blurView: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: -25,
        borderRadius: 30,
        paddingRight: 15,
        paddingLeft: 15,
        padding: 5,
        overflow: "hidden",
        shadowOffset: {width:0, height: 2,},
        shadowOpacity: 10,
        elevation: 3,
        shadowRadius: 10,
        zIndex: 1,
    },
  
    iosShadow: {
        marginTop: -10,
        alignSelf: "center",
        height: 5,
        width: 260,
        overflow: "visible",
        shadowOffset: {width:0, height: 2,},
        shadowOpacity: 0.6,
        elevation: 3,
        shadowRadius: 5,
        backgroundColor: "#ECF0F3", 
        zIndex: 0,
    },
  
    postActivites: {
        overflow: "hidden",
        flexDirection: "row", 
        alignItems: "center",
        marginRight: 40,
    },
  
    postImage: {
      width: (Platform.OS === "ios" ) ?  360 : 340, 
      height: 420, 
      borderRadius: 30, 
      alignSelf: "center",
      
    },
    
    postText: {
      flexDirection: "row", 
      marginBottom: 10, 
      marginTop:(Platform.OS === "ios")? 15 : 10, 
      paddingRight: 20, 
      paddingLeft: 20,
    },
  
    postOwnerContainer: {
      marginBottom: 10, 
      marginTop: 10, 
      paddingRight: 20, 
      paddingLeft: 20, 
      flexDirection: "row", 
      alignItems: "center",
      
      
    },
  
    postOwnerContainerLoading: {
      marginBottom: 10, 
      marginTop: 10, 
      paddingRight: 20, 
      paddingLeft: 25, 
      flexDirection: "row", 
      alignItems: "center",
      
      
    },
    postProfileImage: {
      width: 50, height: 50, 
      borderRadius: 18, 
      alignSelf: "center", 
      marginRight: 10,
    },
  
    fadeLoading: {
      width: (Platform.OS === "ios" ) ?  360 : 340, 
      height: 420, 
      borderRadius: 30, 
      alignSelf: "center",
  },
  });