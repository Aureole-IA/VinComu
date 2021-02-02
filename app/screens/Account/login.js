import React, { Component, useState,useEffect,useContext } from 'react'
import { Text, View, KeyboardAvoidingView,TextInput, StyleSheet,Button } from 'react-native'
import{Input } from "react-native-elements"
import {validateEmail} from '../../utils/validation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/loading'
import {withNavigation} from "react-navigation"
import FirebaseContext from '../../context/firebase_context'
import * as firebase from 'firebase'
function Login(props) {
    const {navigation}= props
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const {user_is_login,get_user_data} = useContext(FirebaseContext)
    const [load, setLoad]=useState(false)
    const [visible, setVisible] = useState(false);
    const login = ()=>{
        if (!email || !password) {
            alert("Todos los campos son obligatorios")
        }else if (!validateEmail(email)) {
            alert("Email incorrecto")
        }else{
            setVisible(true);
            
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user)=>{
                user_is_login();
                setVisible(false);
                navigation.navigate("profile")

            }).catch(()=>{
                setVisible(false);
                alert('Email o contraseña incorrecta')
            })
            
            
        }
    }
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <CreateAccout navigation={navigation}/>
                <View style={styles.inputContainer}>
                    <Input
                        label={"Email"}
                        placeholder=' user@email.com'
                        rightIcon={
                            <Icon
                            iconStyle={styles.icon}
                            name='user'
                            size={24}
                            color='black'
                            />
                        }
                        onChange={e=> setEmail(e.nativeEvent.text)}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Input
                        label={"Contraseña"}
                        placeholder=' ingresa contraseña'
                        password={true}
                        secureTextEntry={true}
                        rightIcon={
                            <Icon
                            iconStyle={styles.icon}
                            name='lock'
                            size={24}
                            color='black'
                            />
                        }
                        onChange={e=>setPassword(e.nativeEvent.text)}
                    />
                </View>
            
    
              <View style={styles.button}>
                <Button 
                    title={"Ingresar"} 
                    onPress={()=>login()}
                 ></Button>
              </View>
            <Loading isVisible={visible} text={"cargando"}/>
    
            </KeyboardAvoidingView>
        )
}

function CreateAccout(props) {
    const{navigation}= props
    return(
    <View >
        <Text style={styles.textRegistrer}>
            ¿aun no tienes cuenta? 
            <Text 
                style={styles.btnRegistrer}
                onPress={()=>navigation.navigate("SingIn")}
            >
                regístrate
            </Text>
        </Text> 
    </View>)
}

export default  withNavigation(Login)
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