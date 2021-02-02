import React from 'react'
import { Text, View, Image,StyleSheet,ScrollView } from 'react-native'

import { Card, ListItem, Button, Icon,Tile  } from 'react-native-elements'






function Place_public(props) {
    // const { user_logout} = useContext(FirebaseContext)
    // const {navigation}= props
    // const logOut=()=>{
    //     user_logout();
    //     navigation.navigate("profile")
    // }
    return(
        <ScrollView centerContent={true} style={styles.view_container}>
        <View style={styles.card_style_1}>
             <View>
                 <Text style={styles.text}>
                     Agrega al mapa tu institucion   
                 </Text>
                 <Icon 
                    type="material-community"
                    name="google-maps"
                    size={100}
                    color='#FFFFFF'
                />
             </View>
             
        </View>
        <View style={styles.card_style_2}>
        <View>
             <Text style={styles.text}>
                  Verifica tus direcciones 
             </Text>
             
             <Icon 
                 type="material-community"
                 name="crosshairs-gps"
                 size={100}
                 color='#FFFFFF'
             />
         </View>
        </View>
    </ScrollView>
    )
}

export default  Place_public

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