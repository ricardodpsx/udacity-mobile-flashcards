import React from "react";
import {connect} from "react-redux";
import {Button, StyleSheet, Text, View} from 'react-native';
import Question from "./Question";
import {sharedStyles} from "../helpers";


const styles = StyleSheet.create({
  subTitle: {fontSize: 25, padding: 20, color: "#666"},
  title: {fontSize: 40,  fontWeight: 'bold', padding: 20, color: "#000"},
  topText: {padding:10, color: "#666"}
});

class CardsQuiz extends React.Component {
  static navigationOptions = {
    title: 'Card',
  };

  constructor(props) {
    super(props);
    this.state = {
      correctCount: 0,
      currentQuestion: 0,
    }
    this.deck = this.props.navigation.state.params.selectedDeck;
    console.assert(this.deck);
  }

  handleCorrect() {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      correctCount: prevState.correctCount + 1
    }))
  }

  handleIncorrect() {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1
    }))
  }

  handleRetry() {
    this.setState({
      correctCount: 0,
      currentQuestion: 0,
    });
  }

  render() {
    let cards = this.deck.cards;
    let totalCards = cards.length;
    let card = cards[this.state.currentQuestion];
    let quizIsInProgress = this.state.currentQuestion < totalCards;

    return (
      <View style={sharedStyles.container}>
        {
          (quizIsInProgress) ?
            <Text style={styles.topText}>Question {this.state.currentQuestion + 1} of {cards.length}</Text>
            :null
        }

        {quizIsInProgress
          ? <Question card={card}
                      onCorrect={this.handleCorrect.bind(this)}
                      onIncorrect={this.handleIncorrect.bind(this)}/>
          : <QuizResults correctCount={this.state.correctCount}
                         totalCards={totalCards}
                         onRetry={this.handleRetry.bind(this)}
                         onGoBack={()=>this.props.navigation.goBack(null)}
            />
        }
      </View>
    )
  }
}


function QuizResults({correctCount, totalCards, onRetry, onGoBack}) {
  return (
    <View style={sharedStyles.centeredContainer}>
      <Text style={styles.subTitle}>Quiz Finished!</Text>
      <Text style={styles.title}>
        {correctCount}/{totalCards}
      </Text>
      <Button  onPress={onRetry} title="Restart Quiz" />
      <Button  onPress={onGoBack} title="Back to Deck" />
    </View>
  );
}


export default connect(null)(CardsQuiz);