import React, { Component } from "react";
import { View, Image, Text, ImageBackground } from "react-native";

import axios from "axios";
import userId from "../newID";
import theme from '../assets/Theme'
import Constants from 'expo-constants';
import Lista from "../components/ListCustomer";

import { Button } from "../components/Button";
import { Buttoni } from "../components";

import RNModal from "../components/Modal";

export default class Narudzba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,    
      zaBrisanje:null,  
      brojProizvoda:0,
    data: [],
    zaSlat:[],
    zaBrisanjeKod:null,
    };
  }
  async componentDidMount() {
    let tempi=this.props.navigation.state.params.final_Narudzba;
    this.setState({data:tempi});
    this.setState({zaSlat:this.props.navigation.state.params.ukupnaNarudzba})
    console.log("UUUUUUUUUUUUUU NARUDŽBIIIIIIIIIIIIIII",this.props.navigation.state.params.final_Narudzba)
    ;
    this.setState({brojProizvoda:tempi.length})
  }
  _back=async()=>{
    this.props.navigation.navigate("Proizvod", {
      final_Narudzba: this.state.data,
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });    
    this.setState({zaBrisanje:null});
  };

  openItem = (item) => {
    this.handleOpen();
    console.log("ITEM",item);
    console.log("ITEM",item.nazivProizvoda),
    this.setState({zaBrisanje:item.nazivProizvoda});
    
    this.setState({zaBrisanjeKod:item.sifra});
  }

  handleDelete=async()=>{
    let temp=this.state.data;
    let temp2=this.state.zaSlat;
    const index2=temp.findIndex(x => x.sifra===this.state.zaBrisanjeKod);
    const index = temp.findIndex(x => x.nazivProizvoda===this.state.zaBrisanje);
    if(index!==undefined) console.log("Uspjelo");
    temp.splice(index, 1);
    temp2.splice(index2,1);
    this.setState({data:temp});
    this.setState({zaSlat:temp2})
    console.log(temp);
    this.handleClose;
    let tempBroj=this.state.brojProizvoda;
    this.setState({brojProizvoda:tempBroj-1})
    this.setState
    this.props.navigation.navigate("Narudzba", {
      final_Narudzba: this.state.data,
    });
  }

  posaljiNarudzbu = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    };
    const data = { finalNarudzba: this.state.zaSlat };
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
    this.setState({ data: [] });
    this.setState({ brojProizvoda: 0 });
    this.setState({ idNarudzbe: userId() });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.brojProizvoda}>Broj proizvoda: {this.state.brojProizvoda}</Text>
        <Lista
          data={this.state.data}          
          openItem={this.openItem}
        /> 
        <View style={styles.btn2}>
        <Button  outline onPress={this.posaljiNarudzbu} >
              Pošalji narudžbu
            </Button>
            </View>
        <RNModal visible={this.state.open} onClose={this.handleClose}>
            <View style={styles.modal}>
              <Text style={styles.buttonDa}>Da li želite obrisati proizvod?
              </Text>
              <Button  outline onPress={this.handleDelete} >
              Da
            </Button>
            <Buttoni outline onPress={this.handleClose}>Ne</Buttoni>
            </View>
          </RNModal>
        
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    
    backgroundColor: theme.COLORS.LISTCOLOR,
  },
  buttonDa:{
    marginTop:50,
    marginBottom:50
  },
  btn2:{
    width:"120%"
  },
  brojProizvoda:{
    color:"white",
    fontSize:20,
    marginLeft:20
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
  modal: {
    padding: 0,
    alignItems:"center",
    width: "100%",
    height: "90%",
  },
  icon: {
    marginLeft: -65
  }
};
