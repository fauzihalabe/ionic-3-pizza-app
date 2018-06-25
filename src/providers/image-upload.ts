import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable()
export class ImagesUpload {
  userAuth: any;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public fileName: any;

  constructor() {
    this.myPhotosRef = firebase.storage().ref("Images/");
  }

  uploadPhoto(myPhoto, fileName, type) {
    return this.myPhotosRef
      .child("/" + type + "/" + fileName)
      .putString(myPhoto, "base64", { contentType: "image/jpeg" });
  }
}
