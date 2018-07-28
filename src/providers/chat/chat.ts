import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider 
{
  firechats = firebase.database().ref('/chatMessages');
  user: any;
  messages = [];
  constructor
  (
    public events: Events
  ) 
  {
    
  }

  initializebuddy(userid) 
  {
    this.user = userid;
  }

  addnewmessage(msg) 
  {
    if (this.user) 
    {
      var promise = new Promise((resolve, reject) => {
        this.firechats.child(firebase.auth().currentUser.uid).child(this.user.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firechats.child(this.user.uid).child(firebase.auth().currentUser.uid).push().set({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }
  }

  getmessages() 
  {
    
    let temp;
    this.firechats.child(firebase.auth().currentUser.uid).child(this.user.uid).on('value', (snapshot) => {
      this.messages = [];
      temp = snapshot.val();
      for (var tempkey in temp) 
      {
        this.messages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
