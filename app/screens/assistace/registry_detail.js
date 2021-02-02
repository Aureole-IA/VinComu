import React,{useContext,useEffect,useState} from 'react'
import {ScrollView,View, StyleSheet} from 'react-native'
import {withNavigation} from "react-navigation"
import FirebaseContext from "../../context/firebase_context"
import {Card, Button,Text,Icon,Badge ,Divider  } from 'react-native-elements'
import Loading from '../../components/loading'
var moment= require('moment/min/moment-with-locales')
function Registry_detail() {
    const c_registry_detail=useContext(FirebaseContext)
    const {registry_detail}=c_registry_detail
    const [registry_data, setRegistry_data]= useState(defaultData());
    useEffect(()=>{ 
        
        setRegistry_data(registry_detail)
    },[registry_detail])
    if (registry_detail==null) {
        return(
            <Loading isVisible={true} text={"cargando"}/>
        )
    }else{
        return (
            <ScrollView centerContent={true}>
                {/* <Text>{registry_id}</Text>
                <Text>{registry_date}</Text> */}
                <Card
                    title={moment(registry_data.date).format('LLL')}
                    >
                    <View style={{flexDirection:"row", marginVertical:10}}>
                        <View style={{flex: .1}}>
                            <Icon
                                type="material-community" 
                                name='calendar-today'
                                />
                        </View> 
                        <View style={{flex:.6}}>
                            <Text style={{color: '#757575'}}>
                                Resumen de actividad
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.row_container}>
                        <Text style={styles.text}>
                            {registry_data.summary}
                        </Text>
                    </View>
                    
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>


                    <View style={{flexDirection:"row", marginVertical:10}}>
                        <View style={{flex: .1}}>
                            <Icon
                                type="material-community" 
                                name='timelapse'
                                />
                        </View> 
                        <View style={{flex:.6}}>
                            <Text style={{color: '#757575'}} >
                                Tiempo de actividad
                            </Text>
                        </View>
                    </View>



                    <View style={styles.row_container}>
                        <View style={styles.text_container}>
                            <Text style={styles.text}>
                                hora de inicio:
                            </Text>
                        </View>
                        <View style={{flex:.4}}>
                            <View style={styles.time_container}>
                                <Text style={styles.badge_text} >{registry_data.start}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.row_container}>
                        <View style={styles.text_container}>
                            <Text style={styles.text}>
                                hora de fialización:
                            </Text>
                        </View>
                        <View style={{flex:.4}}>
                            <View style={styles.time_container}>
                                <Text style={styles.badge_text} > {registry_data.end}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.row_container}>
                    <Divider style={{ backgroundColor: 'black' }} />
                        <View style={styles.text_container}>
                            <Text style={styles.text}>
                                horas realizadas:
                            </Text>
                        </View>
                        <View style={{flex:.4}}>
                            <View style={styles.time_container}>
                                <Text style={styles.badge_text} > {getTimeFromMins(registry_data.hours)}</Text>
                            </View>
                        </View>
                    </View>
                   
                </Card>
            </ScrollView>
        )
    } 
    
    
}

function defaultData() {
    return{
        date: "2020-07-07T23:47:05-05:00",
        end: "23:53",
        hours: 6.263516666666667,
        id: 2,
        start: "23:47",
        summary: "Uwu",
    }
}
function getTimeFromMins(mins) {
    try {
        var h = mins / 60 | 0,
        m = mins % 60 | 0;
        h= (h < 10) ? "0" + h : h;
        m= (m < 10) ? "0" + m : m;
        return h + ":" + m +" Hr."
    } catch (error) {
        return 0
    }
     
}
export default withNavigation(Registry_detail)

const styles= StyleSheet.create({
    badge_text:{
        textAlign: "center",
        marginHorizontal: 5,
        marginVertical: 3,
        fontSize:20,
        color:'#ffffff'
    },
    text:{
        justifyContent: "center",
        fontSize:16,
        // marginBottom: 10
    },
    text_container:{
        flex:.5,
        justifyContent: "center"
    },
    divider_container:{
        marginVertical: 10
    },
    time_container:{
        backgroundColor: '#0097A7',
        borderRadius: 50
    },
    row_container:{
        flexDirection: 'row',
        marginHorizontal: 20
    }
    
})