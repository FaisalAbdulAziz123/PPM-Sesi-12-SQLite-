import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/TabScreen/Home';
import Profile from '../screens/TabScreen/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useWindowDimensions, Text} from 'react-native';
import OrderPage from '../screens/Detail/OrderPage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {width} = useWindowDimensions(); 
  const isTablet = width > 768; 

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Orders':
              iconName = 'cart-outline';
              break;
            case 'Transaction':
              iconName = 'cash-outline';
              break;
            case 'Product':
              iconName = 'pricetags-outline';
              break;
            default:
              iconName = 'help-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          display: isTablet ? 'none' : 'flex',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={OrderPage} />
      <Tab.Screen name="Product" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
