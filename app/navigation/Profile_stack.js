import {createStackNavigator} from "react-navigation-stack" 
import {createSwitchNavigator } from 'react-navigation';
import UserLogged from "../screens/Account/userLogged"
import ProfileScreen from "../screens/profile"
import LoginScreen from "../screens/Account/login"
import MyAccount from "../screens/Account/myAccount"
import SingIn from "../screens/Account/singIn,"
import Aditional_info from '../components/aditional_info'
import Documents from '../screens/Account/documents'
import More_info from '../screens/Account/more_info'
const ProfileScreenStack= createStackNavigator({
    profile:{
        screen: MyAccount,//ProfileScreen,
        // navigationOptions: ()=>({
        //     title: "Perfil"
        // })
    },
    Login:{
        screen: LoginScreen,
        navigationOptions: ()=>({
            title: "Login"
        })
    },
    SingIn:{
        screen: SingIn,
        navigationOptions:()=>({
            title: "Resgístrate"
        })
    },
    Aditional_Info:{
        screen: Aditional_info,
        navigationOptions:()=>({
            title: "Resgístrate"
        })
    },
    Documents:{
        screen: Documents,
        navigationOptions:()=>({
            title: "Documentos"
        })
    },
    More_info:{
        screen: More_info,
        navigationOptions:()=>({
            title: "Más información"
        })
    },
})


export default  ProfileScreenStack