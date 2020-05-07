import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import userId from "../newID";
import moment from "moment";
import RNModal from "../components/Modal";
import { AsyncStorage } from "react-native";
const AUTH_KEY = "@AUTH_TOKEN_KEY";
const USER = "@USER";
import SearchableDropdown from "react-native-searchable-dropdown";
import { BarCodeScanner } from "expo-barcode-scanner";
export default class KreiranjeNarudzbe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      barcodeVisible: false,
      hasPermission: null,
      scanned: false,
      isDateTimePickerVisible: false,
      stringDate: null,
      date: null,
      kupac: "",
      kupci: [],
      komercijalista: "",
      nazivNarudzbe: "",
      sifra: "",
      kolicina: "",
      finalNarudzba: [],
      datumKod: "null",
      kupacKod: "",
      idNarudzbe: "",
      brojProizvoda: 0,
      sviProizvodi: [],
      skeniran: false,
      pregledNarudzbe:[],
      nazivProizvoda:"",
      cijenaProizvoda:"",
      jedinicaMjere:""
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    this.setState({ date: date });
    console.log("A date picked: ", date);
    let stringDate = JSON.parse(
      JSON.stringify(moment(date).format("MMM Do YY"))
    );
    let stringDateKod = JSON.parse(JSON.stringify(moment(date).format("l")));
    this.setState({ datumKod: stringDateKod });
    this.setState({ stringDate: stringDateKod });
    this.hideDateTimePicker();
  };

  handleBarCode = () => {
    this.setState({ barcodeVisible: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.setState({ skeniran: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ scanned: false });
  };
  posaljiNarudzbu = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
    const data = { finalNarudzba: this.state.finalNarudzba };
    console.log("OVO JE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data);
    axios
      .post("https://back-office-web.herokuapp.com/novaNarudzba", data, {
        headers: headers,
      })
      .then(function (response) {
        console.log(response);
        console.log("Ok");
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ finalNarudzba: [] });
    this.setState({pregledNarudzbe:[]});
    this.setState({ brojProizvoda: 0 });
    this.setState({ idNarudzbe: userId() });
  };

  _back = async () => {
    this.props.navigation.navigate("HOME");
  };
  ukupnaNarudzba = async () => {
    this.props.navigation.navigate("Narudzba", {
      final_Narudzba: this.state.pregledNarudzbe,
      ukupnaNarudzba:this.state.finalNarudzba,
    });
  };
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert("Uploaded");
    console.log(result);
    let data = new FormData();
    data.append("image", {
      uri: result.uri,
      type: "image/png",
      name: result.name,
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
  };
  dodajProizvod = async () => {
    const komercijalistaTemp = await AsyncStorage.getItem(USER);
    const imeKomercijaliste = await AsyncStorage.getItem(AUTH_KEY);
    this.setState({ komercijalista: imeKomercijaliste });
    const tempBroj = this.state.finalNarudzba.length + 1;
    this.setState({ brojProizvoda: tempBroj });
    console.log("KOMERCIJALISTA IZ ASYNC", komercijalistaTemp);
    const fn = this.state.finalNarudzba;
    const {
      komercijalista,
      kupac,
      sifra,
      stringDate,
      kolicina,
      nazivNarudzbe,
      idNarudzbe,
      kupacKod,
      datumKod,      
      nazivProizvoda,
      cijenaProizvoda,
      jedinicaMjere
    } = this.state;
    console.log("Kupac kod", imeKomercijaliste);
    const finNarudzba =
      kupacKod + "_" + komercijalistaTemp + "_" + datumKod + "_" + idNarudzbe;
    this.setState({ nazivNarudzbe: finNarudzba });
    console.log(nazivNarudzbe);
    const data = {
      finNarudzba,
      imeKomercijaliste,
      kupac,
      sifra,
      stringDate,
      kolicina,      
      nazivProizvoda,
      cijenaProizvoda,
      jedinicaMjere,

    };
    const data2={
      sifra,
      nazivProizvoda,
      cijenaProizvoda,
      jedinicaMjere,
      stringDate,
      kolicina
    }
    const tempo=this.state.pregledNarudzbe;
    tempo.push(data2);
    this.setState({pregledNarudzbe:tempo});
    fn.push(data);
    this.setState({ finalNarudzba: fn });
    console.log("PODAAAAAAAAAAAAACIIIIIIIIII", this.state.finalNarudzba);
    this.setState({ sifra: "" });
    this.setState({ skeniran: false });
    this.setState({ kolicina: "" });
    
    this.setState({ nazivProizvoda: "" });
    this.setState({nazivProizvoda:""});
    this.setState({jedinicaMjere:""});
  };
  componentDidUpdate(){
    
    this.setState({ idNarudzbe: userId() });
  }
  componentDidMount() {
    
    var temp = this;
    this.setState({ idNarudzbe: userId() });
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
    axios
      .get("https://administrativna-app.herokuapp.com/kupciMob", {
        headers: headers,
      })
      .then(function (response) {
        let kup = response.data.lista;
        console.log("KUUUUPCIIIIIII", kup);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        temp.setState({ kupci: kup });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://administrativna-app.herokuapp.com/sifarnikMob", {
        headers: headers,
      })
      .then(function (response) {
        let proizvodi = response.data.lista;
        console.log("PROIZVODIIIII", proizvodi);
        console.log(
          "ooooooooooooooooooooooooooooooOOOOOOOOOOOOOOOOOOoooooooooooo"
        );
        temp.setState({ sviProizvodi: proizvodi });
      })
      .catch(function (error) {
        console.log(error);
      });

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        this.setState({ hasPermission: "granted" });
      }
    })();
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: "true" });
    this.setState({ sifra: data });
    
    
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
    const unutra=this;
    const datica={sifra:data}
    console.log("DATICA",datica)
    axios
      .post("https://administrativna-app.herokuapp.com/proizvod", datica, {
        headers: headers,
      })
      .then(function (response) {
      console.log(response.data[0])
      unutra.setState({nazivProizvoda:response.data[0].name});      
      unutra.setState({cijenaProizvoda:response.data[0].jedCijena});
      unutra.setState({jedinicaMjere:response.data[0].jedMjere});
      console.log("SKIENIRANOADJODJSD",response)
      console.log(unutra.state.nazivProizvoda)
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ barcodeVisible: "false" });
    alert(`Bar code ${data} has been scanned!`);
  };
  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.forma}>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={(item) => {
              this.setState({ kupac: item.name });
              this.setState({ kupacKod: item.id });
              console.log("ID KUPCA", this.state.kupacKod);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              backgroundColor: "#FAF7F6",
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: "#FAF9F8",
              borderColor: "#bbb",
              borderWidth: 1,
            }}
            itemTextStyle={{
              //single dropdown item's text style
              color: "#222",
            }}
            itemsContainerStyle={{
              maxHeight: "50%",
            }}
            items={this.state.kupci}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="Kupac"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />

          <View style={styles.datum}>
            <Button onPress={this.showDateTimePicker}>
              {!this.state.date ? "Izaberi datum" : "Promijeni datum"}
            </Button>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
            <View style={styles.pickedDate}>
              {!this.state.date ? null : (
                <Text>Izabrani datum {this.state.datumKod}</Text>
              )}
            </View>
            <Button onPress={this.handleOpen}>Skeniraj Barcode</Button>
          </View>
          {!this.state.skeniran ? (
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={(item) => {
                this.setState({jedinicaMjere:item.jedMjere});
                this.setState({nazivProizvoda:item.name});
                this.setState({cijenaProizvoda:item.jedCijena});
                this.setState({ sifra: item.barKod });
              }}
              //onItemSelect caled after the selection from the dropdown
              containerStyle={{ padding: 5 }}
              //suggestion container style
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#FAF7F6",
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: "#FAF9F8",
                borderColor: "#bbb",
                borderWidth: 1,
              }}
              itemTextStyle={{
                color: "#222",
              }}
              itemsContainerStyle={{
                maxHeight: "50%",
              }}
              items={this.state.sviProizvodi}
              defaultIndex={0}
              placeholder="Proizvod"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          ) : (
            <Input
              style={styles.username}
              placeholder="Šifra proizvoda"
              autoCompleteType="username"
              clearButtonMode="always"
              onChangeText={(text) => this.setState({ sifra: text })}
              value={this.state.sifra}
            ></Input>
          )}


          <Input
            style={styles.username}
            placeholder="Količina"
            autoCompleteType="username"
            clearButtonMode="always"
            onChangeText={(text) => this.setState({ kolicina: text })}
            value={this.state.kolicina}
          ></Input>
          <View style={styles.donji}></View>
          <View style={styles.narudzba}>
            <Button
              style={styles.narudzbabtn}
              onPress={this.dodajProizvod}
              outline
            >
              Dodaj proizvod
            </Button>
            <Button
              style={styles.narudzbabtn}
              onPress={this.ukupnaNarudzba}
              outline
            >
              Pogledaj narudžbu
            </Button>

            
            <Button style={styles.narudzbabtn} onPress={this._back}>
              Nazad
            </Button>
          </View>
          <RNModal visible={this.state.open} onClose={this.handleClose}>
            <View style={styles.modal}>
              <BarCodeScanner
                onBarCodeScanned={
                  this.state.scanned ? undefined : this.handleBarCodeScanned
                }
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          </RNModal>
        </View>
      </View>
    );
  }
}

const styles = {
  modal: {
    padding: 0,
    width: "100%",
    height: "90%",
  },
  container: {
    flex: 1,

    backgroundColor: "white",

    padding: 10,
  },
  view: {
    backgroundColor: "black",
  },
  datum: { width: 200, marginBottom: 10, marginLeft: 30, alignItems: "center" },
  forma: {
    marginTop: 5,
    justifyContent: "flex-start",
  },
  imprtbtn: {
    marginTop: 10,
    width: 150,
    marginLeft: 10,
  },

  logo: {
    marginTop: 150,
    marginLeft: 30,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    color: "white",
  },
  narudzbabtn: {
    backgroundColor: "pink",
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    color: "white",
  },
  donji: {
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    width: 250,
  },
  narudzba: {
    marginLeft: 10,
    alignItems: "center",
    width: 250,
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
