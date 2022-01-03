import React, { useEffect, useRef, useState } from "react";
import {View, Text, Pressable, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView, TouchableHighlight, Animated, BackHandler, ActivityIndicatorBase, ActivityIndicator} from "react-native";
import { Entypo, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import { useFonts } from "expo-font";
import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import {useNavigation,} from "@react-navigation/core";
import { User } from "../src/models";
import { S3Image } from "aws-amplify-react-native"
import ProfileHeader from "../navigation/ProfileHeader/ProfileHeader";
import Users from "../assets/dummy-data/Users"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FadeLoading } from 'react-native-fade-loading';
import { TabBar, TabBarIndicator } from "react-native-tab-view";
import { FlatList } from "react-native-gesture-handler";
import { navItem } from "aws-amplify";

const Tab = createMaterialTopTabNavigator();


const renderTabBar = (props) =>  { 
    console.log("Props", props)
    return (
    <TabBar
      {...props}
      tabStyle={{alignSelf: "center",}}
      labelStyle={{color: "black", textTransform: "none", fontSize: 20, fontWeight: "600",}}
      indicatorStyle={{
        minWidth: 130,
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor:"white",
        zIndex: 0,
      }}
        style={{
          backgroundColor: "#EFF3F5", marginTop: 5, margin: 20, elevation: 0,
          marginBottom: 2,
          shadowOffset: {
            width: 0, height: 0 // for iOS
        },
        }}
        pressColor='transparent'
      
    />
  );}
function Posts () {

    // 
    const dummyImages = Users


    

    if(!dummyImages) {
        return (
        <>
       
        <View style={{flexDirection: "row"}}>
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
       
        {/* <ActivityIndicator/> */}
        </View>
        <View style={{flexDirection: "row"}}>
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
       
        {/* <ActivityIndicator/> */}
        </View>
        <View style={{flexDirection: "row"}}>
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
        <FadeLoading primaryColor="gray" secondaryColor="lightgray" duration={2000} style={styles.fadeLoading} visible={true} animated={true} children={dummyImages} />
       
        {/* <ActivityIndicator/> */}
        </View>

        </>)
    }

    const animatedButtonScale =  new Animated.Value(1);

// When button is pressed in, animate the scale to 1.5
const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
        toValue: 1.1,
        useNativeDriver: true,
    }).start();
};

// When button is pressed out, animate the scale back to 1
const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
        toValue: 1,
        useNativeDriver: true,
    }).start();
};

// The animated style for scaling the button within the Animated.View
const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}]
};

    const NavigateToPost = ({item}) => {

    }

    const renderItem = ({item, index}) => 
    
    <TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
        
        <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item.imageUri}}/>

    </TouchableHighlight>


    return (
        <View style={dummyImages ?{alignItems: "center", } : {alignItems: "center", marginTop: 30, }}>   
           
              {!dummyImages && <View>
               <View>
           <View style={{position: "absolute", paddingLeft: 75, marginTop: -5, zIndex: 1,}}>

               <View style={{backgroundColor: "#ECF0F3", padding: 1.5}}>
               <MaterialIcons name="add-to-photos" size={24} color="black" />
               </View>

               </View>

                <View style={{borderWidth: 2, padding: 15, paddingRight: 21, paddingLeft: 18, borderRadius: 10,borderColor: "#454B5E", marginBottom: 21,}}>
                <Entypo name="folder-images" size={45} color="#90A8B2" />
                </View>
                </View>

                
                <View style={{alignItems: "center"}}>
                <Text style={styles.userNameText}>Your photos and videos</Text>
                <Text style={styles.noContent}>Here will appear the photos and videos that you might want to share </Text>
                </View> 

                </View>}

                {dummyImages && <View>
                    <FlatList 
                    data={dummyImages} 
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(item, index) => item.id}
                    />
                        
                    
                </View>}
                
            </View>

    )
}

