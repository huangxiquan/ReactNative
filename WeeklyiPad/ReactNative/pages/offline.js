/**
 * Created by yang on 2017/8/31.
 */
'user strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Button,
    Image,
} from 'react-native';

import BackNavigation from '../components/backNavigation'
import * as Config from "../config";
import OfflineItem from '../components/offlineItem'


var isClickManage = false;
const MANAGE = '管理';
const CANCEL = '取消';
var BridgeManager = require('react-native').NativeModules.BridgeManager;
var itemsArray = Array();

export default class Offline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectedAll: false,
            data:[],
        };
    }

    componentWillMount() {
        BridgeManager.myOfflineMagazine((offlineData) => {
            this.setState({
                data: offlineData,
            });
        });
    }
    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {
            headerTitle: '离线杂志',
            headerLeft: <BackNavigation navigation={navigation}/>,
            headerStyle: {backgroundColor: '#191919'},
            headerTintColor: '#FFFFFF',
            headerRight: <TouchableOpacity onPress={() => {
                isClickManage = !isClickManage;
                setParams({
                    rightTitle: isClickManage ? '取消' : '管理',
                })
            }}>
                <Text style={styles.navigationRight}>{navigation.state.params.rightTitle}</Text>
            </TouchableOpacity>
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    initialNumToRender={20}
                    columnWrapperStyle={{marginBottom: 6}}
                    horizontal={false}
                    numColumns={4}
                    renderItem={({item, index}) => this._renderItem(item)}

                />
                {
                    this._judgeIsShowOfflineBottomBar()
                }
            </View>
        );
    }


    _judgeIsShowOfflineBottomBar() {
        switch (this.props.navigation.state.params.rightTitle) {
            case MANAGE:
                if (this.state.isSelectedAll) {
                    this.setState({
                        isSelectedAll: false,
                    });
                }
                break;
            default:
                return (
                    <View style={styles.offlineBottomBar}>
                        <Button color='white' title="全部选中" onPress={() => this._selectAllAction()}/>
                        <Button color='white' title="删除" onPress={() => this._deleteAction()}/>
                    </View>
                );
                break;
        }
    }

    _selectAllAction() {
        this.setState({
            isSelectedAll: true,
        });
    }

    _deleteAction() {
        if (itemsArray.length > 0){
            BridgeManager.deleteMagazineEntity(itemsArray,(offlineData) => {
                this.setState({
                    data: offlineData,
                });
                itemsArray = Array();
                this.setState({
                    isSelectedAll: false,
                });
            });
        }
    }


    _renderItem = (item) => {
        return (
            <OfflineItem navigation={this.props.navigation} rightTitle={this.props.navigation.state.params.rightTitle} item={item}
                         isSelectedAll={this.state.isSelectedAll} selectAction={(isSelect,item) => this._selectAction(isSelect,item)}/>
        );
    };

    _selectAction(isSelect,item){
        if (isSelect){
            if (itemsArray.indexOf(item) == -1){
                itemsArray.push(item)
            }
        }else {
            if (!(itemsArray.indexOf(item) == -1)){
                itemsArray.removeByValue(item)
            }
        }
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navigationRight: {
        paddingRight: 20,
        color: 'white',
        fontSize: 18,
    },

    offlineBottomBar: {
        width: Config.SCREEN_WIDTH,
        height: 49,
        marginRight: 0,
        marginBottom: 0,
        flexDirection: 'row',
        backgroundColor: '#191919',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },


});