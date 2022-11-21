import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions, Modal, Pressable} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular,
  Lato_400Regular
} from "@expo-google-fonts/dev";

import React from 'react'
import { BGInfoModal } from './BigGameInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

let row = []
let prevOpenedRow;
const weekdays = ["sunday"]

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s:  'seconds',
    ss: '%d sec',
    m:  '1 min',
    mm: '%d min',
    h:  '1 hr',
    hh: '%d h',
    d:  '1 d',
    dd: '%d d',
    M:  '1 mon',
    MM: '%d mon',
    y:  '1 yr',
    yy: '%d Y'
  }
});

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
    let {id, team_id, date, title, home, away, homeScore, awayScore, homeUrl, awayUrl, pictures, team_name} = item;
    
    // homeUrl = "https://schoolassets.s3.amazonaws.com/logos/49851/49851.png"
    // awayUrl = "https://upload.wikimedia.org/wikipedia/en/c/cf/Horace_Mann_School_emblem.png"
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
    const [refresh_hook, set_refresh_hook] = useRefreshGlobal()
    const border_radius = "15%"

    const [modalOpen, setModalOpen] = useState(false)

    return (
      <SafeAreaView style={{width: "100%"}}>
        
      <View style={{width: Dimensions.get("window").width, height: Dimensions.get("screen").height*0.9, padding: 20, paddingHorizontal: 0, justifyContent: "center", alignItems: "center", paddingTop: 0, borderRadius: border_radius, backgroundColor: "rgba(80, 80, 80, 0.15)", flexDirection: "column", flex: 1}}>
      {/* <Swipeable
      renderRightActions={RenderRight}
      ref={(ref) => (row[index] = ref)}
      onSwipeableRightOpen={() => {closeRow(index)}}
      overshootRight={false}
      overshootFriction={0}
      > */}
      <BGInfoModal item={item} modalOpen={modalOpen} setModalOpen={setModalOpen}></BGInfoModal>
      
        <View style={{width: "100%", flex: 9, padding: 0, paddingTop: 20, paddingBottom: 0, justifyContent: "center", alignItems: 'center'}}>
          <View style={{width: "100%", flex: 3, padding: 20, paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'space-around', alignItems: "center", padding: 20, paddingHorizontal: "15%", paddingTop: 5, flexDirection: "row", width: "100%"}}>
             <MaterialCommunityIcon name="scoreboard" size="50%" color="#f4f4f4"></MaterialCommunityIcon>
              <View>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Oswald_400Regular', fontSize: 20}}>{item.title}</Text>

              </View>
          </View>
          <View style={{width: "100%", flex: 10, justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity style={{backgroundColor: "rgba(255, 255, 255, 0.08)", flex: 7, width: "100%", paddingBottom: 20, borderRadius: "10%", overflow: "hidden",}} onPress={() => {setModalOpen(true)}}>
            <ImageBackground style={{width: "100%", aspectRatio:3/2}} source={{uri: pictures[0]}} resizeMode="cover">
              <View style={{flex: 2, width: "100%"}}></View>
            </ImageBackground>
            <Text style={{marginTop: "5%", textAlign: "center", color: "#f4f4f4", fontFamily: "Lato_400Regular"}}>This is an intro to a game summary</Text>
          </TouchableOpacity>

          {/* <View style={{flex: 1, justifyContent: "center", width: "100%"}}>
          </View> */}

          <View style={[{width:"100%",padding: 0, flex: 5, justifyContent: "center", borderRadius: "10%"}]}>
              <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "space-between", alignItems: "center", paddingLeft: "20%", paddingRight: "20%"}}>
                <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Lato_400Regular', fontSize: 40}}>{homeScore}</Text>
                  <View style={{height:Dimensions.get("window").height/60}}></View>
                  <View style={{justifyContent: "space-between", alignItems: "center"}}>
                    <Image style={{width: Dimensions.get("window").width/8, height: Dimensions.get("window").width/8}} source={{uri: homeUrl}}></Image>
                    <View style={{height:Dimensions.get("window").height/100}}></View>
                    <Text style={{textAlign: "center", color: "#ffa319", fontFamily: 'Lato_400Regular'}}>{home}</Text>
                  </View>
                  
                </View>
                <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Lato_400Regular', fontSize: 40}}>{awayScore}</Text>
                  <View style={{height:Dimensions.get("window").height/60}}></View>
                  <View style={{justifyContent: "space-between", alignItems: "center"}}>
                    <Image style={{width: Dimensions.get("window").width/8, height: Dimensions.get("window").width/8}} source={{uri: awayUrl}}></Image>
                    <View style={{height:Dimensions.get("window").height/100}}></View>
                    <Text style={{textAlign: "center", color: "#6597fc", fontFamily: 'Lato_400Regular'}}>{away}</Text>
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
          
          
          </View>
          </View>
          
          <View style={{width: "100%", paddingHorizontal: 20}}>
            <Text style={{marginTop: "5%", color: "#f4f4f4AA", fontSize: 12, fontFamily: "Lato_400Regular"}}>{moment.utc(date).local().startOf('seconds').fromNow()}</Text>
          </View>
          
        </View>

        

        
        {/* </Swipeable> */}
        </View>
        </SafeAreaView>

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