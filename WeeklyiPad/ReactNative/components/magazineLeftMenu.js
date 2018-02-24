import {connect} from "react-redux";

'user strict'
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Modal,
    TouchableHighlight,
    Button,
    FlatList, TouchableOpacity,
} from 'react-native';
import {getMagazineList} from "../actions/magazine";

const styles = StyleSheet.create({
    bubble: {
        width: 250,
        height: 200,
    },
    menu: {
        backgroundColor: '#333333',
        width: 200,
        height: 200,
    },
    button: {
        color: "white",
        fontSize: 18,
    }
});


var data = [];

export class MagazineLeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            menuTop: 0,
            menuLeft: 0,
        };
    }

    componentDidMount() {
        const currentYear = new Date().getFullYear();
        for (var i = currentYear; i >= 2008; i--) {
            data.push(i);
        }
    }


    render() {

        return (

            <View>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}>
                    <TouchableOpacity style={{flex:1}} onPress={() => this.hiddenMenu()} >
                        <View style={[styles.menu, {top: this.state.menuTop + 10, left: this.state.menuLeft}]}>
                            <FlatList
                                ItemSeparatorComponent={() => <View
                                    style={{backgroundColor: 'white', height: 1, marginLeft: 20, marginRight: 20}}></View>}
                                data={data}
                                renderItem={({item}) => this._renderItem(item)}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
                <TouchableHighlight onPress={(e) => this.showMenu(e)}>
                    <Text style={{color: 'white', fontSize: 18, marginLeft: 20}}>年份</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this._itemClick(item)} >
                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={styles.button} >{item + ""}</Text>
                    {/*<Button onPress={() => this._itemClick(item)} style={styles.button}  color="white" title={item + ""}/>*/}
                </View>
            </TouchableOpacity>
        );
    }

    _itemClick(item) {
        // console.log(item);
        this.hiddenMenu();
        if (item == this.props.currentYear) {
            return;
        }
        this.props.dispatch(getMagazineList(item));
    }

    _setModalVisible(visible, left, top) {
        this.setState({
            modalVisible: visible,
            menuTop: top,
            menuLeft: left,
        });
    }


    hiddenMenu() {
        // console.log('hidden menu... ...');
        this._setModalVisible(false);
    }

    showMenu(e) {
        // console.log(e)
        // console.log(e.nativeEvent.pageX + "*" + e.nativeEvent.pageY)
        this._setModalVisible(true, e.nativeEvent.pageX, e.nativeEvent.pageY);
    }

}

function mapStateToProps(state) {
    return {
        currentYear: state.magazineStore.currentYear,
    }
}

export default connect(mapStateToProps)(MagazineLeftMenu);
