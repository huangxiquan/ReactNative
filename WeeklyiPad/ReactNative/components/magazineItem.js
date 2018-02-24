'use strict'

import {connect} from "react-redux";

import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    NativeModules,
    NativeEventEmitter,
    View,
    TouchableHighlight,
    Image,
    PixelRatio,
} from 'react-native';
import * as Config from "../config";
import Subscribe from "../function/Subscribe";


var {JSEventManager} = NativeModules;
var JSEventManagerEmitter = new NativeEventEmitter(JSEventManager);
var BridgeManager = NativeModules.BridgeManager;
var density = PixelRatio.get();
var Dimensions = require('Dimensions');
var imageWidth = density * 150;
var ScreenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    moreBtn: {
        width: 40,
        height: 40,
    },
    itemContainer: {
        width: (ScreenWidth - 20) / 2,
        flexDirection: 'row',
        paddingRight: 20,
    },
    magazineCover: {
        width: 150,
        height: 190,
        backgroundColor: 'grey',
    },
    magazineDes: {
        flex: 1,
        alignItems: 'center',
    },
    subBtn: {
        marginTop: 30,
        backgroundColor: '#4c82b1',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'white',
        width: 140,
    },
    magazineTitle: {
        paddingLeft: 10,
        marginTop: 10,
        color: 'white',
        height: 30,
    },

});

class MagazineItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDownload: false,
            isDownloading: false,
        }
    }

    componentWillMount() {
        const {value} = this.props;
        this.isDownloadSucceed = JSEventManagerEmitter.addListener(Config.DEE.isDownloadSucceed, (result) => {
            console.log(result)
            if(result.resultDict.path == value.package_path) {
                if(result.resultDict.isSuccess) {
                    this.setState({
                        ...this.state,
                        isDownload: true,
                        isDownloading: false,
                    });
                }else {
                    this.setState({
                        ...this.state,
                        isDownload: false,
                        isDownloading: false,
                    });
                }
            }
        },null);

        this.deleteMagazineData = JSEventManagerEmitter.addListener(Config.DEE.deleteMagazineData, (result) => {
            console.log(result)
            result.data.forEach(item => {
                if(item.uid == (value.id + "")) {
                    this.setState({
                        ...this.state,
                        isDownload: false,
                    });
                }
            });
        },null);

        BridgeManager.isDownloadMagazine(this.props.value.id + "",this.props.user.id + "",(result) => {
            console.log(result);
            if(result) {
                this.setState({
                    ...this.state,
                    isDownload: true,
                });
            }
        });

    }

    render() {
        // console.log("id:" + this.props.magazineId);
        const { value } = this.props;
        return(
            <View style={styles.itemContainer}>
                <TouchableHighlight onPress={() => this._jumpToMagazineDir(value.id, value.package_path)}>
                    <Image style={styles.magazineCover}
                           source={{uri: value.cover_url + "?thumbnail/" + imageWidth + "x"}}/>
                </TouchableHighlight>
                <View style={styles.magazineDes}>
                    <Text numberOfLines={2} style={styles.magazineTitle}>{value.summary}</Text>
                    <Text style={{marginTop: 20, color: '#999999'}}>NO{value.maga_all_number}</Text>
                    <Text style={{color: '#999999'}}>{this._getDate(value.name)}</Text>
                    <Text style={{color: '#999999'}}>{this._getPeriod(value.name)}</Text>
                    <TouchableOpacity onPress={() => this._downloadMagazine(value.package_path)}>
                        <Text ref={"btnState"} style={styles.subBtn}>{this._getContent()}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    componentWillUnmount() {
        this.isDownloadSucceed.remove();
    }

    _getContent() {
        return this.props.user.has_read_ability ? (this.state.isDownloading ? "下载中..." : (this.state.isDownload ? "离线阅读" : "下载")) : "订阅";
    }

    _downloadMagazine(currentPath) {
        if(this.props.user.has_read_ability) {
            //下载或者离线阅读
            const dict = {
                id: this.props.value.id + "",
                path: this.props.value.package_path,
            }
            if(this.state.isDownload) {
                //离线阅读
                this.props.navigation.navigate('MagazineDir',{localMagazine:dict});
            }else {
                if(!this.state.isDownloading) {
                    console.log(currentPath);
                    BridgeManager.downloadMagazine(currentPath);
                    this.setState({
                        ...this.state,
                        isDownloading: true,
                    });
                }
            }
        }else {
            //订阅
            if(this.props.user.id) {
                Subscribe.subscribe(this.props.user, this.props.navigate)
            }else {
                this.props.navigation.navigate("Login");
            }

        }
    }

    _jumpToMagazineDir(id, currentPath) {
        id = id + "";
        var dict = {
            id: id,
            path: currentPath,
        };

        if(this.props.user.id) {
            //已经登录
            if(this.props.user.has_read_ability) {
                if(this.state.isDownload) {
                    this.props.navigation.navigate('MagazineDir',{localMagazine:dict});
                }else {
                    this.props.navigation.navigate('MagazineDir', {'magazineId': id});
                }
            }
        }else {
            this.props.navigation.navigate("Login");
        }

    }

    _getDate(name) {
        return name.split(' ')[0];
    }

    _getPeriod(name) {
        return name.split(' ')[1];
    }
}


function mapStateToProps(state) {
    return {
        user: state.userStore.user,
    }
}


export default connect(mapStateToProps)(MagazineItem);