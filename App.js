import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  MD3LightTheme as DefaultTheme,
  MD2Colors,
  Provider as PaperProvider,
} from "react-native-paper";
import Home from "./components/Home";
import Menu from "./components/Menu";
import { navigationRef } from "./components/RootNavigator";
import Tutorial from "./components/Tutorial";
import { StoreProvider, hydrateStores } from "./stores/index";
import Library from "./components/Library";

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

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = async () => {
      await hydrateStores();
      setReady(true);
    };
    start();
  }, []);

  if (!ready) {
    return (
      <View>
         <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <StoreProvider>
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
                header: () => null,
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
            <Stack.Screen
              name="Library"
              component={() => (
                <View style={styles.container}>
                  <Library />
                </View>
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
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
