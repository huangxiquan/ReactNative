/**
 * Created by luying on 2017/9/4.
 */
import {
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter
} from 'react-native'
import DBStore from './DBStore'
import * as Config from '../config';
var BridgeManager = NativeModules.BridgeManager;
export function getUser(callback) {
    return DBStore.load(Config.KEY.user, function (success, ret) {
        if (success) {
            console.log("222222222-->成功")
            callback(ret);
        }else {
            console.log("222222222-->失败")

            callback(null);
        }
    });
}

export function saveUser(user) {
    BridgeManager.storeUser(user.id + "", user.token);
    return DBStore.save(Config.KEY.user, user)
}

//不管正确还是错误都有返回值，正确user，错误null
export function getUserAsync() {
    return DBStore.loadAsync(Config.KEY.user)
}

export function getLoginName() {
    return DBStore.loadAsync(Config.KEY.loginName)
}

export function getPassWord() {
    return DBStore.loadAsync(Config.KEY.passWord)
}

export function ensureLogin(navigate, callback) {
    DBStore.load(Config.KEY.user, function (success, ret) {
        if (success) {
            callback(ret)
        } else {
            if (navigate != null) {
                navigate('Login');          //如果不想登录navigator可传空
            }
        }
    });

}

export function saveToIos(user) {
    BridgeManager.storeUser(user.id + "", user.token);
}
export function removeUser() {
    BridgeManager.userLogOut();
    DBStore.removeByKey(Config.KEY.user);
    // DBStore.removeByKey(Config.KEY.account);
    DBStore.removeByKey(Config.KEY.passWord);
    DeviceEventEmitter.emit(Config.DEE.Logout);
}