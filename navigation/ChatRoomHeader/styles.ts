import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header:{
     flexDirection: "row",
     alignItems: "center", 
     marginRight: 15,
     marginLeft: 10,
    },

    androidHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
      marginLeft: 0,
    },

    noImageText: {
      fontSize: 25,
      fontWeight: "bold", 
      color: "#FAFAFA", 
      minWidth: 20, 
      maxWidth: 20,
      textAlign: "center",
    },
  
    image:{
      width: 40, 
      height: 40, 
      borderRadius: 10,
    },
    imageGroup: {
      width: 40, 
      height: 40,
      borderWidth: 1,
      borderRadius: 40,
      borderColor: "black"
     
    },
    callIcon:{
      marginHorizontal: 5,
      borderWidth: 1.3,
      borderRadius: 5,
      paddingRight: 6,
      paddingLeft: 8,
      paddingBottom: 3,
      paddingTop: 3,
      borderColor: "lightgray"
    },
    callIconAndroid:{
      marginHorizontal: 5,
      borderWidth: 1.3,
      borderRadius: 5,
      paddingRight: 6,
      paddingLeft: 8,
      paddingBottom: 3,
      paddingTop: 3,
      borderColor: "lightgray"
    },
    videoIcon:{
      marginHorizontal: 5,
      borderRadius: 5,
      borderWidth: 1.3,
      paddingRight: 6,
      paddingLeft: 8,
      paddingBottom: 3,
      paddingTop: 3,
      borderColor: "lightgray"
    },
      moreIcon:{
        marginHorizontal: 5,
        marginRight: 10,
      },
    text: {
      flex: 1, 
      fontWeight: "bold",
      
    
    }
  })

  export default styles;