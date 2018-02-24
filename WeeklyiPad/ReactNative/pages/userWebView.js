/**
 * Created by yang on 2017/9/5.
 */
'user strict';
import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import BackNavigation from '../components/backNavigation'

var webUrl = {
    data: [
        { headerTitle: "网络协议", url: 'https://files.cbnweek.com/weekly-help/pages/license/index.html' },
        { headerTitle: "隐私条款", url: 'https://files.cbnweek.com/weekly-help/pages/privacy/index.html' }
    ]
};

import * as Config from "../config";

export default class UserWebView extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: navigation.state.params.navigateTitle,
            headerLeft: <BackNavigation navigation={navigation} />,
            headerStyle: {backgroundColor:'#191919'},
            headerTintColor: '#FFFFFF',
        };
    };

    render() {
        var url = '';
        switch (this.props.navigation.state.params.navigateTitle){
            case webUrl.data[0].headerTitle:
                url = webUrl.data[0].url;
                break;
            default:
                url = webUrl.data[1].url;
                break;
        }

        return (
            <View style={styles.container}>
                <WebView
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    source={{uri:url,method: 'GET'}}
                    style={{width:Config.SCREEN_WIDTH, height:Config.SCREEN_HEIGHT}}>
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});