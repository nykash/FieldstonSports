import { StyleSheet, View, Text, Image, ImageBackground, Animated, TouchableOpacity, ScrollView, TouchableHighlight, Touchable, LayoutAnimation, Dimensions, ImageStore, Modal, Pressable, SafeAreaView} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { setFavorite, flipFavorite, isFavorite, refresh_data, store} from '../GlobalVariables';
import {useState, useEffect} from 'react';
import { useRefreshGlobal } from '../GlobalVariables';
import moment from 'moment';
import { convertDateToText } from '../DatesHelper';
import Icon from 'react-native-vector-icons/AntDesign';


export const BGInfoModal = ({item, modalOpen, setModalOpen}) => {
    let {pictures, team_name, id, date, home, away, homeScore, awayScore, homeBadge, awayBadge, gameSummary} = item;
    // pictures = ["https://www.gannett-cdn.com/presto/2022/09/28/PLID/c2e0c3b1-846b-465c-b8a6-c9ad178b768b-Emerson_Seog_2.jpg", 
    // "https://cdn.forumcomm.com/dims4/default/7c26e7f/2147483647/strip/true/crop/4701x3134+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.amazonaws.com%2Fbrightspot%2Fb9%2F25%2F52e2f2ce4a18a0477f631c8f3e85%2F8-30-22prepvolleyballwagnervsmvp-36.jpg",
    //  "https://c.tenor.com/3EQTI8e1gsgAAAAC/spike-andrea-drews.gif", 
    //  "https://thumbs.gfycat.com/AblePreciousBee-size_restricted.gif"]
    // homeBadge = "https://schoolassets.s3.amazonaws.com/logos/49851/49851.png"
    // awayBadge = "https://upload.wikimedia.org/wikipedia/en/c/cf/Horace_Mann_School_emblem.png"
    // gameSummary = "There are many soccer leagues around the world of soccer such as the Spanish League called La Liga. There are many important figures in La Liga including Benzema, Bale, Xavi, and Iniesta. This league has the pleasure of having two world class players known as Lionel Messi (Team: Barcelona) and Cristiano Ronaldo (Team: Real Madrid). These two players are the most marketable and recognizable soccer players in the world. Messi and Ronaldo are very marketable and are considered similar in some aspects; however, they also differ in different aspects. This creates a powerful and marketable rivalry between these two players. Ronaldo brought Real Madrid back to life when he joined them in 2009. He led Madrid to win important titles such as The Champions League. Similarly, Messi revitalized Barcelona when he we joined the main squad from the youth squad. Although Messi similarly revitalized his team like Ronaldo he is different from Ronaldo in his playing style. Both these players brought large levels attention to their league (La Liga) which helped La Liga become one of the most watched soccer league in the world. Cristiano Ronaldo has one two Balon D'ors (world's best player ward) while at Madrid-with the most recent one being in the year 2014. When he first joined Madrid for the price of 95 million euros Madrid was in a crisis. Real Madrid had not won a single trophy at the international level and the situation began to seem like it wouldn't revert itself. However, when Ronaldo arrived he has an immediate effect on Madrid and led them to win La Liga that same year he joined. In his 6th season with Real Madrid. Ronaldo led his team to win the Champions League with his record breaking goals (most goals in a single Champions League). With Ronaldo taking the lead Real Madrid has returned to its place as international world power in the world of soccer. In 2013, Real Madrid surpassed Manchester United (English League Team) as the biggest soccer franchise in the world."
    
    const [idx_photo, set_idx_photo] = useState(0)
    const [touchX, setTouchX] = useState(0)



    return (
        <Modal visible={modalOpen} animationType="slide" transparent={true}>
            <SafeAreaView style={{backgroundColor: "#121212", flex: 1}}>
            <View style={{backgroundColor: "#181818", alignSelf: "flex-start", width: Dimensions.get("window").width, padding: 20, flex: 1, paddingTop: 0}}>
                <View style={{flexDirection: "row", alignItems: "center", flex: 3, backgroundColor: "#121212", width: Dimensions.get("window").width, marginHorizontal: -20, paddingTop: 6}}>

                    <View style={{flexDirection: "row", zIndex: 100, height: "100%", alignItems: "center", justifyContent: "center", position: "absolute"}}>
                        <Pressable onPress={()=>{setModalOpen(false)}}>
                            <Icon name="arrowleft" size="30%" color="#f4f4f4"/>
                        </Pressable>
                    </View>

                    <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center", position: "absolute"}}>
                        <View style={{width: "100%", justifyContent: "center", alignItems: "center", padding: 10, alignSelf: "flex-start"}}>
                            <Text style={{textAlign: "center", color: "#f4f4f4", fontSize: 22, fontFamily: "Oswald_400Regular"}}>{home} vs {away}</Text>
                        </View>
                    </View>
                    
                </View>
                
                <View style={{flexDirection: "column", width: "100%", flex: 5}}>
                    <View style={{flexDirection: "row", flex: 1, alignItems: "center"}}>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 15}}>
                            <Image resizeMode='cover' style={{width:"100%", height: undefined, aspectRatio: 1}} source={{uri: homeBadge}}></Image>
                        </View>

                        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", color: "#f4f4f4", fontSize: 40, fontFamily: "Roboto_400Regular"}}>{homeScore}</Text>
                        </View>

                        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", color: "#f4f4f4", fontSize: 40, fontFamily: "Roboto_400Regular"}}>{awayScore}</Text>
                        </View>

                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 15}}>
                            <Image resizeMode='cover' style={{width:"100%", height: undefined, aspectRatio: 1}} source={{uri: awayBadge}}></Image>
                        </View>
                        
                    </View>

                    
                </View>

                <View style={{flex: 10, marginVertical: "0%"}}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10, overflow: "hidden"}}>
                    <Text style={{color: "#f4f4f4", fontSize: 14, fontWeight: "200", fontFamily: "Lato_400Regular"}}>{gameSummary.slice(0, 450)}</Text>

                </View>
                </ScrollView>
                </View>
               

                <View style={{flex: 8, padding: 7, justifyContent: "center", alignItems: "center"}}>
                    <Pressable style={{width: "100%"}} onTouchStart={e=> setTouchX(e.nativeEvent.pageX)}
                        onTouchEnd={e => {
                            if (touchX - e.nativeEvent.pageX > 20) {
                                if (idx_photo-1 < 0) {set_idx_photo(idx_photo-1+pictures.length)}
                                else { set_idx_photo((idx_photo - 1) % pictures.length) }

                            }

                            if (touchX - e.nativeEvent.pageX < -20) {
                                set_idx_photo((idx_photo + 1) % pictures.length)
                            }
                        }}>
                        
                    <ImageBackground style={{width: "100%",height: "100%", justifyContent: "center", overflow: "hidden"}} imageStyle={{borderRadius: "10%"}}
                     source={{uri: pictures[idx_photo]}} key={pictures[idx_photo]}>
                        {/* <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                            <TouchableOpacity style={{borderRadius: "50%", backgroundColor: "rgba(80, 80,80, 0.5)", alignSelf: "flex-start"}} onPress={() => {set_idx_photo((idx_photo-1)%pictures.length)}}>
                                <Icon name="arrowleft" size={30} color="#f4f4f4" style={{}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius: "50%", backgroundColor: "rgba(80, 80,80, 0.5)", alignSelf: "flex-start"}} onPress={() => {set_idx_photo((idx_photo+1)%pictures.length)}}>
                                <Icon name="arrowright" size={30} color="#f4f4f4" style={{}}/>
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                    </Pressable>
                    <View style={{flexDirection: "row", }}>
                        {
                            pictures.map((item, index) => (
                                <TouchableOpacity style={{borderRadius: "50%", backgroundColor: index==idx_photo? "rgba(240, 240, 240, 1)":"rgba(240, 240, 240, 0.5)", width: 8, height: 8, margin: 5}} onPress={() => set_idx_photo(index)}/>
                            ))
                        }
                    </View>
                </View>
            
            </View>
            </SafeAreaView>
        </Modal>

    )

}

const styles = {
    container: {

    }
}