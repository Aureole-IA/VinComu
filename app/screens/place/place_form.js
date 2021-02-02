import React,{useEffect,useState,useContext} from 'react'
import { Text, View,ScrollView, KeyboardAvoidingView,TextInput, StyleSheet,Button, TouchableOpacity,Alert } from 'react-native'
import{Input, Divider,Overlay } from "react-native-elements"
import MapView,{Marker} from 'react-native-maps'
import {withNavigation} from "react-navigation"
import { ApiKey} from '../../types'
import Geocoder from 'react-native-geocoding';
import Loading from '../../components/loading'
import firebase from 'firebase/app'
import FirebaseContext from '../../context/firebase_context'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
var moment= require('moment')

function Place_form(props) {
    const {navigation} = props
    const [name, setName]= useState("");
    const [precepName, PrecepName]= useState();
    const [direction_long_lat, setDirection_long_lat ]=useState({
        latitude : -0.2011885, 
        longitude: -78.5016221,
    })
    const [address, setAddress]= useState();
    const [visible,setVisible]= useState(false)
    const [direction_visible,setDVisible]= useState(false)
    const [user_data,setUser_data]= useState(false)
    const { userData,get_user_data,user_has_data} = useContext(FirebaseContext)
    useEffect(()=>{
        Geocoder.init(ApiKey);
        setUser_data(userData)
    })
    const update_user_info=(place_id)=>{
        
        db.collection("users").doc(user_data.id).update({
            place: name,
            place_id: place_id
        }).then(()=>{
            let user_data_aux={
                ...user_data,
                place: name,
                place_id: place_id
            }
            get_user_data(user_data_aux)

        }).catch((error)=>{
           
        });
    }
    const create_place=()=>{
        if (!name || !precepName || !address || !direction_long_lat){
            Alert.alert(
                'Error',
                `Todos los datos son obligatorios`
                )
                
        }else{
            db.collection('place').add(
                {   
                    user_id: firebase.auth().currentUser.uid,
                    name: name,
                    precepName: precepName,
                    direction_long_lat: direction_long_lat,
                    address: address
                }
            ).then((e)=>{
                update_user_info(e.id)
                setVisible(false)

                navigation.goBack()
                user_has_data(true)
                // navigation.navigate("profile")
            }).catch(()=>{
                setVisible(false)
                Alert.alert(
                    'Error',
                    `error al actualizar datos intentalo mas tarde`
                    )
            })
        }
    }
    const getAddress=(direction_long_lat)=>{
        
        let geocode=`${direction_long_lat.latitude},${direction_long_lat.longitude}`;
        
        Geocoder.from(geocode)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            setAddress(addressComponent.long_name)
        })
        .catch(()=>{

        });
    }
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <Loading isVisible={visible} text={"Guardando"}/>
            <ScrollView >
                <View style={{flex:.5}}>
                    <View style={[styles.inputContainer2,{marginTop:15}]}> 
                        <Text style={styles.title_text}>Nombre</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            onChange={e=>setName(e.nativeEvent.text)}
                            placeholder='Nombre de la institución'
                        />
                    </View>

                    <View style={[styles.inputContainer2,{marginTop:15}]}> 
                        <Text style={styles.title_text}>Nombre del preceptor</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            onChange={e=>PrecepName(e.nativeEvent.text)}
                            placeholder='Nombre del preceptor'
                        />
                    </View>
                    <View style={[styles.inputContainer2,{marginTop:15}]}> 
                        <Text style={styles.title_text}>Dirección</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            value={address}
                            placeholder='Dirección'
                            
                            disabled
                        />
                    </View>
                </View>
                
                <View style={{marginBottom:20}}>
                    <TouchableOpacity
                        style={styles.buton_style}
                        onPress={()=>setDVisible(true)}
                        >
                        <Text style={styles.buttontext}>Agregar dirección</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{marginTop:70}}>
                    <TouchableOpacity
                        style={styles.buton_submint_style}
                        onPress={()=>create_place()}
                        >
                        <Text style={styles.buttontext}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
                <Overlay isVisible={direction_visible} >
                    <View style={styles.inputContainer}>
                        <MapView
                            style={styles.mapStyle} 
                            initialRegion = {{
                                latitude : -0.2011885, 
                                longitude: -78.5016221,
                                latitudeDelta: 0.003,
                                longitudeDelta: 0.003
                                }}
                            onPress={(e)=>{
                                setDirection_long_lat(e.nativeEvent.coordinate);
                                getAddress(e.nativeEvent.coordinate)
                            }}
                            >
                            <Marker coordinate={direction_long_lat} 
                               
                            />
                        </MapView>
                        <View style={styles.inputContainer}>
                            <Input
                                value={address}
                                placeholder='Dirección'
                                
                                disabled
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buton_style}
                            onPress={()=>setDVisible(false)}
                            >
                            <Text style={styles.buttontext}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default withNavigation(Place_form)

const styles = StyleSheet.create({
    container:{
        flex: 1,    
        justifyContent: "center"
    },
    btnRegistrer:{
        color: "#1e88e5",
        fontWeight: "bold",
    },
    info:{
        padding: 15
    },
    infoText:{
        fontSize: 20
    },
    inputContainer:{
      paddingLeft: 10,
      paddingRight: 10, 
      marginBottom: 20
    },
    inputContainer2:{
        paddingLeft: 20,
        paddingRight: 20, 
        marginBottom: 20
      },
    button:{
      justifyContent:'center',
      paddingTop: 10,
      paddingLeft: 50,
      paddingRight: 50
    },
    title_text:{
        fontWeight: "bold",
        fontSize: 15
    },
    time_container:{
        flex:1, 
        alignItems:"center",
        backgroundColor: 'rgba(176,190,197,0.5)',
        borderRadius: 10
    },institution_info:{
        fontStyle:"italic",
        paddingLeft: 40,
        fontSize: 10,
        
    },
    schedule_container:{
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    mapStyle:{
        width: "100%",
        height: 400
    },
    buton_style:{
        flex:1,
        marginHorizontal: 30,
        paddingVertical:10,
        borderRadius: 50,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent:"center",
        alignItems: "center"
    },
    buton_submint_style:{
        flex:1,
        marginHorizontal: 30,
        paddingVertical:10,
        borderRadius: 50,
        backgroundColor: "rgba(0, 30,97, 0.3)",
        justifyContent:"center",
        alignItems: "center"
    },
    buttontext:{
        fontSize:15
    }

})