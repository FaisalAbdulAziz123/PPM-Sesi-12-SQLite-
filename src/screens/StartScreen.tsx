import { View, Text, Image } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';

const StartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
      }}>
      <View>
        <Image source={require("../assets/kopi.png")} 
        style={{width: 450,height:480,}}></Image>
        <Text style={{fontSize:34, color:"white", paddingHorizontal:30, textAlign:"center", fontFamily:"fantasy",}}>Coffee so good, your taste buds will love it.</Text>
        <Text style={{color:"#A9A9A9", textAlign:"center",marginTop:-20 }}>
        The best grain, the finest roast, the powerful flavor.
        </Text>
      </View>
      <View style={{backgroundColor:"#C67C4E", width:315,height:62,borderRadius:16, padding: 18, marginTop:20}}>
      <Link to="/Main" style={{color:"white", textAlign:"center", fontSize:16, fontWeight:'600',}}>Get Started</Link>
      </View>
    </View>
  );
};

export default StartScreen;