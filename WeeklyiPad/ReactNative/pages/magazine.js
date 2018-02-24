
'user strict'
import React, {Component} from 'react';
import {
    View,
    FlatList,
    NativeModules,
} from 'react-native';
import MagazineRightMenu from '../components/magazineRightMenu';
import {connect} from 'react-redux';
import {getMagazineList, loadMoreMagazine} from '../actions/magazine'
import MagazineLeftMenu from "../components/magazineLeftMenu";
import LoginListener from '../components/loginListener';
import Loading from "../components/loading";
import MagazineItem from "../components/magazineItem";

var BridgeManager = NativeModules.BridgeManager;

class Magazine extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '第一财经周刊',
            headerTintColor: '#FFFFFF',
            headerLeft: <MagazineLeftMenu />,
            headerRight: <MagazineRightMenu navigate={navigation.navigate} />,
            headerStyle: {backgroundColor: '#191919'},
            headerBackTitle: null,
        };
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // BridgeManager.getAllEntityFromDatebase()
        this.props.dispatch(getMagazineList(this.props.currentYear));

    }

    render() {
        console.log('render...');
        const {data} = this.props;
        console.log(data);
        return (
            <View style={{backgroundColor: '#272727'}}>
                <FlatList
                    data={data}
                    initialNumToRender={10}
                    columnWrapperStyle={{marginTop: 50, marginLeft: 20,}}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({item, index}) => this._renderItem(item)}
                    onEndReached={() => this._loadMore()}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={<Loading />}
                />
                <LoginListener />
            </View>
        );
    }

    _loadMore() {
        console.log("load more... ...");
        this.props.dispatch(loadMoreMagazine());
    }

    _renderItem(item) {
        // console.log(item);
        const value = item.value;
        return (
            <MagazineItem  value={value} navigation={this.props.navigation} />
        );
    }







    componentWillUnmount() {
        this.getDownloadData.remove();
        this.isDownloadSucceed.remove();
    }


}

function mapStateToProps(state) {
    // console.log(state);
    return {
        data: state.magazineStore.data, 
        currentYear: state.magazineStore.currentYear,
        user: state.userStore.user,
    }
}

export default connect(mapStateToProps)(Magazine);
