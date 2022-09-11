import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Image, SafeAreaView, ImageBackground, ScrollView, Touchable, LayoutAnimation} from 'react-native';
import AppLoading from "expo-app-loading";
import { useRefreshGlobal, getFavoriteGames, getFavoriteMedias} from './GlobalVariables';
import moment from "moment"
import {ScheduleView} from './components/ScheduleView';
import GSInfo from "./components/GamesScreenInfo.js"

import { recent_game_data, medias, team_data, isFavorite, flipFavorite, 
  setFavorite, favorite_data, createFavoriteData, refresh_data, store, getRecentCompletedGames, getRecentUncompletedGames} from './GlobalVariables';
import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular,
  Roboto_700Bold,
  Lato_400Regular
} from "@expo-google-fonts/dev";
import { add, or } from 'react-native-reanimated';

function max(x, y) {
  return x > y ? x:y
}

function min(x, y) {
  return x < y ? x:y
}

function count(array, element) {
  let counter = -1
  for (let i = 0; i < array.length; i++) {
      counter += array[i] == element ? 1:0
  }

  return counter
}

function elementsWithCondition(elements, condition) {
  let res = []
  for (let i = 0; i < elements.length; i++) {
    if (condition(elements[i])) {res.push(elements[i])}
  }

  return res
}

function sortDate(elements) {
  return elements.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})
}

function flatten(arr) {
  return Array.prototype.concat(...arr);
}


function sortGameMediaData(games, medias) {
  console.log("we got a sorter")
  console.log(favorite_data)
  let master_data = []
  let counter = 0;
  for (let i = 0; i < team_data.length; i++) {
    if (!team_data[i].favorite) {continue}
    //data.filter((item) => item.state == 'New York').map(({id, name, city}) => ({id, name, city}));
    let team_games = games.filter((item) => team_data[i].id == item.team_id)
    team_games = team_games.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

    let team_medias = medias.filter((item) => team_data[i].id == item.team_id)
    team_medias = team_medias.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

    let team_future_games = recent_game_data.filter((item) => team_data[i].id == item.team_id)
    team_future_games = team_future_games.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

    let add_new = []
    //add_new.push({id:"s"+(counter++), name: team_data[i].id})

    if (team_games.length > 0) {add_new.push(team_games[0])}
    //if (team_future_games.length > 0) {add_new.push({id: "F"+team_data[i].id, team_id: team_data[i].team_id, games: team_future_games})}
    if (team_medias.length > 0) {add_new.push(team_medias[0])}

    if (add_new.length != 0) {
      master_data.push(add_new)
    }
    
  }
  master_data = master_data.sort((a, b) => {return moment(a[0].date, "MM/DD/YYYY").isAfter(moment(b[0].date, "MM/DD/YYYY"))? -1:1})
  master_data = flatten(master_data)
  console.log(master_data)
  return master_data
}

function clamp_value(value, lower, upper) {
  return max(min(value, upper), lower)
}

