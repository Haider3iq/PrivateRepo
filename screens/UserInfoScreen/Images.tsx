import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons";
import {View, Text, StyleSheet, Image, ImageBackground, Pressable, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/core";
import {Message, User,} from "../../src/models";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { FlatList } from "react-native-gesture-handler";
import { S3Image } from "aws-amplify-react-native"
import Users from "../../assets/dummy-data/Users";
import {Dimensions} from 'react-native'




const Images = () => {
    const [ media, setMedia ] = useState<any>(null);
    const [images, setImages] = useState (Users);
    
    
    const { width, height } = Dimensions.get('window')

    useEffect(() => {
        
        const fetchImages = async () => {
            const images = (await DataStore.query(Message, media => media.chatroomID("eq", chatRoom.id), {sort: media => media.createdAt(SortDirection.DESCENDING)},)).map((media) => media.image)
                console.log("images",images)
                setMedia(images) 
        }

        fetchImages();
        console.log("Media 2", media)
        
    }, [])
   

    
const navigation = useNavigation()
const route = useRoute();

const goBack = () => {
    navigation.goBack();
}


const user = route?.params?.user;
const chatRoom = route?.params?.chatRoom;




const renderItem = ({item,}) => (
    <S3Image 
   imgKey={item} 
   style={{width, height}}
   resizeMode="contain"
    />);

    const keyExtractor = (index) => {return index};


    const renderItem1 = ({item,}) => (
        <S3Image 
       imgKey={item} 
       style={styles.s3Image}
       resizeMode="contain"
        />);
    
        const keyExtractor1 = (index) => {return index};


    return (
    <View >
            <View style={styles.page}>
            
            <Text style={{color: "#555658", fontSize: 20, marginBottom: 10,}}> Shared Media</Text>

            
            
            <View style={styles.s3ImageView}> 
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
             data={media} 
             renderItem={renderItem}
             keyExtractor={keyExtractor}
              />
            </View>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={media} 
            renderItem={renderItem1}
            keyExtractor={keyExtractor1}
              />

            
       </View>
            
    </View>
    
    )
};


const styles = StyleSheet.create({

    page: {
        backgroundColor: "white",
        borderRadius: 50,
       
    },

    media: {
        paddingLeft: 0,
        marginTop: 30,
        
    },

    s3ImageView:{
        flexDirection: "row", 
        backgroundColor: "white", 
       
    },
    s3Image: {
    width: 80,
    height: 80,
    borderRadius: 10,
        
    }


})

export default Images; 