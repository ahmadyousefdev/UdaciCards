import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native'
import { connect } from 'react-redux'
import {purple, white} from '../utils/colors'

class Deck extends Component {

    state = {
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0)
    };

    componentDidMount() {
        const {deck,navigation} = this.props;
        const {opacity} = this.state;
        Animated.timing(opacity, {toValue:1, duration: 1000}).start();

        this.setState({
            deck: deck,
            navigation: navigation
        });
    }

    render() {
        const {deck,navigation} = this.props;
        const { title, questions } = deck;
        const {opacity} = this.state;
        return (
            <Animated.View style={[styles.container,{opacity}]}>

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


            </Animated.View>
        )
    }
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
