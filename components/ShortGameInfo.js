import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';

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

const SGInfo = ({item, index, animation=false}) => {
    let {id, team_id, date, title, home, away, homeScore, awayScore, homeUrl, awayUrl} = item;
    homeUrl = "https://schoolassets.s3.amazonaws.com/logos/49851/49851.png"
    awayUrl = "https://upload.wikimedia.org/wikipedia/en/c/cf/Horace_Mann_School_emblem.png"
    if (!item) {
      return (
        <View style={{height: 0}}>

        </View>
      )
    }
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
      <Swipeable
      renderRightActions={RenderRight}
      ref={(ref) => (row[index] = ref)}
      onSwipeableRightOpen={() => {closeRow(index)}}
      overshootRight={false}
      overshootFriction={0}
      >

      <ImageBackground source={{uri: "https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"}} resizeMode="cover">
        <View style={[{width:"100%",padding: 20, backgroundColor: "rgba(52, 52, 52, 0.6)"}, styles.boxShadow]}>
            <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "center", alignItems: "center", textAlign: "center"}}>
              <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{title}  {convertDateToText(date)}</Text>
            </View>
            <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "space-between", alignItems: "center", paddingLeft: "20%", paddingRight: "20%"}}>
              <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 40}}>{homeScore}</Text>
                <View style={{height:Dimensions.get("window").height/60}}></View>
                <View style={{justifyContent: "space-between", alignItems: "center"}}>
                  <Image style={{width: Dimensions.get("window").width/8, height: Dimensions.get("window").width/8}} source={{uri: homeUrl}}></Image>
                  <View style={{height:Dimensions.get("window").height/100}}></View>
                  <Text style={{textAlign: "center", color: "#ffa319", fontFamily: 'Roboto_400Regular'}}>{home}</Text>
                </View>
                
              </View>
              <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 40}}>{awayScore}</Text>
                <View style={{height:Dimensions.get("window").height/60}}></View>
                <View style={{justifyContent: "space-between", alignItems: "center"}}>
                  <Image style={{width: Dimensions.get("window").width/8, height: Dimensions.get("window").width/8}} source={{uri: awayUrl}}></Image>
                  <View style={{height:Dimensions.get("window").height/100}}></View>
                  <Text style={{textAlign: "center", color: "#f54242", fontFamily: 'Roboto_400Regular'}}>{away}</Text>
                </View>
                
              </View>
            </View>
            {/* <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "center", alignItems: "center"}}>
              <Text style={{textAlign: "center", color: "#ffa319", fontFamily: 'Roboto_400Regular'}}>   {home}</Text>
              <View style={{height:0, width: "25%"}}></View>
              <Text style={{textAlign: "center", color: "#f54242", fontFamily: 'Roboto_400Regular'}}>   {away}</Text>
            </View> */}
            {/* <View style={{height: 20, width: "100%", backgroundColor: "#00ffff", flexDirection: "row"}}>
              <View style={{width: 100*homeScore/(homeScore+awayScore).toString()+"%", height: "100%", backgroundColor: "#ffa319", justifyContent:"center", alignItems: "center"}}>   
                <Text>{homeScore}</Text>         
              </View>

              <View style={{width: 100-100*homeScore/(homeScore+awayScore).toString()+"%", height: "100%", backgroundColor: "#f54242", justifyContent:"center", alignItems: "center"}}>           
                <Text>{awayScore}</Text> 
              </View>

            </View> */}

            {/* <View style={{paddingTop:"8%", flexDirection: "row", justifyContent:"space-between"}}>
                <Text style={styles.regText}>{home}</Text>
                <Text style={styles.regText}>{homeScore}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                <Text style={styles.regText}>{away}</Text>
                <Text style={styles.regText}>{awayScore}</Text>
            </View> */}
        </View>
        </ImageBackground>
        </Swipeable>

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
  
export default SGInfo;