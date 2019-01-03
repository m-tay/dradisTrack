import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Icon } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

constructor(props) {
    super(props)
    this.state={
        threatLevel: 3,
        triggeringThreatLevel: 0,
        dice1: 0,
        dice2: 0,
        pursuitDeck: [-1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
        pursuitValue: 0
    }
}

// resets the pursuit deck
resetPursuitDeck() {
    this.state.pursuitDeck = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
}

resetEntireState() {
    this.resetPursuitDeck();
    this.state.threatLevel = 3;
}

// handles rolling dice, dealing with pursuit deck
doDiceRoll() {
    this.setState({dice1: Math.floor(Math.random() * 6) + 1})
    this.setState({dice2: Math.floor(Math.random() * 6) + 1}, this.checkIfThreatExceeded)

    // calculate random element in pursuit deck
    var pursuitElem = Math.floor(Math.random()*this.state.pursuitDeck.length);
    
    // retrieve random element from pursuit deck
    this.state.pursuitValue = this.state.pursuitDeck[pursuitElem];

    // remove random element from pursuit deck
    this.state.pursuitDeck.splice(pursuitElem, 1);

    // if pursuit deck depleted, refill
    if(this.state.pursuitDeck.length == 0) {
        this.resetPursuitDeck();
    }

    // add pursuit value on to the threat level
    this.state.threatLevel += this.state.pursuitValue;

    // debug
    console.log("Pursuit value is " + this.state.pursuitValue);
    console.log("PursuitDeck is " + this.state.pursuitDeck);
}


// checks for/handles threat exceed events
checkIfThreatExceeded() {
    if((this.state.dice1 + this.state.dice2) >= this.state.threatLevel ) {
        this.popupThreatOK.show();
    }
    else {
        this.state.triggeringThreatLevel = this.state.threatLevel;
        this.popupThreatExceed.show();
        this.resetEntireState(); // threat to 3, refill pursuit deck
        this.forceUpdate();      // ensures threat is re-rendered 
    }
}

  render() {
    return (
      <View style={styles.container}>

      <PopupDialog ref={(popupThreatExceed) => {this.popupThreatExceed = popupThreatExceed; }}>
            <View style={styles.popupTitleNotOK}>
                <Text style={{fontSize: 40}}>
                    DRADIS CONTACT
                </Text>
             </View>
             <View style={styles.popupBodyNotOK}>
                <Text>
                The threat level was {this.state.triggeringThreatLevel} and you rolled a {this.state.dice1 + this.state.dice2}
                {"\n"}{"\n"}
                You have been discovered. 
                {"\n"}{"\n"}
                Draw a Cylon attack card.
                {"\n"}{"\n"}
                Pursuit deck gives you {this.state.pursuitValue}
                </Text>
             </View>
      </PopupDialog>

      <PopupDialog ref={(popupThreatOK) => {this.popupThreatOK = popupThreatOK; }}>
            <View style={styles.popupTitleOK}>
                <Text style={{fontSize: 40}}>
                    DRADIS CLEAR
                </Text>
             </View>
             <View style={styles.popupBodyOK}>
                <Text>
                The threat level was {this.state.threatLevel} and you rolled a {this.state.dice1 + this.state.dice2}
                {"\n"}{"\n"}
                Phew! No Cylons this time...
                {"\n"}{"\n"}
                Pursuit deck gives you {this.state.pursuitValue}
                </Text>
             </View>
      </PopupDialog>


        <View style={styles.rowTitle}>
            <Text style={{fontSize: 60}}>
                DRADIS TRACK
            </Text>
        </View>
        <View style={styles.rowThreatLevel}>

            <Text>
                CURRENT THREAT LEVEL
            </Text>

            <View style={styles.threatValueDisplay}>

                <Text style={{fontSize: 70}}>
                    {this.state.threatLevel}
                </Text>

            </View>


        </View>
        <View style={styles.rowShowDiceRoll}>

            <View style={styles.diceDisplay}>
                <Text style={{fontSize: 40}}>
                    {this.state.dice1}
                </Text>
            </View>
            <View style={styles.diceDisplay}>
                <Text style={{fontSize:40}}>
                    {this.state.dice2}
                </Text>
            </View>

        </View>
        <View style={styles.rowDoDiceRoll}>
        <Button
            onPress={()=> this.doDiceRoll()}
            title="Roll the dice!"
        />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
rowTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    width: '100%',
},
rowThreatLevel: {
    flex:1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'darkgrey',
    width: '100%'
},
rowShowDiceRoll: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: '100%'
},
diceDisplay: {
        borderWidth: 2,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
},
rowDoDiceRoll: {
    flex:1,
    backgroundColor: 'darkgrey',
    width: '100%'
},
threatChangeButton: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
},

threatValueDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%'

},
popupTitleNotOK: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'tomato'
},
popupBodyNotOK: {
    flex: 4,
    backgroundColor: 'tomato'
},
popupTitleOK: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'mediumseagreen'
},
popupBodyOK: {
    flex: 4,
    backgroundColor: 'mediumseagreen'
}
});
