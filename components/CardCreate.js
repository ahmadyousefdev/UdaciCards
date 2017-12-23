import React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Platform} from 'react-native';
import {addCard} from '../actions'
import {connect} from 'react-redux'
import {addCardToDeck} from '../utils/api'
import {gray, purple, white} from "../utils/colors";

class CardCreate extends React.Component {
    state = {
        question: '',
        answer: ''
    };
    submit = () => {
        const {question, answer} = this.state;
        const card = {question, answer};
        const {title} = this.props;
        this.props.dispatch(addCard(title, card));
        addCardToDeck(title, card);
        // Resetting the state to null
        this.setState({
            question: '',
            answer: ''
        });
        this.props.navigation.navigate('Deck', {title: title});
    };
    handleQuestionChange = (value) => {
        this.setState({question: value})
    };
    handleAnswerChange = (value) => {
        this.setState({answer: value})
    };
    render() {
        const {question, answer} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Add a new card to deck</Text>
                <TextInput
                    placeholder="Write the question here"
                    value={question}
                    style={styles.input}
                    onChangeText={this.handleQuestionChange}
                    enablesReturnKeyAutomatically = {true}
                />
                <TextInput
                    placeholder="Write the answer here"
                    value={answer}
                    style={styles.input}
                    onChangeText={this.handleAnswerChange}
                    enablesReturnKeyAutomatically = {true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        color: gray,
        backgroundColor: white,
        margin: 5,
        borderRadius: Platform.OS === 'ios' ? 16 : 1,
        padding: 20,
        shadowRadius: 3,
        shadowOpacity: .8,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 3
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
});
function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        title,
        deck: state[title]
    }
}
export default connect(mapStateToProps)(CardCreate)
