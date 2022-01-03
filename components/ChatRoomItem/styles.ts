import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 10,
    },
    image: {
      height: 55,
      width: 55,
      borderRadius: 50,
      marginRight: 10,
      zIndex:-1,
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
      left: 50,
      top: 10,
      zIndex: 1,
  
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
      //color: "red",
      fontSize: 18,
      fontWeight: "bold",
      flex: 1, 
      marginBottom: 3,
    },
    text: {
      color: "#8E8E8E",
      fontSize: 15,
    },
  });

  export default styles;