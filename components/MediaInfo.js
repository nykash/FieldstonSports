import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment/moment';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Bangers_400Regular,
  OpenSans_400Regular,
  Lato_400Regular
} from "@expo-google-fonts/dev";
import { convertDateToText } from '../DatesHelper';


const MediaInfo = ({item, border_radius=0}) => {
    let {id, date, title, blurb, picture} = item;
    picture = "https://cdn.britannica.com/15/201015-050-E24FA163/Field-hockey-match-Poland-Spain-2017.jpg"

    let [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Roboto_500Medium,
      Lato_400Regular
    });
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
    if (!item) {
      return (
        <View style={{height: 0}}>

        </View>
      )
    }

    return (
        <View style={[styles.homeHeader, {borderRadius: "10%"}]}>
          <Image style={{width: "100%", height: undefined, aspectRatio: 3/2, borderRadius: "10%"}} source={{uri: picture}}></Image>
            <View style={{padding: 20}}>
                <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "center", alignItems: "center"}}>
                  {/* <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{convertDateToText(date)}</Text> */}
                </View>
                <Text style={[styles.regText, {marginBottom:30}]}>{title}</Text>
                <Text style={styles.blurbText}>{blurb}</Text>
                <View style={{width: "100%", paddingLeft: 0}}>
                  <Text style={{marginTop: "5%", color: "#f4f4f4AA", fontSize: 12, fontFamily: "Roboto_400Regular"}}>{moment.utc(date).local().startOf('seconds').fromNow()}</Text>
              </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      width: "100%", alignSelf: "flex-start", 
      backgroundColor: "#212121", justifyContent: "center", 
      alignItems: "stretch", textAlign: "center", 
      padding: 0,
    },

    blurbText: {
      color: "#f4f4f4",
      fontFamily: "Roboto_400Regular"
    },
  
    regText: {
      color: "#ffa319",
      fontFamily: 'Roboto_500Medium'
    }
  });
  
export default MediaInfo;