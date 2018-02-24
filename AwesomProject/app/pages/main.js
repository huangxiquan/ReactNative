import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './home'
import Magazine from './magazine';

export  class Main extends Component {
    state = {
        selectedTab:'home'
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (<TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Image source={require('../imgs/tabbar_home_normal.png')} />}
                        renderSelectedIcon={() => <Image source={require('../imgs/homeActive.png')} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>

                        <Home {...this.props} />

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'magazine'}
                        renderIcon={() => <Image source={require('../imgs/magazineNormal.png')} />}
                        renderSelectedIcon={() => <Image source={require('../imgs/tabbar_magazine_active.png')} />}
                        onPress={() => this.setState({ selectedTab: 'magazine' })}>

                        <Magazine />

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'user'}
                        renderIcon={() => <Image source={require('../imgs/userNormal.png')} />}
                        renderSelectedIcon={() => <Image source={require('../imgs/tabbar_user_active.png')} />}
                        onPress={() => this.setState({ selectedTab: 'user' })}>

                        <Text>user</Text>
                    </TabNavigator.Item>
        </TabNavigator>)
    }
}


