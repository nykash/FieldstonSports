import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StyleSheet, TouchableOpacity, Text, Modal, View, FlatList, Image, SafeAreaView, ImageBackground, ScrollView, Touchable, LayoutAnimation, Dimensions, Pressable} from 'react-native';
import AppLoading from "expo-app-loading";
import { useRefreshGlobal, getFavoriteGames, getFavoriteMedias, getTeamIndexId} from './GlobalVariables';
import moment from "moment"
import {ScheduleView} from './components/ScheduleView';
import GSInfo, {TeamGSInfo} from "./components/GamesScreenInfo.js"
import Icon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native';


import { recent_game_data, medias, team_data, isFavorite, flipFavorite, 
  setFavorite, favorite_data, createFavoriteData, refresh_data, store, getRecentCompletedGames, getRecentUncompletedGames} from './GlobalVariables';
import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_700Bold,
  Lato_400Regular,
  Oswald_400Regular,
  Oswald_300Light
} from "@expo-google-fonts/dev";
import { add, or } from 'react-native-reanimated';
import { MyFeedComponent } from './components/MyFeedComponent';
import { MFNavigatorSeperator } from './components/MyFeedNavigatorSeperator';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { RosterComponent } from './components/RosterComponent';
import CardFlip from 'react-native-card-flip';
import MediaMFComponent from './components/MediaMyFeed';


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

function getFavoriteTeams() {
  return Object.keys(favorite_data).filter((e) => favorite_data[e])
}


function getFavoriteField(data, columns, selectors={}) {
  let result = []
  for (let i = 0; i < data.length; i++) {
    if(!isFavorite(data[i].id)) {continue}

    for (let j = 0; j < columns.length; j++) {
      const fx = selectors[columns[j]] != undefined? selectors[columns[j]]: (x) => (true)
      result = result.concat(data[i][columns[j]].filter(fx).map((ele) => ({...ele, ...{team_id: data[i].id, team_name: data[i].team_name}})))
      
    }

  }

  return result
}

function sortGameMediaData(data) {
  let res_data = data.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})
  let passed = {}
  let passed_counts = {}
  for (let x in getFavoriteTeams()) {
    passed[x] = false
    passed_counts[x] = 0
  }

  for (let i = 0; i < res_data.length; i++) {
    if(!passed[res_data[i].team_id]) {
      passed_counts[res_data[i].team_id] = Math.ceil(Math.random(0, 1)*3) 
    }
    
    for(let x in Object.keys(passed_counts)) {
      passed_counts[x] --
      if (passed_counts[x] <= 0) {
        
      }
    }
  }

  return res_data
}

// function sortGameMediaData(games, medias) {
//   console.log("we got a sorter")
//   console.log(favorite_data)
//   let master_data = []
//   console.log(team_data.length)
//   for (let i = 0; i < team_data.length; i++) {
//     if (!favorite_data[team_data[i].id]) {continue}
//     //data.filter((item) => item.state == 'New York').map(({id, name, city}) => ({id, name, city}));
//     let team_games = games.filter((item) => team_data[i].id == item.team_id)
//     team_games = team_games.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

//     let team_medias = medias.filter((item) => team_data[i].id == item.team_id)
//     team_medias = team_medias.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

//     console.log(team_games)

//     let team_future_games = recent_game_data.filter((item) => team_data[i].id == item.team_id)
//     team_future_games = team_future_games.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})

//     let add_new = {}
//     let counter = 0

//     if (team_games.length > 0) {add_new["game"] = team_games[0]}
//     //if (team_future_games.length > 0) {add_new.push({id: "F"+team_data[i].id, team_id: team_data[i].team_id, games: team_future_games})}
//     if (team_medias.length > 0) {add_new["media"] = team_medias[0]}

//     if (Object.keys(add_new).length != 0) {
//       add_new["name"] = {name: team_data[i].team_name}
//       master_data.push(add_new)
//     }

//     console.log(master_data)
    
