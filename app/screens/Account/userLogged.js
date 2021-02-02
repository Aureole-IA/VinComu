import React, { useContext,useState,useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView,Alert,TouchableOpacity } from 'react-native'
import FirebaseContext from "../../context/firebase_context"
import {Avatar, Button, Divider,Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from "react-navigation"
import {firebaseApp} from '../../utils/FireBase';
import { AsyncStorage } from 'react-native';
import Loading from '../../components/loading'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
var moment= require('moment/min/moment-with-locales')
    moment.locale('es');
 function Userlogged(props) {
    const { user_logout,user_uid,userHasData, userData,user_has_data,get_user_data,set_new_registry} = useContext(FirebaseContext)
    const [visible, setVisible] = useState(false);
    const [emptyData, setEmptyData] = useState(false);
    const [uid, setUserUid] = useState("-");
    const [user_data, setUserData] = useState(defaultUserData());
    const [summary, setSummary] = useState("");
    const [capital_leter, setCapitalLeter] = useState('U');
    const [init_date, setInitDate] = useState(false);
    const [end_date, setEndDate] = useState(false);
    const [loadingVisible, setLoadingVisible]= useState(false)
    const [minutes, setMinutes] = useState(0);
    const [init_date_real, setInitDate_real] = useState(false);
    
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    const setInitDateStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'today_registry',
            JSON.stringify({date: moment().format()})
            
          );
          setInitDate(moment().format('MMMM Do YYYY, h:mm'))
          setInitDate_real(moment().format())
        } catch (error) {
          
        }
      };

    const set_new_time=( minutes)=>{
        let update_minutes
        update_minutes={ 
            ...user_data,
            total_hours: parseFloat(minutes)
        }
        setUserData(update_minutes)
    }

    const getInitDateStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('today_registry');
          if (value !== null) {
            // We have data!!
            let result =JSON.parse(value)
            setInitDate(moment(result.date).format('LLLL'))
            setInitDate_real(result.date)
          }
        } catch (error) {
            
        }
      };
    const deleteInitDateStorage = async () => {
        const value = await AsyncStorage.removeItem('today_registry');
    }

    const update_user_info=(minute)=>{
        setVisible(false);
        let aux_minutes = parseFloat( user_data.total_hours)+ parseFloat(minute)
        db.collection("users").doc(user_data.id).update({
            total_hours: aux_minutes
        }).then(()=>{
            set_new_time(aux_minutes)
        }).catch((error)=>{
            
        });
    }

    const add_new_registrer=()=>{
        
        setVisible(false);
        setLoadingVisible(true)
        var end=moment()
        setEndDate(end.format())
        var init=moment(init_date_real)
        var duration = moment.duration(end.diff(init));
        var minutes_cal = duration.asMinutes()
        setMinutes(minutes_cal)

        db.collection('registry').add(
            {   
                user_id: firebase.auth().currentUser.uid,
                date: init_date_real,
                start: moment(init_date_real).format('HH:mm'),
                end: moment().format('HH:mm'),
                minutes: minutes_cal,
                summary:summary,
                createAt: new Date()
            }
        ).then((e)=>{

            setInitDate(false)
            setInitDate_real(false)
            update_user_info(minutes_cal)
            deleteInitDateStorage()
            set_new_registry(summary)
            setLoadingVisible(false)
        }).catch(()=>{
            setLoadingVisible(false)
            Alert.alert(
                'Error',
                `error al actualizar datos intentalo mas tarde`
                )
        })
    }



    useEffect(()=>{
        setUserUid(user_uid)
        // setLoadingVisible(true)
        db.collection('users').where('user_id','==',user_uid).limit(1)
        .get().then((response)=>{
            if (response.empty) {
                setEmptyData(true)
                user_has_data(false)
                // navigation.navigate('Aditional_Info')
                return;
            }
            response.forEach((doc)=>{
                const user_data= doc.data();
                user_data.id=doc.id
                user_has_data(true)
                setUserData(user_data)
                get_user_data(user_data)
                setCapitalLeter(user_data.name[0])
            })
            setLoadingVisible(false)
        }).catch(()=>{
            setLoadingVisible(false)
        })
        getInitDateStorage()
        
    },[userHasData])
    const {navigation}= props
    const gotoAddData=()=>{
        navigation.navigate('Aditional_Info')
    }


    const sign_out_alert=()=>{
        Alert.alert(
            'Cerrar Sesión',
            'Saldras de tu cuenta!',
            [
                {
                    text:'salir',
                    onPress: () => logOut()
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }
    const logOut=()=>{
        user_logout()
        navigation.navigate("profile")
    }
    const go_to_documents=()=>{
        navigation.navigate("Documents")
    }
    return(
        <ScrollView centerContent={true}  >
            {/* <Loading isVisible={loadingVisible} text={"Carg ando"}/> */}
            <View style={styles.main_conatiner}>
                <View style={{flex: .4, marginTop: 20}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={styles.center_items}>
                            <Avatar rounded 
                                icon={{name: 'sign-out', type: 'font-awesome'}}  
                                size="medium"
                                onPress={() => sign_out_alert()}
                                activeOpacity={0.7}
                            />
                            <Text style={{color:'#757575'}}> Salir</Text>
                        </View>
                        <View style={styles.center_items}>
                            <Avatar rounded title={capital_leter} size="xlarge"/>
                        </View>
                        <View style={styles.center_items}>
                            <Avatar rounded 
                                icon={{name:"file-word-o", type: 'font-awesome'}}
                                size="medium" 
                                onPress={() => go_to_documents()}
                                activeOpacity={0.7}
                            />
                            <Text style={{color:'#757575'}}>Documentos</Text>
                        </View>
                    
                    </View>
                </View> 
                <View style={styles.info_container}>
                    <View style={styles.center_items}>
                        <Text style={styles.name_text}>
                            {user_data.name}
                            
                        </Text>
                        {
                            userHasData==false&&(
                                <TouchableOpacity 
                                    style={styles.whitoutData} 
                                    onPress={()=>gotoAddData()}>
                                    <Text>Ingresa tus datos</Text>
                                </TouchableOpacity>
                            )
                            
                        }
                    </View>
                    <View style={styles.info_container_2} >
                        <View style={styles.info2_tittle}>
                            <Text style={styles.info2_tittle_text}>Institución:</Text>
                        </View>
                        <View style={styles.info2_data}>
                            <Text style={styles.info2_data_text}>{user_data.place}</Text>
                        </View>
                       
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.info_container_2} >
                        <View style={styles.info2_tittle}>
                            <Text style={styles.info2_tittle_text}>Horas realizadas</Text>
                        </View>
                        <View style={styles.info2_data}>
                            <Text style={styles.info2_data_text}>{getTimeFromMins(user_data.total_hours) }</Text>
                        </View>
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={[styles.center_items,{marginTop:50}]}>
                        {(init_date==false)&&(
                            <Button
                            icon={{
                                name: "date-range",
                                size: 25,
                                color: "white"
                            }}
                            onPress={()=>setInitDateStorage()}
                            title="Registrar inicio"
                            />
                        )}
                        {(init_date!=false)&&(
                            <>
                            <Button
                            icon={{
                                name: "date-range",
                                size: 25,
                                color: "white"
                            }}
                            title="Registrar fin"
                            onPress={toggleOverlay}
                            />
                            <Text>
                                has iniciado Tu actividad en {init_date} 
                            </Text>
                            </>
                        )}
                        
                        
                        
                    </View>
                </View>
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <>
                    <View style={{flex:.8, justifyContent:"center"}}>
                        <Input
                            onChange={e=>setSummary(e.nativeEvent.text)}
                            placeholder='Descripción de la actividad'
                            multiline = {true}
                            numberOfLines = {4}
                            
                        />
                    </View>
                    <View style={{flex:.2, justifyContent:"center"}}>
                        <Button
                            icon={{
                                name: "date-range",
                                size: 25,
                                color: "white"
                            }}
                            title="Registrar fin"
                            onPress={()=>{add_new_registrer()}}
                        />
                    </View>
                </>
            </Overlay>
	
		</ScrollView>
    )
}

function defaultUserData() {
    return{
        name: false,
        place: false,
        total_hours: false
    }
}
function getTimeFromMins(mins) {
    var h = mins / 60 | 0,
    m = mins % 60 | 0;
    h= (h < 10) ? "0" + h : h;
    m= (m < 10) ? "0" + m : m;
    return h + ":" + m 
}

export default withNavigation(Userlogged)
const styles = StyleSheet.create({
    center_items:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    main_conatiner:{
        flex:1,
        backgroundColor: '#B2EBF2'
    },  
    name_text:{
        marginTop: 20,
        marginBottom:20,
        fontSize: 30
    },
    info_container:{
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        marginTop:10,
        flex:.6,
        backgroundColor:'#FFFFFF'
    },
    info_container_2:{
        marginHorizontal:30
    },
    info2_tittle:{
        flex:.3,
        flexDirection:"row"
    },
    info2_data:{
        flex:.3,
        flexDirection:"row-reverse"
    },
    info2_tittle_text:{
        color:'#757575',
        fontSize: 20
    },
    info2_data_text:{
        color:'#212121',
        fontSize: 17
    },
    divider_container:{
        marginVertical: 10,
        marginHorizontal:50
    },
    whitoutData:{
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius: 10, 
        backgroundColor: '#FFEB3B'
    }

})
