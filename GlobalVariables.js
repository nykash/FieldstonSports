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
//         {team_id: "BVSF", id: "G-BVS", date: "7/16/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "BVSF", id: "G-BVS", date: "7/15/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "BVSF", id: "G-BVS", date: "7/13/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Riverdale", homeScore: 3, awayScore: 2, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "BVSF", id: "G-BVS", date: "7/11/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "BVSF", id: "G-BVS", date: "7/21/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "BVSF", id: "G-BVS", date: "7/25/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Dalton",},
//         {team_id: "BVSF", id: "G-BVS", date: "7/29/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Riverdale",},
//         {team_id: "BVSF", id: "G-BVS", date: "8/2/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "BVSF", id: "G-BVS", date: "8/5/2022", title: "Boys Soccer (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {team_id: "BVSF", id: "M-BVS", date: "8/12/2022", title: "Boys Varity Soccer MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "BVSF", id: "M-BVS", date: "7/10/2022", title: "Boys Varity Soccer Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "BVSF", id: "M-BVS", date: "7/11/2022", title: "Boys Varity Soccer Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "BVSF", id: "M-BVS", date: "7/12/2022", title: "Boys Varity Soccer MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: {img: "https://www.usab.com/-/media/754cd0a2af6846709878f30d7a9f1c77.jpg?h=600&iar=0&w=1280&hash=BD750D0F7762AF8139C8C2E24957C5A6", players: 
//         ['Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
//       }, standings: [], season: 'fall', team_name:"Boys Varsity Soccer",
//         pictures: [
//             {team_id: "BVSF", id:"P-BVS", date: "8/1/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "BVSF", caption: "wow this picture is a picture and its cool"},
//             {team_id: "BVSF", id:"P-BVS", date: "7/12/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "BVSF", caption: "wow this picture is a picture and its cool"},
//         ]
//     },

//     {name:"VGL", id:"VGLS", schedule: [
//         {team_id: "VGLS", id: "G-VGL", date: "7/18/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Poly", homeScore: 9, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "VGLS", id: "G-VGL", date: "7/14/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Dalton", homeScore: 5, awayScore: 4, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "VGLS", id: "G-VGL", date: "7/12/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Riverdale", homeScore: 8, awayScore: 3, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "VGLS", id: "G-VGL", date: "7/6/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley", homeScore: 3, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "VGLS", id: "G-VGL", date: "7/21/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "VGLS", id: "G-VGL", date: "7/25/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Dalton",},
//         {team_id: "VGLS", id: "G-VGL", date: "7/29/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Riverdale",},
//         {team_id: "VGLS", id: "G-VGL", date: "8/2/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "VGLS", id: "G-VGL", date: "8/5/2022", title: "Girls Lacrosse (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {team_id: "VGLS", id: "M-VGL", date: "8/0/2022", title: "Girls Varity Lacrosse Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "VGLS", id: "M-VGL", date: "7/12/2022", title: "Girls Varity Lacrosse Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "VGLS", id: "M-VGL", date: "7/10/2022", title: "Girls Varity Lacrosse Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "VGLS", id: "M-VGL", date: "7/5/2022", title: "Girls Varity Lacrosse MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: {img: "https://www.usab.com/-/media/754cd0a2af6846709878f30d7a9f1c77.jpg?h=600&iar=0&w=1280&hash=BD750D0F7762AF8139C8C2E24957C5A6", players: 
//         ['Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
//       }, standings: [], season: 'spring', team_name: "Varsity Girls Lacrosse",
//       pictures: [
//           {team_id: "VGLS", id:"P-VGL", date: "7/18/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "VGLS", caption: "wow this picture is a picture and its cool"},
//           {team_id: "VGLS", id:"P-VGL", date: "7/5/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "VGLS", caption: "wow this picture is a picture and its cool"},
//       ]
//     },

//     {name:"JVV", id:"JVVF", schedule: [
//         {team_id: "JVVF", id: "G-VVF", date: "7/18/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVVF", id: "G-VVF", date: "7/17/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVVF", id: "G-VVF", date: "7/16/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVVF", id: "G-VVF", date: "7/12/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVVF", id: "G-VVF", date: "7/21/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley",},
//         {team_id: "JVVF", id: "G-VVF", date: "7/25/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Dalton",},
//         {team_id: "JVVF", id: "G-VVF", date: "7/29/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Riverdale",},
//         {team_id: "JVVF", id: "G-VVF", date: "8/2/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Hackley",},
//         {team_id: "JVVF", id: "G-VVF", date: "8/5/2022", title: "Volleyball (JV)", home: "Fieldston", away: "Collegiate",},
//     ], news: [
//         {team_id: "JVVF", id: "M-VVF", date: "8/1/2022", title: "JV Volleybal Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},

//         {team_id: "JVVF", id: "M-VVF", date: "7/16/2022", title: "JV Volleybal Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "JVVF", id: "M-VVF", date: "7/14/2022", title: "JV Volleybal Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "JVVF", id: "M-VVF", date: "7/10/2022", title: "JV Volleybal MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: {img: "https://www.usab.com/-/media/754cd0a2af6846709878f30d7a9f1c77.jpg?h=600&iar=0&w=1280&hash=BD750D0F7762AF8139C8C2E24957C5A6", players: [
//         'Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
// }, standings: [], season: 'fall', team_name: "JV Volleyball",
//       pictures: [
//         {team_id: "JVVF", id:"P-BVS", date: "7/2/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "JVVF", caption: "wow this picture is a picture and its cool"},
//         {team_id: "JVVF", id:"P-BVS", date: "7/18/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "JVVF", caption: "wow this picture is a picture and its cool"},
//     ]
//     },

