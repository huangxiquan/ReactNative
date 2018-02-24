import {updateUser} from "../actions/user";

'user strict'


import {connect} from "react-redux";

import React, {Component} from 'react';
import {
    View,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import * as User from "../store/user";
import * as Config from "../config";


var user = null;
var {JSEventManager} = NativeModules;
var JSEventManagerEmitter = new NativeEventEmitter(JSEventManager);


class LoginListener extends Component {

    async componentDidMount() {
        user = await User.getUserAsync();
        console.log(user)
        this.loginSuccess = DeviceEventEmitter.addListener(Config.DEE.LoginSuccess, (user) => {
            //更新state
            console.log("login success ...");
            this.props.dispatch(updateUser(user));

        })
        this.logoutSuccess = DeviceEventEmitter.addListener(Config.DEE.Logout, () => {
            //更新state
            console.log("logout ...");
            this.props.dispatch(updateUser({}));
        })


        this.subscribeResult = JSEventManagerEmitter.addListener(Config.DEE.Subscribe, (result) => {
            console.log("subscribe ...");
        },null);
    }

    render() {
        return (
            <View></View>
        );
    }


    componentWillUnmount() {
        this.loginSuccess.remove();
        this.logoutSuccess.remove();
        this.subscribeResult.remove();
    }
}

function mapStateToProps(state) {
    return {
        user: state.userStore.user,
    }
}


export default connect(mapStateToProps)(LoginListener);