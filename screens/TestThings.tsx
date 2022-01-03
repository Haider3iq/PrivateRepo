import { Auth, DataStore } from "aws-amplify"
import React, { useState } from "react"
import {View, Text, StyleSheet, Pressable} from "react-native"
import { User } from "../src/models"

const Test = () => {
  const [user, setUser] = useState <User|undefined> (undefined);
  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    const loggedInUser = await DataStore.query(User, authUser.attributes.sub)
    setUser(loggedInUser)
}

React.useEffect(() => {
   fetchUser();
},[user])


  const onPress = async () => {
    if(!user) {
      return
    }
    if(user.name !== "Test Name") {
      await DataStore.save(User.copyOf(user, (updated) => {
        updated.name = "Test Name";
      }));
      console.log("Test name:", user.name)
    }

    else {
      await DataStore.save(User.copyOf(user, (updated) => {
        updated.name = "John Weck"
      }));

      console.log("New Name is:", user.name)
    }

  }
  return (

    <View style={styles.container}>

      <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.title}>
        Test Screen Here
      </Text>

      <Text style={styles.title}>
        {user?.name}
      </Text>
      </Pressable>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  button: {
    backgroundColor: "red",
    padding: 10,
  },
});




export default Test;