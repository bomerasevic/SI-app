import React, { Component } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import { Button } from "../components/Button";
import * as FileSystem from "expo-file-system";
import { Buttoni } from "../components";
import axios from "axios";
import BackgroundImage from "../assets/papers.png";
import ImportLogo from "../assets/import.png";
import * as DocumentPicker from "expo-document-picker";
export default class ImportNarudzbe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      narudzba: "",
      finalNarudzba:""
    };
  }

  _back = async () => {
    this.props.navigation.navigate("HOME");
  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert("Uploaded");
    console.log(result);
    const dataStr = await FileSystem.readAsStringAsync(result.uri);
    console.log(dataStr)
    this.setState({ narudzba: dataStr });
    var myJsonNarudzba=JSON.parse(dataStr);
    var myNarudzba=myJsonNarudzba.finalNarudzba;
    this.setState({finalNarudzba:myNarudzba});
    console.log("Ovo je proba", myNarudzba)
    

  };

  _pogledajNarudzbu=async()=>{
    this.props.navigation.navigate("Narudzba", {
      final_Narudzba: this.state.finalNarudzba,
    });

  }

  _sendOrder = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
    let unutra=this;
    
    const data =  this.state.narudzba;
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    axios
      .post("https://back-office-web.herokuapp.com/novaNarudzba", data, {
        headers: headers,
      })
      .then(function (response) {
          console.log("---------------------------------------------------------------------------------------");
          unutra.setState({narudzba:""});
          unutra.setState({finalNarudzba:""});
        console.log("Ok");

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.background}
        >
        <Image style={styles.logo} source={ImportLogo} />

        <Text style={styles.mainTitle}>Učitajte dokument</Text>

        <Button outline onPress={this._pickDocument}>
          Import dokumenta
        </Button>
        <Button outline onPress={this._sendOrder}>
          Pošalji narudžbu
        </Button>
        <Button outline onPress={this._pogledajNarudzbu}>
          Pogledaj narudžbu
        </Button>
          <Buttoni outline onPress={this._back}>
            Nazad
          </Buttoni>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",

  },
  view: {
    backgroundColor: "black",
  },
  btn: {
    marginTop: 100,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imprtbtn: {
    marginTop: 50,
    width: 150,
    marginLeft: 10,
  },

  logo: {
    height: 100,
    width: 100,
    marginTop: 150,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    color: "white",
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    color: "white",
  },
  background: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  date: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 20,
    color: "white",
  },
};
