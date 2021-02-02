import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import Navigation from "./app/navigation/navigation";
import {firebaseApp} from "./app/utils/FireBase";
import {decode,encode}  from "base-64"
import FirebaseState from "./app/context/firebase_state";

YellowBox.ignoreWarnings(['Setting a timer'])
if(!global.btoa) global.btoa= encode;
if(!global.atob) global.atob= decode;
export default function App() {
  return (
    
      <FirebaseState>
        <Navigation/>
      </FirebaseState>

  );
}

