import React,{useContext,useEffect} from 'react';
import {createAppContainer} from "react-navigation"
import {createBottomTabNavigator} from "react-navigation-tabs"
import ProfileScreenStack from "./Profile_stack"
import PlaceScreenStack from './place_stack'
import RegistryScreenStack from "./registry_stack"
import FirebaseContext from "../context/firebase_context"
import {Icon} from "react-native-elements"
// import {} from "react-navigation-stack"


const NavigationStacks = createBottomTabNavigator({
    Profile:{
        screen: ProfileScreenStack,
        navigationOptions: ()=>({
            tabBarLabel: "Perfil",
            tabBarIcon: ({tinColor})=>(
                <Icon 
                    type="material"
                    name="account-circle"
                    size={22}
                    color={tinColor}
                />
            )
        })
    },
    Place:{
        screen: PlaceScreenStack,
        navigationOptions:()=>({
            tabBarLabel:"Institucion",
            tabBarIcon:({tinColor})=>(
                <Icon 
                    type="material-community"
                    name="compass-outline"
                    size={22}
                    color={tinColor}
                />
            )

        })
    },
    Registry:{
        screen: RegistryScreenStack,
        navigationOptions:()=>({
            tabBarLabel:"Asistencia",
            tabBarIcon:({tinColor})=>(
                <Icon 
                    type="material-community"
                    name="calendar-today"
                    size={22}
                    color={tinColor}
                />
            )

        })
    },
},
{
    initialRouteName: "Profile",
    order: ["Place","Profile","Registry" ],
    tabBarOptions:{
        inactiveTintColor: "#646464",
        activeTintColor:"#00a680"
    }
}
)

export default createAppContainer(NavigationStacks)