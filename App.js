import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList} from 'react-native';
import TeamScreen from './Teams';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Teams" component={TeamScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 0, width: "100%", height: "10%", 
    backgroundColor: "#093642", justifyContent: "center", 
    alignItems: "center", textAlign: "center"
  },

  regText: {
    color: "#ffa319"
  }
});
