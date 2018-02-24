'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Image,
    WebView,
} from 'react-native'

import {getArticleDetail} from '../actions/article';

import { connect } from 'react-redux';

import ArticleHeader from '../component/articleHeader';

import {ScreenWidth,getImageHeight} from '../utils';

import HtmlRender from 'react-native-html-render';

class ArticleDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getArticleDetail(this.props.article.id))
    }

    _renderNode(node, index, parent, type) {

        if(node.name === 'figure') {
            const url = node.children[0].attribs.src;
            console.log(url);
            const height = getImageHeight(url);
            return (
              <Image style={{width:ScreenWidth,height:height,marginTop:10,marginBottom:10,marginLeft:-17}} source={{uri:url}}  />
            );
        }
    }


    render() {
        const {articleDetail} = this.props;
        if(articleDetail) {
            const {avatar,name} = articleDetail.authors[0];
            const {cover_url,title,summary,content} = articleDetail;
            return (
                    <ScrollView>
                    <View style={styles.container}>
                        <ArticleHeader
                            avatar={avatar}
                            name={name}
                            styles={styles.articleHeader}
                        />
                        <Image style={styles.coverImage} source={{uri:cover_url}} />
                        <View style={styles.contentContainer} >
                            <Text style={styles.title} >{title}</Text>
                            <Text style={styles.summary} >{summary}</Text>
                            <HtmlRender
                                value={content}
                                stylesheet={styles}
                                renderNode={this._renderNode}
                            />
                        </View>

                    </View>
                    </ScrollView>
            );
        }else {
            return (
                <ScrollView>
                    <ActivityIndicator />
                </ScrollView>
            )
        }

    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex:1,
    },
    container: {
        flex:1,
    },
    articleHeader: {
        paddingLeft:17,
        paddingTop:16,
        paddingBottom:20,
        paddingRight:17,
    },
    contentContainer: {
        flex:1,
        paddingTop: 16,
        paddingLeft: 18,
        paddingRight: 18,

    },
    coverImage: {
        width:ScreenWidth,
        height: 197,
    },
    title: {
        fontSize: 26,
        fontWeight:'bold',
    },
    summary: {
        fontSize: 16,
        color: "#9b9b9b",
        marginTop: 16,
        marginBottom:20,
    },
    p: {
        lineHeight:27,
        fontSize: 18,
        //marginTop: 15,
        //marginBottom: 15,
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'auto',
    },
    pwrapper: {
        marginTop:10,
        marginBottom:10
    },

});

function mapStateToProps(state) {
    return {
        articleDetail:state.articleStore.articleDetail,
    }
}

export default connect(mapStateToProps)(ArticleDetail)