import { useFonts } from "expo-font";
import {StyleSheet} from "react-native";
import NewueHaas from "../../assets/fonts/NeueHaasDisplay-Mediu.ttf"



const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 20,
      paddingRight: 10,
      paddingLeft: 10,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      marginBottom:10,
      shadowColor: "#000",
      
    },
    image: {
      height: 60,
      width: 60,
      borderRadius: 15,
      marginRight: 10,
    },
    onlineContainer:{
      backgroundColor: "#34D357",
      width: 17,
      height: 17,
      borderRadius: 10,
      borderWidth: 2.5,
      borderColor: "#EFF3F5",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 56,
      top: 46,
    },
    newMGonlineContainer:{
      backgroundColor: "#34D357",
      width: 17,
      height: 17,
      borderRadius: 10,
      borderWidth: 2.5,
      borderColor: "#EFF3F5",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 55,
      top: 55,
    },

    newMessages: {
      flexDirection: "row",
      marginTop: 20,
      marginRight: 20,
      marginLeft: 20,
      paddingRight: 10,
      paddingLeft: 10,
      padding: 10,
      borderRadius: 10,
      borderBottomStartRadius: 0,
      backgroundColor: "#FAFAFA",
      marginBottom:10,
    },
  
    badgeContainer:{
      backgroundColor: "#FF034F",
      width: 20,
      height: 20,
      marginRight: 12,
      marginBottom: 10,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end",
     
    },
    badgeText:{
      color: "white",
      fontSize: 12,
      marginRight: 3,

    },
    row:{
      flexDirection:"row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    rightContainer: {
      flex: 1,
      justifyContent: "center",

    },
    name:{
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 7,
      width: 227,
      color: "#373A44"
    },
    text: {
      color: "#9e9ea7",
      fontSize: 14,
      fontFamily: "NewueHaas",
      width:245
      
    },
    noImageText: {
      fontSize: 30,
      fontWeight: "bold", 
      color: "#FAFAFA", 
      minWidth: 25, 
      maxWidth: 25,
      textAlign: "center",
    },

    dateText:{
    fontFamily: "NewueHaas",
    color: "#373A44"
    },
    imageGroup: {
      height: 50,
      width: 50,
      borderRadius: 50,
      marginRight: 10,
      
    },
    admin:{
        alignContent: "space-between",
        justifyContent: "space-between",
        flexDirection: "row",
        fontFamily: "NewueHaas"
    },
    adminText:{
        fontSize: 12,
        paddingTop: 20,
        marginBottom: -30,
        fontFamily: "NewueHaas"
    }
  });

  export default styles;