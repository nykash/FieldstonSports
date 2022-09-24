import { StyleSheet, View, Text } from 'react-native'
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


const MediaInfo = ({item}) => {
    const {id, date, title, blurb} = item;

    let [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Roboto_500Medium,
      Lato_400Regular
    });
    if (!item) {
      return (
        <View style={{height: 0}}>

        </View>
      )
    }

    return (
        <View style={styles.homeHeader}>
            <View style={{flexDirection: "row", marginBottom: 20, justifyContent: "center", alignItems: "center"}}>
              <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>{convertDateToText(date)}</Text>
            </View>
            <Text style={[styles.regText, {marginBottom:30}]}>{title}</Text>
            <Text style={styles.blurbText}>{blurb}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      width: "100%", height: "100%", 
      backgroundColor: "rgba(52, 52, 52, 0.4)", justifyContent: "center", 
      alignItems: "stretch", textAlign: "center", 
      padding: 20,
      height:200
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