import React from 'react'
import {View, Platform, StatusBar} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {purple,white,darkPurple} from "./utils/colors"
import { setLocalNotification } from './utils/helpers'
import {FontAwesome} from '@expo/vector-icons'
import { Constants } from 'expo'
// Components
import CardCreate from './components/CardCreate'
import Deck from './components/Deck'
import DeckCreate from './components/DeckCreate'
import DecksList from './components/DecksList'
import Quiz from './components/Quiz'

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor: backgroundColor , height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs = TabNavigator ({
        DecksList : {
            screen: DecksList,
            navigationOptions : {
                tabBarLabel: 'Decks List',
                tabBarIcon: ({tintColor}) => <FontAwesome name='list-ul' size={30} color={tintColor}/>,
                title: 'Decks List'
            }
        },
        DeckCreate : {
            screen: DeckCreate,
            navigationOptions : {
                tabBarLabel: 'Create a Deck',
                tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>,
                title: 'Deck Create'
            }
        }
    },
    {
        navigationOptions : {
            headerStyle: {
                backgroundColor: darkPurple,
            },
            headerTitleStyle: {
                color: white
            }
        }
    },
    {
        tabBarOptions : {
            activeTintColor : Platform.OS === 'ios' ? purple : white,
            style : {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
            }
        }
    });

const MainNavigator = StackNavigator ({
    Home : {
        screen: Tabs
    },
    DecksList: {
        screen: DecksList

    },
    Deck: {
        screen: Deck

    },
    DeckCreate: {
        screen: DeckCreate

    },
    CardCreate: {
        screen: CardCreate

    },
    Quiz: {
        screen: Quiz
    }
},{
    navigationOptions : {
        headerStyle: {
            backgroundColor: darkPurple,
        },
        headerTitleStyle: {
            color: white
        },
        headerTintColor: white,
    }
});

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex:1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}