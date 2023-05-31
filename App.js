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
import { navigationRef } from "./components/RootNavigator";
import Menu from "./components/Menu";
import { StoreProvider, hydrateStores } from "./stores/index";
import Library from "./components/Library";
import MenuPrivate from "./components/MenuPrivate";
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
              name="MenuPrivate"
              options={{
                animation: 'slide_from_bottom'
              }}
              component={() => (
                <View style={styles.container}>
                  <MenuPrivate />
                </View>
              )}
            />
            <Stack.Screen
              name="Menu"
              options={{
                animation: 'slide_from_right'
              }}
              component={() => (
                <View style={styles.container}>
                  <Menu />
                </View>
              )}
            />
            <Stack.Screen
              name="Library"
              options={{
                animation: 'fade_from_bottom'
              }}
              component={() => (
                <View style={styles.container}>
                  <Library />
                </View>
              )}
            />
            <Stack.Screen
              name="Tutorial"
              options={{
                animation: 'fade_from_bottom'
              }}
              component={() => (
                <View style={styles.container}>
                  <Tutorial />
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
