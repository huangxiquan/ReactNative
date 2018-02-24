/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import {Main} from './pages/main';

var NavigationBarRouteMapper = {

    LeftButton: function (route,navigator,index,navState) {
        if(route.id == 'main') {
            return null;
        }
        return (
            <TouchableHighlight onPress={() => navigator.pop()} >
            <Text style={styles.left} >返回</Text>
            </TouchableHighlight>
        );
    },

    RightButton: function (route, navigator, index, navState) {

    },
    Title: function (route, navigator, index, navState) {
        console.log("title")
        return (
            <Text style={styles.title} >{route.title}</Text>
        );
    }
}

export  class Root extends Component {

    constructor(props) {
        super(props)
    }

    render() {
            return (
                <Navigator
                    style={styles.container}
                    initialRoute={{title:'CBNWeekly',component: Main,id:'main'}}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.PushFromRight
                     }}
                    renderScene={(route,navigator) => this._renderScene(route,navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                         routeMapper={NavigationBarRouteMapper}
                         style={styles.navBar}
                         />

                    }
                    sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
                />
            );
    }

    _renderScene(route, navigator) {
        return <route.component navigator={navigator}  {...route.passProps} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
    },
    navBar: {
        backgroundColor: '#f8f8f8',
        flex:1,
    },
    title: {
        marginVertical:10,
    },
    left: {
        marginVertical:10,
        marginLeft:10,
    }
})
