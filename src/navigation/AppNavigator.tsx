import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; 
import DrawerNavigator from './DrawerNavigator';
import DetailExample from '../screens/Detail/DetailExample';
import StartScreen from '../screens/StartScreen';
import Coffee from '../screens/TabScreen/Home';
import OrderPage from '../screens/Detail/OrderPage';
import DetailPage from '../screens/Detail/DetailExample';

const Stack = createNativeStackNavigator();



const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Coffee} />
        <Stack.Screen name="DetailExample" component={DetailPage} options={{
          headerShown: false
        }}/>
        
        <Stack.Screen name="OrderPage" component={OrderPage} options={{
          headerShown: false
        }}/>

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;