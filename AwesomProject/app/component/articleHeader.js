'use strict'

import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,

} from 'react-native';


export default class ArticleHeader extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container,this.props.styles]}>
                <Image style={styles.authorImage} source={{uri:this.props.avatar}} />
                <Text style={styles.authorName}>{this.props.name}</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingBottom:25,
    },
    authorImage: {
        width:36,
        height:36,
        borderRadius:18,
        marginRight:8,
    },

    authorName: {
        alignSelf: 'center',
    }
});