import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Pressable, Image, Platform, TextInput, KeyboardAvoidingView} from "react-native";
import CommentsHeader from "../../navigation/CommentsHeader/CommentsHeader";
import Users from "../../assets/dummy-data/Users"
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";



export default function CommentsScreen({}) {
const [dummyComments, setDummyComments] = useState(Users);
const [ohtersReplies, setOthersReplies] = useState(false);
const [like, setLike] = useState(false);
const [user, setUser] = useState <User|null> (null) 


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



const renderItem = ({item, index}) => {

    const onPress = () => {

    }

    const onLongPress = () => {

    }
    return (
        <View> 

       <Pressable onPress={onPress} style={styles.container}
         onLongPress={onLongPress}>
           {item.imageUri && (<Image
        source={{uri:item.imageUri}}
        style={styles.image}
        resizeMode="cover" />)} 

        {!item.imageUri && <View style={{
          backgroundColor: "red", 
          paddingTop: 20,
          paddingBottom: 20, 
          padding: 25, 
          marginRight: 10, 
          borderRadius: 25,
        }}>
            
            <Text style={styles.noImageText}>
            {item.name[0]}
          </Text>
          </View>}


        
  
         <View style={styles.rightContainer}>
              <View style={styles.admin}>
                 <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                 <Text>52m ago</Text>
           </View>
        
        <View>
        <Text style={styles.textStatus}>
            {"hello there this is just a test and nothing else but if there are a lot of things to talk about then there is no problem"}
        </Text>


        
        </View>
        

        
        <View style={styles.reactionsView}>
          <Text style={{marginRight: 3, color: "#FF034F", fontWeight: "600", }} >
              {"Agreed"}
          </Text>
          <Text style={{marginRight: 20, color: "#FF034F", fontWeight: "600",}}>
              {"5"}
          </Text>
          <Text style={{color: "#FF034F", fontWeight: "600", marginRight: 3,}} >
              {"Reply"}
          </Text>

          <Pressable onPress={() => setLike(current => !current)} style={{transform: (Platform.OS === "ios" ? [{translateX: 160,}] : [{translateX: 145,}]), padding: 10,}}>
        <AntDesign 
         
        name={like ? "like1" : "like2" } 
        size={24} 
        color={like ? "#FF034F" : "black"} 
        />
        </Pressable>
        </View>

        
        
        <Pressable onPress={() => setOthersReplies(prev => !prev)} style={{ 
            paddingTop: 10, 
            paddingBottom: 20, 
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",            
             }}>
        <Text >{"See others replies"}</Text>
        <MaterialIcons 
         
        name={ohtersReplies ? "keyboard-arrow-down" : "keyboard-arrow-up"} 
        size={20} 
        color="black" />
        </Pressable>

    




        {/* // Replies */}
             {ohtersReplies && <View>
             <Pressable onPress={onPress} style={styles.replies}
         onLongPress={onLongPress}>
           {item.imageUri && (<Image
        source={{uri:item.imageUri}}
        style={styles.image}
        resizeMode="cover" />)} 

        {!item.imageUri && <View style={{
          backgroundColor: "red", 
          paddingTop: 20,
          paddingBottom: 20, 
          padding: 25, 
          marginRight: 10, 
          borderRadius: 25,
        }}>
            
            <Text style={styles.noImageText}>
            {item.name[0]}
          </Text>
          </View>}

  
         <View style={styles.rightContainer}>
              <View style={styles.admin}>
                 <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                 <Text>52m ago</Text>
           </View>
        <Text style={styles.textStatus2}>
            {"hello there this is just a test and nothing else but if there are a lot of things to talk about then there is no problem"}
        </Text>
        
        <View style={styles.reactionsView}>
          <Text style={{marginRight: 3, color: "#FF034F", fontWeight: "600", }} >
              {"Agreed"}
          </Text>
          <Text style={{marginRight: 20, color: "#FF034F", fontWeight: "600",}}>
              {"5"}
            </Text>
          <Text style={{color: "#FF034F", fontWeight: "600", marginRight: 3,}} >
              {"Reply"}
          </Text>
        </View>
        </View>
        </Pressable>
             </View>}
      </View>
       {/* {isSelected !==  undefined &&(
      <FontAwesome5 
          name={isSelected ?  "check-circle" : "circle" } 
         size={24} 
         color={isSelected ? "#3D4785" : "black"} 
         />
         )} */}
         

        </Pressable>
        </View>
    )
}

    const CommnetsTextInput = () => {

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}>
            <View style={{
            padding: 20, 
            backgroundColor: "White",
            flexDirection: "row",
            alignItems: "center",

            }}>
                
                <Pressable >
           {user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.image}
        resizeMode="cover" />)} 

        {!user?.imageUri && <View style={{
          backgroundColor: user?.color, 
          minHeight: 60,
          maxHeight: 60,
          minWidth: 60,
          maxWidth: 60,
          marginLeft: -10, 
          borderRadius: 25,
        }}>
            
            <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}

        </Pressable>
        
            <View style={{
            backgroundColor: "white", 
            width: 310, 
            height: 40,
            borderRadius: 15,
            marginLeft: 10,
            borderWidth: 1,
            borderColor: "#90A8B2",
            
            
            }}>
                
            <TextInput 
             placeholder="Type your comment..."
             style={{marginLeft: 10,transform: (Platform.OS === "ios" ? [{translateY: 10,}] : [{translateY: 4,}])}}
            />

            <MaterialCommunityIcons style={{
            alignSelf: "flex-end", 
            transform: (Platform.OS === "ios" ?  [{translateY: -9,}] : [{translateY: -20,}]),
            marginRight: 10,
            }} 
             name="comment-arrow-left" 
             size={24} 
             color="#90A8B2" />
            </View>
    </View>
    </KeyboardAvoidingView>
        )
    }
    return (
        <>
        <CommentsHeader/>
        <View style={styles.page}>
            <View style={{marginBottom: 10,}}>
            <FlatList 
             data={dummyComments}
             renderItem={renderItem}
            />
            </View>
        </View>

        
        <CommnetsTextInput/>
        </>
    )
}



