import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button, Box, Image, Pressable } from "native-base";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const OrderCompleteScreen = ({ navigation }) => {
  const { logout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  const handleContinueShopping = () => {
    clearCart();
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <Box style={styles.container}>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Button
          variant="ghost"
          onPress={handleLogout}
          startIcon={<Feather name="log-out" size={20} color="#F67952" />}
        />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <Box style={styles.iconContainer}>
        <Image
          source={require("../assets/completedIcon.png")}
          alt="order-complete-icon"
        />
      </Box>
      <Text style={styles.congratulationText}>Congratulations!</Text>
      <Text style={styles.subText}>
        Your order has been completed successfully.
      </Text>
      <Button
        style={styles.continueButton}
        onPress={handleContinueShopping}
        colorScheme="orange"
        size="lg"
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
  },
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  logoutText: {
    color: "#F67952",
    fontFamily: "satoshi-bold",
  },

  iconContainer: {},
  congratulationText: {
    fontSize: 24,
    fontFamily: "satoshi-bold",
    marginVertical: 15,
  },
  subText: {
    fontSize: 16,
    marginBottom: 30,
    fontFamily: "satoshi-md",
  },
  continueButton: {
    borderRadius: 10,
    backgroundColor: "#F67952",
    height: 45,
    alignSelf: "center",
    borderRadius: "133px",
    width: "80%",
  },
});

export default OrderCompleteScreen;
