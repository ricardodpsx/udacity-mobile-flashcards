import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import {saveDeck} from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    paddingTop: 100
  },
});

class AddDeck extends React.Component {

  static navigationOptions =  ({ navigation }) => ({
    title: 'Add Deck',
  });

  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  handleSave() {
    this.props.dispatch(saveDeck(this.state.title));
    this.props.navigation.goBack(null)
  }


  render() {

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: "#444", marginBottom:20}}>What is the title of your new Deck?</Text>
        <TextInput
          editable={true}
          style={{height: 40, width: "100%", borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title}
        />
        <Button
          onPress={this.handleSave.bind(this)}
          title="Create Deck"
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

export default connect(mapStateToProps)(AddDeck);