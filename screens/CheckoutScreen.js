import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Box, Button, Icon, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const CheckoutScreen = ({ navigation }) => {
  // Dummy data for checkout details
  const deliveryAddress = "123 Main Street, City, Country";
  const totalItemCost = 50;
  const deliveryCost = 10;
  const totalCost = totalItemCost + deliveryCost;
  const defaultPaymentMethod = "Wallet";

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </Pressable>
        <Box flex={1} alignItems="center">
          <Text style={styles.headerText}>Checkout</Text>
        </Box>
      </Box>
      <Box style={[styles.setionContainer]}>
        <Text style={styles.cardHeader}>Delivery Address</Text>
        <Box style={styles.card}>
          <Text style={styles.cardText}>Home</Text>
          <Text style={styles.boldText}>{deliveryAddress}</Text>
          <Text style={styles.subText}>(342) 4522019</Text>
        </Box>
      </Box>

      <Box style={[styles.setionContainer]}>
        <Text style={styles.cardHeader}>Billing Information</Text>
        <Box style={styles.card}>
          <Box style={styles.flexCardItems}>
            <Text style={styles.cardText}>Total Item Cost:</Text>
            <Text style={styles.boldText}>${totalItemCost}</Text>
          </Box>
          <Box style={styles.flexCardItems}>
            <Text style={styles.cardText}>Delivery Cost:</Text>
            <Text style={styles.boldText}>${deliveryCost}</Text>
          </Box>
          <Box style={styles.flexCardItems}>
            <Text style={styles.cardText}>Total Cost:</Text>
            <Text style={styles.boldText}>${totalCost}</Text>
          </Box>
        </Box>
      </Box>

      {/* Default Payment Method */}
      <Box style={[styles.setionContainer]}>
        <Text style={styles.cardHeader}>Payment Method</Text>
        <Box style={[styles.card, styles.flexCardItems]}>
          <Box style={styles.optionText}>
            <Entypo name="wallet" size={24} color="black" />
            <Text style={styles.cardText}>{defaultPaymentMethod}</Text>
          </Box>
          <Text style={styles.selectedText}>Selected</Text>
        </Box>
      </Box>

      {/* Complete Button */}
      <Box style={styles.completeButtonContainer}>
        <Button
          onPress={() => navigation.navigate("OrderComplete")}
          style={styles.completeBtn}
        >
          Complete
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFD",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "satoshi-bold",
  },

  card: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontFamily: "satoshi-bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    fontFamily: "satoshi-md",
  },
  checkIcon: {
    color: "green",
    fontSize: 20,
  },
  setionContainer: {
    marginVertical: 10,
  },
  completeButtonContainer: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  completeBtn: {
    backgroundColor: "#F67952",
    height: 45,
    alignSelf: "center",
    borderRadius: "133px",
    width: "100%",
    fontFamily: "satoshi-bold",
  },
  flexCardItems: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  selectedText: {
    fontFamily: "satoshi-bold",
    color: "#F67952",
    fontSize: 14,
  },
  boldText: {
    fontFamily: "satoshi-bold",
    fontSize: 16,
  },

  subText: {
    fontSize: 14,
    marginTop: 1,
    fontFamily: "satoshi-md",
  },
});

export default CheckoutScreen;