//     {name:"GVS", id:"GVSF", schedule: [
//         {team_id: "GVSF", id: "G-GVS", date: "7/5/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "GVSF", id: "G-GVS", date: "7/6/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "GVSF", id: "G-GVS", date: "7/10/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Riverdale", homeScore: 2, awayScore: 3, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "GVSF", id: "G-GVS", date: "7/15/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley", homeScore: 6, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "GVSF", id: "G-GVS", date: "7/21/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "GVSF", id: "G-GVS", date: "7/25/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Dalton",},
//         {team_id: "GVSF", id: "G-GVS", date: "7/29/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Riverdale",},
//         {team_id: "GVSF", id: "G-GVS", date: "8/2/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Hackley",},
//         {team_id: "GVSF", id: "G-GVS", date: "8/5/2022", title: "Girls Soccer (V)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//          {team_id: "GVSF", id: "M-GVS", date: "8/12/2022", title: "Girls Varity Soccer Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "GVSF", id: "M-GVS", date: "7/4/2022", title: "Girls Varity Soccer Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "GVSF", id: "M-GVS", date: "7/9/2022", title: "Girls Varity Soccer Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "GVSF", id: "M-GVS", date: "7/12/2022", title: "Girls Varity Soccer MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: {img: "https://www.usab.com/-/media/754cd0a2af6846709878f30d7a9f1c77.jpg?h=600&iar=0&w=1280&hash=BD750D0F7762AF8139C8C2E24957C5A6", players: 
//         ['Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
//       }, standings: [], season: 'fall', team_name: "Girls Varsity Soccer",
//       pictures: [
//         {team_id: "GVSF", id:"P-BVS", date: "7/5/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "GVSF", caption: "wow this picture is a picture and its cool"},
//         {team_id: "GVSF", id:"P-BVS", date: "8/5/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "GVSF", caption: "wow this picture is a picture and its cool"},
//     ]
//     },
//     {name:"JVF", id:"JVFF", schedule: [
//         {team_id: "JVFF", id: "G-JVF", date: "7/12/2022", title: "Football (JV)", home: "Fieldston", away: "Poly", homeScore: 7, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVFF", id: "G-JVF", date: "7/13/2022", title: "Football (JV)", home: "Fieldston", away: "Dalton", homeScore: 9, awayScore: 0, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVFF", id: "G-JVF", date: "7/16/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale", homeScore: 31, awayScore: 3, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVFF", id: "G-JVF", date: "7/17/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley", homeScore: 2, awayScore: 1, pictures:"https://media0.giphy.com/media/5C6ZE1ehlCuze/giphy.gif"},
//         {team_id: "JVFF", id: "G-JVF", date: "7/21/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley",},
//         {team_id: "JVFF", id: "G-JVF", date: "7/25/2022", title: "Football (JV)", home: "Fieldston", away: "Dalton",},
//         {team_id: "JVFF", id: "G-JVF", date: "7/29/2022", title: "Football (JV)", home: "Fieldston", away: "Riverdale",},
//         {team_id: "JVFF", id: "G-JVF", date: "8/2/2022", title: "Football (JV)", home: "Fieldston", away: "Hackley",},
//         {team_id: "JVFF", id: "G-JVF", date: "8/5/2022", title: "Football (JV)", home: "Fieldston", away: "Collegiate",},
//       ], news: [
//         {team_id: "JVFF", id: "M-JVF", date: "8/3/2022", title: "JV Football Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "JVFF", id: "M-JVF", date: "7/10/2022", title: "JV Football Dominate Season", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "JVFF", id: "M-JVF", date: "7/14/2022", title: "JV Football Overwhelm Tournament", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//         {team_id: "JVFF", id: "M-JVF", date: "7/15/2022", title: "JV Football MVP Candidates", blurb: "This is some sample text and should be the approprite length for a summary/hook to an article."},
//       ], roster: {img: "https://www.usab.com/-/media/754cd0a2af6846709878f30d7a9f1c77.jpg?h=600&iar=0&w=1280&hash=BD750D0F7762AF8139C8C2E24957C5A6", players: [
//         'Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
//       }, standings: [], season: 'fall', team_name: "JV Football",
//       pictures: [
//         {team_id: "JVFF", id:"P-BVS", date: "8/1/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "JVFF", caption: "wow this picture is a picture and its cool"},
//         {team_id: "JVFF", id:"P-BVS", date: "7/25/2022", url: "https://i.ytimg.com/vi/tUzcjhn-4NI/maxresdefault.jpg", team_id: "JVFF", caption: "wow this picture is a picture and its cool"},
//     ]
//     },

// ]

export let team_data = [];

//export let team_data = []
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
    return favorite_data[team_id]
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


export function getTeamIndexId(id) {
    return team_data.map((e) => e.id).indexOf(id)
}