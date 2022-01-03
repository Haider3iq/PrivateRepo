import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 20,
      paddingRight: 20,
      paddingLeft: 20,
      backgroundColor: "white",
      zIndex: 0,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      marginBottom:10,
      shadowColor: "#000",
      
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 50,
      marginRight: 10,
    },
  
    badgeContainer:{
      backgroundColor: "#3872E9",
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 62,
      top: 15,
    },
    badgeText:{
      color: "white",
      fontSize: 12,

    },
    row:{
      flexDirection:"row",
      justifyContent: "space-between",
    },
    rightContainer: {
      flex: 1,
      justifyContent: "center",
    },
    name:{
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 3,
    },
    text: {
      color: "#8E8E8E",
      fontSize: 15,
    },
    imageGroup: {
      height: 50,
      width: 50,
      borderRadius: 50,
      marginRight: 10,
      borderWidth: 1,
      borderColor: "black"
    },
    admin:{
        alignContent: "space-between",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    adminText:{
        fontSize: 12,
        paddingTop: 20,
        marginBottom: -30,
    },

    textInputView:{
      marginTop: 100,
        padding: 5,
        backgroundColor: "#F6F9FA"

    },
    textInput:{
    
    marginRight: 20,
    marginLeft: 20,
    } 

  });

  export default styles;