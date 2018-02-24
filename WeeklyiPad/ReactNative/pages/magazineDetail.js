import {connect} from "react-redux";

'user strict'
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    WebView,
    ActivityIndicator,
} from 'react-native';
import {clearMagazineDetail, getMagazineDetail} from "../actions/magazineDetail";
import * as User from '../store/user'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

var REF_WEBVIEW = 'webview';

var styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: ScreenWidth * 0.04,
    },
    headerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'grey'
    },
    coverImage: {
        width: ScreenWidth,
        height: ScreenWidth * 0.8,
        backgroundColor: 'grey',
    },
    scrollView: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 25,
        padding: ScreenWidth * 0.04,
        fontWeight: 'bold',
    },
    summary: {
        paddingLeft: ScreenWidth * 0.04,
        paddingRight: ScreenWidth*0.04,
        fontSize: 20,
        color: "#9b9b9b",
    }
});

class MagazineDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            webviewHight: 0,
            offlineMagazineDetail:{},
        };
    }

    componentDidMount() {
        const { id,offlineMagazineDetail } = this.props.navigation.state.params;
        const { magazineDetail } = this.props;
        // console.log("componentDidMount...:" + id);
        // console.log(magazineDetail)

        if(id) {
            this.props.dispatch(getMagazineDetail(id,this.props.user.token));
        }else if(offlineMagazineDetail) {
            var content = this._changeContent(offlineMagazineDetail.content);
            offlineMagazineDetail.offlineContent = content;
            offlineMagazineDetail.content = "";
            this.setState({
                ...this.state,
                offlineMagazineDetail:offlineMagazineDetail,
            });
        }
        this.props.navigation.setParams({goBack:this.goBack()});
    }

    goBack() {
        // console.log("go back... ...");
        this.props.dispatch(clearMagazineDetail());
    }


    componentDidUpdate() {
        console.log(this.props.user);
        if (!this.props.user.id) {
            // console.log(this.props.error);
            this._jumpToLogin();
            // return (<View></View>);
        }

    }

    componentWillReceiveProps() {

    }

    render() {
        const magazineDetail= this.props.magazineDetail.id ? this.props.magazineDetail: this.state.offlineMagazineDetail;
        // console.log(magazineDetail);
        const authors = magazineDetail ? magazineDetail.authors : [];
        // console.log(authors);
        // var source = require("../raw/article_detail.html");
        // console.log(source);
        // console.log('render...:');
        if(magazineDetail && magazineDetail.id) {
            return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Image style={styles.headerImage} source={{uri: authors ? authors[0].avatar : ''}}/>
                        <View style={{justifyContent: 'center', marginLeft: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 20}}>{authors ? authors[0].name : ''}</Text>
                                <Text style={{
                                    alignSelf: 'flex-end',
                                    fontSize: 18,
                                }}>{(authors && authors.length > 1) ? " 等" + authors.length + "位作者" : ''}</Text>
                            </View>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 18,
                                color: '#9b9b9b'
                            }}>{this._formatTime(magazineDetail.display_time)}</Text>
                        </View>
                    </View>
                    <Image style={styles.coverImage} source={{uri: magazineDetail.cover_url}}/>
                    <Text style={styles.title}>{magazineDetail.title}</Text>
                    <Text style={styles.summary}>{magazineDetail.summary}</Text>
                    {
                        this._renderWebview(magazineDetail)
                    }

                </ScrollView>
            );
        }else {
            return (
                <ScrollView>
                    <ActivityIndicator />
                </ScrollView>
            );
        }
    }


    _jumpToLogin() {
        this.props.navigation.goBack();
    }

    _handleMessage(e) {
        console.log('handle message... ... ');
        // console.log(this.refs[REF_WEBVIEW]);
        // console.log(this.props.magazineDetail);
        const msg = JSON.parse(e.nativeEvent.data);
        // console.log(msg);
        if(msg.type == "setHeight") {
            this.setState({
                ...this.state,
                webviewHight: msg.data.height + 20,
            });
        }
        // if(message === 'getContent') {
        //     this.refs[REF_WEBVIEW].postMessage("hello html");
        // }
    }

    _formatTime(time) {
        if(!time) {
            return;
        }
        const date = new Date(time);
        const formatTime = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
        // console.log(formatTime);
        return formatTime;
    }

// <!doctype html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <title>Document</title>
// <script src="jquery-3.2.1.min.js"></script>
// <script src="article_detail.js"></script>
// <link rel="stylesheet" href="./article_detail.css" />
// </head>
// <body>
//
// </body>
// </html>
//     http://localhost:8081/assets/ReactNative/raw/article_detail.css

    _changeContent(content) {
        // console.log(content);
        var result = new String();
        result = result.concat("<!doctype html>");
        result = result.concat("<html lang=\"en\">");
        result = result.concat(" <head>");
        result = result.concat("<meta charset=\"UTF-8\">");
        result = result.concat("<title>Document</title>");
        result = result.concat("<link rel = 'stylesheet' href='http://localhost:8081/assets/ReactNative/raw/article_detail.css' />");
        result = result.concat("<script src='http://localhost:8081/assets/ReactNative/raw/jquery-3.2.1.min.js' ></script>");
        result = result.concat("<script src='http://localhost:8081/assets/ReactNative/raw/article_detail.js' ></script>");
        result = result.concat("</head>");
        result = result.concat("<body>");
        result = result.concat(content);
        result = result.concat("</body>");
        result = result.concat("</html>");
        // console.log(result);
        return result;
    }

    _renderWebview(magazineDetail) {
        // console.log(magazineDetail.offlineContent);
        console.log(this.state.webviewHight);
        if(magazineDetail.offlineContent) {
            return (
                <WebView
                    ref={REF_WEBVIEW}
                    style={{height: this.state.webviewHight}}
                    scrollEnabled={false}
                    source={{html:magazineDetail.offlineContent,baseUrl:"file://"}}
                    onLoad={() => this._loadFinish()}
                    onMessage={(e) => this._handleMessage(e)}

                />);
        }else {
            return (
                <WebView
                    ref={REF_WEBVIEW}
                    style={{height: this.state.webviewHight}}
                    scrollEnabled={false}
                    source={require("../raw/article_detail.html")}
                    onLoad={() => this._loadFinish()}
                    onMessage={(e) => this._handleMessage(e)}

                />
            );
        }
    }

    _loadFinish() {
        console.log("_loadFinish... ...");
        const magazineDetail= this.props.magazineDetail.id ? this.props.magazineDetail: this.state.offlineMagazineDetail;

        if(magazineDetail && magazineDetail.id) {
            if(this.refs[REF_WEBVIEW] && this.state.webviewHight == 0) {
                this.refs[REF_WEBVIEW].postMessage(magazineDetail.content);
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        magazineDetail: state.magazineDetailStore.magazineDetail,
        user: state.userStore.user,
        isJumpToLogin: state.magazineDetailStore.isJumpToLogin,
    }
}

export default connect(mapStateToProps)(MagazineDetail);
