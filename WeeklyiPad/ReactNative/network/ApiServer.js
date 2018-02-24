/**
 * Created by luying on 2017/9/15.
 */
import {DeviceEventEmitter,} from 'react-native'
import NetworkUtil from './NetworkUtil'
import * as Config from '../config'
import * as User from '../store/user'
import DBStore from '../store/DBStore'
const url = Config.URL;
export default class ApiServer {

    /**
     * 登录
     * @param name
     * @param password
     * @param callback
     */
    static getLogin(name, password, callback) {
        let params = {
            login_name: name,
            password: password
        };
        NetworkUtil.fetchRequest(url.Login.url, url.Login.method, params, function (success, ret) {
            if (success) {
                User.saveUser(ret);
                DBStore.save(Config.KEY.loginName, name);
                DBStore.save(Config.KEY.passWord, password);
                DeviceEventEmitter.emit(Config.DEE.LoginSuccess, ret);
                callback(true, ret)
            } else {
                callback(false, ret)
            }
        })
    };

    /**
     * 注册
     * @param name
     * @param password
     * @param password_confirmation
     * @param sms
     * @param callback
     */
    static getRegistration(name, password, password_confirmation, sms, callback) {
        let params = {
            user: {
                login_name: name,
                password: password,
                password_confirmation: password_confirmation
            },
            code: sms
        };
        NetworkUtil.fetchRequest(url.Registration.url, url.Registration.method, params, function (success, ret) {
            if (success) {
                User.saveUser(ret);
                DeviceEventEmitter.emit(Config.DEE.LoginSuccess, ret);
                callback(true, ret)
            } else {
                callback(false, ret)

            }
        })
    }


    /**
     * 获取验证码
     * @param telephone
     * @param callback
     */
    static getSms(telephone, callback) {
        let params = {
            telephone: telephone
        };
        NetworkUtil.fetchRequest(url.Sms.url, url.Sms.method, params, function (success, ret) {
            if (success) {
                callback(true, ret)
            } else {
                callback(false, ret)
            }
        })
    }

    /**
     * 忘记密码时的获取验证码
     * @param name
     * @param callback
     */
    static getForgetPasswordSms(name, callback) {
        let params = {
            login_name: name
        };
        NetworkUtil.fetchRequest(url.ForgetPasswordSms.url, url.ForgetPasswordSms.method, params, function (success, ret) {
            if (success) {
                callback(true, ret)
            } else {
                callback(false, ret)
            }
        })
    }

    /**
     * 密码重置(通过验证码)
     * @param name
     * @param newPassword
     * @param newPasswordCfm
     * @param sms
     * @param callback
     */
    static getResetPasswordBySms(name, newPassword, newPasswordCfm, sms, callback) {
        let params = {
            login_name: name,
            new_password: newPassword,
            new_password_confirmation: newPasswordCfm,
            checksum: sms
        };

        NetworkUtil.fetchRequest(url.ResetPassword.url, url.ResetPassword.method, params, function (success, ret) {
            if (success) {
                User.saveUser(Config.KEY.user, ret);
                DBStore.save(Config.KEY.loginName, name);
                DBStore.save(Config.KEY.passWord, newPassword);
                DeviceEventEmitter.emit(Config.DEE.LoginSuccess, ret);
                callback(true, ret)
            } else {
                callback(false, ret)
            }
        })
    }

    /**
     * 密码重置(通过旧密码)
     * @param name
     * @param oldPassword
     * @param newPassword
     * @param newPasswordCfm
     * @param callback
     */
    static getResetPasswordByPW(name, oldPassword, newPassword, newPasswordCfm, callback) {
        let params = {
            login_name: name,
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirmation: newPasswordCfm,
        }

        NetworkUtil.fetchRequest(url.ResetPassword.url, url.ResetPassword.method, params, function (success, ret) {
            if (success) {
                User.saveUser(Config.KEY.user, ret);
                DBStore.save(Config.KEY.loginName, name);
                DBStore.save(Config.KEY.passWord, newPassword);
                DeviceEventEmitter.emit(Config.DEE.LoginSuccess, ret);
                callback(true, ret)
            } else {
                callback(false, ret)
            }
        })
    }

    /**
     * 修改用户信息
     * @param user
     * @param callback
     */
    static getChangeUserInfo(user, callback) {
        if (user == null) {
            return;
        }
        let params = {
            user: user
        };
        console.log(user);


        NetworkUtil.fetchRequestToken(Config.URL.ChangeUserInfo.url + user.id,
            Config.URL.ChangeUserInfo.method,
            user.token,
            params,
            function (success, ret) {
                if (success) {
                    User.saveUser(Config.KEY.user, ret);
                    DeviceEventEmitter.emit(Config.DEE.LoginSuccess, ret);
                    callback(true, ret)
                } else {
                    callback(true, ret)

                }
            });
    }
}