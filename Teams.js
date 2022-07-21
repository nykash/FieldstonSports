import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList} from 'react-native';
import SportTeamInfo from './components/SportTeamInfo';

export default function TeamScreen({navigation}) {

    const team_data = [
        {name:"BVS", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], 
        },

        {name:"VGL", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], 
        },

        {name:"VV", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], 
        },

        {name:"GVS", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], 
        }

    ]

  return (
    <View style={{flex: 1}}>
        <FlatList style = {{marginTop: 8}} key={'$'} keyExtractor={item => "$" + item.id}
          data={team_data} numColumns={1} keyExtraction={item => item.id} renderItem={({item}) => <SportTeamInfo item={item}></SportTeamInfo>}></FlatList>
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
