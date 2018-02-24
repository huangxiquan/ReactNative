/**
 * Created by luying on 2017/8/21.
 */
import React from 'react'
import {Image, Text} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Homepage from './homepage/Homeage'
import ReLogin from './logincops/ReLogin'
const homepage = StackNavigator({
    Homepage: {
        screen: Homepage,
        navigationOptions: {
            title: '第一财经周刊',

        }
    }
});

const login = StackNavigator({
    ReLogin: {
        screen: ReLogin,
        navigationOptions:{
            title:'注册登录',
        }
    }
});

export const AppNavigator = StackNavigator({
        Homepage: {screen: homepage},
        ReLogin: {screen: login}
    },
    {
        headerMode: 'none',
    }
);
