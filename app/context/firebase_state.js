import React, {useReducer} from 'react';
import FirebaseReucer from './firebase_reducer';
import FirebaseContext from './firebase_context';
import {LOGED_USER} from '../types'
import {REGISRY_DETAIL,NEW_REGISTRY} from '../types'
import {USER_UID,USER_HAS_DATA,USER_DATA} from '../types'
import * as firebase from 'firebase'

const FirebaseState = props =>{

    const initialState={
        logedState:null,
        registry_detail:'initial',
        user_uid: false,
        userHasData:false,
        userData: false,
        newRegistry:false
    }

    const [state, dispatch] = useReducer(FirebaseReucer, initialState)

      const set_new_registry= (reg)=>{
        dispatch({
            type: NEW_REGISTRY,
            payload: reg
        })
        
    }

    const set_user_uid= (uid)=>{
        dispatch({
            type: USER_UID,
            payload: uid
        })
        
    }
    const get_user_data = (state)=>{
        dispatch({
            type: USER_DATA,
            payload: state
        })
    }
    const user_has_data= (state)=>{
        dispatch({
            type: USER_HAS_DATA,
            payload: state
        })
        
    }
    const user_is_login=  ()=>{
        dispatch({
            type: LOGED_USER,
            payload: true
        })
    }
    const user_not_login=  ()=>{
        dispatch({
            type: LOGED_USER,
            payload: false
        })
    }
    const user_logout=()=>{
        dispatch({
            type: LOGED_USER,
            payload: null
        })
        firebase.auth().signOut()
        dispatch({
            type: USER_UID,
            payload: ""
        })
        dispatch({
            type: LOGED_USER,
            payload: false
        })
        dispatch({
            type: USER_DATA,
            payload: false
        })
    }

    const view_registry_detail=(id,date,summary,start,end,hours)=>{
        dispatch({
            type: REGISRY_DETAIL,
            payload: {
                id: id,
                date: date,
                summary: summary,
                start:start,
                end:end,
                hours:hours
            }
        })
    }

    return(
        <FirebaseContext.Provider
            value={{
                logedState: state.logedState,
                registry_detail: state.registry_detail,
                user_uid: state.user_uid,
                userHasData: state.userHasData,
                userData:state.userData,
                newRegistry:state.newRegistry,
                user_logout,
                view_registry_detail,
                user_is_login,
                user_not_login,
                set_user_uid,
                user_has_data,
                get_user_data,
                set_new_registry
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;