import { StyleSheet, View, FlatList, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';
import { BGInfoModal } from './BigGameInfo';


export const SlideAnimationView = () => {
    const bounceValue = new Animated.Value(0)

    Animated.spring(
        bounceValue,
        {
          toValue: 0,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
    
    return (
        <Animated.View style={{backgroundColor: "red", }}>
            
        </Animated.View>
    )
}