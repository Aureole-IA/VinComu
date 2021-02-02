import React, { useState, useEffect,useContext} from "react"
import * as firebase from "firebase"
import{View, Text} from "react-native"
import Loading from "../../components/loading"
import UserGuest from "./userGuest"
import UserLogged from "./userLogged"
import FirebaseContext from "../../context/firebase_context"
export default function MyAccount(){
   
    const logedState_=useContext(FirebaseContext) 
    const {logedState}=logedState_
    const {user_is_login,user_not_login,set_user_uid} = logedState_
    const [login, setlogin]= useState(null);
    useEffect(()=>{ 
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                set_user_uid(user.uid)
                user_is_login()
            }else{
                user_not_login()
            }
        })
        setlogin(logedState)
    },[logedState])
    
    if (login==null) {
        return(
            <Loading isVisible={true} text={"cargando"}/>
        )
    } 

    return login? <UserLogged/>:<UserGuest/>

}