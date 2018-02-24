'use strict'

import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';

var Dimensions = require('Dimensions');

var ScreenHeight = Dimensions.get('window').height;

export default class Loading extends Component {


   render() {
       return (<ActivityIndicator size="large"
                                  style={{paddingBottom:100,height:ScreenHeight,backgroundColor:'transparent'}}
       />);
    }

}