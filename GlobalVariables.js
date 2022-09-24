import GlobalStore from 'react-native-global-state-hooks';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import {useAsyncEffect} from 'use-async-effect'
import * as SecureStore from 'expo-secure-store'
import { Dimensions } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyC352iiXQYJ_lsY8idqN0fe6AzGQBJoF2E",
  authDomain: "fieldston-sports.firebaseapp.com",
  projectId: "fieldston-sports",
  storageBucket: "fieldston-sports.appspot.com",
  messagingSenderId: "397097850233",
  appId: "1:397097850233:web:97bd25efc5c15e280a4ba8",
  measurementId: "G-DE1G3LBMZT"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();

const refresh = new GlobalStore(false);

export const useRefreshGlobal = refresh.getHook();
export const today = "7/17/2022"

export let refresh_database = false;

export let recent_game_data = [

]

export async function saveToDevice(key, value) {
    console.log("KEY VAL KEY VAL")
    console.log(key)
    console.log(value)
    await SecureStore.setItemAsync(key, JSON.stringify(value))
}

export async function loadFromDevice(key, val="") {
    const result = await SecureStore.getItemAsync(key)

    return JSON.parse(result);
}
  
export let medias = [

]
// export let team_data = [
//     {name:"BVS", id:"BVSF", schedule: [
//         {id: "G-BVS", date: "7/16/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
//         {id: "G-BVS", date: "7/15/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
//         {id: "G-BVS", date: "7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Riverdale", homeScore: 3, awayScore: 2},
//         {id: "G-BVS", date: "7/11/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1},
//         {id: "G-BVS", date: "7/21/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-BVS", date: "7/25/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Dalton",},
//         {id: "G-BVS", date: "7/29/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Riverdale",},
//         {id: "G-BVS", date: "8/2/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-BVS", date: "8/5/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {id: "M-BVS", date: "7/10/2022", title: "Boys Varity Soccer Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-BVS", date: "7/11/2022", title: "Boys Varity Soccer Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-BVS", date: "7/12/2022", title: "Boys Varity Soccer MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: [], standings: [], season: 'fall', team_name:"Boys Varsity Soccer"
//     },

//     {name:"VGL", id:"VGLS", schedule: [
//         {id: "G-VGL", date: "7/18/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Poly", homeScore: 9, awayScore: 1},
//         {id: "G-VGL", date: "7/14/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Dalton", homeScore: 5, awayScore: 4},
//         {id: "G-VGL", date: "7/12/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Riverdale", homeScore: 8, awayScore: 3},
//         {id: "G-VGL", date: "7/6/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley", homeScore: 3, awayScore: 1},
//         {id: "G-VGL", date: "7/21/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-VGL", date: "7/25/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Dalton",},
//         {id: "G-VGL", date: "7/29/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Riverdale",},
//         {id: "G-VGL", date: "8/2/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-VGL", date: "8/5/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {id: "M-VGL", date: "7/12/2022", title: "Girls Varity Lacrosse Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-VGL", date: "7/10/2022", title: "Girls Varity Lacrosse Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-VGL", date: "7/5/2022", title: "Girls Varity Lacrosse MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: [], standings: [], season: 'spring', team_name: "Varsity Girls Lacrosse"
//     },

//     {name:"JVV", id:"JVVF", schedule: [
//         {id: "G-VVF", date: "7/18/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
//         {id: "G-VVF", date: "7/17/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
//         {id: "G-VVF", date: "7/16/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
//         {id: "G-VVF", date: "7/12/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1},
//         {id: "G-VVF", date: "7/21/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley",},
//         {id: "G-VVF", date: "7/25/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Dalton",},
//         {id: "G-VVF", date: "7/29/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Riverdale",},
//         {id: "G-VVF", date: "8/2/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley",},
//         {id: "G-VVF", date: "8/5/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Collegiate",},
//     ], news: [
//         {id: "M-VVF", date: "7/16/2022", title: "JV Volleybal Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-VVF", date: "7/14/2022", title: "JV Volleybal Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-VVF", date: "7/10/2022", title: "JV Volleybal MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: [], standings: [], season: 'fall', team_name: "JV Volleyball"
//     },

