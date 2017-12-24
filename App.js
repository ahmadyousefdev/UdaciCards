import React from 'react'
import {View, StatusBar} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {purple} from "./utils/colors"
import { setLocalNotification } from './utils/helpers'
import { Constants } from 'expo'

import Navigator from './components/Navigators'

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor: backgroundColor , height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex:1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <Navigator/>
                </View>
            </Provider>
        );
    }
}