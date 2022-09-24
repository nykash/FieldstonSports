import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native'
import React from 'react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Bangers_400Regular,
  OpenSans_400Regular,
  Lato_400Regular
} from "@expo-google-fonts/dev";
import { convertDateToText } from '../DatesHelper';
import moment from "moment"

function sortDate(elements) {
  return elements.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})
}


export const ScheduleView = ({item}) => {
  const {id, games} = item
  const flatlist_padding = 5

  console.log(games.length)

  return (
    <View style={{height: 100}}>
      <FlatList style = {{}} key={'<ScheduleView>'} keyExtractor={item => "<ScheduleView>" + item.id+"-"+item.date}
        columnWrapperStyle={{justifyContent: "space-between"}}
        ItemSeparatorComponent={() => <View style={{width: flatlist_padding, height: flatlist_padding}} />} 
        data={games}
        numColumns={5} keyExtraction={item => item.id+"-"+item.date} renderItem={({item}) => <MiniScheduleComponent item={item}></MiniScheduleComponent>}></FlatList>
    </View>
  )
}

const MiniScheduleComponent = ({item}) => {
  const {completed} = item
  console.log(completed)

  if (completed) {
    const {id, team_id, date, title, home, away, homeScore, awayScore} = item;
    return (
      <View style={{width: Dimensions.get("window").height/30, height: Dimensions.get("window").height/30, backgroundColor:"aqua", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
        <Text>HELLO</Text>
      </View>
    )
  }

  return (
    <View style={{width: Dimensions.get("window").height/30, height: Dimensions.get("window").height/30, backgroundColor:"aqua", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
      <Text>HELLO</Text>
    </View>
  )
    
}