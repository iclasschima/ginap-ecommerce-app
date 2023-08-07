import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NativeBaseProvider, Box, Text } from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import CartScreen from "./screens/CartScreen";
import OrderCompleteScreen from "./screens/OrderCompleteScreen";
import Toast from "react-native-toast-message";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

const Stack = createStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  const [fontLoaded] = useFonts({
    "satoshi-bold": require("./assets/fonts/Satoshi-Bold.otf"),
    "satoshi-md": require("./assets/fonts/Satoshi-Medium.otf"),
    "satoshi-lt": require("./assets/fonts/Satoshi-Light.otf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <CartProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          <NativeBaseProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Login" }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Home" }}
                  />

                  <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{ title: "Checkout" }}
                  />

                  <Stack.Screen
                    name="OrderComplete"
                    component={OrderCompleteScreen}
                    options={{ title: "OrderComplete" }}
                  />

                  <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ title: "Cart" }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegistrationScreen}
                    options={{ title: "Register" }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </QueryClientProvider>
          </NativeBaseProvider>
          <Toast />
        </SafeAreaView>
      </CartProvider>
    </UserProvider>
  );
}
