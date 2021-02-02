import React, {useState,useEffect,useContext } from 'react'
import { Text, View,ScrollView, KeyboardAvoidingView,TextInput, StyleSheet,Button } from 'react-native'
import{Card } from "react-native-elements"
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from "react-navigation"
import MapView,{Marker} from 'react-native-maps'
import FirebaseContext from "../../context/firebase_context"
import firebase from 'firebase/app'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
function Place_user(props) {
    const {navigation}= props
    const [user_has_place, setUserHasplace] = useState(false)
    const [place_data, setPlaceData] = useState(defaultUserPlace())
    const {userData} = useContext(FirebaseContext)
    useEffect(()=>{
        
        if (userData.place==false) {
            
        }else{
            try {
                db.collection('place').where('user_id','==',userData.user_id).limit(1)
                .get().then((response)=>{
                    if (response.empty) {
                    
                        return;
                    }
                    response.forEach((doc)=>{
                        setPlaceData(doc.data())
                    })
                    setUserHasplace(true)
                }).catch(e=>{
                   
                })
            } catch (error) {
                
            }
            
        }
    },[userData.place])
    return(
        <View style={{flex:1}}>
            <View>
                
                {
                  (user_has_place!=false) &&( <>
                        <View style={styles.infoContainer} >
                            <View style={styles.info_tittle}>
                                <Text style={styles.info_tittle_text}>Institución:</Text>
                            </View>
                            <View style={styles.info_data}>
                                <Text style={styles.info_data_text}>{place_data.name}</Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer} >
                            <View style={styles.info_tittle}>
                                <Text style={styles.info_tittle_text}>Dirección:</Text>
                            </View>
                            <View style={styles.info_data}>
                                <Text style={styles.info_data_text}>{place_data.address}</Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer} >
                            <View style={styles.info_tittle}>
                                <Text style={styles.info_tittle_text}>Preceptor</Text>
                            </View>
                            <View style={styles.info_data}>
                                <Text style={styles.info_data_text}>{place_data.precepName}</Text>
                            </View>
                        </View>
                    </>)
                }
                {(user_has_place==false)&&(
                        <View style={styles.button_container} >
                
                            <Text style={styles.info_tittle_text}>No tienes un lugar asignado</Text>
                        
                            <Button 
                                title={'Asignar un lugar'}
                                onPress={()=> navigation.navigate('place_form')}
                            >
                            </Button>
                        </View>)}
                
                
            </View>
            <ScrollView>
            
                <View>
                    <Card>
                        <MapView
                        style={styles.mapStyle} 
                        initialRegion = {{
                            latitude : -0.2011885, 
                            longitude: -78.5016221,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003
                            }}
                        region={{
                            
                            latitude : place_data.direction_long_lat.latitude, 
                            longitude: place_data.direction_long_lat.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003
                            }}
                        >
                            {(user_has_place!=false)&&(
                                    <Marker coordinate={place_data.direction_long_lat}  />
                                )}
                            
                        </MapView>
                        
                    </Card>
                </View>
                
            </ScrollView>
                
        </View>
        
    )
}
function defaultUserPlace() {
    return{
        address: false,
        direction_long_lat: {
            latitude : -0.2011885, 
            longitude: -78.5016221,
        },
        precepName: false,
        name: false
    }
}

export default  withNavigation(Place_user)

const styles = StyleSheet.create({
    mapContainer:{
        marginHorizontal:10,
        flex:1
    },
    mapStyle:{
        width: "100%",
        height: 400
    },
    infoContainer:{
        marginHorizontal:30,
        marginVertical:10,
        flexDirection:"row"
    },
    info_tittle:{
        flex:.3,
        backgroundColor: '#C5CAE9',
        paddingHorizontal:15,
        borderBottomEndRadius: 50
    },
    info_tittle_text:{
        color:'#757575',
        fontSize: 15
    },
    info_data:{
        flex:.7,
        borderBottomWidth:2,
        borderBottomColor: '#BDBDBD'
    },
    info_data_text:{
        marginHorizontal:15,
        color:'#212121',
        fontSize: 15
    },
    button_container:{
        marginHorizontal: 30,
        
    }

})