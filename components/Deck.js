import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import {purple, white} from '../utils/colors'

function Deck({ deck, navigation }) {

    const { title, questions } = deck;
    return (
        <View style={styles.container}>

            <View style={styles.desc}>
                <Text style={[styles.descText, {fontWeight: 'bold'}]}>{title}</Text>
                <Text style={styles.descText}>Number of Cards : {questions.length}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CardCreate', { title: title })}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Add Card</Text>
            </TouchableOpacity>
            {questions.length > 0 ? <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Quiz', { title: title })}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Start Quiz</Text>
            </TouchableOpacity> :
            <Text style={styles.descText}>
                Quiz is not available yet, you have to add cards first
            </Text>
            }


        </View>
    )
}

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        title,
        deck: state[title]
    }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        marginBottom: 10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:purple,
        borderRadius:10,
        borderWidth: 1,
        shadowRadius: 3,
        shadowOpacity: .8,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    submitText:{
        color:white,
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    desc: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    descText: {
        fontSize: 30,
        textAlign: 'center'
    }
});
