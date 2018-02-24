/**
 * Created by luying on 2017/8/30.
 */
import React, {Component} from 'react';
import * as Config from '../config';


const ONLINE = true;
const base_url = ONLINE ? Config.BASE_URL.online : Config.BASE_URL.test;
export default class NetworkUtil {
    static fetchRequest(url, method, params,callBack) {
        this.fetchRequestToken(url, method,'', params, callBack)
    }

    static fetchRequestToken(url, method, token,params, callBack){
        let header = null;
        if (token ==''){
            header = {
                "Content-Type": "application/json"
            }
        }else {
            header = {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }


        // console.log('request url:', url, params, callBack);  //打印请求参数
        if (params == '') {
            fetch(base_url + url, {
                method: method,
                headers: header,
            })
                .then((response) => {
                    if (response.ok) {
                        // console.log('.....成功g')
                        return response.json()
                    } else {
                        throw new Error(response.json())
                    }
                })
                .then((responseData) => {
                    // console.log('.....成功gg')
                    callBack(true, responseData.data)
                })
                .catch((error) => {
                    // if (!ONLINE) {
                        console.log(error)
                    // }
                    return callBack(false, error)
                })

        } else {   //如果网络请求中没有参数
            fetch(base_url + url, {
                method: method,
                headers: header,
                body: JSON.stringify(params)
            })
                .then((response) => {
                    if (response.ok) {
                        // console.log(response)
                        // try {
                            return response.json();
                        // } catch(err) {
                            // console.error('error: ' + err);
                        // }
                        // return response.json()
                    } else {
                        throw new Error(response.json())
                    }
                })
                .then((responseData) => {
                    callBack(true, responseData.data)
                })
                .catch((error) => {
                    // if (!ONLINE) {
                        console.log(error)
                    // }
                    return callBack(false, error)
                })
        }
    }


    static fetchRequestQiNiu(url, method, token,params, callBack){
        let header = null;
        if (token ==''){
            header = {
                "Content-Type": "application/json"
            }
        }else {
            header = {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }


        // console.log('request url:', url, params, callBack);  //打印请求参数
        // 'http://upload-z2.qiniu.com'
         //如果网络请求中没有参数
            fetch(url, {
                method: method,
                headers: header,
                body: params
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('.....成功g')
                        // console.log(response)
                        // try {
                        return response.json();
                        // } catch(err) {
                        // console.error('error: ' + err);
                        // }
                        // return response.json()
                    } else {
                        console.log(response)
                        throw new Error(response.json())
                    }
                })
                .then((responseData) => {
                    callBack(true, responseData.data)
                })
                .catch((error) => {
                    if (!ONLINE) {
                        console.log(error)
                    }
                    return callBack(false, error)
                })
        }



}
