'use strict'

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    ScrollView,
    ListView,
    Image,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
import { getArticleFlow,changeLoadMoreState } from '../actions/article'
import ArticleDetail  from './articleDetail'
import ArticleHeader from '../component/articleHeader';


var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var page = 1;

class Home extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getArticleFlow(1));
    }


    shouldComponentUpdate() {
        return true;
    }



    render() {
        console.log("render...");
        const {isRefreshing} = this.props;
        return (
               <ListView
                    dataSource={ds.cloneWithRows(this.props.articles)}
                    enableEmptySections={true}
                    renderRow={(rowData) => this._renderRow(rowData)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    onEndReached={() => this._loadMore()}
                    renderFooter={() => this._renderFooter()}
                    refreshControl= {
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => this._onRefresh()}
                         />
                    }
               />
        )
    }

    _onRefresh() {
        this.props.dispatch(getArticleFlow(1));
    }

    _renderFooter() {
        const {articles,isRefreshing} = this.props;
        if(articles.length < 1 || isRefreshing) {
            return null;
        }
        return (
            <View style={styles.footContainer} >
                <ActivityIndicator />
            </View>
        );
    }

    _pressRow(article) {
        // console.log("click");
        // console.log(this.props);
        // console.log(this.props.navigator);
        this.props.navigator.push({
            component: ArticleDetail,
            title: '',
            passProps: {
                article: article,
            }

        });
    }

    _renderRow(rowData) {
        // console.log(rowData.data[0].cover_url);
        // console.log("width:" + ScreenWidth);
        if(rowData.type === 'theme') {
            console.log("theme...");
            return (<View></View>)
        }

        const {name,avatar} =  rowData.data[0].authors[0];

        return (
            <View style={styles.rowContainer} >

                <ArticleHeader
                    name={name}
                    avatar={avatar}
                />
                    <TouchableHighlight onPress={() => this._pressRow(rowData.data[0])} >
                        <Image style={styles.rowCoverImage} source={{uri:rowData.data[0].cover_url}} />
                    </TouchableHighlight>
                <Text style={styles.rowTitle}>{rowData.data[0].title}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height: 1, backgroundColor: '#d8d8d8'}}>
            </View>
        );
    }

    _loadMore() {
        console.log("load more...")
        const {isRefreshing,isLoadingMore} = this.props;
        if(isRefreshing || isLoadingMore) {
            return;
        }
        this.props.dispatch(changeLoadMoreState(true));
        page = page + 1;
        this.props.dispatch(getArticleFlow(page));
    }

}

const styles = StyleSheet.create({
    rowContainer: {
        flex:1,
        flexDirection:'column',
        paddingBottom:35,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:40,
    },
    frontContainer: {
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
    },
    rowCoverImage: {
        width:ScreenWidth - 30,
        height:190
    },
    rowTitle: {
        fontSize:25,
        fontWeight:'bold',
        marginTop:19,
    },
    footContainer: {
        justifyContent:'center',
        flexDirection: 'row'
    },
});

function mapStateToProps(state) {
    return {
        articles: state.articleStore.articles,
        isLoadingMore: state.articleStore.isLoadingMore,
        isRefreshing: state.articleStore.isRefreshing,
    }
}



export default connect(mapStateToProps)(Home);
