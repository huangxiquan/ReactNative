'user strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Modal,
    Button,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import * as Config from '../config';
import DBStore from '../store/DBStore'
import NetworkUtil from "../network/NetworkUtil";
import ApiServer from '../network/ApiServer';
import * as User from '../store/user'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginText: styles.loginText,
            registrationText: styles.unRegistrationText,
            loginVis: 0,
            telephone: '',
            passWord: '',
            user: null,
        };

        // user = User.getUser(function (ret) {
        //     console.log(ret)
        //
        //     // state.setState({
        //     //     user:ret
        //     // })
        // })
    }

    render() {
        // states = this.state;
        // if (this.state.user == null){
        //     var user = User.getUser(function (ret) {
        //         console.log(ret);
        //
        //         states.setState({
        //             user:ret
        //         })
        //     })
        // }
        // console.log(this.state.user);
        //noinspection JSUnresolvedFunction
        //noinspection JSUnresolvedVariable
        // global.cbnStore = DBStore._getDBSore();
        //noinspection JSUnresolvedVariable
        // global.cbnToken = cbnStore._load(Config.TOKEN);
        //noinspection JSAnnotator
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.outLinear}>
                <View style={styles.headLinear}>
                    <Text style={this.state.loginText}
                          onPress={() => {
                              this._onLoginClick()
                          }}>
                        登录
                    </Text>
                    <Text
                        style={this.state.registrationText}
                        onPress={() => {
                            this._onRegistration()
                        }}>
                        注册
                    </Text>
                </View>
                {this.state.loginVis == 0 ? (
                        <View>
                            <TextInput
                                style={[styles.editText, {borderBottomWidth: 0}]}
                                placeholder='输入手机号'
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={this.state.telephone}
                                returnKeyType='next'
                                maxLength={20}
                                onChangeText={(text) => this.setState({telephone: text})}
                                onSubmitEditing={() => this.refs.refPassword.focus()}
                                ref="refAccount"
                            />

                            <TextInput
                                style={styles.editText}
                                placeholder='输入密码'
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={this.state.passWord}
                                returnKeyType='done'
                                maxLength={20}
                                secureTextEntry
                                ref='refPassword'
                                onChangeText={(text) => this.setState({passWord: text})}
                                onSubmitEditing={() => this._submit(this.state.loginVis)}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 60,
                                marginBottom: 60
                            }}>
                                <Button
                                    color='#B8B8B8'
                                    title='忘记密码？'
                                    onPress={() => navigate('ForgetPassword')}
                                />
                            </View>
                        </View>

                    ) : (
                        <View>
                            <TextInput
                                style={styles.editText}
                                placeholder='输入'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                defaultValue={this.state.telephone}
                                onChangeText={(text) => this.setState({telephone: text})}
                                maxLength={20}
                                onSubmitEditing={() => this._submit(this.state.loginVis)}
                                ref="refAccount"
                            />
                            <Text style={{
                                fontSize: 25,
                                marginLeft: 60,
                                marginRight: 60,
                                marginTop: 15,
                                marginBottom: 135,
                                color: Config.COLOR.loginTextUnSelect
                            }}>
                                输入您的手机号，我们将向您发送一条由6位数字组成的验证码
                            </Text>
                        </View>
                    )}

                <TouchableOpacity style={styles.commitText} onPress={() => this._commit(navigate)}>
                    <Text style={{fontSize: 25, color: Config.COLOR.white,}}>
                        {this.state.loginVis == 0 ? '登录' : '获取验证码'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onLoginClick() {
        if (this.state.loginText != styles.loginText || this.state.registrationText != styles.unRegistrationText) {
            this.setState({
                loginText: styles.loginText,
                loginVis: 0,
                registrationText: styles.unRegistrationText
            });

        }
    }

    _onRegistration() {
        if (this.state.loginText != styles.unLoginText || this.state.registrationText != styles.registrationText) {
            this.setState({
                loginText: styles.unLoginText,
                loginVis: 1,
                registrationText: styles.registrationText
            });
        }
    }

    _submit(loginVis) {
        dismissKeyboard()
    }

    _commit(navigate) {
        let account = {telephone: "", passWord: ""};
        let {goBack, state} = this.props.navigation;
        account.telephone = this.state.telephone;
        account.passWord = this.state.passWord;
        if (this.state.loginVis == 0) {
            //登录

            if (account.telephone.length > 0 && account.passWord.length > 0) {
                // DBStore.save(Config.KEY.account, account);

                // NetworkUtil.fetchRequest(Config.URL.Login.url, Config.URL.Login.method, {
                //     login_name: account.telephone,
                //     password: account.passWord
                // }, function (success, responseData) {
                //     if (success){
                //         DBStore.save(Config.KEY.user, responseData);
                //         DeviceEventEmitter.emit(Config.DEE.LoginSuccess, responseData);
                //         DBStore.save(Config.KEY.account, account);
                //         goBack()
                //     }
                // });

                ApiServer.getLogin(account.telephone, account.passWord, function (success, user) {
                    if (success) {
                        goBack();
                    }
                })
            }
        } else {
            //注册
            if (account.telephone.length > 0) {
                let re = /^1\d{10}$/;
                if (re.test(account.telephone)) {
                    ApiServer.getSms(account.telephone, function (success, ret) {
                        if (success) {
                            navigate('Registration', {telephone: account.telephone, type: '注册'});
                        } else {
                            alert('验证码发送失败')
                        }
                    });
                } else {
                    alert('请输入正确的手机号')
                }



            }
        }

    }


    async componentDidMount() {
        let that = this;
        let loginName = await User.getLoginName()
        console.log(loginName + "xxxxxxxxxxxxxxxxxxxxxx");
        if (loginName != null) {
            that.setState({
                telephone: loginName
            })
        }
    }
}

var styles = StyleSheet.create({
    outLinear: {
        width: Config.SCREEN_WIDTH,
        height: Config.SCREEN_HEIGHT,
        flexDirection: 'column',
        backgroundColor: Config.COLOR.white
    },


    headLinear: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Config.SCREEN_WIDTH,
        marginTop: 156,
        marginBottom: 110,
    },


    loginText: {
        fontSize: 35,
        paddingRight: 45,
        fontWeight: 'bold',
        color: Config.COLOR.black,
    },
    unLoginText: {
        fontSize: 35,
        paddingRight: 45,
        fontWeight: 'bold',
        color: Config.COLOR.loginTextUnSelect,
    },
    registrationText: {
        fontSize: 35,
        paddingLeft: 45,
        fontWeight: 'bold',
        color: Config.COLOR.black,
    },
    unRegistrationText: {
        fontSize: 35,
        paddingLeft: 45,
        fontWeight: 'bold',
        color: Config.COLOR.loginTextUnSelect,
    },
    editText: {
        padding: 0,
        width: Config.SCREEN_WIDTH,
        height: 90,
        paddingLeft: 60,
        borderWidth: 1,
        fontSize: 25,
        borderColor: Config.COLOR.loginBorder,
        borderLeftWidth: 0,
        borderRightWidth: 0,
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