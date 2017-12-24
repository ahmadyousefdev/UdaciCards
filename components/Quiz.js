import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {green, purple, red, white} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'
import {NavigationActions} from 'react-navigation'

class Quiz extends React.Component {

    state = {};

    componentDidMount() {
        const {deck} = this.props;
        this.setState({
            questions: deck.questions.map((item, index) => index),
            correctAnswers: 0
        });
        this.nextQuestion();
        clearLocalNotification()
            .then(setLocalNotification)
    }

    nextQuestion() {
        this.setState((state) => {
            const {questions} = state;
            if (questions.length > 0) {
                const nextQuestion = Math.floor(Math.random() * questions.length);
                return {
                    currentQuestion: questions[nextQuestion],
                    questions: questions.filter((item, index) => index != nextQuestion),
                    isQuestionDisplayed: true
                }
            } else {
                return {
                    currentQuestion: -1,
                    isQuestionDisplayed: true
                }
            }
        })
    }

    flipCard = () => {
        this.setState((state) => ({
                isQuestionDisplayed: !state.isQuestionDisplayed
            })
        )
    };

    handleCorrectAnswer = () => {
        this.setState((state) => ({
                correctAnswers: state.correctAnswers + 1
            })
        );
        this.nextQuestion()
    };

    handleIncorrectAnswer = () => {
        this.nextQuestion()
    };

    restartQuiz = () => {
        this.props.navigation.navigate('Quiz',
            { id: this.props.navigation.state.params.id,
                ...this.props.navigation.state.params});
    };

    goBackToDeck = () => {
        this.props.navigation.navigate('Deck',
            { title: this.props.navigation.state.params.id,
                ...this.props.navigation.state.params
            })
        //this.props.navigation.goBack();
    };

    render() {
        const {deck} = this.props;
        const {questions} = deck;
        const {
            currentQuestion,
            correctAnswers,
            isQuestionDisplayed
        } = this.state;

        if (typeof correctAnswers === 'undefined') {
            return null
        }

        if (currentQuestion < 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.desc}>
                        <Text style={[styles.descText, {fontWeight: 'bold'}]}>
                            Your Score: {(correctAnswers / questions.length) * 100} %
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.restartQuiz}
                        underlayColor={white}>
                        <Text style={styles.submitText}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.goBackToDeck}
                        underlayColor={white}>
                        <Text style={styles.submitText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const item = questions[currentQuestion];
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text>
                        {isQuestionDisplayed ? item.question : item.answer}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.flipCard}
                    underlayColor={white}>
                    <Text style={styles.submitText}>Flip card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: green}]}
                    onPress={this.handleCorrectAnswer}
                    underlayColor={white}>
                    <Text style={styles.submitText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: red}]}
                    onPress={this.handleIncorrectAnswer}
                    underlayColor={white}>
                    <Text style={styles.submitText}>Incorrect</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 1,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        shadowRadius: 3,
        shadowOpacity: .8,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: purple,
        borderRadius: 10,
        borderWidth: 1,
        shadowRadius: 3,
        shadowOpacity: .8,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    submitText: {
        color: white,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
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

function mapStateToProps(state, {navigation}) {
    const {title} = navigation.state.params;
    return {
        state,
        deck: state[title]
    }
}

export default connect(mapStateToProps)(Quiz)
