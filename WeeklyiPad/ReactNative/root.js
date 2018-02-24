import React, {Component} from 'react';

import {StackNavigator} from 'react-navigation';

import Magazine from './pages/magazine';
import Login from './pages/login';
import MagazineDir from './pages/magazineDir';
import MagazineDetail from './pages/magazineDetail';
import Setting from './pages/setting';
import Offline from './pages/offline';
import Registration from './pages/registration'
import PersonalCenter from './pages/personalCenter'
import UserWebView from  './pages/userWebView';
import ForgetPassword from './pages/forgetPassword'
const AppNavigator = StackNavigator({
        Magazine: {screen: Magazine},
        Login: {screen: Login},
        MagazineDir: {screen: MagazineDir},
        MagazineDetail: {screen: MagazineDetail},
        Registration: {screen: Registration},
        Setting: {screen: Setting},
        Offline: {screen: Offline},
        PersonalCenter: {screen: PersonalCenter},
        UserWebView: {screen: UserWebView},
        ForgetPassword: {screen: ForgetPassword},
    },
    {
        navigationOptions: {
            headerTintColor: '#191919'
        }
    }
);

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};


export class Root extends Component {

    render() {
        return (
            <AppNavigator
                ref={"root"}
                onNavigationStateChange={(prevState, newState, action) => this._navigationChange(prevState, newState, action)}
            />
        );
    }

    _navigationChange(prevState, newState, action) {
        if (action.type === "Navigation/BACK") {
            //返回
            const prevRoute = prevState.routes[prevState.routes.length - 1];
            if (prevRoute.params && prevRoute.params.goBack) {
                prevRoute.params.goBack();
            }
        }

    }

}
