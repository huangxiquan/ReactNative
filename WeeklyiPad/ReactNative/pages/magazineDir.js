import React, { Component } from 'react';
import {
    View,
    SectionList,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    NativeModules,
    NativeEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
import {clearMagazineDir, getMagazineDir} from "../actions/magazineDir";
import {changeDataToBlog} from "../util";
import Loading from "../components/loading";
import * as User from "../store/user";
import * as Config from "../config";
import * as TYPES from '../actions/index';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var BridgeManager = NativeModules.BridgeManager;
var {JSEventManager} = NativeModules;
var JSEventManagerEmitter = new NativeEventEmitter(JSEventManager);


var styles = StyleSheet.create({
    columnIcon: {
        width: 80,
        height: 80,
        backgroundColor: 'grey',
        borderRadius: 40,
    },
    magazineContainer: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 40,
    },
    coverImage: {
        flex: 1,
        backgroundColor: 'grey',
        height: (ScreenWidth - 40) / 3,
    },
    columnContainer: {
        flexDirection:'row',
        backgroundColor:'white',
        paddingTop: 30,
    }
});

class MagazineDir extends Component {
    static navigationOptions = () => {
        return {
            headerTitle: '杂志目录',
            headerBackTitle: '目录',
        };
    };



    componentDidMount() {
        // console.log("===========");
        // console.log(this.props.navigation.state);
        console.log("componentDidMount...")
        this.getDownloadData = JSEventManagerEmitter.addListener(Config.DEE.downloadData, (result) => {
            console.log("download data ...:");
            console.log(result);
            this.props.dispatch({
                type: TYPES.MAGAZINE_DIR_OFFLINE,
                data: result.data,
            });

        },null);
        const { magazineId,localMagazine } = this.props.navigation.state.params;
        console.log(localMagazine);
        if(magazineId) {
            this.props.dispatch(getMagazineDir(magazineId));
        }
        if(localMagazine) {
            BridgeManager.goShowMagazine(localMagazine);
        }
    }

    render() {
        console.log("render ...")
        const { magazineDir,offlineMagazineDir } = this.props;
        console.log(magazineDir);
        console.log(offlineMagazineDir);
        if(offlineMagazineDir.length) {
            var offineSections = [];
            offlineMagazineDir.forEach((section,index) => {
                offineSections.push({key:index,data:section.articleModels.map(changeDataToBlog)});
            });
            console.log(offineSections);
            return (<View style={{paddingLeft:20,paddingRight:20,backgroundColor:'white'}}>
                        <SectionList
                            initialNumToRender = {6}
                            renderItem={({item}) => this._renderOfflineItem(item.value)}
                            renderSectionHeader={({section}) => this._renderSectionOfflineHeader(section)}
                            sections={offineSections}
                            ListEmptyComponent={<Loading/>}
                        />
                    </View>);
        }else if(magazineDir.length) {
            var sections = [];
            magazineDir.forEach((section,index) => {
                // console.log(index);
                sections.push({key:index,data:section.value.articles.map(changeDataToBlog)})
            });
            return(
                <View style={{paddingLeft:20,paddingRight:20,backgroundColor:'white'}}>
                    <SectionList
                        initialNumToRender = {3}
                        renderItem={({item}) => this._renderItem(item.value)}
                        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                        sections={sections}
                        ListEmptyComponent={<Loading />}
                    />
                </View>
            );
        }else {
            return (<Loading/>);
        }
    }

    _renderSectionOfflineHeader(section) {
        const { offlineMagazineDir } = this.props;
        // console.log(section);
        // console.log(data);
        const item = offlineMagazineDir[section.key];
        // console.log(item);
        return (
            <View style={styles.columnContainer}>
                <Image style={styles.columnIcon} source={{uri:item.column_icon}}  />
                <View style={{justifyContent:'center',marginLeft:10}}>
                    <Text style={{fontSize:25}} >{item.column_name}</Text>
                    <Text style={{marginTop:10,fontSize:20,color:'#9b9b9b'}} >{item.articleModels.length}篇文章</Text>
                </View>
            </View>
        );
    }

    _renderSectionHeader(section) {
        // console.log(section);
        const { magazineDir } = this.props;
        // console.log(magazineDir);
        const item = magazineDir[section.key].value;
        return (
            <View style={styles.columnContainer}>
                <Image style={styles.columnIcon} source={{uri:item.column_icon}}  />
                <View style={{justifyContent:'center',marginLeft:10}}>
                    <Text style={{fontSize:25}} >{item.column_name}</Text>
                    <Text style={{marginTop:10,fontSize:20,color:'#9b9b9b'}} >{item.articles.length}篇文章</Text>
                </View>
            </View>
        );
    }

    _renderOfflineItem(item) {
        // console.log(item);
        return (
            <TouchableWithoutFeedback onPress={() => this._jumpToOfflineMagazineDetail(item)}>
                <View style={styles.magazineContainer}>
                    <View style={{flex:2,marginRight:20,}}>
                        <Text style={{fontSize:25,fontWeight:'bold'}}>{item.title}</Text>
                        <Text style={{fontSize:20,color:'#9b9b9b',marginTop:20}}>{item.summary}</Text>
                    </View>
                    <Image style={styles.coverImage}  source={{uri:item.cover_url}} />
                </View>
            </TouchableWithoutFeedback>)
    }

    _jumpToOfflineMagazineDetail(item) {
        this.props.navigation.navigate('MagazineDetail',{offlineMagazineDetail:item});
    }

    _renderItem(item) {
        // console.log(item)
        return (
            <TouchableWithoutFeedback onPress={() => this._jumpToMagazineDetail(item.id)}>
            <View style={styles.magazineContainer}>
                <View style={{flex:2,marginRight:20,}}>
                    <Text style={{fontSize:25,fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{fontSize:20,color:'#9b9b9b',marginTop:20}}>{item.summary}</Text>
                </View>
                <Image style={styles.coverImage}  source={{uri:item.cover_url}} />
            </View>
            </TouchableWithoutFeedback>
        );
    }

    _jumpToMagazineDetail(id) {
        User.getUser(user => {
            if(user) {
                this.props.navigation.navigate('MagazineDetail',{id:id})
            }else {
                this.props.navigation.navigate('Login');
            }
        });
    }

    componentWillUnmount() {
        console.log("componentWillUnmount... ...");
        this.props.dispatch(clearMagazineDir());

    }
}



function mapStateToProps(state) {
    // console.log(state);
    return {
        magazineDir: state.magazineDirStore.magazineDir,
        offlineMagazineDir: state.magazineDirStore.offlineMagazineDir,
    }
}

export default connect(mapStateToProps)(MagazineDir);