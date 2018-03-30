import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {clearLocalNotification, sharedStyles} from "../helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  mainButton: {
      fontSize: 30,
      marginBottom: 30,
      color: "#618cff"
  },
  centeredContainer: {
    alignItems: "center",
    height: "90%",
    justifyContent: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center"
  },
  subTitle: {
    color: "#888",
    fontSize: 18,
    marginTop: 15
  }
});


class DeckView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });

  constructor(props) {
    super(props);
  }

  handleAddCard() {
    this.props.navigation.navigate('AddCard', {selectedDeck: this.deck});
  }

  handleStartQuiz() {
    clearLocalNotification();
    this.props.navigation.navigate('CardsQuiz', {selectedDeck: this.deck});
  }

  render() {
    this.deck = this.props.decks[this.props.navigation.state.params.selectedDeck.id];

    return <View style={styles.container}>


      <View style={sharedStyles.topButtonContainer}>
        <TouchableOpacity
          style={{width: 80}}
          onPress={() => {
            this.handleAddCard()
          }}
        >
          <Text style={sharedStyles.topButton}>+ Add Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredContainer}>
        <View style={{marginBottom: 50, alignItems: "center"}}>
          <Text style={styles.title}>{this.deck.title}</Text>
          <Text style={styles.subTitle}>Cards {this.deck.cards.length}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.handleStartQuiz()
          }}>
          <Text style={styles.mainButton}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
}


function mapStateToProps({decks}) {
  return {
    decks: decks
  }
}

export default connect(mapStateToProps)(DeckView);