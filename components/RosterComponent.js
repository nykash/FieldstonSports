import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store, getTeamDataByName} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';
import MediaInfo from './MediaInfo';
import { BottomTabBar } from '@react-navigation/bottom-tabs';


export const RosterComponent = ({item}) => {
    let {img_url, team_name, caption, date} = item
    const border_radius = "10%"

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

    img_url = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt7303dbbd1a3d1a0f/60dc14d30401cb0ebfac1a00/40a30288ba7955266913a7414a3f5473a09070f2.jpg"
    const comp_team_data = getTeamDataByName(team_name)
    return (
        <View style={{width: "100%", paddingTop: 0}}>
        {/* <View style={{width: "100%", alignItems: "center", justifyContent: "center", marginBottom: "5%"}}>
             <Text style={{marginTop: "5%", textAlign: "center", color: "#f4f4f4", fontSize: 20, fontFamily: "Roboto_400Regular"}}>
                {moment.utc(date).local().startOf('seconds').fromNow()}
                </Text> 
        </View> */}
        <View style={{width: "100%", backgroundColor: "rgba(80, 80, 80, 0.15)", paddingBottom: 15, borderRadius: "10%"}}>
            <Image style={{width: "100%", height: Dimensions.get("window").width/2, overflow: "hidden", borderTopRightRadius: "10%", borderTopLeftRadius: "10%"}} source={{uri: img_url}}></Image>
            {/* <View style={{padding: 20}}>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 20}}>See More</Text>
            </View> */}
            <Text style={{marginTop: "5%", textAlign: "center", color: "#f4f4f4"}}>{caption}</Text>
            <View style={{width: "100%", paddingLeft: 20}}>
                <Text style={{marginTop: "5%", color: "#f4f4f4AA", fontSize: 12, fontFamily: "Lato_400Regular"}}>{moment.utc(date).local().startOf('seconds').fromNow()}</Text>
            </View>
        </View>
        </View>
    )
}

