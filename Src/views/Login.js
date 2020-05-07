import React, { Component } from "react";
import { View, Image, Text, Alert } from "react-native";
import { Button } from "../components";
import { Input } from "../components";
import LogoModal from "../assets/seller.png";
const AUTH_KEY = "@AUTH_TOKEN_KEY";
const USER = "@USER";
import * as LocalAuthentication from 'expo-local-authentication';

import axios from "axios";
import { _storeToken, _clearToken, _storeUser } from "../helpers/asyncStorage";
import { AsyncStorage } from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      neispravni: false,
      skeniran:false,
    };
  }

  _login = async () => {
    console.log("propovi: ", this.props);
    const { name, password } = this.state;
    const data = {
      name,
      password,
    };
    

    const headers = {
      "Content-Type": "application/json",
    };
    console.log("USERNAME I PAAAAAAAAAS", data);
    var unutra = this;
    axios
      .post("https://administrativna-app.herokuapp.com/login", data, {
        headers: headers,
      })
      .then(function (result) {
        if (result && result.data) {
          const AUTH_TOKEN = result.data.username;
          const ID = result.data.id;
          const AUTH_USER = ID.toString();
          console.log("hi", AUTH_USER);
          _storeUser(AUTH_USER);
          _storeToken(AUTH_TOKEN);
          console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          if (AUTH_TOKEN ) {
            unutra.props.navigation.navigate("HOME");
          } else {
            unutra.setState({ neispravni: true });
          }
        }
      })
      .catch(function (error) {
        unutra.setState({ neispravni: true });
        console.log(error);
      });

    console.log("DATA: ");
  };

  _password=async ()=>{
    this.props.navigation.navigate("PASSWORD")
    
  }
  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForBiometrics();
    if(!this.state.skeniran)this.handleLoginPress();
  }
  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      console.log("Uspješno")
    }
  };
  checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (biometricRecords) {
      
      console.log("Ima")
    } else {
      console.log("Nema")
    }
  };

  handleLoginPress =async () => {
    this.showAlert();
  };

  showAlert = async() => {

    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      this.setState({skeniran:true})
      const data = {
        name:"jksd",
        password:"opatovo10"
      };

      const headers = {
        "Content-Type": "application/json",
      };
      var unutra = this;
      axios
        .post("https://administrativna-app.herokuapp.com/login", data, {
          headers: headers,
        })
        .then(function (result) {
          if (result && result.data) {
            const AUTH_TOKEN = result.data.username;
            const ID = result.data.id;
            const AUTH_USER = ID.toString();
            console.log("hi", AUTH_USER);
            _storeUser(AUTH_USER);
            _storeToken(AUTH_TOKEN);
            if (AUTH_TOKEN ) {
              unutra.props.navigation.navigate("HOME");
            } else {
              unutra.setState({ neispravni: true });
            }
          }
        })
        .catch(function (error) {
          unutra.setState({ neispravni: true });
          console.log(error);
        });
      
    } else {   
    
      Alert.alert('Greška! Unesite login podatke!');  

    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={LogoModal} />
        <Text style={styles.mainTitle}>Prijavi se na svoj account</Text>
        <Input
          style={styles.username}
          placeholder="Name"
          autoCompleteType="username"
          onChangeText={(text) => this.setState({ name: text })}
        ></Input>
        <Input
          style={styles.password}
          placeholder="Password"
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        ></Input>
        {this.state.neispravni ? <Text>Neispravni podaci</Text> : null}
        <Button onPress={this._login} outline>
          Prijava
        </Button>
        
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,

    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 50,
  },
  mainTitle: {
    //fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  passwordi:{
    color:"blue",
    marginTop:30
  },
  title: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 20,
  },
  username:{
    

    backgroundColor: "white",
  },
  password:{
    

    backgroundColor: "white",
  }
};