//   }
//   //master_data = master_data.sort((a, b) => {return moment(a["game"].date, "MM/DD/YYYY").isAfter(moment(b["game"].date, "MM/DD/YYYY"))? -1:1})
//  // master_data = flatten(master_data)
//   console.log("I AM")
//   console.log(master_data)
//   return master_data
// }

function clamp_value(value, lower, upper) {
  return max(min(value, upper), lower)
}

export function MyFeed({navigation}) {
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Lato_400Regular,
    Oswald_300Light,
    Oswald_400Regular
  });

  const plus = require("./assets/plus.png")
  
  const flatlist_padding = 23;
  const background_image = require("./assets/eagle.png")
  const [refresh_hook, set_refresh_hook] = useRefreshGlobal();
  const [favorites, set_favorites] = useState(favorite_data)
  const border_radius = 30;
  const isFocused = useIsFocused();

  if(isFocused) {
    
  }

  if (!fontsLoaded) {
    return (<AppLoading></AppLoading>)
  } else {

    if(!Object.values(favorite_data).includes(true)) {
      return <View style={{backgroundColor: "black", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Text style={[styles.regText, {fontWeight: '400', textAlign: "center"}]}>GO TO SEARCH TO FIND YOUR TEAMS</Text>

      </View>
    }


    let counter = -1; // //{height: clamp_value(count(Object.values(favorite_data), true)*(flatlist_padding+150), 250, 500)}
    return (
    <SafeAreaView style={styles.backgroundView}>
      
      <ScrollView> 
      <View style={[styles.gamesView, ]}> 
        <View style={[styles.homeHeader]}>
          <Text style={[styles.regText, {fontWeight: '400'}]}></Text>
        </View>
        
      <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center"}}>
        <FlatList style = {{}} key={'<MyFeed>'} keyExtractor={item => "<MyFeed>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
    //    ItemSeparatorComponent={() => MFNavigatorSeperator()} 
          ItemSeparatorComponent = {() => <View style={{height: Dimensions.get("window").height/35, justifyContent: "center", alignItems: "center"}}>
                            {/* <Icon name="dots-three-vertical" size={Dimensions.get("window").height/35 * 1/2} color="#f4f4f4"></Icon> */}

          </View>}
        data={sortGameMediaData(getFavoriteField(team_data, ["schedule", "news", "pictures"], selectors={"schedule": (game) => game["homeScore"] != undefined}))} //recent_game_data.sort((a, b) => a.team_id.localeCompare(b.team_id))
        extraData={refresh_hook}
        scrollEnabled= {false}
        numColumns={1} keyExtraction={item => item.id+"-"+item.date} 
        renderItem={({item}) => {
          switch(item.id[0]) {
            case ("G"):
              return (
              <SGInfo item={item}></SGInfo>
              )
              break;
              
            case ("P"):
              return (
                <RosterComponent item={item}></RosterComponent>
              )
              break;
            
            case ("M"):
              return (
                <MediaMFComponent border_radius={border_radius} item={item}></MediaMFComponent>
              )
              break;
          }
        }}>
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

    result_games.push({"id": team_data[i].id, "games": sorted_games, team_name: team_data[i].team_name})
  }

  return result_games
}

export function GameScreen({route, navigation}) {

  const given_team_idx = route.params != undefined? route.params.given_team_idx:undefined
  console.log(route.params)
  console.log(given_team_idx)
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_100Thin,
    Roboto_300Light,
    Lato_400Regular
  });
  const [refresh_hook, set_refresh_hook] = useRefreshGlobal();

  const flatlist_padding = 0;
  const background_image = require("./assets/eagle.png")
  let [team_idx, set_team_idx] =  given_team_idx != undefined? useState(given_team_idx):useState(getTeamIndexId(Object.keys(favorite_data)[Object.values(favorite_data).indexOf(true)]))
  if (given_team_idx != undefined) {
    team_idx = given_team_idx
  }
  const [this_card, set_this_card] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [openPlayerModal, setPlayerModal] = useState(false);
  const isFocused = useIsFocused();
  const [scrollUp, setScrollUp] = useState(true)
  const [touchY, setTouchY] = useState(0);

  if(isFocused) {
    
  }

  if (!Object.values(favorite_data).includes(true)) {
    return (
        <View style={{backgroundColor: "black", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Text style={[styles.regText, {fontWeight: '400', textAlign: "center"}]}>GO TO SEARCH TO FIND YOUR TEAMS</Text>
        </View>
    )
  }

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
      <View style={styles.gamesView}>
        {/* <View style={styles.homeHeader}>
          <Text style={styles.regText}>Team Records</Text>
        </View> */}

          <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center", marginBottom: 15}}> 
            <FlatList style = {{}} key={'<GameScreen>'} keyExtractor={item => "<GameScreen>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
            data={team_data.filter((val) => (isFavorite(val.id)))} 
          extraData={refresh_hook} 
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: Dimensions.get("window").width/20}}>

          </View>}
          scrollEnabled={true}
            numColumns={1} keyExtraction={item => item.id+"-"+item.date} 
            horizontal={true}
            renderItem={({item}) => 
              <TouchableOpacity style={{alignSelf: "flex-start", borderRadius: "10%", backgroundColor: team_data[team_idx].id==item.id? "rgba(255, 255, 255, 0.1)":"rgba(255, 255, 255, 0.05)", padding: 10}} onPress={() => 
              {
                if (given_team_idx != undefined) {
                  navigation.navigate("Teams", {})
                }
                set_team_idx(team_data.map(function(e) { return e.id; }).indexOf(item.id))
                }}>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Lato_400Regular', fontSize: 12}}>{item.team_name}</Text>
              </TouchableOpacity>
            }></FlatList>
          </View>
        <ScrollView style={{}} onTouchStart={e=> setTouchY(e.nativeEvent.pageY)}
                        onTouchMove={e => {
                            if (touchY - e.nativeEvent.pageY > 0) {
                                setScrollUp(false)
                            }

                            if (touchY - e.nativeEvent.pageY < 0) {
                                setScrollUp(true)
                            }
                        }}>
        <View style={{width: "100%", alignSelf: "flex-start", paddingBottom: 50}}>

          {/* <View style={{width: "100%", justifyContent: 'center', alignItems: "center", alignSelf: "flex-start", padding: 40, backgroundColor: "#212121", borderRadius: "10%"}}>
            <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 17}}>{team_data[team_idx].team_name}</Text>
          </View> */}

          


          <View style={{width: "100%", justifyContent: 'center', alignItems: "center", alignSelf: "flex-start", backgroundColor: "#212121", borderRadius: "10%", marginTop: 20, padding: 20, paddingTop: 10}}> 
           
            <View style={{justifyContent: 'space-around', alignItems: "center", paddingHorizontal: "15%", paddingTop: 5, flexDirection: "row", width: "100%", paddingBottom: 10}}>
                <MaterialCommunityIcon name="scoreboard" size="50%" color="#f4f4f4"></MaterialCommunityIcon>
                <View>
                  <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Oswald_400Regular', fontSize: 20}}>Past Games</Text>

                </View>
            </View>
            <FlatList style = {{}} key={'<Schedule'+team_data[team_idx].id+">"} keyExtractor={item => '<Schedule'+team_data[team_idx].id+">" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
            ItemSeparatorComponent={() => <View style={{height: flatlist_padding, color: "orange"}}></View>}
            data={team_data[team_idx].schedule.filter((x) => {return x.homeScore != undefined})} 
          extraData={refresh_hook} 
          scrollEnabled={false}
            numColumns={1} keyExtraction={item => item.id+"-"+item.date} 
            renderItem={({item}) => {
              return (
                <TeamGSInfo item={item} index={counter++}></TeamGSInfo>
              )}}></FlatList>
           </View>


            <View style={{width: "100%", justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#212121", borderRadius: "10%", marginVertical: 20}}>
              <TouchableOpacity style={{paddingBottom: 20, backgroundColor:"rgba(255, 255, 255, 0.05)", borderRadius: "10%"}} onPress={() => setPlayerModal(true)}>
                <Image style={{width: "100%", height: undefined, aspectRatio: 3/2, borderTopLeftRadius: "10%", borderTopRightRadius: "10%", overflow: "hidden"}} source={{uri: team_data[team_idx].roster.img}}></Image>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 14, paddingTop: 20}}>Team Roster</Text>
              </TouchableOpacity>
            <Modal visible={openPlayerModal} transparent={true} animationType="slide">
              <SafeAreaView>
                  <View style={{backgroundColor: "#212121", height: "100%"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{flexDirection: "row", position: "absolute", zIndex: 100, left: "3%"}}>
                          <Pressable onPress={()=>{setPlayerModal(false)}}>
                              <AntDesignIcon name="arrowleft" size={30} color="#f4f4f4"/>
                          </Pressable>
                      </View>
                      <View style={{width: "100%"}}>
                        <View style={{width: "100%", justifyContent: "center", alignItems: "center", padding: 10, alignSelf: "flex-start"}}>
                            <Text style={{textAlign: "center", color: "#f4f4f4", fontSize: 17, fontFamily: "Roboto_400Regular"}}>{team_data[team_idx].team_name} Roster</Text>
                        </View>
                      </View>
                    </View>
                   
                <View style={{width: "100%", alignSelf: "flex-start", padding: 10}}>
                <FlatList style = {{}} key={'<RostersGS>'} keyExtractor={item => "<RostersGS>" + item}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
                
              data={team_data[team_idx].roster.players} 
            extraData={refresh_hook} 
            numColumns={1}
            contentContainerStyle={{alignItems: "stretch", justifyContent: "center"}}
            //ItemSeparatorComponent={() => <View style={{width: Dimensions.get("window").width/20}}></View>}
            scrollEnabled={true}
            keyExtraction={item => item} 
              renderItem={({item}) => {
                  return (
                  <View style={{width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", padding: 10, borderBottomColor: "black", borderBottomWidth: 1}}>
                    <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 17}}>{item}</Text>
                  </View>
                  )
                }
              }></FlatList>
              </View>
                </View>
                </SafeAreaView>
              </Modal>
            </View>

            <SGInfo item={sortDate(team_data[team_idx].schedule.filter((a) => a.homeScore != undefined))[0]}></SGInfo>
       </View>
       </ScrollView>
      {/* <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center", alignSelf: "flex-start"}}> 
        <FlatList style = {{}} key={'<GameScreen>'} keyExtractor={item => "<GameScreen>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        data={getAllSortedGames()} 
       extraData={refresh_hook} 
       scrollEnabled={false}
        numColumns={1} keyExtraction={item => item.id+"-"+item.date} renderItem={({item}) => <GSInfo item={item} index={counter++}></GSInfo>}></FlatList>
        <View style={{height: 100}}></View>
      </View> */}


      </View>
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
    backgroundColor: "#000000", flex:1, flexDirection:"column", height: "100%",
  },
  homeHeader: {
    padding: 5, width: "100%",
    backgroundColor: "#121212", justifyContent: "center",  //3483eb
    alignItems: "center", textAlign: "center", borderTopLeftRadius: 20,
    borderTopRightRadius: 20, paddingLeft: 10
  },
  gamesView: {
    backgroundColor: '#121212',
    margin: 0,
    paddingBottom: 10,
    marginBottom: 10,
   // borderRadius: 20,
    textAlign: "center", paddingHorizontal: "0%",
  },
  newsView: {
    backgroundColor: '#000000',
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
        {/* <View style={styles.homeHeader}>
          <Text style={styles.regText}>This Week</Text>
        </View> */}

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
