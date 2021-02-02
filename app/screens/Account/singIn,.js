import React, { useState, useContext } from 'react'
import { Text, View, KeyboardAvoidingView,TextInput, StyleSheet,Button } from 'react-native'
import{Input, Divider } from "react-native-elements"
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from "react-navigation"
import {validateEmail} from '../../utils/validation'
import Loading from '../../components/loading'
import FirebaseContext from "../../context/firebase_context"
import * as firebase from 'firebase'
function SingIn(props) {
    const {navigation}= props
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [visible, setVisible]= useState(false)
    const [Rpassword, setRPassword]= useState("")
    const { set_user_uid} = useContext(FirebaseContext)
    const registrer =()=>{

        if (!email || !password || !Rpassword) {
            alert("Todos los campos son obligatorios")
        }else{
            if (!validateEmail(email)) {
                alert("Ingresa un correo válido")
            }else{
                if (password!==Rpassword) {
                    alert("Las contraseñas no son iguales")
                }else{
                    setVisible(true)
                    firebase.auth().
                    createUserWithEmailAndPassword(email,password)
                    .then((response)=>{
                        set_user_uid(response.user.uid)
                        navigation.navigate('Aditional_Info')
                        setVisible(false)
                        alert("")
                    })
                    .catch((error)=>{
                        setVisible(false)
                        alert(error)
                    })
                   
                }
            }
        }
    }
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.inputContainer}>
                <Input
                    label={"Email"}
                    onChange={e=> setEmail(e.nativeEvent.text)}
                    placeholder=' New_user@email.com'
                    rightIcon={
                        <Icon
                        iconStyle={styles.icon}
                        name='user'
                        size={24}
                        color='black'
                        />
                    }
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label={"Contraseña"}
                    placeholder=' contraseña'
                    password={true}
                    secureTextEntry={true}
                    onChange={e=> setPassword(e.nativeEvent.text)}
                    rightIcon={
                        <Icon
                        iconStyle={styles.icon}
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label={"Repita su contraseña"}
                    placeholder=' contraseña'
                    password={true}
                    secureTextEntry={true}
                    onChange={e=> setRPassword(e.nativeEvent.text)}
                    rightIcon={
                        <Icon
                        iconStyle={styles.icon}
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                />
            </View>
        

          <View style={styles.button}>
            <Button 
             title={"Ingresar"} 
             onPress={()=> registrer()}
             //onPress={()=> navigation.navigate('Aditional_Info')}
             >
                 
                </Button>
            </View>
            <Loading isVisible={visible} text={"Creando usuario"}/>        
        </KeyboardAvoidingView>
    )
}

export default  withNavigation(SingIn)


const styles = StyleSheet.create({
    container:{
        flex: 1,    
        justifyContent: "center"
    },
    textRegistrer:{
        color:"#757575",
        fontSize: 15,
        marginTop: 15,
        marginLeft: 10,
        marginBottom:15,
        marginRight: 10
    },
    btnRegistrer:{
        color: "#1e88e5",
        fontWeight: "bold",
    },
    icon:{
        marginRight:10,
        marginLeft: 10
    },
    inputContainer:{
      paddingLeft: 10,
      paddingRight: 10, 
      marginBottom: 20
    },
    button:{
      justifyContent:'center',
      paddingTop: 10,
      paddingLeft: 50,
      paddingRight: 50
    },
    logo:{
      
      alignItems: 'center',
      justifyContent: "center"
    }
})