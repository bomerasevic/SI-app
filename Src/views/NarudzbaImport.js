import React, { Component } from "react";
import { View, Image, Text, ImageBackground } from "react-native";

import theme from '../assets/Theme'
import Constants from 'expo-constants';
import Lista from "../components/ListImport";

import { Button } from "../components/Button";


export default class NarudzbaImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    data: [],
    };
  }
  async componentDidMount() {
    this.setState({data:this.props.navigation.state.params.final_Narudzba});
    console.log("UUUUUUUUUUUUUU NARUDŽBIIIIIIIIIIIIIII",this.props.navigation.state.params.final_Narudzba)
    ;
    
  }
  render() {
    return (
      <View style={styles.container}>
        
        <Lista
          data={this.state.data}
        /> 
        
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    
    backgroundColor: theme.COLORS.LISTCOLOR,
  },
  list: {
    flex: 1,
    backgroundColor: theme.COLORS.LISTCOLOR,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: -80,
    color: theme.COLORS.LISTCOLOR,
    marginTop: 10
  },
  head: {
    backgroundColor: 'white',

  },
  icon: {
    marginLeft: -65
  }
};