function Favorite () {
 
    return (

        <View style={{alignItems: "center", marginTop: 30, }}>   
           
               
               <View>
           <View style={{position: "absolute", paddingLeft: 75, marginTop: -5, zIndex: 1,}}>


               <View style={{backgroundColor: "#ECF0F3", padding: 1.5}}>
               <MaterialIcons name="add-to-photos" size={24} color="black" />
               </View>
               </View>

                <View style={{borderWidth: 2, padding: 15, paddingRight: 29,paddingLeft: 29, borderRadius: 10,borderColor: "#454B5E", marginBottom: 20,}}>
                <Fontisto name="favorite" size={45} color="#90A8B2" />
                </View>
                </View>

                
                <View style={{alignItems: "center"}}>
                <Text style={styles.userNameText}>Your favorite posts</Text>
                <Text style={{color: "#90A8B2",
                fontWeight: "700",
                alignSelf: "center",
                fontSize: 15,
                paddingRight: 12,
                paddingLeft: 12,
                marginRight: 20,
                marginLeft: 20,
                textAlign: "center"
                }}>Here will appear the photos and videos that you added to favorite </Text>
                </View> 
                
            </View>
    )
}




const Profile = () => {

    

    const [user, setUser] = useState <User|null> (null) 
    const [editMode, setEditMode] = useState (false)
    const [showNameEdit, setShowNameEdit] = useState(false);
    const [showUserNameEdit, setShowUserNameEdit] = useState(false);
    const [showProfilePhotoEdit, setShowProfilePhoto] = useState(false);
    const [showUserBioEdit, setShowUserBioEdit] = useState(false);
    const [showFavorite, setShowFavorite] = useState(false)
    

        
    
        const translation = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0
  
        // React.useEffect(() => {
        //   Animated.timing(
        //     fadeAnim,
        //     {
        //       toValue: 1,
        //       duration: 100,
        //     }
        //   ).start();
        // }, [fadeAnim])
    
            const onFavoriteClick = () => {
                    Animated.timing( translation, {
                        toValue: -150,
                        useNativeDriver: true,
                        duration: 1,
                    }).start();
                    setShowFavorite(true);
            }

            const onPostsClick = () => {
                Animated.timing( translation, {
                    toValue: 150,
                    useNativeDriver: true,
                }).start();
                setShowFavorite(false);
            }
            

    
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const user = await DataStore.query(User, userData.attributes.sub);
      if(user) {
        setUser(user);
      }
    }
     
      useEffect(() => {
        console.log("user image ",user?.imageUri)
        fetchUser()
        const subscription = DataStore.observe(User).subscribe(
          () => fetchUser())
        return () => subscription.unsubscribe();
    
        
      }, []);
      
        const navigation = useNavigation()
        const editProfile = () => { 
        navigation.navigate("EditProfile")
     }


    const screenOptions = {
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "#ECF0F3", borderWidth: 1, borderColor: "rgba(0,0,0, 0.1)", paddingTop: 10, paddingBottom: 10, elevation: 0,},
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarIndicatorStyle: {backgroundColor: "#705AD0", marginBottom: -1.5},
        
    }


    
    

    const [loaded] = useFonts({
        NewueHaas: require("../assets/fonts/NeueHaasDisplay-Mediu.ttf"),
        Favorit: require("../assets/fonts/Favorit.ttf")
        
      });

      const onEdit = () => {
          setEditMode(prev => !prev)
      }

      const toUserNameEdit = () => {
        if(editMode) {
          setShowUserNameEdit(prev => !prev);
        }
    }

    const toProfilePhotoEdit = () => {
        if(editMode) {
          setShowProfilePhoto(prev => !prev);
        }
    }


      const toNameEdit = () => {
          if(editMode) {
            setShowNameEdit(prev => !prev);
          }
      }
      const toUserBioEdit = () => {
        if(editMode) {
          setShowUserBioEdit(prev => !prev);
        }
    }



    

      


    if(!loaded) {return null}
      
    return (
        <>
        
        <ProfileHeader/>
        <View style={styles.page}>
        
            {/* //Profile photo and followers*/}
            <View style={styles.profileInfo}>
           
            <View>
                <Text style={styles.H1Text}>321K
                </Text>

                <Text style={styles.H2Text}>
                    followers
                </Text>
            </View>

            <Pressable onPress={toProfilePhotoEdit}>
            {user?.imageUri !== "image has been deleted" && <S3Image 
            imgKey={user?.imageUri} 
            style={styles.profileImage}/>}
                
          {!user?.imageUri && <View style={[styles.noImage, {backgroundColor: user?.color,} ]}>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}
                
            </Pressable>

            <View>
                <Text style={styles.H1Text}>
                    125
                </Text>
                <Text style={styles.H2Text}>
                    following
                </Text>
            </View>

            </View>




            {/* //Username and bio*/}
            <View style={styles.userNameAndBio}>

            <Pressable onPress={toNameEdit} style={{flexDirection: "row",}}>
            <Text  style={styles.userNameText}>{user?.name}</Text>
            {editMode && <MaterialCommunityIcons name="tooltip-edit" size={30} color="#FF034F" style={{paddingBottom: -3, paddingLeft: 10, paddingRight: -15,}} />}
            </Pressable>

            <Pressable onPress={toUserBioEdit} style={{flexDirection: "row",}}>
            <Text style={styles.H2Text}>{user?.status}</Text>
            {editMode && <MaterialCommunityIcons name="tooltip-edit" size={30} color="#FF034F" style={{paddingBottom: -3, paddingLeft: 10, paddingRight: -15,}} />}
            </Pressable>
            </View>
            
            

            {/* //Buttons below username*/}
            <View style={styles.followMessageBothView}>

             <Pressable onPress={editProfile} style={editMode ? styles.followViewEditMode : styles.followView}>
                {!editMode && <Text style={styles.followText}>Edit Profile</Text>}
                {editMode && <View style={{flexDirection: "row", alignSelf: "center",}}>
                <Text style={styles.followText}>Close edit mode</Text>
                <MaterialCommunityIcons name="close" size={25} color="#FAFAFA" style={{marginBottom: -3, marginLeft: 10, marginRight: -15}}/>
                </View>}
             </Pressable>

             

            </View>

            {/* //Posts and favorite*/}
            {/* <View style={Platform.OS === "ios" ? styles.postsAndFavoriteView : styles.postsAndFavoriteAndroid}>

            <TouchableHighlight underlayColor={"rgba(0,0,0, 0.1)"} onPress={() => onPostsClick()}>
            <View style={styles.posts}> 
            <Entypo name="folder-images" size={24} color={showFavorite ?"#90A8B2" : "#705AD0"} style={{alignSelf: "center"}} />
            </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={"rgba(0,0,0, 0.1)"} onPress={() =>  onFavoriteClick()}>
            <View style={styles.favorite}>
            <Fontisto name="favorite" size={24} color={!showFavorite ?"#90A8B2" : "#705AD0"} style={{alignSelf: "center"}}/>
            </View>
            </TouchableHighlight>


            </View> */}
            
        
      <Tab.Navigator  sceneContainerStyle={{elevation: 0, backgroundColor:"#ECF0F3" }} screenOptions={screenOptions} 
        
        style={{paddingTop: 15, marginRight: -30, marginLeft: -30,}}>
      <Tab.Screen  name="Posts" component={Posts} options={{tabBarIcon:({focused}) => (
        <View>
          <Entypo name="folder-images" size={24} color="#4A4D55"  />
        </View>
      )}} />

      <Tab.Screen name="Settings" component={Favorite} 
       options={{tabBarIcon:({focused}) => (
        <View>
          <Fontisto name="favorite" size={24}  color="#4A4D55"/>
        </View>
      )}} />

       </Tab.Navigator>
            
            {/* //Posts */}

            
            {/* {showFavorite && <View style={{alignItems: "center", marginTop: 30, }}>   
           
               
               <View>
           <View style={{position: "absolute", paddingLeft: 75, marginTop: -5, zIndex: 1,}}>

               <TouchableHighlight underlayColor={"rgba(0,0,0, 1)"} onPress={() => {}}>
               <View style={{backgroundColor: "#ECF0F3", padding: 1.5}}>
               <MaterialIcons name="add-to-photos" size={24} color="black" />
               </View>
               </TouchableHighlight>
               </View>

                <View style={{borderWidth: 2, padding: 15, paddingRight: 29,paddingLeft: 29, borderRadius: 10,borderColor: "#454B5E", marginBottom: 20,}}>
                <Fontisto name="favorite" size={45} color="#90A8B2" />
                </View>
                </View>

                
                <View style={{alignItems: "center"}}>
                <Text style={styles.userNameText}>Your favorite posts</Text>
                <Text style={{color: "#90A8B2",
                fontWeight: "700",
                alignSelf: "center",
                fontSize: 15,
                marginRight: 20,
                marginLeft: 20,
                textAlign: "center"
                }}>Here will appear the photos and videos that you added to favorite </Text>
                </View> 
                
            </View>} */}

            
           {/* {!showFavorite && 
           <Animated.View style={{  transform: [{translateX: translation}]}}>
           <View style={{alignItems: "flex-start", marginTop: 30, }}>   
           
               
               <View>
           <View style={{position: "absolute", paddingLeft: 75, marginTop: -5, zIndex: 1,}}>

               <TouchableHighlight underlayColor={"rgba(0,0,0, 1)"} onPress={() => animation()}>
               <View style={{backgroundColor: "#ECF0F3", padding: 1.5}}>
               <MaterialIcons name="add-to-photos" size={24} color="black" />
               </View>
               </TouchableHighlight>
               </View>

                <View style={{borderWidth: 2, padding: 15, paddingRight: 21, paddingLeft: 18, borderRadius: 10,borderColor: "#454B5E", marginBottom: 21,}}>
                <Entypo name="folder-images" size={45} color="#90A8B2" />
                </View>
                </View>

                
                <View style={{alignItems: "center"}}>
                <Text style={styles.userNameText}>Your photos and videos</Text>
                <Text style={{color: "#90A8B2",
                fontWeight: "700",
                alignSelf: "center",
                fontSize: 15,
                marginRight: 20,
                marginLeft: 20,
                textAlign: "center"
                }}>Here will appear the photos and videos that you might want to share </Text>
                </View> 
                
            </View>
            
            </Animated.View>} */}
        
        </View>
        </>
    )
}




