/**
 * Created by luying on 2017/8/31.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import * as Config from "../config";
import NetworkUtil from "../network/NetworkUtil";
import DBStore from '../store/DBStore'
import ApiServer from '../network/ApiServer'
var interval;
export default class Registration extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.type,
    });

    constructor(props) {
        super(props);
        this.state = {
            sms: '',
            passWord: '',
            passWordAgain: '',
            oldPassword: '',
            userName: '',
            timeLeft: 0,
            user: null,
            begin: false,
        }
        interval = null;


    }


    render() {
        let {params} = this.props.navigation.state;
        let that = this;
        if (params.type == '修改用户名' && this.state.user == null) {
            DBStore.load(Config.KEY.user, function (result, ret) {
                if (result) {
                    that.setState({
                        user: ret,
                    })
                }
            })
        }
        return (
            params.type == '修改用户名' ? (
                    <View style={styles.outLinear}>
                        <TextInput
                            style={[styles.setPassWord, {
                                marginRight: 40,
                                borderBottomWidth: 1,
                                borderColor: Config.COLOR.loginTextUnSelect,
                                marginTop: 60
                            }]}
                            placeholder='输入用户名'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='next'
                            maxLength={10}
                            onChangeText={(text) => this.setState({userName: text})}
                        />

                        <TouchableOpacity style={[styles.commitText, {marginTop: 60}]}
                                          onPress={() => this._registration(params)}>
                            <Text style={{fontSize: 25, color: Config.COLOR.white,}}>
                                完成
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.outLinear}>
                        {
                            params.type == '修改密码' ? (

                                    <TextInput
                                        style={styles.setPassWord}
                                        placeholder='输入原始密码'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        secureTextEntry
                                        returnKeyType='next'
                                        maxLength={20}
                                        onChangeText={(text) => this.setState({oldPassword: text})}
                                    />

                                ) : (
                                    <View style={styles.smsLinear}>
                                        <TextInput
                                            style={styles.editText}
                                            placeholder='输入验证码'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            returnKeyType='next'
                                            maxLength={20}
                                            onChangeText={(text) => this.setState({sms: text})}
                                        />

                                        <TouchableOpacity onPress={() => {
                                            if (this.state.timeLeft == 0) this._beginCountDown(30, params)
                                        }}>
                                            <Text style={{
                                                fontSize: 25,
                                                textAlign: 'center',
                                                color: Config.COLOR.loginTextUnSelect,
                                                paddingRight: 40
                                            }}>
                                                发送验证码{this.state.timeLeft != 0 ? '(' + this.state.timeLeft + ')' : ''}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                        }

                        <View style={{height: 1, backgroundColor: Config.COLOR.loginBorder}}/>
                        <TextInput
                            style={styles.setPassWord}
                            placeholder={params.type == '修改密码' ? '输入新密码' : '输入密码'}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry
                            returnKeyType='next'
                            maxLength={20}
                            onChangeText={(text) => this.setState({passWord: text})}
                        />

                        <View style={{height: 1, backgroundColor: Config.COLOR.loginBorder}}/>


                        <TextInput
                            style={styles.setPassWord}
                            placeholder={params.type == '修改密码' ? '确认新密码' : '确认密码'}
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='next'
                            maxLength={20}
                            secureTextEntry
                            onChangeText={(text) => this.setState({passWordAgain: text})}
                        />

                        <Text style={{
                            fontSize: 20,
                            color: Config.COLOR.darkGrey,
                            paddingLeft: 40,
                            marginTop: 10,
                            marginBottom: 40
                        }}>
                            密码不少于6位的数字或字母
                        </Text>

                        <TouchableOpacity style={styles.commitText} onPress={() => this._registration(params)}>
                            <Text style={{fontSize: 25, color: Config.COLOR.white,}}>
                                完成
                            </Text>
                        </TouchableOpacity>
                    </View>
                )

        )
    }

    _beginCountDown(allTime, params) {
        if (params.type == '注册' || params.type == '重置密码') {
            ApiServer.getSms(params.telephone, function (success, ret) {

            })
        }

        if (this.state.timeLeft == 0) {
            this.setState({
                timeLeft: allTime,
                beige: true,
            })

            this.countDown(this)
        } else {
            return;
        }
    }

    _end() {
        this.setState({
            timeLeft: 0,
            begin: false
        })
    }

    countDown(that) {
        interval = setInterval(function () {
            if (that.state.timeLeft < 1) {
                interval && clearInterval(interval);
                // this._end()
            } else {
                let totalTime = that.state.timeLeft;
                that.setState({
                    timeLeft: totalTime - 1,
                })

            }
        }, 1000)
    }


    _registration(params) {
        let telephone = params.telephone;
        if (params.type != '修改用户名') {
            if (this.state.passWord != this.state.passWordAgain) alert('密码输入不一致');
            if (this.state.passWord == '' || this.state.passWordAgain == '') alert('密码不能为空');
        }

        let that = this;
        if (params.type == '注册') {
            ApiServer.getRegistration(telephone, this.state.passWord, this.state.passWordAgain, this.state.sms, function (success, ret) {
                if (success) {
                    that.props.navigation.goBack();
                }
            })


        } else if (params.type == '重置密码') {
            ApiServer.getResetPasswordBySms(telephone,
                that.state.passWord,
                that.state.passWordAgain,
                this.state.sms,
                function (success, ret) {
                    if (success) {
                        that.props.navigation.goBack();
                    }
                })
        } else if (params.type == '修改密码') {
            ApiServer.getResetPasswordByPW(telephone,
                that.state.oldPassword,
                that.state.passWord,
                that.state.passWordAgain,
                function (success, ret) {
                    if (success) {
                        that.props.navigation.goBack();
                    }
                })
        } else if (params.type == '修改用户名') {
            let user = this.state.user;
            if (user != null) {
                user.nickname = this.state.userName
            }
            ApiServer.getChangeUserInfo(this.state.user, function (success, ret) {
                if (success) {
                    that.props.navigation.goBack();
                }
            })
        }

    }


    componentDidMount() {
        let {params} = this.props.navigation.state;
        this._beginCountDown(30, params)
    }

    componentWillUnmount() {
        interval && clearInterval(interval)
    }

}

var styles = StyleSheet.create({
    outLinear: {
        width: Config.SCREEN_WIDTH,
        height: Config.SCREEN_HEIGHT,
        flexDirection: 'column',
        backgroundColor: Config.COLOR.white
    },
    smsLinear: {
        width: Config.SCREEN_WIDTH,
        height: 90,
        flexDirection: 'row',
        backgroundColor: Config.COLOR.white,
        alignItems: "center",
    },

    editText: {
        padding: 0,
        flex: 1,
        paddingLeft: 40,
        fontSize: 25,

    },

    setPassWord: {
        width: Config.SCREEN_WIDTH,
        height: 90,
        fontSize: 25,
        paddingLeft: 40,
    },


    commitText: {
        marginLeft: 60,
        marginRight: 60,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: Config.COLOR.green,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',

    }
});

