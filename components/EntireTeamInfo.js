import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';


export const EntireTeamInfoView = ({team}) => {
    
    return (
        <View>
            <View>
                <Text> HELLO</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    eagleStyle: {
      flex: 1,
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    backgroundView: {
      paddingTop: 0, paddingBottom:10, margin: 0, justifyContent: 'flex-start',
      backgroundColor: "#242424", flex:1, flexDirection:"column", height: "100%"
    },
    homeHeader: {
      padding: 5, width: "100%",
      backgroundColor: "#242424", justifyContent: "center",  //3483eb
      alignItems: "center", textAlign: "center", borderTopLeftRadius: 20,
      borderTopRightRadius: 20, paddingLeft: 10
    },
    gamesView: {
      backgroundColor: '#242424',
      margin: 0,
      paddingBottom: 10,
      marginBottom: 10,
      borderRadius: 20,
      textAlign: "center",
    },
    newsView: {
      backgroundColor: '#242424',
      margin: 10,
      height: '100%',
      borderRadius: 20,
    },
    regText: {
      color: "white",
      fontFamily: 'Roboto_700Bold',
      fontWeight: '800',
      fontSize: 20,
    },
    headerView: {
      width: '100%',
      height: "10%",
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 30,
      fontWeight: '600',
      flex: 1,
    },
    backgroundImage: {
  
    }
  });