const styles = StyleSheet.create({
page:{
    borderRadius: 30,
    paddingTop: -15,
    padding: 15,
    flex: 1,
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
    paddingTop: 10,
    paddingBottom: 15,
    padding: 50,
},

noImage: {
    paddingTop: 10,
    paddingBottom: 10, 
    padding: 28,  
    borderTopLeftRadius: (Platform.OS === "ios") ? 45 : 35,
    borderTopRightRadius: (Platform.OS === "ios") ? 45 : 35,
    borderBottomLeftRadius: (Platform.OS === "ios") ? 45 : 35,
    borderBottomRightRadius: (Platform.OS === "ios") ? 45 : 35,
        
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

followViewEditMode:{
    backgroundColor: "#FF034F", 
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
    borderColor:"rgba(161,181,190, .5)",
},

favorite:{
    borderWidth: .7, 
    borderLeftWidth: .1, 
    minWidth:220, maxWidth:220, 
    paddingTop: 20, 
    paddingBottom: 20, 
    borderColor:"rgba(161,181,190, .5)",
},

noContent: {
    color: "#90A8B2",
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 15,
    marginRight: 20,
    marginLeft: 20,
    paddingRight: 12,
    paddingLeft: 12,
    textAlign: "center"
},

fadeLoading: {
    width: (Platform.OS === "ios") ? 145 : 140, 
    height: 145, 
    borderBottomLeftRadius:5, 
    borderBottomRightRadius: 5, 
    marginRight: 2, 
    marginBottom: 2,
},



})

export default Profile;