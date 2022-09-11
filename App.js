import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import {GameScreen, MediaScreen, MyFeed}  from './HomeScreen';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList, SafeAreaView} from 'react-native';
import TeamScreen from './Teams';
import {useAsyncEffect} from 'use-async-effect'
import { Firestore } from 'firebase/firestore';
import { team_data, firestore, setTeamData } from './GlobalVariables';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import AppLoading from "expo-app-loading";

const Tab = createBottomTabNavigator();


export default function App() {

  const [get_team_data, set_team_data] = useState(team_data)
  const [loaded_data, set_loaded_data] = useState(false)

  async function getData() {
    const userData = await getDoc(doc(firestore, "mega_data", "teams"))
    const ret_data = userData.data().data
    setTeamData(ret_data)
    set_loaded_data(true)
    return ret_data
  }
  
  
  let refresh_database = false
  if (!loaded_data) {
    getData();
    
    return <AppLoading></AppLoading>
  }



  // console.log("THIS IS TEAM DATA LOOK AT ME")
  // console.log(userData)

  return (
    <SafeAreaView style={styles.backgroundView}>
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="My Feed" component={MyFeed}></Tab.Screen>
        <Tab.Screen name="Games" component={GameScreen}></Tab.Screen>
        <Tab.Screen name="Articles" component={MediaScreen}></Tab.Screen>
        <Tab.Screen name="Search" component={TeamScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 0, width: "100%", height: "10%", 
    backgroundColor: "#093642", justifyContent: "center", 
    alignItems: "center", textAlign: "center"
  },

  backgroundView: {
    paddingTop: 0, paddingBottom:10, margin: 0, justifyContent: 'flex-start',
    backgroundColor: "#242424", flex:1, flexDirection:"column"
  },

  regText: {
    color: "#ffa319"
  }
});

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    card: 'rgb(30, 30, 30)',
    border: 'rgb(30, 30, 30)',
    text: 'white'
  },
};