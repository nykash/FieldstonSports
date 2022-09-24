import { StyleSheet, View, FlatList, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular,
  Lato_400Regular
} from "@expo-google-fonts/dev";

import React from 'react'

let row = []
let prevOpenedRow;
const weekdays = ["sunday"]

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut, 
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

function repChar(char, x) {
  return new Array().join(char, x)
}

const TeamGSInfo = ({item, index, animation=false}) => {
  const {id, team_id, date, title, home, away, homeScore, awayScore} = item;
  let favorite = isFavorite(team_id)
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Lato_400Regular
  });
  const ronaldo = require("C:/Users/dassu/OneDrive/documents/FieldstonSports/assets/ronaldo.jpg")
  const [refresh_hook, set_refresh_hook] = useRefreshGlobal()

  const RenderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [0.5, 0.01]
    })

    const shiftX = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [-20, 20]
    })
  
  
    const Style = {
      transform : [
        {
          scaleX: scale,
        },
        {
          translateX: shiftX
        }
      ]
    }

  
    return (

      <Animated.View style={[Style, {width:100, borderRadius: 20, backgroundColor: favorite? "#f54242":"#f5c542", alignItems: "center", justifyContent: "center", position: 'relative', left: -58}]}>
          <TouchableOpacity  activeOpacity={0} style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}
          onPress={() => {flipFavorite(team_id); favorite=!favorite; set_refresh_hook(!refresh_hook); if (animation) {LayoutAnimation.configureNext(layoutAnimConfig)} else if (prevOpenedRow) {prevOpenedRow.close(); prevOpenedRow=null}}}
          >
            <Animated.Text style={[{color: "#f4f4f4", fontWeight: "600", fontFamily: 'Roboto_400Regular'}]}>{favorite? "Unfavorite":"Favorite"}</Animated.Text>

          </TouchableOpacity>
      </Animated.View>
    )
  }

  const closeRow = (index) => {
    if(prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close()
    }

    prevOpenedRow = row[index]
  }

  return (
      <View style={[{alignItems: "center", flexDirection: "row", width:300,padding: 5, paddingLeft:20, paddingRight:20, borderBottomColor: "black", borderBottomWidth: 1}, styles.boxShadow]}>
          
          <View style={{width: "30%", flexDirection: "row", justifyContent: "center"}}>
            <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{convertDateToText(date)}</Text>
          </View>

          <View style={{width:40}}></View>

          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

            <View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
              <View style={{width: "65%", flexDirection: "row"}}>
                <View style={{width:20}}></View>  
                <Text style={{textAlign: "center", color: "#ffa319", fontFamily: 'Roboto_400Regular'}}>{home}</Text>
                <View style={{width:20}}></View>  
              </View>
              
              <View style={{width:20}}>
                <Text style={{textAlign: "center", color: "#ffa319", fontFamily: 'Roboto_400Regular'}}>{homeScore}</Text> 
              </View>  

            </View>
            <View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
              <View style={{width: "65%", flexDirection: "row"}}>
                <View style={{width:20}}></View> 
                <Text style={{textAlign: "center", color: "#f54242", fontFamily: 'Roboto_400Regular'}}>{away}</Text>
                <View style={{width:20}}></View>
              </View>
              
              <View style={{width:20}}>
                <Text style={{textAlign: "center", color: "#f54242", fontFamily: 'Roboto_400Regular'}}>{awayScore}</Text> 
              </View>   
            </View>
          </View>
      </View>
  )
}

const GSInfo = ({item, index, animation=false}) => {
    const {id, team_name, games} = item;
    
    let [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Lato_400Regular
    });
    const [refresh_hook, set_refresh_hook] = useRefreshGlobal();
    let counter = 0
    let flatlist_padding = 0

    const [show_team, set_show_team] = useState(false);
    
    if (!show_team) {
      return (
        <TouchableOpacity onPress={() =>set_show_team(!show_team)} style={{backgroundColor: "rgba(52, 52, 52, 0.4)", width: "100%"}}>
        <View style={{padding: 10, backgroundColor: "rgba(52, 52, 52, 0.4)", width: Dimensions.get("window").width, height: Dimensions.get("window").height/10, justifyContent: "center", alignContent: "center", borderBottomColor: "black", borderBottomWidth: 1}}>
          <View style={{width: "100%", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
            <Text style={{color: "#f4f4f4",fontFamily: "Roboto_400Regular", textAlign: "center"}}>{team_name}</Text>
          </View>
        </View>
        </TouchableOpacity>

      )
    }
    return (
      
      //<View style={{padding: 10, marginTop: 0, width: Dimensions.get("window").width, backgroundColor: "rgba(52, 52, 52, 0.4)", justifyContent: "center", backgroundColor: "blue"}}>
      <View style={{padding: 10, margin: 0, height: games.length*55, width: Dimensions.get("window").width, backgroundColor: "rgba(52, 52, 52, 0.4)", justifyContent: "center", alignItems: "center", borderBottomColor: "black", borderBottomWidth: 1}}>
        <TouchableOpacity onPress={() =>set_show_team(!show_team)} style={{height:"10%", width: "100%"}}>
        <View style={{height: "100%", width: "100%", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
          <Text style={{color: "#f4f4f4",fontFamily: "Roboto_400Regular", textAlign: "center", fontSize: "14%"}}>{team_name}</Text>
        </View>
        </TouchableOpacity>
        <View style={{paddingTop: show_team?"0%":"0%", alignSelf: "flex-start", width: "100%", justifyContent: 'center', alignItems: "center"}}> 
        <FlatList style = {{}} key={'<GameInfo>'} keyExtractor={item => "<GameInfo>" + item.id+"-"+item.date}  //columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        ItemSeparatorComponent={() => <View style={{height: flatlist_padding, color: "orange"}}></View>}
        data={games} 
        //data={recent_game_data.sort((a, b) => (a.f < b.f) ? 1:-1)} 
        //.sort((a, b) => ((favorite_data[a.team_id]? 1:0) < (favorite_data[b.team_id]? 1:0)) ? 1:-1)
       // data={recent_game_data.sort((a, b) => (favorite_data[a.team_id] < favorite_data[b.team_id]) ? 1:-1)} 
       extraData={refresh_hook} 
       scrollEnabled={false}
        numColumns={1} keyExtraction={item => item.id+"-"+item.date} renderItem={({item}) => <TeamGSInfo item={item} index={counter++}></TeamGSInfo>}></FlatList>
      </View>
      </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      padding: 0, width: "100%", top: "5%", height: "20%", 
      backgroundColor: "#093642", justifyContent: "center", 
      alignItems: "center", textAlign: "center",
    },
  
    regText: {
      color: "#ffa319",
      fontFamily: "Roboto_400Regular"
    },

    boxShadow: {
      shadowColor: '#555',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
    }
  });
  
export default GSInfo;