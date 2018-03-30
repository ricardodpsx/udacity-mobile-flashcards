import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View,  TextInput, Button} from 'react-native';
import {updateDeck} from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  }
});

class AddCard extends React.Component {

  static navigationOptions = {
    title: 'Add Card',
  };

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };
  }

  getDeck() {
    return this.props.decks[this.props.navigation.state.params.selectedDeck.id];
  }

  handleSaveAndContinue() {
    let deck = this.getDeck();
    this.props.dispatch(updateDeck({...deck, cards:[...deck.cards, this.state] }));
    this.setState({
      question: "",
      answer: ""
    });
  }

  handleSaveAndExit() {
    let deck = this.getDeck();
    this.props.dispatch(updateDeck({...deck, cards:[...deck.cards, this.state] }));
    this.props.navigation.goBack(null)
  }



  render() {

    return (
      <View style={styles.container}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            editable={true}
            style={styles.input}
            onChangeText={(text) => this.setState({question: text})}
            value={this.state.question}
          />

        <Text  style={styles.label}>Answer</Text>
        <TextInput
          style={styles.input}
          editable={true}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
        />
        <Button
          onPress={this.handleSaveAndContinue.bind(this)}
          title="Save and Continue"
        />
        <Button
          onPress={this.handleSaveAndExit.bind(this)}
          title="Save and Exit"
        />

      </View>
    );
  }
}

function mapStateToProps({decks}) {
  return {
    decks: decks
  }
}

export default connect(mapStateToProps)(AddCard);