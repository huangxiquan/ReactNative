/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Platform,
    DeviceEventEmitter
} from 'react-native';

import {Root} from './ReactNative/root';

import {Provider} from 'react-redux';

import configureStore from './ReactNative/store/index';
import DBStore from './ReactNative/store/DBStore';
import * as Config from './ReactNative/config';
import * as User from './ReactNative/store/user';
import NetworkUtil from './ReactNative/network/NetworkUtil'
import ApiServer from './ReactNative/network/ApiServer'
import * as user from './ReactNative/store/user'
export default class WeeklyiPad extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() => {
                this.setState({isLoading: false})
            }),
        }
    }

    render() {

        return (
            <Provider store={this.state.store}>
                <Root />
            </Provider>
        )

    }

    async componentWillMount() {
        let loginName = await user.getLoginName();
        let passWord = await user.getPassWord();
        let users = await user.getUserAsync();
        if (loginName != null && passWord != null) {
            ApiServer.getLogin(loginName, passWord, function (success, ret) {
                if (!success) {
                    if (users != null) {
                        alert(user.id+"")
                        alert(user.token)
                        user.saveToIos(user);

                    }
                }
            })
        }
    }
}
