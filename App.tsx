import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, {Auth, Hub, DataStore} from 'aws-amplify'
import {withAuthenticator} from "aws-amplify-react-native";
import config from "./src/aws-exports";
import {Message, User} from "./src/models";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

Amplify.configure (config);
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import CallingScreen from './screens/CallingScreen/CallingScreen';
import InComingCallingScreen from "./screens/CallingScreen/InComingCallingScreen"
import UserScreenInfo from "./screens/UserInfoScreen/UserInfoScreen"
import Images from './screens/UserInfoScreen/Images';
import Profile from './screens/Profile';
import TestScreen from './screens/TestScreen';
import Test from './screens/TestThings';
import Profilecopy from './screens/ProfileCopy/ProfileCopy';
import ProfileCopy from './screens/ProfileCopy/ProfileCopy';



function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const[user, setUser] = useState<User|null>(null);

//   useEffect(() => {



//       // Create listener
// const listener = Hub.listen('datastore', async (hubData) => {
//   const  { event, data } = hubData.payload;
//   if (event === "outboxMutationProcessed" 
//       && data.model === Message 
//       && !(["DELIVERED", "READ"].includes(data.element.status))) {
//       //set the message data to deliverd
//       DataStore.save(
//         Message.copyOf(data.element, (updated) => {
//           updated.status = "DELIVERED";
//         })
//       );
//   }
// });
    
// // Remove listener
// return () => listener();

//   }, [])



  useEffect(() => {
    if(!user) {
      return;
    }

    const subscription = DataStore.observe(User, user.id).subscribe((msg) =>{
        if (msg.model === User && msg.opType === "UPDATE") {
            setUser(msg.element);
        }
    });

    return () => subscription.unsubscribe();
  }, [user?.id])

  useEffect(() => {
    fetchUser();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateLastOnline();
    }, 5000 );
    return () => clearInterval(interval);
  }, [user]);

 
  //lastOnline at 
  const fetchUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
     const user = await DataStore.query(User, userData.attributes.sub);
    if(user) {
      setUser(user);
    }
  }

  const updateLastOnline = async () => {
    if(!user){
      return
    }
    const response = await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.lastOnlineAt = +new Date();
      })
    );
    setUser(response);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ActionSheetProvider>
        
         <Navigation colorScheme={colorScheme} />  
         {/* <ProfileCopy/> */}
         {/* <Test/> */}
        </ActionSheetProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)