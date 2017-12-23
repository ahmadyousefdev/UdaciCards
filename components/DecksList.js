import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Platform} from 'react-native';
import Deck from './Deck'
import {fetchDecksResults} from '../utils/api'
import {connect} from 'react-redux'
import {receiveDecks} from '../actions'
import {white,blue,purple} from "../utils/colors";

class DecksList extends Component {

    componentDidMount() {
        fetchDecksResults().then((decks) => this.props.dispatch(receiveDecks(decks)))
    }

    renderItem = (listItem) => {
        const {title, questions} = listItem.item;
        const icons = ['🤯','🤔','🤓','⏰','💡️','🧠','💀'];
        const icon = icons[Math.floor(Math.random() * icons.length)];
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {title: title})}>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>
                            {icon}
                        </Text>
                    </View>
                    <View style={styles.deckContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.CardsNumber}>Number of Cards: {questions.length}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {decks} = this.props;
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={decks}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.title}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 1,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        shadowRadius: 3,
        shadowOpacity: .8,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    deckContainer: {

    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        color: blue,
        marginBottom: 4
    },
    CardsNumber: {
        fontSize: 14,
        color: purple
    },
    iconContainer: {
        marginRight: 12,
    },
    icon: {
        fontSize: 42,
    }
});

function mapStateToProps(state) {
    return {
        decks: Object.keys(state).map((title) =>
            state[title]
        )
    }
}

export default connect(mapStateToProps)(DecksList)
