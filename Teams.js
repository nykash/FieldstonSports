import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Image, View, Button, Pressable, TextInput, FlatList, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { favorite_data, team_data, flipFavoriteDataEntry, useRefreshGlobal } from './GlobalVariables';
import SportTeamInfo from './components/SportTeamInfo';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useGlobalState } from 'state-pool';


function getTeamsNameId() {
  let result = []
  for (let i = 0; i < team_data.length; i++) {
    result.push({name: team_data[i].team_name, id: team_data[i].id})
  }

  return result
}


export default function TeamScreen({navigation}) {
    const [text, onChangeText] = React.useState("");
    const [teams_name_id_data, set_teams_id_data] = useState(getTeamsNameId());
    const [should_refresh, set_should_refresh] = useState(false)
    const tot_teams = getTeamsNameId()
    const [refresh_hook, set_refresh_hook] = useRefreshGlobal()

    function refresh() {
      set_should_refresh(!should_refresh)
    }

    async function refresh_glob() {
      set_refresh_hook(!refresh_hook)

    }

    function valid_name(text, name) {
      let text_words = text.toLowerCase().split(" ")
      let name_words = name.toLowerCase().split(" ")

      for (let i = 0; i < text_words.length; i++) {
        let done = false
        for (let j = 0; j < name_words.length & !done; j++) {
          if (name_words[j].includes(text_words[i])) {done=true}
        }

        if (!done) {return false}
      }
      return true
    }

    function filter_teams(text) {
      set_teams_id_data(tot_teams.filter((a) => valid_name(text, a.name)|(text.trim().length === 0)))
    }

    function textChanged(text) {
      onChangeText(text)
      filter_teams(text)
    }

    function starLogic(id) {
      flipFavoriteDataEntry(id)
      refresh()
  //    refresh_glob()
    }


  return (
    <ScrollView style={{backgroundColor: "#242424", height: Dimensions.get("screen").height, padding: 20}}>
      <View style={{marginBottom: "5%", justifyContent: "center", alignItems: "center"}}>
        <Text style={{textAlign: "center", color:"white", fontFamily: "Roboto_400Regular"}}>Search For a Team To Add</Text>
      </View>
  
      <TextInput
        style={styles.input}
        onChangeText={textChanged}
        value={text}
        onFocus={() => (null)}
      />

      <View style={{paddingTop: 13, justifyContent: 'center', alignItems: "center", alignSelf: "flex-start"}}>
        <FlatList style = {{}} key={'<TeamSearch>'} keyExtractor={item => "<TeamSearch>" + item.id}  
        ItemSeparatorComponent={() => <View style={{height: 0}} />} 
        data={teams_name_id_data} 
        scrollEnabled= {false}
        numColumns={1} keyExtraction={item => item.id}
        extraData={set_should_refresh} 
        renderItem={({item}) => 
        <View style={{borderBottomColor: "black", borderBottomWidth: 1}}>
          <TouchableOpacity style={{flexDirection: "row", backgroundColor: "rgba(52, 52, 52, 0.6)", width: Dimensions.get("window").width, padding: 20, paddingRight: 75, height: Dimensions.get("window").height/10, alignItems: "center"}}>
            <View style={{flex: 2}}>
            <Text style={{color: "#f4f4f4", fontFamily: 'Roboto_400Regular'}}>
              {item.name}
            </Text>
            </View>
            
            <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "center"}}>
              <View style={{flex: 1}}>
                <Image style={{height: "100%", width: undefined, aspectRatio: 1}} source={{uri: "https://cdn-icons-png.flaticon.com/512/184/184093.png"}}></Image>
              </View>
              <Pressable onPress={() => (starLogic(item.id))}>
              <View style={{flex: 1}}>
                <Icon name={favorite_data[item.id]? "star":"staro"} size="29" color="#EFE14D"></Icon>
              </View>
              </Pressable>
            </View>


          </TouchableOpacity>
        </View>}>
        </FlatList>
      </View>
      
    </ScrollView>
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
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: "#f4f4f4",
    borderColor: "#f4f4f4"
  },
  
});