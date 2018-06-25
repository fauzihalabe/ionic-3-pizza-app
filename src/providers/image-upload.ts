import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../configs/firebase';

@Injectable()
export class ImagesUpload {
    userAuth: any;
    public myPhotosRef: any;
    public myPhoto: any;
    public myPhotoURL: any;
    public fileName: any;

    constructor(
    ) {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                firebaseConfig
            });
        }

        //Anonynous login
        firebase.auth().signInAnonymously().then(auth => {
            this.userAuth = auth;
        });
        this.myPhotosRef = firebase.storage().ref('Images/');
    }


    uploadPhoto(myPhoto, fileName, type) {
        return this.myPhotosRef.child('/' + type + '/' + fileName)
            .putString(myPhoto, 'base64', { contentType: 'image/jpeg' })
    }
}