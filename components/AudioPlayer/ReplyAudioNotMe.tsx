

import React, { useState, useEffect }  from "react"
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from "@expo/vector-icons"
import {View, Text, Pressable, StyleSheet} from "react-native"
import { DataStore } from "@aws-amplify/datastore";
import Auth from "@aws-amplify/auth";
import { User } from "../../src/models";




const ReplyAudioMe = ({ soundURI}, props) => {

    const [sound, setSound] =useState<Audio.Sound | null>(null);
    const [paused, setPause] = useState (false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);


    useEffect(() => {
        loadSound();
        () =>{
            
            if(sound){
                sound.unloadAsync();
            }
        };

        }, [soundURI]);

        const loadSound = async () => {
            if(!soundURI){
                return;

        }
        
        const {sound} = await Audio.Sound.createAsync(
            {uri: soundURI},
            {},
            onPlaybackStatusUpdate
        );
        setSound(sound);
    };

    


    // sending a voice message. 
const onPlaybackStatusUpdate = (status:AVPlaybackStatus) => {
    if (!status.isLoaded) {
        return;
    }
    setAudioProgress(status.positionMillis / (status.durationMillis || 1));
    setPause(!status.isPlaying)
    setAudioDuration(status.durationMillis || 0);
}
   
    const playPauseSound = async() => {
        if(!sound){
            return;
        }
        if(paused) {
            await sound.playFromPositionAsync(0);  
        } else {
            await sound.playAsync()
            
        }
    };

    const getDuration = () => {
        const minutes = Math.floor(audioDuration / (60 * 1000));
        const seconds = Math.floor((audioDuration % (60 * 1000)) / 1000);


        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    return (
           <View style={{marginRight: "50%", borderRadius: 10, paddingLeft: 5,}}>
                <View style={styles.soundPlayer}>
                <Pressable onPress={playPauseSound}>
                <Ionicons name={paused ? "play" : "pause"} size={20} color="white" />
                </Pressable>
                <View style={styles.AudioProgressBG}>
                <View style={[styles.audioProgressFG, {left:`${audioProgress * 100}%`}]}>
                </View>
                </View>                                 
                
                </View>
                <View style={styles.textContainer}>
                <Text style={{color: "white", marginLeft: -10,}}>{getDuration()}</Text>
                </View>
                
                </View>
    )
}

const styles = StyleSheet.create({
    soundPlayer:{
        marginBottom:-14,
        marginRight: 50,
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: "row",
        marginTop: 2,
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between", 
        borderRadius: 20, 
        overflow: "hidden", 

    },
    AudioProgressBG:{
        height: 3,
        backgroundColor: "white",
        flex: 1,
        borderRadius: 5,
        margin: 5,
        marginRight: 20
    },


    audioProgressFG: {
        width: 8,
        height: 8, 
        flex: 1,
        borderRadius: 10,
        backgroundColor: "white",
        position: "absolute",
        top: -3,
        marginLeft: -5,
    },
    textContainer:{
        
        marginLeft: 35,
        marginTop: 2,
        alignItems: "flex-start",
        alignSelf: "stretch",
        justifyContent: "space-between", 
        borderRadius: 20, 
    },
        
   
});

export default ReplyAudioMe