import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store, getTeamDataByName} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';
import MediaInfo from './MediaInfo';


export const RosterComponent = ({item}) => {
    let {img_url, team_name} = item
    img_url = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt7303dbbd1a3d1a0f/60dc14d30401cb0ebfac1a00/40a30288ba7955266913a7414a3f5473a09070f2.jpg"
    const comp_team_data = getTeamDataByName(team_name)
    return (
        <View style={{}}>
            <Image style={{width: Dimensions.get("window").width, height: Dimensions.get("window").width/2}} source={{uri: img_url}}></Image>
            {/* <View style={{padding: 20}}>
                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 20}}>See More</Text>
            </View> */}
        </View>
    )
}

