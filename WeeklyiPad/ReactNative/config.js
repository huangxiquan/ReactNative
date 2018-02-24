/**
 * Created by luying on 2017/8/22.
 */
import {Dimensions} from 'react-native'
import BDStore from './store/DBStore'
let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const COLOR = {
    homepageBgc: '#272727',
    black: '#000000',
    white: '#ffffff',
    loginBorder: '#ECECEC',
    loginTextUnSelect: '#B8B8B8',
    green: '#33CC66',
    darkGrey: '#9B9B9B'
};


//存储的key
export const KEY = {
    //账号密码
    // account: "account",  //account = {telephone, passWord}
    loginName:"loginName",
    passWord:"passWord",
    user: 'user'

};

export const URL = {
    //登录接口
        Login :{
            url: 'users/sign_in',
            method:'POST',
            params:{
                login_name:'login_name',
                password:'password'
            }
        },
    //注册
    Registration: {
            url:'users',
            method:'POST'
    },
    //注册时的发送验证码
    Sms: {
            url:'sms',
            method:'POST'
    },

    //重置密码发送验证码
    ForgetPasswordSms:{
            url:'users/forgot_password',
            method:'POST',
    },

    //重置密码
    ResetPassword:{
            url:'users/reset_password',
            method:'POST'
    },

    //修改用户名
    ChangeUserInfo:{
            url:'users/',
            method:'PATCH',
        //有参数"users/{id}"和token
    }
};

export const BASE_URL = {
    online: "https://api.cbnweek.com/v2/",
    test: "http://120.55.93.189:3003/v2/"
};


//消息通信key
export const DEE = {
  LoginSuccess:'login_success',
  Logout:'logout_success',
  Subscribe: 'SubscribeResult',
  downloadData: 'DownloadData',
  isDownloadSucceed: 'DownloadSucceed',
  deleteMagazineData: 'DeleteMagazineData',
};

// export var CBN_Token = BDStore._getDBSore()._load(KEY.token, token =>{
//
// })

