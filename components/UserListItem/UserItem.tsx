import React, { useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import styles from "./styles";
import { FontAwesome5 } from '@expo/vector-icons'; 
import moment from "moment";
import manPhoto from "../../assets/images/manPhoto.png"
import { S3Image } from "aws-amplify-react-native"
import { DataStore } from "aws-amplify";
import { User } from "../../src/models";




export default function UserItem ({user, onPress, isSelected, isAdmin = false, onLongPress}) { // null | false | true
  
  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    };
    //if lastOnline less than 5 minutes ago, show him as online
    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 1 * 60 * 1000) {
      //less than 5 minutes
      return "online";
    } else {
      return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  const colors = ["#E4B699", "#FFBF2A", "#EE98AE", "#D2D6D6", "#6DBDCF", "#F5C2C3", "#5FDDF6", "#D3C5BC"]

  const randomColor = colors[Math.floor(Math.random()*colors.length-1)];


      // const userColor = async () => {
      //     if(!user?.color) {
      //       await DataStore.save(User.copyOf(user, (updated) => {
      //         updated.color = randomColor
      //       }))
      //     }
      // }

      //  useEffect(() => {
      //    console.log("user color", user?.color)
      //   userColor();
      //  },[])

      

     return (
        <View> 

       <Pressable onPress={onPress} style={styles.container}
         onLongPress={onLongPress}>
           {user?.imageUri && (<S3Image
        imgKey={user?.imageUri}
        style={styles.image}
        resizeMode="cover" />)} 

        {!user?.imageUri && <View style={{
          backgroundColor: user?.color, 
          paddingTop: 20,
          paddingBottom: 20, 
          padding: 25, 
          marginRight: 10, 
          borderRadius: 25,
        }}>
          <Text style={styles.noImageText}>
            {user?.name[0]}
          </Text>
          </View>}

  
         <View style={styles.rightContainer}>
           <View>
              <View style={styles.admin}>
                 <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                 {isAdmin && <Text numberOfLines={1} style={styles.adminText}> Admin </Text>}
              </View>
           </View>
        <Text numberOfLines={2} style={styles.textStatus}>{user?.status}</Text>
        
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
       

    
       
    );
}

