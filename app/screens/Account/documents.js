import React,{useEffect,useContext, useState} from 'react'
import { Text, View, StyleSheet, ScrollView,Alert, TouchableOpacity } from 'react-native'
import {Avatar, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from "react-navigation"
import Loading from '../../components/loading'
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import FirebaseContext from '../../context/firebase_context'
import {firebaseApp} from '../../utils/FireBase'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db=firebase.firestore(firebaseApp)
var moment = require('moment/min/moment-with-locales')
moment.locale('es');

const document_urls=[
    {
        name:"1 Solicitud para realizar Pràctica Comunitaria  (estudiantes)",
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F1%20Solicitud%20para%20realizar%20Pr%C3%A0ctica%20Comunitaria%20%20(estudiantes).docx?alt=media&token=08565b62-61eb-401b-8a82-949a3961ee78'
    } ,
    {
        name: '2 INFORME_AVANCE_PROYECTO',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F2%20INFORME_AVANCE_PROYECTO.docx?alt=media&token=c86cc9ea-4eeb-40af-8159-080b92c202e5',
    },
    {
        name: '3 INFORME FINAL DEL PROYECTO',
        url:  'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F3%20INFORME%20FINAL%20DEL%20PROYECTO.docx?alt=media&token=8e4412d8-cf5c-42fe-b773-c09068c15a0a',
    },
    {
        name: '4 REGISTRO DE TUTORÍAS DEL DOCENTE',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F4%20REGISTRO%20DE%20TUTOR%C3%8DAS%20DEL%20DOCENTE.docx?alt=media&token=784f09fa-38ea-4ae4-bb3d-871d44a4c6c1',
    },
    {
        name: '5 REGISTRO DE BENEFICIADOS',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F5%20REGISTRO%20DE%20BENEFICIADOS.docx?alt=media&token=0681cf82-6eca-411b-8ba7-d6e88b49b119',
    },
    {
        name: '6 REGISTRO DE ASISTENCIA Y ACTIVIDADES (1)',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F6%20REGISTRO%20DE%20ASISTENCIA%20Y%20ACTIVIDADES%20(1).docx?alt=media&token=39def769-59d2-4910-b0e6-921ad6c53f08',
    },
    {
        name: '7 Matriz de evaluación de los resultados alcanzados',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F7%20Matriz%20de%20evaluaci%C3%B3n%20de%20los%20resultados%20alcanzados.docx?alt=media&token=0f27f86d-b2c1-4fcd-83de-31ad93f17bc1',
    },
    {
        name: '8 ENCUESTA DE BENEFICIARIOS',
        url: 'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2F8%20ENCUESTA%20DE%20BENEFICIARIOS.docx?alt=media&token=cfc52ae0-2fad-4038-b827-6525e4794dbf',
    },
    {
        name: 'PROCEDIMIENTO DE VINCULACIÓN 2016-2017',
        url:  'https://firebasestorage.googleapis.com/v0/b/vicomu-610b7.appspot.com/o/Plantillas%2FPROCEDIMIENTO%20DE%20VINCULACI%C3%93N%202016-2017.docx?alt=media&token=ee248790-2e8a-4ed3-9e7f-9dd9d75d3bb9'
    } 
   
]


function Documents(props) {
    const {userData} = useContext(FirebaseContext)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        
    },[])
    const fetch_data=()=>{
        setVisible(true)
        let user_uid=firebase.auth().currentUser.uid
        let registry_=[]
        let user_data=[]
        db.collection('registry').where('user_id','==',user_uid)
        .get().then((response)=>{
            if (response.empty) {
                setVisible(false)
                return;
            }
            let aux=0
            response.forEach((doc)=>{
                const registry_data= doc.data();
                registry_data.id=doc.id
                 aux+=1
                 let structure={
                    No: aux,
                    Nombre: userData.name,
                    Cedula: userData.ci,
                    Fecha: moment(registry_data.date).format('LLL'),
                    Inicio:registry_data.start,
                    Salida:registry_data.end,
                    N_Horas: getTimeFromMins(registry_data.minutes),
                    Actividad: registry_data.summary,

                }
                registry_.push(structure)
            })
            let registry_aux= registry_.sort(function (a, b){
                return (b.Fecha < a.Fecha)
            })
            create_document(registry_aux)
            setVisible(false)

        }).catch((e)=>{
            
        })
    }

    const create_document= async(data)=>{
        

        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Regstro de asistencia");
        const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + 'registro_de_asistencia.xlsx';
        await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64
        });

        await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'registro_de_asistencia',
        UTI: 'com.microsoft.excel.xlsx'
        });
    }

    const donwload_document= async(url_index)=>{
        let remoteUri=url_index.url
        let docName= url_index.name
        // const { uri: localUri } = await FileSystem.downloadAsync(remoteUri, FileSystem.documentDirectory + '1 Solicitud para realizar Pràctica Comunitaria (estudiantes).docx'); 
        
        const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            // this.setState({
            //   downloadProgress: progress,
            // });
            
          };
        const ensureFolderExists =()=> {
            const path = `${FileSystem.documentDirectory}documents`
            return FileSystem.getInfoAsync(path).then(({exists}) => {
              if (!exists) {
                return FileSystem.makeDirectoryAsync(path)
              } else {
                return Promise.resolve(true)
              }
            })
        }
          
          
        const downloadResumable = FileSystem.createDownloadResumable(
            remoteUri,
            FileSystem.documentDirectory + 'documents/'+docName+'.docx',
            {},
            callback
        );
          
        try {
        ensureFolderExists().then(async() => {
            // FileSystem.createDownloadResumable("http://remote-uri.com", `${FileSystem.documentDirectory}MyFolder/my_file.ext`).downloadAsync()
            const { uri } = await downloadResumable.downloadAsync();
            
            await Sharing.shareAsync(uri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                dialogTitle: 'registro_de_asistencia',
                UTI: 'com.microsoft.excel.xlsx'
                });
        })  
        // const { uri } = await downloadResumable.downloadAsync();
        
        } catch (e) {
        }
    }
    const {navigation}= props
    return (
        <ScrollView centerContent={true}  >
            <View style={styles.main_conatiner}>
                <Loading isVisible={visible} text={"Generando documento"}/> 
                <View style={{flex: .4, marginTop: 20}}>
                    <View style={{flexDirection:"row",marginVertical:20}}>
                        
                        <View style={styles.center_items}>
                            <Avatar rounded 
                            icon={{name:"file-word-o", type: 'font-awesome'}}
                             size="xlarge"/>
                        </View>
                        <View style={styles.center_items}>
                            <Text style={{color:'#757575',fontSize:20}}>
                                Plantillas y Documentación con tus datos registrados 
                            </Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.info_container}>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-excel-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>fetch_data()} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>Registro de actividádes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                     <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[0])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>Solicitud para realizar Pràctica Comunitaria  (estudiantes)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[1])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>INFORME_AVANCE_PROYECTO</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[2])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>INFORME FINAL DEL PROYECTO</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[3])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>REGISTRO DE TUTORÍAS DEL DOCENTE</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[4])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>REGISTRO DE BENEFICIADOS</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[5])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>REGISTRO DE ASISTENCIA Y ACTIVIDADES</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[6])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>Matriz de evaluación de los resultados alcanzados</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[7])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>ENCUESTA DE BENEFICIARIOS</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.card_container} >
                        <View style={styles.icon_container}>
                            <Icon
                                name="file-word-o" 
                                type= 'font-awesome'
                                size={40}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>donwload_document(document_urls[8])} style={styles.center_items}>
                            <Text style={styles.info2_tittle_text}>PROCEDIMIENTO DE VINCULACIÓN</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.divider_container}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

function getTimeFromMins(mins) {
    var h = mins / 60 | 0,
    m = mins % 60 | 0;
    h= (h < 10) ? "0" + h : h;
    m= (m < 10) ? "0" + m : m;
    return h + ":" + m 
}


export default withNavigation(Documents)
const styles = StyleSheet.create({
    center_items:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    main_conatiner:{
        flex:1,
        backgroundColor: '#B2EBF2'
    },  
    name_text:{
        marginTop: 20,
        marginBottom:20,
        fontSize: 30
    },
    info_container:{
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        marginTop:10,
        flex:.6,
        backgroundColor:'#FFFFFF'
    },
    icon_container:{
        flex:.3,
        justifyContent:"center",
        alignItems:"center"
    },
    card_container:{

        flex:1,
        flexDirection:"row",
        marginHorizontal:20,
        marginVertical:20
    },

    info2_data:{
        flex:.3,
        flexDirection:"row-reverse"
    },
    info2_tittle_text:{
        color:'#757575',
        fontSize: 20
    },
    info2_data_text:{
        color:'#212121',
        fontSize: 17
    },
    divider_container:{
        marginVertical: 10,
        marginHorizontal:50
    },

})
