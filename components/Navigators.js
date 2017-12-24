import React from 'react'
import {StackNavigator, TabNavigator} from "react-navigation";
import {darkPurple, purple, white} from "../utils/colors";
import {FontAwesome} from '@expo/vector-icons'
// Components
import CardCreate from "./CardCreate";
import DecksList from "./DecksList";
import {Platform} from "react-native";
import DeckCreate from "./DeckCreate";
import Quiz from "./Quiz";
import Deck from "./Deck";

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

export default Navigator = StackNavigator ({
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
        screen: DeckCreate,

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

