import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { Button } from "../components";
import { Input } from "../components";
const AUTH_KEY = "@AUTH_TOKEN_KEY";
const USER = "@USER";
import { Buttoni } from "../components";
import PasswordLogo from "../assets/password.png";
import axios from "axios";
import { _storeToken, _clearToken, _storeUser } from "../helpers/asyncStorage";
import { AsyncStorage } from "react-native";
import { Left } from "native-base";
import DoneLogo from "../assets/success.png";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      staraSifra: "",
      novaSifra1: "",
      novaSifra2: "",
      email: "",
      done: false,
      firstStep: true,
      secondStep: false,
    };
  }
  _back = async () => {
    this.props.navigation.navigate("Login");
  };
  _promijeni = async () => {
    this.setState({ done: true });
  };
  render() {
    return (
      <View>
        {!this.state.done ? (
          <View style={styles.container}>
            <Text style={styles.pass}>Ponovo postavite šifru</Text>
            <Image style={styles.logo} source={PasswordLogo} />
            {this.state.firstStep ? (
              <View>
                <Text>Da biste promijenili password, potrebno je da unesete username i email. Na email koji set unijeli ćete dobiti kod pomoću kojeg možete promijeniti šifru</Text>
                <Input
                  style={styles.username}
                  placeholder="Username"
                  autoCompleteType="username"
                  onChangeText={(text) => this.setState({ username: text })}
                ></Input>
                <Input
                  style={styles.username}
                  placeholder="Email"
                  autoCompleteType="email"
                  onChangeText={(text) => this.setState({ email: text })}
                ></Input>
              </View>
            ) : (
              <View>
                <Button outline onPress={this._promijeni}>
              Pošalji kod na email
            </Button>
               </View>
            )}

            <Input
              style={styles.username}
              placeholder="Stari password"
              autoCompleteType="password"
              onChangeText={(text) => this.setState({ staraSifra: text })}
            ></Input>
            <Input
              style={styles.username}
              placeholder="Novi password"
              autoCompleteType="password"
              onChangeText={(text) => this.setState({ novaSifra1: text })}
            ></Input>
            <Input
              style={styles.username}
              placeholder="Potvrdi novi password"
              autoCompleteType="password"
              onChangeText={(text) => this.setState({ novaSifra2: text })}
            ></Input>
            <Button outline onPress={this._promijeni}>
              Promijeni šifru
            </Button>
            <Buttoni outline style={styles.back} onPress={this._back}>
              Nazad
            </Buttoni>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.pass2}>Šifra je uspješno promijenjena!</Text>
            <Image style={styles.logo2} source={DoneLogo} />
            <Buttoni outline style={styles.back} onPress={this._back}>
              Nazad
            </Buttoni>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: "center",
    padding: 10,
  },
  pass: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
  },
  pass2: {
    marginTop: 200,
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    backgroundColor: "white",
  },
  back: {
    backgroundColor: "rgb(57, 54, 67)",
  },

  logo: {
    marginTop: 50,
    height: 100,
    width: 100,
  },
  logo2: {
    marginTop: 50,
    marginBottom: 100,
    height: 100,
    width: 100,
  },
};
