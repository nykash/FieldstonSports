import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const SGInfo = ({item}) => {
    const {id, title, home, away, homeScore, awayScore} = item;

    return (
        <View style={{width:"47%", backgroundColor: "#093642", padding: 8}}>
            <Text style={{textAlign: "center", color: "#ffa319"}}>{title}</Text>
            <View style={{paddingTop:"8%", flexDirection: "row", justifyContent:"space-between"}}>
                <Text style={styles.regText}>{home}</Text>
                <Text style={styles.regText}>{homeScore}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                <Text style={styles.regText}>{away}</Text>
                <Text style={styles.regText}>{awayScore}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      padding: 0, width: "100%", top: "5%", height: "20%", 
      backgroundColor: "#093642", justifyContent: "center", 
      alignItems: "center", textAlign: "center"
    },
  
    regText: {
      color: "#ffa319"
    }
  });
  
export default SGInfo;