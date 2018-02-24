/**
 * Created by yang on 2017/8/30.
 */
'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    SectionList,
    Image,
    NativeModules,
} from 'react-native';

import BackNavigation from '../components/backNavigation'

const SETTING_RESTORE_SUBSCRIPTION = 'restore_subscription';
const SETTING_VERSION = 'version';
const SETTING_NETWORK_PROTOCOLS = 'network_protocols';
const SETTING_PRIVACY = 'privacy';

import * as Config from "../config";
import * as user from '../store/user'
var BridgeManager = require('react-native').NativeModules.BridgeManager;
export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            versionText: '',
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '设置',
            headerLeft: <BackNavigation navigation={navigation}/>,
            headerStyle: {backgroundColor: '#191919'},
            headerTintColor: '#FFFFFF',
        };
    };

    componentWillMount() {
        BridgeManager.versionBlock((error, version) => {
            if (error) {
            } else {
                this.setState({
                    versionText: version
                });
            }
        });
    }

    _renderItem = (info) => {
        if (info.item.name === SETTING_VERSION) {
            return (
                <View style={styles.itemContainer}>
                    <Text numberOfLines={1} style={styles.items}>{info.item.title}</Text>
                    <Text numberOfLines={1} style={styles.versionItems}>{this.state.versionText}</Text>
                </View>
            )
        } else {
            return (
                <TouchableHighlight onPress={() => this._cellAction(info)}>
                    <View style={styles.itemContainer}>
                        <Text numberOfLines={1} style={styles.items}>{info.item.title}</Text>
                        <Image source={require('../images/follow_arrow.png')} style={styles.arrow}/>
                    </View>
                </TouchableHighlight>
            )
        }
        ;
    };


    _cellAction = (item) => {
        switch (item.item.name) {
            case SETTING_RESTORE_SUBSCRIPTION:
                let {navigate} = this.props.navigation;
                user.ensureLogin(navigate, function (ret) {
                    BridgeManager.restorePay();
                });
                break;
            case SETTING_PRIVACY:
                this.props.navigation.navigate('UserWebView', {'navigateTitle': '隐私条款'});
                break;
            case  SETTING_NETWORK_PROTOCOLS:
                this.props.navigation.navigate('UserWebView', {'navigateTitle': '网络协议'});
                break;
            default:
                break;
        }

    };


    _sectionSeparator() {
        return <View style={styles.sectionsMargin}></View>
    }

    _separatorCom() {
        return (
            <View style={styles.separator}></View>
        )
    }


    render() {
        var sections = [
            {key: "A", data: [{title: "恢复订阅", name: SETTING_RESTORE_SUBSCRIPTION}]},
            {key: "B", data: [{title: "版本号", name: SETTING_VERSION}]},
            {
                key: "C", data: [
                {title: "网络使用协议", name: SETTING_NETWORK_PROTOCOLS},
                {title: "隐私条款", name: SETTING_PRIVACY}
            ]
            },
        ];

        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={this._renderItem}
                    sections={sections}
                    SectionSeparatorComponent={this._sectionSeparator}
                    ItemSeparatorComponent={this._separatorCom}
                />


            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    itemContainer: {
        backgroundColor: '#ffffff',
        height: 52,
        width: Config.SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
    },

    separator: {
        marginLeft: 18,
        height: 0.5,
        width: Config.SCREEN_WIDTH - 18,
        backgroundColor: '#d6d6d6'
    },

    sectionsMargin: {
        backgroundColor: '#f2f2f2',
        height: 30,
        width: Config.SCREEN_WIDTH,
    },

    items: {
        fontSize: 16,
        height: 22,
        color: 'black',
        width: 150,
    },

    versionItems: {
        fontSize: 16,
        height: 22,
        color: 'black',
        width: 150,
        textAlign: 'right',
    },

    arrow: {
        width: 8,
        height: 13,
    }
});