const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#ECF0F3",
        borderRadius: 30,

    },
    container: {
      flexDirection: "row",
      paddingTop: 15,
      paddingRight: 5,
      paddingLeft: 5,
      zIndex: 0,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
    },

    container2: {
        flexDirection: "row",
        paddingTop: 15,
        paddingRight: 5,
        paddingLeft: 5,
        zIndex: 0,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,
      },

    image: {
      height: 40,
      width: 40,
      borderRadius: 15,
      marginRight: 10,
    },

    noImage: {
      backgroundColor: "red", 
      minWidth: 20,
      maxWidth: 20,
      minHeight: 30,
      maxHeight: 30,
      marginRight: 10, 
      borderRadius: 20,
    },

    noImageText: {
      fontSize: 30,
      fontWeight: "bold", 
      color: "#FAFAFA", 
      minWidth: 25, 
      maxWidth: 25,
      textAlign: "center",
      alignSelf: "center",
      transform: (Platform.OS === "ios" ? [{translateY: 10}] : [{translateY: 6}])
    },
  

    row:{
      flexDirection:"row",
      justifyContent: "space-between",
    },


    rightContainer: {
      justifyContent: "center",
    },
    name:{
      fontSize: 15,
      fontWeight: "bold",
      marginRight: 10,
    },
    nameAndTimeView:{
      flexDirection:"row",
      justifyContent: "space-between",
    },
    
    reactionsText: {
      color: "#8E8E8E",
      fontSize: 15,
    },

    textStatus: {
      marginTop: 3,
      marginBottom: 5,
      color: "#4A4D55",
      fontSize: 14,
      fontWeight: "600",
      textAlign: "left",
      marginRight: 80,
      
    },

    textStatus2: {
        marginTop: 3,
        marginBottom: 5,
        color: "#4A4D55",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "left",
        
        
      },

    admin:{
        flexDirection: "row",
    },
    reactionsView:{
        flexDirection: "row",
        

    },

    replies: {
      flexDirection: "row",
      marginBottom: 20,
      marginRight: 20,
      maxWidth: 270
    },
  });
