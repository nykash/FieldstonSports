import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import {useState} from "react";
import React from 'react'
import ScheduleComponent from './ScheduleComponent';
import {team_data, set_team_data} from '../Teams.js'


function updateFavorite(setData, obj, id, favorite) {
    const newState = data.map(obj => {
        // 👇️ if id equals 2, update country property
        if (obj.id === id) {
          return {...obj, favorite: favorite};
        }
  
        // 👇️ otherwise return object as is
        return obj;
      });
  
      setData(newState);
}

function updateGeneralTeamData(setData, id, favorite) {
    const newState = data.map(obj => {
        if (obj.id === id) {
          return {...obj, favorite: favorite};
        }
  
        return obj;
      });
  
      setData(newState);
}


const SportTeamInfo = ({item}) => {
    const {id, name, schedule, roster, standings, news, favorite, season} = item;
    const [modalOpen, setModelOpen] = useState(false);

    return (
        <View style={{ height: 100, width: Dimensions.get("window").width/5, padding: 12, borderRadius: 15}}>
            <TouchableOpacity style={styles.teamHeader} onPress={() => {setModelOpen(true)}}>
                <Text style={styles.regText}>{name}</Text>
            </TouchableOpacity>

            <Modal visible={modalOpen}>
                <TouchableOpacity style={styles.homeHeader} onPress={() => {updateGeneralTeamData(set_team_data, id, !favorite)}}>
                    <Text style={styles.regText}>
                        {favorite ? "Remove from Favorites":"Add to Favorites"}
                    </Text>
                </TouchableOpacity>

                <View style={{paddingTop: 0, paddingBottom:10, margin: 0, justifyContent: 'flex-start', backgroundColor: "#242424", flex:1, flexDirection:"column"}}>
                    <TouchableOpacity style={styles.homeHeader} onPress={() => {setModelOpen(false)}}>
                        <Text style={styles.regText}>BACK</Text>
                    </TouchableOpacity>



                    <View style={[styles.homeHeader, {marginTop: 10}]}>
                        <Text style={styles.regText}>Schedule</Text>
                    </View>

                    <View style={{paddingTop: 50, justifyContent: 'center', alignItems: "center"}}>
                        <FlatList contentContainerStyle= {{marginRight: 0}} key={'@'} keyExtractor={item => "@" + item.id} rowWrapperStyle={{}}
                        data={schedule} numColumns={Math.ceil(schedule.length / 2)} keyExtraction={item => item.id} renderItem={({item}) => <ScheduleComponent item={item}></ScheduleComponent>}></FlatList>
                    </View>
                    
                    <View>

                    </View>
                </View>
                
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    homeHeader: {
      padding: 0, width: "100%", top: "5%", height: "10%", 
      backgroundColor: "#093642", justifyContent: "center", 
      alignItems: "center", textAlign: "center"
    },

    teamHeader: {
        padding: 0, width: "100%", top: "5%", height: "80%", 
        justifyContent: "center", 
        alignItems: "center", textAlign: "center"
      },
  
    regText: {
      color: "#ffa319"
    }
  });
  
export default SportTeamInfo;