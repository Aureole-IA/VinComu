import {createStackNavigator} from "react-navigation-stack" 
import PlaceScreen from "../screens/place/place"
import PlaceForm from '../screens/place/place_form'
const PlaceScreenStack= createStackNavigator({
    place:{
        screen: PlaceScreen,
        navigationOptions: ()=>({
            title: "Institucion"
        })
    },
    place_form:{
        screen: PlaceForm,
        navigationOptions: ()=>({
            title: "Crear lugar"
        })
    }
})
export default PlaceScreenStack