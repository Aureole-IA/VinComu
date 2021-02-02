import React, { Component, useState,useContext } from 'react'
import { ScrollView,Text, View, KeyboardAvoidingView,TextInput, StyleSheet,Button ,TouchableOpacity, Alert } from 'react-native'
import{Input, Divider } from "react-native-elements"
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from "react-navigation"
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {firebaseApp} from '../utils/FireBase';
import Loading from '../components/loading'
import firebase from 'firebase/app'
import FirebaseContext from '../context/firebase_context'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
var moment= require('moment')
const cursos=[
    {label: "1°", value: 1},
    {label: "2°", value: 2},
    {label: "3°", value: 3},
    {label: "4°", value: 4},
    {label: "5°", value: 5},
    {label: "6°", value: 6},
    {label: "7°", value: 7},
    {label: "8°", value: 8},
]
const institutions=[]
function Aditional_info(props) {
    const {user_has_data} = useContext(FirebaseContext)
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [pickData, setpickData] = useState("start");
    const [name, setName]= useState("");
    const [ci, setCI]= useState("");
    const [course, setCourse]= useState("");
    const [institution, setInstitution]= useState("");
    const [start_time, setStartTime] = useState("00:00");
    const [end_time, setEndTime] = useState("00:00");
    const [visible, setVisible]= useState(false)
    const {navigation}= props

    const saveData=()=>{
        if (!name || !ci || !course || !start_time || !end_time){
            Alert.alert(
                'Error',
                `Todos los datos son obligatorios`
                )
                
        }else{
            setVisible(true)
            db.collection('users').add(
                {   
                    user_id: firebase.auth().currentUser.uid,
                    name: name,
                    ci: ci,
                    place: false,
                    place_id: false,
                    schedule_start: start_time,
                    schedule_end: end_time,
                    total_hours: 0,
                    course: course
                }
            ).then(()=>{
                setVisible(false)
                user_has_data(true)
                navigation.navigate("profile")
            }).catch(()=>{
                setVisible(false)
                Alert.alert(
                    'Error',
                    `error al actualizar datos intentalo mas tarde`
                    )
            })
        }
      
    }
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let hour=(moment(currentDate).format("HH:mm"))
        if (pickData== "start") {
            
            setStartTime(hour)
        }else{
            setEndTime(hour)
        }
    };
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    
    
    const showTimepicker_start =() => {
        setpickData("start")
        showMode('time');
    };
    const showTimepicker_end =() => {
        setpickData("end")
        showMode('time');
    };
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <ScrollView style={styles.inputContainer}> 
                <View style={styles.info}>
                    <Text style={styles.infoText}></Text>
                </View>
                <View style={styles.inputContainer2}> 
                    <Text style={styles.title_text}>Nombre</Text>
                </View>
                <View style={styles.inputContainer}>
                    
                    <Input
                        onChange={e=>setName(e.nativeEvent.text)}
                        placeholder='nombre apellido'
                        
                    />
                </View>
                <View style={styles.inputContainer2}> 
                    <Text style={styles.title_text}>Cédula</Text>
                </View>
                <View style={styles.inputContainer}>
                    
                    <Input
                        onChange={e=>setCI(e.nativeEvent.text)}
                        placeholder='Cédula'
                        
                    />
                </View>
                <View style={styles.inputContainer2}>
            
                    <Text style={styles.title_text}>Curso</Text>
                        
                    <DropDownPicker
                        items={cursos}
                        placeholder="Seleciona un curso"
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={e => setCourse(e.value)}
                    />
                </View>
                <View style={styles.inputContainer2}>
                    
                    <Text style={styles.title_text}>Horario</Text>
                    <View style={styles.schedule_container}>
                        <Text style={{flex:1}}>Hora de entrada</Text> 
                        <TouchableOpacity style={styles.time_container} onPress={showTimepicker_start}>
                            <Text>{start_time}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.schedule_container}>
                        <Text style={{flex:1}}>Hora de salida</Text> 
                        
                        <TouchableOpacity style={styles.time_container} onPress={showTimepicker_end}>
                            <Text>{end_time}</Text>
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                    
                </View>
                
                <View style={styles.inputContainer2}>
                    <Button 
                    title={"Aceptar"} 
                    onPress={()=> saveData()}
                    //onPress={()=> navigation.navigate('Aditional_Info')}
                    >
                    </Button>
                    
                </View>
            </ScrollView>
            <Loading isVisible={visible} text={"Creando usuario"}/>
        </KeyboardAvoidingView>
    )
}

export default withNavigation(Aditional_info)

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
    }
})