import React, { useState, useEffect,useContext } from 'react'
import FirebaseContext from "../../context/firebase_context"
import Registry_public from '../assistace/registry_public'
import Registry_user from '../assistace/registry_user'
import Loading from "../../components/loading"
export default function Registry() {
    const logedState_=useContext(FirebaseContext)
    const {logedState}=logedState_
    const [login, setlogin]= useState(null);
    useEffect(()=>{ 
        setlogin(logedState)
    },[logedState])
    if (login==null) {
        return(
            <Loading isVisible={true} text={"cargando"}/>
        )
    } 

    return login? <Registry_user/>:<Registry_public/>
}
