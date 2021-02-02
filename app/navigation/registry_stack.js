import {createStackNavigator} from "react-navigation-stack" 
import RegistryScreen from "../screens/assistace/registry"
import Registry_detail from '../screens/assistace/registry_detail'
const RegistryScreenStack= createStackNavigator({
    registry:{
        screen: RegistryScreen,
        navigationOptions: ()=>({
            title: "Asistencia"
        })
    },
    registry_detail:{
        screen: Registry_detail,
        navigationOptions: ()=>({
            title: ""
        })
    }
})
export default  RegistryScreenStack