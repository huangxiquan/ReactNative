'use strict'

import React,{Component} from 'react';

import {
    View,
    ScrollView,
    Text,
    ListView,
    StyleSheet,
    Image,
} from 'react-native';

import { connect } from 'react-redux';

import { getMagazines } from '../actions/article';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

 class Magazine extends Component {
    constructor(props) {
        super(props);
    }

     componentDidMount() {
         this.props.dispatch(getMagazines());
     }


    _renderRow(rowData) {
        return (
            <View>
                <Image style={styles.coverImage} source={{uri:rowData.cover_url}} />
            </View>
        );
    }


    render() {
        return (
            <View>
                <View style={styles.listContainer}>
                    <ListView
                        dataSource={ds.cloneWithRows(this.props.magazines)}
                        renderRow={(rowData) => this._renderRow(rowData)}
                        horizontal={true}
                    />
                </View>
                <Text>hahhhaha</Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    rowContainer: {

    },
    coverImage: {
        width:279,
        height:352,
        marginLeft:40,
    },
    listContainer: {
        flexDirection:'row',
    }
});

function mapStateToProps(state) {
    return {
        magazines:state.articleStore.magazines,
    }
}


export default connect(mapStateToProps)(Magazine);