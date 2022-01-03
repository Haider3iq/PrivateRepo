import React, { useState, useEffect }  from "react"
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from "@expo/vector-icons"
import {View, Text, Pressable, StyleSheet} from "react-native"




const AudioPlayer = ({ soundURI }) => {

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


        return `${minutes}: ${seconds < 10 ? "0" : ""}${seconds}`;
    };


    return (
           <View style={styles.soundPlayer}>
                <Pressable onPress={playPauseSound}>
                <Ionicons name={paused ? "play" : "pause"} size={25} color="white" />
                </Pressable>
                <View style={styles.AudioProgressBG}>
                <View style={[styles.audioProgressFG, {left:`${audioProgress * 100}%`}]}>
                </View>
                </View>
                <Text style={{marginRight: 10, marginLeft: -5, color: "white"}}>{getDuration()}</Text>
                </View>
    )
}

const styles = StyleSheet.create({
    soundPlayer:{
        marginBottom: 5,
        marginLeft: 30,
        marginRight: 65,
        padding: 5,
        flexDirection: "row",
        marginTop: 2,
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderWidth: 1, 
        borderColor: "black",
        borderRadius: 15,  
        backgroundColor: "#3D4785",

    },
    AudioProgressBG:{
        height: 5,
        backgroundColor: "white",
        flex: 1,
        borderRadius: 5,
        margin: 5,
        marginRight: 20
    },

    audioProgressFG: {
        width: 10,
        height: 10, 
        borderRadius: 10,
        backgroundColor: "white",
        position: "absolute",
        top: -3,
    }
        
   
});

export default AudioPlayer