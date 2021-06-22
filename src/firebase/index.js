import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import {firebaseConfig} from "./config";

firebase .initializeApp(firebaseConfig); //コピーしてきた設定を使ってfirebaseを利用できるようにする
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();

