import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, TouchableHighlight, Touchable, LayoutAnimation, Dimensions} from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import SGInfo from './ShortGameInfo';
import MediaInfo from './MediaInfo';
import { RosterComponent } from './RosterComponent';
import CardFlip from 'react-native-card-flip';


export const MyFeedComponent = ({item}) => {
    const {media, game, name} = item

    const roster = ['Antony Mendez', 'Shane Vang', 'Courtney Paul', 'Saniyah Crosby', 'Raiden Graves', 'Aryanna Pena', 'Maurice Burke', 'Kallie Fitzpatrick', 'Hana Carson', 'Elizabeth Michael', 'Savion Lewis', 'Jaliyah Frank']
    const [this_card, set_this_card] = useState(null);
    const border_radius = 30;
    return (
        <View style={{}}>
            <View style={{width: Dimensions.get("window").width, padding: 20, borderRadius: border_radius, backgroundColor: "rgba(52, 52, 52, 0.4)"}}>
            <CardFlip style={{height:Dimensions.get("window").height/3, padding: 0, borderRadius: border_radius}} ref={(card) => set_this_card(card)} >
                <TouchableOpacity style={{}} onPress={() => this_card.flip()}>
                <ImageBackground style={{borderRadius: border_radius}} resizeMode="cover" source={{uri: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt7303dbbd1a3d1a0f/60dc14d30401cb0ebfac1a00/40a30288ba7955266913a7414a3f5473a09070f2.jpg"}}>
                    <View style={{height:Dimensions.get("window").height/3, justifyContent:"center", alignItems:"center", backgroundColor: "rgba(52, 52, 52, 0.6)"}}>
                        <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 20}}>{name.name}</Text>
                    </View>
                </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 0}} onPress={() => this_card.flip()}>
                <ImageBackground style={{}} resizeMode="cover" source={{uri: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt7303dbbd1a3d1a0f/60dc14d30401cb0ebfac1a00/40a30288ba7955266913a7414a3f5473a09070f2.jpg"}}>
                    <View style={{height:Dimensions.get("window").height/3, width: Dimensions.get("screen").width, justifyContent:"center", alignItems:"center", backgroundColor: "rgba(52, 52, 52, 0.90)"}}>
                        
                        <View style={{justifyContent: "center", alignItems: "center", paddingLeft: 30, paddingRight: 30}}>
                            <FlatList style = {{marginTop: 8, width: Dimensions.get("screen").width-60}} key={'<Roster>'} keyExtractor={item => "<Roster>" + item} scrollEnabled={false}
                            data={roster} numColumns={3}
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            keyExtraction={item => item.id} renderItem={({item}) => 
                            <View>
                                <Text style={{textAlign: "center", color: "#f4f4f4", fontFamily: 'Roboto_400Regular', fontSize: 11}}>{item}</Text>
                            </View>}
                            ItemSeparatorComponent={() => <View style={{height: Dimensions.get("screen").height/50}} />} 
                            ></FlatList>
                        </View>
                        
                    </View>
                </ImageBackground>
                </TouchableOpacity>
            </CardFlip>
            </View>

            <View style={{height: Dimensions.get("window").height/30}}></View>
            
            <View style={{width: Dimensions.get("window").width, padding: 20, borderRadius: border_radius, backgroundColor: "rgba(52, 52, 52, 0.4)"}}>
                <SGInfo item={game}></SGInfo>
            </View>
            <View style={{height: Dimensions.get("window").height/30}}></View>

            <View style={{width: Dimensions.get("window").width, padding: 20, borderRadius: border_radius, backgroundColor: "rgba(52, 52, 52, 0.4)"}}>
                <RosterComponent item={{team_name: name}}></RosterComponent>
            </View>
            <View style={{height: Dimensions.get("window").height/30}}></View>


            <MediaInfo border_radius={border_radius} item={media}></MediaInfo> 
            
        </View>
    )
}