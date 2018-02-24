/**
 * Created by luying on 2017/8/21.
 */
import React from 'react';
import {Text, Image} from 'react-native';

import {COLOR} from "../confige";

export default class ReLogin extends React.Component{
    // static navigationOptions = ({navigation}) => ({
    //     title: '',
    //     headerRight: <Image style={{width: 40, height: 40}} source={require('../../res/homepage/icon_more.png')}/>,
    //     headerTintColor: COLOR.white,
    //     headerStyle: {backgroundColor: COLOR.black},
    //     headerLeft: <Text style={{color: COLOR.white, paddingLeft: 20}}>年份</Text>
    // });
    constructor (props){
        super(props)
        this.screenId = props.screenId || 'ReLogin'
    }
    render(){
        const { params } = this.props.navigation.state;
        return <Text>第一财经周刊</Text>
    }
}