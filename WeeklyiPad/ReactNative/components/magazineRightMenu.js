'user strict'
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Modal,
    TouchableHighlight,
    Button,
    navigator,
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules
    //导入
} from 'react-native';
import * as User from "../store/user";
import * as Config from "../config";
import dataUtil from '../DataUtil'
import Subscribe from '../function/Subscribe'


var {JSEventManager} = NativeModules;
var JSEventManagerEmitter = new NativeEventEmitter(JSEventManager);
var readability = false;
const styles = StyleSheet.create({
    moreBtn: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    menu: {
        position: 'absolute',
        backgroundColor: '#333333',
        padding: 10,
    },
    subscriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#FFFFFF',
    },
});
// const { CalendarManager } = NativeModules;
export default class MagazineRightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            menuTop: 0,
            menuLeft: 0,
            user: null,
        };
    }


    render() {
        let user = this.state.user;
        if (user != null){
                readability = user.has_read_ability
        }else {
            readability = false;
        }
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                >
                    <View style={[styles.menu, {top: this.state.menuTop + 10, right: 40,}]}>
                        <Button onPress={() => {
                            if (user == null) this.jumpToLogin()
                            else this.jumpToPersonalCenter(user)
                        }} color='white'
                                title={user == null ? "登录" : user.nickname}/>
                        <View style={styles.line}/>
                        <Button onPress={() => this.jumpToOffline()} color='white' title="离线杂志"/>
                        <View style={styles.line}/>
                        <View style={styles.subscriptionContainer}>
                            <Text style={{
                                fontSize: 18,
                                color: '#FFFFFF'
                            }}>{readability ? ('会员有效期至：' + dataUtil(user.read_ability_expired_at)) : '会员有效期至：暂无订阅' }</Text>
                            <Button onPress={() => this._pay()} color='red'
                                    title={readability == false ? "订阅/续订" : '' }/>
                        </View>
                        <View style={styles.line}/>
                        <Button color='white' title="设置" onPress={() => this.jumpToSetting()}/>
                        <View style={styles.line}/>
                        <Button onPress={() => this.hiddenMenu()} color='white' title="取消"/>
                    </View>
                </Modal>
                <TouchableHighlight onPress={(e) => this.showMenu(e)}>
                    <Image source={require('../images/more.png')} style={styles.moreBtn}/>
                </TouchableHighlight>
            </View>
        )
    }

    _setModalVisible(visible, left, top) {
        this.setState({
            modalVisible: visible,
            menuTop: top,
            menuLeft: left,
        });
    }

    _setSubscribeText(user) {
        if (user != null && user.has_read_ability) {

        }
    }

    _pay() {
        let user = this.state.user;
        let navigate = this.props.navigate;
        this.hiddenMenu();
        Subscribe.subscribe(user, navigate)
    }

    jumpToLogin() {
        this.hiddenMenu();
        this.props.navigate('Login');
    }

    jumpToPersonalCenter(user) {
        this.hiddenMenu();
        this.props.navigate('PersonalCenter', {user: user});
    }

    jumpToSetting() {
        this.hiddenMenu();
        this.props.navigate('Setting')
    }

    jumpToOffline() {
        if (this.state.user == null) {
            this.jumpToLogin()
        } else {
            this.hiddenMenu();
            this.props.navigate('Offline', {rightTitle: '管理'})
        }

    }

    hiddenMenu() {
        // console.log('hidden menu... ...');
        this._setModalVisible(false);
    }

    showMenu(e) {
        // console.log(e)
        // console.log(e.nativeEvent.pageX + "*" + e.nativeEvent.pageY)
        this._setModalVisible(true, e.nativeEvent.pageX, e.nativeEvent.pageY);
    }


    componentDidMount() {
        let that = this;
        let user = this.state.user;
        if (user == null) {
            User.getUser(function (ret) {
                if (ret != null) {
                    that.setState({
                        user: ret
                    })
                }
            })
        }


        // const calendarManagerEmitter = new NativeEventEmitter(CalendarManager);

        this.loginSuccess = DeviceEventEmitter.addListener(Config.DEE.LoginSuccess, (user) => {
            //更新state
            that.setState({
                user: user,
            })
        })
        this.logoutSuccess = DeviceEventEmitter.addListener(Config.DEE.Logout, () => {
            //更新state
            that.setState({
                user: null
            })
        });

        this.subscribeResult = JSEventManagerEmitter.addListener(Config.DEE.Subscribe, (result) => {
        }, null);
    }

    componentWillUnmount() {
        this.loginSuccess.remove();
        this.logoutSuccess.remove();
        this.subscribeResult.remove();
    }

}
