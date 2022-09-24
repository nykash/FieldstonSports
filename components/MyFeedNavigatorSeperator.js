import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';
import MediaInfo from './MediaInfo';
import { RosterComponent } from './RosterComponent';
import CardFlip from 'react-native-card-flip';


export const MFNavigatorSeperator = (height=Dimensions.get("screen").height/7) => {
    return (
        <View style={{height:height, width: Dimensions.get("window").width, paddingTop: "2%", paddingBottom: "2%"}}>
            <View style={{height: "100%", width: "100%", borderTopColor: "black", borderBottomColor: "black", borderTopWidth:1, borderBottomWidth: 1}}>

            </View>
        </View>
    )
}