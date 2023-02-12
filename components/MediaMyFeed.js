import { StyleSheet, View, Text, Image, Linking, TouchableOpacity } from 'react-native'
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { team_data } from '../GlobalVariables';

function sortDate(elements) {
  return elements.sort((a, b) => {return moment(a.date, "MM/DD/YYYY").isAfter(moment(b.date, "MM/DD/YYYY"))? -1:1})
}

const MediaMFComponent = ({item, border_radius=0}) => {
    let {id, date, title, blurb, picture, team_id, link} = item;
 //   picture = "https://cdn.britannica.com/15/201015-050-E24FA163/Field-hockey-match-Poland-Spain-2017.jpg"

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

    const medias = sortDate(team_data[team_data.map((e) => e.id).indexOf(team_id)].news)

    return (

        <View style={[styles.homeHeader, {borderRadius: "10%"}]}>
          <TouchableOpacity onPress={() => {Linking.openURL(link)}}>
          <Image style={{width: "100%", height: undefined, aspectRatio: 3/2, borderTopLeftRadius: "10%", borderTopRightRadius: "10%"}} source={{uri: picture}}></Image>
          </TouchableOpacity>
            <View style={{padding: 20}}>
              <TouchableOpacity onPress={() => {Linking.openURL(link)}}>

                <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "center", alignItems: "center"}}>
                  {/* <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{convertDateToText(date)}</Text> */}
                </View>
                <Text style={[styles.regText, {marginBottom:30}]}>{title}</Text>
                <Text style={styles.blurbText}>{blurb}</Text>
                <View style={{width: "100%", paddingLeft: 0}}>
                  <Text style={{marginVertical: "5%", color: "#f4f4f4AA", fontSize: 12, fontFamily: "Lato_400Regular"}}>{moment.utc(date).local().startOf('seconds').fromNow()}</Text>
              </View>
              <View style={{width: "100%", height:"5%", justifyContent: "center", alignItems: "center", height: 1, paddingBottom: "5%"}}>
                <View style={{width: "100%", height: 1, backgroundColor: "#f4f4f4"}}></View>
              </View>

              </TouchableOpacity>
              
              {medias.length > 1 &&
                  <TouchableOpacity style={{flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1}} onPress={() => {Linking.openURL(medias[0].link)}}>
                  <View style={{flex: 2}}>
                    <Ionicons name="md-list" size={25} color="#f4f4f4"></Ionicons>
                  </View>

                  <View style={{flex: 11}}>
                      <Text numberOfLines={1} style={{color: "#f4f4f4", fontSize: 14, fontFamily: "Oswald_400Regular"}}>{medias[0].title}</Text>
                  </View>
              </TouchableOpacity>}

             {medias.length > 1 && 
                <TouchableOpacity style={{flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1}} onPress={() => {Linking.openURL(medias[1].link)}}>
                  <View style={{flex: 2}}>
                    <Ionicons name="md-list" size={25} color="#f4f4f4"></Ionicons>
                  </View>

                  <View style={{flex: 11}}>
                      <Text numberOfLines={1} style={{color: "#f4f4f4", fontSize: 14, fontFamily: "Oswald_400Regular"}}>{medias[1].title}</Text>
                  </View>
              </TouchableOpacity>}

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      width: "100%", alignSelf: "flex-start", 
      backgroundColor: "rgba(80, 80, 80, 0.15)", justifyContent: "center", 
      alignItems: "stretch", textAlign: "center", 
      alignSelf: "flex-start",
      padding: 0,
    },

    blurbText: {
      color: "#f4f4f4",
      fontFamily: "Lato_400Regular"
    },
  
    regText: {
      color: "#ffa319",
      fontFamily: 'Oswald_400Regular',
      fontSize: 16
    }
  });
  
export default MediaMFComponent;