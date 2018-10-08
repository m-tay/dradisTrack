import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { Icon } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props)
      this.state={
          threatLevel: 6,
          dice1: 1,
          dice2: 2
      }
  }

  threatChange(n) {
      if(n=='up') {
          this.setState({threatLevel: this.state.threatLevel + 1 })
      }
      if(n=='down') {
          this.setState({threatLevel: this.state.threatLevel - 1})
      }
 }

  render() {
    return (
      <View style={styles.container}>
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

            <TouchableOpacity style={styles.threatChangeButton} onPress={()=> this.threatChange('down')}>
                    <Icon name='squared-minus' type='entypo' size={80}/>
            </TouchableOpacity>


                <Text style={{fontSize: 70}}>
                    {this.state.threatLevel}
                </Text>

                <TouchableOpacity style={styles.threatChangeButton} onPress={()=> this.threatChange('up')}>
                        <Icon name='squared-plus' type='entypo' size={80}/>
                </TouchableOpacity>


            </View>



        </View>
        <View style={styles.rowShowDiceRoll}>

            <View style={styles.diceDisplay}>
                <Text>
                    {this.state.dice1}
                </Text>
            </View>
            <View style={styles.diceDisplay}>
                <Text>
                    {this.state.dice2}
                </Text>
            </View>

        </View>
        <View style={styles.rowDoDiceRoll}>
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

}
});
