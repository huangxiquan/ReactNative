/**
 * Created by luying on 2017/9/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
}from 'react-native'
import * as Config from "../config";
import * as User from '../store/user'
import Subscribe from '../function/Subscribe'
import ApiServer from '../network/ApiServer'
import  ImagePicker from 'react-native-image-picker';
import RPC from "../RPC"
var BridgeManager = NativeModules.BridgeManager;
var {JSEventManager} = NativeModules;
var JSEventManagerEmitter = new NativeEventEmitter(JSEventManager);
var readability = false;
var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    cancelButtonTitle: '取消',
    quality: 1,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class PersonalCenter extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            user: this.props.navigation.state.params.user,
        };
    }

    static navigationOptions = {
        title: '个人中心',
    };

    render() {
        //noinspection JSUnresolvedVariable
        if (this.state.user != null) {

                readability = this.state.user.has_read_ability;
        }else {
            readability = false
        }
        return (
            <View style={styles.outLinear}>
                <TouchableOpacity
                    style={{
                        width: 140,
                        height: 140,
                        marginTop: 50,
                        alignItems: 'flex-end',

                    }}
                    onPress={() => this._openMycamera()}>


                    {
                        this.state.user == null ? (<Image
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                }}
                                defaultSource={require('../images/icon_default_photo_normal.png')}/>
                            ) : (<Image
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                }}
                                defaultSource={require('../images/icon_default_photo_normal.png')}
                                source={{uri: this.state.user.avatar}}/>)
                    }


                    {
                        readability ? (
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderBottomWidth: 0,
                                        marginRight: 6,
                                        marginTop: -36,
                                        overflow: 'visible'

                                    }}
                                    source={require('../images/vip.png')}
                                />) : (null)
                    }
                </TouchableOpacity>
                <Text style={{marginTop: 10, fontSize: 20}}>
                    {this.state.user == null ? '' : this.state.user.nickname}
                </Text>
                <View
                    style={{
                        height: 1,
                        backgroundColor: Config.COLOR.loginTextUnSelect,
                        width: Config.SCREEN_WIDTH,
                        marginTop: 40
                    }}/>


                <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20,}}
                    onPress={() => {
                        this.props.navigation.navigate('Registration', {
                            telephone: this.state.user.login_name,
                            type: '修改用户名'
                        });
                    }}>
                    <Text style={{flex: 1, fontSize: 20, paddingLeft: 20}}>
                        修改用户名
                    </Text>
                    <Image
                        style={{width: 40, height: 40, marginRight: 20,}}
                        source={require('../images/btn_more_normal.png')}
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Registration', {
                            telephone: this.state.user.login_name,
                            type: '修改密码'
                        });
                    }}
                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Text style={{flex: 1, fontSize: 20, paddingLeft: 20}}>
                        修改密码
                    </Text>
                    <Image
                        style={{width: 40, height: 40, marginRight: 20}}
                        source={require('../images/btn_more_normal.png')}/>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this._pay(this.state.user)
                    }}
                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Text style={{flex: 1, fontSize: 20, paddingLeft: 20}}>
                        订阅续订
                    </Text>
                    <Image
                        style={{width: 40, height: 40, marginRight: 20}}
                        source={require('../images/btn_more_normal.png')}/>

                </TouchableOpacity>
                <View style={{
                    flex: 1, flexDirection: 'row-reverse', alignItems: 'flex-end'
                }}>

                    <TouchableOpacity style={{
                        width: Config.SCREEN_WIDTH,
                        height: 150,
                        alignItems: 'center',
                        borderTopColor: Config.COLOR.loginTextUnSelect,
                        borderTopWidth: 1,
                    }}
                                      onPress={() => this._clearUser()}
                    >
                        <Text style={{color: 'red', fontSize: 20, marginTop: 30}}>
                            退出
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _pay(user) {
        let navigate = this.props.navigation.navigate;
        Subscribe.subscribe(user, navigate)
    }

    _clearUser() {
        if (this.state.user != null) {
            User.removeUser();
            this.props.navigation.goBack();
        }

    }

    _openMycamera = () => {
        if (this.state.user == null) {
            return;
        }
        let uuid = '';
        let key = '';
        BridgeManager.getUUIDResult((uuids) => {
            uuid = uuids;
        });
        ImagePicker.showImagePicker(photoOptions, (response) => {
            let time = (new Date(response.timestamp)).getTime();
            if (uuid == '') {
                key = this.state.user.id + "_" + time + response.fileName;
            } else {
                key = this.state.user.id + "_" + uuid;
            }
            let formInput = {
                key: key,
            };

            RPC.uploadFile(response.uri, "2Rk4xCaWinrr1iooUWR4HRTpkiVb8lzP4CXH8y5A:hPDUNbdlSFx1KcwxwbzpScqRhCo=:eyJzY29wZSI6ImNibndlZWtseS1maWxlIiwiZGVhZGxpbmUiOjE2MzI3MTEyOTh9", formInput, (success) => {
                if (success) {
                    let user = this.state.user;
                    user.avatar = key;
                    ApiServer.getChangeUserInfo(user, (success, ret) => {
                        if (success) {
                            alert('头像上传成功')
                        }
                    })
                } else {
                    alert('头像上传失败')
                }
            });
            if (response.didCancel) {
                return
            }

        })


    }

    componentDidMount() {
        let that = this;


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
            that.setState({
                user: result,
            })
        });
    }

    componentWillUnmount() {

        this.loginSuccess.remove();
        this.logoutSuccess.remove();
        this.subscribeResult.remove();
    }
}

var styles = StyleSheet.create({
    outLinear: {
        width: Config.SCREEN_WIDTH,
        height: Config.SCREEN_HEIGHT,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Config.COLOR.white
    },

    changePassWord: {
        width: Config.SCREEN_WIDTH,
        height: 90,
        fontSize: 25,
        paddingLeft: 40,
    },


});