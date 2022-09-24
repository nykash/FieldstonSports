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
import { team_data, firestore, setTeamData, favorite_data, loadFromDevice, setFavoriteData, saveToDevice } from './GlobalVariables';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import AppLoading from "expo-app-loading";

const Tab = createBottomTabNavigator();

const zip = (...arr) => {
  const zipped = [];
  arr.forEach((element, ind) => {
     element.forEach((el, index) => {
        if(!zipped[index]){
           zipped[index] = [];
        };
        if(!zipped[index][ind]){
           zipped[index][ind] = [];
        }
        zipped[index][ind] = el || '';
     })
  });
  return zipped;
};


export default function App() {

  const [get_team_data, set_team_data] = useState(team_data)
  const [loaded_data, set_loaded_data] = useState(false)
  const [loaded_favorites, set_loaded_favorites] = useState(false)

  async function getTeamData() {
    const userData = await getDoc(doc(firestore, "mega_data", "teams")) // get the data
    const ret_data = userData.data().data // boilerplate firestore code to get the actual data
    setTeamData(ret_data) // function in GlobalVariables.js to set the team_data to the firestore data
    set_loaded_data(true) // only load once
    return ret_data
  }

  async function getFavoriteData() {
    // when you load from secure store, you get a promise so you must use the .then function to use the data
    loadFromDevice("favorite_data").then((result) => {
      let temp_favorite = result // need to replace missing teams with false
      for (let i = 0; i < team_data.length; i++) {
        if (!temp_favorite[team_data[i].id]) { // if team_data id key does not exist then set it to false
          temp_favorite[team_data[i].id] = false
        }
      }

      setFavoriteData(temp_favorite) // function in GlobalVariables.js that sets favorite_data
    });


    set_loaded_favorites(true) // only load once
  }
  
  // THIS LOADS TEAM_DATA (firebase firestore) AND FAVORITE DATA (secure storage)
  if (!loaded_data) {
    getTeamData();
    return <AppLoading></AppLoading>
  }
  if (loaded_data & !loaded_favorites) {    
    getFavoriteData();
    return <AppLoading></AppLoading>
  }


  return (
    <SafeAreaView style={styles.backgroundView}>
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarLabelPosition: "beside-icon",
    tabBarLabelStyle: {
      fontWeight: "700",
      fontSize: 15
    },
    tabBarIconStyle: { display: "none" }}}>
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