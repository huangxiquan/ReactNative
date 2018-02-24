/**
 * Created by yang on 2017/8/30.
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
export default class BackNavigation extends Component {
    render() {
        
        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.backStyle}>
                    <Image source={require('../images/backArrow.png')} style={styles.moreBtn}/>
                    <Text style={{color: '#FFFFFF', fontSize: 18, marginLeft: 8}}>返回</Text>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    backStyle:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    moreBtn: {
        width: 18,
        height: 24,
        marginLeft:20,
    },



});