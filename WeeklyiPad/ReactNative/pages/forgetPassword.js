/**
 * Created by luying on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'
import * as Config from "../config";
import ApiServer from "../network/ApiServer"
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telephone: ''
        }
    }

    render() {
        return <View style={styles.outLinear}>
            <TextInput
                style={styles.editText}
                placeholder='请输入手机号/邮箱'
                autoCapitalize='none'
                autoCorrect={false}
                defaultValue={this.state.telephone}
                returnKeyType='next'
                maxLength={20}
                onChangeText={(text) => this.setState({telephone: text})}
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
                输入您注册的手机号或者邮箱，我们将向您发送一条由6位数字组成的验证码
            </Text>

            <TouchableOpacity style={styles.commitText} onPress={() => this._commit()}>
                <Text style={{fontSize: 25, color: Config.COLOR.white,}}>
                    获取验证码
                </Text>
            </TouchableOpacity>
        </View>
    }

    _commit() {
        let telephone = this.state.telephone;
        ApiServer.getForgetPasswordSms(telephone, function (success, ret) {
            if (success){
            }
        });

        this.props.navigation.navigate('Registration', {telephone: telephone, type: '重置密码'});



    }
}


var styles = StyleSheet.create({
    outLinear: {
        width: Config.SCREEN_WIDTH,
        height: Config.SCREEN_HEIGHT,
        flexDirection: 'column',
        backgroundColor: Config.COLOR.white
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
        marginTop: 50
    },


});