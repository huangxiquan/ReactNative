'use strict'
import React,{Component} from 'react';

const Dimensions = require('Dimensions');
const PixelRatio = require('PixelRatio');
const ScreenWidth = Dimensions.get('window').width;




export {ScreenWidth};

export function getImageHeight(url) {
    const size = url.substring(url.lastIndexOf('_') + 1,url.length);
    const arr = size.split('x');
    const height = arr[1] * ScreenWidth  / arr[0];
    return height;
}
