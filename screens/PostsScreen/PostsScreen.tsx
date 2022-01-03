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
import { updateLocale } from 'moment';
import PostsItem from './PostItem';

export default function PostsScreen() {
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [onHeartHover, setOnHeartHover] = React.useState(false)
  const [postHasLike, setPostHasLike] = React.useState(false)
  const [dummyPosts, setDummyPosts] = React.useState(Users);
  const [isRender, setIsRender] = React.useState(false)
  const [flatListItem, setFlatlistItem] = React.useState()

  

 

  
  React.useEffect(() => {
    console.log("item like status", dummyPosts.map(like => like.like))
  },[])

  


  const renderItem2 = ({item}) => 
  <View style={{marginRight: 5,}}>
    <Image source={{uri: item.imageUri}} style={{width: 120, height: 190, borderRadius: 10,}}/>
    <View style={{
      width: 120, 
      height: 190, 
      borderRadius: 10, 
      position: "absolute", 
      backgroundColor: "rgba(0,0,0,0.3)", 
      justifyContent: 'flex-end', 
  }}>
      <Text style={{color: "white", marginLeft: 7,}}>
        Video Title
      </Text>
      <Text style={{color: "white", marginLeft: 7, marginBottom: 5, fontSize: 10,}}>
        100K views
      </Text>
    </View>
  </View>


  const flatlistheader = () => <View style={{ paddingTop: 10, paddingRight: 10, marginLeft: (Platform.OS === "ios") ? 30 : 30, marginRight: 10,}}>
    <FlatList data={dummyPosts} 
    horizontal 
    renderItem={renderItem2}/>
  </View>
  



  const renderItem = ({item, index}) => { 
   
    return (
    <PostsItem 
    dummyPosts={dummyPosts} 
    setDummyPosts={setDummyPosts} 
    index={index} isReder={isRender} 
    setIsRender={setIsRender} 
    post={item}  
    setShowModal={setShowModal}
    />
  )
}

 

  return (
    <>
    {showModal && <PostsModal showModal={showModal} setShowModal={setShowModal}/>}
    <PostsHeader/>
    {!dummyPosts && <View style={styles.container}>

      <View style={{flexDirection: "row",  marginLeft: (Platform.OS === "ios") ? 30 : 10, marginTop: 10,}}>
      <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={{width: 120, height: 190, borderRadius: 10, marginRight: 5,}} visible={true} animated={true} children={dummyPosts} />
      <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={{width: 120, height: 190, borderRadius: 10, marginRight: 5,}} visible={true} animated={true} children={dummyPosts} />
      <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={{width: 120, height: 190, borderRadius: 10, marginRight: 5,}} visible={true} animated={true} children={dummyPosts} />
      </View>
      <View style={{paddingTop: 20,}}>

        <View style={styles.postOwnerContainerLoading}>
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.postProfileImage} visible={true} animated={true} children={dummyPosts} />

      <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={{ width: 270, height: 30}} visible={true} animated={true} children={dummyPosts} />
        </View>
      

    <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyPosts} />
    </View>
     </View>}
    
    {dummyPosts && <View style={styles.container}>
      

      
      <FlatList 
      data={dummyPosts} 
      ListHeaderComponent={flatlistheader}
      renderItem={renderItem}     
      keyExtractor={(item, index) => item.id} 
      extraData={isRender}
      />
    </View>}
    </>
  );
}

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