export function MyFeed({navigation}) {
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Lato_400Regular
  });

  const plus = require("./assets/plus.png")
  
  const flatlist_padding = 23;
  const background_image = require("./assets/eagle.png")
  const [refresh_hook, set_refresh_hook] = useRefreshGlobal();

  if (!fontsLoaded) {
    return (<AppLoading></AppLoading>)
  } else {
    let counter = -1; // //{height: clamp_value(count(Object.values(favorite_data), true)*(flatlist_padding+150), 250, 500)}
    return (
    <SafeAreaView style={styles.backgroundView}>
      
      <ScrollView> 
      <View style={[styles.gamesView, ]}> 
        <View style={[styles.homeHeader]}>
          <Text style={[styles.regText, {fontWeight: '400'}]}>Most Recent</Text>
        </View>
      <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center"}}>
        <FlatList style = {{}} key={'<MyFeed>'} keyExtractor={item => "<MyFeed>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        ItemSeparatorComponent={() => <View style={{height: 0}} />} 
        data={sortGameMediaData(getFavoriteGames(getRecentCompletedGames()), getFavoriteMedias(), getFavoriteGames(getRecentUncompletedGames()))} //recent_game_data.sort((a, b) => a.team_id.localeCompare(b.team_id))
      //  extraData={refresh_hook}
        scrollEnabled= {false}
        numColumns={1} keyExtraction={item => item.id+"-"+item.date} 
        renderItem={({item}) => item.id[0]=="G"? <SGInfo item={item} index={counter++} animation={true}> 
        </SGInfo>: (item.id[0]=="s"?
        <View style={{height:60, justifyContent:"center", alignItems:"center"}}><Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{item.name}</Text></View>
        :(item.id[0]=="F"?<ScheduleView item={item}></ScheduleView>:<MediaInfo item={item}></MediaInfo>))}>
        </FlatList>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
    }
}


function getAllSortedGames() {
  let result_games = []
  for (let i = 0; i < team_data.length; i++) {
    const sorted_games = sortDate(team_data[i].schedule).filter((item) => item.homeScore != undefined)

    result_games.push({"id": team_data[i].id, "games": sorted_games})
  }

  return result_games
}

export function GameScreen({navigation}) {
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Lato_400Regular
  });
  const [refresh_hook, set_refresh_hook] = useRefreshGlobal();

  const flatlist_padding = 0;
  const background_image = require("./assets/eagle.png")
  if (!fontsLoaded) {
    return (<AppLoading></AppLoading>)
  } else {
    let counter = 0;
    return (
    <SafeAreaView style={styles.backgroundView}>
      {/* <View style={styles.headerView}>
       <Image
        style={styles.eagleStyle}
        source={require('./assets/eagle.png')}
  />
      </View> */}
      <ScrollView>
      <View style={styles.gamesView}>
        <View style={styles.homeHeader}>
          <Text style={styles.regText}>Today</Text>
        </View>
      <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center"}}> 
        <FlatList style = {{}} key={'<GameScreen>'} keyExtractor={item => "<GameScreen>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        ItemSeparatorComponent={() => <View style={{height: flatlist_padding}} />} 
        data={getAllSortedGames()} 
        //data={recent_game_data.sort((a, b) => (a.f < b.f) ? 1:-1)} 
        //.sort((a, b) => ((favorite_data[a.team_id]? 1:0) < (favorite_data[b.team_id]? 1:0)) ? 1:-1)
       // data={recent_game_data.sort((a, b) => (favorite_data[a.team_id] < favorite_data[b.team_id]) ? 1:-1)} 
       extraData={refresh_hook} 
       scrollEnabled={false}
        numColumns={1} keyExtraction={item => item.id+"-"+item.date} renderItem={({item}) => <GSInfo item={item} index={counter++}></GSInfo>}></FlatList>
      </View>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
    }
}

const styles = StyleSheet.create({
  eagleStyle: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  backgroundView: {
    paddingTop: 0, paddingBottom:10, margin: 0, justifyContent: 'flex-start',
    backgroundColor: "#242424", flex:1, flexDirection:"column", height: "100%"
  },
  homeHeader: {
    padding: 5, width: "100%",
    backgroundColor: "#242424", justifyContent: "center",  //3483eb
    alignItems: "center", textAlign: "center", borderTopLeftRadius: 20,
    borderTopRightRadius: 20, paddingLeft: 10
  },
  gamesView: {
    backgroundColor: '#242424',
    margin: 10,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  newsView: {
    backgroundColor: '#242424',
    margin: 10,
    height: '100%',
    borderRadius: 20,
  },
  regText: {
    color: "white",
    fontFamily: 'Roboto_700Bold',
    fontWeight: '800',
    fontSize: 20,
  },
  headerView: {
    width: '100%',
    height: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 30,
    fontWeight: '600',
    flex: 1,
  },
  backgroundImage: {

  }
});


export function MediaScreen({navigation}) {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Lato_400Regular
  });

  const flatlist_padding = 23;
  const background_image = require("./assets/eagle.png")
  if (!fontsLoaded) {
    return (<AppLoading></AppLoading>)
  } else {
  return (
    <SafeAreaView style={styles.backgroundView}>
      {/* <View style={styles.headerView}>
       <Image
        style={styles.eagleStyle}
        source={require('./assets/eagle.png')}
  />
      </View> */}
      <ScrollView>
      <View style={styles.newsView}>
        <View style={styles.homeHeader}>
          <Text style={styles.regText}>This Week</Text>
        </View>

        <FlatList style = {{marginTop: 8}} key={'#'} keyExtractor={item => "#" + item.id+"-"+item.date} scrollEnabled={false}
          data={sortDate(medias)} numColumns={1} keyExtraction={item => item.id+"-"+item.date} renderItem={({item}) => <MediaInfo item={item}></MediaInfo>}
          ItemSeparatorComponent={() => <View style={{height: flatlist_padding}} />} 
          ></FlatList>
               
      </View>
      </ScrollView>
    </SafeAreaView>
  );
    }
}
