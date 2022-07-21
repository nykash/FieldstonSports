import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import Icon from 'react-native-ico-material-design';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList} from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState("This is some text")

  const recent_game_data = [
    {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
    {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
    {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
    {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
  ]

  const medias = [
    {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
    {id: "GVS-7/13/2022", title: "Girls Varsity Soccer Wins State Championship"},
    {id: "VF-7/13/2022", title: "JV Football Anihilates Riverdale Rivals"},
    {id: "VV-7/13/2022", title: "JV Volleyball Wins Close Game To Qualify Semis"}
  ]

  return (
    <View style={{paddingTop: 30, margin: 0, justifyContent: 'flex-start', backgroundColor: "#242424", flex:1, flexDirection:"column"}}>
      <View style={styles.homeHeader}>
        <Text style={styles.regText}>Today</Text>
      </View>

      <View style={{paddingTop: 20, justifyContent: 'center', alignItems: "center"}}>
        <FlatList style = {{}} key={'_'} keyExtractor={item => "_" + item.id} columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        data={recent_game_data} numColumns={2} keyExtraction={item => item.id} renderItem={({item}) => <SGInfo item={item}></SGInfo>}></FlatList>
      </View>

      <View style={styles.homeHeader}>
        <Text style={styles.regText}>Media</Text>
      </View>

      <FlatList style = {{marginTop: 8}} key={'#'} keyExtractor={item => "#" + item.id}
          data={medias} numColumns={1} keyExtraction={item => item.id} renderItem={({item}) => <MediaInfo item={item}></MediaInfo>}></FlatList>

    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 0, width: "100%", height: "10%", 
    backgroundColor: "#093642", justifyContent: "center", 
    alignItems: "center", textAlign: "center"
  },

  regText: {
    color: "#ffa319"
  }
});
