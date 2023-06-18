import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
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
import Note from "./components/Note";
import AddNote from "./components/AddNote";
import ViewNote from "./components/ViewNote";
import EditNote from "./components/EditNote";

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
        <View style={styles.container}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  header: () => null,
                }}
              />
              <Stack.Screen
                name="MenuPrivate"
                options={{
                  animation: "slide_from_bottom",
                }}
                component={MenuPrivate}
              />
              <Stack.Screen
                name="Menu"
                options={{
                  animation: "slide_from_right",
                }}
                component={Menu}
              />
              <Stack.Screen
                name="Library"
                options={{
                  animation: "fade_from_bottom",
                }}
                component={Library}
              />
              <Stack.Screen
                name="Tutorial"
                options={{
                  animation: "fade_from_bottom",
                }}
                component={Tutorial}
              />
              <Stack.Screen
                name="Note"
                options={{
                  animation: "fade_from_bottom",
                }}
                component={Note}
              />
               <Stack.Screen
                name="Edit Note"
                options={{
                  animation: "fade_from_bottom",
                }}
                component={EditNote}
              />
              <Stack.Screen
                name="Add Note"
                options={{
                  animation: "fade_from_bottom",
                  headerRight: () => <Button children="Lưu" />,
                }}
                component={AddNote}
              />
              <Stack.Screen
                name="View Note"
                options={{
                  animation: "fade_from_bottom",
                  headerRight: () => <Button children="Sửa" />,
                }}
                component={ViewNote}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
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
