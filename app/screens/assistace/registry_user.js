import React,{ useState, useEffect,useContext}  from 'react'
import { Text, View,FlatList,ScrollView  } from 'react-native'
import { ListItem } from 'react-native-elements'
import {withNavigation} from "react-navigation"
import {firebaseApp} from '../../utils/FireBase'
import FirebaseContext from "../../context/firebase_context"
import Loading from '../../components/loading'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
var moment= require('moment/min/moment-with-locales')
    

function Registry_user(props) {
    const {navigation}= props
    const {view_registry_detail,newRegistry} = useContext(FirebaseContext)

    const watch_registry=(id,date,summary,start,end,hours)=>{
        view_registry_detail(id,date,summary,start,end,hours)
        navigation.navigate('registry_detail')
    }
    const [list,setList]=useState([])
    useEffect(() => {
        moment.locale('es');
        let user_uid=firebase.auth().currentUser.uid
        db.collection('registry').where('user_id','==',user_uid)
        .get().then((response)=>{
            if (response.empty) {
                
                return;
            }
            let list_=[]
            response.forEach((doc)=>{
                const registry_data= doc.data();
                registry_data.id=doc.id
                
                list_.push(registry_data)
                
            })
            let list_aux= list_.sort(function (a, b){
                return (b.date < a.date)
            })
            setList(list_aux)
            
        }).catch((e)=>{
            
        })
        
    }, [newRegistry])
            
      
    return (
        <ScrollView  centerContent={true}>
            <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            leftElement={
                            <Text>{i+1}</Text>
                            }
                            onPress={()=>watch_registry(i,item.date,item.summary,item.start,item.end,item.minutes)}
                            title={moment(item.date).format('LLLL')}
                            leftIcon={{ name: 'av-timer' }}
                            subtitle={item.summary}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            </View>
            <Loading isVisible={false} text={"cargando"}/>
        </ScrollView>
        
    )
      



}

export default withNavigation(Registry_user)
