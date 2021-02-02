import React, { useState, useEffect,useContext } from 'react'
import FirebaseContext from "../../context/firebase_context"
import Place_public from './place_public'
import Place_user from './place_user'
import Loading from '../../components/loading'
export default function Place() {
    const logedState_=useContext(FirebaseContext) 
    const {logedState}=logedState_
    const [login, setLogin]= useState(false)
    useEffect(()=>{ 
        setLogin(logedState)
    },[logedState])
    if (login==null) {
        return(
            <Loading isVisible={true} text={"cargando"}/>
        )
    } 

    return login? <Place_user/>:<Place_public/>
}
