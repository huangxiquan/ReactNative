/**
 * Created by luying on 2017/8/28.
 */
import React, {Component} from 'react';
import {
    View,
    AsyncStorage
} from 'react-native';

import Storage from 'react-native-storage';

var store;
var size = 1000;
export default class DBStore {

    //noinspection JSUnresolvedVariable
           static _getDBSore() {
        if (store == undefined) {
            store = new Storage({
                size: size,
                storageBackend: AsyncStorage,
                defaultExpires: null,
                enableCache: true,
            })
        }

        return store;
    }

    /**
     *
     * @param key
     * @param object
     * @private 永久存储
     */
    static save(key, object) {
        this._save1(key, object, null)
    }


    static _save1(key, object, expires) {
        this._getDBSore();
        store.save({
            key: key,
            data: object,
            expires: expires,
        });
    }

    static load(key, callBack) {
        this._load1(key, null, null, callBack)
    }

    static _load1(key, params, someFlay, callBack) {
        this._getDBSore();
        store.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            //也可以使用“看似”同步的async/await语法
            //  console.log("token....."+ret)

            callBack(true,ret)

        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            //noinspection JSUnresolvedFunction
            // console.log(err);

            callBack(false,err);

            // switch (err.name) {
            //     case 'NotFoundError':
            //         // TODO;
            //         break;
            //     case 'ExpiredError':
            //         // TODO
            //         break;
            // }
        })
    }

    static  loadAsync(key) {
        this._getDBSore();
        return store.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(response => {
            // 如果找到数据，则在then方法中返回
            //也可以使用“看似”同步的async/await语法
            //  console.log("token....."+ret)
            return response;
        })
            .then(repose => {
                return repose
            })
            .catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                return null;
                // switch (err.name) {
                //     case 'NotFoundError':
                //         // TODO;
                //         break;
                //     case 'ExpiredError':
                //         // TODO
                //         break;
                // }
            });
    }

    static removeAll() {
        this._getDBSore();
        store.clearMap();
    }

    static clearDataByKey(key) {
        this._getDBSore();
        store.clearMapForKey(key);
    }

    static removeByKey(key) {
        this._getDBSore();
        store.remove({
            key: key
        })
    }


    static getAllDataForKey(key) {
        this._getDBSore();
        store.getAllDataForKey('user').then(users => {
            // console.log(users+"...");
        });
    }


}