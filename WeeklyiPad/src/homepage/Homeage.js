/**
 * Created by luying on 2017/8/22.
 */
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {Stylesheet, Text, Image, View, TouchableHighlight} from 'react-native'
import {COLOR} from "../confige";

export default class Homepage extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '第一财经周刊',
        headerRight: <TouchableHighlight onPress={() => navigation.navigate('ReLogin')}>
                        <Image style={{width: 40, height: 40}} source={require('../../res/homepage/icon_more.png')}/>
                    </TouchableHighlight>,
        headerTintColor: COLOR.white,
        headerStyle: {backgroundColor: COLOR.black},
        headerLeft: <Text style={{color: COLOR.white, paddingLeft: 20}}>年份</Text>
    });

    constructor (props) {
        super(props);
        this.screenId = props.screenId || 'Homepage'
    }


    render() {
        const {naigate} = this.props.navigation;
        return <View style={{flex: 1, backgroundColor: COLOR.homepageBgc}}>
            <Text style={{color: COLOR.white}}>
                第一财经周刊首页
            </Text>
        </View>
    }
}


//
//
// const styles = StyleSheet.create({
//     yearText:{
//         fontSize:20
//     }
// });


