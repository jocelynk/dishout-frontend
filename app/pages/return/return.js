import {Page, Platform, Alert, NavController} from 'ionic-angular';
import {AuthService} from '../../services/AuthService';
import {Scandropoff} from '../scandropoff/scandropoff';

/*
  Generated class for the ReturnPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/return/return.html',
  providers: [AuthService]
})
export class Return {
  static get parameters() {
    return [[AuthService], [Platform], [NavController]];
  }

  constructor(authService, platform, navController) {
    this.nav = navController;
    this.platform = platform;
    this.auth = authService;
  }

  scan() {
    this.auth.refreshUser(this.auth.user);
    /*this.platform.ready().then(() => {
      cordova.plugins.barcodeScanner.scan((result) => {

        var dishid = result.text;
        // Note: hardcoded dish_number and user_id
        this.nav.push(Scandropoff, {dish_number: '1', user_id: '1'});
      }, (error) => {
        this.nav.present(Alert.create({
          title: "Attention!",
          subTitle: error,
          buttons: ["Close"]
        }));
      });
    });*/
    //this.nav.push(Scandropoff, {dish_number: '1', user_id: '1'});
  }
}
