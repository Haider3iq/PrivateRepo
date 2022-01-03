import React, { useEffect, useRef, useState } from "react";
import {View, Text, Pressable, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView, TouchableHighlight, Animated, BackHandler, ActivityIndicatorBase, ActivityIndicator} from "react-native";
import { Entypo, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import { useFonts } from "expo-font";
import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import {useNavigation,} from "@react-navigation/core";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native"
import ProfileHeader from "../../navigation/ProfileHeader/ProfileHeader";
import Users from "../../assets/dummy-data/Users"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FadeLoading } from 'react-native-fade-loading';
import { TabBarIndicator } from "react-native-tab-view";
import { FlatList } from "react-native-gesture-handler";
import { navItem } from "aws-amplify";

const Tab = createMaterialTopTabNavigator();

const ProfileCopy = () => {

    

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
      
    //     const navigation = useNavigation()
    //     const editProfile = () => { 
    //     navigation.navigate("EditProfile")
    //  }

    const dummyImages = Users
    const dummyImages2 = Users.map(images => images.imageUri)



const animatedButtonScale = new Animated.Value(1);

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


    const [firstTab, setFirstTab] = useState (false)
    const [secondTab, setSecondTab] = useState (false)
    const [thirdTab, setThirdTab] = useState (false)
    
    
    const animatedTab = useRef(new Animated.Value(Platform.OS === "ios" ? -125 : -120)).current;
    
    const animatedSecondTab = useRef(new Animated.Value(400)).current
    const animatedThirdTab = useRef(new Animated.Value(400)).current
    const animatedFirstTab = useRef(new Animated.Value(0)).current

    const onFirstTabPress = () => {
       
            Animated.timing(animatedTab, {
                toValue: (Platform.OS === "ios" ? -125 : -120),
                duration: 150,
                useNativeDriver: true,
            },).start();


            Animated.timing(animatedSecondTab, {
                toValue: 400,
                duration: 150,
                useNativeDriver: true,
                 }).start();
            Animated.timing(animatedFirstTab,{
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
            Animated.timing(animatedThirdTab,{
                toValue: 400,
                duration: 150,
                useNativeDriver: true,

            }).start();
            
            console.log("secondTab animation", animatedSecondTab)
            setSecondTab(false);
            setThirdTab(false);
    }

    const onSecondTabPress = () => {

        Animated.timing(animatedTab, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();
        setSecondTab(true);
        setThirdTab(false);

        Animated.timing(animatedFirstTab,{
            toValue: -400,
            duration: 150,
            useNativeDriver: true,
        }).start();

        Animated.timing(animatedSecondTab, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();

        Animated.timing(animatedThirdTab, {
            toValue: 400,
            duration: 150,
            useNativeDriver: true,
        }).start();

}

    const onThirdTabPress = () => {

            Animated.timing(animatedTab, {
                toValue: (Platform.OS === "ios" ? 125 : 120),
                duration: 250,
                useNativeDriver: true,
            }).start();
            setSecondTab(false);
            setThirdTab(true)
            console.log("Second tab", secondTab)
    }
 
    const MovingBackGroundColor = () => { return (
        <Animated.View style={[styles.tabs, {position: "absolute", zIndex: 0, marginTop: 5, backgroundColor: "white", transform: [{translateX
        :animatedTab}]}]}>

        </Animated.View>
    )

    }

    const renderItemTest = ({item, index}) => 
    <>
     {/* <Animated.View style={{transform: [{translateX: animatedFirstTab}]}}>
     <TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
        
        <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item.imageUri}}/>
    </TouchableHighlight>
    </Animated.View> */}


    <Animated.View >

    <TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
        
        <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item.imageUri}}/>
    </TouchableHighlight>
     
    </Animated.View>
    </>

const renderItemTest2 = ({item, index}) => 
<>
 <Animated.View >
 <TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
    
    <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item}}/>
</TouchableHighlight>
</Animated.View>


{/* <Animated.View >

<TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
    
    <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item.imageUri}}/>
</TouchableHighlight>
 
</Animated.View> */}
</>


        const FlatListHeader = () => (<>
            
        
        {/* //Profile photo and followers*/}
        <View style={styles.profileInfo}>
       
        <View>
            <Text style={styles.H1Text}>321K
            </Text>

            <Text style={styles.H2Text}>
                followers
            </Text>
        </View>

        <Pressable >
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

        <Pressable style={{flexDirection: "row",}}>
        <Text  style={styles.userNameText}>{user?.name}</Text>
        </Pressable>

        <Pressable  style={{flexDirection: "row",}}>
        <Text style={styles.H2Text}>{user?.status}</Text>
        </Pressable>
        </View>
        
        

        {/* //Buttons below username*/}
        <View style={styles.followMessageBothView}>

         <Pressable  style={styles.followView}>
             <Text style={styles.followText}>Edit Profile</Text>
         </Pressable>


          
        </View>



        <View style={{marginTop: 20, flexDirection: "row", backgroundColor: "#90A8B2", 
        paddingTop: 5, 
        paddingBottom: 5,
        borderRadius: 10, 
        justifyContent: "center", 
        marginBottom: 20,
        paddingRight:0,
        paddingLeft: 0,
        
        }}>
            <MovingBackGroundColor/>
             <Pressable onPress={onFirstTabPress}>
             <View style={styles.tabs}>
                 <Text style={styles.tabsText}>Photos</Text>
             </View>
             </Pressable>

                <Pressable onPress={onSecondTabPress} >
             <View style={styles.tabs}>
                 <Text style={styles.tabsText}>Shorts</Text>
             </View>
             </Pressable>

             <Pressable onPress={onThirdTabPress}>
             <Animated.View style={[styles.tabs, {marginRight: 0, backgroundColor: "rgba(255, 255, 255, animatedTab)"}]}>
                 <Text style={styles.tabsText}>Games</Text>
             </Animated.View>
             </Pressable>
            </View>

            <Animated.View style={{transform: [{translateX: animatedSecondTab}]}}>
            <FlatList data={dummyImages} 
            renderItem={renderItemTest}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id} />
          </Animated.View>

          

        </>)





