import {StyleSheet} from "react-native";



const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingTop: 20,
      paddingBottom:20,
      paddingRight: 20,
      paddingLeft: 20,
      zIndex: 0,
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 10,
      borderRadius: 10,
      // shadowColor: "#000",
      // shadowOffset: {width:0, height: 10,},
      // shadowOpacity: .2,
      // elevation: 10,
      // shadowRadius: 20,
    },
    image: {
      height: 75,
      width: 75,
      borderRadius: 25,
      marginRight: 10,
    },

    noImage: {
      backgroundColor: "red", 
      paddingTop: 10,
      paddingBottom: 10, 
      padding: 15, 
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
      justifyContent: "center",
    },
    name:{
      fontSize: 18,
      fontWeight: "bold",
      
    },
    text: {
      color: "#8E8E8E",
      fontSize: 15,
    },

    textStatus: {
      marginTop: 3,
      color: "#9e9ea7",
      fontSize: 15,
      fontFamily: "NewueHaas",
      width:245,
      textAlign: "left"
      
    },
    imageGroup: {
      height: 70,
      width: 70,
      borderRadius: 40,
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
    }
  });

  export default styles;