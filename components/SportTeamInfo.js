import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList} from 'react-native'
import {useState} from "react";
import React from 'react'
import ScheduleComponent from './ScheduleComponent';

const SportTeamInfo = ({item}) => {
    const {id, name, schedule, roster, standings, news} = item;
    const [modalOpen, setModelOpen] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.teamHeader} onPress={() => {setModelOpen(true)}}>
                <Text style={styles.regText}>{name}</Text>
            </TouchableOpacity>

            <Modal visible={modalOpen}>
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
        backgroundColor: "#093642", justifyContent: "center", 
        alignItems: "center", textAlign: "center"
      },
  
    regText: {
      color: "#ffa319"
    }
  });
  
export default SportTeamInfo;