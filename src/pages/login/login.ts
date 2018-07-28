import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

//import interface here

import { usercreds } from '../../models/interfaces/usercreds';

//import provider for authentication

import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage 
{
  credentials = {} as usercreds;

  user={
  	email:'',
  	password:''
  }

 constructor
 (
 	public navCtrl: NavController, 
 	public navParams: NavParams, 
 	public authservice: AuthProvider,
 	public loadingCtrl:LoadingController,
 	public toastCtrl:ToastController,
 	public afireauth: AngularFireAuth
 ) 
 {
 }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad LoginPage');
  }

   signin() 
   {

   	var toaster = this.toastCtrl.create({
      duration: 5000,
      position: 'bottom'
    });

   	if(this.user.email== '')
   	{

   	  toaster.setMessage('Enter Your Email');
      toaster.present();
   	}
   	else if(this.user.password== '')
   	{

   	  toaster.setMessage('Enter Your Password');
      toaster.present();
   	}
   	else
   	{
   		let loader = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loader.present();

     	this.afireauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
     		loader.dismiss();
        	this.navCtrl.push('TabsPage');
      	}).catch((err) => {

          loader.dismiss();
          toaster.setMessage('Try Again');
          toaster.present();
        
       	})
   	}
  }

  signup() 
  {
    this.navCtrl.push('SignupPage');
  }

 


}
