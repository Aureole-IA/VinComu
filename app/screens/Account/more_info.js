import React from 'react'
import {StyleSheet, View, Image, ScrollView } from 'react-native'
import {Button, Card, Text} from "react-native-elements"
import {withNavigation} from "react-navigation"
function More_info() {
    return (
        <ScrollView>
            <View style={styles.tittle_continer}>
                <Text h4>Práctica Comunitaria</Text>
            </View>
            <View style={styles.text_container}>
                <Text style={styles.text_}>
                Para fines de aprobación del Informe Final de Práctica Comunitaria en la
respectiva Carrera, es recomendable que cada equipo de estudiantes
participantes en el proyecto presente los siguientes documentos en un anillado
o carpeta, así como en un CD con formato PDF:
                </Text>
            </View>
            <View>
            
                
                
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    tittle_continer: {
        justifyContent:"center",
        alignItems: "center"
    },
    text_container:{
        marginHorizontal:10
    },
    text_:{
         textAlign: "justify"
    }

})

export default withNavigation(More_info)
