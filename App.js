import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import chats from './data/chats';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="false">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="ChatList" component={({ navigation }) => <ChatList chats={chats} navigation={navigation} />} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />   
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;