import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import {Button, Card} from "react-native-elements"
import {withNavigation} from "react-navigation"
function UserGuest(props) {
    const {navigation}=props
    return(
        <ScrollView style={Styles.viewBody} centerContent={true}>
            <Image 
                source={ require("../../../assets/img/logo.png")}
                style={Styles.image}    
            />
            <Text style={Styles.title}> VinComu</Text>
            <Text style={Styles.description}>
                Bienvenido a VinComu.
                con esta aplicacion podras gestionar tu proceso de Trabajo comunitario
            </Text>
            <Card
                title='iniciar Sesion'
                // image={require('../images/pic2.jpg')}
            >
                <Text style={{marginBottom: 10}}>
                        Inicia sesion para acceder a tu perfil
                </Text>
                <Button
                    onPress={()=> (navigation.navigate("Login"))}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Iniciar sesion' 
                />
            </Card>
            {/* <Card
            >
                <Text style={{marginBottom: 10}}>
                    Necesitas mas información sobre el proceso de Trabajo comunitario?
                </Text>
                <Button
                    onPress={()=> (navigation.navigate("More_info"))}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Mas informacón' 
                />
            </Card> */}
        </ScrollView>
    )
}

export default  withNavigation(UserGuest)

const Styles= StyleSheet.create({
    viewBody:{
        marginLeft: 1,
        marginRight: 1,
    },
    image:{
        height: 300,
        width: "100%"
    },
    title:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 19,
        
    },
    description:{
        marginHorizontal: 30,
        textAlign: "justify"
    }

})