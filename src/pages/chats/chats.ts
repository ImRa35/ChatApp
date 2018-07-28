import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage 
{
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }


  addPeople() 
  {
    this.navCtrl.push('UsersPage');
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {
      
      let newalert = this.alertCtrl.create({
        title: 'Accepted',
        subTitle: 'You can Chat Now',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  reject(item) 
  {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }

  gochat(userid) 
  {
    this.chatservice.initializebuddy(userid);
    this.navCtrl.push('UserschatPage');
  }


}
