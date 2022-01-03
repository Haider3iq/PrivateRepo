import {StyleSheet} from "react-native";

const stylesSaved = StyleSheet.create({
    
  paddings:{
    marginBottom: 25,
  },
  header:{
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "100%", 
    alignItems: "center",
    backgroundColor: "#705AD0",
    paddingRight: 15,
    paddingLeft:15,
    paddingTop: 50,
    paddingBottom: 70,
    marginBottom: -60,
      
    
    },
  
    image:{
      width: 40, 
      height: 40, 
      borderRadius: 40,
    },
    editIcon:{
      marginHorizontal: 5,
      marginRight: 20,
    },
    text: {
      flex: 1, 
      textAlign: "center",
      marginLeft: 20,
      fontWeight: "bold",
      
    },
  
      textInputView:{
        flexDirection: "row",
        alignContent: "center",
        flex: 1,
        marginRight:10,
        padding : 10,
        backgroundColor: "#F6F9FA",
        borderRadius: 15,

    },
    textInput:{
    alignSelf: "flex-start",
    marginLeft: 10,
    fontFamily: "NewueHaas",
    fontSize: 20,
    },

    createButton: {
      marginRight: 10,
    },
  })

  


export default stylesSaved;
