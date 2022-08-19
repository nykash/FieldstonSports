import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import SportTeamInfo from './components/SportTeamInfo';

export default function TeamScreen({navigation}) {
    console.log("new ta")
    const [team_data, set_team_data] = useState([
        {name:"BVS", id:"BVS", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], favorite: false, season: 'fall'
        },

        {name:"VGL", id:"VGL", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], favorite: true, season: 'spring'
        },

        {name:"VV", id:"VV", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], favorite: true, season: 'fall'
        },

        {name:"GVS", id:"GVS", schedule: [
            {id: "BVS-7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
            {id: "GVS-7/13/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
            {id: "VF-7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
            {id: "VV-7/13/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1}
          ], news: [
            {id: "BVS-7/13/2022", title: "Boys Varity Soccer Dominate Season"},
            {id: "BVS-7/14/2022", title: "Boys Varity Soccer Overwhelm Tournament"},
            {id: "BVS-7/12/2022", title: "Boys Varity Soccer MVP Candidates"},
          ], roster: [], standings: [], favorite: true, season: 'winter'
        }

    ])

    const [fall_show_teams, set_fall_show_teams] = useState(false);
    const [winter_show_teams, set_winter_show_teams] = useState(false);
    const [spring_show_teams, set_spring_show_teams] = useState(false);
    

    const [favorite_teams, add_favorite_team] = useState([
      {name: "BVS", id: "BVS",}
    ])

  return (
    <View style={{flex:1, backgroundColor: "#242424"}}>
      <View style={styles.homeHeader}>
        <Text style={styles.regText}>Favorite Teams</Text>
      </View>
      <View style={{}}>
      <FlatList style = {{}} key={'_'} keyExtractor={item => "_" + item.id} columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        data={team_data} numColumns={2} keyExtraction={item => item.id} renderItem={({item}) => <SportTeamInfo item={item}></SportTeamInfo>}></FlatList>
        
      </View>
  
      <TouchableOpacity style={styles.homeHeader} onPress={()=> {set_fall_show_teams(!fall_show_teams)}}>
        <Text style={styles.regText}>Fall</Text>
      </TouchableOpacity>
      <View style={{opacity: fall_show_teams? 100:0, height: fall_show_teams? 100:0}}>
      
         <FlatList style = {styles.seasonTeamList} key={'<fall>'} keyExtractor={item => "<fall>" + item.id}
            data={team_data} numColumns={1} keyExtraction={item => item.id} 
            renderItem={({item}) => item.season=="fall"? <SportTeamInfo item={item}></SportTeamInfo>:null // <SportTeamInfo item={item}></SportTeamInfo>
          }
          ></FlatList>
      </View>

      <TouchableOpacity style={styles.homeHeader} onPress={()=> {set_winter_show_teams(!winter_show_teams)}}>
        <Text style={styles.regText}>Winter</Text>
      </TouchableOpacity>
      
      <View style={{opacity: winter_show_teams? 100:0, height: winter_show_teams? 100:0}}>
        <FlatList style = {{marginTop: 8}} key={'<winter>'} keyExtractor={item => "<winter>" + item.id}
            data={team_data} numColumns={2} keyExtraction={item => item.id} 
            renderItem={({item}) => item.season == "winter"? <SportTeamInfo item={item}></SportTeamInfo>:null
          }
          ></FlatList>
      </View>

      <TouchableOpacity style={styles.homeHeader} onPress={()=> {set_spring_show_teams(!spring_show_teams)}}>
        <Text style={styles.regText}>Spring</Text>
      </TouchableOpacity>
      
      <View style={{opacity: spring_show_teams? 100:0, height: spring_show_teams? 100:0}}>
        <FlatList style = {{marginTop: 8}} key={'<spring>'} keyExtractor={item => "<spring>" + item.id}
            data={team_data} numColumns={2} keyExtraction={item => item.id} 
            renderItem={({item}) => item.season == "spring"? <SportTeamInfo item={item}></SportTeamInfo>:null
          }
          ></FlatList>
      </View>
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
  },

  seasonTeamList: {
    paddingLeft: 20,
    paddingRight: 40
  },

  seasonTeamWrapperStyle: {
    justifyContent: 'space-between'
  }
  
});
