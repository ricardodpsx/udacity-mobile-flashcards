import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Hr from "./Hr";
import {sharedStyles} from "../helpers";


const styles = StyleSheet.create({
  correct: {backgroundColor:"green", width: "50%", padding: 20 , alignItems:"center"},
  incorrect: {backgroundColor:"red", width: "50%", padding: 20, alignItems:"center"}
});


export default class Question  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      showAnswer: false
    })
  }

  toggleShowAnswer() {
    this.setState( prevState =>({showAnswer: !prevState.showAnswer}))
  }

  render() {
    let {card, onCorrect, onIncorrect} = this.props;

    return (
      <View style={sharedStyles.centeredContainer}>
        <Text style={{fontSize: 40}}>{card.question}</Text>

        { this.state.showAnswer
          ? <Button onPress={this.toggleShowAnswer.bind(this)} title="Hide Answer" />
          : <Button onPress={this.toggleShowAnswer.bind(this)} title="Show Answer" />
        }
        {
          this.state.showAnswer
            ?
            <Text style={{fontSize: 25, padding: 20, color: "#666"}}>{card.answer}</Text>
            : null
        }

        <Hr />
        <View style={{flexDirection:"row", margin: 20}} >
          <TouchableOpacity
            style={styles.correct}
            onPress={() => {
              onCorrect()
            }}
          ><Text>Correct</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrect}
            onPress={() => {
              onIncorrect()
            }}
          >
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
