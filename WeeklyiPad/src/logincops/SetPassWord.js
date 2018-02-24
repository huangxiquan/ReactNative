/**
 * Created by luying on 2017/8/21.
 */
import React from 'react'
import {Text} from 'react-native'
class SetPassWord extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '第一财经周刊设置密码'
    });

    constructor(props) {
        super(props);
        this.screenId = props.screenId || 'SetPassWord'
    }

    render() {
        const {params} = this.props.navigation.state;
        return <Text>第一财经周刊设置密码</Text>
    }
}