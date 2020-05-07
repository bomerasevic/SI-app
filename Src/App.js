import React, { Component } from "react";
import { StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { getRootNavigator } from "./navigation";

export default class App extends Component {
  state = {
    isLoggedIn: false
  }
  async componentDidMount() {
   
  }
  render() {
    const RootNavigator = createAppContainer(getRootNavigator(this.state.isLoggedIn));
    return (
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
