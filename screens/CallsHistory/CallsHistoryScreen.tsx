import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { Text, View, } from '../../components/Themed';
import styles from "./styles";
import Users from "../../assets/dummy-data/Users"
import { User } from '../../src/models';

const CallsHistoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdContacts, setFilterdContacts] = useState(Users)
  
  useEffect(() => {
    const newContacts = Users.filter(contact => contact.name.toLocaleLowerCase().
    includes(searchTerm.toLocaleLowerCase()), 
    );
    setFilterdContacts(newContacts)
  }, [searchTerm])
 
 const renderItem = ({item}) => (<Text style={styles.container}> {item.name} </Text> )
  return (

  
      <View style={{backgroundColor: "#EFF3F5", flex: 1,}} >
      <View style={styles.textInputView}>
      <TextInput value={searchTerm} onChangeText={setSearchTerm} style={styles.textInput} placeholder= "Search..." />
      </View>
      
      <FlatList 
      data={filterdContacts}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{}}/>}
      />
      </View>
  );
}

export default CallsHistoryScreen;
