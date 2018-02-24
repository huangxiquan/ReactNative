/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Platform
} from 'react-native';

import {Root} from './app/root';

import { Provider } from 'react-redux';

import configureStore from './app/store/index';


export default class Index extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(()=>{this.setState({isLoading: false})})
        }
    }

  render() {
      return (
          <Provider store={this.state.store} >
            <Root />
          </Provider>
      )

  }
}




