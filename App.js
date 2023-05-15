import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Home from "./components/Home";
import { navigationRef } from "./components/RootNavigator";
import Menu from "./components/Menu";
import Tutorial from "./components/Tutorial";

const Stack = createNativeStackNavigator();
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={() => (
              <View style={styles.container}>
                <Home />
              </View>
            )}
            options={{
              header: () => null
            }}
          />
          <Stack.Screen
            name="Menu"
            component={() => (
              <View style={styles.container}>
                <Menu />
              </View>
            )}
          />
          <Stack.Screen
            name="Tutorial"
            component={() => (
              <View style={styles.container}>
                <Tutorial />
              </View>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: Dimensions.get("screen").height,
  },
});
