import * as React from 'react';
import { StyleSheet, SafeAreaView, Platform, BackHandler } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native';
import Users from "../assets/dummy-data/Users"
import PostsHeader from '../navigation/PostsHeader/PostsHeader';
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function PostsScreen() {

  const dummyPosts = Users

  const renderItem = ({item, index}) => (
  <View>

    <View style={{marginBottom: 10, marginTop: 20, paddingRight: 20, 
    paddingLeft: 20, flexDirection: "row", alignItems: "center",}}>
      <Image key={index} style={{width: 50, height: 50, borderRadius: 18, alignSelf: "center", marginRight: 10,}} source={{uri:item.imageUri}}/>
    <Text >{item.name}</Text>
    </View>
    
   
    <BlurView tint="light" intensity={Platform.OS === "ios" ? 70 : 100} style={styles.blurView}>
      <View style={styles.postActivites}>
      <EvilIcons name="heart" size={50} color="black" />
      <Text>500</Text>
      </View>
    
     <View style={styles.postActivites}>
     <EvilIcons name="comment" size={50} color="black" />
     <Text>700k</Text>
     </View>
    <EvilIcons name="share-google" size={50} color="black" />
    </BlurView>

   {Platform.OS === "ios" && <View style={styles.iosShadow}>
    </View>}
    
    <View style={{flexDirection: "row", marginBottom: 20, marginTop:(Platform.OS === "ios")? 15 : 10, paddingRight: 20, paddingLeft: 20,}}>

      <Text style={{fontWeight: "700"}}>{item.name}  </Text>
    <Text style={{color: "#4A4D55"}}>{item.status}</Text>
    </View>
    
  </View>)

  return (
    <>
    <PostsHeader/>
    <View style={styles.container}>
      
      
      <FlatList 
      data={dummyPosts} 
      renderItem={renderItem}     
      keyExtractor={(item, index) => item.id} 
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    flex: 1,
    paddingTop: 100,
    marginBottom: -100,
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
    width: 380, 
    height: 500, 
    borderRadius: 30, 
    alignSelf: "center"
  },
});
