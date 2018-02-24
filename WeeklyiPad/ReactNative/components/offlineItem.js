/**
 * Created by yang on 2017/9/7.
 */
import React, {Component} from 'react';
import {
    View,
    Text,TouchableOpacity,
    Image,
    StyleSheet,
    Button,
    navigator,

} from 'react-native';

const MANAGE = '管理';
const CANCEL = '取消';
var ImageHeight = (Config.SCREEN_WIDTH / 4 - 1) * 117 / 93;

import * as Config from "../config";

export default class OfflineItem extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedVisible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSelectedAll){
            this.props.selectAction(true,this.props.item);
            this.setState({
                selectedVisible: true,
            });
        }else {
            if (this.state.selectedVisible){
                this.props.selectAction(false,this.props.item);
                this.setState({
                    selectedVisible: false,
                });
            }
        }
    }


    render() {
        return (
            <TouchableOpacity onPress={()=>this._cellAction(this.props.item)}>
                <View style={styles.itemContainer}>
                    <Image style={styles.magazineCover} source={{uri: this.props.item.thumbnailPath}}>
                        {this._isShowSelectedImage()}
                    </Image>
                    <View style={styles.magazineDes}>
                        <Text numberOfLines={1} style={styles.magazineTitle}>{this.props.item.title}</Text>
                        <Text style={{color: '#999999'}}>NO.{this.props.item.maga_all_number}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    _cellAction = (item)=> {
        if (this.props.rightTitle == CANCEL) {
            this.props.selectAction(!this.state.selectedVisible,item);
            this.setState({
                        selectedVisible: !this.state.selectedVisible,
                    });
        }else {
            const dict = {
                id: item.uid + "",
                path: item.url,
            }
            //离线阅读
            this.props.navigation.navigate('MagazineDir',{localMagazine:dict});
        }

    };


    _isShowSelectedImage() {
        if (this.props.rightTitle == CANCEL) {
            if (this.state.selectedVisible) {
                return (
                    <Image source={require('../images/selection_indicator.png')} style={styles.selectedImage}/>
                );
            };
        }else {
            if (this.state.selectedVisible){
                this.setState({
                    selectedVisible: false,
                });
            }
        }
    }
}


var styles = StyleSheet.create({

    itemContainer: {
        width: Config.SCREEN_WIDTH / 4,
        height: ImageHeight + 12 + 37,
    },

    magazineCover: {
        width: Config.SCREEN_WIDTH / 4,
        height: ImageHeight,
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingRight: 10,
    },

    selectedImage: {
        marginBottom: 0,
        marginRight: 0,
        height: 35,
        width: 35,

    },

    magazineDes: {
        flex: 1,
        alignItems: 'center',
    },

    magazineTitle: {
        marginTop: 6,
        color: 'black',
        height: 20,
        fontSize: 14,

    },
});