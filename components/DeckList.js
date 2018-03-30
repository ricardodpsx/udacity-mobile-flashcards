import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Hr from "./Hr";
import {sharedStyles} from "../helpers";

const styles = StyleSheet.create({
  deck: {padding: 10,  alignItems:"center"},
  deckContent: {padding: 40, alignItems:"center"},
  deckTitle: {fontSize: 30, fontWeight:"bold"},
  deckCards: {color:"#888", fontSize: 18, marginTop:15}
});

class DeckList extends React.Component {

  static navigationOptions = {
    title: 'Decks',
  };

  handleSelect(selectedDeck) {
    this.props.navigation.navigate('DeckView', {selectedDeck, title: selectedDeck.title});
  }

  handleAddDeck() {
    this.props.navigation.navigate('AddDeck');
  }

  render() {
    let decks = this.props.decks;
    return (
      <View style={sharedStyles.container}>

        <View style={sharedStyles.topButtonContainer}>
          <TouchableOpacity
            style={{width: 80}}
            onPress={() => {
              this.handleAddDeck()
            }}
            >
            <Text style={sharedStyles.topButton}>+ Add Deck</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{}}
          data={decks}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.deck}
              onPress={()=> this.handleSelect(item)} >
              <View style={styles.deckContent}>
                <Text style={styles.deckTitle}>{item.title}</Text>
                <Text style={styles.deckCards}>Cards: {item.cards.length}</Text>
              </View>
              <Hr />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: Object.values(state.decks).map(deck => ({key: deck.id,...deck}))
  };
}

export default connect(mapStateToProps)(DeckList);