//     {name:"GVS", id:"GVSF", schedule: [
//         {id: "G-GVS", date: "7/5/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
//         {id: "G-GVS", date: "7/6/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
//         {id: "G-GVS", date: "7/10/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Riverdale", homeScore: 2, awayScore: 3},
//         {id: "G-GVS", date: "7/15/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley", homeScore: 6, awayScore: 1},
//         {id: "G-GVS", date: "7/21/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-GVS", date: "7/25/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton",},
//         {id: "G-GVS", date: "7/29/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Riverdale",},
//         {id: "G-GVS", date: "8/2/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {id: "G-GVS", date: "8/5/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {id: "M-GVS", date: "7/4/2022", title: "Girls Varity Soccer Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-GVS", date: "7/9/2022", title: "Girls Varity Soccer Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-GVS", date: "7/12/2022", title: "Girls Varity Soccer MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: [], standings: [], season: 'fall', team_name: "Girls Varsity Soccer"
//     },
//     {name:"JVF", id:"JVFF", schedule: [
//         {id: "G-JVF", date: "7/12/2022", title: "Football (JV)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1},
//         {id: "G-JVF", date: "7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0},
//         {id: "G-JVF", date: "7/16/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3},
//         {id: "G-JVF", date: "7/17/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1},
//         {id: "G-JVF", date: "7/21/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley",},
//         {id: "G-JVF", date: "7/25/2022", title: "Football (JV)", home: "Fieldston", away: "Dalton",},
//         {id: "G-JVF", date: "7/29/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale",},
//         {id: "G-JVF", date: "8/2/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley",},
//         {id: "G-JVF", date: "8/5/2022", title: "Football (JV)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {id: "M-JVF", date: "7/10/2022", title: "JV Football Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-JVF", date: "7/14/2022", title: "JV Football Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {id: "M-JVF", date: "7/15/2022", title: "JV Football MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: [], standings: [], season: 'fall', team_name: "JV Football"
//     },

// ]


//export let team_data = [];
export let team_data = []
export function setTeamData(data) {
    team_data = data
    createRecentGameData()
    createMediaData()
}

export async function setFavoriteData(data) {
    favorite_data = data
    console.log(data)
    await saveToDevice("favorite_data", favorite_data)
}

function initDatabaseValues() {
    setDoc(doc(firestore, "mega_data", "teams"), {"data": team_data});
}


function pullDatabaseValuesTeamData() {
    return getDoc(doc(firestore, "mega_data", "teams"));
}

//initDatabaseValues()

//initDatabaseValues()
//export let team_data = pullDatabaseValuesTeamData()


export function createRecentGameData() {
    recent_game_data = []
    for (let i = 0; i < team_data.length; i++) {
        for (let j = 0; j < team_data[i].schedule.length; j++) {
            const completed_game = "awayScore" in team_data[i].schedule[j] && "homeScore" in team_data[i].schedule[j]
          //  if (!("awayScore" in team_data[i].schedule[j] && "homeScore" in team_data[i].schedule[j])) {continue}
            let new_data = team_data[i].schedule[j]
            new_data.team_id = team_data[i].id
            new_data.completed = completed_game
            recent_game_data.push(new_data)
        }
    }
}


export function getRecentCompletedGames() {
    return recent_game_data.filter((item) => "awayScore" in item && "homeScore" in item)
}

export function getRecentUncompletedGames() {
    return recent_game_data.filter((item) => !("awayScore" in item && "homeScore" in item))
}

export function createMediaData() {
    medias = []
    for (let i = 0; i < team_data.length; i++) {
        for (let j = 0; j < team_data[i].news.length; j++) {
            let new_data = team_data[i].news[j]
            new_data.team_id = team_data[i].id
            medias.push(new_data)
        }
    }
}


export let favorite_data = {

}

export function createFavoriteData() {

    for (let i = 0; i < team_data.length; i++) {

        favorite_data[team_data[i].id] = team_data[i].favorite
    }
}

export let refresh_data = 0;

export function isFavorite(team_id) {
    for (let i = 0; i < team_data.length; i++) {
        if (team_data[i].id != team_id) {continue}

        return team_data[i].favorite
    }

    return false
}

export function flipFavorite(team_id) {

    for (let i = 0; i < team_data.length; i++) {
        if (team_data[i].id != team_id) {continue}

        team_data[i].favorite = !team_data[i].favorite
        favorite_data[team_data[i].id] = team_data[i].favorite
        console.log(favorite_data)
        return
    }
}

export function setFavorite(team_id, value) {

    for (let i = 0; i < team_data.length; i++) {
        if (team_data[i].id != team_id) {continue}

        team_data[i].favorite = value
        favorite_data[team_data[i]] = team_data[i].favorite
        createFavoriteData()
        return
    }
}

export function getFavoriteGames(elements) {
    let favorite_games = [] 
    for (let i = 0; i < elements.length; i++) {
        if(favorite_data[elements[i].team_id]) {favorite_games.push(elements[i])}
        console.log("L BOZO")
        console.log(favorite_data[elements[i].team_id])
        console.log(elements[i].team_id)
    }

    console.log(favorite_games)

    return favorite_games
}

export function getFavoriteMedias() {
    let favorite_medias = [] 
    for (let i = 0; i < medias.length; i++) {
        if(favorite_data[medias[i].team_id]) {favorite_medias.push(medias[i])}
    }

    return favorite_medias
}

export function getTeamDataByName(name) {
    for (let i = 0; i < team_data.length; i++) {
        if (team_data.team_id == name) {
            return team_data[i]
        }
    }
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export async function flipFavoriteDataEntry(key) {
    favorite_data[key] = !favorite_data[key]
    await saveToDevice("favorite_data", favorite_data)
}