const renderItem = () => 
    <>
     {/* <Animated.View style={{transform: [{translateX: animatedFirstTab}]}}>
     <TouchableHighlight onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={"rgba(0, 0, 0, 0.8)"} onPress={() => {}} style={{paddingRight: -20, paddingLeft: -20,}}>
        
        <Animated.Image key={index} style={[{width: (Platform.OS === "ios") ? 137 : 131, height: 145, borderBottomLeftRadius:5, borderBottomRightRadius: 5, marginRight: 1, marginBottom: 2, }, animatedScaleStyle]} source={{uri:item.imageUri}}/>
    </TouchableHighlight>
    </Animated.View> */}
        <View></View>

    {/* <Animated.View style={{transform: [{translateX: animatedSecondTab}]}}>

        <FlatList 
        data={dummyImages} 
        numColumns={3}
        renderItem={ ({item,}) =>
        <View> 
            <Text>
            {item.name}
            </Text>
        </View>
        }
        keyExtractor={(item, index) => item.id}/>
     
    </Animated.View> */}
    </>

    useEffect(() => {
        console.log("first taba", firstTab, "second tab", secondTab, "thirdTab", thirdTab);
        console.log("animated second tab", animatedSecondTab)
    },[])
      
    return (
        <>
        
        <ProfileHeader/>
        <View style={styles.page}>
            <FlatList data={dummyImages} 
            renderItem={renderItem}
            numColumns={6}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id} 
            ListHeaderComponent={FlatListHeader}/>
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
    transform: [{translateX: 0,}]
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


followText:{
    alignSelf: "center", 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#FAFAFA",
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

tabs: {
        justifyContent: "center",
        alignItems: "center", 
        minWidth: (Platform.OS === "ios") ? 119 : 112,
        maxWidth: (Platform.OS === "ios") ? 119 : 112,
        minHeight: 55,
        maxHeight: 55,
        borderRadius: 10,
        marginRight: 7,
        zIndex: 1,
    
},

tabsText: {
    fontSize:  18 , 
    fontWeight: "600",
    textTransform: 'uppercase'
},



})

export default ProfileCopy;