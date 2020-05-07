import React, { Component } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import Puzzle from "../assets/puzzle.png";
import BackgroundImage from "../assets/loggedin_header.png";
import { Button } from "../components/Button";
import { AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';
const AUTH_KEY = '@AUTH_TOKEN_KEY';
const USER = '@USER';
import * as DocumentPicker from "expo-document-picker";
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      message: ""
    };
  }
  _logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    await AsyncStorage.removeItem(USER);
    this.props.navigation.navigate("Login");
  };
  _kreiranjeNarudzbe = async () => {
    this.props.navigation.navigate("DATA");
  };
  
  _importuj = async () => {
    this.props.navigation.navigate("NEKI")
 };

  componentDidMount() {
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var temp;
    if (hours > 6 && hours < 12) temp = "Dobro jutro";
    else if (hours > 11 && hours < 18) temp = "Dobar dan";
    else temp = "Dobra večer";
    that.setState({
      //Setting the value of the date time
      message: temp,
      date: date + "/" + month + "/" + year + " "
    });
  }
  render() {
    return (
      <View>
        <ImageBackground source={BackgroundImage} style={styles.background}>
          <View style={styles.btn}>
            <Text style={styles.mainTitle}>{this.state.message}</Text>
            <Text style={styles.title}> </Text>
            <Text style={styles.date}>{this.state.date}</Text>
          </View>
          <Button outline onPress={this._importuj}>
            Import narudžbe
          </Button>
          <Button outline onPress={this._kreiranjeNarudzbe}>
            Kreiranje narudžbe
          </Button>
          <View style={styles.imprtbtn}>
            <Button onPress={this._logout} outline>
              Odjavi se
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,

    backgroundColor: "white",

    padding: 10
  },
  view: {
    backgroundColor: "black"
  },
  btn: {
    marginTop: 100,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imprtbtn: {
    marginTop: 50,
    width: 150,
    marginLeft: 10
  },

  logo: {
    marginTop: 150,
    marginLeft: 30
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    color: "white"
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    color: "white"
  },
  background: {
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%",
    height: "100%"
  },
  date: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 20,
    color: "white"
  }
};
