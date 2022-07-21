import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const MediaInfo = ({item}) => {
    const {id, title} = item;

    return (
        <View style={styles.homeHeader}>
            <Text style={styles.regText}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      padding: 0, width: "100%", top: "5%", height: "80%", 
      backgroundColor: "#093642", justifyContent: "center", 
      alignItems: "center", textAlign: "center"
    },
  
    regText: {
      color: "#ffa319"
    }
  });
  
export default MediaInfo;