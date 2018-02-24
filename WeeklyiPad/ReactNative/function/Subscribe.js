/**
 * Created by luying on 2017/9/18.
 */
import {
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
}from 'react-native'
var BridgeManager = NativeModules.BridgeManager;
//订阅
export default class Subscribe {
    static subscribe(user, navigate) {
        if (user == null) {
            navigate('Login')
        } else {
            BridgeManager.subscribeMagazine()
        }
    }

}