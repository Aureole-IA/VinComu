import React from 'react'
import { Text, View, Image,StyleSheet,ScrollView } from 'react-native'

import { Card, ListItem, Button, Icon,Tile  } from 'react-native-elements'


export default function registry_public() {
    return (
       <ScrollView centerContent={true} style={styles.view_container}>
           <View style={styles.card_style_1}>
                <View>
                    <Text style={styles.text}>
                        Revisa Tu asistencia    
                    </Text>
                    <Icon 
                        type="material-community"
                        name="format-list-numbered-rtl"
                        size={100}
                        color='#FFFFFF'
                    />
                </View>
                
           </View>
           <View style={styles.card_style_2}>
           <View>
                <Text style={styles.text}>
                    Genera tu registro de asistencia    
                </Text>
                <Icon 
                        type="material-community"
                        name="file-word"
                        size={100}
                        color='#FFFFFF'
                    />
                {/* <Icon 
                    type="material-community"
                    name="google-maps"
                    size={100}
                    color='#FFFFFF'
                />
                <Icon 
                    type="material-community"
                    name="map-search-outline"
                    size={100}
                    color='#FFFFFF'
                /> */}
            </View>
           </View>
       </ScrollView>
    )
}

const styles=StyleSheet.create({
    view_container:{
        paddingHorizontal:15
    },
    card_style_1:{
        backgroundColor: '#03A9F4',
        borderRadius: 5,
        // flexDirection:"row",
        marginVertical:20
    },
    card_style_2:{
        backgroundColor: '#757575',
        borderRadius: 5,
        // flexDirection:"row",
    },
    text:{
        marginTop:50,
        marginBottom: 20,
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: "center"

    }
    

})