import React, {useState} from 'react';
import SGInfo from './components/ShortGameInfo';
import MediaInfo from './components/MediaInfo';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView} from 'react-native';

export default function HomeScreen({navigation}) {

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
    <SafeAreaView style={styles.backgroundView}>
      <View style={styles.headerView}>
       <Image
        style={styles.eagleStyle}
        source={require('./assets/eagle.png')}
  />
      </View>
      <View style={styles.gamesView}>
        <View style={styles.homeHeader}>
          <Text style={styles.regText}>Today</Text>
        </View>
      
      <View style={{paddingTop: 20, justifyContent: 'center', alignItems: "center"}}>
        <FlatList style = {{}} key={'_'} keyExtractor={item => "_" + item.id} columnWrapperStyle={{justifyContent: "space-between", marginBottom: 20}}
        data={recent_game_data} numColumns={2} keyExtraction={item => item.id} renderItem={({item}) => <SGInfo item={item}></SGInfo>}></FlatList>
      </View>
      </View>
      <View style={styles.newsView}>
        <View style={styles.homeHeader}>
          <Text style={styles.regText}>Media</Text>
        </View>

        <FlatList style = {{marginTop: 8}} key={'#'} keyExtractor={item => "#" + item.id}
          data={medias} numColumns={1} keyExtraction={item => item.id} renderItem={({item}) => <MediaInfo item={item}></MediaInfo>}></FlatList>
      </View>
    </SafeAreaView>
  );
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
    backgroundColor: "#0b0d0b", flex:1, flexDirection:"column",
  },
  homeHeader: {
    padding: 5, width: "100%",
    backgroundColor: "#0040ff", justifyContent: "center", 
    alignItems: "left", textAlign: "center", borderTopLeftRadius: 20,
    borderTopRightRadius: 20, paddingLeft: 10,
  },
  gamesView: {
    backgroundColor: '#0000ff',
    margin: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  newsView: {
    backgroundColor: '#0000ff',
    margin: 10,
    height: '100%',
    borderRadius: 20,
  },
  regText: {
    color: "#ffa319",
    fontFamily: 'Georgia',
    fontWeight: '800',
    fontSize: 16,
  },
  headerView: {
    width: '100%',
    height: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: '600',
    flex: 1,
  }
});
